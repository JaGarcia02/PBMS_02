import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { API_URL, API_URL_HR } from "../../../utils/Url";
import moment from "moment";
import { BsArrowLeftShort, BsFillCheckCircleFill } from "react-icons/bs";
import { BiSave } from "react-icons/bi";
import { useSelector } from "react-redux";
import axios from "axios";
import { Logs } from "../../../utils/Logs";
import { useEdit } from "../../../Hooks/useAuthorized";

const HrApplicantUpdateDateInterview = ({
  applicantInfo,
  reqObjs,
  setReqObjs,
  setUpdateAppointmentDate,
  setApplicants,
}) => {
  const { branding } = useSelector((state) => state.branding);
  const [appointmentSet, setAppointmentSet] = useState(false);
  const [updateAppointment, setUpdateAppointment] = useState("");
  const disabledDates = () => {
    var today = new Date().toISOString().slice(0, 16);

    return today;
  };

  console.log(applicantInfo);

  const updateInterview = () => {
    if (applicantInfo.status == 1) {
      Logs(
        "UPDATE",
        `Final Initial Interview  Appointment: Changed,  Applicant Name: ${applicantInfo.firstname} ${applicantInfo.lastname}`
      );
    }
    if (applicantInfo.status == 2) {
      Logs(
        "UPDATE",
        `Final Exam  Appointment: Changed,  Applicant Name: ${applicantInfo.firstname} ${applicantInfo.lastname}`
      );
    }
    if (applicantInfo.status == 3) {
      Logs(
        "UPDATE",
        `Final Interview  Appointment: Changed,  Applicant Name: ${applicantInfo.firstname} ${applicantInfo.lastname}`
      );
    }
    axios
      .put(API_URL_HR + "update-requirements", {
        applicant_AppointmentDates: reqObjs.applicant_Appointment,
        ID: applicantInfo.ID,
      })
      .then((res) => {
        if (!reqObjs.applicant_Appointment) {
          document.getElementById("dateANDtime").style.borderColor = "red";
          alert("PBMS Warning!\nDate and Time Field is Empty!");
        } else {
          setAppointmentSet(true);

          setTimeout(() => {
            setUpdateAppointmentDate(false);
            setReqObjs({
              ...reqObjs,
              applicant_Appointment: e.target.value,
            });
          }, 3000);

          axios
            .get(API_URL_HR + `get-applicants/all?q=`)
            .then((res) => setApplicants(res.data))
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  const AppointmentSet = () => {
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
            <div className=" h-3 w-full bg-yellow-500"></div>
            <BsFillCheckCircleFill className="text-yellow-500 mt-7 w-20 mb-3 h-20" />
            <span className="text-yellow-500 text-[30px] arial-narrow-bold">
              Updated!
            </span>
            <span className="bg-yellow-500 h-1 w-60 mt-2 mb-3"></span>

            <span className="text-center arial-narrow-bold items-center justify-center flex text-[18px]">
              Appointment has been successfully updated.
            </span>

            <button
              onClick={() => setUpdateAppointmentDate(false)}
              className="rounded-full w-30 mt-5 mb-8 border-yellow-500 border-[2.5px] bg-white items-center justify-center text-yellow-500 h-8 arial-narrow-bold text-[18px] hover:(border-yellow-500) focus:(outline-none border-yellow-500)"
            >
              OK
            </button>
            <span className=" h-3 w-full bg-yellow-500"></span>
          </div>
        </motion.div>
      </motion.div>
    );
  };

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
                  UPDATE APPOINTMENT
                </span>
                {applicantInfo.status == 1 ? (
                  <span className="text-white arial-narrow-bold text-[15px] flex">
                    (FOR INITIAL INTERVIEW)
                  </span>
                ) : applicantInfo.status == 2 ? (
                  <span className="text-white arial-narrow-bold text-[15px] flex">
                    (FOR EXAMINATION)
                  </span>
                ) : applicantInfo.status == 3 ? (
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
                onClick={() => setUpdateAppointmentDate(false)}
                className=" bg-white absolute left-149 top-1 prdc-button arial-narrow-bold active:scale-1 ease-in-out rounded-sm text-[14px] h-8 w-20 hover:(prdc-button rounded-sm) active:duration-75 transition-all flex items-center justify-center disabled:(cursor-not-allowed) focus:(outline-none) dark:(bg-transparent border-green-500 border-2 text-green-500 hover:text-[15px]"
              >
                <BsArrowLeftShort className="text-[20px] cursor-pointer <md:(text-[50px])" />
                Back
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
                onChange={(e) =>
                  setReqObjs({
                    ...reqObjs,
                    applicant_Appointment: e.target.value,
                  })
                }
                className="w-80 border-[2.5px] border-black text-[16px] arial-narrow rounded-md mt-2 shadow-lg active:scale-1 active:duration-75 transition ease-in-out transform hover:scale-101"
              />
            </div>
          </div>

          {/* save button ================================================================ */}
          <div className="absolute bottom-7 left-147">
            <button
              onClick={updateInterview}
              className="flex items-center arial-narrow-bold justify-center text-[14px] rounded-sm w-22 h-8 shadow-sm border-[2.5px] prdc-text border-yellow-500 active:scale-1 active:duration-75 transition-all ease-in-out transition py-1 hover:border-[3px] hover:border-yellow-500  hover:bg-yellow-500 hover:text-white disabled:(cursor-not-allowed)"
              disabled={useEdit() ? false : true}
            >
              <BiSave className="mr-1 " />
              Save
            </button>
          </div>
          {/* save button ================================================================ */}
          <div className="flex prdc-color w-full h-5 absolute bottom-0" />
        </div>
      </motion.div>
      {appointmentSet && <AppointmentSet />}
    </motion.div>
  );
};

export default HrApplicantUpdateDateInterview;
