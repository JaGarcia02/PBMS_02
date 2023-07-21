import React, { useState } from "react";
import axios from "axios";
import { API_URL_ADMIN } from "../../utils/Url";

const AdminForgot = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const requestForgot = (e) => {
    e.preventDefault();

    axios
      .post(API_URL_ADMIN + "forgot-admin", { email })
      .then((res) => setSuccess(true))
      .catch((err) => setError(err.message));
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form
        className="rounded-md shadow-md shadow-gray-800 w-140 h-80 flex flex-col items-center justify-center relative"
        onSubmit={requestForgot}
      >
        <span className="top-3 left-3 absolute text-[25px] text-black arial-narrow-bold">
          Account Recovery
        </span>
        <div className="flex flex-col w-[95%] mt-20">
          <span className="mb-6 text-[20px] arial-narrow text-black">
            Please enter your valid email address for admin account recovery.
          </span>
          <input
            className="border h-9 border-gray-600 rounded-md p-1"
            placeholder="Email"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-[95%] flex items-center justify-end mt-20">
          {success ? (
            <span className="w-full text-center bg-green-400 rounded-md arial-narrow text-black">
              Success! Please see your Email for the recovery account!
            </span>
          ) : (
            <button
              className="w-40 bg-gray-900  arial-narrow text-white"
              type="submit"
            >
              Recover
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AdminForgot;
