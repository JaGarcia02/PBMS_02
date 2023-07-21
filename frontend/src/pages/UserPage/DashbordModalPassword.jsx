import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import jwt from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL_USER } from "../../utils/Url";
import Cookies from "js-cookie";
import { IoPaperPlaneOutline } from "react-icons/io5";
const DashbordModalPassowrd = () => {
  const { user } = useSelector((state) => state.user);
  const [newPassword, setNewPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  if (user == null || user == undefined) {
    return;
  }

  const changePassword = (e) => {
    e.preventDefault();
    if (newPassword.newPassword == newPassword.confirmPassword) {
      axios
        .put(API_URL_USER + "change-password", {
          newPassword: newPassword.confirmPassword,
          token: user,
        })
        .then((res) => {
          Cookies.remove("user_access_token");
          window.location.reload();
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Password don't match");
    }
  };

  const decodedToken = jwt(user);
  const dateNow = new Date();
  const dateExp = new Date(decodedToken.expired_at);

  // console.log(dateExp.getTime());
  return (
    decodedToken.changePassword == 0 ||
    (dateNow.getTime() >= dateExp.getTime() && (
      <div className="fixed inset-0 z-99999 bg-black/90 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-white relative p-2 rounded w-100 h-50 ">
          <div className="flex flex-col">
            <h1 className="items-center flex justify-center mb-8 font-bold">
              Set New Password
            </h1>
            <div className="ml-3">
              <form onSubmit={changePassword}>
                {/* Input Password */}
                <label htmlFor="" className="mr-2 ml-16 font-bold">
                  Password:
                </label>
                <input
                  className="border-black border rounded-md hover:bg-gray-200"
                  type="password"
                  name="Newpassword"
                  // value={Newpassword}
                  onChange={(e) =>
                    setNewPassword({
                      ...newPassword,
                      newPassword: e.target.value,
                    })
                  }
                  required
                />
                {/* Input Password */}

                {/* Input Confirm Password */}
                <div className="mt-2 mb-7">
                  <label htmlFor="" className="mr-2 font-bold">
                    Confirm Password:
                  </label>
                  <input
                    className="border-black border rounded-md  hover:bg-gray-200"
                    type="password"
                    name="rePassword"
                    //   value={rePassword}
                    onChange={(e) =>
                      setNewPassword({
                        ...newPassword,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                {/* Input Confirm Password */}

                <div className="items-center  justify-center flex">
                  {/* <button
                    type="submit"
                    className="flex justify-center items-center bg-green-700 text-light-200 w-40 active:scale-1 active:duration-75 transition-all hover:scale-108 ease-in-out transform py-1 rounded-xl bg-green-500 text-black hover:rounded-md"
                  >
                    Submit
                  </button> */}
                  <button
                    type="submit"
                    className="absolute arial-narrow-bold bottom-2 left-43 flex border-green-500 active:scale-1 rounded-sm text-[14px] h-7 w-24 hover:(border-green-500 rounded-sm) active:duration-75 transition-all hover:(scale-108 ease-in-out  transform py-1 rounded-sm)  mb-5 flex items-center justify-center text-green-600   mr-12 disabled:(bg-gray-500 border-gray-500 cursor-not-allowed)  focus:(outline-none) dark:(bg-transparent border-green-500 border-2 text-green-500"
                  >
                    <IoPaperPlaneOutline className="mr-2 text-green-600" />
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    ))
  );
};

export default DashbordModalPassowrd;
