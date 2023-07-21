import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const reloadPage = () => {
    navigate("/");
  };
  return (
    <div>
      <button onClick={reloadPage}>Reload</button>
    </div>
  );
};

export default NotFoundPage;
