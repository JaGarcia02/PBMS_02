import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { ImCross } from "react-icons/im";
import { MdPersonAddAlt1 } from "react-icons/md";
import axios from "axios";
import { API_URL_ADMIN } from "../../utils/Url";
import {
  BsPersonFillDash,
  BsPersonFillLock,
  BsArrowLeftShort,
  BsClockFill,
  BsLockFill,
  BsPersonFillAdd,
} from "react-icons/bs";
import { useSelector } from "react-redux";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt from "jwt-decode";
import { MdLockReset } from "react-icons/md";

const AdminSuperAdminAccount = () => {
  const { branding } = useSelector((state) => state.branding);
  const { admin } = useSelector((state) => state.auth);
  const decoded = jwt(admin);

  return (
    <div className="w-full h-full flex flex-col p-4">
      <ToastContainer />
      <span className="text-[32px] arial-narrow-bold text-black">
        Account Setting - Super Admin
      </span>

      <div className="flex justify-between w-210 arial-narrow mt-10">
        {/* Left */}
        <div className="">
          <span className="bg-yellow-500 text-black flex items-center justify-center text-center ml-4 h-70 w-70 p-1 rounded-full font-Roboto text-[150px] text-white">
            {decoded.email.charAt(0).toUpperCase()}
          </span>
        </div>
        {/* Right */}
        <div className=" w-110 mt-12">
          <div className="block">
            {/* fullname */}
            <div className="flex mt-1 justify-between">
              <label htmlFor="">Full Name:</label>
              <input
                type="text"
                className="border border-black w-75 "
                value={decoded.Admin_name}
              />
            </div>
            {/* email */}
            <div className="flex mt-1 mb-5 justify-between">
              <label htmlFor="">Email Address:</label>
              <input
                type="text"
                className="border border-black w-75"
                value={decoded.email}
              />
            </div>

            {/* username */}
            <div className="flex mt-1 justify-between">
              <label htmlFor="">Username:</label>
              <input
                type="text"
                className="border border-black w-75 "
                value={decoded.username}
              />
            </div>
            {/* password */}
            <div className="flex mt-1 justify-between">
              <label htmlFor="">Password:</label>
              <input type="text" className="border border-black w-75 " />
            </div>
            {/* reset button */}
            <div className="flex mt-5 ml-35">
              <button className="arial-narrow-bold justify-center items-center flex border-[2.5px] border-gray-400 rounded-sm w-35 h-7.5 active:duration-75 active:scale-1 transition-all ease-out hover:(bg-gray-400 text-white border-gray-400)">
                <MdLockReset className="mr-1 text-[22px]" />
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <button className="ml-7 m w-42 h-8 mt-2 text-[15px] justify-center border-none items-center text-black flex hover:(bg-gray-300)">
        <IoAddSharp className="mr-1 w-5 h-fixed text-black" />
        Add Business Unit
      </button> */}
    </div>
  );
};

export default AdminSuperAdminAccount;
