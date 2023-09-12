import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { IoAdd } from "react-icons/io5";
import { FaSearch, FaTimes } from "react-icons/fa";
import { BsFillTrashFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { CiSquareRemove } from "react-icons/ci";
import { RxUpdate } from "react-icons/rx";
import HrRequestAdd from "./HrRequest/HrRequestAdd";
import { useEdit, useDelete } from "../../Hooks/useAuthorized";
import HrRequestUpdate from "./HrRequest/HrRequestUpdate";
import { API_URL_ADMIN, API_URL_HR } from "../../utils/Url";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Logs } from "../../utils/Logs";
import moment from "moment";
import { useSelector } from "react-redux";
import jwt from "jwt-decode";
import HrScheduleAdd from "./HrSchedule/HrScheduleAdd";
import HrScheduleUpdate from "./HrSchedule/HrScheduleUpdate";

const HrSchedule = () => {
  const [searchData, setSearchData] = useState("");
  const [schedule_data, setScheduleData] = useState([]);
  const [addSchedule, setAddSchedule] = useState(false);
  const [updateSchedule, setUpdateSchedule] = useState({
    activator: null,
    ID: null,
  });

  useEffect(() => {
    axios
      .get(API_URL_HR + "/view-all-schedule")
      .then((res) => {
        console.log(res.data);
        setScheduleData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // console.log(schedule_data);

  // Notify Delete
  const notify_Delete = () => {
    toast.error("Employee Schedule Deleted", {
      position: "bottom-right",
      hideProgressBar: true,
      autoClose: 5000,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  const deleteSchedlue = (ID) => {
    axios.delete(API_URL_HR + `delete-schedule/${ID}`).then((res) => {
      setScheduleData(res.data);
      Logs("DELETE", "Employment Category Deleted");
      notify_Delete();
    });
  };

  return (
    <div className="w-full relative h-full flex flex-col p-4">
      <div className="flex justify-between items-center ml-0.5">
        <div className="w-[50%] arial-narrow text-[18px]">
          <span>Employee Schedule</span>
        </div>
        <div className=" flex h-8 w-[20%] border-gray-400 border relative text-black shadow-sm shadow-gray-600 bg-white dark:(bg-gray-600 text-light-50 shadow-none) <md:(w-[100%])">
          <input
            className="border-none arial-narrow outline-none w-full bg-transparent placeholder-gray-40 px-2"
            onChange={(e) => {
              setSearchData(e.target.value);
            }}
            placeholder="Search..."
          />
          <div className="flex justify-center items-center prdc-color text-white w-8 shadow-sm shadow-gray-600 mr-0.5">
            <FaSearch className="px-2 h-full w-8 cursor-pointer absolute right-0 prdc-color text-white" />
          </div>
        </div>
      </div>

      <div className="w-full h-[60vh] overflow-auto ">
        <table className="w-[100%] h-[10%] border-transparent mt-4 overflow-hidden justify-evenly border-separate border-spacing-4">
          <thead>
            <tr className="shadow-sm shadow-gray-800 prdc-color h-10 text-white">
              <th className="arial-narrow-bold w-[10%]">
                <span>NO.</span>
              </th>
              <th className="arial-narrow-bold w-[15%]">
                <span>EMPLOYEE TYPE</span>
              </th>
              <th className="arial-narrow-bold w-[15%]">
                <span>DAY</span>
              </th>
              <th className="arial-narrow-bold w-[15%]">
                <span>TIME</span>
              </th>
              <th className="arial-narrow-bold w-[15%]">
                <span>REST DAY</span>
              </th>
              <th className="arial-narrow-bold w-[20%]">
                <div className="flex justify-center items-center ">
                  <button
                    className="flex justify-center items-center bg-white text-black arial-narrow-bold text-[12px] w-[60%] h-25px rounded-sm duration-[0.5s] ease-in-out transition hover:text-green-600 focus:(outline-none)"
                    onClick={() => setAddSchedule(!addSchedule)}
                  >
                    <IoAdd className="mr-2 text-[16px] <md:(text-[14px])" />
                    Add Schedule
                  </button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {schedule_data
              .filter((val) => {
                if (
                  searchData == "" ||
                  val.schedule_type
                    .toLowerCase()
                    .includes(searchData.toLocaleLowerCase())
                ) {
                  return val;
                }
              })
              .map((data, index) => {
                return (
                  <tr className="border border-black  arial-narrow h-10  text-black">
                    <td className="text-[12px] text-center border-b border-l border-t border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                      {index + 1}
                    </td>
                    <td className="text-[12px] text-center border-b border-t border-b-black border-t-black text-black ">
                      {data.schedule_type}
                    </td>
                    <td className="text-[12px] text-center border-b border-t border-b-black border-t-black text-black ">
                      {data.schedule_workdayFrom +
                        " - " +
                        data.schedule_workdayTo}
                    </td>
                    <td className="text-[12px] text-center border-b border-t border-b-black border-t-black text-black ">
                      {data.schedule_timeFrom + " - " + data.schedule_timeTo}
                    </td>

                    <td className="text-[12px] text-center border-b border-t border-b-black border-t-black text-black ">
                      {data.schedule_restday}
                    </td>

                    <td className="text-center border-b border-t border-b-black border-t-black border-r border-black ">
                      <div className="flex justify-center items-center">
                        <button
                          className="flex justify-center items-center text-center border-none active:duration-75 transition transform hover:text-yellow-600 focus:(outline-none)"
                          onClick={() => {
                            console.log(data);
                            setUpdateSchedule({
                              activator: data,
                              ID: data.ID,
                            });
                          }}
                        >
                          <FiEdit className="mr-3 text-center text-[20px] " />
                        </button>
                        <button
                          className="flex justify-center items-center border-none active:duration-75 transition transform hover:text-red-600 focus:(outline-none)"
                          onClick={() => deleteSchedlue(data.ID)}
                        >
                          <BsFillTrashFill className=" ml-1 text-[20px]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <AnimatePresence>
        {addSchedule && (
          <HrScheduleAdd
            setAddSchedule={setAddSchedule}
            setScheduleData={setScheduleData}
          />
        )}
        {updateSchedule.ID && (
          <HrScheduleUpdate
            setUpdateSchedule={setUpdateSchedule}
            setScheduleData={setScheduleData}
            updateSchedule={updateSchedule}
          />
        )}
      </AnimatePresence>
      <ToastContainer />
    </div>
  );
};

export default HrSchedule;
