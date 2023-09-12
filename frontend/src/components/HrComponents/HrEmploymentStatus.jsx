import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { AiFillCloseCircle, AiOutlineCloseSquare } from "react-icons/ai";
import { IoAdd } from "react-icons/io5";
import HrAddEmploymentType from "./HrEmploymentType/HrAddEmploymentType";
import { AnimatePresence } from "framer-motion";
import axios from "axios";
import { API_URL_HR } from "../../utils/Url";
import { FiEdit } from "react-icons/fi";
import { BsFillTrashFill } from "react-icons/bs";
import { useEdit, useDelete } from "../../Hooks/useAuthorized";
import { Logs } from "../../utils/Logs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HrAddEmploymentStatus from "./HrEmploymentStatus/HrAddEmploymentStatus";
import HrUpdateEmploymentStatus from "./HrEmploymentStatus/HrUpdateEmploymentStatus";

const HrEmploymentStatus = () => {
  const [dataStatus, setDataStatus] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [addStatus, setAddStatus] = useState(false);
  const [updateStatus, setUpdateStatus] = useState({
    activator: null,
    ID: null,
  });

  useEffect(() => {
    axios
      .get(API_URL_HR + "viewAll-empStatus")
      .then((res) => setDataStatus(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Notify Delete
  const notify_Delete = () => {
    toast.error("Employment Status Deleted", {
      position: "bottom-right",
      hideProgressBar: true,
      autoClose: 5000,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  const deleteStatus = (ID) => {
    axios
      .delete(API_URL_HR + `delete-empStatus/${ID}`)
      .then((res) => {
        setDataStatus(res.data);
        notify_Delete();
        Logs("DELETE", "Employment Category Deleted");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full relative h-full flex flex-col p-4">
      <div className="flex justify-between items-center ml-0.5">
        <div className="w-[50%] arial-narrow text-[18px]">
          <span>Employment Status</span>
        </div>
        <div className="w-[50%] flex justify-end">
          <input
            className="arial-narrow text-[14px] h-8 w-[35%] border border-gray-400 px-1 shadow-sm shadow-gray-600 outline-none"
            onChange={(e) => {
              setSearchData(e.target.value);
            }}
            placeholder="Search. . . ."
          />
          <div className="flex justify-center items-center prdc-color text-white w-8 shadow-sm shadow-gray-600 mr-0.5">
            <BiSearch />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="w-full h-full flex justify-center pb-5">
        <div className="mt-15 w-[60%]">
          <table className="w-[100%] h-[10%] border-gray-100 mt-4 overflow-hidden  justify-evenly border-separate border-spacing-4">
            <thead>
              <tr className="shadow-sm shadow-gray-800 prdc-color h-10  text-center">
                <th className="w-[20%] text-white">
                  <span>No.</span>
                </th>
                <th className="w-[50%] text-white">
                  <span>Employment Status</span>
                </th>
                <th className="w-[30%]">
                  <div className="flex justify-center text-white">
                    <button
                      className="flex justify-center items-center bg-white text-black arial-narrow-bold text-[13.5px] w-[80%] h-25px rounded-sm duration-[0.5s] ease-in-out transition hover:text-green-600 focus:(outline-none)"
                      onClick={() => setAddStatus(true)}
                    >
                      <IoAdd className="mr-1 text-[16px]" />
                      Add Status
                    </button>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {dataStatus
                .filter((val) => {
                  if (
                    searchData == "" ||
                    val.employee_status
                      .toLowerCase()
                      .includes(searchData.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((data, index) => {
                  return (
                    <tr className="border border-black  arial-narrow h-10  text-black">
                      <td className="text-[12px] text-center border-b border-l border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                        {index + 1}
                      </td>
                      <td className="text-[12px] text-center border-b border-t bg-white border-b-black border-t-black text-black ">
                        {data.employee_status}
                      </td>
                      <td className="text-center border-b border-t bg-white border-b-black border-t-black border-r border-black ">
                        <div className="flex justify-center">
                          <button
                            className="flex justify-center items-center text-center border-none active:duration-75 transition transform hover:text-yellow-600 focus:(outline-none)"
                            type="submit"
                            onClick={() => {
                              setUpdateStatus({
                                activator: data.employee_status,
                                ID: data.ID,
                              });
                            }}
                          >
                            <FiEdit className="mr-5 text-center text-[20px] " />
                          </button>
                          <button
                            // id="delete"
                            className="flex justify-center items-center border-none active:duration-75 transition transform hover:text-red-600 focus:(outline-none)"
                            type="button"
                            disabled={useDelete ? false : true}
                            onClick={() => deleteStatus(data.ID)}
                          >
                            <BsFillTrashFill className="text-center mr-2 text-[20px]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <ToastContainer />
      </div>
      <AnimatePresence>
        {/* // ================================================================================  note: reference for promp drill// */}
        {addStatus && (
          <HrAddEmploymentStatus
            setAddStatus={setAddStatus}
            setDataStatus={setDataStatus}
          />
        )}

        {/* // ================================================================================  note: reference for promp drill// */}
        {updateStatus.ID && (
          <HrUpdateEmploymentStatus
            setDataStatus={setDataStatus}
            updateStatus={updateStatus}
            setUpdateStatus={setUpdateStatus}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default HrEmploymentStatus;
