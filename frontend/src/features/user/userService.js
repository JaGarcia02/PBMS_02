import axios from "axios";
import Cookie from "js-cookie";
import { toast } from "react-toastify";

import { API_URL_USER } from "../../utils/Url";

const loginUser = async (userData) => {
  const response = await axios.post(API_URL_USER + "login-user", userData);

  return response.data;
};

const logoutUser = async (token) => {
  const res = await axios.get(API_URL_USER + `logout-user/${token}`);

  Cookie.remove("user_access_token");
};

const change_pass_loggedin = async (object, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL_USER + "auth-changepassword",
    object,
    config
  );
  toast.success("Password Successfully Changed!");
  return response.data;
};

const checkToken = async (token) => {
  const res = await axios.post(API_URL_USER + "checkToken", { token });

  return res.data;
};

const userService = {
  loginUser,
  logoutUser,
  change_pass_loggedin,
  checkToken,
};

export default userService;
