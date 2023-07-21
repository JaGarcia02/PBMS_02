import React, { useState, useEffect } from "react";
import { FcLock } from "react-icons/fc";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { API_URL_USER } from "../utils/Url";

const ChangePassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  function Success_modal() {
    return (
      <motion.div className="fixed h-full w-full top-0 left-0 bg-black bg-opacity-80 flex items-center justify-center z-600 ">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          exit={{ scale: 0, opacity: 0 }}
          className="absolute h-50 flex w-80 z-50 rounded-md bg-white shadow-white shadow-sm flex-col items-center justify-center dark:(bg-slate-900 text-white)"
        >
          <span className="text-red-600 arial-narrow text-[18px] font-bold">
            PASSWORD CHANGE SUCCESSFULLY!
          </span>
          <button
            className="w-15 mt-5 bg-black text-white hover:(bg-gray-800 border-gray-800) focus:(outline-none)"
            onClick={() => {
              setSuccess(false);
              navigate("/");
            }}
          >
            OK
          </button>
        </motion.div>
      </motion.div>
    );
  }

  useEffect(() => {
    const validateToken = async () => {
      try {
        const checkerToken = await axios.post(API_URL_USER + "validate-token", {
          token: token,
        });
        return;
      } catch (err) {
        navigate("/*");
      }
    };
    validateToken();
  }, []);

  const update_password = (e) => {
    e.preventDefault();

    axios
      .put(API_URL_USER + "change-password", {
        newPassword,
        token,
      })
      .then((res) => setSuccess(true))
      .catch((error) => console.log(error));
  };

  return (
    <div className="prdc-color h-screen w-screen flex flex-col items-center justify-center">
      <img
        src="/imgs/FINAL-PRDC-LOGO-2021.png"
        className="h-30 w-30 object-contain"
      />
      <form
        className="bg-white h-80 w-150 flex flex-col items-center justify-center rounded-md"
        onSubmit={update_password}
      >
        <FcLock className="text-[90px] -mt-7" />
        <span className="arial-narrow text-[20px] mt-10">
          Enter your new password to reset your account
        </span>
        <input
          className="shadow-sm border-t border-t-gray-400 shadow-gray-700 rounded-md mt-5 focus:(outline-none)"
          type="password"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button
          className="mt-5 bg-green-700 w-30 rounded-sm text-white shadow-md shadow-gray-600 hover:(border border-green-400 bg-green-400)"
          type="submit"
        >
          Submit
        </button>
      </form>
      {success && <Success_modal />}
    </div>
  );
};

export default ChangePassword;
