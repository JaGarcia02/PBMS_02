import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminComponents/AdminSidebar";
import { API_URL_ADMIN } from "../../utils/Url";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

import { getAllUsers } from "../../features/users/usersSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { listUsers } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllUsers({ search: "", sort: "ID" }));
  }, []);

  const getDaysAgoData = (data, daysAgo) => {
    // Get current date
    let t = new Date();
    // Create UTC date for daysAgo
    let d = new Date(
      Date.UTC(t.getFullYear(), t.getMonth(), t.getDate() - daysAgo)
    );

    // Filter and sort data
    return data.filter((item) => new Date(item.createdAt) <= d).length;
  };

  return (
    <div className="h-screen w-screen flex">
      <AdminSidebar />
      <div className="mt-15 w-full h-full flex flex-col p-5">
        <div className="flex flex-col flex-col-reverse w-full h-full ">
          <div className="flex flex-[1.7] flex-col mt-10  ">
            <span className="arial-narrow-bold text-black text-[20px]">
              STATUS (LIVE)
            </span>
            <div className="grid grid-cols-4 mt-5 h-full">
              <div className="admin-dashboard-status-container">
                <h2 className="admin-dashboard-status-h1">
                  Active{" "}
                  <AiFillCheckCircle className="ml-2 text-[25px] text-green-500" />
                  <span className="mt-7 text-[3rem] w-full ">
                    {
                      listUsers?.filter(
                        (data) =>
                          data.Suspension != 1 &&
                          data.acctStatus != "Inactive" &&
                          data.counterLogin < 5
                      ).length
                    }
                  </span>
                </h2>
                <div className="admin-dashboard-status-list">
                  {listUsers
                    ?.filter(
                      (data) =>
                        data.Suspension != 1 &&
                        data.acctStatus != "Inactive" &&
                        data.counterLogin < 5
                    )
                    .map((data) => (
                      <span
                        key={data.ID}
                        className="text-left arial-narrow text-black"
                      >
                        {data.firstName +
                          " " +
                          data.MiddleName +
                          "." +
                          " " +
                          data.LastName}
                      </span>
                    ))}
                </div>
              </div>
              <div className="admin-dashboard-status-container">
                <h2 className="admin-dashboard-status-h1">
                  Inactive{" "}
                  <AiFillCloseCircle className="ml-2 text-[25px] text-red-500" />
                  <span className="mt-7 text-[3rem] w-full ">
                    {
                      listUsers?.filter((data) => data.acctStatus == "Inactive")
                        .length
                    }
                  </span>
                </h2>
                <div className="admin-dashboard-status-list">
                  {listUsers
                    ?.filter((data) => data.acctStatus == "Inactive")
                    .map((data) => (
                      <span
                        className="text-left arial-narrow text-black"
                        key={data.ID}
                      >
                        {data.firstName +
                          " " +
                          data.MiddleName +
                          "." +
                          " " +
                          data.LastName}
                      </span>
                    ))}
                </div>
              </div>
              <div className="admin-dashboard-status-container">
                <h2 className="admin-dashboard-status-h1">
                  Locked
                  <span className="mt-7 text-[3rem] w-full ">
                    {listUsers?.filter((data) => data.counterLogin >= 5).length}
                  </span>
                </h2>
                <div className="admin-dashboard-status-list">
                  {listUsers
                    ?.filter((data) => data.counterLogin >= 5)
                    .map((data) => (
                      <span
                        className="text-left arial-narrow text-black"
                        key={data.ID}
                      >
                        {data.firstName +
                          " " +
                          data.MiddleName +
                          "." +
                          " " +
                          data.LastName}
                      </span>
                    ))}
                </div>
              </div>
              <div className="admin-dashboard-status-container">
                <h2 className="admin-dashboard-status-suspended">
                  Suspended
                  <span className="mt-7 text-[3rem] w-full ">
                    {listUsers?.filter((data) => data.Suspension == 1).length}
                  </span>
                </h2>
                <div className="admin-dashboard-status-list">
                  {listUsers
                    ?.filter((data) => data.Suspension == 1)
                    .map((data) => (
                      <span
                        className="text-left arial-narrow text-black"
                        key={data.ID}
                      >
                        {data.firstName +
                          " " +
                          data.MiddleName +
                          "." +
                          " " +
                          data.LastName}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-[0.3] flex-col ml-2 w-full">
            <span className="arial-narrow-bold text-black text-[20px]">
              TOTAL ACCOUNTS
            </span>
            <div className="mt-5 grid grid-cols-[10rem,15rem,1fr] gap-2 items-center ">
              <div className="w-full h-10 border flex items-center justify-center border-gray-800 bg-black">
                <span className="arial-narrow-bold text-white flex items-center">
                  PREVIOUS MONTH:
                  <p className="ml-2 text-[25px]">
                    {getDaysAgoData(listUsers, 30)}
                  </p>
                </span>
              </div>
              <div className="flex ">
                <span className="ml-15 text-6xl text-black arial-narrow-bold">
                  {listUsers?.length}
                </span>
              </div>
              <div className=" h-20 w-full">
                <table className="w-full text-left">
                  <tr className="text-black arial-narrow-bold">
                    <th className="border border-black h-10">User Category</th>

                    <th className="border border-black">Client</th>
                    <th className="border border-black">Supplier</th>
                    <th className="border border-black">Employee</th>
                    <th className="border border-black">Admin</th>
                  </tr>
                  <tr className="text-black arial-narrow">
                    <td className="border border-black arial-narrow-bold">
                      total
                    </td>
                    <td className="border border-black">000</td>
                    <td className="border border-black">000</td>
                    <td className="border border-black">000</td>
                    <td className="border border-black">000</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
