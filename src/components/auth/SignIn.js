import "./signIn.scss";
import { useState } from "react";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import useFirebaseHook from "../../hooks/firebase.hook";
import HeaderLogo from "../haederLogo/HeaderLogo";

const SignIn = () => {
  const [errorComparison, setErrorComparison] = useState("");
  const { login } = useFirebaseHook();
  const navigate = useNavigate();

  // -------validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("missing email"),
    password: Yup.string().required("required").min(6, "min 6 symbols"),
  });

  return (
    <div className="signin">
      <HeaderLogo cl={"auth-logo"} />
      <h2>Signin</h2>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          // --singn in
          login(values).then(() => navigate("/"));
          resetForm();
          setErrorComparison("");
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
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

            {errorComparison && <div id="feedback">{errorComparison}</div>}
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
        or move to<Link to={"/signup"}>Signup</Link>
      </p>
    </div>
  );
};

export default SignIn;
