import axios from "axios";
import { toast } from "react-toastify";
import Cookie from "js-cookie";
import { API_URL_ADMIN } from "../../utils/Url";

const loginAdmin = async (userData) => {
  const response = await axios.post(API_URL_ADMIN + "login-admin", userData);

  return response.data;
};

const checkToken = async (token) => {
  const response = await axios.post(API_URL_ADMIN + "checkToken", {
    token,
  });

  return response.data;
};

const logoutAdmin = async () => {
  const res = await axios.get(API_URL_ADMIN + "logout");

  Cookie.remove("admin_access_token");
};

const authService = {
  loginAdmin,
  checkToken,
  logoutAdmin,
};

export default authService;
