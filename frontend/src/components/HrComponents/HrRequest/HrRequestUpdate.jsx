import React, { useEffect, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { AiFillCloseCircle, AiOutlineCloseSquare } from "react-icons/ai";
import { BiSave } from "react-icons/bi";
import {
  BsPersonFillDash,
  BsPersonFillLock,
  BsArrowLeftShort,
} from "react-icons/bs";
import { FaSearch, FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { API_URL_ADMIN, API_URL } from "../../../utils/Url";
import { useEdit } from "../../../Hooks/useAuthorized";
import { Logs } from "../../../utils/Logs";
import { useSelector } from "react-redux";
import decode from "jwt-decode";

const HrRequestUpdate = ({ setEditRequest, setShowRequest, editRequest }) => {
  const [editData, setEditData] = useState([]);
  const [valueData, setValueData] = useState({
    position: "",
    availableslots: "",
    department: "",
    date_requested: "",
    position_level: "",
    salary: "",
    jobDesc: "",
    jobQual: "",
    jobSpecificExp: "",
  });
  const { branding } = useSelector((state) => state.branding);
  const { user } = useSelector((state) => state.user);

  // console.log(valueData.count);

  useEffect(() => {
    axios(API_URL_ADMIN + `view-prf-request/${editRequest.id}`)
      .then((res) => {
        setEditData(res.data);
        setValueData({
          position: res.data.request_position,
          availableslots: res.data.request_count,
          department: res.data.request_department,
          date_requested: res.data.request_date,
          position_level: res.data.request_positionLevel,
          salary: res.data.request_salary,
          jobDesc: res.data.request_jobDescription,
          jobQual: res.data.request_qualification,
          jobSpecificExp: res.data.request_specifiactionWorkExperience,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const notify_Success = () => {
    toast.success("Request Updated", {
      position: "bottom-right",
      hideProgressBar: true,
      autoClose: 1000,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  const updatePRFrequest = () => {
    try {
      if (
        valueData.position == "" &&
        valueData.availableslots == 0 &&
        valueData.date_requested == "" &&
        valueData.position_level == "" &&
        valueData.salary == 0 &&
        valueData.jobDesc == "" &&
        valueData.jobQual == "" &&
        valueData.jobSpecificExp == ""
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
      if (valueData.position == "") {
        document.getElementById("position").style.borderColor = "red";
        return;
      } else {
        document.getElementById("position").style.borderColor = "black";
      }
      if (valueData.availableslots == "" || valueData.availableslots == 0) {
        document.getElementById("availableslots").style.borderColor = "red";
        return;
      } else {
        document.getElementById("availableslots").style.borderColor = "black";
      }
      if (valueData.date_requested == "") {
        document.getElementById("reqDate").style.borderColor = "red";
        return;
      } else {
        document.getElementById("reqDate").style.borderColor = "black";
      }
      if (valueData.position_level == "") {
        document.getElementById("posLvl").style.borderColor = "red";
        return;
      } else {
        document.getElementById("posLvl").style.borderColor = "black";
      }
      if (valueData.salary == "" || valueData.salary == 0) {
        document.getElementById("salary").style.borderColor = "red";
        return;
      } else {
        document.getElementById("salary").style.borderColor = "black";
      }
      if (valueData.jobDesc == "") {
        document.getElementById("jobDesc").style.borderColor = "red";
        return;
      } else {
        document.getElementById("jobDesc").style.borderColor = "black";
      }
      if (valueData.jobQual == "") {
        document.getElementById("jobQual").style.borderColor = "red";
        return;
      } else {
        document.getElementById("jobQual").style.borderColor = "black";
      }
      if (valueData.jobSpecificExp == "") {
        document.getElementById("jobSpecificExp").style.borderColor = "red";
        return;
      } else {
        document.getElementById("jobSpecificExp").style.borderColor = "black";
      }

      Logs("UPDATE", "PRA  Request Changed");
      axios
        .put(API_URL_ADMIN + `update-position-prf/${editRequest.id}`, {
          request_position: valueData.position,
          request_count: valueData.availableslots,
          request_department: valueData.department,
          request_date: valueData.date_requested,
          request_positionLevel: valueData.position_level,
          request_salary: valueData.salary,
          request_jobDescription: valueData.jobDesc,
          request_qualification: valueData.jobQual,
          request_specifiactionWorkExperience: valueData.jobSpecificExp,
        })
        .then((res) => {
          setShowRequest(res.data);
          notify_Success();
          setEditRequest(false);
        });
      return res.status(200);
    } catch (error) {
      return res.status(500).json(error);
    }
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
        <div className="w-full h-full relative flex flex-col item-center mb-5">
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
                  PERSONEL REQUISITION ADVICE FORM
                </span>
              </div>
              <AiOutlineCloseSquare
                onClick={() => setEditRequest(false)}
                className="w-8 h-8 absolute top-1 right-1 cursor-pointer flex items-center justify-center mr-1  text-red-400 border-none active:scale-1 active:duration-75 transition-all ease-in-out hover:text-red-500 rounded-sm hover:rounded-sm"
              />
            </div>
          </div>

          <form className="absolute flex h-[95%] w-full flex-col top-30">
            {/* Top Part */}
            <div className="flex justify-center items-center absolute top-0 left-10">
              <div className="flex absolute top-0 left-0">
                {/* Left */}
                <div className="block w-110">
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
                    <div className="block ml-5">
                      <div className="flex  mt-0.5">
                        <input
                          className="w-55 border h-5 arial-narrow border-black  bg-white focus:(outline-none) text-[14px] rounded-sm px-1"
                          type="datetime-local"
                          id="reqDate"
                          name="reqDate"
                          value={valueData.date_requested}
                          onChange={(e) =>
                            setValueData({
                              ...valueData,
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
                      <div className="flex mt-1">
                        <input
                          className=" w-55 border h-5 arial-narrow text-[14px] border-black bg-white focus:(outline-none) rounded-sm px-1"
                          type="text"
                          id="position"
                          name="position"
                          placeholder="position title. . ."
                          required
                          value={valueData.position}
                          onChange={(e) =>
                            setValueData({
                              ...valueData,
                              position: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Right */}
                <div className="w-86 h-20 ml-6 justify-center items-center">
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
                        <select
                          className="w-55 border h-5 arial-narrow border-black bg-white focus:(outline-none) text-[12px] rounded-sm "
                          id="posLvl"
                          value={valueData.position_level}
                          onChange={(e) =>
                            setValueData({
                              ...valueData,
                              position_level: e.target.value,
                            })
                          }
                        >
                          <option value="" selected disabled>
                            select position. . .
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
                          className="w-55 border h-5 arial-narrow border-black text-[14px] bg-white focus:(outline-none) rounded-sm px-1"
                          type="number"
                          id="salary"
                          min="1"
                          required
                          value={valueData.salary}
                          onChange={(e) =>
                            setValueData({
                              ...valueData,
                              salary: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="flex mt-1">
                        <input
                          className=" w-55 border h-5 arial-narrow border-black text-[14px] bg-white focus:(outline-none) rounded-sm px-1"
                          type="number"
                          id="availableslots"
                          min="1"
                          name="availableslots"
                          required
                          value={valueData.availableslots}
                          onChange={(e) =>
                            setValueData({
                              ...valueData,
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
                      value={valueData.jobDesc}
                      onChange={(e) =>
                        setValueData({ ...valueData, jobDesc: e.target.value })
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
                      value={valueData.jobQual}
                      onChange={(e) =>
                        setValueData({ ...valueData, jobQual: e.target.value })
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
                      className=" w-203 border-[2.5px] h-10 arial-narrow border-gray-400 bg-white focus:(outline-none)  rounded-sm px-1"
                      type="text"
                      id="jobSpecificExp"
                      value={valueData.jobSpecificExp}
                      onChange={(e) =>
                        setValueData({
                          ...valueData,
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
              className="absolute bottom-8 arial-narrow-bold mr-4 mt-10 text-black text-[14px] h-8 w-25 justify-center border-[2.5px] border-black rounded-sm hover:(rounded-sm border-black) p-1 flex items-center focus:(outline-none) dark:(text-green-500 bg-transparent shadow-none hover:bg-green-400 hover:text-black) active:duration-75 transition-all ease-in-out  py-1 rounded-sm hover:text-yellow-500"
              type="submit"
              onClick={updatePRFrequest}
              disabled={useEdit() ? false : true}
            >
              <BiSave className="mr-2" />
              Update
            </button>
            <ToastContainer />
          </div>
        </div>

        {/* <form className="flex h-[95%] w-full flex-col mt-3">
            <div className="addUser-div ">
              <span className="addUser-span mt-5">Request Position</span>
              <input
                type="text"
                id="position"
                name="position"
                className="addUser-input mt-5"
                placeholder={editData.request_position}
                value={valueData.position}
                onChange={(e) =>
                  setValueData({ ...valueData, position: e.target.value })
                }
                required
              />
            </div>

            <div className="addUser-div">
              <span className="addUser-span mt-5">Available Slots</span>
              <input
                className="w-90 border h-7 border-black rounded-md bg-white focus:(outline-none) mt-5"
                type="number"
                id="slots"
                min="1"
                name="availableslots"
                placeholder={editData.request_count}
                value={valueData.count}
                onChange={(e) =>
                  setValueData({ ...valueData, count: e.target.value })
                }
              />
            </div>
            <div className="addUser-div">
              <span className="addUser-span mt-5">Department</span>
              <input
                type="text"
                id="department"
                name="department"
                className="addUser-input mt-5"
                placeholder={editData.request_department}
                value={valueData.department}
                onChange={(e) =>
                  setValueData({ ...valueData, department: e.target.value })
                }
                required
              />
            </div>
          </form>
          <div className="w-full flex items-center justify-end mt-3">
            <button
              onClick={updatePRFrequest}
              disabled={useEdit() ? false : true}
              className="arial-narrow-bold text-[20px] border-green-500 active:scale-1 rounded-sm text-[14px] h-8 w-25 hover:(border-green-500 rounded-sm) active:duration-75 transition-all hover:( ease-in-out transform rounded-sm)  mb-5 flex items-center justify-center text-green-600   mr-4 disabled:(cursor-not-allowed) focus:(outline-none) dark:(bg-transparent border-green-500 border-2 text-green-500 hover:bg-green-500 hover:text-white"
            >
              <BiSave className="mr-2" />
              Save
            </button>
          </div> */}

        <ToastContainer />
      </motion.div>
    </motion.div>
  );
};

export default HrRequestUpdate;
