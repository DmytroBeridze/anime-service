import "./signUp.scss";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useState } from "react";

const SignUp = () => {
  const [errorComparison, setErrorComparison] = useState("");
  const [success, setSuccess] = useState("");

  // --------registration
  const register = (values) => {
    // if (values.password !== values.confirmPassword) {
    //   setErrorComparison("passwords do not match");
    //   throw new Error(errorComparison);
    // }
    console.log(values);
    createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password,
      values.name,
      values.photo
    )
      .then((userCredential) => {
        const user = userCredential.user;
        setSuccess(` user ${user.email} is registered`);
        // -----додавання імені користувача
        updateProfile(user, {
          displayName: values.name,
          photoURL: values.photo,
        });
        console.log(userCredential);
      })
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
          photo: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
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
