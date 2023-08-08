import React, { useEffect, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { AiFillCloseCircle, AiOutlineCloseSquare } from "react-icons/ai";
import { useAdd } from "../../../Hooks/useAuthorized";
import {
  BsPersonFillDash,
  BsPersonFillLock,
  BsArrowLeftShort,
  BsFillTrashFill,
} from "react-icons/bs";
import { FaSearch, FaTimes } from "react-icons/fa";
import { BiSave } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { API_URL_ADMIN, API_URL, API_URL_HR } from "../../../utils/Url";
import { Logs } from "../../../utils/Logs";
import { useSelector } from "react-redux";
import decode from "jwt-decode";
import moment from "moment";

const HrAddCutOff = ({ setAddCutOffModal }) => {
  const [cutOff, setCutOff] = useState({ start: "", end: "" });
  const [cutOffData, setCutOffData] = useState([]);
  const { branding } = useSelector((state) => state.branding);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    axios
      .get(API_URL_HR + "view-cutoff-category")
      .then((res) => {
        setCutOffData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const notify_removeCutoff = () => {
    toast.error(" Cut-off removed!", {
      position: "bottom-right",
      hideProgressBar: true,
      autoClose: 5000,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  const Add_CutOff = (e) => {
    e.preventDefault();
    axios
      .post(API_URL_HR + "create-cutoff", {
        cutOff:
          moment(cutOff.start).format("MM-DD-YYYY") +
          "_" +
          moment(cutOff.end).format("MM-DD-YYYY"),
      })
      .then((res) => {
        setCutOffData(res.data);
        alert("Cutoff Created!");
      })
      .catch((err) => console.log(err));
  };

  const Delete_CutOff = (ID) => {
    axios
      .delete(API_URL_HR + `delete-cutoff/${ID}`)
      .then((res) => {
        setCutOffData(res.data);
        notify_removeCutoff();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <motion.div
      className="w-full h-full absolute bg-black/50 items-center flex justify-center !top-0 !left-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      exit={{ opacity: 0 }}
    >
      <motion.div className="absolute bg-white h-135 w-222 items-center shadow-md shadow-gray-900 z-999 ">
        <div className="w-full h-full flex flex-col item-center text-center mb-5">
          <div className=" prdc-color w-full h-25">
            {/* =========================================== */}
            <div className="flex items-center">
              <div className="mt-2 ml-2">
                <img
                  src={
                    branding
                      ? API_URL + branding[0]?.Logo
                      : "/imgs/deafult_logo.jpg"
                  }
                  alt=""
                  className="h-20 object-contain w-25 rounded-sm"
                />
              </div>
              <div className="flex mt-3">
                <span className="my-3 font-Roboto text-[25px] text-white arial-narrow-bold w-full text-center">
                  Human Resources Timekeeping
                </span>
              </div>

              <AiOutlineCloseSquare
                onClick={() => setAddCutOffModal(false)}
                className="w-8 h-8 absolute top-1 right-1 cursor-pointer flex items-center justify-center mr-1 text-red-400 border-none active:scale-1 active:duration-75 transition-all ease-in-out hover:text-red-500 rounded-sm hover:rounded-sm"
              />
            </div>
          </div>

          <div>
            <h1 className="arial-narrow-bold text-[30px] mt-5">
              Create Cut-Off
            </h1>
            <form
              action=""
              className="flex justify-between items-center w-[100%] px-60 mt-5"
              onSubmit={Add_CutOff}
            >
              <div className="arial-narrow-bold">
                <label htmlFor="">Date Start:</label>
                <input
                  type="date"
                  required
                  className="arial-narrow w-28 px-1 border-[2px] border-black cursor-pointer ml-2"
                  onChange={(e) =>
                    setCutOff({ ...cutOff, start: e.target.value })
                  }
                />
              </div>
              <div className="arial-narrow-bold">
                <label htmlFor="">Date End:</label>
                <input
                  type="date"
                  required
                  className="arial-narrow w-28 px-1 border-[2px] border-black cursor-pointer ml-2"
                  onChange={(e) =>
                    setCutOff({ ...cutOff, end: e.target.value })
                  }
                />
              </div>

              {/* <input
                type="submit"
                value="Save"
                className="absolute bottom-8 right-5 cursor-pointer arial-narrow-bold mt-10 text-black text-[14px] h-8 w-25 justify-center border-[2.5px] border-black rounded-sm hover:(rounded-sm border-black) p-1  flex items-center focus:(outline-none) dark:(text-green-500 bg-transparent shadow-none hover:bg-green-400 hover:text-black) active:duration-75 transition-all ease-in-out rounded-sm hover:text-green-500"
              /> */}
              <button
                className="absolute bottom-8 right-5 cursor-pointer arial-narrow-bold mt-10 text-black text-[14px] h-8 w-25 justify-center border-[2.5px] border-black rounded-sm hover:(rounded-sm border-black) p-1  flex items-center focus:(outline-none)  shadow-none hover:(text-green-500) active:duration-75 transition-all ease-in-out rounded-sm"
                type="submit"
                disabled={useAdd() ? false : true}
              >
                <BiSave className="mr-2" />
                Save
              </button>
            </form>

            <div className="w-[100%] flex justify-center items-center mt-5 ">
              <table className="w-120 h-[10%] border-white overflow-hidden  justify-evenly border-separate border-spacing-4">
                <thead>
                  <tr className="shadow-sm shadow-gray-800 prdc-color h-10  text-center w-[100%] flex justify-between items-center">
                    <th className="w-[10%] text-white">
                      <span>No.</span>
                    </th>
                    <th className="w-[80%] text-white">
                      <span>Cut-off</span>
                    </th>
                    <th className="w-[10%] text-white">
                      <span></span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <div className="h-40 w-[100%] overflow-auto">
                    {cutOffData.map((data, index) => {
                      return (
                        <>
                          <tr className="w-[100%] h-10 flex justify-center items-center">
                            <td className="flex justify-center items-center text-[12px] w-[10%] h-7 text-center border-b border-l border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                              {index + 1}
                            </td>
                            <td className="flex justify-center items-center text-[12px] w-[80%] h-7 text-center border-b border-t bg-white border-b-black border-t-black text-black ">
                              {data.cutOff}
                            </td>
                            <td className="flex justify-center items-center text-center w-[10%] h-7 border-b border-t bg-white border-b-black border-t-black border-r border-black ">
                              <button
                                onClick={() => Delete_CutOff(data.ID)}
                                className="flex justify-center items-center border-none active:duration-75 transition transform hover:text-red-600 focus:(outline-none)"
                              >
                                <BsFillTrashFill />
                              </button>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </div>
                </tbody>
              </table>
              {/* <table className="w-120 border-white border-separate border-spacing-4">
                <thead>
                  <tr className="shadow-sm shadow-gray-800 prdc-color h-10  text-center">
                    <th className="w-[10%] text-white">No.</th>
                    <th className="w-[80%] text-white">Cut-Off</th>
                    <th className="w-[10%]"></th>
                  </tr>
                </thead>
                <tbody>
                  <div className="border-r-green-400 h-50 overflow-auto">
                    {cutOffData.map((data, index) => {
                      return (
                        <>
                          <tr className="border border-black  arial-narrow h-10  text-black">
                            <td className="text-[12px] text-center border-b border-l border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                              {index + 1}
                            </td>
                            <td className="text-[12px] text-center border-b border-t bg-white border-b-black border-t-black text-black ">
                              {data.cutOff}
                            </td>
                            <td className="text-[12px] w-[10%] text-center border-b border-t bg-white border-b-black border-t-black text-black ">
                              <button
                                className="flex justify-center items-center border-none active:duration-75 transition transform hover:text-red-600 focus:(outline-none)"
                                onClick={() => Delete_CutOff(data.ID)}
                              >
                                <BsFillTrashFill />
                              </button>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </div>
                </tbody>
              </table> */}
            </div>
          </div>

          <ToastContainer />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HrAddCutOff;
