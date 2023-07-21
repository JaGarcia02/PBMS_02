import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { API_URL_HR } from "../../utils/Url";
import { useSelector } from "react-redux";
import jwt from "jwt-decode";
import HrDashboardRecruitment from "../../components/Dashboards/HrDashboardRecuitment";
const HrDashboard = () => {
  const { user } = useSelector((state) => state.user);
  const { sections } = useSelector((state) => state.sections);
  const decodedToken = jwt(user);
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
        <div className="flex flex-col">
          <div className="w-full flex arial-narrow mt-9 mb-3">
            <span className="mr-12 cursor-pointer text-[18px] hover:(underline-black underline)">
              Recruitment
            </span>
            <span className="mr-12 cursor-pointer text-[18px] hover:(underline-black underline)">
              Compensation Benefits
            </span>
            <span className="mr-12 cursor-pointer text-[18px] hover:(underline-black underline)">
              Timekeeping
            </span>
            <span className="mr-12 cursor-pointer text-[18px] hover:(underline-black underline)">
              Employee Management
            </span>
            <span className="mr-12 cursor-pointer text-[18px] hover:(underline-black underline)">
              Department Admin
            </span>
          </div>
          <HrDashboardRecruitment />
        </div>
      </div>
    </div>
  );
};

export default HrDashboard;
