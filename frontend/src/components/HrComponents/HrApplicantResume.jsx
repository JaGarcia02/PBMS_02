import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AiFillCloseCircle, AiOutlineCloseSquare } from "react-icons/ai";
import moment from "moment";
import axios from "axios";
import { API_URL, API_URL_HR } from "../../utils/Url";
import { useEffect } from "react";
import { useState } from "react";
import { TbChecklist } from "react-icons/tb";
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
import { AiFillEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import jwt from "jwt-decode";
import { useAdd } from "../../Hooks/useAuthorized";
import { Logs } from "../../utils/Logs";
import HrRequirementsForm from "./HrApplicantResume/HrRequirementsForm";
import HrApplicantResumePlace from "./HrApplicantResume/HrApplicantResumePlace";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import HrApplicantSetDateInterview from "./HrApplicantResume/HrApplicantSetDateInterview";
import HrApplicantUpdateDateInterview from "./HrApplicantResume/HrApplicantUpdateDateInterview";
import { FaRegEdit } from "react-icons/fa";
import HrApplicantPoolReasonModal from "./HrApplicantResume/HrApplicantPoolReasonModal";

const HrApplicantResume = ({
  applicantInfo,
  setOpenModal,
  setApplicantInfo,
  setApplicants,
}) => {
  const { user } = useSelector((state) => state.user);
  const [dateInterview, setDateInterview] = useState(false); // set date modal for setting interview
  const [incrementalvalue, setIncrementalValue] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [placedModal, setPlacedModal] = useState(false); // for placed modal "Planned by bea BSD"
  const [pooledModal, setPooledModal] = useState(false);
  const [poolingReasonModal, setPoolingReasonModal] = useState(false);
  const [retunApplicant, setReturnApplicant] = useState(false); // for retunt queuing
  const [passApplicant, setPassApplicant] = useState(false);
  const [reqValidation, setReqValidation] = useState(false);
  const [requirements, setRequirements] = useState(false);
  const [updateAppointmentDate, setUpdateAppointmentDate] = useState(false); // update appointment date

  const [returnStatus, setReturnStatus] = useState(0);

  const [reqObjs, setReqObjs] = useState({
    applicant_TOR: applicantInfo.TOR,
    applicant_SSS: applicantInfo.SSS,
    applicant_Diploma: applicantInfo.Diploma,
    applicant_BirthCert: applicantInfo.BirthCert,
    applicant_NBI: applicantInfo.NBI,
    applicant_PhilHealth: applicantInfo.PhilHealth,
    applicant_PagIbig: applicantInfo.PagIbig,
    applicant_TIN: applicantInfo.TIN,
    applicant_Medical: applicantInfo.Medical,
    applicant_Pictures: applicantInfo.Pic,
    applicant_Resume: applicantInfo.resumeLink,
    applicant_MarriageCert: applicantInfo.MarriageContract,
    applicant_BarangayClearance: applicantInfo.BarangayClearance,
    applicant_PoliceClearance: applicantInfo.PoliceClearance,
    applicant_Appointment: applicantInfo.appointment,
    updatedAt: applicantInfo.updatedAt,
    applicant_PoolReason: applicantInfo.PoolReason,
    applicant_BirthcertDependent: applicantInfo.BirthcertDependent,
    applicant_COE: applicantInfo.COE,
    applicant_DriversLicense: applicantInfo.DriversLicense,
    applicant_NC2Certificate: applicantInfo.NC2Certificate,
    applicant_SOA: applicantInfo.SOA,
    applicant_Vaccine: applicantInfo.Vaccine,
    applicant_Trainings: applicantInfo.Trainings,
    applicant_HMA: applicantInfo.HMA,
    createdAt: applicantInfo.createdAt,
    applicant_onebyone: applicantInfo.onebyone,
    applicant_twobytwo: applicantInfo.twobytwo,
  });

  const PooledModal = () => {
    return (
      <motion.div className="bg-black/50 h-screen w-screen fixed items-center justify-center flex z-999">
        {(applicantInfo.status == 7 ||
          applicantInfo.status == 0 ||
          applicantInfo.status == 1 ||
          applicantInfo.status == 2 ||
          applicantInfo.status == 3 ||
          applicantInfo.status == 4 ||
          applicantInfo.status == 5) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            exit={{ opacity: 0 }}
            className="absolute bg-white h-75 w-120 items-center shadow-md shadow-gray-900 z-999"
          >
            <div className="flex flex-col items-center justify-center">
              <div className=" h-3 w-full modal-pooling"></div>
              <BsXCircleFill className="modal-poolingtext mt-7 w-20 mb-3 h-20" />
              <span className="modal-poolingtext text-[30px] arial-narrow-bold">
                Pooled!
              </span>
              <hr className="w-[30%] modal-pooling h-[5px] mt-2" />
              <span className="modal-poolingtext   w-50 "></span>
              <span className="text-center arial-narrow-bold items-center justify-center flex text-[20px] mt-5">
                Applicant has been pooled.
              </span>
              <button
                onClick={() => window.location.reload()}
                className="rounded-full w-30 mt-5 mb-8 border-[2.5px] bg-white items-center border-pooled justify-center modal-poolingtext h-8 arial-narrow-bold text-[18px] hover:(border-red-700 border-[3.5px]) focus:(outline-none border-red-700)"
              >
                OK
              </button>
              <span className=" h-3 w-full modal-pooling"></span>
            </div>
          </motion.div>
        )}
      </motion.div>
    );
  };

  const ModalSuccess = () => {
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
            {applicantInfo.status == 0 && (
              <span className="text-center arial-narrow-bold items-center justify-center flex text-[20px] mt-5">
                Applicant has successfully passed the Initial Screening.
              </span>
            )}
            {applicantInfo.status == 1 && (
              <span className="text-center arial-narrow-bold items-center justify-center flex text-[20px] mt-5">
                Applicant has successfully passed the Initial Interview.
              </span>
            )}
            {applicantInfo.status == 2 && (
              <span className="text-center arial-narrow-bold items-center justify-center flex text-[20px] mt-5">
                Applicant has successfully passed the Exam.
              </span>
            )}
            {applicantInfo.status == 3 && (
              <span className="text-center arial-narrow-bold items-center justify-center flex text-[20px] mt-5">
                Applicant has successfully passed the Final Interview.
              </span>
            )}
            {applicantInfo.status == 4 && (
              <span className="text-center arial-narrow-bold items-center justify-center flex text-[17px] mt-5">
                Applicant has successfully submitted their pre-hiring
                requirements.
              </span>
            )}
            {applicantInfo.status == 5 && (
              <span className="text-center arial-narrow-bold items-center justify-center flex text-[18px] mt-5">
                Newly hired applicant is now subjected for placement on PBMS.
              </span>
            )}
            {applicantInfo.status == 6 && (
              <span className="text-center arial-narrow-bold items-center justify-center flex text-[20px] mt-5">
                Applicant is now Activated.
              </span>
            )}

            <button
              onClick={() => window.location.reload()}
              className="rounded-full w-30 mt-5 mb-8  border-black border-[2.5px] border-success bg-white items-center modal-successapptext justify-center h-8 arial-narrow-bold text-[18px] hover:(border-green-700 border-[3.5px]) focus:(outline-none border-green-700)"
            >
              OK
            </button>
            <span className=" h-3 w-full modal-successappform"></span>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const ReturnApplicant = ({ returnStatus }) => {
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
            <div className=" h-3 w-full bg-gray-500"></div>
            <BsArrowUpLeftCircleFill className="text-gray-500 mt-7 w-20 mb-3 h-20" />
            <span className="text-gray-500 text-[30px] arial-narrow-bold">
              Applicant Returned!
            </span>
            <span className="bg-gray-500 h-1 w-70 mt-2"></span>
            <span className="text-center arial-narrow-bold items-center justify-center flex text-[20px] mt-5">
              Returned to{" "}
              {returnStatus == 1
                ? "Initial Interview"
                : returnStatus == 2
                ? "Exam"
                : returnStatus == 3
                ? "Final Interview"
                : ""}{" "}
              Successfully.
            </span>
            <button
              onClick={() => window.location.reload()}
              className="rounded-full w-30 mt-5 mb-8 border-gray-500 border-[2.5px] bg-white items-center justify-center text-gray-500 h-8 arial-narrow-bold text-[18px] hover:(border-gray-500 border-[3px])  focus:(outline-none border-[3px]) "
            >
              OK
            </button>
            <span className=" h-3 w-full bg-gray-500"></span>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const HireModal = () => {
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
            <div className=" h-3 w-full bg-blue-600"></div>
            <BsCheck2Circle className="text-blue-600 mt-5 w-25 mb-3 h-23" />
            <span className="text-blue-600 text-[30px] arial-narrow-bold">
              Applicant Hired!
            </span>
            <hr className="w-[45%] bg-blue-600 h-[5px] mt-2" />
            <span className="bg-blue-600 w-50 "></span>

            <span className="text-center arial-narrow-bold items-center justify-center flex text-[20px] mt-2">
              This applicant has been hired successfully!
            </span>
            <button
              onClick={() => window.location.reload()}
              className="rounded-full w-30 mt-5 mb-8 border-[2.5px] bg-white items-center border-blue-600 justify-center text-blue-600 h-8 arial-narrow-bold text-[18px] hover:(border-blue-700 border-[3.5px]) focus:(outline-none border-blue-700)"
            >
              OK
            </button>
            <span className=" h-3 w-full bg-blue-600"></span>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const validateRequirements = () => {
    if (reqObjs.applicant_NBI == null || reqObjs.applicant_Medical == null) {
      document.getElementById("info").style.color = "red";
      // alert("PBMS Warning!\nApplicant Has No Mandatory Requirements!");
      setReqValidation(true);
      setRequirements(true);
    }
  };

  const validateSetDateInterview = () => {
    if (reqObjs.applicant_Appointment == "") {
      document.getElementById("calendar").style.color = "red";
      alert("Please Set Interview Date!");
      setDateInterview(true);
    }
  };

  const updateApplicantPool = (ID, applicant_status, name, applicantReason) => {
    setPooledModal(true);
    Logs("UPDATE", "Pooled " + name);
    axios
      .put(API_URL_HR + "update-applicant", {
        ID,
        applicant_status,
        applicant_PoolReason: applicantReason,
      })
      .then((res) => {})
      .catch((err) => console.log(err));
  };

  const updateApplicantReturn = (ID, applicant_status, name) => {
    Logs("UPDATE", `Returned  To Recruitment Portal.  Applicant: (${name})`);
    setReturnApplicant(true);
    axios
      .put(API_URL_HR + "update-applicant", {
        ID,
        applicant_status,
        applicant_AppointmentDates: reqObjs.applicant_Appointment,
      })
      .then((res) => {})
      .catch((err) => console.log(err));
    setReturnStatus(applicant_status);
  };

  const updateApplicant = (ID, applicant_status, name) => {
    //APPLICANT CONDITIONS

    if (applicant_status == 0) {
      if (reqObjs.applicant_Appointment == "") {
        validateSetDateInterview();
      } else {
        Logs("UPDATE", "Passed " + name);
        setPassApplicant(true);
        axios
          .put(API_URL_HR + "update-applicant", {
            ID,
            applicant_status,
            applicant_AppointmentDates: reqObjs.applicant_Appointment,
          })
          .then((res) => {})
          .catch((err) => console.log(err));
      }
    }

    //APPLICANT APPLICATION INITIAL
    if (applicant_status == 1) {
      if (reqObjs.applicant_Appointment == "") {
        validateSetDateInterview();
      } else {
        Logs("UPDATE", "Passed " + name);
        setPassApplicant(true);
        axios
          .put(API_URL_HR + "update-applicant", {
            ID,
            applicant_status,
            applicant_AppointmentDates: reqObjs.applicant_Appointment,
          })
          .then((res) => {})
          .catch((err) => console.log(err));
      }
    }

    //APPLICANT APPLICATION EXAM
    if (applicant_status == 2) {
      if (reqObjs.applicant_Appointment == "") {
        validateSetDateInterview();
      } else {
        Logs("UPDATE", "Passed " + name);
        setPassApplicant(true);
        axios
          .put(API_URL_HR + "update-applicant", {
            ID,
            applicant_status,
            applicant_AppointmentDates: reqObjs.applicant_Appointment,
          })
          .then((res) => {})
          .catch((err) => console.log(err));
      }
    }

    //FINAL INTERVIEW APPLICANT
    if (applicant_status == 3) {
      if (reqObjs.applicant_Appointment == "") {
        validateSetDateInterview();
      } else {
        Logs("UPDATE", "Passed " + name);
        setPassApplicant(true);
        axios
          .put(API_URL_HR + "update-applicant", {
            ID,
            applicant_status,
            applicant_AppointmentDates: reqObjs.applicant_Appointment,
          })
          .then((res) => {})
          .catch((err) => console.log(err));
      }
    }

    // Queueing APPLICANT
    if (applicant_status == 4) {
      Logs("UPDATE", "Passed " + name);
      setPassApplicant(true);
      axios
        .put(API_URL_HR + "update-applicant", { ID, applicant_status })
        .then((res) => {})
        .catch((err) => console.log(err));
    }

    // PRE-HIRED APPLICANT
    if (applicant_status == 5) {
      if (reqObjs.applicant_NBI == null || reqObjs.applicant_Medical == null) {
        validateRequirements();
      } else {
        Logs("UPDATE", "Passed " + name);
        setPassApplicant(true);
        axios
          .put(API_URL_HR + "update-applicant", { ID, applicant_status })
          .then((res) => {})
          .catch((err) => console.log(err));
      }
    }

    //PLACEMENT APPLICANT
    if (applicant_status == 6) {
      if (reqObjs.applicant_NBI == null || reqObjs.applicant_Medical == null) {
        validateRequirements();
      } else {
        Logs("UPDATE", "Passed " + name);
        setPassApplicant(true);
        axios
          .put(API_URL_HR + "update-applicant", { ID, applicant_status })
          .then((res) => {})
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <>
      <motion.div className="fixed h-full w-full z-20 top-0 left-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
        <motion.div
          className={`absolute flex h-full
         w-full z-50 left-0  bg-white shadow-white shadow-sm  items-center dark:(bg-slate-900 text-white) <md:(w-full h-full rounded-none)`}
          initial={{
            scale: 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          animate={{
            scale: 1,
          }}
          exit={{ scale: 0 }}
        >
          <div className="h-full w-full relative justify-center items-center bg-white  flex-[0.5] overflow-y-auto relative">
            <div className="flex border bg-headerapplicationform border-black h-30 w-full bg">
              <AiOutlineCloseSquare
                onClick={() => setOpenModal(false)}
                className="cursor-pointer text-red-500 absolute top-0 right-2 h-10 w-8 text-[3vh] text-[80%] flex items-center justify-center hover:text-red-600"
              />

              <div className="flex  mt-2 ml-6">
                <img
                  src={API_URL + applicantInfo.picture}
                  alt=""
                  className="rounded-full w-25 mr-2 h-25 object-cover"
                />
                <span className="arial-narrow-bold mt-4">
                  <p className="text-[23px]">
                    {applicantInfo.firstname +
                      " " +
                      applicantInfo.middlename +
                      " " +
                      applicantInfo.lastname}
                  </p>

                  <div className="flex mt-1">
                    {applicantInfo.status == 0 && (
                      <p className="text-[17px] ">NEW APPLICANT</p>
                    )}
                    {applicantInfo.status == 1 && (
                      <p className="text-[17px]">FOR INITIAL INTERVIEW</p>
                    )}
                    {applicantInfo.status == 2 && (
                      <p className="text-[17px]">FOR EXAM</p>
                    )}
                    {applicantInfo.status == 3 && (
                      <p className="text-[17px]">FOR FINAL INTERVIEW</p>
                    )}
                    {applicantInfo.status == 4 && (
                      <p className="text-[17px]">
                        FOR SUBMISSION OF REQUIREMENTS
                      </p>
                    )}
                    {applicantInfo.status == 5 && (
                      <p className="text-[17px]">PRE-HIRED</p>
                    )}
                    {applicantInfo.status == 6 && (
                      <p className="text-[17px]">FOR PLACEMENT</p>
                    )}
                    {applicantInfo.status == 7 && (
                      <p className="text-[17px]">POOLING</p>
                    )}

                    {applicantInfo.status == 0 && (
                      <BsCircleFill className="mb-1 mt-0.2 ml-1 h-3 w-3 border border-black rounded-full new-appliedIcon" />
                    )}
                    {applicantInfo.status == 1 && (
                      <BsCircleFill className="mb-1 mt-0.2 ml-1 h-3 w-3 border border-black rounded-full initial-interviewIcon" />
                    )}
                    {applicantInfo.status == 2 && (
                      <BsCircleFill className="mb-1 mt-0.2 ml-1 h-3 w-3 border border-black rounded-full exam-icon" />
                    )}
                    {applicantInfo.status == 3 && (
                      <BsCircleFill className="mb-1 mt-0.2 ml-1 h-3 w-3 border border-black rounded-full final-interviewIcon" />
                    )}
                    {applicantInfo.status == 4 && (
                      <BsCircleFill className="mb-1 mt-0.2 ml-1 h-3 w-3 border border-black rounded-full queueing-Icons" />
                    )}
                    {applicantInfo.status == 5 && (
                      <BsCircleFill className="mb-1 mt-0.2 ml-1 h-3 w-3 border border-black rounded-full prehired-interviewIcon" />
                    )}
                    {applicantInfo.status == 6 && (
                      <BsCircleFill className="mb-1 mt-0.2 ml-1 h-3 w-3 border border-black rounded-full placement-Icon" />
                    )}
                    {applicantInfo.status == 7 && (
                      <BsCircleFill className="mb-1 mt-0.2 ml-1 h-3 w-3 border border-black rounded-full pooling-Icon" />
                    )}
                  </div>
                  {/* {(applicantInfo.status == 4 || applicantInfo.status == 5) && (
                  <TbChecklist
                    className={`ml-0 mt-2 text-[30px] text-black cursor-pointer ${
                      applicantInfo.status == 4 ||
                      applicantInfo.status == 5 ||
                      applicantInfo.status == 6
                        ? "visible"
                        : "invisible"
                    }`}
                    onClick={() => setRequirements(!requirements)}
                    id="info"
                  />
                )} */}
                  {(applicantInfo.status == 4 ||
                    applicantInfo.status == 5 ||
                    applicantInfo.status == 6 ||
                    applicantInfo.status == 7) && (
                    <div className="flex items-center mt-1">
                      <p className="text-[15px] arial-narrow">
                        {moment(applicantInfo?.updatedAt).format(
                          "MM/DD/YY hh:mm a"
                        )}
                      </p>
                    </div>
                  )}
                  {applicantInfo.status == 0 && (
                    <div className="flex items-center mt-1">
                      <p className="text-[15px] arial-narrow">
                        {moment(applicantInfo?.applydate).format(
                          "MM/DD/YY hh:mm a"
                        )}
                      </p>
                    </div>
                  )}
                  {(applicantInfo.status == 1 ||
                    applicantInfo.status == 2 ||
                    applicantInfo.status == 3) && (
                    <div className="flex items-center mt-1">
                      <p className="text-[15px] arial-narrow">
                        {reqObjs.applicant_Appointment
                          ? moment(reqObjs.applicant_Appointment).format(
                              "MM/DD/YY hh:mm a"
                            )
                          : "SET DATE FIRST"}
                      </p>
                      <FaRegEdit
                        className="ml-2 cursor-pointer text-gray-900 text-[15px] active:scale-1 active:duration-75 transform ease-in-out hover:scale-115 hover:text-black"
                        onClick={() => setUpdateAppointmentDate(true)}
                      />
                    </div>
                  )}
                </span>
              </div>
            </div>
            {/* =========================================================================================== */}

            <div className="flex w-full flex-col justify-center items-center">
              <div className="flex justify-between items-center border border-gray-500 w-[95%] mt-4 p-2">
                <span className="arial-narrow-bold text-[20px] flex ">
                  Basic Information
                </span>
                {(applicantInfo.status == 4 || applicantInfo.status == 5) && (
                  <TbChecklist
                    className={`ml-0 mt-2 text-[30px] text-black cursor-pointer ${
                      applicantInfo.status == 4 ||
                      applicantInfo.status == 5 ||
                      applicantInfo.status == 6
                        ? "visible"
                        : "invisible"
                    }`}
                    onClick={() => setRequirements(!requirements)}
                    id="info"
                  />
                )}
              </div>

              {/* =========================================================================================== */}

              <div className="w-[95%] border border-gray-500 flex">
                <div className="flex-1 flex flex-col p-4 text-left">
                  <span className="arial-narrow ">
                    Full Name: <br />{" "}
                    <p className="arial-narrow-bold">
                      {applicantInfo.lastname +
                        ", " +
                        applicantInfo.firstname +
                        " " +
                        applicantInfo.middlename}
                    </p>
                  </span>

                  <span className="arial-narrow mt-4">
                    Phone Number: <br />{" "}
                    <p className="arial-narrow-bold">
                      {applicantInfo.contactnum}
                    </p>
                  </span>

                  <span className="arial-narrow mt-4">
                    Email: <br />{" "}
                    <p className="arial-narrow-bold">{applicantInfo.email}</p>
                  </span>

                  <span className="arial-narrow mt-4">
                    Gender: <br />{" "}
                    <p className="arial-narrow-bold">{applicantInfo.gender}</p>
                  </span>

                  <span className="arial-narrow mt-4">
                    Birthdate: <br />{" "}
                    <p className="arial-narrow-bold">
                      {moment(applicantInfo.birthdate).format("MMMM DD, YYYY")}
                    </p>
                  </span>
                  <span className="arial-narrow mt-4">
                    Source: <br />{" "}
                    <p className="arial-narrow-bold">{applicantInfo.source}</p>
                  </span>
                </div>
                <div className="flex-1 flex flex-col p-4 text-left">
                  <span className="arial-narrow ">
                    Position Applied: <br />{" "}
                    <p className="arial-narrow-bold">
                      {applicantInfo.position}
                    </p>
                  </span>

                  <span className="arial-narrow mt-4">
                    Address: <br />{" "}
                    <p className="arial-narrow-bold">{applicantInfo.address}</p>
                  </span>

                  <span className="arial-narrow mt-4">
                    Region: <br />{" "}
                    <p className="arial-narrow-bold">{applicantInfo.region}</p>
                  </span>

                  <span className="arial-narrow mt-4">
                    City: <br />{" "}
                    <p className="arial-narrow-bold">{applicantInfo.city}</p>
                  </span>
                  <span className="arial-narrow mt-4">
                    Barangay: <br />{" "}
                    <p className="arial-narrow-bold">
                      {applicantInfo.barangay}
                    </p>
                  </span>
                  <span className="arial-narrow mt-4">
                    Date & Time Applied: <br />{" "}
                    <p className="arial-narrow-bold">
                      {moment(applicantInfo?.applydate).format(
                        "MMMM DD YYYY, h:mm a "
                      )}
                    </p>
                  </span>
                </div>
              </div>

              <div className="border border-gray-500 w-[95%] mt-5">
                <div className="arial-narrow-bold text-[20px] p-2">
                  <span>Cover Letter</span>
                </div>
              </div>
              {/* Cover Letter Body ======================================================================== */}
              <div className="border border-black h-45 w-[95%] border border-gray-500 overflow-y-auto">
                <div className="flex ml-2 mt-2">
                  <span className="arial-narrow text-[14px]">
                    {applicantInfo.cover}
                  </span>
                </div>
              </div>
            </div>
            {/* ----------------------------------------------------------------------------------------------- */}

            {applicantInfo.status == 0 ? (
              // Status 0 ===================================================================================================================================
              <div className="my-7 w-full items-start justify-evenly flex">
                <button
                  onClick={() => setPoolingReasonModal(true)}
                  className="text-red-500 arial-narrow-bold text-[17px] flex items-center justify-center rounded-sm w-30 h-10 shadow-sm border-[2.5px] border-red-500 hover:(border-red-500) focus:(outline-none border-[2.5px] border-red-500) focus:(outline-none border-[3px]) hover:(border-[3px])"
                  disabled={useAdd() ? false : true}
                >
                  <BsDiagram2Fill className="h-6 w-6 mr-2" />
                  Pool
                </button>
                <button
                  onClick={() => setDateInterview(true)}
                  className="text-green-500 arial-narrow-bold text-[17px] flex items-center justify-center rounded-sm w-30 h-10 shadow-sm border-[2.5px] border-green-500 hover:(border-green-500 border-[3px]) focus:(outline-none border-[3px])"
                  disabled={useAdd() ? false : true}
                >
                  <BsCheckLg className="h-6 w-6 mr-2" />
                  Pass
                </button>
              </div>
            ) : applicantInfo.status == 1 ? (
              <div className="my-7 w-full items-start justify-evenly flex">
                <button
                  onClick={() => setPoolingReasonModal(true)}
                  className="text-red-500 arial-narrow-bold text-[17px] flex items-center justify-center rounded-sm w-30 h-10 shadow-sm border-[2.5px] border-red-500 hover:(border-red-500) focus:(outline-none border-[2.5px] border-red-500) focus:(outline-none border-[3px]) hover:(border-[3px])"
                  disabled={useAdd() ? false : true}
                >
                  <BsDiagram2Fill className="text-red-500 h-6 w-6 mr-2" />
                  Pool
                </button>
                <button
                  onClick={() => setDateInterview(true)}
                  className="text-green-500 arial-narrow-bold text-[17px] flex items-center justify-center rounded-sm w-30 h-10 shadow-sm border-[2.5px] border-green-500 hover:(border-green-500 border-[3px]) focus:(outline-none border-[3px])"
                  disabled={useAdd() ? false : true}
                >
                  <BsCheckLg className=" text-green-500 h-6 w-6 mr-2" />
                  Pass
                </button>
              </div>
            ) : applicantInfo.status == 2 ? (
              <div className="my-7 w-full items-start justify-evenly flex">
                <button
                  onClick={() => setPoolingReasonModal(true)}
                  className="text-red-500 arial-narrow-bold text-[17px] flex items-center justify-center rounded-sm w-30 h-10 shadow-sm border-[2.5px] border-red-500 hover:(border-red-500) focus:(outline-none border-[2.5px] border-red-500) focus:(outline-none border-[3px]) hover:(border-[3px])"
                  disabled={useAdd() ? false : true}
                >
                  <BsDiagram2Fill className=" h-6 w-6 mr-2" />
                  Pool
                </button>
                <button
                  onClick={() => setDateInterview(true)}
                  className="text-green-500 arial-narrow-bold text-[17px] flex items-center justify-center rounded-sm w-30 h-10 shadow-sm border-[2.5px] border-green-500 hover:(border-green-500 border-[3px]) focus:(outline-none border-[3px])"
                  disabled={useAdd() ? false : true}
                >
                  <BsCheckLg className="h-6 w-6 mr-2" />
                  Pass
                </button>
              </div>
            ) : applicantInfo.status == 3 ? (
              <div className="my-7 w-full items-start justify-evenly flex">
                <button
                  onClick={() => setPoolingReasonModal(true)}
                  className="text-red-500 arial-narrow-bold text-[17px] flex items-center justify-center rounded-sm w-30 h-10 shadow-sm border-[2.5px] border-red-500 hover:(border-red-500) focus:(outline-none border-[2.5px] border-red-500) focus:(outline-none border-[3px]) hover:(border-[3px])"
                  disabled={useAdd() ? false : true}
                >
                  <BsDiagram2Fill className="h-6 w-6 mr-2" />
                  Pool
                </button>
                <button
                  onClick={() =>
                    updateApplicant(
                      applicantInfo.ID,
                      4,
                      applicantInfo.lastname + " " + applicantInfo.firstname
                    )
                  }
                  className="text-green-500 arial-narrow-bold text-[17px] flex items-center justify-center rounded-sm w-30 h-10 shadow-sm border-[2.5px] border-green-500 hover:(border-green-500 border-[3px]) focus:(outline-none border-[3px])"
                  disabled={useAdd() ? false : true}
                >
                  <BsCheckLg className="h-6 w-6 mr-2" />
                  Pass
                </button>
              </div>
            ) : applicantInfo.status == 4 ? (
              <div className="my-7 w-full items-start justify-evenly flex ">
                <button
                  onClick={() => setPoolingReasonModal(true)}
                  className="text-red-500 arial-narrow-bold text-[17px] flex items-center justify-center rounded-sm w-30 h-10 shadow-sm border-[2.5px] border-red-500 hover:(border-red-500) focus:(outline-none border-[2.5px] border-red-500) focus:(outline-none border-[3px]) hover:(border-[3px])"
                  disabled={useAdd() ? false : true}
                >
                  <BsDiagram2Fill className="h-6 w-6 mr-2" />
                  Pooling
                </button>
                <button
                  onClick={() =>
                    updateApplicant(
                      applicantInfo.ID,
                      5,
                      applicantInfo.lastname + " " + applicantInfo.firstname
                    )
                  }
                  className="text-green-500 arial-narrow-bold text-[17px] flex items-center justify-center rounded-sm w-30 h-10 shadow-sm border-[2.5px] border-green-500 hover:(border-green-500 border-[3px]) focus:(outline-none border-[3px])"
                  disabled={useAdd() ? false : true}
                >
                  <BsCheckLg className=" h-6 w-6 mr-2" />
                  Pre-hired
                </button>
              </div>
            ) : applicantInfo.status == 6 ? (
              <div className="my-7 w-full items-start justify-evenly flex">
                <button
                  onClick={() => setPlacedModal(true)}
                  className="text-green-500 arial-narrow-bold text-[17px] focus:outline-none flex items-center justify-center rounded-sm w-30 h-10 shadow-sm border-[2.5px] border-green-500  hover:(border-[3px] border-green-500)"
                  disabled={useAdd() ? false : true}
                >
                  Place
                </button>
              </div>
            ) : applicantInfo.status == 7 ? (
              // Buttons For Pooling ==================================================================================================================

              <div className=" w-full self-center items-start justify-evenly flex-col flex">
                <div className="w-full justify-center flex items-center flex-col mb-5">
                  <div className="border  border-gray-500 w-[95%] mt-5">
                    <div className="arial-narrow-bold text-[20px] p-2">
                      <span>Reason for Pooling</span>
                    </div>
                  </div>
                  {/* Pooling ======================================================================== */}
                  <div className="border border-black h-30 w-[95%] border border-gray-500 overflow-y-auto">
                    <div className="flex ml-2 mt-2">
                      <span className="arial-narrow text-[14px]">
                        {applicantInfo.PoolReason}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full items-start mb-5 justify-evenly flex">
                  <button
                    onClick={() =>
                      updateApplicantReturn(
                        applicantInfo.ID,
                        1,
                        applicantInfo.lastname + " " + applicantInfo.firstname
                      )
                    }
                    disabled={useAdd() ? false : true}
                    className="text-yellow-500 arial-narrow-bold text-[17px] flex items-center justify-center rounded-sm w-46 h-10 shadow-sm border-[2.5px] border-yellow-400 active:scale-1 active:duration-75 transition-all ease-in-out transition py-1 hover:(border-yellow-400 border-[3px]) focus:(outline-none border-[3px]) disabled:cursor-not-allowed"
                  >
                    Return to Initial Interview
                  </button>
                  <button
                    onClick={() =>
                      updateApplicantReturn(
                        applicantInfo.ID,
                        2,
                        applicantInfo.lastname + " " + applicantInfo.firstname
                      )
                    }
                    disabled={useAdd() ? false : true}
                    className="text-blue-500 arial-narrow-bold text-[17px] flex items-center justify-center rounded-sm w-30 h-10 shadow-sm border-[2.5px] border-blue-500 active:scale-1 active:duration-75 transition-all ease-in-out transition py-1 hover:(border-blue-500 border-[3px]) focus:(outline-none border-[3px]) disabled:cursor-not-allowed"
                  >
                    Return to Exam
                  </button>
                  <button
                    onClick={() =>
                      updateApplicantReturn(
                        applicantInfo.ID,
                        3,
                        applicantInfo.lastname + " " + applicantInfo.firstname
                      )
                    }
                    disabled={useAdd() ? false : true}
                    className="text-red-400 arial-narrow-bold text-[17px] flex items-center justify-center rounded-sm w-46 h-10 shadow-sm border-[2.5px] hover:(border-red-300 border-[3px]) focus:(outline-none border-red-300) border-red-300 active:scale-1 active:duration-75 transition-all ease-in-out transition py-1  disabled:cursor-not-allowed"
                  >
                    Return to Final Interview
                  </button>
                </div>
              </div>
            ) : applicantInfo.status == 5 ? (
              <div className="my-7 w-full items-start justify-evenly flex">
                <button
                  onClick={() => setPoolingReasonModal(true)}
                  className="text-red-500 arial-narrow-bold text-[17px] flex items-center justify-center rounded-sm w-30 h-10 shadow-sm border-[2.5px] border-red-500 hover:(border-red-500) focus:(outline-none border-[2.5px] border-red-500) focus:(outline-none border-[3px]) hover:(border-[3px])"
                >
                  Pool
                </button>
                <button
                  onClick={() =>
                    updateApplicant(
                      applicantInfo.ID,
                      6,
                      applicantInfo.lastname + " " + applicantInfo.firstname
                    )
                  }
                  className="text-blue-500 arial-narrow-bold border-blue-500  text-[17px] flex items-center justify-center rounded-sm w-30 h-10 shadow-sm border-[2.5px] hover:(border-blue-500 border-[3px]) focus:(outline-none border-blue-500 border-[3px]) disabled:(cursor-not-allowed)"
                  disabled={useAdd() ? false : true}
                >
                  For Placement
                </button>
              </div>
            ) : (
              <div className="w-full items-center justify-center  flex">
                <Link
                  to="/hr-active-employee"
                  className="w-30 h-10 mt-20 bg-blue-500 mr-3 shadow-sm text-white items-center justify-center text-center text-[20px]  shadow-gray-800 hover:border-blue-500  disabled:(bg-gray-400 cursor-not-allowed) active:scale-1 active:duration-75 transition-all hover:scale-108 ease-in-out transform py-2 rounded-xl hover:rounded-md"
                >
                  Placed
                </Link>
              </div>
            )}
          </div>
          <div className="bg-pdf-color h-full w-full flex-[0.5] flex">
            <iframe
              className="w-full h-full pt-10"
              src={API_URL + applicantInfo.resumeLink}
            />
          </div>
          <AnimatePresence>
            {placedModal && (
              <HrApplicantResumePlace
                setPlacedModal={setPlacedModal}
                applicantInfo={applicantInfo}
              />
            )}
          </AnimatePresence>

          {/* Modal for Pooling */}
          <AnimatePresence>
            {poolingReasonModal && (
              <HrApplicantPoolReasonModal
                setPoolingReasonModal={setPoolingReasonModal}
                applicantInfo={applicantInfo}
                reqObjs={reqObjs}
                setReqObjs={setReqObjs}
                updateApplicant={updateApplicant}
                updateApplicantPool={updateApplicantPool}
              />
            )}
          </AnimatePresence>
          {/* Modal for Pooling */}

          {/* Modal for date set for interview */}
          <AnimatePresence>
            {dateInterview && (
              <HrApplicantSetDateInterview
                setDateInterview={setDateInterview}
                applicantInfo={applicantInfo}
                reqObjs={reqObjs}
                setReqObjs={setReqObjs}
                updateApplicant={updateApplicant}
              />
            )}
          </AnimatePresence>
          {/* Modal for date set for interview */}

          {/* Modal for date update appointmnet */}
          <AnimatePresence>
            {updateAppointmentDate && (
              <HrApplicantUpdateDateInterview
                setUpdateAppointmentDate={setUpdateAppointmentDate}
                applicantInfo={applicantInfo}
                reqObjs={reqObjs}
                setReqObjs={setReqObjs}
                updateApplicant={updateApplicant}
                setApplicants={setApplicants}
              />
            )}
          </AnimatePresence>
          {/* Modal for date update appointmnet */}
        </motion.div>
      </motion.div>
      {showModal ? (
        <HireModal />
      ) : pooledModal ? (
        <PooledModal />
      ) : retunApplicant ? (
        <ReturnApplicant returnStatus={returnStatus} />
      ) : passApplicant ? (
        <ModalSuccess />
      ) : (
        ""
      )}
      <AnimatePresence>
        {requirements && (
          <HrRequirementsForm
            setRequirements={setRequirements}
            reqObjs={reqObjs}
            setReqObjs={setReqObjs}
            ID={applicantInfo.ID}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default HrApplicantResume;
