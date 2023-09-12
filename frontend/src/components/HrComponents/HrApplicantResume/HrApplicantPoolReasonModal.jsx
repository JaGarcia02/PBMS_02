import React, { useEffect, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { API_URL, API_URL_HR } from "../../../utils/Url";
import { AiFillCloseCircle, AiOutlineCloseSquare } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import {
  BsArrowLeftShort,
  BsDiagram2Fill,
  BsPersonXFill,
} from "react-icons/bs";
import { BiSave } from "react-icons/bi";
import { useSelector } from "react-redux";
import axios from "axios";
import { AiFillEdit, AiOutlineUsergroupDelete } from "react-icons/ai";

const HrApplicantPoolReasonModal = ({
  applicantInfo,
  reqObjs,
  setReqObjs,
  setPoolingReasonModal,
  updateApplicantPool,
}) => {
  const { branding } = useSelector((state) => state.branding);
  const [pooledModal, setPooledModal] = useState(false);
  const [poolReasonText, setPoolReasonText] = useState("");

  const validation = () => {
    if (poolReasonText == "") {
      alert("PBMS:\nCannot leave text field empty!");
    } else {
      updateApplicantPool(
        applicantInfo.ID,
        7,
        applicantInfo.lastname + " " + applicantInfo.firstname,
        poolReasonText
      );
    }
  };

  const PoolSuccessModal = () => {
    return (
      <motion.div className="flex items-center justify-center absolute top-0 left-0 bg-black/50 h-screen w-screen flex z-999">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          exit={{ opacity: 0 }}
          className="w-120 h-75 rounded-md text-center bg-white items-center flex-col justify-center"
        >
          <div className="flex flex-col items-center justify-center">
            <div className=" h-3 w-full bg-red-500"></div>
            <BsPersonXFill className="text-red-500 mt-7 w-20 mb-3 h-20" />
            <span className="text-red-500 text-[30px] arial-narrow-bold">
              Applicant Pooled!
            </span>
            <span className="bg-red-500 h-1 w-60 mt-2 mb-3">Okay</span>

            <span className="text-center arial-narrow-bold items-center justify-center flex text-[18px]">
              Applicant Has Been Pooled!
            </span>

            <button
              onClick={() => setPoolingReasonModal(false)}
              className="rounded-full w-30 mt-5 mb-8 border-black border-[2.5px] bg-white items-center justify-center text-black h-8 arial-narrow-bold text-[18px] hover:bg-black hover:text-white"
            >
              Close
            </button>
            <span className=" h-3 w-full bg-red-500"></span>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <motion.div
      className="w-full h-full fixed bg-black/50 items-center flex justify-center !top-0 !left-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      exit={{ opacity: 0 }}
    >
      <motion.div className="absolute bg-white h-95 w-150 items-center shadow-md shadow-gray-900  z-999">
        <div className="w-full h-full flex flex-col item-center text-center mb-5">
          <div className=" prdc-color w-full h-24">
            {/* Close Button ================================================================================================================================== close button */}
            <div className="flex">
              <div className="mt-2 ml-2">
                <img
                  src={
                    branding
                      ? API_URL + branding[0]?.Logo
                      : "/imgs/deafult_logo.jpg"
                  }
                  alt=""
                  className="h-20 w-25 rounded-sm object-contain"
                />
              </div>
              <div className="block mt-5">
                <span className="my-1 font-Roboto text-[23px] text-white arial-narrow-bold w-full text-center flex">
                  POOL
                </span>
                <span className="my-3 font-Roboto text-[23px] text-white arial-narrow-bold w-full text-center">
                  APPLICANT
                </span>
              </div>
            </div>

            <div className="mt-5 ml-2">
              <span className="flex items-center justify-center arial-narrow-bold mb-2 text-[20px]">
                Reason for pooling:
              </span>
              <textarea
                id="textArea"
                placeholder="Enter reason for pooling. . . ."
                className="border-2 px-2 py-2 h-40 border-gray-500 text-[14px] arial-narrow w-100 resize-none focus:(outline-none)"
                onChange={(e) => setPoolReasonText(e.target.value)}
              />
            </div>

            <div className="absolute top-0 right-0">
              <button
                onClick={() => setPoolingReasonModal(false)}
                className="w-8 h-8 absolute top-1 right-1 focus:outline-none text-[30px] cursor-pointer flex items-center justify-center mr-1 text-red-400 border-none active:scale-1 active:duration-75 transition-all ease-in-out hover:text-red-500 rounded-sm hover:rounded-sm"
              >
                <AiOutlineCloseSquare />
              </button>
            </div>

            {/* Close Button ================================================================================================================================== close button */}
          </div>

          {/* save button ================================================================ */}
          <div className="absolute bottom-8 left-128">
            <button
              // onClick={() =>
              //   updateApplicantPool(
              //     applicantInfo.ID,
              //     7,
              //     applicantInfo.lastname + " " + applicantInfo.firstname,
              //     poolReasonText
              //   )
              // }
              onClick={validation}
              className="flex items-center justify-center text-[18px] arial-narrow-bold rounded-sm w-20 h-8 shadow-sm border-[2.5px] text-red-500 border-red-500 hover:(border-red-500 border-[3.5px]) focus:(outline-none border-red-500)"
            >
              <BsDiagram2Fill className="mr-1" />
              Pool
            </button>
            <ToastContainer />
          </div>
          {/* save button ================================================================ */}
          <div className="flex prdc-color w-full h-5 absolute bottom-0"></div>
        </div>
      </motion.div>
      {pooledModal ? <PoolSuccessModal /> : ""}
    </motion.div>
  );
};

export default HrApplicantPoolReasonModal;
