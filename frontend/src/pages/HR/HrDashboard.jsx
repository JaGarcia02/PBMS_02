import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { API_URL_HR } from "../../utils/Url";
import { useSelector } from "react-redux";
import jwt from "jwt-decode";
import HrDashboardRecruitment from "../../components/Dashboards/HrDashboardRecuitment";
import HrDashboardEmployeeManagement from "../../components/Dashboards/HrDashboardEmployeeManagement";
const HrDashboard = () => {
  const { user } = useSelector((state) => state.user);
  const { sections } = useSelector((state) => state.sections);
  const decodedToken = jwt(user);
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  const splitSection = decodedToken.section.split(",");

  //DELETES THE USER WHEN THIS PAGE IS ACCESSED
  useEffect(() => {
    axios
      .delete(API_URL_HR + "delete-expire")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bg-gray-200 flex flex-col">
      <Navbar />
      <div className="mt-15 flex flex-col p-5 h-screen bg-gray-200 justify-center items-center">
        <div className="flex  flex-col">
          <div className="w-full mt-9 mb-3 flex w-[100%]">
            {splitSection.includes("Employee-Management") ? (
              <div className="flex justify-center items-center border-b-[2px] border-transparent duration-500 hover:(border-black) w-38 mr-5">
                <span
                  className="cursor-pointer arial-narrow"
                  onClick={() => toggleTab(4)}
                >
                  Employee Management
                </span>
              </div>
            ) : (
              ""
            )}
            {splitSection.includes("Compensation-Benefits") ? (
              <div className="flex justify-center items-center border-b-[2px] border-transparent duration-500 hover:(border-black) w-38 mr-5">
                <span
                  className=" cursor-pointer arial-narrow )"
                  onClick={() => toggleTab(1)}
                >
                  Compensation Benefits
                </span>
              </div>
            ) : (
              ""
            )}
            {splitSection.includes("hr-default") ? (
              <div className="flex justify-center items-center border-b-[2px] border-transparent duration-500 hover:(border-black) w-30 mr-5">
                <span
                  className="cursor-pointer  arial-narrow"
                  onClick={() => toggleTab(1)}
                >
                  Department Admin
                </span>
              </div>
            ) : (
              ""
            )}
            {splitSection.includes("Timekeeping") ? (
              <div className="flex justify-center items-center border-b-[2px] border-transparent duration-500 hover:(border-black) w-24 mr-5">
                <span
                  className=" cursor-pointer arial-narrow"
                  onClick={() => toggleTab(1)}
                >
                  TimeKeeping
                </span>
              </div>
            ) : (
              ""
            )}
            {splitSection.includes("Recruitment") ? (
              <div className="flex justify-center items-center border-b-[2px] border-transparent duration-500 hover:(border-black) w-20">
                <span
                  className="cursor-pointer arial-narrow"
                  onClick={() => toggleTab(1)}
                >
                  Placement
                </span>
              </div>
            ) : (
              ""
            )}
          </div>

          {toggleState == 1 ? (
            <HrDashboardRecruitment setToggleState={setToggleState} />
          ) : toggleState == 4 ? (
            <HrDashboardEmployeeManagement setToggleState={setToggleState} />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default HrDashboard;
