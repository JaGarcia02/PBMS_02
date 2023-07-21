import React, { useEffect, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { AiFillCloseCircle, AiOutlineCloseSquare } from "react-icons/ai";
import { useAdd } from "../../../Hooks/useAuthorized";
import {
  BsPersonFillDash,
  BsPersonFillLock,
  BsArrowLeftShort,
} from "react-icons/bs";
import { FaSearch, FaTimes } from "react-icons/fa";
import { BiSave } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { API_URL_ADMIN, API_URL } from "../../../utils/Url";
import { Logs } from "../../../utils/Logs";
import { useSelector } from "react-redux";
import decode from "jwt-decode";
// ================================================================================  note: reference for promp drill//
const HrRequestAdd = ({ setAddRequest, setShowRequest }) => {
  const [request, setRequest] = useState({
    position: "",
    availableslots: "",
    date_requested: "",
    position_level: "",
    salary: "",
    jobDesc: "",
    jobQual: "",
    jobSpecificExp: "",
  });
  const { branding } = useSelector((state) => state.branding);
  const { user } = useSelector((state) => state.user);

  const AddRequest = () => {
    try {
      if (
        request.position == "" &&
        request.availableslots == "" &&
        request.date_requested == "" &&
        request.position_level == "" &&
        request.salary == "" &&
        request.jobDesc == "" &&
        request.jobQual == "" &&
        request.jobSpecificExp == ""
      ) {
        document.getElementById("position").style.borderColor = "red";
        document.getElementById("availableslots").style.borderColor = "red";
        document.getElementById("reqDate").style.borderColor = "red";
        document.getElementById("posLvl").style.borderColor = "red";
        document.getElementById("salary").style.borderColor = "red";
        document.getElementById("jobDesc").style.borderColor = "red";
        document.getElementById("jobQual").style.borderColor = "red";
        document.getElementById("jobSpecificExp").style.borderColor = "red";
        notify_warningEmpyFields();
      }

      if (request.position == "") {
        document.getElementById("position").style.borderColor = "red";
      }
      if (request.position != "") {
        document.getElementById("position").style.borderColor = "black";
      }

      if (request.availableslots == "") {
        document.getElementById("availableslots").style.borderColor = "red";
      }
      if (request.availableslots != "") {
        document.getElementById("availableslots").style.borderColor = "black";
      }

      if (request.date_requested == "") {
        document.getElementById("reqDate").style.borderColor = "red";
      }
      if (request.date_requested != "") {
        document.getElementById("reqDate").style.borderColor = "black";
      }

      if (request.position_level == "") {
        document.getElementById("posLvl").style.borderColor = "red";
      }
      if (request.position_level != "") {
        document.getElementById("posLvl").style.borderColor = "black";
      }

      if (request.salary == "") {
        document.getElementById("salary").style.borderColor = "red";
      }
      if (request.salary != "") {
        document.getElementById("salary").style.borderColor = "black";
      }

      if (request.jobDesc == "") {
        document.getElementById("jobDesc").style.borderColor = "red";
      }
      if (request.jobDesc != "") {
        document.getElementById("jobDesc").style.borderColor = "black";
      }

      if (request.jobQual == "") {
        document.getElementById("jobQual").style.borderColor = "red";
      }
      if (request.jobQual != "") {
        document.getElementById("jobQual").style.borderColor = "black";
      }

      if (request.jobSpecificExp == "") {
        document.getElementById("jobSpecificExp").style.borderColor = "red";
      }
      if (request.jobSpecificExp != "") {
        document.getElementById("jobSpecificExp").style.borderColor = "black";
      }

      if (
        request.date_requested != "" &&
        request.position != "" &&
        request.availableslots != "" &&
        request.position_level != "" &&
        request.salary != "" &&
        request.jobDesc != "" &&
        request.jobQual != "" &&
        request.jobSpecificExp != ""
      ) {
        Logs("ADD", "PRA Request Created");
        axios
          .post(API_URL_ADMIN + "create-position-request", {
            request_position: request.position,
            request_count: request.availableslots,
            request_department: decode(user).dept,
            request_date: request.date_requested,
            request_positionLevel: request.position_level,
            request_salary: request.salary,
            request_jobDescription: request.jobDesc,
            request_qualification: request.jobQual,
            request_specifiactionWorkExperience: request.jobSpecificExp,
          })
          .then((res) => {
            setShowRequest(res.data);
            setAddRequest(false);
            notify_Create();
          });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  //   Notify Create
  const notify_Create = () => {
    toast.success("Request Successfully Created", {
      position: "bottom-right",
      hideProgressBar: true,
      autoClose: 5000,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  const notify_warningEmpyFields = () => {
    toast.warn("All field are empty!", {
      position: "bottom-right",
      hideProgressBar: true,
      autoClose: 1000,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  const notify_warningPosition = () => {
    toast.warn("Position field is empty!", {
      position: "bottom-center",
      hideProgressBar: true,
      autoClose: 5000,
      pauseOnHover: false,
      theme: "colored",
    });
  };
  const notify_warningSlots = () => {
    toast.warn(" Available slots field is empty!", {
      position: "bottom-center",
      hideProgressBar: true,
      autoClose: 5000,
      pauseOnHover: false,
      theme: "colored",
    });
  };
  const notify_warningDepartment = () => {
    toast.warn(" Department field is empty!", {
      position: "bottom-center",
      hideProgressBar: true,
      autoClose: 5000,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  return (
    <motion.div
      className="w-full h-full absolute bg-black/50 items-center flex justify-center !top-0 !left-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      exit={{ opacity: 0 }}
    >
      <motion.div className="absolute bg-white h-135 w-222 items-center shadow-md shadow-gray-900 z-999">
        <div className="w-full h-full flex flex-col item-center text-center mb-5">
          <div className=" prdc-color w-full h-25">
            {/* =========================================== */}
            <div className="flex items-center">
              <div className="mt-2 ml-2">
                <img
                  src={
                    branding
                      ? API_URL + branding[0]?.Logo
                      : "/imgs/deafult_logo.jpg"
                  }
                  alt=""
                  className="h-20 object-contain w-25 rounded-sm"
                />
              </div>
              <div className="flex mt-3">
                <span className="my-3 font-Roboto text-[25px] text-white arial-narrow-bold w-full text-center">
                  PERSONNEL REQUISITION ADVICE FORM
                </span>
              </div>

              <AiOutlineCloseSquare
                onClick={() => setAddRequest(false)}
                className="w-8 h-8 absolute top-1 right-1 cursor-pointer flex items-center justify-center mr-1 text-red-400 border-none active:scale-1 active:duration-75 transition-all ease-in-out hover:text-red-500 rounded-sm hover:rounded-sm"
              />
            </div>
          </div>

          <form className="absolute flex h-[95%] w-full flex-col top-30">
            {/* Top Part */}
            <div className="flex justify-center items-center absolute top-0 left-10">
              <div className="flex absolute top-0 left-0">
                {/* Left */}
                <div className="block w-100">
                  <div className="flex">
                    {/* Labels */}
                    <div className="block justify-center items-center">
                      <div className="flex">
                        <label className=" arial-narrow-bold ">
                          Date Requested:
                        </label>
                      </div>
                      <div className="flex">
                        <label className="arial-narrow-bold block">
                          Requesting Department:
                        </label>
                      </div>
                      <div className="flex">
                        <label className="arial-narrow-bold block">
                          Position Title:
                        </label>
                      </div>
                    </div>

                    {/* input fields -------------------------------------------------------------------------------- */}
                    <div className="block ml-6">
                      <div className="flex  mt-0.5">
                        <input
                          className="w-55 border h-5 arial-narrow border-black  bg-white focus:(outline-none) text-[14px] rounded-sm px-1"
                          type="datetime-local"
                          id="reqDate"
                          name="reqDate"
                          onChange={(e) =>
                            setRequest({
                              ...request,
                              date_requested: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="flex  mt-1">
                        <input
                          type="text"
                          className=" w-55 border h-5 arial-narrow border-black bg-white focus:(outline-none) text-[14px] rounded-sm px-1"
                          value={decode(user).dept}
                          disabled
                        />
                      </div>
                      <div className="flex  mt-1">
                        <input
                          className=" w-55 border h-5 arial-narrow border-black bg-white focus:(outline-none) text-[14px] rounded-sm px-1"
                          type="text"
                          id="position"
                          name="position"
                          required
                          placeholder="position title"
                          onChange={(e) =>
                            setRequest({
                              ...request,
                              position: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Right */}
                <div className="w-87 h-20 ml-15 justify-center items-center">
                  <div className="flex justify-between item">
                    {/* Labels */}
                    <div className="block justify-center items-center">
                      <div className="flex">
                        <label className=" arial-narrow-bold ">
                          Position Level:
                        </label>
                      </div>
                      <div className="flex">
                        <label className="arial-narrow-bold block">
                          Salary Range:
                        </label>
                      </div>
                      <div className="">
                        <label className="arial-narrow-bold block">
                          No. of Vacancies:
                        </label>
                      </div>
                    </div>

                    {/* input fields -------------------------------------------------------------------------------- */}
                    <div className="block justify-center items-center">
                      <div className="flex mt-0.5">
                        {/* <input
                          className="w-50 border h-5 arial-narrow border-black bg-white focus:(outline-none)"
                          type="text"
                          id="posLvl"
                          onChange={(e) =>
                            setRequest({
                              ...request,
                              position_level: e.target.value,
                            })
                          }
                          required
                          placeholder="Set position level. . ."
                        /> */}
                        <select
                          className={`w-55 border h-5 arial-narrow border-black bg-white focus:(outline-none) text-[12px] rounded-sm ${
                            request.position_level == ""
                              ? "text-gray-400"
                              : "text-black"
                          }`}
                          id="posLvl"
                          onChange={(e) =>
                            setRequest({
                              ...request,
                              position_level: e.target.value,
                            })
                          }
                        >
                          <option value="" selected hidden>
                            select position
                          </option>
                          <option value="Admin">Admin</option>
                          <option value="Executive">Executive</option>
                          <option value="Manager">Manager</option>
                          <option value="Supervisor">Supervisor</option>
                          <option value="Rank & File">Rank & File</option>
                        </select>
                      </div>

                      <div className="flex mt-1">
                        <input
                          className="w-55 border h-5 arial-narrow border-black  bg-white focus:(outline-none) rounded-sm text-[14px] px-1"
                          type="number"
                          id="salary"
                          min="1"
                          required
                          placeholder="salary range"
                          onChange={(e) =>
                            setRequest({ ...request, salary: e.target.value })
                          }
                        />
                      </div>

                      <div className="flex mt-1">
                        <input
                          className=" w-55 border h-5 arial-narrow border-black bg-white focus:(outline-none) rounded-sm text-[14px] px-1"
                          type="number"
                          id="availableslots"
                          min="1"
                          name="availableslots"
                          placeholder="number of vacant position"
                          required
                          onChange={(e) =>
                            setRequest({
                              ...request,
                              availableslots: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Below Container */}
            {/* 1st */}
            <div className="absolute left-10 top-20">
              <div className="flex justify-center mt-6">
                <div className="flex w-220">
                  <div className="block">
                    <label className="arial-narrow-bold flex text-[18px]">
                      JOB DESCRIPTION
                    </label>
                    <input
                      className=" w-203 border-[2.5px] h-10 arial-narrow border-gray-400 bg-white focus:(outline-none) rounded-sm px-1"
                      type="text"
                      id="jobDesc"
                      onChange={(e) =>
                        setRequest({ ...request, jobDesc: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* 2nd */}
              <div className="flex justify-center mt-5">
                <div className="flex w-220">
                  <div className="block">
                    <label className="arial-narrow-bold flex text-[18px]">
                      JOB QUALIFICATION
                    </label>
                    <input
                      className=" w-203 border-[2.5px] h-10 arial-narrow border-gray-400 bg-white focus:(outline-none) rounded-sm px-1"
                      type="text"
                      id="jobQual"
                      onChange={(e) =>
                        setRequest({ ...request, jobQual: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* 3rd */}
              <div className="flex justify-center mt-5">
                <div className="flex w-220">
                  <div className="block">
                    <label className="arial-narrow-bold flex text-[18px]">
                      JOB SPECIFICATION & WORK EXPERIENCE
                    </label>
                    <input
                      className=" w-203 border-[2.5px] h-10 arial-narrow border-gray-400 bg-white focus:(outline-none) rounded-sm px-1"
                      type="text"
                      id="jobSpecificExp"
                      onChange={(e) =>
                        setRequest({
                          ...request,
                          jobSpecificExp: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>

          <div className=" w-full flex items-center justify-end ">
            <button
              className="absolute bottom-8 arial-narrow-bold mr-4 mt-10 text-black text-[14px] h-8 w-25 justify-center border-[2.5px] border-black rounded-sm hover:(rounded-sm border-black) p-1  flex items-center focus:(outline-none) dark:(text-green-500 bg-transparent shadow-none hover:bg-green-400 hover:text-black) active:duration-75 transition-all ease-in-out rounded-sm hover:text-green-500"
              type="submit"
              onClick={AddRequest}
              disabled={useAdd() ? false : true}
            >
              <BiSave className="mr-2" />
              Save
            </button>
            <ToastContainer />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HrRequestAdd;
