import axios from "axios";
import jwt from "jwt-decode";
import { store } from "../store/store";
import { API_URL_SYSTEM } from "./Url";

const Logs = (action, desc) => {
  const state = store.getState();
  let user = state?.user.user;
  const decodedtoken = jwt(user);
  axios
    .post(API_URL_SYSTEM + "add-system-logs", {
      User: decodedtoken?.employeeId,
      Action: action,
      Description: desc,
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  return decodedtoken;
};

export { Logs };
