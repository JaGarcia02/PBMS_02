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

const HrScheduleUpdate = ({
  setUpdateSchedule,
  setScheduleData,
  updateSchedule,
}) => {
  const { branding } = useSelector((state) => state.branding);
  const { user } = useSelector((state) => state.user);
  const [checkEmpty, setCheckEmpty] = useState(false);
  const [shceduleUpdate_data, setScheduleUpdateData] = useState([]);
  const [UpdateSchedule_date, setUpdateSchedule_Date] = useState({
    Schedule_type: "",
    FromWorkingDays: "",
    ToWorkingDays: "",
    FromRestDays: "",
    ToRestDays: "",
  });
  const [UpdateWorkingHours, setUpdateWorkingHours] = useState({
    FromTime: "",
    ToTime: "",
  });

  useEffect(() => {
    axios(
      API_URL_HR + `view-byID-schedule/${updateSchedule.activator.schedule_ID}`
    ).then((res) => {
      setScheduleUpdateData(res.data);
      setUpdateSchedule_Date({
        Schedule_type: updateSchedule.activator.schedule_type,
        FromWorkingDays: updateSchedule.activator.schedule_workdayFrom,
        ToWorkingDays: updateSchedule.activator.schedule_workdayTo,
        FromRestDays: updateSchedule.activator.schedule_restdayFrom,
        ToRestDays: updateSchedule.activator.schedule_restdayTo,
      });
      setUpdateWorkingHours({
        FromTime: updateSchedule.activator.schedule_timeFrom,
        ToTime: updateSchedule.activator.schedule_timeTo,
      });
    });
  }, []);

  console.log(updateSchedule.activator.ID);

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
  const notify_ScheduleUpdated = () => {
    toast.info("Emplyee Schedule Updated!", {
      position: "bottom-right",
      hideProgressBar: true,
      autoClose: 3000,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  const UpdateSchedule = () => {
    // Error Handling
    if (
      UpdateSchedule_date.Schedule_type == "" &&
      UpdateSchedule_date.FromWorkingDays == "" &&
      UpdateSchedule_date.ToWorkingDays == "" &&
      UpdateSchedule_date.FromTime == "" &&
      UpdateSchedule_date.ToTime == "" &&
      UpdateSchedule_date.FromRestDays == "" &&
      UpdateSchedule_date.ToRestDays == ""
    ) {
      notify_AllEmptyFields();
      setCheckEmpty(true);
    } else if (UpdateSchedule_date.Schedule_type == "") {
      notify_EmptyFields();
      setCheckEmpty(true);
    } else if (UpdateSchedule_date.FromWorkingDays == "") {
      notify_EmptyFields();
      setCheckEmpty(true);
    } else if (UpdateSchedule_date.ToWorkingDays == "") {
      notify_EmptyFields();
      setCheckEmpty(true);
    } else if (UpdateWorkingHours.FromTime == "") {
      notify_EmptyFields();
      setCheckEmpty(true);
    } else if (UpdateWorkingHours.ToTime == "") {
      notify_EmptyFields();
      setCheckEmpty(true);
    } else if (
      UpdateSchedule_date.FromRestDays == "" &&
      UpdateSchedule_date.ToRestDays == ""
    ) {
      notify_EmptyFields();
      setCheckEmpty(true);
    } else if (
      UpdateSchedule_date.FromWorkingDays ==
        UpdateSchedule_date.ToWorkingDays ||
      (UpdateSchedule_date.FromWorkingDays == "" &&
        UpdateSchedule_date.ToWorkingDays == "")
    ) {
      notify_DuplicateFields();
      document.getElementById("fromWorkingDays").style.borderColor = "red";
      document.getElementById("fromWorkingDays").value = "";
      document.getElementById("toWorkingDays").style.borderColor = "red";
      document.getElementById("toWorkingDays").value = "";
    } else if (
      UpdateSchedule_date.FromRestDays == UpdateSchedule_date.ToRestDays
    ) {
      notify_DuplicateFields();
      document.getElementById("restdayTo").style.borderColor = "red";
      document.getElementById("restdayTo").value = "";
      document.getElementById("restdayFrom").style.borderColor = "red";
      document.getElementById("restdayFrom").value = "";
    } else {
      // Success Condition
      if (
        UpdateSchedule_date.FromRestDays != "" &&
        UpdateSchedule_date.ToRestDays == ""
      ) {
        axios
          .put(API_URL_HR + `update-schedule/${updateSchedule.activator.ID}`, {
            schedule_type: UpdateSchedule_date.Schedule_type,
            schedule_workdayFrom: UpdateSchedule_date.FromWorkingDays,
            schedule_workdayTo: UpdateSchedule_date.ToWorkingDays,
            schedule_timeFrom: UpdateWorkingHours.FromTime,
            schedule_timeTo: UpdateWorkingHours.ToTime,
            schedule_restdayFrom: UpdateSchedule_date.FromRestDays,
            schedule_restdayTo: "",
            schedule_restday: UpdateSchedule_date.FromRestDays,
          })
          .then((res) => {
            setScheduleData(res.data);
            setUpdateSchedule_Date({
              Schedule_type: "",
              FromWorkingDays: "",
              ToWorkingDays: "",
              FromRestDays: "",
              ToRestDays: "",
            });
            setUpdateWorkingHours({
              FromTime: "",
              ToTime: "",
            });
            notify_ScheduleUpdated();
            Logs("UPDATE", "Employee Schedule Updated");
            setUpdateSchedule({ activator: null, ID: null });
          })
          .catch((err) => console.log(err));
      } else if (
        UpdateSchedule_date.FromRestDays == "" &&
        UpdateSchedule_date.ToRestDays != ""
      ) {
        axios
          .put(API_URL_HR + `update-schedule/${updateSchedule.activator.ID}`, {
            schedule_type: UpdateSchedule_date.Schedule_type,
            schedule_workdayFrom: UpdateSchedule_date.FromWorkingDays,
            schedule_workdayTo: UpdateSchedule_date.ToWorkingDays,
            schedule_timeFrom: UpdateWorkingHours.FromTime,
            schedule_timeTo: UpdateWorkingHours.ToTime,
            schedule_restdayFrom: "",
            schedule_restdayTo: UpdateSchedule_date.ToRestDays,
            schedule_restday: UpdateSchedule_date.ToRestDays,
          })
          .then((res) => {
            setScheduleData(res.data);
            setUpdateSchedule_Date({
              Schedule_type: "",
              FromWorkingDays: "",
              ToWorkingDays: "",
              FromRestDays: "",
              ToRestDays: "",
            });
            setUpdateWorkingHours({
              FromTime: "",
              ToTime: "",
            });
            notify_ScheduleUpdated();
            Logs("UPDATE", "Employee Schedule Updated");
            setUpdateSchedule({ activator: null, ID: null });
          })
          .catch((err) => console.log(err));
      } else {
        axios
          .put(API_URL_HR + `update-schedule/${updateSchedule.activator.ID}`, {
            schedule_type: UpdateSchedule_date.Schedule_type,
            schedule_workdayFrom: UpdateSchedule_date.FromWorkingDays,
            schedule_workdayTo: UpdateSchedule_date.ToWorkingDays,
            schedule_timeFrom: UpdateWorkingHours.FromTime,
            schedule_timeTo: UpdateWorkingHours.ToTime,
            schedule_restdayFrom: UpdateSchedule_date.FromRestDays,
            schedule_restdayTo: UpdateSchedule_date.ToRestDays,
            schedule_restday:
              UpdateSchedule_date.FromRestDays +
              " - " +
              UpdateSchedule_date.ToRestDays,
          })
          .then((res) => {
            setScheduleData(res.data);
            setUpdateSchedule_Date({
              Schedule_type: "",
              FromWorkingDays: "",
              ToWorkingDays: "",
              FromRestDays: "",
              ToRestDays: "",
            });
            setUpdateWorkingHours({
              FromTime: "",
              ToTime: "",
            });
            notify_ScheduleUpdated();
            Logs("UPDATE", "Employee Schedule Updated");
            setUpdateSchedule({ activator: null, ID: null });
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
                  UPDATE EMPLOYEE SCHEDULE
                </span>
              </div>

              <AiOutlineCloseSquare
                onClick={() => setUpdateSchedule({ activator: null, ID: null })}
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
                      UpdateSchedule_date.Schedule_type == "" && checkEmpty
                        ? "border-red-500"
                        : "border-gray-500"
                    }`}
                    placeholder="Schedule type. . ."
                    onChange={(e) =>
                      setUpdateSchedule_Date({
                        ...UpdateSchedule_date,
                        Schedule_type: e.target.value,
                      })
                    }
                    value={UpdateSchedule_date.Schedule_type}
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
                          UpdateSchedule_date.FromWorkingDays == ""
                            ? "text-gray-400"
                            : "text-black"
                        } ${
                          UpdateSchedule_date.FromWorkingDays == "" &&
                          checkEmpty
                            ? "border-red-500"
                            : "border-gray-500"
                        }`}
                        onChange={(e) =>
                          //   (e) => console.log(e.target.value)
                          setUpdateSchedule_Date({
                            ...UpdateSchedule_date,
                            FromWorkingDays: e.target.value,
                          })
                        }
                        value={UpdateSchedule_date.FromWorkingDays}
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
                          UpdateSchedule_date.ToWorkingDays == ""
                            ? "text-gray-400"
                            : "text-black"
                        } ${
                          UpdateSchedule_date.ToWorkingDays == "" && checkEmpty
                            ? "border-red-500"
                            : "border-gray-500"
                        }`}
                        onChange={(e) =>
                          //   (e) => console.log(e.target.value)
                          setUpdateSchedule_Date({
                            ...UpdateSchedule_date,
                            ToWorkingDays: e.target.value,
                          })
                        }
                        value={UpdateSchedule_date.ToWorkingDays}
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
                          UpdateWorkingHours.FromTime == "" && checkEmpty
                            ? "border-red-500"
                            : "border-gray-500"
                        }`}
                        onChange={(e) =>
                          // console.log(e.target.value)
                          setUpdateWorkingHours({
                            ...UpdateWorkingHours,
                            FromTime: e.target.value,
                          })
                        }
                        value={UpdateWorkingHours.FromTime}
                      />
                    </div>
                    -
                    <div className="flex">
                      <input
                        id="toTime"
                        type="time"
                        className={`border-[2px] border-black arial-narrow px-1 ${
                          UpdateWorkingHours.ToTime == "" && checkEmpty
                            ? "border-red-500"
                            : "border-gray-500"
                        }`}
                        onChange={(e) =>
                          // console.log(e.target.value)
                          setUpdateWorkingHours({
                            ...UpdateWorkingHours,
                            ToTime: e.target.value,
                          })
                        }
                        value={UpdateWorkingHours.ToTime}
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
                          UpdateSchedule_date.FromRestDays == ""
                            ? "text-gray-400"
                            : "text-black"
                        } ${
                          UpdateSchedule_date.FromRestDays == "" && checkEmpty
                            ? "border-red-500"
                            : "border-gray-500"
                        }`}
                        onChange={(e) =>
                          // console.log(e.target.value)
                          setUpdateSchedule_Date({
                            ...UpdateSchedule_date,
                            FromRestDays: e.target.value,
                          })
                        }
                        value={UpdateSchedule_date.FromRestDays}
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
                          UpdateSchedule_date.ToRestDays == ""
                            ? "text-gray-400"
                            : "text-black"
                        } ${
                          UpdateSchedule_date.ToRestDays == "" && checkEmpty
                            ? "border-red-500"
                            : "border-gray-500"
                        }`}
                        onChange={(e) =>
                          // console.log(e.target.value)
                          setUpdateSchedule_Date({
                            ...UpdateSchedule_date,
                            ToRestDays: e.target.value,
                          })
                        }
                        value={UpdateSchedule_date.ToRestDays}
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
              onClick={UpdateSchedule}
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

export default HrScheduleUpdate;
