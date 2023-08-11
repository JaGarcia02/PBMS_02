import React, { useEffect, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { AiFillCloseCircle, AiOutlineCloseSquare } from "react-icons/ai";
import { useAdd } from "../../../Hooks/useAuthorized";
import { OutTable, ExcelRenderer } from "react-excel-renderer";
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

const HrImportSummary = ({
  setOpenImportSummary,
  ExcelData,
  setExcelData,
  setHrEmployee,
  hrEmployee,
  setCutOff,
}) => {
  const [cutOffDate, setCutOffDate] = useState([]);
  const [cutoffId, setCutOffId] = useState("");
  const { branding } = useSelector((state) => state.branding);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    axios
      .get(API_URL_HR + `get-employee-list/?q=`)
      .then((res) => setHrEmployee(res.data))
      .catch((err) => console.log(err));

    axios
      .get(API_URL_HR + "get-timekeepingrecord")
      .then((res) => {
        setCutOff(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(API_URL_HR + "view-cutoff-category")
      .then((res) => {
        setCutOffDate(res.data);
        console.log(cutOffDate);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const Success_Notification = () => {
    toast.success("Summary submitted!", {
      position: "bottom-right",
      hideProgressBar: true,
      autoClose: 1500,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  const Import_Summary = (e) => {
    const file = e.target.files[0];

    ExcelRenderer(file, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        let newRows = [];
        res.rows.slice(1).map((row, index) => {
          if (row && row !== "undefined!") {
            newRows.push({
              REG: row[1],
              OT: row[2],
              UT: row[3],
              ND: row[4],
              LWP: row[5],
              REGNS: row[6],
              OTNS: row[7],
              OTND: row[8],
              LATES: row[9],
              ABSENT: row[10],
              Employee_ID: row[11],
            });
          }
        });
        setExcelData(newRows);
      }
    });
  };

  const Save_Summary = (e) => {
    e.preventDefault();

    const timeKeepingData = hrEmployee.map((data) => {
      return {
        // This will create a cutoffId
        cutOffID: cutoffId,
        Employee_ID: ExcelData.filter(
          (fil) => fil.Employee_ID == data.Employee_ID
        )[0]?.Employee_ID,
        REG: ExcelData.filter((fil) => fil.Employee_ID == data.Employee_ID)[0]
          ?.REG,
        OT: ExcelData.filter((fil) => fil.Employee_ID == data.Employee_ID)[0]
          ?.OT,
        UT: ExcelData.filter((fil) => fil.Employee_ID == data.Employee_ID)[0]
          ?.UT,
        ND: ExcelData.filter((fil) => fil.Employee_ID == data.Employee_ID)[0]
          ?.ND,
        LWP: ExcelData.filter((fil) => fil.Employee_ID == data.Employee_ID)[0]
          ?.LWP,
        REGNS: ExcelData.filter((fil) => fil.Employee_ID == data.Employee_ID)[0]
          ?.REGNS,
        OTNS: ExcelData.filter((fil) => fil.Employee_ID == data.Employee_ID)[0]
          ?.OTNS,
        OTND: ExcelData.filter((fil) => fil.Employee_ID == data.Employee_ID)[0]
          ?.OTND,
        LATES: ExcelData.filter((fil) => fil.Employee_ID == data.Employee_ID)[0]
          ?.LATES,
        ABSENT: ExcelData.filter(
          (fil) => fil.Employee_ID == data.Employee_ID
        )[0]?.ABSENT,
      };
    });
    axios
      .post(API_URL_HR + "save-cutoff", { timeKeepingData })
      .then((res) => {
        axios
          .get(API_URL_HR + "get-timekeepingrecord")
          .then((res) => {
            setCutOff(res.data);
          })
          .catch((err) => console.log(err));
        Success_Notification();
        // setTimeout(() => {
        //   window.location.reload();
        // }, 2500);
      })
      .catch((err) => console.log(err));
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
                onClick={() => setOpenImportSummary(false)}
                className="w-8 h-8 absolute top-1 right-1 cursor-pointer flex items-center justify-center mr-1 text-red-400 border-none active:scale-1 active:duration-75 transition-all ease-in-out hover:text-red-500 rounded-sm hover:rounded-sm"
              />
            </div>
          </div>

          <div>
            <div>
              <h1 className="mt-5 mb-2 arial-narrow-bold text-[30px]">
                Import Summary{" "}
              </h1>
            </div>

            <div>
              <form action="" onSubmit={Save_Summary}>
                <div className="w-[100%] flex ">
                  <select
                    name=""
                    id=""
                    required
                    onChange={(e) => setCutOffId(e.target.value)}
                    className="border border-black ml-1 focus:(outline-none) arial-narrow px-1"
                  >
                    <option value="" selected disabled>
                      Select Cutoff Date
                    </option>
                    {cutOffDate.map((data) => {
                      return <option value={data.cutOff}>{data.cutOff}</option>;
                    })}
                  </select>
                  <input
                    id="importTR"
                    type="file"
                    onChange={Import_Summary}
                    required
                    className="flex ml-1 arial-narrow"
                  />
                </div>

                <div className="flex justify-center items-center">
                  <table className="w-[100%] h-[10%] border-white overflow-hidden  justify-evenly border-separate border-spacing-4">
                    <thead>
                      <tr className="shadow-sm shadow-gray-800 prdc-color h-10  text-center w-[100%] flex justify-between items-center">
                        <th className="w-[10%] text-white">
                          <span>REG</span>
                        </th>
                        <th className="w-[10%] text-[12px] text-white">
                          <span>OT</span>
                        </th>
                        <th className="w-[10%] text-[12px] text-white">
                          <span>UT</span>
                        </th>
                        <th className="w-[10%] text-[12px] text-white">
                          <span>ND</span>
                        </th>
                        <th className="w-[10%] text-[12px] text-white">
                          <span>LWP</span>
                        </th>
                        <th className="w-[10%] text-[12px] text-white">
                          <span>REGNS</span>
                        </th>
                        <th className="w-[10%] text-[12px] text-white">
                          <span>OTNS</span>
                        </th>
                        <th className="w-[10%] text-[12px] text-white">
                          <span>OTND</span>
                        </th>
                        <th className="w-[10%] text-[12px] text-white">
                          <span>LATES</span>
                        </th>
                        <th className="w-[10%] text-[12px] text-white">
                          <span>ABSENT</span>
                        </th>
                        <th className="w-[10%] text-[12px] text-white">
                          <span>Employee Id</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <div className="h-45 w-[100%] overflow-auto">
                        {ExcelData.map((data, index) => {
                          return (
                            <>
                              <tr className="w-[100%] h-10 flex justify-center items-center">
                                <td className="flex justify-center items-center text-[12px] w-[10%] h-7 text-center border-b border-l border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                                  {data.REG}
                                </td>
                                <td className="flex justify-center items-center text-[12px] w-[10%] h-7 text-center border-b border-t bg-white border-b-black border-t-black text-black ">
                                  {data.OT}
                                </td>
                                <td className="flex justify-center items-center text-[12px] w-[10%] h-7 text-center border-b border-t bg-white border-b-black border-t-black text-black ">
                                  {data.UT}
                                </td>
                                <td className="flex justify-center items-center text-[12px] w-[10%] h-7 text-center border-b border-t bg-white border-b-black border-t-black text-black ">
                                  {data.ND}
                                </td>
                                <td className="flex justify-center items-center text-[12px] w-[10%] h-7 text-center border-b border-t bg-white border-b-black border-t-black text-black ">
                                  {data.LWP}
                                </td>
                                <td className="flex justify-center items-center text-[12px] w-[10%] h-7 text-center border-b border-t bg-white border-b-black border-t-black text-black ">
                                  {data.REGNS}
                                </td>
                                <td className="flex justify-center items-center text-[12px] w-[10%] h-7 text-center border-b border-t bg-white border-b-black border-t-black text-black ">
                                  {data.OTNS}
                                </td>
                                <td className="flex justify-center items-center text-[12px] w-[10%] h-7 text-center border-b border-t bg-white border-b-black border-t-black text-black ">
                                  {data.OTND}
                                </td>
                                <td className="flex justify-center items-center text-[12px] w-[10%] h-7 text-center border-b border-t bg-white border-b-black border-t-black text-black ">
                                  {data.LATES}
                                </td>
                                <td className="flex justify-center items-center text-[12px] w-[10%] h-7 text-center border-b border-t bg-white border-b-black border-t-black text-black ">
                                  {data.ABSENT}
                                </td>
                                <td className="flex justify-center items-center text-center text-[12px] w-[10%] h-7 border-b border-t bg-white border-b-black border-t-black border-r border-black ">
                                  {data.Employee_ID}
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </div>
                    </tbody>
                  </table>
                </div>

                <button
                  className="absolute bottom-8 right-5 cursor-pointer arial-narrow-bold mt-10 text-black text-[14px] h-8 w-25 justify-center border-[2.5px] border-black rounded-sm hover:(rounded-sm border-black) p-1  flex items-center focus:(outline-none)  shadow-none hover:(text-green-500) active:duration-75 transition-all ease-in-out rounded-sm"
                  type="submit"
                  disabled={useAdd() ? false : true}
                >
                  <BiSave className="mr-2" />
                  Save
                </button>
              </form>
            </div>
          </div>

          <ToastContainer />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HrImportSummary;
