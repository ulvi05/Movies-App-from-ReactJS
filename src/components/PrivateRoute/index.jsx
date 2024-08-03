import { useAuth } from "../../services/context/authContext";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
  const { auth } = useAuth();
  if (auth) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

PrivateRoute.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default PrivateRoute;
