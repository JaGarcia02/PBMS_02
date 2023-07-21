import React, { useState } from "react";
import axios from "axios";
import { BsCheck2Circle } from "react-icons/bs";
import { BiSave } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
import { API_URL_ADMIN } from "../../utils/Url";
const AdminDT = () => {
  const [timezone, setTimeZone] = useState("");
  const [dateTimeFormat, setDateTimeFormat] = useState("");
  const [showModal, setShowModal] = useState(false);
  const update_dt_settings = (e) => {
    e.preventDefault();
    axios
      .post(API_URL_ADMIN + "setup_setting", { timezone, dateTimeFormat })
      .then((res) => {
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          window.location.reload();
        }, 1500);
      })
      .catch((err) => console.log(err));
  };

  const SuccessModal = () => {
    return (
      <motion.div className="w-screen h-screen fixed flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          exit={{ opacity: 0 }}
          className="w-80 h-75  mb-60 mr-120 bg-gray-100 shadow-md rounded-sm"
        >
          <div className="items-center mt-5 justify-center flex flex-col">
            <BsCheck2Circle className="text-green-600 w-30 h-30" />
            <span className="arial-narrow-bold text-[30px] text-black item-center justify-center  flex text-center">
              Thank you!
            </span>
            <span className="arial-narrow text-[20px] item-center text-black justify-center flex text-center">
              Your submission has been sent.
            </span>
            {/* <button
              onClick={() => window.location.reload()}
              className="w-40 mt-5 bg-green-300 items-center justify-center text-black h-10"
            >
              Your Welcome
            </button> */}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col p-4 relative">
      <span className="arial-narrow-bold text-[18px] text-black">
        Date and Time
      </span>
      <span className="arial-narrow-italic  text-[15px] mt-3 text-black">
        Set standard date and time format for the whole system.
      </span>

      <div className="w-full h-full flex ">
        <div className=" flex flex-col ">
          <span className="mt-5 arial-narrow ">Set Time Zone</span>

          <select
            className="mt-3 border arial-narrow border-black w-200"
            onChange={(e) => setTimeZone(e.target.value)}
          >
            <option value="" selected hidden>
              Choose time zone
            </option>
            <option value="UTC +8">UTC +8</option>
          </select>
          <div className="flex arial-narrow flex-col ">
            <span className="mt-5 mr-5">Date and Time Format</span>
            <select
              className="mt-3 border border-black w-200"
              onChange={(e) => setDateTimeFormat(e.target.value)}
            >
              <option value="" selected hidden>
                Choose Date and time Format
              </option>
              <option value="MM/DD/YYYY hh:mm">MM/DD/YYYY hh:mm</option>
              <option value="DD/MM/YYYY hh:mm">DD/MM/YYYY hh:mm</option>
              <option value="MMMM DD, YYYY hh:mm a">
                MMMM DD, YYYY hh:mm a
              </option>
              <option value="MMMM-DD-YYYY hh:mm a">MMMM-DD-YYYY hh:mm a</option>
              <option value="MM/DD/YYYY HH:mm">MM/DD/YYYY HH:mm</option>
              <option value="DD/MM/YYYY HH:mm">DD/MM/YYYY HH:mm</option>
              <option value="MMMM DD, YYYY HH:mm a">MMMM DD, YYYY HH:mm</option>
              <option value="MMMM-DD-YYYY HH:mm a">MMMM-DD-YYYY HH:mm </option>
            </select>

            <button
              onClick={update_dt_settings}
              className=" absolute arial-narrow-bold bottom-4 left-3 flex border-green-500 active:scale-1 rounded-sm text-[14px] h-7 w-24 hover:(border-green-500 rounded-sm) active:duration-75 transition-all hover:(scale-108 ease-in-out  transform py-1 rounded-sm)  mb-5 flex items-center justify-center text-green-600   mr-12 disabled:(bg-gray-500 border-gray-500 cursor-not-allowed)  focus:(outline-none) dark:(bg-transparent border-green-500 border-2 text-green-500"
            >
              <BiSave className="mr-2 text-green-600" />
              Update
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>{showModal && <SuccessModal />}</AnimatePresence>
    </div>
  );
};

export default AdminDT;
