import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL_ADMIN } from "../../utils/Url";
import { AnimatePresence, motion } from "framer-motion";
import { BsCheckLg } from "react-icons/bs";
import { MdError } from "react-icons/md";

const AdminRecovery = () => {
  const token = useParams();
  const [changePassword, setChangePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const clickChange = (e) => {
    e.preventDefault();

    if (changePassword != confirmPassword) {
      setError("Password doesn't match");
    } else if (changePassword.trim() == "" || confirmPassword.trim() == "") {
      setError("All Fields is required!");
    } else {
      axios
        .put(API_URL_ADMIN + "recover-password", {
          password: changePassword,
          token: token.token,
        })
        .then((res) => setSuccess(true))
        .catch((err) => setError(err.message));
    }
  };

  const SuccessModal = () => {
    return (
      <AnimatePresence>
        <motion.div className="fixed h-full w-full z-20 top-0 left-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
          <motion.div
            className={`absolute flex h-40 w-100 z-50 rounded-md bg-white shadow-white shadow-sm flex-col items-center justify-center dark:(bg-slate-900 text-white) <md:(w-full h-full rounded-none)`}
            initial={{
              scale: 0,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            animate={{
              scale: 1,
            }}
            exit={{ scale: 0 }}
          >
            <span className="text-[35px] mt-10 mb-10 flex items-center justify-center">
              {" "}
              <BsCheckLg className="text-green-700 mr-4" /> DONE
            </span>
            <button
              className="w-20 bg-gray-900 text-white"
              onClick={() => navigate("/pbms-admin")}
            >
              OK
            </button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col relative">
      {success && <SuccessModal />}
      <div className="flex-col w-150 h-80 shadow-md shadow-gray-700 rounded-md relative flex items-center  justify-center">
        <img src="/imgs/forgot.svg" className="h-30 w-30 absolute top-1" />
        <span className="arial-narrow text-[20px] mt-18 text-black">
          Change your password for recovery
        </span>
        <input
          className="w-[90%] border rounded-md border-gray-600 mt-10"
          onChange={(e) => setChangePassword(e.target.value)}
          type="password"
          placeholder="New Password"
        />
        <input
          className="w-[90%] border rounded-md border-gray-600 mt-8"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />

        <button
          className="mt-5 bg-gray-800 text-white w-40 arial-narrow"
          onClick={clickChange}
        >
          Submit
        </button>
      </div>
      {error && (
        <span className="mt-10 bg-red-500 p-1 absolute bottom-20 text-white rounded-md arial-narrow flex items-center justify-center">
          <MdError className="mr-2" /> {error}
        </span>
      )}
    </div>
  );
};

export default AdminRecovery;
