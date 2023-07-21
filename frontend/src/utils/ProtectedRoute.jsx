import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import jwt from "jwt-decode";
const ProtectedRoute = ({ role, dept, access }) => {
  const { user } = useSelector((state) => state.user);
  const { admin } = useSelector((state) => state.auth);
  const { sections } = useSelector((state) => state.sections);
  if (admin) {
    return <Navigate to="/admin-dashboard" />;
  }

  if (user === undefined || user === null) {
    return <Navigate to="/" />;
  }

  const bearer = jwt(user);
  const arrayLevel = bearer?.section.split(",");
  const verify = arrayLevel.some((al) => al == access);
  const availableSection = sections?.some(
    (sec) => sec?.admin_sectionName == access
  );

  return (bearer?.role <= role || bearer?.dept == dept) &&
    verify &&
    availableSection ? (
    <Outlet />
  ) : user ? (
    <Navigate to="/*" />
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;
