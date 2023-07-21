import React, { useState } from "react";
import AdminSidebar from "../../components/AdminComponents/AdminSidebar";
import { motion } from "framer-motion";
import { AiFillCloseCircle } from "react-icons/ai";
import { BiSave } from "react-icons/bi";
import { BsCheck2Circle } from "react-icons/bs";
const AdminAccountSettings = () => {
  const [showModal, setShowModal] = useState(true);
  const Reset_password_admin = () => {
    return (
      <motion.div className="bg-black/50 h-screen w-screen fixed items-center justify-center flex z-999">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          exit={{ opacity: 0 }}
          className="w-100 h-70 rounded-md text-center relative bg-white items-center flex-col justify-center"
        >
          <div className="flex w-full flex flex-col">
            <span className="text-black text-left arial-narrow-bold ml-2 text-[15px] mt-3">
              Change Password
            </span>
            <span className="text-black text-left arial-narrow ml-4 text-[15px] mt-5">
              Current password
            </span>
            <input
              className="w-[90%] border-gray-400 border ml-2 mt-2 "
              type="password"
            />
            <span className="text-black text-left arial-narrow ml-4 text-[15px] mt-5">
              New password
            </span>
            <input
              className="w-[90%] border-gray-400 border ml-2 mt-2 "
              type="password"
            />
            <span className="text-black text-left arial-narrow ml-4 text-[15px] mt-5">
              Confirm password
            </span>
            <input
              className="w-[90%] border-gray-400 border ml-2 mt-2 "
              type="password"
            />{" "}
            <button
              className=" hover:(bg-gray-300 border-gray-300 ) text-[15px] mb-2 flex absolute right-0 bottom-0 items-center justify-center text-green-600   shadow-gray-600 mt-2 w-20 h-6 mr-5 disabled:(bg-gray-500 border-gray-500 cursor-not-allowed)  focus:(outline-none) dark:(bg-transparent border-green-500 border-2 text-green-500 hover:bg-green-700 hover:text-black)"
              type="submit"
            >
              <BiSave className="mr-2 text-green-600" />
              Save
            </button>
          </div>

          <AiFillCloseCircle
            className="text-[20px] absolute top-2 right-2 cursor-pointer text-red-500 hover:(text-red-600)"
            onClick={() => setShowRegister(false)}
          />
          {/* <button
            onClick={() => window.location.reload()}
            className="w-40 mt-5 bg-green-300 border-none items-center justify-center text-black h-10"
          >
            OK
          </button> */}
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="h-screen w-screen flex flex-col">
      <AdminSidebar />

      <div className="w-full justify-start mt-15  h-15 flex flex-col">
        <span className="mt-5 text-[20px] my-5 ml-6 text-black arial-narrow-bold">
          Account Setting - SUPER ADMIN
        </span>
      </div>
      <div className="flex ">
        <div className="w-full   flex ">
          <div className=" flex flex-col">
            <div className="ml-2 text-[100px] text-white flex items-center justify-center rounded-full h-80 w-80 bg-amber-400">
              SP
            </div>
          </div>
          <div className="ml-40 flex flex-col w-150 h-100">
            <div className="flex mb-2 flex-row  w-150 h-9 items-start justify-start">
              <span className="arial-narrow-bold w-[8rem] ">First Name: </span>
              <input className="border rounded-md border-black w-70" />
            </div>
            <div className="flex mb-2 flex-row  w-150 h-9 items-start justify-start">
              <span className="arial-narrow-bold w-[8rem] ">Email : </span>
              <input className="border rounded-md border-black w-70" />
            </div>
            <div className="flex mb-2 flex-row  w-150 h-9 items-start justify-start">
              <span className="arial-narrow-bold w-[8rem] ">
                Company Name :
              </span>
              <input className="border rounded-md border-black w-70" />
            </div>
            <div className="flex mb-10 flex-row  w-150 h-9 items-start justify-start">
              <span className="arial-narrow-bold w-[8rem] ">Position : </span>
              <input className="border rounded-md border-black w-70" />
            </div>
            <div className="flex mb-2 flex-row  w-150 h-9 items-start justify-start">
              <span className="arial-narrow-bold w-[8rem] ">Username : </span>
              <input className="border rounded-md border-black w-70" />
            </div>

            <div className="flex mb-2 ml-40 flex-row w-150 h-9 items-start justify-start">
              <button className="w-40 h-10 bg-green-200 shadow-md shadow-green-900 hover:bg-green-300 border-none ">
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>
      {showModal && <Reset_password_admin />}
    </div>
  );
};

export default AdminAccountSettings;
