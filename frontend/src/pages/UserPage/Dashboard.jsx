import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import useLocalStorage from "../../Hooks/useLocalStorage";
import jwt from "jwt-decode";
import { useDispatch } from "react-redux";
import { getSection } from "../../features/sections/sectionSlice";
import { Link } from "react-router-dom";
import DashbordModalPassword from "./DashbordModalPassword";
import ToDoList from "./ToDoList";
import HrDashboardRecruitment from "../../components/Dashboards/HrDashboardRecuitment";

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const decodedToken = jwt(user);
  const [clickPBMS, setClickPBMS] = useState(false);

  const [showMyModal, setShowMyModal] = useState(true); // modal change passowd

  const handleOnClose = () => {
    setShowMyModal(false);
  };

  let [value, setValue] = useLocalStorage("theme", localStorage.theme);
  const lightTheme = "light";
  const darkTheme = "dark";
  const body = document.body;

  const hasAccessPbms = decodedToken.section.split(",");

  useEffect(() => {
    if (value == darkTheme) {
      body.classList.replace(lightTheme, darkTheme);
      setValue("dark");
      value = darkTheme;
    } else {
      body.classList.replace(darkTheme, lightTheme);
      setValue("light");
      value = lightTheme;
    }
  }, []);

  return (
    <div className="flex flex-col bg-gray-200 h-screen">
      <Navbar />

      <div className="h-15 flex  w-full" />
      {clickPBMS ? (
        ""
      ) : (
        <div className="flex items-center justify-evenly h-full w-full bg-gray-200 dark:(bg-gray-900) <md:(flex-col )">
          <Link to="/mywork">
            <div className="h-60 w-60 flex flex-col items-center justify-center bg-red-500 rounded-xl group cursor-pointer relative <md:(h-40 w-40)">
              <img
                src="/imgs/briefcase-transparent.png"
                className="flex object-contain h-50 w-50 opacity-50 absolute transition-all duration-400 visible group-hover:(invisible opacity-0)"
              />
              <img
                src="/imgs/briefcase.png"
                className="object-contain h-50 w-50 absolute transition-all duration-400 invisible opacity-0 group-hover:(visible opacity-100)"
              />
              <span className="absolute bottom-3 font-Roboto font-bold text-[20px] transition-all opacity-0 invisible duration-400 group-hover:(visible opacity-100 text-black) <md:(text-[12px])">
                MY WORK
              </span>
            </div>
          </Link>

          <Link
            to={decodedToken.dept == "HR" ? "/hr-dashboard" : ""}
            reloadDocument
          >
            <div
              className={`h-60 w-60 flex flex-col items-center cursor-pointer justify-center rounded-xl ${
                hasAccessPbms.some((e) => e == "")
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-yellow-400"
              } group relative <md:(h-40 w-40)`}
            >
              <img
                src="/imgs/FINAL-PRDC-LOGO-2021.png"
                className={`object-contain h-50 w-50 p-5 rounded-2xl  gray-scale-image transition-all duration-300 opacity-50 group-hover:(${
                  hasAccessPbms.some((e) => e == "")
                    ? ""
                    : "filter-none opacity-100"
                })`}
              />
              <span className="absolute bottom-3 font-Roboto font-bold text-[20px] transition-all opacity-0 invisible duration-400 group-hover:(visible opacity-100) <md:(text-[12px])">
                PBMS
              </span>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
