import "./signUp.scss";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { auth, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useEffect, useRef, useState } from "react";

const SignUp = () => {
  const navigate = useNavigate();
  const [errorComparison, setErrorComparison] = useState("");
  const [success, setSuccess] = useState("");

  // --------registration
  const register = (values) => {
    // if (values.password !== values.confirmPassword) {
    //   setErrorComparison("passwords do not match");
    //   throw new Error(errorComparison);
    // }
    // -----------додавання фото аватарок
    // if (values.photo) {
    const storageRef = ref(storage, `avatars/${values.name}`);
    const uploadTask = uploadBytesResumable(storageRef, values.photo);
    // }
    // const uploadTask = uploadBytesResumable(storageRef, values.photo);

    // const storageRef = ref(storage, values.name);
    // const uploadTask = uploadBytesResumable(storageRef, values.photo);

    createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password,
      values.name,
      values.photo
    )
      .then((userCredential) => {
        console.log(userCredential);
        const user = userCredential.user;

        if (values.photo) {
          getDownloadURL(ref(storage, `avatars/${values.name}`)).then(
            (downloadURL) =>
              // getDownloadURL(ref(storage, values.name)).then((downloadURL) =>
              {
                console.log(downloadURL);
                updateProfile(user, {
                  // displayName: values.name,
                  photoURL: downloadURL,
                });
              }
          );
        }
        setSuccess(` user ${user.email} is registered`);
        // -----додавання імені користувача
        updateProfile(user, {
          displayName: values.name,
          // photoURL: values.photo,
        });
        // console.log(userCredential);
      })
      .then(() => navigate("/signin"))
      .catch((error) =>
        error.message.includes("auth/email-already-in-use")
          ? setErrorComparison("such a user exist")
          : setErrorComparison(error.message)
      );
    // !-------------------------------
    // const storageRef = ref(storage, values.name);
    // const uploadTask = uploadBytesResumable(storageRef, values.photo);
    // uploadTask.on(
    //   (error) => {
    //     console.log(error);
    //   },
    //   () => {
    //     getDownloadURL(ref(storage, values.name)).then((downloadURL) =>
    //       console.log(downloadURL)
    //     );
    //   }
    // );

    // await uploadTask.on(
    //   (error) => {
    //     console.log(error);
    //   },
    //   () => {
    // getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //   console.log("File available at", downloadURL);
    //   console.log(downloadURL);
    //   updateProfile(res.user, {
    //     photoURL: downloadURL,
    //   });
    // });
    //   }
    // );
  };

  // -------validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("required").email("missing email"),
    password: Yup.string().required("required").min(6, "min 6 symbols"),
    confirmPassword: Yup.string()
      .required("required")
      .oneOf([Yup.ref("password")], "passwords do not match"),
  });

  return (
    <div className="signup">
      <div className="signup__container"></div>
      <h2 style={{ color: "red" }}>Signup</h2>

      <Formik
        initialValues={{
          email: "",
          name: "",
          password: "",
          confirmPassword: "",
          photo: null,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          // console.log(values);
          register(values);
          resetForm();
          setErrorComparison("");
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <input
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.text}
              name="name"
              placeholder="name"
            />
            <input
              type="email"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.email}
              name="email"
              placeholder="email"
            />
            <input
              type="password"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.password}
              name="password"
              placeholder="password"
            />
            <input
              type="password"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.confirmPassword}
              name="confirmPassword"
              placeholder="confirmPassword"
            />
            <input
              type="file"
              onBlur={props.handleBlur}
              name="photo"
              placeholder="add photo"
              // formik не підтримує завантаження файлів за замовчанням, тому робимо так:
              onChange={(event) => {
                props.setFieldValue("photo", event.currentTarget.files[0]);
              }}
            />
            {props.errors.password && (
              <div id="feedback">{props.errors.password}</div>
            )}
            {props.errors.email && (
              <div id="feedback">{props.errors.email}</div>
            )}
            {props.errors.confirmPassword && (
              <div id="feedback">{props.errors.confirmPassword}</div>
            )}
            {errorComparison && <div id="feedback">{errorComparison}</div>}
            {success && <div id="feedback">{success}</div>}

            <button type="submit" disabled={!props.dirty || props.isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>

      <p style={{ color: "red" }}>
        or move to<Link to={"/signin"}>Signin</Link>
      </p>
    </div>
  );
};

export default SignUp;
