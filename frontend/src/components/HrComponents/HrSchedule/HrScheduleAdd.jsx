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
import { API_URL_ADMIN, API_URL, API_URL_HR } from "../../../utils/Url";
import { Logs } from "../../../utils/Logs";
import { useSelector } from "react-redux";
import decode from "jwt-decode";
import moment from "moment";

const HrScheduleAdd = ({ setAddSchedule, setScheduleData }) => {
  const { branding } = useSelector((state) => state.branding);
  const { user } = useSelector((state) => state.user);
  const [checkEmpty, setCheckEmpty] = useState(false);
  const [schedule_date, setSchedule_date] = useState({
    Schedule_type: "",
    FromWorkingDays: "",
    ToWorkingDays: "",
    FromRestDays: "",
    ToRestDays: "",
  });
  const [workingHours, setWorkingHours] = useState({
    FromTime: "",
    ToTime: "",
  });

  const notify_AllEmptyFields = () => {
    toast.warn("All fields are empty!", {
      position: "bottom-right",
      hideProgressBar: true,
      autoClose: 3000,
      pauseOnHover: false,
      theme: "colored",
    });
  };
  const notify_EmptyFields = () => {
    toast.warn("Please complete all input fields!", {
      position: "bottom-right",
      hideProgressBar: true,
      autoClose: 3000,
      pauseOnHover: false,
      theme: "colored",
    });
  };
  const notify_DuplicateFields = () => {
    toast.warn("Cannot enter duplicate working day!", {
      position: "bottom-right",
      hideProgressBar: true,
      autoClose: 3000,
      pauseOnHover: false,
      theme: "colored",
    });
  };
  const notify_ScheduleCreated = () => {
    toast.success("Emplyee Schedule Created!", {
      position: "bottom-right",
      hideProgressBar: true,
      autoClose: 3000,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  const AddSchedule = () => {
    // Error Handling
    if (
      schedule_date.Schedule_type == "" &&
      schedule_date.FromWorkingDays == "" &&
      schedule_date.ToWorkingDays == "" &&
      workingHours.FromTime == "" &&
      workingHours.ToTime == "" &&
      schedule_date.FromRestDays == "" &&
      schedule_date.ToRestDays == ""
    ) {
      notify_AllEmptyFields();
      setCheckEmpty(true);
    } else if (schedule_date.Schedule_type == "") {
      notify_EmptyFields();
      setCheckEmpty(true);
    } else if (schedule_date.FromWorkingDays == "") {
      notify_EmptyFields();
      setCheckEmpty(true);
    } else if (schedule_date.ToWorkingDays == "") {
      notify_EmptyFields();
      setCheckEmpty(true);
    } else if (workingHours.FromTime == "") {
      notify_EmptyFields();
      setCheckEmpty(true);
    } else if (workingHours.ToTime == "") {
      notify_EmptyFields();
      setCheckEmpty(true);
    } else if (
      schedule_date.FromRestDays == "" &&
      schedule_date.ToRestDays == ""
    ) {
      notify_EmptyFields();
      setCheckEmpty(true);
    } else if (
      schedule_date.FromWorkingDays == schedule_date.ToWorkingDays ||
      (schedule_date.FromWorkingDays == "" && schedule_date.ToWorkingDays == "")
    ) {
      notify_DuplicateFields();
      document.getElementById("fromWorkingDays").style.borderColor = "red";
      document.getElementById("fromWorkingDays").value = "";
      document.getElementById("toWorkingDays").style.borderColor = "red";
      document.getElementById("toWorkingDays").value = "";
    } else if (schedule_date.FromRestDays == schedule_date.ToRestDays) {
      notify_DuplicateFields();

      document.getElementById("restdayTo").style.borderColor = "red";
      document.getElementById("restdayTo").value = "";
      document.getElementById("restdayFrom").style.borderColor = "red";
      document.getElementById("restdayFrom").value = "";
    } else {
      // Success Condition
      if (schedule_date.FromRestDays == "" && schedule_date.ToRestDays != "") {
        axios
          .post(API_URL_HR + "create-schedule", {
            schedule_type: schedule_date.Schedule_type,
            schedule_workdayFrom: schedule_date.FromWorkingDays,
            schedule_workdayTo: schedule_date.ToWorkingDays,
            schedule_timeFrom: workingHours.FromTime,
            schedule_timeTo: workingHours.ToTime,
            schedule_restdayFrom: "",
            schedule_restdayTo: schedule_date.ToRestDays,
            schedule_restday: schedule_date.ToRestDays,
          })
          .then((res) => {
            setScheduleData(res.data);
            setSchedule_date({
              Schedule_type: "",
              FromWorkingDays: "",
              ToWorkingDays: "",
              FromRestDays: "",
              ToRestDays: "",
            });
            setWorkingHours({
              FromTime: "",
              ToTime: "",
            });
            notify_ScheduleCreated();
            Logs("ADD", "Employee Schedule Created");
            setAddSchedule(false);
          })
          .catch((err) => console.log(err));
      } else if (
        schedule_date.ToRestDays == "" &&
        schedule_date.FromRestDays != ""
      ) {
        axios
          .post(API_URL_HR + "create-schedule", {
            schedule_type: schedule_date.Schedule_type,
            schedule_workdayFrom: schedule_date.FromWorkingDays,
            schedule_workdayTo: schedule_date.ToWorkingDays,
            schedule_timeFrom: workingHours.FromTime,
            schedule_timeTo: workingHours.ToTime,
            schedule_restdayFrom: schedule_date.FromRestDays,
            schedule_restdayTo: "",
            schedule_restday: schedule_date.FromRestDays,
          })
          .then((res) => {
            setScheduleData(res.data);
            setSchedule_date({
              Schedule_type: "",
              FromWorkingDays: "",
              ToWorkingDays: "",
              FromRestDays: "",
              ToRestDays: "",
            });
            setWorkingHours({
              FromTime: "",
              ToTime: "",
            });
            notify_ScheduleCreated();
            Logs("ADD", "Employee Schedule Created");
            setAddSchedule(false);
          })
          .catch((err) => console.log(err));
      } else {
        axios
          .post(API_URL_HR + "create-schedule", {
            schedule_type: schedule_date.Schedule_type,
            schedule_workdayFrom: schedule_date.FromWorkingDays,
            schedule_workdayTo: schedule_date.ToWorkingDays,
            schedule_timeFrom: workingHours.FromTime,
            schedule_timeTo: workingHours.ToTime,
            schedule_restdayFrom: schedule_date.FromRestDays,
            schedule_restdayTo: schedule_date.ToRestDays,
            schedule_restday:
              schedule_date.FromRestDays + " - " + schedule_date.ToRestDays,
          })
          .then((res) => {
            setScheduleData(res.data);
            setSchedule_date({
              Schedule_type: "",
              FromWorkingDays: "",
              ToWorkingDays: "",
              FromRestDays: "",
              ToRestDays: "",
            });
            setWorkingHours({
              FromTime: "",
              ToTime: "",
            });
            notify_ScheduleCreated();
            Logs("ADD", "Employee Schedule Created");
            setAddSchedule(false);
          })
          .catch((err) => console.log(err));
      }
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
      <motion.div className="absolute bg-white h-100 w-180 items-center shadow-md shadow-gray-900 z-999">
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
                  ADD EMPLOYEE SCHEDULE
                </span>
              </div>

              <AiOutlineCloseSquare
                onClick={() => setAddSchedule(false)}
                className="w-8 h-8 absolute top-1 right-1 cursor-pointer flex items-center justify-center mr-1 text-red-400 border-none active:scale-1 active:duration-75 transition-all ease-in-out hover:text-red-500 rounded-sm hover:rounded-sm"
              />
            </div>
          </div>

          <div className="w-full">
            <div className="flex px-5 mt-15 w-full justify-between">
              <div className="w-[50%] px-2">
                {/* ================================================== Left ================================================== */}
                <div className="flex justify-between">
                  <label htmlFor="" className="arial-narrow-bold">
                    Schedule Type:
                  </label>
                  <input
                    id="scheduleType"
                    type="text"
                    className={`border-[2px] border-black px-2 arial-narrow w-55 mb-8 rounded-sm focus:outline-none ${
                      schedule_date.Schedule_type == "" && checkEmpty
                        ? "border-red-500"
                        : "border-gray-500"
                    }`}
                    placeholder="Schedule type. . ."
                    onChange={(e) =>
                      setSchedule_date({
                        ...schedule_date,
                        Schedule_type: e.target.value,
                      })
                    }
                    value={schedule_date.Schedule_type}
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="" className="arial-narrow-bold">
                    Working Days:
                  </label>
                  <div className="flex justify-between w-55">
                    <div className="flex">
                      <select
                        name=""
                        id="fromWorkingDays"
                        className={`border-[2px] border-black arial-narrow px-1 focus:outline-none ${
                          schedule_date.FromWorkingDays == ""
                            ? "text-gray-400"
                            : "text-black"
                        } ${
                          schedule_date.FromWorkingDays == "" && checkEmpty
                            ? "border-red-500"
                            : "border-gray-500"
                        }`}
                        onChange={(e) =>
                          //   (e) => console.log(e.target.value)
                          setSchedule_date({
                            ...schedule_date,
                            FromWorkingDays: e.target.value,
                          })
                        }
                        value={schedule_date.FromWorkingDays}
                      >
                        <option value="" selected disabled>
                          From
                        </option>
                        <option value=""></option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                      </select>
                    </div>
                    -
                    <div className="flex">
                      <select
                        name=""
                        id="toWorkingDays"
                        className={`border-[2px] border-black arial-narrow px-1 focus:outline-none ${
                          schedule_date.ToWorkingDays == ""
                            ? "text-gray-400"
                            : "text-black"
                        } ${
                          schedule_date.ToWorkingDays == "" && checkEmpty
                            ? "border-red-500"
                            : "border-gray-500"
                        }`}
                        onChange={(e) =>
                          //   (e) => console.log(e.target.value)
                          setSchedule_date({
                            ...schedule_date,
                            ToWorkingDays: e.target.value,
                          })
                        }
                        value={schedule_date.ToWorkingDays}
                      >
                        <option value="" selected disabled>
                          To
                        </option>
                        <option value=""></option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                      </select>
                    </div>
                  </div>
                </div>
                {/* ================================================== Left ================================================== */}
              </div>
              <div className=" w-[50%] px-2">
                {/* ================================================== Right ================================================== */}
                <div className="flex justify-between">
                  {/* Time =================================================== */}
                  <label htmlFor="" className="arial-narrow-bold">
                    Working Hours:
                  </label>
                  <div className="flex justify-between w-55 mb-8">
                    <div className="flex">
                      <input
                        id="fromTime"
                        type="time"
                        className={`border-[2px] border-black arial-narrow px-1 ${
                          workingHours.FromTime == "" && checkEmpty
                            ? "border-red-500"
                            : "border-gray-500"
                        }`}
                        onChange={(e) =>
                          // console.log(e.target.value)
                          setWorkingHours({
                            ...workingHours,
                            FromTime: e.target.value,
                          })
                        }
                        value={workingHours.FromTime}
                      />
                    </div>
                    -
                    <div className="flex">
                      <input
                        id="toTime"
                        type="time"
                        className={`border-[2px] border-black arial-narrow px-1 ${
                          workingHours.ToTime == "" && checkEmpty
                            ? "border-red-500"
                            : "border-gray-500"
                        }`}
                        onChange={(e) =>
                          // console.log(e.target.value)
                          setWorkingHours({
                            ...workingHours,
                            ToTime: e.target.value,
                          })
                        }
                        value={workingHours.ToTime}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <label htmlFor="" className="arial-narrow-bold">
                    Rest Day:
                  </label>
                  <div className="flex justify-between w-55">
                    <div className="flex">
                      <select
                        name=""
                        id="restdayFrom"
                        className={`border-[2px] border-black arial-narrow px-1 ${
                          schedule_date.FromRestDays == ""
                            ? "text-gray-400"
                            : "text-black"
                        } ${
                          schedule_date.FromRestDays == "" && checkEmpty
                            ? "border-red-500"
                            : "border-gray-500"
                        }`}
                        onChange={(e) =>
                          // console.log(e.target.value)
                          setSchedule_date({
                            ...schedule_date,
                            FromRestDays: e.target.value,
                          })
                        }
                        value={schedule_date.FromRestDays}
                      >
                        <option value="" selected disabled>
                          From
                        </option>
                        <option value=""></option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                      </select>
                    </div>
                    -
                    <div className="flex">
                      <select
                        name=""
                        id="restdayTo"
                        className={`border-[2px] border-black arial-narrow px-1 ${
                          schedule_date.ToRestDays == ""
                            ? "text-gray-400"
                            : "text-black"
                        } ${
                          schedule_date.ToRestDays == "" && checkEmpty
                            ? "border-red-500"
                            : "border-gray-500"
                        }`}
                        onChange={(e) =>
                          // console.log(e.target.value)
                          setSchedule_date({
                            ...schedule_date,
                            ToRestDays: e.target.value,
                          })
                        }
                        value={schedule_date.ToRestDays}
                      >
                        <option value="" selected disabled>
                          To
                        </option>
                        <option value=""></option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                      </select>
                    </div>
                  </div>
                </div>
                {/* ================================================== Right ================================================== */}
              </div>
            </div>
          </div>

          <div className=" w-full flex items-center justify-end ">
            <button
              className="absolute bottom-8 arial-narrow-bold mr-4 mt-10 text-black text-[14px] h-8 w-25 justify-center border-[2.5px] border-black rounded-sm hover:(rounded-sm border-black) p-1  flex items-center focus:(outline-none) dark:(text-green-500 bg-transparent shadow-none hover:bg-green-400 hover:text-black) active:duration-75 transition-all ease-in-out rounded-sm hover:text-green-500"
              type="submit"
              onClick={AddSchedule}
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

export default HrScheduleAdd;
