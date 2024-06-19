import "./signUp.scss";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import useFirebaseHook from "../../hooks/firebase.hook";
import Uploader from "../uploader/Uploader";

const SignUp = () => {
  const navigate = useNavigate();
  const { register, success, errorComparison, setErrorComparison } =
    useFirebaseHook();
  // -------validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("required"),
    email: Yup.string().required("required").email("missing email"),
    password: Yup.string().required("required").min(6, "min 6 symbols"),
    confirmPassword: Yup.string()
      .required("required")
      .oneOf([Yup.ref("password")], "passwords do not match"),
  });

  return (
    <div className="signup">
      <div className="signup__container"></div>
      <h2>Signup</h2>

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
          // --------registration
          register(values).then(() =>
            setTimeout(() => {
              navigate("/signin");
            }, 1500)
          );
          resetForm();
          setErrorComparison("");
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <div>
              <input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.text}
                name="name"
                placeholder="name"
              />
              {props.errors.name && (
                <div id="feedback">{props.errors.password}</div>
              )}
            </div>
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
            {/* ------upload photo and show preview */}
            <Uploader props={props} />

            {errorComparison && <div id="feedback">{errorComparison}</div>}
            {success && (
              <div id="feedback " className="reg-success">
                {success}
              </div>
            )}

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

      <p className="login-link">
        or move to<Link to={"/signin"}>Signin</Link>
      </p>
    </div>
  );
};

export default SignUp;
