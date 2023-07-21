import React from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  BsCheck2Circle,
  BsArrowLeftShort,
  BsXCircleFill,
  BsCircleFill,
  BsCheckLg,
  BsDiagram2Fill,
  BsSendFill,
  BsPower,
  BsArrowUpLeftCircleFill,
  BsCheckCircleFill,
  BsClipboard2CheckFill,
} from "react-icons/bs";

import "react-toastify/dist/ReactToastify.css";

const Modal = ({ children }) => {
  return (
    <motion.div className="bg-black/50 h-screen w-screen fixed items-center justify-center flex z-999">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        exit={{ opacity: 0 }}
        className="absolute bg-white h-75 w-120 items-center shadow-md shadow-gray-900 z-999"
      >
        <div className="flex flex-col items-center justify-center">
          <div className=" h-3 w-full modal-successappform"></div>
          <BsCheckCircleFill className="modal-successapptext  mt-7 w-20 mb-3 h-20" />
          <span className=" text-[30px] modal-successapptext arial-narrow-bold">
            Success!
          </span>
          <span className="modal-successappform h-1 w-50 mt-2"></span>

          <span className="text-center arial-narrow-bold items-center justify-center flex text-[20px] mt-5">
            {children}
          </span>

          <button className="rounded-full w-30 mt-5 mb-8  border-black border-[2.5px] border-success bg-white items-center modal-successapptext justify-center h-8 arial-narrow-bold text-[18px] hover:(border-green-700) focus:(outline-none border-green-700)">
            OK
          </button>
          <span className=" h-3 w-full modal-successappform"></span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
