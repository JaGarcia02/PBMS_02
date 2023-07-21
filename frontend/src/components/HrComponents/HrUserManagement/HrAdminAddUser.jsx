import React, { useEffect, useState } from "react";
import { motion, MotionConfig, AnimatePresence } from "framer-motion";
import { AiFillCloseCircle, AiOutlineCloseSquare } from "react-icons/ai";
import { BiSave } from "react-icons/bi";
import axios from "axios";
import {
  API_URL,
  API_URL_ADMIN,
  API_URL_HR,
  API_URL_USER,
} from "../../../utils/Url";
import Select from "react-select";
import { useSelector } from "react-redux";
import { FcOk } from "react-icons/fc";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Logs } from "../../../utils/Logs";
import { useEdit, useAdd } from "../../../Hooks/useAuthorized";
import {
  BsPersonFillDash,
  BsPersonFillLock,
  BsArrowLeftShort,
} from "react-icons/bs";
import jwt from "jwt-decode";

const HrAdminAddUser = ({ setAddUser }) => {
  const { user } = useSelector((state) => state.user);
  const { branding } = useSelector((state) => state.branding);
  const [HrEmployees, setHrEmployees] = useState([]);
  const [employeeInfo, setEmployeeInfo] = useState({});
  const [pbms, setPbms] = useState(false);
  //SECTION ARRAY
  const [sectionArray, setSectionArray] = useState([]);
  //SUCCESS STATE
  const [success, setSuccess] = useState(false);

  const decoded = user ? jwt(user) : "";

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        setPbms(false);
        // document.body.style.overflow = "unset";
      }
    };
    window.addEventListener("keydown", close);

    return () => {
      window.removeEventListener("keydown", close);
    };
  }, []);

  useEffect(() => {
    //GET THE ACTIVE EMPLOYEE
    axios
      .get(API_URL_HR + "get-activeemployee")
      .then((res) => {
        setHrEmployees(
          res.data
            .filter(
              (filter) =>
                (filter.Employee_Position == "Manager" ||
                  filter.Employee_Position == "Supervisor" ||
                  filter.Employee_Position == "Team Leader" ||
                  filter.Employee_Position == "Rank and File") &&
                filter.Employee_Department === decoded.dept
            )
            .map((data) => {
              return {
                value: data.Employee_ID,
                label:
                  data.Employee_LastName +
                  ", " +
                  data.Employee_FirstName +
                  " " +
                  data.Employee_MiddleName,
              };
            })
        );
      })
      .catch((err) => console.log(err));

    //GET SECTIONS
    axios.get(API_URL_ADMIN + "get-section").then((res) => {
      setSectionArray(
        res.data
          .filter(
            (filter) =>
              filter.admin_sectionName != "all" &&
              filter.admin_sectionDepartment == decoded.dept
          )
          .map((items) => {
            return {
              value: items.admin_sectionName,
              label:
                items.admin_sectionName + " - " + items.admin_sectionDepartment,
            };
          })
      );
    });
  }, [employeeInfo]);

  //WHEN SELECTING AN EMPLOYEE IN SELECT FOR EMPLOYEE NAME
  const selectActiveHrEmployee = (ID) => {
    axios
      .post(API_URL_ADMIN + "get-employee", { Employee_ID: ID })
      .then((res) => {
        setEmployeeInfo({
          ...employeeInfo,
          employee_id: res.data.Employee_ID,
          email: res.data.Employee_email,
          company: res.data.Employee_Company,
          department: res.data.Employee_Department,
          Role: res.data.Employee_Position,
          branch: res.data.CompBranch,
          LastName: res.data.Employee_LastName,
          firstName: res.data.Employee_FirstName,
          MiddleName: res.data.Employee_MiddleName,
          Employee_JobDesc: res.data.Employee_JobDesc,
          change_password: 1,
        });
      })
      .catch((err) => console.log(err));
  };

  //MODAL
  const Modal_User_Created = () => {
    return (
      <motion.div className="fixed h-full w-full !top-0 !left-0 bg-black bg-opacity-80 flex items-center justify-center z-600 ">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          exit={{ scale: 0, opacity: 0 }}
          className="absolute h-50 flex w-80 z-50 rounded-md bg-white shadow-white shadow-sm flex-col items-center justify-center dark:(bg-slate-900 text-white)"
        >
          <FcOk className="text-[80px] mb-4" />
          <span className="text-green-600 arial-narrow text-[18px] font-bold">
            User created successfully!
          </span>
          <button
            className="w-15 mt-5 bg-black text-white hover:(bg-gray-800 border-gray-800) focus:(outline-none)"
            onClick={() => window.location.reload()}
          >
            OK
          </button>
        </motion.div>
      </motion.div>
    );
  };

  //REGISTER USER IN DATABASE FUNCTION
  const Register_New_User = (e) => {
    e.preventDefault();
    Logs(
      "ADD",
      `Register new user ${
        employeeInfo.LastName +
        " " +
        employeeInfo.firstName +
        " " +
        employeeInfo.MiddleName
      }`
    );
    const config = {
      headers: {
        Authorization: `Bearer ${user}`,
      },
    };
    axios
      .post(API_URL_USER + "create-user", employeeInfo, config)
      .then((res) => {
        Logs(
          "ADD",
          `Register new Account ${
            employeeInfo.firstName + " " + employeeInfo.LastName
          }`
        );
        setSuccess(!success);
        setTimeout(() => {
          setSuccess(false);
          window.location.reload();
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err.response.data.message + " " + err.response.request.status,
          {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
      });
  };

  const customControlStyles = (base) => ({
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    fontSize: 12,
    overflow: "auto",
  });

  return (
    <>
      <motion.div
        className="w-full h-full absolute bg-black/50 items-center flex justify-center !top-0 !left-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        exit={{ opacity: 0 }}
      >
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <motion.div className="bg-gray-200 h-96 w-[50rem] items-center shadow-md shadow-gray-900  z-500">
          <div className="w-full h-full relative flex flex-col item-center mb-5 ">
            <AiOutlineCloseSquare
              onClick={() => setAddUser(false)}
              className="cursor-pointer text-white absolute top-0 right-3 h-10 text-[3vh] z-100 text-[80%] flex items-center justify-center    border-0   active:scale-1 active:duration-75 transition-all hover:scale-150 ease-in-out transform  rounded-md  hover:rounded-md"
            />
            <div className="absolute h-20 prdc-color top-0 left-0 w-full z-99 flex px-5">
              <img
                src={API_URL + branding[0].Logo}
                className=" h-19 object-cover self-center"
              />
              <p className="text-white uppercase arial-narrow-bold text-[28px] self-center ml-4">
                {decoded.dept == "HR"
                  ? "Human Resources"
                  : decoded.dept == "SALES"
                  ? "Sales"
                  : decoded.dept == "OPS"
                  ? "Operation"
                  : decoded.dept == "AMAD"
                  ? "Asset Management"
                  : decoded.dept == "ACC"
                  ? "Accounting & Finance"
                  : decoded.dept == "TA"
                  ? "Talent Acquisition"
                  : decoded.dept == "BSD"
                  ? "Business Support"
                  : decoded.dept == "TSD"
                  ? "Technical Services"
                  : ""}{" "}
                DEPARTMENT
                <br />
                USER MANAGEMENT
              </p>
            </div>
            <form
              className="flex h-[95%] w-full pt-25 px-10 overflow-auto"
              onSubmit={Register_New_User}
            >
              <div className="flex-1 flex flex-col">
                <div className="addUser-div items-center">
                  <span className="addUser-span">Full name</span>
                  <Select
                    className="w-45 border-black border  "
                    options={HrEmployees}
                    onChange={(e) => selectActiveHrEmployee(e.value)}
                    styles={{ control: customControlStyles }}
                  />
                </div>
                <div className="addUser-div ">
                  <span className="addUser-span ">Employee ID number</span>
                  <input
                    className="addUser-input"
                    value={employeeInfo.employee_id}
                    readOnly
                  />
                </div>
                <div className="addUser-div">
                  <span className="addUser-span">Email</span>

                  <input
                    className="w-45 border h-5 border-black  bg-white focus:(outline-none)"
                    name="email"
                    type="email"
                    required
                    placeholder="Email"
                    value={employeeInfo.email}
                    read-only
                  />
                </div>
                <div className="addUser-div">
                  <span className="addUser-span">Company Name</span>

                  <input
                    className="text-[13px] addUser-input"
                    name="companyname"
                    placeholder="Company Name"
                    read-only
                    value={employeeInfo.company}
                  />
                </div>

                <div className="text-[13px] addUser-div">
                  <span className="addUser-span text-[15px] ">
                    Position Level
                  </span>{" "}
                  <select
                    className="addUser-input"
                    name="role"
                    onChange={(e) =>
                      setEmployeeInfo({ ...employeeInfo, role: e.target.value })
                    }
                    required
                  >
                    <option value="" selected hidden>
                      Choose an option
                    </option>

                    <option value="4">Manager</option>
                    <option value="5">Supervisor</option>
                    <option value="6">Rank and File</option>
                  </select>
                </div>

                <div className="addUser-div">
                  <span className="addUser-span">Position Title</span>

                  <input
                    className="text-[13px] addUser-input"
                    name="companyname"
                    placeholder="Company Name"
                    read-only
                    value={employeeInfo.Employee_JobDesc}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="addUser-div">
                  <span className="addUser-span">Department</span>
                  <input
                    className="addUser-input text-[13px]"
                    value={
                      employeeInfo.department == "HR"
                        ? "Human Resources"
                        : employeeInfo.department == "SALES"
                        ? "Sales"
                        : employeeInfo.department == "OPS"
                        ? "Operation"
                        : employeeInfo.department == "AMAD"
                        ? "Asset Management"
                        : employeeInfo.department == "ACC"
                        ? "Accounting & Finance"
                        : employeeInfo.department == "TA"
                        ? "Talent Acquisition"
                        : employeeInfo.department == "BSD"
                        ? "Business Support"
                        : employeeInfo.department == "TSD"
                        ? "Technical Services"
                        : ""
                    }
                  />
                </div>

                <div className="addUser-div">
                  <span className="addUser-span">User Category</span>

                  <select
                    className="addUser-input text-[13px]"
                    name="User Category"
                    required
                    onChange={(e) =>
                      setEmployeeInfo({
                        ...employeeInfo,
                        user_category: e.target.value,
                      })
                    }
                  >
                    <option value="" hidden selected>
                      Choose a User Category
                    </option>
                    <option value="Supplier">Supplier</option>
                    <option value="Client">Client</option>
                    <option value="Employee">Employee</option>
                  </select>
                </div>

                <div className="addUser-div items-center">
                  <span className="addUser-span">Module</span>
                  <input
                    type="checkbox"
                    className="mr-4 h-6 w-6"
                    onChange={(e) => setPbms(e.target.checked)}
                  />
                  <p className="arial-narrow-bold text-black">PBMS</p>
                </div>
                <div className="addUser-div items-center">
                  <span className="addUser-span">System in PBMS</span>

                  <Select
                    placeholder={"Select Section"}
                    isMulti
                    styles={{ control: customControlStyles }}
                    isDisabled={pbms ? false : true}
                    className={`w-45 border-black border   ${
                      pbms ? "cursor-pointer" : "cursor-not-allowed"
                    } `}
                    options={sectionArray}
                    onChange={(e) =>
                      setEmployeeInfo({
                        ...employeeInfo,
                        section:
                          e.map((items) => items.value).toString() + ",all",
                      })
                    }
                  />
                </div>
                <div className="addUser-div">
                  <span className="addUser-span">Username</span>
                  <input
                    className="addUser-input"
                    onChange={(e) =>
                      setEmployeeInfo({
                        ...employeeInfo,
                        username: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="addUser-div">
                  <span className="addUser-span">Password</span>

                  <input
                    className="addUser-input"
                    name="password"
                    type="password"
                    required
                    placeholder="Password"
                    onChange={(e) =>
                      setEmployeeInfo({
                        ...employeeInfo,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="w-full flex items-center justify-end mt-10 ">
                  {/* <button
                  type="submit"
                  className=" hover:(bg-gray-400 border-gray-300 ) text-[15px] mb-5 flex items-center justify-center text-green-600   shadow-gray-600 mt-2 w-20 h-6 mr-12 disabled:(bg-gray-500 border-gray-500 cursor-not-allowed)  focus:(outline-none) dark:(bg-transparent border-green-500 border-2 text-green-500 hover:bg-green-700 hover:text-black)"
                >
                  <BiSave className="mr-2 text-green-600" />
                  Save
                </button> */}
                  <button
                    className="arial-narrow-bold text-[20px] border-black active:scale-1 rounded-sm text-[16px] h-6 w-20 hover:(border-black) active:duration-75 transition-all hover:(scale-108 ease-in-out  transform py-1 rounded-sm)  mb-5 flex items-center justify-center text-black    disabled:(cursor-not-allowed) focus:(outline-none) "
                    type="submit"
                    disabled={useAdd() ? false : true}
                  >
                    <BiSave className="mr-2 " />
                    Save
                  </button>
                </div>
              </div>
            </form>
            <hr className="w-full h-3 absolute bottom-0 left-0 prdc-color" />
          </div>
        </motion.div>
        <AnimatePresence>{success && <Modal_User_Created />}</AnimatePresence>
      </motion.div>
    </>
  );
};

export default HrAdminAddUser;
