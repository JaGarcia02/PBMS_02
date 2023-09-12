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
import HrUpdateEmploymentType from "./HrEmploymentType/HrUpdateEmploymentType";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HrEmploymentType = () => {
  const [dataCategory, setDataCategory] = useState([]);
  const [addContractType, setAddContractType] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [updateContractType, setUpdateContractType] = useState({
    activator: null,
    ID: null,
  });

  // Notify Delete
  const notify_Delete = () => {
    toast.error("Employment Category Deleted", {
      position: "bottom-right",
      hideProgressBar: true,
      autoClose: 5000,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  const deleteRequest = (ID) => {
    axios
      .delete(API_URL_HR + `delete-employment-category/${ID}`)
      .then((res) => {
        setDataCategory(res.data);
        notify_Delete();
        Logs("DELETE", "Employment Category Deleted");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(API_URL_HR + "get-employment-category")
      .then((res) => setDataCategory(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="w-full relative h-full flex flex-col p-4">
      <div className="flex justify-between items-center ml-0.5">
        <div className="w-[50%] arial-narrow text-[18px]">
          <span>Employment Type</span>
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
              <tr className="shadow-sm shadow-gray-800 prdc-color h-10  text-center w-[100%] flex justify-between items-center">
                <th className="w-[10%] text-white">
                  <span>No.</span>
                </th>
                <th className="w-[40%] text-white">
                  <span>Employment Type</span>
                </th>
                <th className="w-[40%]">
                  <div className="flex justify-center text-white">
                    <button
                      className="flex justify-center items-center bg-white text-black arial-narrow-bold text-[13.5px] w-[80%] h-25px rounded-sm duration-[0.5s] ease-in-out transition hover:text-green-600 focus:(outline-none)"
                      onClick={() => setAddContractType(true)}
                    >
                      <IoAdd className="mr-1 text-[16px]" />
                      Add Contract Type
                    </button>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <div className="h-100 w-[100%] overflow-auto">
                {dataCategory
                  .filter((val) => {
                    if (
                      val.employment_category
                        .toLowerCase()
                        .includes(searchData.toLocaleLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .map((data, index) => {
                    return (
                      <>
                        <tr className="w-[100%] h-10 flex justify-center items-center">
                          <td className="flex justify-center items-center text-[14px] w-[10%] h-8 text-center border-b border-l border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                            {index + 1}
                          </td>
                          <td className="flex justify-center items-center text-[14px] w-[50%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                            {data.employment_category}
                          </td>
                          <td className="flex justify-center items-center text-[14px] w-[40%] h-8 text-center border-b border-t border-r bg-white border-b-black border-t-black border-l-black border-r-black text-left arial-narrow text-black ">
                            <div className="flex justify-center">
                              <button
                                className="flex justify-center items-center text-center border-none active:duration-75 transition transform hover:text-yellow-600 focus:(outline-none)"
                                type="submit"
                                onClick={() => {
                                  setUpdateContractType({
                                    activator: data.employment_category,
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
                                onClick={() => deleteRequest(data.ID)}
                              >
                                <BsFillTrashFill className="text-center mr-2 text-[20px]" />
                              </button>
                            </div>
                          </td>
                          {/* <td className="text-[12px] text-center border-b border-t bg-white border-b-black border-t-black text-black ">
                            {data.employment_category}
                          </td>
                          <td className="text-center border-b border-t bg-white border-b-black border-t-black border-r border-black ">
                            <div className="flex justify-center">
                              <button
                                className="flex justify-center items-center text-center border-none active:duration-75 transition transform hover:text-yellow-600 focus:(outline-none)"
                                type="submit"
                                onClick={() => {
                                  setUpdateContractType({
                                    activator: data.employment_category,
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
                                onClick={() => deleteRequest(data.ID)}
                              >
                                <BsFillTrashFill className="text-center mr-2 text-[20px]" />
                              </button>
                            </div>
                          </td> */}
                        </tr>
                      </>
                    );
                  })}
              </div>
            </tbody>
          </table>
        </div>
        <ToastContainer />
      </div>
      <AnimatePresence>
        {/* // ================================================================================  note: reference for promp drill// */}
        {addContractType && (
          <HrAddEmploymentType
            setAddContractType={setAddContractType}
            setDataCategory={setDataCategory}
          />
        )}
        {/* // ================================================================================  note: reference for promp drill// */}
        {updateContractType.ID && (
          <HrUpdateEmploymentType
            setDataCategory={setDataCategory}
            setUpdateContractType={setUpdateContractType}
            updateContractType={updateContractType}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default HrEmploymentType;
