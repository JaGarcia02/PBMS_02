import React, { useEffect, useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import HrRequestAdd from "./HrRequest/HrRequestAdd";
import { useEdit, useDelete } from "../../Hooks/useAuthorized";
import HrRequestUpdate from "./HrRequest/HrRequestUpdate";
import { API_URL_ADMIN } from "../../utils/Url";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Logs } from "../../utils/Logs";
import moment from "moment";
import { useSelector } from "react-redux";
import jwt from "jwt-decode";
import { RxUpdate } from "react-icons/rx";
import { IoAdd } from "react-icons/io5";
import { FaSearch, FaTimes } from "react-icons/fa";
import { BsFillTrashFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { CiSquareRemove } from "react-icons/ci";

const HrRequest = () => {
  const [addRequest, setAddRequest] = useState(false);
  const [editRequest, setEditRequest] = useState({ activator: false, id: "" });
  const [showRequest, setShowRequest] = useState([]);
  const [searchData, setSearchData] = useState("");
  const inputRef = useRef();
  const { user } = useSelector((state) => state.user);
  const reqDept = jwt(user)?.dept;

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        setAddRequest(false);
      }
    };
    window.addEventListener("keydown", close);

    return () => {
      window.removeEventListener("keydown", close);
    };
  }, []);

  // Notify Create
  const notify_Delete = () => {
    toast.error("Request Successfully Deleted", {
      position: "bottom-right",
      hideProgressBar: true,
      autoClose: 5000,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  useEffect(() => {
    axios
      .get(API_URL_ADMIN + "view-all-prf-request")
      .then((res) => {
        setShowRequest(res.data);
      })
      .catch((err) => console.log(err));
  }, [setAddRequest, setEditRequest]);

  const deleteRequest = (ID) => {
    axios
      .delete(API_URL_ADMIN + `delete-position-request/${ID}`)
      .then((res) => {
        setShowRequest(res.data);
        notify_Delete();
        Logs("Delete", "PRA Request Deleted");
      })
      .catch((err) => console.log(err));
  };

  const approvedPrf = (ID) => {
    axios
      .put(API_URL_ADMIN + "approved-prf", { ID })
      .then((res) => {
        setShowRequest(res.data);
        toast.success("Request has been Approved", {
          position: "bottom-right",
          hideProgressBar: true,
          autoClose: 5000,
          pauseOnHover: false,
          theme: "colored",
        });
      })
      .catch((err) => console.log(err));
  };

  const focusInput = (e) => {
    e.preventDefault();
    setSearchData(inputRef.current.value);
  };

  return (
    <div className="w-full relative h-full flex flex-col p-4">
      <div className="flex justify-between items-center ml-0.5">
        <div className="w-[50%] arial-narrow text-[18px]">
          <span>Personnel Requisition Advice</span>
        </div>
        <form
          onSubmit={focusInput}
          className=" flex h-8 w-[15%] border-black border relative text-black shadow-sm shadow-gray-600 bg-white dark:(bg-gray-600 text-light-50 shadow-none) <md:(w-[100%])"
        >
          <input
            className="border-none arial-narrow outline-none w-full bg-transparent placeholder-gray-40 "
            ref={inputRef}
            placeholder="  Search..."
          />
          <button
            type="submit"
            className="flex justify-center items-center prdc-color text-white w-8 shadow-sm shadow-gray-600 mr-0.5"
          >
            <FaSearch className="px-2 h-full w-8 cursor-pointer  absolute right-0 prdc-color text-white" />
          </button>
        </form>
      </div>

      <div className="w-full h-[60vh] overflow-auto ">
        <table className="w-[100%] h-[10%] border-transparent mt-4 overflow-hidden  justify-evenly border-separate border-spacing-4">
          <thead>
            <tr className="shadow-sm shadow-gray-800 prdc-color h-10 dark:(bg-blue-500) <md:(hidden) text-center">
              <th
                className="text-white arial-narrow-bold w-[10%]"
                // onClick={() => setSort("ID")}
              >
                <span className="ml-2">No.</span>
              </th>

              <th
                className="text-white arial-narrow-bold w-[18%]"
                // onClick={() => setSort("employee_id")}
              >
                Position
              </th>
              <th
                className="text-white arial-narrow-bold w-[15%]"
                // onClick={() => setSort("employee_id")}
              >
                Department
              </th>

              <th
                className="text-white arial-narrow-bold w-[20%]"
                // onClick={() => setSort("LastName")}
              >
                Date Requested
              </th>

              <th
                className="text-white arial-narrow-bold w-[15%]"
                // onClick={() => setSort("LastName")}
              >
                Available Slots
              </th>
              <th className="text-white arial-narrow-bold">
                <div className="flex justify-center items-center ">
                  <button
                    className="flex justify-center items-center bg-white text-black arial-narrow-bold text-[12px] w-[60%] h-25px rounded-sm duration-[0.5s] ease-in-out transition hover:text-green-600 focus:(outline-none)"
                    onClick={() => setAddRequest(!addRequest)}
                  >
                    <IoAdd className="mr-1 text-[16px] <md:(text-[14px])" />
                    Add PRA Request
                  </button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {showRequest
              .filter((val) => {
                if (
                  (searchData == "" ||
                    val.request_position
                      .toLowerCase()
                      .includes(searchData.toLowerCase()) ||
                    val.request_department
                      .toLowerCase()
                      .includes(searchData.toLowerCase()) ||
                    val.request_count
                      .toString()
                      .includes(searchData.toLowerCase())) &&
                  (reqDept == val.request_department || reqDept == "HR")
                ) {
                  return val;
                }
              })
              .map((data, index) => {
                return (
                  <tr className="border border-black  arial-narrow h-10  text-black">
                    <td className="text-[12px] text-center border-b border-l border-t border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                      {index + 1}
                    </td>
                    <td className="text-[12px] text-center border-b border-t border-b-black border-t-black text-black ">
                      {data.request_position}
                    </td>
                    <td className="text-[12px] text-center border-b border-t border-b-black border-t-black text-black ">
                      {data.request_department}
                    </td>
                    <td className="text-[12px] text-center border-b border-t border-b-black border-t-black text-black ">
                      {moment(data.request_date).format("MMMM DD, YYYY")}
                    </td>
                    <td className="text-[12px] text-center border-b border-t border-b-black border-t-black text-blackk ">
                      {data.request_count}
                    </td>

                    <td className="text-center border-b border-t border-b-black border-t-black border-r border-black ">
                      {data.request_status == 0 && reqDept == "HR" ? (
                        <div className="flex justify-center items-center">
                          <button
                            className="flex justify-center items-center text-center border-none active:duration-75 transition transform hover:text-yellow-600 focus:(outline-none)"
                            type="submit"
                            onClick={() => {
                              setEditRequest({
                                activator: true,
                                id: data.ID,
                              });
                            }}
                          >
                            <FiEdit className="mr-3 text-center text-[20px] " />
                          </button>
                          <button
                            // id="delete"
                            className="flex justify-center items-center border-none active:duration-75 transition transform hover:text-red-600 focus:(outline-none)"
                            type="button"
                            disabled={useDelete ? false : true}
                            onClick={() => deleteRequest(data.ID)}
                          >
                            <BsFillTrashFill className="text-center mr-2 text-[20px]" />
                          </button>
                          <button
                            // id="delete"
                            disabled={useEdit ? false : true}
                            className="flex justify-center items-center text-center border-none active:duration-75 transition transform hover:text-green-600 focus:(outline-none)"
                            type="button"
                            onClick={() => approvedPrf(data.ID)}
                          >
                            <BsFillCheckCircleFill className=" ml-1 text-[20px]" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-center mr-6">
                          <button
                            className="flex justify-center items-center text-center border-none active:duration-75 transition transform hover:text-yellow-600 focus:(outline-none)"
                            type="submit"
                            onClick={() => {
                              setEditRequest({
                                activator: true,
                                id: data.ID,
                              });
                            }}
                          >
                            <FiEdit className="mr-3 text-center text-[20px] " />
                          </button>
                          <button
                            // id="delete"
                            className="flex justify-center items-center border-none active:duration-75 transition transform hover:text-red-600 focus:(outline-none)"
                            type="button"
                            disabled={useDelete ? false : true}
                            onClick={() => deleteRequest(data.ID)}
                          >
                            <BsFillTrashFill className="text-center mr-2 text-[20px]" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <ToastContainer />
      <AnimatePresence>
        {/* // ================================================================================  note: reference for promp drill// */}
        {addRequest && (
          <HrRequestAdd
            setAddRequest={setAddRequest}
            setShowRequest={setShowRequest}
          />
        )}
        {/* // ================================================================================  note: reference for promp drill// */}
        {editRequest.activator && (
          <HrRequestUpdate
            setEditRequest={setEditRequest}
            editRequest={editRequest}
            setShowRequest={setShowRequest}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default HrRequest;
