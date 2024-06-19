import "./signUp.scss";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage } from "../../firebase";
import { useEffect, useRef, useState } from "react";

const SignUp = () => {
  const navigate = useNavigate();
  const [errorComparison, setErrorComparison] = useState("");
  const [success, setSuccess] = useState("");

  // --------registration
  const register = (values) => {
    // -----------додавання фото аватарок
    // if (values.photo) {
    const storageRef = ref(storage, `avatars/${values.name}`);
    const uploadTask = uploadBytesResumable(storageRef, values.photo);
    // }

    createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password,
      values.name,
      values.photo
    )
      .then((userCredential) => {
        // console.log(userCredential);
        const user = userCredential.user;

        if (values.photo) {
          getDownloadURL(ref(storage, `avatars/${values.name}`)).then(
            (downloadURL) => {
              console.log(downloadURL);
              updateProfile(user, {
                photoURL: downloadURL,
              });
            }
          );
        }
        setSuccess(` user ${user.email} is registered`);

        // -----додавання імені користувача
        updateProfile(user, {
          displayName: values.name,
        });
      })
      .then(() => navigate("/signin"))
      .catch((error) =>
        error.message.includes("auth/email-already-in-use")
          ? setErrorComparison("such a user exist")
          : setErrorComparison(error.message)
      );
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
            <div>
              <input
                type="email"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.email}
                name="email"
                placeholder="email"
              />
              {props.errors.email && (
                <div id="feedback">{props.errors.email}</div>
              )}
            </div>

            <div>
              <input
                type="password"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.password}
                name="password"
                placeholder="password"
              />
              {props.errors.password && (
                <div id="feedback">{props.errors.password}</div>
              )}
            </div>
            <div>
              <input
                type="password"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.confirmPassword}
                name="confirmPassword"
                placeholder="confirmPassword"
              />
              {props.errors.confirmPassword && (
                <div id="feedback">{props.errors.confirmPassword}</div>
              )}
            </div>
            <input
              style={{ display: "none" }}
              id="avatar-photo"
              type="file"
              onBlur={props.handleBlur}
              name="photo"
              placeholder="add photo"
              // formik не підтримує завантаження файлів за замовчанням, тому робимо так:
              onChange={(event) => {
                props.setFieldValue("photo", event.currentTarget.files[0]);
              }}
            />
            <label htmlFor="avatar-photo"> add photo</label>
            {errorComparison && <div id="feedback">{errorComparison}</div>}
            {success && <div id="feedback">{success}</div>}

            <button
              type="submit"
              disabled={!props.dirty || props.isSubmitting}
              className="button"
            >
              Submit
            </button>
          </form>
        )}
      </Formik>

      <p style={{ color: "red" }} className="login-link">
        or move to<Link to={"/signin"}>Signin</Link>
      </p>
    </div>
  );
};

export default SignUp;
