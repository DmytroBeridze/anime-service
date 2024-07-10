import Spinner from "../components/spinner/Spinner";
import Error from "../components/error/Error";

const finiteStateMashine = (process, Component, data) => {
  switch (process) {
    case "waiting":
      return "waiting";
    case "loading":
      return <Spinner />;
    case "error":
      return <Error />;
    case "ready":
      return <Component />;
  }
};

export default finiteStateMashine;
