import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { AiFillCloseCircle, AiOutlineCloseSquare } from "react-icons/ai";
import { BiSave } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { API_URL_ADMIN, API_URL_HR, API_URL } from "../../../utils/Url";
import { BsCheck2Circle, BsFilePerson } from "react-icons/bs";
import DatePicker from "react-date-picker";
import { BsArrowLeftShort } from "react-icons/bs";
import { Logs } from "../../../utils/Logs";
import { useAdd, useEdit } from "../../../Hooks/useAuthorized";
import moment from "moment";

const HrApplicantResumePlace = ({ setPlacedModal, applicantInfo }) => {
  const [reqValidation, setReqValidation] = useState(false);
  const [empStatus, setEmpStatus] = useState([]);
  const [empType, setEmpType] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [activeDataValue, setActiveDataValue] = useState([]);
  const { branding } = useSelector((state) => state.branding);
  const [applicantData, setApplicantData] = useState({
    jobDesc: "",
    department: "",
    position: "",
    designation: "",
    contract: "",
    companyAssigned: "",
    companyDesignation: "",
    branch: "",
    salary: "",
    schedule: "",
  });
  const [incrementalvalue, setIncrementalValue] = useState(0);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [dateStart, setDateStart] = useState(null);
  const [dateHired, setDateHired] = useState(null);
  const [jobOffers, setJobOffers] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    axios
      .get(API_URL_HR + "getcount-applicant")
      .then((res) => {
        setIncrementalValue(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(API_URL_ADMIN + "view-all-prf-request")
      .then((res) => setJobOffers(res.data))
      .catch((err) => console.log(err));

    axios
      .get(API_URL_HR + "viewAll-empStatus")
      .then((res) => setEmpStatus(res.data))
      .catch((err) => console.log(err));

    axios
      .get(API_URL_HR + "get-employment-category")
      .then((res) => setEmpType(res.data))
      .catch((err) => console.log(err));

    axios
      .get(API_URL_HR + "view-all-schedule")
      .then((res) => setSchedule(res.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(dateHired);
  const saveData = () => {
    if (
      applicantData.companyAssigned.trim() == "" ||
      applicantData.branch.trim() == "" ||
      applicantData.department == "" ||
      applicantData.position == "" ||
      applicantData.designation == "" ||
      applicantData.salary.trim() == "" ||
      dateStart == "" ||
      dateHired == "" ||
      applicantData.schedule == "" ||
      applicantData.contract.trim() == "" ||
      applicantData.companyDesignation == ""
    ) {
      setIsEmpty(true);
      console.log(dateHired);
    } else {
      axios
        .post(API_URL_HR + "hire-applicant", {
          Employee_LastName: applicantInfo.lastname,
          Employee_FirstName: applicantInfo.firstname,
          Employee_MiddleName: applicantInfo.middlename,
          Employee_Company: applicantData.companyAssigned,
          Employee_CompBranch: applicantData.branch,
          Employee_email: applicantInfo.email,
          Employee_Status: applicantData.contract,
          Employee_address: applicantInfo.address,
          Employee_region: applicantInfo.region,
          Employee_province: applicantInfo.province,
          Employee_city: applicantInfo.city,
          Employee_barangay: applicantInfo.barangay,
          Employee_BirthDate: applicantInfo.birthdate,
          Employee_ContactNum: applicantInfo.contactnum,
          applicant_ID: applicantInfo.ID,
          Employee_hasPbms: 0,
          Employee_Suffix: applicantInfo.suffix,
          Employee_Gender: applicantInfo.Gender,
          Employee_Picture: applicantInfo.picture,
          Employee_Position: applicantData.position,
          Employee_Department: applicantData.department,
          Employee_JobDesc: applicantInfo.position,
          Employee_TypeContract: applicantData.contract,
          Employee_Designation: applicantData.companyDesignation,
          Employee_Salary: applicantData.salary,
          Employee_DateStart: dateStart,
          Employee_DateHired: dateHired,
          Employee_Schedule: applicantData.schedule,
        })
        .then((res) => {
          setShowModalSuccess(true);
          setActiveDataValue(res.data);
        })
        .catch((err) => console.log(err));
    }

    // if (
    //   applicantData.department == "" ||
    //   applicantData.position == "" ||
    //   applicantData.data.designation == "" ||
    //   applicantData.contract == "" ||
    //   applicantData.companyAssigned == "" ||
    //   applicantData.branch == "" ||
    //   applicantData.salary == ""
    // ) {
    //   setIsEmpty(true);
    //   alert(
    //     "PBMS Sytem:\nAll input fields are empty, please fill the required fields below!"
    //   );
    // } else {
    // }
    // Logs(
    //   "ADD",
    //   `Emplacement of new Employee: (${
    //     applicantInfo.firstname +
    //     " " +
    //     applicantInfo.middlename +
    //     " " +
    //     applicantInfo.lastname
    //   })`
    // );
    // axios
    //   .post(API_URL_HR + "hire-applicant", {
    //     Employee_LastName: applicantInfo.lastname,
    //     Employee_FirstName: applicantInfo.firstname,
    //     Employee_MiddleName: applicantInfo.middlename,
    //     Employee_Company: "peso",
    //     Employee_CompBranch: "peso",
    //     Employee_email: applicantInfo.email,
    //     Employee_Status: "Employed",
    //     Employee_address: applicantInfo.address,
    //     Employee_region: applicantInfo.region,
    //     Employee_province: applicantInfo.province,
    //     Employee_city: applicantInfo.city,
    //     Employee_barangay: applicantInfo.barangay,
    //     Employee_BirthDate: applicantInfo.birthdate,
    //     Employee_ContactNum: applicantInfo.contactnum,
    //     applicant_ID: applicantInfo.ID,
    //     Employee_hasPbms: 0,
    //     Employee_Suffix: applicantInfo.suffix,
    //     Employee_Gender: applicantInfo.Gender,
    //     Employee_Picture: applicantInfo.picture,
    //     Employee_Position: applicantData.position,
    //     Employee_Department: applicantData.department,
    //     Employee_JobDesc: applicantInfo.position,
    //     Employee_TypeContract: applicantData.contract,
    //     Employee_Designation:
    //       applicantData.designation == "IN" ? "Internal" : "External",
    //   })
  };
  const SuccessModal = () => {
    return (
      <motion.div className="bg-black/50 h-full w-full absolute flex justify-center items-center  z-999">
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

  return (
    <motion.div
      className="w-full h-full absolute flex justify-center items-center bg-black/50 "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      exit={{ opacity: 0 }}
    >
      <motion.div className="absolute bg-white h-125 w-225 items-center shadow-md shadow-gray-900  z-999">
        <div className="w-full h-full item-center text-center">
          <AnimatePresence>
            {showModalSuccess && <SuccessModal />}
          </AnimatePresence>
          <div className=" prdc-color w-full h-25">
            <div className="flex items-center">
              <div className="mt-2 ml-2 ">
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
              <div className="block">
                <div className=" ml-2 flex">
                  <span className="text-white arial-narrow-bold text-[25px]">
                    NEWLY HIRED EMPLOYEE
                  </span>
                </div>
                <div className="ml-2 flex">
                  <span className="text-white arial-narrow-bold text-[25px]">
                    PLACEMENT FORM
                  </span>
                </div>
              </div>

              <div className=" ">
                <button
                  onClick={() => setPlacedModal(false)}
                  className="w-8 h-8 absolute top-1 right-1 focus:outline-none text-[30px] cursor-pointer flex items-center justify-center mr-1 text-red-400 border-none active:scale-1 active:duration-75 transition-all ease-in-out hover:text-red-500 rounded-sm hover:rounded-sm"
                >
                  <AiOutlineCloseSquare />
                </button>
              </div>
            </div>
          </div>

          {/*  */}

          <form className=" h-[95%] w-full flex mt-5">
            <div className="flex items-start justify-evenly w-full">
              <div className="flex w-full">
                <div className="mb-3 ml-5 w-40">
                  <div className="flex mb-3 mt-0.3 ">
                    <span className="  text-[18px] arial-narrow-bold">
                      Job Designation:
                    </span>
                  </div>
                  <div className="flex  mb-3.5">
                    <span className=" text-[18px] arial-narrow-bold ">
                      Company Assigned:
                    </span>
                  </div>
                  <div className="flex  mb-3.5">
                    <span className="text-[18px] arial-narrow-bold ">
                      Branch:
                    </span>
                  </div>
                  <div className="flex  mb-3.5">
                    <span className="text-[18px] arial-narrow-bold ">
                      Department:
                    </span>
                  </div>
                  <div className="flex  mb-3">
                    <span className="text-[18px] arial-narrow-bold ">
                      Role:
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-[18px] arial-narrow-bold ">
                      Employee Type:
                    </span>
                  </div>
                </div>

                {/* Input Fields */}
                <div>
                  {/* Job Desc */}
                  <div className="flex mb-2">
                    <select
                      onChange={(e) =>
                        setApplicantData({
                          ...applicantData,
                          jobDesc: e.target.value,
                        })
                      }
                      className="w-55 border border-gray-500 text-[14px] arial-narrow focus:outline-none"
                      id="jobdesig"
                    >
                      <option value={applicantInfo.position} selected hidden>
                        {applicantInfo.position}
                      </option>
                      {jobOffers.map((res) => {
                        return (
                          <option value={res.request_position}>
                            {res.request_position}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  {/* Job Desc */}
                  {/* Company Assigned */}
                  <div className="flex mb-2">
                    <input
                      type="text"
                      id="companyAssigned"
                      placeholder="Company name"
                      onChange={(e) =>
                        setApplicantData({
                          ...applicantData,
                          companyAssigned: e.target.value,
                        })
                      }
                      className={`border border-black w-55 text-[14px] arial-narrow h-6 px-1 focus:outline-none mr-2 ${
                        applicantData.companyAssigned == "" && isEmpty
                          ? "border-red-500"
                          : "border-gray-500"
                      }`}
                    />
                  </div>
                  {/* Company Assigned */}
                  {/* Branch */}
                  <div className="flex mb-2">
                    <input
                      type="text"
                      id="branch"
                      placeholder="Company branch"
                      onChange={(e) =>
                        setApplicantData({
                          ...applicantData,
                          branch: e.target.value,
                        })
                      }
                      className={`border border-black text-[14px] px-1 h-6 w-55 focus:outline-none arial-narrow ${
                        applicantData.branch == "" && isEmpty
                          ? "border-red-500"
                          : "border-gray-500"
                      }`}
                    />
                  </div>
                  {/* Branch */}
                  {/* Dep */}
                  <div className="flex mb-2">
                    <select
                      id="department"
                      onChange={(e) =>
                        setApplicantData({
                          ...applicantData,
                          department: e.target.value,
                        })
                      }
                      className={`w-55 border arial-narrow text-[14px] border-black h-6 focus:outline-none ${
                        applicantData.department == "" && isEmpty
                          ? "border-red-500"
                          : "border-gray-500"
                      }`}
                    >
                      <option value="" disabled selected>
                        Choose Department
                      </option>
                      <option value="HR">Human Resources</option>
                      <option value="SALES">Sales</option>
                      <option value="OPS">Operations</option>
                      <option value="AMAD">Asset Management Admin</option>
                      <option value="ACC">Accounting & Finance</option>
                      <option value="TA">Talent Acquisition</option>
                      <option value="BSD">Business Support</option>
                      <option value="TSD">Technical Services</option>
                    </select>
                  </div>
                  {/* Dep */}
                  {/* Pos */}
                  <div className="flex mb-2">
                    <select
                      id="role"
                      onChange={(e) =>
                        setApplicantData({
                          ...applicantData,
                          position: e.target.value,
                        })
                      }
                      className={`w-55 border arial-narrow text-[14px] border-black h-6 focus:outline-none ${
                        applicantData.position == "" && isEmpty
                          ? "border-red-500"
                          : "border-gray-500"
                      }`}
                    >
                      <option value="" disabled selected>
                        Choose Position
                      </option>
                      <option value="Executive">Executive</option>
                      <option value="Manager">Manager</option>
                      <option value="Super Visor">Supervisor</option>
                      <option value="Team Leader">Team Leader</option>
                      <option value="Rank and File">Rank and File</option>
                    </select>
                  </div>
                  {/* Pos */}
                  {/* Emp Type */}
                  <div className="flex">
                    <select
                      id="employmentType"
                      onChange={(e) =>
                        setApplicantData({
                          ...applicantData,
                          designation: e.target.value,
                        })
                      }
                      className={`w-55 border text-[14px] arial-narrow border-black h-6 focus:outline-none ${
                        applicantData.designation == "" && isEmpty
                          ? "border-red-500"
                          : "border-gray-500"
                      }`}
                    >
                      <option value="" hidden selected>
                        Choose Employment Type
                      </option>
                      {empType.map((data) => {
                        return (
                          <>
                            <option value={data.employment_category}>
                              {data.employment_category}
                            </option>
                          </>
                        );
                      })}
                    </select>
                  </div>
                </div>
                {/* Emp Type */}
              </div>
            </div>
            {/* Input Fields */}

            {/* 2nd half */}

            <div className="flex h-full w-full">
              <div className="w-45">
                <div className="flex mb-3.5 mt-0.5">
                  <span className="text-[18px] arial-narrow-bold ">
                    Salary Rate:
                  </span>
                </div>
                <div className="flex mb-3.5">
                  <span className="text-[18px] arial-narrow-bold ">
                    Date Hired:
                  </span>
                </div>
                <div className="flex mb-3.5">
                  <span className="text-[18px] arial-narrow-bold ">
                    Starting Date:
                  </span>
                </div>
                <div className="flex mb-3.5">
                  <span className="text-[18px] arial-narrow-bold">
                    Schedule:
                  </span>
                </div>
                <div className="flex mb-3.5">
                  <span className="text-[18px] arial-narrow-bold">
                    Employement Status:
                  </span>
                </div>
                <div className="flex">
                  <span className="text-[18px] arial-narrow-bold">
                    Company Designation:
                  </span>
                </div>
              </div>

              {/* Input Fields */}
              <div>
                {/* Salary */}
                <div className="flex mb-2">
                  <input
                    type="number"
                    id="salary"
                    placeholder="Employee salary"
                    onChange={(e) =>
                      setApplicantData({
                        ...applicantData,
                        salary: e.target.value,
                      })
                    }
                    className={`border border-black w-55 text-[14px] arial-narrow h-6 px-1 focus:outline-none ${
                      applicantData.salary == "" && isEmpty
                        ? "border-red-500"
                        : "border-gray-500"
                    }`}
                  />
                </div>
                {/* Salary */}
                {/* Date Hired */}
                <div className="flex mb-2">
                  <input
                    id="dateHired"
                    type="date"
                    className={`border px-1 border-black h-6 w-55 arial-narrow text-[14px] focus:outline-none ${
                      dateHired == null && isEmpty
                        ? "border-red-500"
                        : "border-gray-500"
                    }`}
                    onChange={(e) => setDateHired(e.target.value)}
                    value={dateHired}
                  />
                </div>
                {/* Date Hired */}
                {/* Date Start */}
                <div className="flex mb-2">
                  <input
                    id="dateStart"
                    type="date"
                    className={`border px-1 border-black h-6 w-55 arial-narrow text-[14px] focus:outline-none ${
                      dateStart == null && isEmpty
                        ? "border-red-500"
                        : "border-gray-500"
                    }`}
                    onChange={(e) => setDateStart(e.target.value)}
                    value={dateStart}
                  />
                </div>
                {/* Date Start */}
                {/* Schedule */}
                <div className="flex mb-2">
                  <select
                    name=""
                    id=""
                    className={`border arial-narrow text-[14px] border-black h-6 w-55 focus:outline-none ${
                      applicantData.schedule == "" && isEmpty
                        ? "border-red-500"
                        : "border-gray-500"
                    }`}
                    onChange={(e) =>
                      setApplicantData({
                        ...applicantData,
                        schedule: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Schedule</option>
                    {schedule.map((data) => {
                      return (
                        <option
                          value={
                            data.schedule_type +
                            " : " +
                            data.schedule_workdayFrom +
                            " - " +
                            data.schedule_workdayTo +
                            " | " +
                            data.schedule_timeFrom +
                            " - " +
                            data.schedule_timeTo
                          }
                        >
                          {data.schedule_type +
                            " : " +
                            data.schedule_workdayFrom +
                            " - " +
                            data.schedule_workdayTo +
                            " | " +
                            data.schedule_timeFrom +
                            " - " +
                            data.schedule_timeTo}
                        </option>
                      );
                    })}
                  </select>
                  {/* <input
                    id="schedule"
                    type="text"
                    onChange={(e) =>
                      setApplicantData({
                        ...applicantData,
                        schedule: e.target.value,
                      })
                    }
                    className={`border arial-narrow text-[14px] border-black h-6 w-55 px-2 focus:outline-none ${
                      applicantData.schedule == "" && isEmpty
                        ? "border-red-500"
                        : "border-gray-500"
                    }`}
                  /> */}
                </div>
                {/* Schedule */}
                {/* Emp Status */}
                <div className="flex mb-2">
                  <select
                    id="empStatus"
                    onChange={(e) =>
                      setApplicantData({
                        ...applicantData,
                        contract: e.target.value,
                      })
                    }
                    className={`w-55 border text-[14px] border-black arial-narrow h-6 focus:outline-none ${
                      applicantData.contract == "" && isEmpty
                        ? "border-red-500"
                        : "border-gray-500"
                    }`}
                  >
                    <option value="" hidden selected>
                      Select Status
                    </option>
                    {empStatus.map((data) => {
                      return (
                        <>
                          <option value={data.employee_status}>
                            {data.employee_status}
                          </option>
                        </>
                      );
                    })}
                  </select>
                </div>
                {/* Emp Status */}

                {/* Company Designation */}
                <div className="flex">
                  <select
                    id="companyDesignation"
                    className={`border border-black h-6 w-55 text-[14px]rounded-sm arial-narrow focus:outline-none ${
                      applicantData.companyDesignation == "" && isEmpty
                        ? "border-red-500"
                        : "border-gray-500"
                    }`}
                    onChange={(e) =>
                      setApplicantData({
                        ...applicantData,
                        companyDesignation: e.target.value,
                      })
                    }
                  >
                    <option value="" hidden selected>
                      Choose Company Designation
                    </option>
                    <option value="Internal">Internal</option>
                    <option value="External">External</option>
                  </select>
                </div>
                {/* Company Designation */}
              </div>
              {/* Input Fields */}
            </div>
          </form>
          <div className="absolute right-2 bottom-7">
            <button
              disabled={useAdd() ? false : true}
              className="flex items-center focus:outline-none arial-narrow-bold justify-center text-[15px] rounded-sm w-22 h-8 shadow-sm border-[2.5px] prdc-text active:scale-1 active:duration-75 transition-all ease-in-out transition py-1 hover:border-[3px] hover:border-blue-500  hover:bg-blue-500 hover:text-white disabled:(cursor-not-allowed)"
              type="submit"
              onClick={saveData}
            >
              <BsFilePerson className="mr-2" />
              Place
            </button>
          </div>
          <div className="flex prdc-color w-full h-5 absolute bottom-0"></div>
          <ToastContainer />
        </div>
        <ToastContainer />
      </motion.div>
    </motion.div>
  );
};

export default HrApplicantResumePlace;
