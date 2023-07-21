import axios from "axios";
import { API_URL_USER } from "../../utils/Url";

const create_user = async (token, objectData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL_USER + "create-user",
    objectData,
    config
  );

  return response;
};

const getAllUsers = async (searchValue, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    API_URL_USER +
      "checkAll" +
      "/" +
      searchValue.sort +
      "?q=" +
      searchValue.search,
    config
  );

  return response.data;
};

const reset_user = async (ID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL_USER + "reset-account", ID, config);

  return response.data;
};

const unsuspend_user = async (ID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL_USER + "unsuspend-account",
    ID,
    config
  );

  return response.data;
};

const suspend_user = async (ID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL_USER + "suspend-account",
    ID,
    config
  );

  return response.data;
};

const reactivate_user = async (ID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL_USER + "activate-user", ID, config);

  return response.data;
};

const deactivate_user = async (ID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL_USER + "deactivate-user",
    ID,
    config
  );

  return response.data;
};

const edit_user = async (object, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL_USER + "edit-user", object, config);

  return response.data;
};

const usersService = {
  reset_user,
  getAllUsers,
  unsuspend_user,
  suspend_user,
  reactivate_user,
  edit_user,
  create_user,
  deactivate_user,
};

export default usersService;
