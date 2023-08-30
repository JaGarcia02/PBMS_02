import React, { useState } from "react";
import { useSelector } from "react-redux";
import HrUserManagement from "../../components/HrComponents/HrUserManagement";
import Navbar from "../../components/Navbar";
import HrRequest from "../../components/HrComponents/HrRequest";
import HrResetUser from "../../components/HrComponents/HrUserManagement/HrResetUser";
import Forms from "../../components/AdminDeptComponents/Forms";
import HrMandatoryDeductions from "../../components/HrComponents/HrMandatoryDeductions";
import HrEmploymentType from "../../components/HrComponents/HrEmploymentType";
import { IoMdArrowDropdown } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import HrSchedule from "../../components/HrComponents/HrSchedule";
import HrEmploymentStatus from "../../components/HrComponents/HrEmploymentStatus";

const Hr_DepartmentAdmin = () => {
  const [toggleState, setToggleState] = useState(1);
  const [reset, setReset] = useState(false);

  //stay
  const div = "prdc-colors  hover:text-white";
  const div_active =
    div + "w-full cursor-pointer pl-5 prdc-color text-white  hover:text-white";
  const div_deactive = div + "w-full cursor-pointer pl-5 hover:text-white";
  //end
  const [userObj, setUserObj] = useState(null);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  const [Defaults, setDefaults] = useState(true);
  const [Maintenance, setMaintenance] = useState(false);

  return (
    <div className="w-screen h-screen flex relative overflow-y-auto overflow-x-hidden">
      <Navbar />
      <div className="w-full h-full  mt-15">
        <div className="w-full h-full  flex ">
          <div className="flex-[0.2]  border-l border border-t-0 border-b-0 border-gray-500  border-2px flex-col  flex h-full arial-narrow ">
            <span className=" text-[20px] text-center mt-5  text-black arial-narrow-bold">
              Human Resources
            </span>
            <span className=" text-[18px] text-center mb-5  text-black arial-narrow-bold">
              Admin Settings
            </span>
            <div
              className="text-gray-400 pl-5  cursor-pointer items-center flex justify-between mr-6"
              onClick={() => setDefaults(!Defaults)}
            >
              <p>Default</p>{" "}
              <IoMdArrowDropdown
                className={`mr-1 text-[20px] text-black cursor-pointer transition-all transform duration-300 ${
                  Defaults ? "rotate-180" : ""
                } `}
                onClick={() => setDefaults(!Defaults)}
              />
            </div>
            <AnimatePresence>
              {Defaults && (
                <motion.div className="ml-3">
                  <div
                    onClick={() => toggleTab(1)}
                    className={toggleState === 1 ? div_active : div_deactive}
                  >
                    Employment Type
                  </div>
                  <div
                    onClick={() => toggleTab(2)}
                    className={toggleState === 2 ? div_active : div_deactive}
                  >
                    Employee Schedule
                  </div>
                  <div
                    onClick={() => toggleTab(3)}
                    className={toggleState === 3 ? div_active : div_deactive}
                  >
                    Employment Status
                  </div>
                  <div
                    onClick={() => toggleTab(4)}
                    className={toggleState === 4 ? div_active : div_deactive}
                  >
                    Personnel Request
                  </div>
                  <div
                    onClick={() => toggleTab(6)}
                    className={toggleState === 6 ? div_active : div_deactive}
                  >
                    User Management
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {/* Maintenance */}
            <div
              className="text-gray-400 pl-5 cursor-pointer  items-center flex justify-between mr-6"
              onClick={() => setMaintenance(!Maintenance)}
            >
              <p>Maintenance</p>{" "}
              <IoMdArrowDropdown
                className={`mr-1 text-[20px] text-black cursor-pointer transition-all transform duration-300 ${
                  Maintenance ? "rotate-180" : ""
                } `}
                onClick={() => setMaintenance(!Maintenance)}
              />
            </div>
            {Maintenance && (
              <div className="ml-3">
                <div
                  onClick={() => toggleTab(5)}
                  className={toggleState === 5 ? div_active : div_deactive}
                >
                  Mandatory Deductions
                </div>
              </div>
            )}
            {/* Maintenance */}
          </div>

          {/* Tabs */}
          <div className="flex-[0.9] bg-gray-100 -h-screen ">
            {toggleState == 1 ? (
              <HrEmploymentType />
            ) : toggleState == 2 ? (
              <HrSchedule />
            ) : toggleState == 3 ? (
              <HrEmploymentStatus />
            ) : toggleState == 4 ? (
              <HrRequest />
            ) : toggleState == 5 ? (
              <HrMandatoryDeductions />
            ) : toggleState == 6 ? (
              <HrUserManagement
                setReset={setReset}
                reset={reset}
                setUserObj={setUserObj}
                userObj={userObj}
              />
            ) : (
              ""
            )}
          </div>
          {/* Tabs */}
        </div>
        {reset && (
          <HrResetUser
            setReset={setReset}
            userObj={userObj}
            setUserObj={setUserObj}
          />
        )}
      </div>
    </div>
  );
};

export default Hr_DepartmentAdmin;
