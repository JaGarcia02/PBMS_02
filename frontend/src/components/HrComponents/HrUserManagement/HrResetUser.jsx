import React, { useEffect, useState, useRef } from "react";
import { useEdit, useAdd } from "../../../Hooks/useAuthorized";
import { motion } from "framer-motion";
import {
  FaUserEdit,
  FaUserTimes,
  FaUserCheck,
  FaUserCog,
  FaUsersCog,
  FaEdit,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { TiRefresh } from "react-icons/ti";
import {
  BsArrowLeftShort,
  BsPersonFillDash,
  BsPersonFillLock,
  BsSearch,
} from "react-icons/bs";
import { RiSave2Fill } from "react-icons/ri";
import axios from "axios";
import { API_URL_ADMIN, API_URL_HR, API_URL_SYSTEM } from "../../../utils/Url";
import moment from "moment";
import Select from "react-select";
import {
  deactivate,
  editUser,
  reactivate,
  resetUser,
  suspend,
  unsuspend,
} from "../../../features/users/usersSlice";
import { Logs } from "../../../utils/Logs";
import { AiOutlineCloseSquare } from "react-icons/ai";

const HrResetUser = ({ setReset, userObj }) => {
  const [editMode, setEditMode] = useState(false);
  const [objUser, setObjUser] = useState(userObj);
  const [sectionArray, setSectionArray] = useState([]);
  const [logs, setLogs] = useState([]);
  const [empInfo, setEmpInfo] = useState([]);
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState({
    start: "01/01/2000",
    end: moment(),
  });
  const [searchLog, setSearchLog] = useState("");
  const inputRef = useRef();

  const focusInput = (e) => {
    e.preventDefault();
    setSearchLog(inputRef.current.value);
  };

  const objId = userObj.employee_id;
  console.log(empInfo);

  useEffect(() => {
    try {
      const get_section = async () => {
        const employed = await axios.get(API_URL_HR + `get-employee-list/?q=`);
        const sections = await axios.get(API_URL_ADMIN + "get-section");
        const logHistory = await axios.get(
          API_URL_SYSTEM + `get-logs/${objUser.employee_id}`
        );

        setEmpInfo(employed.data);
        setLogs(logHistory.data);
        setSectionArray(
          sections.data
            .filter(
              (filter) => filter.admin_sectionDepartment == objUser.department
            )
            .map((data) => {
              return {
                value: data.admin_sectionName,
                label: data.admin_sectionName,
              };
            })
        );
      };
      get_section();
    } catch (err) {
      console.log(err);
    }
  }, [objUser.department]);

  const click_button = (e, request) => {
    e.preventDefault();

    if (request == 1) {
      Logs("UPDATE", `Edit User of ${objUser.employee_id}`);
      dispatch(
        editUser({
          ID: objUser.ID,
          position: objUser.role,
          firstName: objUser.firstName,
          LastName: objUser.LastName,
          MiddleName: objUser.MiddleName,
          department: objUser.department,
          user_category: objUser.user_Category,
          sections: objUser.section + ",all" ?? ",all",
        })
      );
    }
    if (request == 2) {
      Logs("UPDATE", `reset user Employee ${objUser.employee_id}`);
      dispatch(resetUser({ ID: objUser.ID }));
    }
    if (request == 3) {
      Logs("UPDATE", `Suspend user Employee ${objUser.employee_id}`);
      dispatch(suspend({ ID: objUser.ID }));
    }
    if (request == 4) {
      Logs("UPDATE", `Unsuspend user Employee ${objUser.employee_id}`);
      dispatch(unsuspend({ ID: objUser.ID }));
    }
    if (request == 5) {
      Logs("UPDATE", `Deactivate user Employee ${objUser.employee_id}`);
      dispatch(deactivate({ ID: objUser.ID }));
    }
    if (request == 6) {
      Logs("UPDATE", `Reactivate user Employee ${objUser.employee_id}`);
      dispatch(reactivate({ ID: objUser.ID }));
    }
  };

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        setEditMode(false);
        document.body.style.overflow = "unset";
      }
    };
    window.addEventListener("keydown", close);

    return () => {
      window.removeEventListener("keydown", close);
    };
  }, []);

  const customControlStyles = (base) => ({
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    fontSize: 12,
    overflow: "auto",
  });

  return (
    <motion.div
      className="w-screen h-screen absolute top-15 left-0 flex p-3 items-center justify-center"
      style={{ backgroundColor: "#F2ECEC" }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        exit={{ opacity: 0 }}
        className="flex-[0.4] shadow-md rounded-sm mr-2 h-full"
      >
        <div className="flex flex-col bg-white  shadow-xl h-full w-full max-w-[1000px] items-center relative">
          <hr className="w-full border-2 border-gray-800 absolute top-0" />

          <AiOutlineCloseSquare
            onClick={() => setReset(false)}
            className="w-6.5 h-6.5 absolute top-2 right-1 cursor-pointer flex items-center justify-center mr-1 text-red-400 border-none active:scale-1 active:duration-75 transition-all ease-in-out hover:text-red-500 rounded-sm hover:rounded-sm"
          />

          <div className="flex justify-center items-center w-full flex-row mt-10 mb-4">
            <img
              src="/imgs/profile.png"
              // src={profile_picture}
              className="ml-2 text-[50px] text-white flex items-center justify-center rounded-full h-25 w-25 "
            />
          </div>
          <div className="user-reset-alignment flex ">
            {/* FULL NAME EDIT MODE */}
            {editMode ? (
              <div className="flex justify-center w-full">
                <input
                  className="w-25 border-1 mr-1 border-green-700"
                  value={objUser.LastName}
                  name="lastName"
                  onChange={(e) =>
                    setObjUser({
                      ...objUser,
                      LastName: e.target.value,
                    })
                  }
                />
                <input
                  className="w-30 border-1 mr-1 border-green-700"
                  value={objUser.firstName}
                  name="givenName"
                  onChange={(e) =>
                    setObjUser({
                      ...objUser,
                      firstName: e.target.value,
                    })
                  }
                />
                <input
                  className="w-25 border-1 mr-1 border-green-700"
                  value={objUser.MiddleName}
                  name="middleName"
                  onChange={(e) =>
                    setObjUser({
                      ...objUser,
                      MiddleName: e.target.value,
                    })
                  }
                />
              </div>
            ) : (
              <p className="text-center w-full flex items-center justify-center arial-narrow-bold text-[23px]">
                {objUser.firstName +
                  " " +
                  objUser.MiddleName +
                  " " +
                  objUser.LastName}
                <FaEdit
                  className="ml-3 cursor-pointer"
                  onClick={() => setEditMode(true)}
                />
              </p>
            )}
          </div>

          <div className="text-center mb-2">
            <span
              className={`arial-narrow-bold text-[20px] ${
                objUser.acctStatus == "Inactive"
                  ? "text-gray-600"
                  : objUser.Suspension == 1
                  ? "text-red-600"
                  : objUser.counterLogin >= 5
                  ? "text-yellow-600"
                  : "text-green-700"
              }`}
            >
              {objUser.acctStatus == "Inactive"
                ? "DEACTIVATED"
                : objUser.Suspension == 1
                ? "SUSPENDED"
                : objUser.counterLogin >= 5
                ? "LOCKED"
                : "ACTIVE"}
            </span>
          </div>

          <div className="flex w-[95%] text-black mt-8">
            <p className="inline-block w-[13rem] arial-narrow">Employee ID:</p>
            <p className="arial-narrow-bold">{objUser.employee_id}</p>
          </div>

          <div className="flex w-[95%] text-black mt-1">
            <p className="inline-block w-[13rem] arial-narrow">Username:</p>
            <p className="arial-narrow-bold">{objUser.username}</p>
          </div>

          <div className="flex w-[95%] text-black mt-1">
            <p className="inline-block w-[13rem] arial-narrow">
              System in PBMS:
            </p>
            {editMode ? (
              <Select
                className="w-40 border-1 border-green-700 rounded-none"
                onChange={(e) =>
                  setObjUser({
                    ...objUser,
                    section: e.map((items) => items.value).toString(),
                  })
                }
                isMulti
                options={sectionArray}
                styles={{ control: customControlStyles }}
              />
            ) : (
              <p
                className="arial-narrow-bold truncate w-60"
                title={objUser.section.replace(/,/g, " | ").replace("all", "")}
              >
                {objUser.section.replace(/,/g, " | ").replace("all", "")}
              </p>
            )}
          </div>

          <div className="flex w-[95%] text-black mt-1">
            <p className="inline-block w-[13rem] arial-narrow ">Email:</p>
            <p className="arial-narrow-bold">{objUser.email}</p>
          </div>

          {/* MARGIN 10 */}

          <div className="flex w-[95%] text-black mt-10">
            <p className="inline-block w-[13rem] arial-narrow">Outlet:</p>
            <p className="arial-narrow-bold">
              {
                empInfo.filter(
                  (fil) => fil.Employee_ID == objUser.employee_id
                )[0]?.Employee_Designation
              }
            </p>
          </div>

          <div className="flex w-[95%] text-black mt-1">
            <p className="inline-block w-[13rem] arial-narrow">Company Name</p>
            <p className="arial-narrow-bold">{objUser.company}</p>
          </div>
          <div className="flex w-[95%] text-black mt-1">
            {/* DEPARTMENT EDIT MODE */}
            <p className="inline-block w-[13rem] arial-narrow">Department:</p>
            {editMode ? (
              <select
                className="w-40 border-1 border-green-700"
                onChange={(e) =>
                  setObjUser({
                    ...objUser,
                    department: e.target.value,
                  })
                }
              >
                <option selected hidden>
                  {objUser.department == "HR"
                    ? "Human Resources"
                    : objUser.department == "SALES"
                    ? "Sales"
                    : objUser.department == "OPS"
                    ? "Operation"
                    : objUser.department == "AMAD"
                    ? "Asset Management"
                    : objUser.department == "ACC"
                    ? "Accounting & Finance"
                    : objUser.department == "TA"
                    ? "Talent Acquisition"
                    : objUser.department == "BSD"
                    ? "Business Support"
                    : objUser.department == "TSD"
                    ? "Technical Service"
                    : ""}
                </option>
                <option value="HR">Human Resources</option>
                <option value="SALES">Sales</option>
                <option value="OPS">Operations</option>
                <option value="AMAD">Asset Management</option>
                <option value="ACC">Accounting & Finance</option>
                <option value="TA">Talent Acquisition</option>
                <option value="BSD">Business Support</option>
                <option value="TSD">Technical Services</option>
              </select>
            ) : (
              <p className="arial-narrow-bold">
                {objUser.department == "HR"
                  ? "Human Resources"
                  : objUser.department == "SALES"
                  ? "Sales"
                  : objUser.department == "OPS"
                  ? "Operation"
                  : objUser.department == "AMAD"
                  ? "Asset Management"
                  : objUser.department == "ACC"
                  ? "Accounting & Finance"
                  : objUser.department == "TA"
                  ? "Talent Acquisition"
                  : objUser.department == "BSD"
                  ? "Business Support"
                  : objUser.department == "TSD"
                  ? "Technical Service"
                  : ""}
              </p>
            )}
          </div>
          <div className="flex w-[95%] mt-1">
            <p className="inline-block w-[13rem] arial-narrow text-black">
              Role:
            </p>

            {editMode ? (
              <select
                className="w-40 border-1 border-green-700 "
                value={objUser.role}
                onChange={(e) =>
                  setObjUser({
                    ...objUser,
                    role: e.target.value,
                  })
                }
              >
                <option disabled>Choose an option</option>
                <option value="2">Admin</option>
                <option value="3">Executive</option>
                <option value="4">Manager</option>
                <option value="5">Supervisor</option>
                <option value="6">Rank & File</option>
              </select>
            ) : (
              <p className="arial-narrow-bold text-black">
                {objUser.role == 2
                  ? "Admin"
                  : objUser.role == 3
                  ? "Executive"
                  : objUser.role == 4
                  ? "Manager"
                  : objUser.role == 5
                  ? "Supervisor"
                  : objUser.role == 6
                  ? "Rank & File"
                  : ""}
              </p>
            )}
          </div>

          <div className="flex w-[95%] text-black mt-1">
            <p className="inline-block w-[13rem] arial-narrow ">
              Position Title:
            </p>
            <p className="arial-narrow-bold">
              {
                empInfo.filter(
                  (fil) => fil.Employee_ID == objUser.employee_id
                )[0]?.Employee_JobDesc
              }
            </p>
          </div>

          <div className="flex w-[85%] justify-between mt-auto mb-5 <md:(w-[90%] mt-10)">
            {/* ======================================= FOR EDIT FUNCTION ============================================*/}
            {editMode && (
              <button
                // disabled={objUser.counterLogin >= 5 ? false : true}
                className="w-35 h-7 bg-white text-black border-[2px] border-gray-500 mr-3 text-[12px] arial-narrow-bold rounded-sm flex items-center justify-center disabled:(bg-gray-400 shadow-gray-800 cursor-not-allowed hover:bg-gray-500) hover:(border-blue-500)"
                onClick={(e) => click_button(e, 2)}
              >
                <TiRefresh className=" text-[20px] rounded-sm" />
                Reset Password
              </button>
            )}

            {/* ======================================= FOR SUSPENSION FUNCTION ============================================*/}
            {objUser.Suspension == 0 ? (
              <button
                onClick={(e) => click_button(e, 3)}
                className="w-30 h-7 focus:outline-none bg-white border-[2px] border-gray-500 mr-3 shadow-sm text-[12px] rounded-sm arial-narrow-bold text-black flex items-center justify-center disabled:(bg-gray-400 shadow-gray-800 cursor-not-allowed hover:bg-gray-500 hover:rounded-md) hover:(border-yellow-500)"
              >
                <BsPersonFillLock className="mr-1 text-[15px]" />
                Suspend
              </button>
            ) : (
              <button
                onClick={(e) => click_button(e, 4)}
                className="w-30 h-7 bg-green-500 mr-3 text-black text-[80%] shadow-sm flex items-center justify-center  shadow-green-800 hover:border-green-500 border-0  disabled:(bg-gray-400 shadow-gray-800 cursor-not-allowed hover:bg-gray-500 hover:rounded-md) active:scale-1 active:duration-75 transition-all hover:scale-108 ease-in-out transform py-1 rounded-xl hover:bg-green-500 hover:rounded-md"
              >
                <FaUserCheck className="mr-1 text-[15px] text-black" />
                <p className="text-[13px] text-black text-[80%]">Unsuspend</p>
              </button>
            )}
            {/* ============================= FOR DEACTIVATE FUNCTION ============================================ */}
            {objUser.acctStatus == "Active" ? (
              <button
                onClick={(e) => click_button(e, 5)}
                className="w-30 h-7 bg-white mr-3 text-black arial-narrow-bold text-[12px] border-[2px] border-gray-500 rounded-sm shadow-sm flex items-center justify-center disabled:(bg-gray-400 shadow-gray-800 cursor-not-allowed hover:bg-gray-500 hover:rounded-md) hover:(border-red-500)"
              >
                <BsPersonFillDash className="mr-1 text-[15px]" /> Deactivate
              </button>
            ) : (
              <button
                onClick={(e) => click_button(e, 6)}
                className="w-30 h-7 bg-green-500 mr-3 text-black text-[80%] shadow-sm flex items-center justify-center  shadow-green-800 hover:border-green-500 border-0  disabled:(bg-gray-400 shadow-gray-800 cursor-not-allowed hover:bg-gray-500 hover:rounded-md) active:scale-1 active:duration-75 transition-all hover:scale-108 ease-in-out transform py-1 rounded-xl hover:bg-green-500 hover:rounded-md"
              >
                <FaUsersCog className="mr-1 text-[15px] text-black" /> Activate
              </button>
            )}

            {/* ======================================= FOR RESET FUNCTION ============================================*/}
            <button
              onClick={(e) => click_button(e, 1)}
              className="w-25 h-7 text-black bg-white border-[2px] border-gray-500 mr-3 rounded-sm text-[12px] flex items-center justify-center border-0  disabled:(bg-gray-400 shadow-gray-800 cursor-not-allowed hover:bg-gray-500 hover:rounded-md) hover:(border-green-500)"
            >
              <RiSave2Fill className="mr-1" />
              Save
            </button>
          </div>
          <hr className="w-full border-2 border-gray-800 absolute bottom-0" />
        </div>
      </motion.div>
      {/* This 2nd div */}
      <div className="flex-[0.7] flex flex-col bg-transparent w-full h-full relative max-w-[1000px]">
        <hr className="w-full border-2 border-gray-800 absolute top-0" />
        <div className="w-full flex-col flex p-3 bg-white">
          <span className="text-[20px] flex arial-narrow-bold mb-2 text-black">
            USER ACTIVITY HISTORY
          </span>
          <div className="flex w-full justify-between">
            <div>
              <span className="mr-3">Filter Date:</span>
              <input
                type="date"
                className="border w-30 border-black h-6 arial-narrow px-1"
                placeholder="filter-date"
                onChange={(e) =>
                  setSelectedDate({ ...selectedDate, start: e.target.value })
                }
              />{" "}
              -{" "}
              <input
                type="date"
                className="border w-30 border-black h-6 arial-narrow px-1"
                placeholder="filter-date"
                onChange={(e) =>
                  setSelectedDate({ ...selectedDate, end: e.target.value })
                }
              />
            </div>
            <form className="flex">
              <input className="border border-black" ref={inputRef} />
              <button
                className="prdc-color rounded-none text-white w-7 flex items-center justify-center"
                onClick={focusInput}
              >
                <BsSearch />
              </button>
            </form>
          </div>
        </div>
        <div className="w-full mt-2 h-full bg-white overflow-auto">
          <table className="w-full text-left p-1 h-8 border-separate border-spacing-5 border-transparent -mt-2 shadow-reds-300">
            <tr className="prdc-color text-white  shadow-md  w-full text-left ">
              <th className="text-left w-50 arial-narrow text-center">Date</th>
              <th className="text-left w-50 arial-narrow text-center">
                Action
              </th>
              <th className="text-left w-50 arial-narrow text-center">
                Details
              </th>
            </tr>
            {logs
              .filter(
                (date) =>
                  moment(date.createdAt).isBetween(
                    moment(selectedDate.start),
                    moment(selectedDate.end),
                    "days",
                    []
                  ) &&
                  (date.Action.includes(searchLog) ||
                    date.Description.includes(searchLog))
              )
              .map((data) => {
                return (
                  <tr className="w-full  border-b bg-bg-transparent border-b-black">
                    <td className="text-center arial-narrow text-black border border-black border-r-0 ">
                      {moment(data.createdAt).format("MMMM DD YYYY, hh:mm a")}
                    </td>
                    <td className="text-center arial-narrow text-black border border-black border-l-0 border-r-0">
                      {data.Action}
                    </td>
                    <td className="text-center arial-narrow text-black border border-black border-l-0 ">
                      {data.Description}
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
        <hr className="w-full border-2 border-gray-800 absolute bottom-0" />
      </div>
    </motion.div>
  );
};

export default HrResetUser;
