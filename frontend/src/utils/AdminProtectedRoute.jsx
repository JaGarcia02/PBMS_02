import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import jwt from "jwt-decode";
const AdminProtectedRoute = ({ role }) => {
  const { admin } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  if (admin === undefined || admin === null) {
    return <Navigate to="/" />;
  }

  const bearer = jwt(admin);
  return bearer?.role <= role ? (
    <Outlet />
  ) : admin ? (
    <Navigate to="/*" />
  ) : (
    <Navigate to="/" />
  );
};

export default AdminProtectedRoute;
