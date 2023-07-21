import React, { useEffect, useState } from "react";
import { BsXSquareFill } from "react-icons/bs";
import { motion, MotionConfig } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { API_URL, API_URL_HR } from "../../../utils/Url";
import { AiFillCloseCircle, AiOutlineCloseSquare } from "react-icons/ai";
import { useAdd, useEdit } from "../../../Hooks/useAuthorized";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { BsArrowLeftShort, BsFillSave2Fill } from "react-icons/bs";
import { BiSave } from "react-icons/bi";
import { useSelector } from "react-redux";
import axios from "axios";

const HrApplicantSetDateInterview = ({
  setDateInterview,
  applicantInfo,
  reqObjs,
  setReqObjs,
  updateApplicant,
}) => {
  const { branding } = useSelector((state) => state.branding);
  const [appointmentSet, setAppointmentSet] = useState(false);
  const [thisAppointmentData, setThisAppointmentData] = useState("");

  const setInitialInterviewDate = () => {
    axios
      .put(API_URL_HR + "update-requirements", {
        applicant_AppointmentDates: thisAppointmentData,
        ID: applicantInfo.ID,
      })
      .then((res) => {
        if (!reqObjs.applicant_Appointment) {
          document.getElementById("dateANDtime").style.borderColor = "red";
          alert("PBMS Warning!\nDate and Time Field is Empty!");
        } else {
          setReqObjs({
            ...reqObjs,
            applicant_Appointment: thisAppointmentData,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const disabledDates = () => {
    var today = new Date().toISOString().slice(0, 16);

    return today;
  };

  useState(() => {
    axios
      .get(API_URL_HR + `view-appointment/${applicantInfo.ID}`)
      .then((res) => {
        setThisAppointmentData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <motion.div
      className="w-full h-full absolute bg-black/50 items-center flex justify-center !top-0 !left-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      exit={{ opacity: 0 }}
    >
      <motion.div className="absolute bg-white h-125 w-170 items-center shadow-md shadow-gray-900  z-999">
        <div className="w-full h-full flex flex-col item-center text-center mb-5">
          <div className=" prdc-color w-full h-25">
            {/* Close Button ================================================================================================================================== close button */}
            <div className="flex items-center">
              <div className="mt-2 ml-2">
                <img
                  src={
                    branding
                      ? API_URL + branding[0]?.Logo
                      : "/imgs/deafult_logo.jpg"
                  }
                  alt=""
                  className="h-20 object-contain w-25  rounded-sm"
                />
              </div>
              <div className="mt-5 ml-2">
                <span className="text-white  arial-narrow-bold text-[25px]">
                  MAKE AN APPOINTMENT
                </span>
                {applicantInfo.status == 0 ? (
                  <span className="text-white arial-narrow-bold text-[15px] flex">
                    (FOR INITIAL INTERVIEW)
                  </span>
                ) : (
                  ""
                )}
                {applicantInfo.status == 1 ? (
                  <span className="text-white arial-narrow-bold text-[15px] flex">
                    (FOR EXAMINATION)
                  </span>
                ) : (
                  ""
                )}
                {applicantInfo.status == 2 ? (
                  <span className="text-white arial-narrow-bold text-[15px] flex">
                    (FOR FINAL INTERVIEW)
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="">
              <button
                onClick={() => setDateInterview(false)}
                className="w-8 h-8 absolute top-1 right-1 focus:outline-none text-[30px] cursor-pointer flex items-center justify-center mr-1 text-red-400 border-none active:scale-1 active:duration-75 transition-all ease-in-out hover:text-red-500 rounded-sm hover:rounded-sm"
              >
                <AiOutlineCloseSquare />
              </button>
            </div>

            {/* Close Button ================================================================================================================================== close button */}
          </div>

          <div className="flex items-start justify-evenly mt-3">
            <div className="block ">
              <div className="">
                <span className="arial-narrow-bold text-[20px]">
                  Select Date and Time:
                </span>
              </div>
              <input
                id="dateANDtime"
                type="datetime-local"
                min={disabledDates()}
                value={reqObjs.applicant_Appointment}
                onChange={(e) => {
                  setReqObjs({
                    ...reqObjs,
                    applicant_Appointment: e.target.value,
                  });
                  setThisAppointmentData(e.target.value);
                }}
                className="w-80 border-[2.5px] border-black text-[16px] arial-narrow rounded-md mt-2 shadow-lg active:scale-1 active:duration-75 transition ease-in-out px-2"
              />
            </div>
            {thisAppointmentData.applicant_AppointmentDates ? (
              <div className="block">
                <div className="">
                  <span className="arial-narrow-bold text-[20px]">
                    Applicant Appointment:
                  </span>
                </div>
                <div>
                  <span className="block text-[16px] mt-2">
                    {moment(
                      thisAppointmentData.applicant_AppointmentDates
                    ).format("MMMM, DD YYYY hh:mm a")}
                  </span>
                  <span className="text-[14px]">(Initial Interview)</span>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          {/* save button ================================================================ */}
          <div className="absolute bottom-7 right-2">
            <button
              onClick={() => {
                setInitialInterviewDate();
                updateApplicant(
                  applicantInfo.ID,
                  applicantInfo.status + 1,
                  applicantInfo.lastname + " " + applicantInfo.firstname
                );
              }}
              className="flex items-center arial-narrow-bold justify-center text-[15px] rounded-sm w-22 h-8 shadow-sm border-[2.5px] prdc-text border-green-500 active:scale-1 active:duration-75 transition-all ease-in-out transition py-1 hover:border-[3px] hover:border-green-500  hover:bg-green-500 hover:text-white disabled:(cursor-not-allowed) focus:outline-none"
            >
              <BiSave className="mr-2 " />
              Save
            </button>
            <ToastContainer />
          </div>
          {/* save button ================================================================ */}
          <div className="flex prdc-color w-full h-5 absolute bottom-0"></div>
        </div>
      </motion.div>
      {appointmentSet ? <AppointmentSet /> : ""}
    </motion.div>
  );
};

export default HrApplicantSetDateInterview;
