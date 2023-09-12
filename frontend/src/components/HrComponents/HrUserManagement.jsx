import { AnimatePresence, motion } from "framer-motion";
import HrResetUser from "../../components/HrComponents/HrUserManagement/HrResetUser";
import { BsCheck2Circle } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import { MdPersonAddAlt1 } from "react-icons/md";
import HrAdminAddUser from "./HrUserManagement/HrAdminAddUser";
import axios from "axios";
import { useSelector } from "react-redux";
import { IoAdd } from "react-icons/io5";
import { API_URL_HR, API_URL_USER } from "../../utils/Url";
import jwt from "jwt-decode";
import { FaSearch } from "react-icons/fa";

const HrUserManagement = ({
  setReset,
  reset,
  setTest,
  setUserObj,
  userObj,
}) => {
  const { user } = useSelector((state) => state.user);
  const [addUser, setAddUser] = useState(false);
  const decodedDept = user ? jwt(user) : "";
  const [searchValue, setSearchValue] = useState({
    sort: "ID",
    search: "",
  });
  //HR USER MANAGEMENT LIST
  const [HrUsers, setHrUsers] = useState([]);
  const [activeEmp, setActiveEmp] = useState([]);

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        setAddUser(false);
        document.body.style.overflow = "unset";
      }
    };
    window.addEventListener("keydown", close);

    return () => {
      window.removeEventListener("keydown", close);
    };
  }, []);

  const searchUser = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${user}`,
      },
    };

    axios
      .get(API_URL_HR + `get-employee-list/?q=`)
      .then((res) => setActiveEmp(res.data))
      .catch((err) => console.log(err));

    axios
      .get(
        API_URL_USER +
          "checkAll" +
          "/" +
          searchValue.sort +
          "?q=" +
          searchValue.search,
        config
      )
      .then((res) =>
        setHrUsers(
          res.data.filter(
            (filter) => filter.department == decodedDept.dept && filter.role > 3
          )
        )
      )

      .catch((err) => console.log(err));
    console.log(filter);
  };

  useEffect(() => {
    let subscribed = true;
    const config = {
      headers: {
        Authorization: `Bearer ${user}`,
      },
    };

    axios
      .get(API_URL_HR + `get-employee-list/?q=`)
      .then((res) => setActiveEmp(res.data))
      .catch((err) => console.log(err));

    axios
      .get(
        API_URL_USER +
          "checkAll" +
          "/" +
          searchValue.sort +
          "?q=" +
          searchValue.search,
        config
      )
      .then((res) =>
        setHrUsers(
          res.data.filter(
            (filter) => filter.department == decodedDept.dept && filter.role > 3
          )
        )
      )
      .catch((err) => console.log(err));
  }, []);

  const handleModal = (object) => {
    setReset(true);
    setUserObj(object);
    if (typeof window != "undefined" && window.document) {
      document.body.style.overflow = "hidden";
    }
  };

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        setReset(false);
        document.body.style.overflow = "unset";
      }
    };
    window.addEventListener("keydown", close);

    return () => {
      window.removeEventListener("keydown", close);
    };
  }, []);

  return (
    <div className="w-full relative h-full flex flex-col p-4">
      <div className="flex w-full items-center justify-between ">
        <span className="text-[18px] text-black arial-narrow">
          User Management
        </span>

        <form
          onSubmit={searchUser}
          className=" flex h-8 w-[20%] border-none relative text-black shadow-sm shadow-gray-600 bg-white dark:(bg-gray-600 text-light-50 shadow-none) <md:(w-[100%])"
        >
          <input
            className="border border-gray-400 px-2 arial-narrow outline-none w-full bg-transparent placeholder-gray-40 "
            onChange={(e) => {
              setSearchValue({ ...searchValue, search: e.target.value });
              const newOffset =
                (0 * parseInt(itemsPerPage)) % listUsers?.length;
              setItemOffset(newOffset);
            }}
            placeholder="Search..."
          />
          <button
            type="submit"
            className="px-2 h-full w-8 rounded-none flex items-center absolute right-0 prdc-color text-white"
          >
            <FaSearch />
          </button>
        </form>
      </div>

      <div className="w-full h-[60vh] overflow-auto flex justify-center  <md:(overflow-auto)">
        <table className="w-[100%] h-[10%] border-separate border-spacing-4 border-gray-100 overflow-hidden dark:(bg-white/20 shadow-md shadow-xs)  <md:(w-70 h-auto)">
          <thead>
            <tr className="shadow-sm shadow-gray-800  items-center justify-center  prdc-color h-10 dark:(bg-blue-500) <md:(hidden)">
              <th
                className=" text-black arial-narrow-bold  text-left cursor-pointer text-[12px] hover:(bg-yellow-900) <md:(hidden) dark:(border-white text-white) "
                onClick={() => setSort("ID")}
              >
                <span className="ml-2 text-[14px] text-center  text-white">
                  NO.
                </span>
              </th>

              <th
                className=" text-white text-center arial-narrow-bold text-[14px] cursor-pointer hover:(bg-yellow-900)  <md:(hidden) dark:(border-white text-white)"
                onClick={() => setSort("employee_id")}
              >
                EMPLOYEE ID.
              </th>

              <th
                className=" text-white  text-center arial-narrow-bold text-[14px] cursor-pointer  hover:(bg-yellow-900) <md:(hidden) dark:(border-white text-white)"
                onClick={() => setSort("LastName")}
              >
                FULL NAME
              </th>
              <th className=" text-white text-center  arial-narrow-bold text-[14px] <md:(hidden) dark:(border-white text-white)">
                POSITION TITLE
              </th>
              <th className=" text-white text-center arial-narrow-bold  text-[14px] <md:(hidden) dark:(border-white text-white)">
                POSITION LEVEL
              </th>

              <th className=" text-white text-center  arial-narrow-bold text-[14px] <md:(hidden) dark:(border-white text-white)">
                STATUS
              </th>
              <th className="text-white   h-10 arial-narrow-bold flex items-center justify-end text-[11px] <md:(hidden) dark:(border-white text-white)">
                <button
                  className="flex justify-center items-center mr-2 bg-white text-black arial-narrow-bold text-[13.5px] w-[80%] h-25px rounded-sm duration-[0.5s] ease-in-out transition hover:text-green-600 focus:(outline-none)"
                  onClick={() => setAddUser(!addUser)}
                >
                  <IoAdd className="mr-0.5 text-[18px] text-black" />
                  Add Account
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="">
            {HrUsers.map((data, index) => {
              console.log(data);
              return (
                <tr
                  className={
                    data.acctStatus == "Inactive"
                      ? "border border-gray-500 bg-dark-200  arial-narrow text-center p-10 h-10 text-white hover:(bg-yellow-100 text-black) cursor-pointer dark:(bg-gray-900 hover:bg-blue-200) <md:(flex border-b border-black h-full flex-col mb-3)"
                      : data.Suspension == 1
                      ? "border border-gray-500 bg-red-400  arial-narrow text-center p-10 h-10 text-black hover:(bg-yellow-100 text-black) cursor-pointer  <md:(flex h-full flex-col border-b border-black mb-3)"
                      : data.counterLogin >= 5
                      ? "border border-gray-500 bg-yellow-200  arial-narrow text-center p-10 h-10 text-black hover:(bg-yellow-100 text-black) cursor-pointer dark:(bg-yellow-200 text-black hover:bg-blue-200) <md:(flex h-full flex-col border-b border-black mb-3)"
                      : "border border-gray-500 cursor-pointer text-center   p-10 arial-narrow h-10  text-black hover:(bg-yellow-100 text-black)   dark:(text-white) <md:(flex h-full flex-col border-b border-black mb-3)"
                  }
                  onClick={() =>
                    handleModal({
                      ID: data.ID,
                      LastName: data.LastName,
                      MiddleName: data.MiddleName,
                      firstName: data.firstName,
                      Suspension: data.Suspension,
                      access_right: data.access_right,
                      acctStatus: data.acctStatus,
                      change_password: data.change_password,
                      company: data.company,
                      counterLogin: data.counterLogin,
                      department: data.department,
                      division: data.division,
                      employee_id: data.employee_id,
                      email: data.email,
                      lastLogin: data.lastLogin,
                      permission: data.permission,
                      position: data.position,
                      role: data.role,
                      section: data.section,
                      online_status: data.online_status,
                      user_category: data.user_category,
                      username: data.username,
                      user_picture: data.Employee_Picture,
                    })
                  }
                >
                  <td className="text-[13px] pl-3  border border-black border-r-0 text-left arial-narrow text-black">
                    {index + 1}
                  </td>

                  <td className="text-[13px] arial-narrow  border border-black border-r-0 border-l-0 text-black">
                    {data.employee_id}
                  </td>
                  <td className="text-[13px]  arial-narrow border border-black  border-l-0 border-r-0 text-black">
                    {data.LastName + ", " + data.firstName}
                  </td>
                  <td className="text-[13px] m arial-narrow border border-black border-r-0 border-l-0  text-black">
                    {
                      activeEmp.filter(
                        (fil) => data.employee_id == fil.Employee_ID
                      )[0]?.Employee_JobDesc
                    }
                  </td>

                  <td className="text-[13px]  arial-narrow border-b border-t border-b-black border-t-black text-black">
                    {data.role == 2
                      ? "Department Admin"
                      : data.role == 3
                      ? "Executives"
                      : data.role == 4
                      ? "Manager"
                      : data.role == 5
                      ? "Supervisor"
                      : data.role == 6
                      ? "Rank & File"
                      : ""}
                  </td>

                  <td className="text-[13px]  arial-narrow border-b border-t border-b-black border-t-black text-black">
                    {data.acctStatus}
                  </td>
                  <td className="border-b border-t border-b-black border-t-black border-r border-black"></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <AnimatePresence>
          {addUser && <HrAdminAddUser setAddUser={setAddUser} />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HrUserManagement;
