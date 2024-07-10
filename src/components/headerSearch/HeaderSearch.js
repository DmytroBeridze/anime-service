import "./headerSearch.scss";
import { Field, Formik, Form, ErrorMessage } from "formik";
import play from "../../resources/png/play.png";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";

const HeaderSearch = ({ open, setAnimeData }) => {
  const history = useNavigate();

  const getAnimeName = (values) => {
    const name = values.name.replaceAll(" ", "%20");
    setAnimeData(name);
    history("/movies/searchMovie");
  };

  return (
    <>
      <Formik
        initialValues={{ name: "" }}
        validationSchema={object({
          name: string().required("Required").min(2, "Less than two"),
        })}
        onSubmit={(values, { resetForm }) => {
          getAnimeName(values);
          resetForm();
        }}
      >
        <Form
          action=""
          className={
            open ? "header-nav__search-form active" : "header-nav__search-form"
          }
        >
          <div className={"header-nav__search-container "}>
            <Field
              type="text"
              name="name"
              id="name"
              placeholder="Enter Name"
              className={"header-nav__search-input"}
            />

            <button type="submit" className="header-nav__search-btn">
              <img src={play} alt="play" />
            </button>
          </div>

          <ErrorMessage
            name="name"
            component="div"
            className="header-nav__error"
          />
        </Form>
      </Formik>
    </>
  );
};
export default HeaderSearch;
