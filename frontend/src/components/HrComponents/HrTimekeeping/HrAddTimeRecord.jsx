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

const HrAddTimeRecord = ({ setOpenInsertTimeRecord }) => {
  const { branding } = useSelector((state) => state.branding);
  const { user } = useSelector((state) => state.user);
  const [timeRecordData, setTimeRecordData] = useState({ dtr: [] });
  const [chosenDate, setChosenDate] = useState([]);
  const [checkEmpty, setCheckEmpty] = useState(false);
  const [timeRecordInput, setTimeRecordInput] = useState({
    id: "",
    cutoff: "",
    timeIn: "",
    breakStart: "",
    breakEnd: "",
    timeOut: "",
    bioId: "",
  });

  console.log(timeRecordData);

  const AddTimeRecord = () => {
    if (
      timeRecordInput.cutoff == "" ||
      timeRecordInput.timeIn == "" ||
      timeRecordInput.breakStart == "" ||
      timeRecordInput.breakEnd == "" ||
      timeRecordInput.timeOut == "" ||
      timeRecordInput.bioId == ""
    ) {
      //   alert("PBMS System:\nSome Input Fields are Empty!");
      setCheckEmpty(true);
    } else {
      setTimeRecordData({
        ...timeRecordData,
        dtr: [...timeRecordData.dtr, timeRecordInput],
      });
      document.getElementById("cutoff").value = "";
      document.getElementById("timeIn").value = "";
      document.getElementById("breakStart").value = "";
      document.getElementById("breakEnd").value = "";
      document.getElementById("timeOut").value = "";
      document.getElementById("bioId").value = "";
      setTimeRecordInput({
        ...timeRecordInput,
        id: "",
        cutoff: "",
        timeIn: "",
        breakStart: "",
        breakEnd: "",
        timeOut: "",
        bioId: "",
      });
    }
  };

  const RemoveInput = (id) => {
    const newValue = timeRecordData.dtr.filter((fil) => fil.id != id);
    setTimeRecordData({ ...timeRecordData, dtr: newValue });
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
      className="w-full h-full absolute bg-black/50 items-center flex justify-center !top-0 !left-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      exit={{ opacity: 0 }}
    >
      <motion.div className="absolute bg-white h-135 w-222 items-center shadow-md shadow-gray-900 z-999 ">
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
            {timeRecordData.dtr.map((dataArray) => {
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
                            className="border border-black rounded-sm px-1 arial-narrow text-[14px] w-45 h-7"
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
                            className="w-30 h-7 border-[1px] border-black px-2 rounded-sm arial-narrow text-[16px]"
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
                            className="w-30 h-7 border-[1px] border-black px-2 rounded-sm arial-narrow text-[16px]"
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
                            className="w-30 h-7 border-[1px] border-black px-2 rounded-sm arial-narrow text-[16px]"
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
                            className="w-30 h-7 border-[1px] border-black px-2 rounded-sm arial-narrow text-[16px]"
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
                            className="w-30 h-7 border-[1px] border-black px-2 rounded-sm  arial-narrow text-[14px]"
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

            {timeRecordData.dtr.length == 15 ? (
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
                          className={`border border-black rounded-sm px-1 arial-narrow text-[14px] w-45 h-7 ${
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
                        <span className="arial-narrow-bold">Time in</span>
                      </div>
                      <div className="flex">
                        <input
                          type="time"
                          id="timeIn"
                          onChange={(e) =>
                            setTimeRecordInput({
                              ...timeRecordInput,
                              id: uniqid(),
                              timeIn: e.target.value,
                            })
                          }
                          className={`w-30 h-7 border-[1px] border-black px-2 rounded-sm arial-narrow text-[16px] ${
                            timeRecordInput.timeIn == "" && checkEmpty
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
                          className={`w-30 h-7 border-[1px] border-black px-2 rounded-sm arial-narrow text-[16px] ${
                            timeRecordInput.breakStart == "" && checkEmpty
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
                          id="breakEnd"
                          onChange={(e) =>
                            setTimeRecordInput({
                              ...timeRecordInput,
                              breakEnd: e.target.value,
                            })
                          }
                          className={`w-30 h-7 border-[1px] border-black px-2 rounded-sm arial-narrow text-[16px] ${
                            timeRecordInput.breakEnd == "" && checkEmpty
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
                          className={`w-30 h-7 border-[1px] border-black px-2 rounded-sm arial-narrow text-[16px] ${
                            timeRecordInput.timeOut == "" && checkEmpty
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
                          className={`w-30 h-7 border-[1px] border-black px-2 rounded-sm arial-narrow text-[14px] ${
                            timeRecordInput.bioId == "" && checkEmpty
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

          <ToastContainer />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HrAddTimeRecord;
