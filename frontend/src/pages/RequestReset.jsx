import React, { useState } from "react";
import axios from "axios";
import { IoMdInformationCircle, IoMdCloseCircle } from "react-icons/io";
import { API_URL_USER } from "../utils/Url";

const RequestReset = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const sendRequestForgot = (e) => {
    e.preventDefault();

    axios
      .post(API_URL_USER + "request-forgot", { email })
      .then((res) => {
        setSuccess(res.data.message);
        setError(null);
      })
      .catch((err) => {
        setError(err.response.data.message);
        setSuccess(null);
      });
  };
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center prdc-color">
      <img
        src="/imgs/FINAL-PRDC-LOGO-2021.png"
        className="h-30 w-30 object-contain"
      />
      <form
        className="bg-white h-110 w-90 flex flex-col items-center rounded-md justify-center relative"
        onSubmit={sendRequestForgot}
      >
        <span className="text-black arial-narrow font-bold text-[30px] -mt-10">
          Forgot Password
        </span>
        <img src="/imgs/forgot.svg" className="h-40 w-40 " />
        <span className="text-black arial-narrow mb-10">
          Enter your email address to reset your password.
        </span>
        <input
          className="shadow-sm border-t border-t-gray-300 shadow-gray-700 mb-10 rounded-md focus:(outline-none)"
          onChange={(e) => setEmail(e.target.value)}
        />
        {success ? (
          <span className="flex arial-narrow items-center text-[12px] bg-green-600 h-6 rounded-md text-white">
            <IoMdInformationCircle className="text-blue-700" />
            {success}
          </span>
        ) : (
          <button
            className="bg-green-700 rounded-sm w-40 shadow-md shadow-gray-500 text-white hover:(border-green-400 bg-green-400)"
            type="submit"
          >
            Submit
          </button>
        )}
        {error && (
          <span className="absolute bottom-3 flex items-center bg-red-400 w-[80%] justify-center h-7 text-black rounded-md">
            <IoMdCloseCircle className="text-red-700 text-black mr-1" />
            {error}
          </span>
        )}
      </form>
    </div>
  );
};

export default RequestReset;
