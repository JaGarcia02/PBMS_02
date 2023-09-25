import React, { useEffect, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { AiFillCloseCircle, AiOutlineCloseSquare } from "react-icons/ai";
import { BsFillPlusCircleFill } from "react-icons/bs";
import uniqid from "uniqid";
import { useAdd } from "../../../Hooks/useAuthorized";
import {
  BsPersonFillDash,
  BsPersonFillLock,
  BsArrowLeftShort,
  BsFillTrashFill,
} from "react-icons/bs";
import { FaSearch, FaTimes } from "react-icons/fa";
import { BiSave, BiEdit } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { API_URL_ADMIN, API_URL, API_URL_HR } from "../../../utils/Url";
import { Logs } from "../../../utils/Logs";
import { useSelector } from "react-redux";
import decode from "jwt-decode";
import moment from "moment";

const HrAddTimeRecord = ({
  setOpenInsertTimeRecord,
  setTimeRecordData,
  timeRecordData,
  hrEmployee,
}) => {
  const { branding } = useSelector((state) => state.branding);
  const { user } = useSelector((state) => state.user);
  const [timeRecordDataArray, setTimeRecordDataArray] = useState({ dtr: [] });
  const [chosenDate, setChosenDate] = useState([]);
  const [checkEmpty, setCheckEmpty] = useState(false);
  const [timeRecordInput, setTimeRecordInput] = useState({
    id: "",
    cutoff: "",
    date_day: "",
    timeIn: 0,
    breakStart: 0,
    breakEnd: 0,
    timeOut: 0,
    bioId: "",
    empId: "",
  });

  // console.log(timeRecordDataArray.dtr);
  // console.log(hrEmployee);

  // const result = milliseconds(24, 36, 0);

  // const result =
  //   timeRecordInput.timeIn.split(":")[0] * (60000 * 60) +
  //   timeRecordInput.timeIn.split(":")[1] * 60000;
  // console.log(moment(result).format("HH:mm"));

  // convertedTime.split(":")[0] * 3600000;
  // console.log(
  //   convertedTime.split(":")[0] * 3600000 + convertedTime.split(":")[1] * 60000
  // );

  const notify_createCutoff = () => {
    toast.success(" Time Record Submitted!", {
      position: "bottom-right",
      hideProgressBar: true,
      autoClose: 5000,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  const AddTimeRecord = () => {
    if (
      timeRecordInput.cutoff == "" ||
      timeRecordInput.bioId == "" ||
      timeRecordInput.empId == ""
    ) {
      //   alert("PBMS System:\nSome Input Fields are Empty!");
      setCheckEmpty(true);
    } else {
      setTimeRecordDataArray({
        ...timeRecordDataArray,
        dtr: [...timeRecordDataArray.dtr, timeRecordInput],
      });
      document.getElementById("cutoff").value = "";
      document.getElementById("dateDay").value = "";
      document.getElementById("timeIn").value = "";
      document.getElementById("breakStart").value = "";
      document.getElementById("breakEnd").value = "";
      document.getElementById("timeOut").value = "";
      document.getElementById("bioId").value = "";
      document.getElementById("empId").value = "";
      setTimeRecordInput({
        ...timeRecordInput,
        id: "",
        cutoff: "",
        date_day: "",
        timeIn: 0,
        breakStart: 0,
        breakEnd: 0,
        timeOut: 0,
        bioId: "",
        empId: "",
      });
    }
  };

  const RemoveInput = (id) => {
    const newValue = timeRecordDataArray.dtr.filter((fil) => fil.id != id);
    setTimeRecordDataArray({ ...timeRecordDataArray, dtr: newValue });
  };

  // Converted time in

  const SubmitTimeRecord = () => {
    const timeKeeping_data = timeRecordDataArray.dtr
      // .filter((fil) => fil.Employee_ID === timeRecordInput.empId)
      .map((data) => {
        // Time format
        const initial_time_value = data.date_day.split("-");
        if (initial_time_value[1] == 1) {
          initial_time_value[1] = "January";
        } else if (initial_time_value[1] == 2) {
          initial_time_value[1] = "February";
        } else if (initial_time_value[1] == 3) {
          initial_time_value[1] = "March";
        } else if (initial_time_value[1] == 4) {
          initial_time_value[1] = "April";
        } else if (initial_time_value[1] == 5) {
          initial_time_value[1] = "May";
        } else if (initial_time_value[1] == 6) {
          initial_time_value[1] = "June";
        } else if (initial_time_value[1] == 7) {
          initial_time_value[1] = "July ";
        } else if (initial_time_value[1] == 8) {
          initial_time_value[1] = "August";
        } else if (initial_time_value[1] == 9) {
          initial_time_value[1] = "September";
        } else if (initial_time_value[1] == 10) {
          initial_time_value[1] = "October ";
        } else if (initial_time_value[1] == 11) {
          initial_time_value[1] = "November";
        } else if (initial_time_value[1] == 12) {
          initial_time_value[1] = "December";
        }

        const MM_d_YYYY =
          initial_time_value[1] +
          " " +
          initial_time_value[2] +
          "," +
          initial_time_value[0];

        return {
          Cutoff: data.cutoff,
          Date_day: MM_d_YYYY,
          Time_in: data.timeIn == 0 ? 0 : data.date_day + "T" + data.timeIn,
          Time_break_start:
            data.breakStart == 0 ? 0 : data.date_day + "T" + data.breakStart,
          Time_break_end:
            data.breakEnd == 0 ? 0 : data.date_day + "T" + data.breakEnd,
          Time_out: data.timeOut == 0 ? 0 : data.date_day + "T" + data.timeOut,
          BioID: data.bioId,
          EmpID: data.empId,
          Schedle_Type: hrEmployee
            .filter((fil) => fil.Employee_ID === data.empId)
            .map((this_data) => this_data.Employee_Schedule),
        };
      });

    axios
      .post(API_URL_HR + "create-timerecord", {
        dtr: timeKeeping_data,
      })
      .then((res) => {
        setTimeRecordData(res.data);
        notify_createCutoff();
        setOpenInsertTimeRecord(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(API_URL_HR + "view-cutoff-category")
      .then((res) => {
        setChosenDate(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <motion.div
      className="w-screen h-screen absolute bg-black/50 items-center flex justify-center !top-0 !left-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      exit={{ opacity: 0 }}
    >
      <motion.div className="relative bg-white h-130 w-290 items-center shadow-md shadow-gray-900 z-999 overflow-hidden">
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
              <div className="flex-col w-[50%] mt-2">
                <div className="w-[100%] flex">
                  <span className="text-[25px] text-white arial-narrow-bold">
                    Human Resources Timekeeping
                  </span>
                </div>
                <div className="w-[100%] flex">
                  <span className="text-[25px] text-white arial-narrow-bold">
                    Insert Time Record
                  </span>
                </div>
              </div>

              <AiOutlineCloseSquare
                onClick={() => setOpenInsertTimeRecord(false)}
                className="w-8 h-8 absolute top-1 right-1 cursor-pointer flex items-center justify-center mr-1 text-red-400 border-none active:scale-1 active:duration-75 transition-all ease-in-out hover:text-red-500 rounded-sm hover:rounded-sm"
              />
            </div>
          </div>

          <div className="overflow-auto mb-10">
            {timeRecordDataArray.dtr.map((dataArray) => {
              return (
                <>
                  <div className="mt-[1rem] w-full flex justify-between px-5">
                    <div className="flex">
                      <div className="flex-col">
                        <div className="flex">
                          <span className="arial-narrow-bold">Cutoff</span>
                        </div>
                        <div className="flex">
                          <select
                            name=""
                            onChange={(e) =>
                              setTimeRecordInput({
                                ...timeRecordInput,
                                cutoff: e.target.value,
                              })
                            }
                            defaultValue={dataArray.cutoff}
                            className="border-[2px] border-black rounded-sm px-1 arial-narrow text-[14px] w-45 h-7"
                          >
                            <option value="">Select cutoff</option>
                            {chosenDate.map((data) => {
                              return (
                                <>
                                  <option value={data.cutOff}>
                                    {data.cutOff}
                                  </option>
                                </>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex-col">
                        <div className="flex">
                          <span className="arial-narrow-bold">Date</span>
                        </div>
                        <div className="flex">
                          <input
                            type="date"
                            defaultValue={dataArray.date_day}
                            onChange={(e) =>
                              setTimeRecordInput({
                                ...timeRecordInput,
                                date_day: e.target.value,
                              })
                            }
                            className="w-30 h-7 border-[2px] border-black px-2 rounded-sm arial-narrow text-[16px]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex-col">
                        <div className="flex">
                          <span className="arial-narrow-bold">Time in</span>
                        </div>
                        <div className="flex">
                          <input
                            type="time"
                            defaultValue={dataArray.timeIn}
                            onChange={(e) =>
                              setTimeRecordInput({
                                ...timeRecordInput,
                                timeIn: e.target.value,
                              })
                            }
                            className="w-30 h-7 border-[2px] border-black px-2 rounded-sm arial-narrow text-[16px]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex-col">
                        <div className="flex">
                          <span className="arial-narrow-bold">Time out</span>
                        </div>
                        <div className="flex">
                          <input
                            type="time"
                            defaultValue={dataArray.breakStart}
                            onChange={(e) =>
                              setTimeRecordInput({
                                ...timeRecordInput,
                                breakStart: e.target.value,
                              })
                            }
                            className="w-30 h-7 border-[2px] border-black px-2 rounded-sm arial-narrow text-[16px]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex-col">
                        <div className="flex">
                          <span className="arial-narrow-bold">Time in</span>
                        </div>
                        <div className="flex">
                          <input
                            type="time"
                            defaultValue={dataArray.breakEnd}
                            onChange={(e) =>
                              setTimeRecordInput({
                                ...timeRecordInput,
                                breakEnd: e.target.value,
                              })
                            }
                            className="w-30 h-7 border-[2px] border-black px-2 rounded-sm arial-narrow text-[16px]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex-col">
                        <div className="flex">
                          <span className="arial-narrow-bold">Time out</span>
                        </div>
                        <div className="flex">
                          <input
                            type="time"
                            defaultValue={dataArray.timeOut}
                            onChange={(e) =>
                              setTimeRecordInput({
                                ...timeRecordInput,
                                timeOut: e.target.value,
                              })
                            }
                            className="w-30 h-7 border-[2px] border-black px-2 rounded-sm arial-narrow text-[16px]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex-col">
                        <div className="flex">
                          <span className="arial-narrow-bold">Bio Id</span>
                        </div>
                        <div className="flex">
                          <input
                            type="text"
                            defaultValue={dataArray.bioId}
                            onChange={(e) =>
                              setTimeRecordInput({
                                ...timeRecordInput,
                                bioId: e.target.value,
                              })
                            }
                            className="w-30 h-7 border-[2px] border-black px-2 rounded-sm  arial-narrow text-[14px]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex-col">
                        <div className="flex">
                          <span className="arial-narrow-bold">Employee Id</span>
                        </div>
                        <div className="flex">
                          <input
                            type="text"
                            defaultValue={dataArray.empId}
                            onChange={(e) =>
                              setTimeRecordInput({
                                ...timeRecordInput,
                                empId: e.target.value,
                              })
                            }
                            className="w-30 h-7 border-[2px] border-black px-2 rounded-sm  arial-narrow text-[14px]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center items-center text-red-500 mt-6">
                      <button
                        className="focus:outline-none border-none"
                        onClick={() => RemoveInput(dataArray.id)}
                      >
                        <BsFillTrashFill />
                      </button>
                    </div>
                  </div>
                </>
              );
            })}

            {timeRecordDataArray.dtr.length == 15 ? (
              ""
            ) : (
              <>
                {/* ======================================================================================================================================================== */}
                <div className="mt-[1rem] w-full flex justify-between px-5">
                  <div className="flex">
                    <div className="flex-col">
                      <div className="flex">
                        <span className="arial-narrow-bold">Cutoff</span>
                      </div>
                      <div className="flex">
                        <select
                          name=""
                          id="cutoff"
                          onChange={(e) =>
                            setTimeRecordInput({
                              ...timeRecordInput,
                              cutoff: e.target.value,
                            })
                          }
                          className={`border-[2px] border-black rounded-sm px-1 arial-narrow text-[14px] w-45 h-7 ${
                            timeRecordInput.cutoff == "" && checkEmpty
                              ? "border-red-500"
                              : "border-gray-500"
                          }`}
                        >
                          <option value="">Select cutoff</option>
                          {chosenDate.map((data) => {
                            return (
                              <>
                                <option value={data.cutOff}>
                                  {data.cutOff}
                                </option>
                              </>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-col">
                      <div className="flex">
                        <span className="arial-narrow-bold">Date</span>
                      </div>
                      <div className="flex">
                        <input
                          type="date"
                          id="dateDay"
                          onChange={(e) =>
                            setTimeRecordInput({
                              ...timeRecordInput,
                              id: uniqid(),
                              date_day: e.target.value,
                            })
                          }
                          className={`w-30 h-7 border-[2px] border-black px-2 rounded-sm arial-narrow text-[16px] ${
                            timeRecordInput.date_day == "" && checkEmpty
                              ? "border-red-500"
                              : "border-gray-500"
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-col">
                      <div className="flex">
                        <span className="arial-narrow-bold">Time in</span>
                      </div>
                      <div className="flex">
                        <input
                          type="time"
                          id="timeIn"
                          onChange={(e) =>
                            setTimeRecordInput({
                              ...timeRecordInput,
                              timeIn: e.target.value,
                            })
                          }
                          className={`w-30 h-7 border-[2px] border-black px-2 rounded-sm arial-narrow text-[16px] `}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-col">
                      <div className="flex">
                        <span className="arial-narrow-bold">Time out</span>
                      </div>
                      <div className="flex">
                        <input
                          type="time"
                          id="breakStart"
                          onChange={(e) =>
                            setTimeRecordInput({
                              ...timeRecordInput,
                              breakStart: e.target.value,
                            })
                          }
                          className={`w-30 h-7 border-[2px] border-black px-2 rounded-sm arial-narrow text-[16px] `}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-col">
                      <div className="flex">
                        <span className="arial-narrow-bold">Time in</span>
                      </div>
                      <div className="flex">
                        <input
                          type="time"
                          id="breakEnd"
                          onChange={(e) =>
                            setTimeRecordInput({
                              ...timeRecordInput,
                              breakEnd: e.target.value,
                            })
                          }
                          className={`w-30 h-7 border-[2px] border-black px-2 rounded-sm arial-narrow text-[16px] `}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-col">
                      <div className="flex">
                        <span className="arial-narrow-bold">Time out</span>
                      </div>
                      <div className="flex">
                        <input
                          type="time"
                          id="timeOut"
                          onChange={(e) =>
                            setTimeRecordInput({
                              ...timeRecordInput,
                              timeOut: e.target.value,
                            })
                          }
                          className={`w-30 h-7 border-[2px] border-black px-2 rounded-sm arial-narrow text-[16px] `}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-col">
                      <div className="flex">
                        <span className="arial-narrow-bold">Bio Id</span>
                      </div>
                      <div className="flex">
                        <input
                          type="text"
                          id="bioId"
                          onChange={(e) =>
                            setTimeRecordInput({
                              ...timeRecordInput,
                              bioId: e.target.value,
                            })
                          }
                          className={`w-30 h-7 border-[2px] border-black px-2 rounded-sm arial-narrow text-[14px] ${
                            timeRecordInput.bioId == "" && checkEmpty
                              ? "border-red-500"
                              : "border-gray-500"
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-col">
                      <div className="flex">
                        <span className="arial-narrow-bold">Employee Id</span>
                      </div>
                      <div className="flex">
                        <input
                          type="text"
                          id="empId"
                          onChange={(e) =>
                            setTimeRecordInput({
                              ...timeRecordInput,
                              empId: e.target.value,
                            })
                          }
                          className={`w-30 h-7 border-[2px] border-black px-2 rounded-sm arial-narrow text-[14px] ${
                            timeRecordInput.empId == "" && checkEmpty
                              ? "border-red-500"
                              : "border-gray-500"
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center items-center text-green-500 mt-6">
                    <button
                      onClick={AddTimeRecord}
                      className="focus:outline-none border-none"
                    >
                      <BsFillPlusCircleFill />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {timeRecordDataArray.dtr.length == 0 ? (
            ""
          ) : (
            <div className="w-full flex justify-end items-center">
              <button
                id="submitDTR"
                onClick={SubmitTimeRecord}
                className="mr-10 border-[2px] border-black w-25 h-7 arial-narrow-bold rounded-sm flex justify-center items-center text-black hover:(bg-green-500 text-white border-green-500) disabled:(bg-gray-400 text-gray-300 border-gray-600 cursor-not-allowed)"
              >
                <BiSave className="mr-1" /> Save
              </button>
            </div>
          )}

          <ToastContainer />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HrAddTimeRecord;

/*
to  format time

 const hours = timeRecordInput.timeIn.split(":")[0];
  const minutes = timeRecordInput.timeIn.split(":")[1];
  const seconds = 0;
  var convertedTime;
  if (hours > 0 && hours <= 12) {
    convertedTime = "" + hours;
  } else if (hours > 12) {
    convertedTime = "" + (hours - 12);
  } else if (hours == 0) {
    convertedTime = 12;
  }
  convertedTime += minutes < 10 ? ":" + 0 + minutes : ":" + minutes;
  convertedTime += seconds < 10 ? ":" + 0 + seconds : ":" + seconds;
  convertedTime += hours >= 12 ? "PM" : "AM";
  const TimeIn_Formatted = convertedTime;



*/
