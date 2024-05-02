import "./headerSearch.scss";
import { Field, Formik, Form, ErrorMessage } from "formik";
import play from "../../resources/png/play.png";
import AnimeService from "../services/AnimeService";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";

const HeaderSearch = ({ open, setAnimeData }) => {
  // const { getByname, error, loading, clearError } = AnimeService();
  // для перенаправлення на потрібну сторінку після вводу даних  в строку пошуку
  const history = useNavigate();

  const getAnimeName = (values) => {
    const name = values.name.replaceAll(" ", "%20");
    setAnimeData(name);
    // getByname(name).then((data) => setAnimeData(data));
    history("/movies/searchMovie");
  };
  return (
    <>
      <Formik
        initialValues={{ name: "" }}
        validationSchema={object({
          name: string().required("Required").min(2, "Less than two"),
        })}
        // validate={(values) => {
        //   const errors = {};
        //   if (!values.name) {
        //     errors.name = "Required";
        //   }

        //   return errors;
        // }}
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
          <div
            className={
              open
                ? "header-nav__search-container active"
                : "header-nav__search-container "
            }
          >
            <Field
              type="text"
              name="name"
              id="name"
              placeholder="Enter Name"
              className={
                open
                  ? "header-nav__search-input active"
                  : "header-nav__search-input "
              }
            />

            <button type="submit" className="header-nav__search-btn">
              <img src={play} alt="play" />
            </button>
          </div>

          <ErrorMessage
            name="name"
            component="div"
            style={{ color: "red" }}
            className="header-nav__error"
            // className={open ? "header-nav__error active" : "header-nav__error "}
          />
        </Form>
      </Formik>
    </>
  );
};
export default HeaderSearch;

// <form
//   action=""
//   className={
//     open ? "header-nav__search-form active" : "header-nav__search-form"
//   }
// >
//   <div
//     className={
//       open
//         ? "header-nav__search-container active"
//         : "header-nav__search-container "
//     }
//   >
//     <input
//       type="search"
//       name="search"
//       id="search"
//       placeholder="Enter Title"
//       className={
//         open
//           ? "header-nav__search-input active"
//           : "header-nav__search-input "
//       }
//     />
//     <button type="submit" className="header-nav__search-btn">
//       <Link to="movies/movie">
//         <img src={play} alt="play" />
//       </Link>
//     </button>
//   </div>
// </form>
