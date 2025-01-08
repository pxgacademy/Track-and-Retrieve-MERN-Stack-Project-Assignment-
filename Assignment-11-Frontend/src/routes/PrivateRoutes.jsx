import PropTypes from "prop-types";
import useContextValue from "../hooks/useContextValue";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/loading/Loading";

function PrivateRoutes({ children }) {
  const { loading, user } = useContextValue();
  const { pathname } = useLocation();

  if (loading) return <Loading />;

  if (user) return children;
  else return <Navigate state={pathname} to="/signin" />;
}

PrivateRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoutes;
