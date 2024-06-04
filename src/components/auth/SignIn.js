import "./signIn.scss";
import { useState } from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { Formik } from "formik";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import useCookieHook from "../../hooks/cookie.hook";

const SignIn = ({ userLoginData }) => {
  const [errorComparison, setErrorComparison] = useState("");
  const navigate = useNavigate();
  const { setCookie } = useCookieHook();

  // --------registration
  const register = async (values) => {
    // if (values.password !== values.confirmPassword) {
    //   setErrorComparison("passwords do not match");
    //   throw new Error(errorComparison);
    // }
    await signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        userLoginData(user);
        setCookie("userLogin", user.email);
      })
      .then(() => navigate("/"))
      .catch((error) => setErrorComparison("user does not exist"));
  };

  // -------validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("missing email"),
    password: Yup.string().required("required").min(6, "min 6 symbols"),
  });

  return (
    <div className="signin">
      <div className="signin__container"></div>
      <h2 style={{ color: "red" }}>Signin</h2>

      <Formik
        initialValues={{ email: "", password: "" }}
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

            {props.errors.password && (
              <div id="feedback">{props.errors.password}</div>
            )}
            {props.errors.email && (
              <div id="feedback">{props.errors.email}</div>
            )}
            {errorComparison && <div id="feedback">{errorComparison}</div>}
            <button type="submit" disabled={!props.dirty || props.isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>

      <p style={{ color: "red" }}>
        or move to<Link to={"/signup"}>Signup</Link>
      </p>
    </div>
  );
};

export default SignIn;
