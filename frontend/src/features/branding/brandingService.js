import axios from "axios";
import { API_URL_ADMIN } from "../../utils/Url";

const getBranding = async () => {
  const response = await axios.get(API_URL_ADMIN + "getBrand");

  return response.data;
};

const getSettings = async () => {
  const response = await axios.get(API_URL_ADMIN + "get-setting");

  return response.data;
};
const brandingService = {
  getBranding,
  getSettings,
};

export default brandingService;
