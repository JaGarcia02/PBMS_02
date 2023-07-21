import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import jwt from "jwt-decode";

const Menu = () => {
  const { user } = useSelector((state) => state.user);
  const [dept, setDept] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const admin = jwt(user);
    setDept(admin?.dept);
    setRole(admin?.role);
  }, []);

  const menuItems = [
    {
      id: 1,
      dept: "Human Resources",
      style: ` ${
        role <= 6 && dept == "HR"
          ? "bg-red-500 text-white h-35 w-55 flex items-center justify-center rounded-md flex-col shadow-md shadow-gray-700 transition-all duration-300 cursor-pointer transform group hover:(bg-red-300) <md:(h-8 w-65 items-center flex-row justify-between px-4)"
          : "gray-scale-image bg-gray-500 text-white h-35 w-55 flex items-center justify-center rounded-md flex flex-col shadow-md shadow-gray-700 cursor-not-allowed <md:(h-8 w-65 items-center flex-row justify-between px-4)"
      }`,
      icon: "/icons2/HR.png",
      link: `${role <= 6 && dept == "HR" ? "/hr-dashboard" : "#"}`,
    },
    {
      id: 2,
      dept: "Operations",
      style: `${
        role <= 6 && dept == "OPS"
          ? "bg-yellow-400 text-black h-35 w-55 flex items-center justify-center rounded-md flex flex-col shadow-md shadow-gray-700 transition-all duration-300 cursor-pointer transform group hover:(bg-yellow-300) <md:(h-8 w-65 items-center flex-row justify-between px-4)"
          : "gray-scale-image bg-gray-500 text-white h-35 w-55 flex items-center justify-center rounded-md flex flex-col shadow-md shadow-gray-700 cursor-not-allowed <md:(h-8 w-65 items-center flex-row justify-between px-4)"
      }`,
      icon: "/icons2/OPS.png",
      link: `${role <= 6 && dept == "OPS" ? "/ops-dashboard" : "#"}`,
    },
    {
      id: 3,
      dept: "Asset Management Admin ",
      style: `${
        role <= 6 && dept == "AMAD"
          ? "bg-green-400 text-black h-35 w-55 flex items-center justify-center rounded-md flex flex-col shadow-md shadow-gray-700 transition-all duration-300 cursor-pointer transform group hover:(bg-green-300) <md:(h-8 w-65 items-center flex-row justify-between px-4)"
          : "gray-scale-image bg-gray-500 text-white h-35 w-55 flex items-center justify-center rounded-md flex flex-col shadow-md shadow-gray-700 cursor-not-allowed <md:(h-8 w-65 items-center flex-row justify-between px-4)"
      }`,
      icon: "/icons2/AMAD.png",
      link: `${role <= 6 && dept == "AMAD" ? "/amad-dashboard" : "#"}`,
    },
    {
      id: 4,
      dept: "Accounting",
      style: `${
        role <= 6 && dept == "ACC"
          ? "bg-blue-400 text-black h-35 w-55 flex items-center justify-center rounded-md flex flex-col shadow-md shadow-gray-700 transition-all duration-300 cursor-pointer transform group hover:(bg-blue-300) <md:(h-8 w-65 items-center flex-row justify-between px-4)"
          : "gray-scale-image bg-gray-500 text-white h-35 w-55 flex items-center justify-center rounded-md flex flex-col shadow-md shadow-gray-700 cursor-not-allowed <md:(h-8 w-65 items-center flex-row justify-between px-4)"
      }`,
      icon: "/icons2/ACC.png",
      link: `${role <= 6 && dept == "ACC" ? "/acc-dashboard" : "#"}`,
    },
    {
      id: 5,
      dept: "Administrator",
      style: `${
        role === 0
          ? "bg-purple-500 text-white h-35 w-55 flex items-center justify-center rounded-md flex flex-col shadow-md shadow-gray-700 transition-all duration-300 cursor-pointer transform group hover:(bg-purple-300) <md:(h-8 w-65 items-center flex-row justify-between px-4)"
          : "gray-scale-image bg-gray-500 text-white h-35 w-55 flex items-center justify-center rounded-md flex flex-col shadow-md shadow-gray-700 cursor-not-allowed <md:(h-8 w-65 items-center flex-row justify-between px-4)"
      }`,
      icon: "/icons2/ADMIN.png",
      link: `${role === 0 ? "/hr-dashboard" : "#"}`,
    },
    {
      id: 6,
      dept: "Talent Acquisition",
      style: `${
        role <= 6 && dept == "TA"
          ? "bg-amber-700 text-white h-35 w-55 flex items-center justify-center rounded-md flex flex-col shadow-md shadow-gray-700 transition-all duration-300 cursor-pointer transform group hover:(bg-amber-300) <md:(h-8 w-65 items-center flex-row justify-between px-4)"
          : "gray-scale-image bg-gray-500 text-white h-35 w-55 flex items-center justify-center rounded-md flex flex-col shadow-md shadow-gray-700 cursor-not-allowed <md:(h-8 w-65 items-center flex-row justify-between px-4)"
      }`,
      icon: "/icons2/TA.png",
      link: `${role <= 6 && dept == "TA" ? "/ta-dashboard" : "#"}`,
    },
    {
      id: 7,
      dept: "Technical Services",
      style: `${
        role <= 6 && dept == "TSD"
          ? "bg-gray-700 text-white h-35 w-55 flex items-center justify-center rounded-md flex flex-col shadow-md shadow-gray-700 transition-all duration-300 cursor-pointer transform group hover:(bg-gray-300) <md:(h-8 w-65 items-center flex-row justify-between px-4)"
          : "gray-scale-image bg-gray-500 text-white h-35 w-55 flex items-center justify-center rounded-md flex flex-col shadow-md shadow-gray-700 cursor-not-allowed <md:(h-8 w-65 items-center flex-row justify-between px-4)"
      }`,
      icon: "/icons2/TSD.png",
      link: `${role <= 6 && dept == "TSD" ? "/tsd-dashboard" : "#"}`,
    },
    {
      id: 8,
      dept: "Business Support",
      style: `${
        role <= 6 && dept == "BSD"
          ? "bg-green-900 text-white h-35 w-55 flex items-center justify-center rounded-md flex flex-col shadow-md shadow-gray-700 transition-all duration-300 cursor-pointer transform group hover:(bg-green-300) <md:(h-8 w-65 items-center flex-row justify-between px-4)"
          : "gray-scale-image bg-gray-500 text-white h-35 w-55 flex items-center justify-center rounded-md flex flex-col shadow-md shadow-gray-700 cursor-not-allowed <md:(h-8 w-65 items-center flex-row justify-between px-4)"
      }`,
      icon: "/icons2/BSD.png",
      link: `${role <= 6 && dept == "BSD" ? "/bsd-dashboard" : "#"}`,
    },
    {
      id: 9,
      dept: "Sales",
      style: `${
        role <= 6 && dept == "SALES"
          ? "bg-blue-900 text-white h-35 w-55 flex items-center justify-center rounded-md flex flex-col shadow-md shadow-gray-700 transition-all duration-300 cursor-pointer transform group hover:(bg-blue-300) <md:(h-8 w-65 items-center flex-row justify-between px-4)"
          : "gray-scale-image bg-gray-500 text-white h-35 w-55 flex items-center justify-center rounded-md flex flex-col shadow-md shadow-gray-700 cursor-not-allowed <md:(h-8 w-65 items-center flex-row justify-between px-4)"
      }`,
      icon: "/icons2/SALES.png",
      link: `${role <= 6 && dept == "SALES" ? "/sales-dashboard" : "#"}`,
    },
  ];

  return (
    <div className="flex flex-col bg-white h-screen dark:(bg-stone-900)">
      <Navbar />
      <div className="h-15 flex w-full" />
      <div className="h-screen w-screen flex items-center justify-center ">
        <div className="grid grid-cols-3 gap-4 text-center relative <md:(flex flex-col)">
          {menuItems.map((items, i) => (
            <a className="arial-narrow" href={items.link} key={items.id}>
              <motion.div
                className={items.style}
                initial={{
                  opacity: 0,
                  translateX: i % 2 === 0 ? -50 : 50,
                  translateY: -50,
                  //scale: 0,
                }}
                animate={{
                  opacity: 1,
                  translateX: 0,
                  translateY: 0,
                  //scale: 1,
                }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <img
                  src={items?.icon}
                  className="flex flex-col h-20 transition-all duration-300 pointer-events-none group-hover:(h-30) <md:(h-7 group-hover:h-7)"
                />
                <span className="transition-all duration-300 group-hover:(hidden) <md:( transition-all duration-300 group-hover:flex group-hover:mr-8)">
                  {items.dept}
                </span>
              </motion.div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
