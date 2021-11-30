import { Route, Redirect } from "react-router-dom";
import { getItem } from "../utilities/localStorage";

const PrivateRoutes = ({
  path,
  component,
  exact = false,
  redirectLink = "/",
}) => {
  const token = getItem("token");

  if (token === null || token === undefined) {
    return <Redirect to={redirectLink}></Redirect>;
  }

  return (
    <Route path={path} exact={exact}>
      {component}
    </Route>
  );
};

export { PrivateRoutes };
