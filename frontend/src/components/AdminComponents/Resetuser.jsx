import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AiFillCloseCircle, AiOutlineCloseSquare } from "react-icons/ai";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import {
  deactivate,
  editUser,
  reactivate,
  resetUser,
  suspend,
  unsuspend,
} from "../../features/users/usersSlice";
import { FcLock } from "react-icons/fc";
import {
  BsPersonFillDash,
  BsPersonFillLock,
  BsArrowLeftShort,
} from "react-icons/bs";
import { BiRightArrowAlt } from "react-icons/bi";
import {
  FaUserEdit,
  FaUserTimes,
  FaUserCheck,
  FaUserCog,
} from "react-icons/fa";
import jwt from "jwt-decode";
import { TiRefresh } from "react-icons/ti";
import { RiSave2Fill } from "react-icons/ri";
import { API_URL_ADMIN, API_URL_SYSTEM } from "../../utils/Url";
import Select from "react-select";

import { UniqBy } from "react-lodash";

const Resetuser = ({
  ID,
  EmployeeNum,
  division,
  position,
  status,
  name,
  department,
  setToggleInfo,
  AccountStatus,
  Suspension,
  username,
  email,
  company,
  user_category,
  section,
  LastName,
  MiddleName,
  firstName,
}) => {
  const [login, setLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [decodedToken, setDecodedToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [request, setRequest] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [logs, setLogs] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [editFieldForms, setEditFieldForms] = useState({
    EditfirstName: firstName,
    EditLastName: LastName,
    EditMiddleName: MiddleName,
    EditDepartment: department,
    EditPosition: position,
    EditUser_Category: user_category,
    EditSection: section,
  });

  const { admin } = useSelector((state) => state.auth);
  const config = {
    headers: { Authorization: `Bearer ${admin}}` },
  };
  const { listUser, isLoadingList, isSuccessList, messageList, isErrorList } =
    useSelector((state) => state.users);

  const dispatch = useDispatch();

  useEffect(() => {
    if (admin !== null) {
      setDecodedToken(jwt(admin));
      axios
        .get(API_URL_SYSTEM + `get-logs/${EmployeeNum}`)
        .then((res) => setLogs(res.data))
        .catch((err) => console.log(err));
    }
  }, [admin]);

  const resetLockedUser = (e) => {
    e.preventDefault();
    setLogin(true);
    setRequest(1);
  };

  const disableUser = (e) => {
    e.preventDefault();
    setLogin(true);
    setRequest(2);
  };

  const UnsuspendUser = (e) => {
    e.preventDefault();
    setLogin(true);
    setRequest(3);
  };

  const ActivateUser = (e) => {
    e.preventDefault();
    setLogin(true);
    setRequest(4);
  };

  const SaveEdit = (e) => {
    e.preventDefault();
    setLogin(true);
    setRequest(5);
  };

  const DeactivateUser = (e) => {
    e.preventDefault();
    setLogin(true);
    setRequest(6);
  };

  const extra_login = (e) => {
    e.preventDefault();
    axios
      .post(API_URL_ADMIN + "extra-login", {
        username: decodedToken?.username,
        password,
      })
      .then((response) => {
        if (request === 1) {
          dispatch(resetUser({ ID }));
          setToggleInfo(false);
        }
        if (request === 2) {
          dispatch(suspend({ ID }));
          setToggleInfo(false);
        }
        if (request === 3) {
          dispatch(unsuspend({ ID }));
          setToggleInfo(false);
        }
        if (request === 4) {
          dispatch(reactivate({ ID }));
          setToggleInfo(false);
        }
        if (request === 5) {
          dispatch(
            editUser({
              ID: ID,
              position: editFieldForms.EditPosition,
              firstName: editFieldForms.EditfirstName,
              LastName: editFieldForms.EditLastName,
              MiddleName: editFieldForms.EditMiddleName,
              department: editFieldForms.EditDepartment,
              user_category: editFieldForms.EditUser_Category,
              sections: editFieldForms.EditSection + ",all" ?? ",all",
            })
          );
          setToggleInfo(false);
        }
        if (request === 6) {
          dispatch(deactivate({ ID }));
          setToggleInfo(false);
        }
      })
      .catch((error) => setErrorMessage(error.response.data.message));
  };

  const [sectionArray, setSectionArray] = useState([]);
  useEffect(() => {
    setSectionArray([]);
    try {
      if (editFieldForms.position == 3 || position == 3) {
        const get_section = async () => {
          const sections = await axios.get(API_URL_ADMIN + "get-section");

          setSectionArray(
            sections.data
              .filter((filter) => filter.admin_sectionName != "all")
              .map((data) => {
                return {
                  value: data.admin_sectionName,
                  label: data.admin_sectionName,
                };
              })
          );
        };
        get_section();
      } else {
        const get_section = async () => {
          const sections = await axios.get(API_URL_ADMIN + "get-section");

          setSectionArray(
            sections.data
              .filter(
                (filter) =>
                  filter.admin_sectionDepartment ==
                    editFieldForms.EditDepartment &&
                  filter.admin_sectionDepartment != "all"
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
      }
    } catch (err) {
      console.log(err);
    }
  }, [editFieldForms]);

  return (
    <>
      <motion.div
        className={`absolute flex h-full w-full  left-0 shadow-gray-200 mt-15 shadow-md bg-gray-100 items-center dark:(bg-slate-900 text-white) <md:(w-full h-full rounded-none)`}
        initial={{
          scale: 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        animate={{
          scale: 1,
        }}
        exit={{ scale: 0 }}
      >
        <div className=" flex-[0.4] relative flex items-start  h-full overflow-x-hidden  justify-center">
          <AiOutlineCloseSquare
            onClick={() => setToggleInfo(false)}
            className="w-6.5 h-6.5 absolute top-1 right-1 cursor-pointer flex items-center justify-center mr-1 text-red-400 border-none active:scale-1 active:duration-75 transition-all ease-in-out hover:text-red-500 rounded-sm hover:rounded-sm"
          />
          {/* <button
            onClick={() => setToggleInfo(false)}
            className="w-18 h-8 absolute top-1 right-1 pr-2 flex items-center justify-center text-[80%]   mr-3 shadow-sm text-black   border border-black active:scale-1 active:duration-75 transition-all hover:scale-108 ease-in-out  transform py-1 rounded-sm hover:rounded-sm hover:border-black "
          >
            <BsArrowLeftShort className=" text-[20px] cursor-pointer text-black hover:(text-black ) <md:(text-[50px])" />
            Back
          </button> */}
          <div className="flex flex-col mt-8 items-center  justify-center w-[95%] mb-5">
            <div className="w-full items-center justify-center flex mb-3">
              <img src="/imgs/Nodata.jpg" className="h-35 w-35 rounded-full" />
            </div>

            <div className="user-reset-alignment flex mb-1">
              {editMode ? (
                <div className="flex">
                  <input
                    className="w-22 border-2 mr-1 border-green-700 rounded-md"
                    value={editFieldForms.EditLastName}
                    name="lastName"
                    onChange={(e) =>
                      setEditFieldForms({
                        ...editFieldForms,
                        EditLastName: e.target.value,
                      })
                    }
                  />
                  <input
                    className="w-25 border-2 mr-1 border-green-700 rounded-md"
                    value={editFieldForms.EditfirstName}
                    name="givenName"
                    onChange={(e) =>
                      setEditFieldForms({
                        ...editFieldForms,
                        EditfirstName: e.target.value,
                      })
                    }
                  />
                  <input
                    className="w-10 border-2 mr-1 border-green-700 rounded-md"
                    value={editFieldForms.EditMiddleName}
                    name="middleName"
                    onChange={(e) =>
                      setEditFieldForms({
                        ...editFieldForms,
                        EditMiddleName: e.target.value,
                      })
                    }
                  />
                </div>
              ) : (
                <p className="text-center w-full text-[20px]">
                  {firstName + " " + MiddleName + " " + LastName}
                </p>
              )}
            </div>

            <div className="text-center mb-2">
              <span
                className={`arial-narrow-bold text-[20px] ${
                  AccountStatus == "Inactive"
                    ? "text-gray-600"
                    : Suspension == 1
                    ? "text-red-600"
                    : status >= 5
                    ? "text-yellow-600"
                    : "text-green-700"
                }`}
              >
                {AccountStatus == "Inactive"
                  ? "DEACTIVATED"
                  : Suspension == 1
                  ? "SUSPENDED"
                  : status >= 5
                  ? "LOCKED"
                  : "ACTIVE"}
              </span>
            </div>

            <div className="flex  w-full text-black">
              <p className="inline-block w-[9rem] ">Employee #:</p>
              <p className="">{EmployeeNum}</p>
            </div>

            {/* ======================================================= EDIT MODE FULLNAME ======================================================= */}

            {/* ======================================================= EDIT MODE FULLNAME ======================================================= */}

            <div className="flex w-full text-black">
              <p className="inline-block w-[9rem]">Email:</p>

              <p className="">{email}</p>
            </div>
            <div className="flex w-full text-black">
              <p className="inline-block w-[9rem]">Company Name:</p>

              <p>{company}</p>
            </div>
            <div className="user-reset-alignment">
              <p className="user-reset-desc">Department:</p>

              {editMode ? (
                <select
                  className="w-60 border-2 border-green-700 rounded-md"
                  onChange={(e) =>
                    setEditFieldForms({
                      ...editFieldForms,
                      EditDepartment: e.target.value,
                    })
                  }
                >
                  <option selected hidden>
                    {department == "HR"
                      ? "Human Resources"
                      : department == "SALES"
                      ? "Sales"
                      : department == "OPS"
                      ? "Operation"
                      : department == "AMAD"
                      ? "Asset Management"
                      : department == "ACC"
                      ? "Accounting & Finance"
                      : department == "TA"
                      ? "Talent Acquisition"
                      : department == "BSD"
                      ? "Business Support"
                      : department == "TSD"
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
                <p className="user-reset-item">
                  {department == "HR"
                    ? "Human Resources"
                    : department == "SALES"
                    ? "Sales"
                    : department == "OPS"
                    ? "Operation"
                    : department == "AMAD"
                    ? "Asset Management"
                    : department == "ACC"
                    ? "Accounting & Finance"
                    : department == "TA"
                    ? "Talent Acquisition"
                    : department == "BSD"
                    ? "Business Support"
                    : department == "TSD"
                    ? "Technical Service"
                    : ""}
                </p>
              )}
            </div>
            <div className="user-reset-alignment">
              <p className="user-reset-desc">Role:</p>

              {editMode ? (
                <select
                  className="w-60 border-2 border-green-700 rounded-md"
                  value={editFieldForms.EditPosition}
                  onChange={(e) =>
                    setEditFieldForms({
                      ...editFieldForms,
                      EditPosition: e.target.value,
                    })
                  }
                >
                  <option disabled>Choose an option</option>
                  <option value="2">Admin</option>
                  <option value="3">Executive</option>
                  {/* <option value="4">Manager</option>
                  <option value="5">Supervisor</option>
                  <option value="6">Rank & File</option> */}
                </select>
              ) : (
                <p className="user-reset-item">
                  {position == 2
                    ? "Admin"
                    : position == 3
                    ? "Executive"
                    : position == 4
                    ? "Manager"
                    : position == 5
                    ? "Supervisor"
                    : position == 6
                    ? "Rank & File"
                    : ""}
                </p>
              )}
            </div>
            <div className="user-reset-alignment">
              <p className="user-reset-desc">System in PBMS:</p>

              {editMode ? (
                <Select
                  className="w-60 border-2 border-green-700 rounded-md"
                  onChange={(e) =>
                    setEditFieldForms({
                      ...editFieldForms,
                      EditSection: e.map((items) => items.value).toString(),
                    })
                  }
                  isMulti
                  options={sectionArray}
                />
              ) : (
                <p className="w-60 border border-gray-500 rounded-md break-words ">
                  {section.replace("all", "")}
                </p>
              )}
            </div>

            <div className="user-reset-alignment">
              <p className="user-reset-desc">Username:</p>

              <p className="user-reset-item">{username}</p>
            </div>

            <div className="flex flex-col ml-[27%]">
              <div className="flex text-black mt-2 w-full font-Roboto   ">
                <span className="inline-block w-[8rem]">User category:</span>

                {/* <select className="w-43 border border-gray-600 ml-2 flex">
                  <option disabled>Choose an option</option>
                  <option value="">Manager</option>
                  <option value="">Supervisor</option>
                  <option value="">Team Leader</option>
                  <option value="">Associate</option>
                </select> */}
                {editMode ? (
                  <select
                    className="w-29 border-2 border-green-700 rounded-md"
                    value={editFieldForms.EditUser_Category}
                    onChange={(e) =>
                      setEditFieldForms({
                        ...editFieldForms,
                        EditUser_Category: e.target.value,
                      })
                    }
                  >
                    <option disabled>Choose an option</option>
                    <option value="Supplier">Supplier</option>
                    <option value="Client">Client</option>
                    <option value="Employee">Employee</option>
                  </select>
                ) : (
                  <p className="w-25 border border-gray-700 rounded-md">
                    {user_category == "Supplier"
                      ? "Supplier"
                      : user_category == "Client"
                      ? "Client"
                      : user_category == "Employee"
                      ? "Employee"
                      : ""}
                  </p>
                )}
              </div>
            </div>

            <div className="flex w-[85%] justify-between mt-5 <md:(w-[90%] mt-10)">
              {editMode ? (
                <button
                  className="w-30 h-10 bg-blue-500 text-white mr-3 shadow-sm flex items-center justify-center  shadow-blue-800 hover:border-blue-500 border-0  disabled:(bg-gray-400 shadow-gray-800 cursor-not-allowed hover:bg-gray-500 hover:rounded-md) active:scale-1 active:duration-75 transition-all hover:scale-108 ease-in-out transform py-1 rounded-xl hover:bg-blue-500 hover:rounded-md"
                  onClick={SaveEdit}
                >
                  <RiSave2Fill className=" rounded-sm" />
                  Save
                </button>
              ) : (
                <button
                  className="w-30 h-10  flex items-center justify-center text-[80%]  bg-blue-500 mr-3 shadow-sm text-white shadow-blue-800 hover:border-blue-500 border-0 disabled:(bg-gray-400 shadow-gray-800 cursor-not-allowed hover:bg-gray-500 hover:rounded-md) active:scale-1 active:duration-75 transition-all hover:scale-108 ease-in-out transform py-1 rounded-xl hover:bg-blue-500 hover:rounded-md"
                  onClick={() => setEditMode(true)}
                >
                  <FaUserEdit className=" mr-1 text-[15px] " />
                  Edit
                </button>
              )}
              <button
                className="w-30 h-10 bg-yellow-500 mr-3 shadow-sm text-black text-[80%] flex items-center justify-center  shadow-yellow-800 hover:border-yellow-500 border-0  disabled:(bg-gray-400 shadow-gray-800 cursor-not-allowed hover:bg-gray-500 hover:rounded-md) active:scale-1 active:duration-75 transition-all hover:scale-108 ease-in-out transform py-1 rounded-xl hover:bg-yellow-500 hover:rounded-md"
                disabled={status >= 5 ? false : true}
                onClick={resetLockedUser}
              >
                <TiRefresh className=" mr-1 text-[20px] text-black" />
                Reset
              </button>
              {Suspension == 0 ? (
                <button
                  className="w-30 h-10 bg-red-500 mr-3 shadow-sm text-black text-[80%] flex items-center justify-center  shadow-red-800 hover:border-red-500 border-0  disabled:(bg-gray-400 shadow-red-800 cursor-not-allowed hover:bg-gray-500 hover:rounded-md) active:scale-1 active:duration-75 transition-all hover:scale-108 ease-in-out transform py-1 rounded-xl hover:bg-red-500 hover:rounded-md"
                  onClick={disableUser}
                >
                  <BsPersonFillLock className="mr-1 text-[15px] text-black" />
                  Suspend
                </button>
              ) : (
                <button
                  className="w-30 h-10 bg-green-500 mr-3 text-black text-[80%] shadow-sm flex items-center justify-center  shadow-green-800 hover:border-green-500 border-0  disabled:(bg-gray-400 shadow-gray-800 cursor-not-allowed hover:bg-gray-500 hover:rounded-md) active:scale-1 active:duration-75 transition-all hover:scale-108 ease-in-out transform py-1 rounded-xl hover:bg-green-500 hover:rounded-md"
                  onClick={UnsuspendUser}
                >
                  <FaUserCheck className="mr-1 text-[15px] text-black" />
                  <p className="text-[13px] text-black text-[80%]">Unsuspend</p>
                </button>
              )}

              {AccountStatus == "Active" ? (
                <button
                  className="w-30 h-10 bg-green-500 mr-3 text-black text-[80%] shadow-sm flex items-center justify-center  shadow-green-800 hover:border-green-500 border-0  disabled:(bg-gray-400 shadow-gray-800 cursor-not-allowed hover:bg-gray-500 hover:rounded-md) active:scale-1 active:duration-75 transition-all hover:scale-108 ease-in-out transform py-1 rounded-xl hover:bg-green-500 hover:rounded-md"
                  onClick={DeactivateUser}
                >
                  <BsPersonFillDash className="mr-1 text-[15px] text-black " />{" "}
                  Deactivate
                </button>
              ) : (
                <button
                  className="w-30 h-10 bg-green-500 mr-3 text-black text-[80%] shadow-sm flex items-center justify-center  shadow-green-800 hover:border-green-500 border-0  disabled:(bg-gray-400 shadow-gray-800 cursor-not-allowed hover:bg-gray-500 hover:rounded-md) active:scale-1 active:duration-75 transition-all hover:scale-108 ease-in-out transform py-1 rounded-xl hover:bg-green-500 hover:rounded-md"
                  onClick={ActivateUser}
                >
                  <FaUserCog className="mr-1 text-[15px] text-black" /> Activate
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex-[0.7] flex flex-col bg-gray-100 w-full h-full overflow-y-auto">
          <div className="w-full flex-col h-15 flex ">
            <span className="text-[20px] flex arial-narrow-bold py-2 px-2 text-black">
              User System Log History
            </span>
            <div className="flex ">
              <span className="mr-3">Filtered Date</span>
              <input
                type="date"
                className="border w-30 border-black h-6"
                placeholder="filter-date"
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full mt-3">
            <table className=" w-full text-left p-1 h-8  shadow-reds-300">
              <tr className="bg-color-prdc  shadow-md  w-full text-left ">
                <th className="text-left w-50 arial-narrow text-black  ">
                  Date
                </th>
                <th className="text-left  w-50 arial-narrow text-black">
                  Action
                </th>
                <th className="text-left w-50  arial-narrow text-black">
                  Details
                </th>
              </tr>
              {logs
                .filter((date) => date.createdAt.includes(selectedDate))
                .map((data) => {
                  return (
                    <tr className="w-full  border-b bg-bg-transparent border-b-black">
                      <td className="text-left arial-narrow   text-black">
                        {moment(data.createdAt).format("MMMM DD YYYY, hh:mm a")}
                      </td>
                      <td className="text-left   arial-narrow  text-black">
                        {data.Action}
                      </td>
                      <td className="text-left arial-narrow  text-black">
                        {data.Description}
                      </td>
                    </tr>
                  );
                })}
            </table>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {login && (
          <motion.div className="w-screen h-screen  z-90 absolute  fixed flex items-center justify-center bg-black/50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              exit={{ opacity: 0 }}
              className="w-80 h-55 bg-white relative shadow-md shadow-gray-500 rounded-md"
            >
              <div className="mt-10 w-full h-full flex flex-col items-center text-center">
                <AiFillCloseCircle
                  className=" absolute top-1 right-1 text-[20px] cursor-pointer text-red-600 hover:(text-red-400 ) <md:(text-[50px])"
                  onClick={() => setLogin(false)}
                />

                <FcLock className="text-[50px]" />
                <span className="text-black arial-narrow my-1 font-semibold dark:(text-white)">
                  For extra security you need to enter your password for
                  confirmation.
                </span>
                <form
                  className="w-full flex items-center justify-center"
                  onSubmit={extra_login}
                >
                  <input
                    className="w-[60%]  shadow-sm shadow-gray-900 border-t border-t-gray-400 rounded-md focus:(outline-none) dark:(border-none text-black)"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    className="flex items-center bg-green-600 ml-2 rounded-md hover:(outline-none )"
                    type="submit"
                  >
                    <BiRightArrowAlt className="text-[25px] text-white" />
                  </button>
                </form>
                {errorMessage && (
                  <span className="text-red-600 arial-narrow absolute bottom-1 font-semibold dark:(text-red-500)">
                    {errorMessage}
                  </span>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Resetuser;
