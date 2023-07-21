import axios from "axios";
import { API_URL_ADMIN } from "../../utils/Url";

const getSection = async () => {
  const response = await axios.get(API_URL_ADMIN + "get-section");

  localStorage.setItem("sections", JSON.stringify(response.data));
  return response.data;
};

const sectionService = {
  getSection,
};

export default sectionService;
