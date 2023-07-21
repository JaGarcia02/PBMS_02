import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiFillCloseSquare } from "react-icons/ai";
import { FcHighPriority, FcOk } from "react-icons/fc";
import uniqid from "uniqid";
import axios from "axios";
import Lottie from "lottie-react";
import Loading from "../../lottieFiles/spinner.json";
import { API_URL_ADMIN, API_URL_HR } from "../../utils/Url";
import { API_URL_USER } from "../../utils/Url";
import { useSelector } from "react-redux";
import { ImCross } from "react-icons/im";
import { BiSave } from "react-icons/bi";
import Select from "react-select";
import {
  acc_section,
  amad_section,
  bsd_section,
  hr_sections,
  ops_section,
  sales_section,
  ta_section,
  tsd_section,
} from "../../utils/OptArray";
import jwt from "jwt-decode";

const Adduser = ({ toggle, setToggle }) => {
  const { admin } = useSelector((state) => state.auth);
  let optionArray = [];
  let sectionArray = [];
  const [employeeInfo, setEmployeeInfo] = useState({
    Employee_ID: "",
    Email: "",
    CompanyName: "",
    Department: "",
    Role: "",
    Section: "",
    Username: "",
    Password: uniqid(),
  });

  const adminUser = jwt(admin);

  const [regData, setRegData] = useState(null);
  const [success, setSuccess] = useState(false);
  const [pbmsUser, setPbmsUser] = useState(false);

  useEffect(() => {
    axios
      .get(API_URL_HR + "get-activeemployee")
      .then((res) => {
        res.data
          .filter(
            (items) =>
              items.Employee_Position == "Executive" ||
              items.Employee_Position == "Manager"
          )
          .map((items) => {
            optionArray.push({
              value: items.Employee_ID,
              label: items.Employee_FirstName + " " + items.Employee_LastName,
            });
          });
      })
      .catch((err) => console.log(err));

    if (regData?.role == "2") {
      axios
        .get(API_URL_ADMIN + "get-section")
        .then((res) => {
          res.data
            .filter(
              (data) => data.admin_sectionDepartment == employeeInfo.Department
            )
            .map((items) => {
              sectionArray.push({
                value: items.admin_sectionName,
                label: items.admin_sectionName,
              });
            });
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get(API_URL_ADMIN + "get-section")
        .then((res) => {
          res.data
            .filter((filter) => filter.admin_sectionName != "all")
            .map((items) => {
              sectionArray.push({
                value: items.admin_sectionName,
                label:
                  items.admin_sectionName +
                  " - " +
                  items.admin_sectionDepartment,
              });
            });
        })
        .catch((err) => console.log(err));
    }
  }, [optionArray, employeeInfo, regData?.role]);

  const selectActiveEmployee = (items) => {
    axios
      .post(API_URL_ADMIN + "get-employee", { Employee_ID: items })
      .then((res) => {
        setEmployeeInfo({
          ...employeeInfo,
          Employee_ID: res.data.Employee_ID,
          Email: res.data.Employee_email,
          CompanyName: res.data.Employee_Company,
          Department: res.data.Employee_Department,
          Role: res.data.Employee_Position,
        });
        setRegData(res.data);
      })
      .catch((err) => console.log(err));
  };

  // function Modal_Error() {
  //   return (
  //     <motion.div className="fixed h-full w-full top-0 left-0 bg-black bg-opacity-80 flex items-center justify-center z-600 ">
  //       <motion.div
  //         initial={{ scale: 0, opacity: 0 }}
  //         animate={{ scale: 1, opacity: 1 }}
  //         transition={{ duration: 0.2, ease: "easeInOut" }}
  //         exit={{ scale: 0, opacity: 0 }}
  //         className="absolute h-50 flex w-80 z-50 rounded-md bg-white shadow-white shadow-sm flex-col items-center justify-center dark:(bg-slate-900 text-white)"
  //       >
  //         <FcHighPriority className="text-[80px] mb-4" />
  //         <span className="text-red-600 arial-narrow text-[18px] font-bold">
  //           {error}
  //         </span>
  //         <button
  //           className="w-15 mt-5 bg-black text-white hover:(bg-gray-800 border-gray-800) focus:(outline-none)"
  //           onClick={() => setError(null)}
  //         >
  //           OK
  //         </button>
  //       </motion.div>
  //     </motion.div>
  //   );
  // }

  const Modal_User_Created = () => {
    return (
      <motion.div className="fixed h-full w-full top-0 left-0  bg-black bg-opacity-80 flex items-center justify-center z-600 ">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          exit={{ scale: 0, opacity: 0 }}
          className="absolute h-50 flex w-80 z-50 rounded-md  shadow-white shadow-sm flex-col items-center justify-center dark:(bg-slate-900 text-white)"
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

  const Submit = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${admin}`,
      },
    };

    const data = {
      username: regData.username,
      password: regData.password,
      section: regData.section ?? ",all",
      employee_id: regData.Employee_ID,
      LastName: regData.Employee_LastName,
      firstName: regData.Employee_FirstName,
      company: regData.Employee_Company,
      branch: regData.Employee_CompBranch,
      MiddleName: regData.Employee_MiddleName,
      email: regData.Employee_email,
      department: regData.Employee_Department,
      role: regData.role,
      user_category: regData.user_category,
      change_password: 0,
    };

    axios
      .post(API_URL_USER + "create-user", data, config)
      .then((res) => {
        setSuccess(!success);
        setTimeout(() => {
          setSuccess(false);
          window.location.reload();
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>
        <AnimatePresence>
          {toggle && (
            <motion.div className="fixed h-full w-full top-0 left-0 bg-black bg-opacity-80 flex items-center justify-center z-600 ">
              <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                exit={{ x: "100%", opacity: 0 }}
                className="bg-gray-200 h-[540px] w-[39rem] rounded-md flex items-center justify-center absolute overflow-y-auto text-black dark:(bg-slate-900 text-white) <md:(h-full w-full right-0 bottom-0)"
              >
                <button
                  className="hover:(border-black rounded-sm) text-[15px] h-7 w-24 flex items-center justify-center absolute top-5 right-10 text-[11px] border-black active:scale-1 active:duration-75 transition-all hover:scale-108 ease-in-out  transform py-1 rounded-sm hover:rounded-sm text-black
                cursor-pointer "
                  onClick={() => {
                    setToggle(false);
                    setEmployeeInfo({
                      Employee_ID: "",
                      Email: "",
                      CompanyName: "",
                      Department: "",
                      Role: "",
                      Section: "",
                      Username: "",
                      Password: "",
                    });
                  }}
                >
                  <ImCross className="mr-2 h-2 text-black" /> Cancel
                </button>
                <form
                  className="flex h-[95%] w-full flex-col"
                  onSubmit={Submit}
                >
                  <span className="my-3 ml-2 font-Roboto text-[20px] arial-narrow-bold">
                    Add New Account
                  </span>

                  <div className="addUser-div">
                    <span className="addUser-span">Full name</span>

                    <Select
                      className="w-90 border-black border rounded-md"
                      options={optionArray}
                      onChange={(e) => selectActiveEmployee(e.value)}
                    />
                  </div>

                  <div className="addUser-div ">
                    <span className="addUser-span ">Employee ID number</span>
                    <input
                      className="addUser-input"
                      readOnly
                      value={employeeInfo.Employee_ID}
                    />
                  </div>
                  {/*<div className="addUser-div">
                  <span className="addUser-span">Division</span>

                  <input
                    className="addUser-input text-[13px]"
                    name="division"
                    value={division}
                     
                    required
                    placeholder="Division"
                  />
        </div>*/}
                  <div className="addUser-div">
                    <span className="addUser-span">Email</span>

                    <input
                      // className={`arial-narrow ${
                      //   error !== "Email already exist!"
                      //     ? "w-90 border h-7 border-black rounded-md bg-white focus:(outline-none) "
                      //     : "w-90 rounded-md h-7 border-red-600 border-2 dark:(bg-gray-600)"
                      // }`}
                      className="w-90 border h-7 border-black rounded-md bg-white focus:(outline-none)"
                      name="email"
                      type="email"
                      value={employeeInfo.Email}
                      required
                      placeholder="Email"
                    />
                  </div>

                  <div className="addUser-div">
                    <span className="addUser-span">Company Name</span>

                    <input
                      className="text-[13px] addUser-input"
                      name="companyname"
                      // value={}
                      //
                      // required
                      value={employeeInfo.CompanyName}
                      placeholder="Company Name"
                    />
                  </div>

                  <div className="addUser-div">
                    <span className="addUser-span">Module</span>
                    <input
                      type="checkbox"
                      className="mr-4"
                      onChange={(e) => setPbmsUser(e.target.checked)}
                    />
                    <p className="arial-narrow-bold ">PBMS</p>
                  </div>

                  <div className="addUser-div">
                    <span className="addUser-span">Department</span>

                    <input
                      className="addUser-input text-[13px]"
                      // name="department"
                      // required
                      // onChange={(e) =>
                      //   setRegData({ ...regData, department: e.target.value })
                      // }

                      value={
                        employeeInfo.Department == "HR"
                          ? "Human Resources"
                          : employeeInfo.Department == "SALES"
                          ? "Sales"
                          : employeeInfo.Department == "OPS"
                          ? "Operation"
                          : employeeInfo.Department == "AMAD"
                          ? "Asset Management"
                          : employeeInfo.Department == "ACC"
                          ? "Accounting & Finance"
                          : employeeInfo.Department == "TA"
                          ? "Talent Acquisition"
                          : employeeInfo.Department == "BSD"
                          ? "Business Support"
                          : employeeInfo.Department == "TSD"
                          ? "Technical Services"
                          : ""
                      }
                    >
                      {/* <option value="" disabled selected>
                        Choose a department
                      </option>

                      <option value="HR">Human Resources</option>
                      <option value="SALES">Sales</option>
                      <option value="OPS">Operations</option>
                      <option value="AMAD">Asset Management Admin</option>
                      <option value="ACC">Accounting & Finance</option>
                      <option value="TA">Talent Acquisition</option>
                      <option value="BSD">Business Support</option>
                      <option value="TSD">Technical Services</option> */}
                    </input>
                  </div>
                  {/* <div className="addUser-div">
                  <span className="addUser-span">Section</span>

                  <input
                    className="text-[13px] addUser-input"
                    name="section"
                    value={section}
                     
                    required
                    placeholder="Section"
                  />
                </div> */}

                  <div className="addUser-div">
                    <span className="addUser-span">User Category</span>

                    <select
                      className="addUser-input text-[13px]"
                      name="User Category"
                      required
                      onChange={(e) =>
                        setRegData({
                          ...regData,
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

                  <div className=" text-[13px] addUser-div">
                    <span className="addUser-span text-[15px] pt-2">Role</span>{" "}
                    <select
                      className="addUser-input"
                      name="role"
                      required
                      onChange={(e) =>
                        setRegData({ ...regData, role: e.target.value })
                      }
                    >
                      <option value="" selected hidden>
                        Choose an option
                      </option>

                      <option value="2">Admin</option>

                      <option value="3">Executive</option>
                      {/* <option value="4">Manager</option>
                      <option value="5">Supervisor</option>
                      <option value="6">Rank & File</option> */}
                    </select>
                  </div>

                  <div className="addUser-div">
                    <span className="addUser-span">System in PBMS</span>

                    <Select
                      placeholder={"Select Section"}
                      isDisabled={pbmsUser ? false : true}
                      options={sectionArray}
                      isMulti
                      onChange={(e) =>
                        setRegData({
                          ...regData,
                          section:
                            e.map((items) => items.value).toString() + ",all",
                        })
                      }
                      className={`w-90 border-black border rounded-md ${
                        pbmsUser ? "cursor-pointer" : "cursor-not-allowed"
                      }`}
                    />
                  </div>
                  <div className="addUser-div">
                    <span className="addUser-span">Username</span>
                    <input
                      className="addUser-input"
                      onChange={(e) =>
                        setRegData({ ...regData, username: e.target.value })
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
                        setRegData({ ...regData, password: e.target.value })
                      }
                    />
                  </div>

                  <div className="w-full relative flex items-center justify-end mt-4 ">
                    <button
                      className="border-green-500 active:scale-1 rounded-sm text-[14px] h-7 w-24 hover:(border-green-500 rounded-sm) active:duration-75 transition-all hover:(scale-108 ease-in-out  transform py-1 rounded-sm)  mb-5 flex items-center justify-center text-green-600   mr-12 disabled:(bg-gray-500 border-gray-500 cursor-not-allowed)  focus:(outline-none) dark:(bg-transparent border-green-500 border-2 text-green-500"
                      type="submit"
                    >
                      {/* {loading ? (
                      <Lottie
                        animationData={Loading}
                        loop={true}
                        className="w-20 h-10"
                      />
                    ) : (
                      <>
                        {" "}
                        <BiSave className="mr-2 text-green-600" /> <p>Save</p>
                      </>
                    )} */}{" "}
                      <BiSave className="mr-2 text-green-600" />
                      Save
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {success && <Modal_User_Created />}
    </>
  );
};

export default Adduser;
