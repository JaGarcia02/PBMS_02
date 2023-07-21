import React, { useEffect } from "react";
import { useState } from "react";
import AdminAuthRole from "../../components/AdminComponents/AdminAuthRole";
import AdminBUS from "../../components/AdminComponents/AdminBUS";
import AdminCurrency from "../../components/AdminComponents/AdminCurrency";
import AdminDefaultUsers from "../../components/AdminComponents/AdminDefaultUsers";
import AdminDT from "../../components/AdminComponents/AdminDT";
import AdminLanguage from "../../components/AdminComponents/AdminLanguage";
import AdminOwner from "../../components/AdminComponents/AdminOwner";
import AdminRegion from "../../components/AdminComponents/AdminRegion";
import AdminSidebar from "../../components/AdminComponents/AdminSidebar";
import { useSelector } from "react-redux";
import jwt from "jwt-decode";
import AdminCreate from "../../components/AdminComponents/AdminCreate";
import axios from "axios";
import { API_URL_ADMIN } from "../../utils/Url";
import AdminForms from "../../components/AdminComponents/AdminForms";
import AdminSuperAdminAccount from "../../components/AdminComponents/AdminSuperAdminAccount";

const AdminSettings = () => {
  const [toggleState, setToggleState] = useState(1);
  const { admin } = useSelector((state) => state.auth);
  const adminDecode = jwt(admin);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="w-screen h-screen  flex flex-col ">
      <AdminSidebar />
      <div className="w-full mt-15" />
      <span className="mt-5 text-[20px] my-5 ml-6 text-black arial-narrow-bold">
        ADMINISTRATION
      </span>
      <div className="flex w-full h-full">
        <div className="flex-[0.2]   flex-col mt-4 flex h-full arial-narrow">
          <div className="text-gray-400 pl-5 ">Default</div>
          <div
            onClick={() => toggleTab(1)}
            className=" w-full cursor-pointer pl-10  focus:(bg-yellow-300)  hover:(bg-yellow-300 )"
          >
            Date & Time
          </div>
          <div
            onClick={() => toggleTab(2)}
            className="w-full cursor-pointer pl-10 active:(bg-yellow-300) hover:(bg-yellow-300) active:"
          >
            Language
          </div>
          <div
            onClick={() => toggleTab(3)}
            className="w-full cursor-pointer pl-10 hover:(bg-yellow-300)"
          >
            Region
          </div>
          <div
            onClick={() => toggleTab(4)}
            className="w-full cursor-pointer pl-10 hover:(bg-yellow-300)"
          >
            Currency
          </div>
          <div
            onClick={() => toggleTab(5)}
            className="w-full cursor-pointer pl-10 hover:(bg-yellow-300 rounded-md)"
          >
            System Owner
          </div>
          <div
            onClick={() => toggleTab(6)}
            className="w-full cursor-pointer pl-10 hover:(bg-yellow-300 rounded-md)"
            title="Settings for Default users"
          >
            Default Users
          </div>
          <div className="text-gray-400 pl-5">Utilities</div>
          <div
            onClick={() => toggleTab(7)}
            className="w-full cursor-pointer pl-10 hover:(bg-yellow-300 rounded-md)"
          >
            Business Unit Segment
          </div>

          <div
            onClick={() => toggleTab(8)}
            className="w-full cursor-pointer pl-10 hover:(bg-yellow-300 rounded-md)"
          >
            Authorization and Role
          </div>
          <div
            onClick={() => toggleTab(10)}
            className="w-full cursor-pointer pl-10 hover:(bg-yellow-300 rounded-md)"
          >
            Company Forms
          </div>
          {adminDecode?.role == 0 && (
            <div
              onClick={() => toggleTab(9)}
              className="w-full cursor-pointer pl-10 hover:(bg-yellow-300 rounded-md)"
            >
              Global Admin Accounts
            </div>
          )}
          {adminDecode?.role == 0 && (
            <div
              onClick={() => toggleTab(11)}
              className="w-full cursor-pointer pl-10 hover:(bg-yellow-300 rounded-md)"
            >
              Super Admin
            </div>
          )}
        </div>

        <div className="flex-1  border border-black w-200 overflow-auto">
          {toggleState == 5 ? (
            <AdminOwner />
          ) : toggleState == 1 ? (
            <AdminDT />
          ) : toggleState == 2 ? (
            <AdminLanguage />
          ) : toggleState == 4 ? (
            <AdminCurrency />
          ) : toggleState == 3 ? (
            <AdminRegion />
          ) : toggleState == 6 ? (
            <AdminDefaultUsers />
          ) : toggleState == 7 ? (
            <AdminBUS />
          ) : toggleState == 8 ? (
            <AdminAuthRole />
          ) : toggleState == 9 ? (
            <AdminCreate />
          ) : toggleState == 10 ? (
            <AdminForms />
          ) : toggleState == 11 ? (
            <AdminSuperAdminAccount />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
