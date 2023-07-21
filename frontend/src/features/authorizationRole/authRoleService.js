import axios from "axios";
import { API_URL_ADMIN } from "../../utils/Url";

const get_authRole = async () => {
  const response = await axios.get(API_URL_ADMIN + "get-authorization");

  localStorage.setItem("authorizationRole", JSON.stringify(response.data));
  return response.data;
};

const authRoleService = {
  get_authRole,
};

export default authRoleService;
