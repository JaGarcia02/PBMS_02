import React, { useEffect, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { AiFillCloseCircle, AiOutlineCloseSquare } from "react-icons/ai";
import { OutTable, ExcelRenderer } from "react-excel-renderer";
import { useAdd } from "../../../Hooks/useAuthorized";
import {
  BsPersonFillDash,
  BsPersonFillLock,
  BsArrowLeftShort,
  BsFillTrashFill,
} from "react-icons/bs";
import { FaSearch, FaTimes } from "react-icons/fa";
import { BiSave, BiEdit } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { API_URL_ADMIN, API_URL, API_URL_HR } from "../../../utils/Url";
import { Logs } from "../../../utils/Logs";
import { useSelector } from "react-redux";
import decode from "jwt-decode";
import moment from "moment";

const HrImportTimeRecord = ({
  setOpenImportTR,
  setHrEmployee,
  setCutOff,
  setDtr,
  dtr,
  hrEmployee,
  CutOff,
  cutList,
  ObjFilter,
}) => {
  const [cutOffDate, setCutOffDate] = useState([]);
  const [cutoffId, setCutOffId] = useState("");
  const [chosenDate, setChosenDate] = useState("");
  const { branding } = useSelector((state) => state.branding);
  const { user } = useSelector((state) => state.user);

  function getRange(startDate, endDate, type) {
    let fromDate = moment(startDate);
    let toDate = moment(endDate);
    let diff = toDate.diff(fromDate, type);
    let range = [];
    for (let i = 0; i <= diff; i++) {
      range.push(moment(startDate).add(i, type));
    }
    setCutOffId(range.map((item) => item._d));
  }

  useEffect(() => {
    const split = chosenDate.split("_");
    getRange(split[0], split[1], "days");
  }, [chosenDate]);

  console.log(cutList);

  // const dtr_data = dtr
  //   ?.sort((before, after) => moment(before.Time).diff(moment(after.Time)))
  //   .filter(
  //     (fil, index, self) =>
  //       moment(fil.Time).format("MMM-DD-YYYY, ddd") &&
  //       fil.BioID &&
  //       index ==
  //         self.findIndex(
  //           (t) =>
  //             moment(fil.Time).diff(moment(t.Time), "minutes") <= 5 &&
  //             fil.BioID == t.BioID
  //         )
  //   )
  //   .map((time) => time.Time);

  // // console.log(dtr_data);
  // console.log(cutList);

  // console.log(
  //   dtr
  //     ?.sort((before, after) => moment(before.Time).diff(moment(after.Time)))
  //     .filter(
  //       (fil, index, self) =>
  //         moment(fil.Time).format("MMM-DD-YYYY") &&
  //         fil.BioID &&
  //         index ==
  //           self.findIndex(
  //             (t) =>
  //               moment(fil.Time).diff(moment(t.Time), "minutes") <= 5 &&
  //               fil.BioID == t.BioID
  //           )
  //     )
  //     .map((time) => moment(time.Time).format("MM-DD-YYYY, HH:mm"))
  // );

  // console.log(
  //   CutOff.data?.dtr
  //     ?.sort((before, after) => moment(before.Time).diff(moment(after.Time)))
  //     .filter(
  //       (fil, index, self) =>
  //         moment(fil.Time).format("MMM-DD-YYYY, ddd") &&
  //         fil.BioID == ObjFilter.employee_data.Employee_BioID &&
  //         index ==
  //           self.findIndex(
  //             (t) =>
  //               moment(fil.Time).diff(moment(t.Time), "minutes") <= 5 &&
  //               fil.BioID == t.BioID
  //           )
  //     )
  //     .map((time) => moment(time.Time).format("HH:mm"))
  // );

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

  const Import_TimeRecord = (e) => {
    const file = e.target.files[0];

    ExcelRenderer(file, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        let newRows = [];
        res.rows.slice(1).map((row, index) => {
          if (row && row !== "undefined!") {
            newRows.push({
              Time: row[0],
              BioID: row[1],
            });
          }
        });
        setDtr(newRows);
      }
    });
  };

  const TR_save = (e) => {
    e.preventDefault();

    const dtr_data = dtr.map((data) => {
      return {
        cutOffID: cutoffId,
        Time: data.Time,
        BioID: data.BioID,
      };
    });

    axios
      .post(API_URL_HR + "create-timerecord", { dtr: dtr_data })
      .then((res) => {
        axios
          .get(API_URL_HR + "get-timekeepingrecord")
          .then((res) => {
            setCutOff(res.data);
          })
          .catch((err) => console.log(err));
        notify_removeCutoff();
        document.getElementById("importTR").value = "";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const notify_removeCutoff = () => {
    toast.success(" Time Record Submited!", {
      position: "bottom-right",
      hideProgressBar: true,
      autoClose: 5000,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  return (
    <motion.div
      className="w-full h-full fixed bg-black/50 items-center flex justify-center !top-0 !left-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      exit={{ opacity: 0 }}
    >
      <motion.div className="absolute bg-white h-135 w-222 items-center shadow-md shadow-gray-900 z-999 overflow-hidden">
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
                onClick={() => setOpenImportTR(false)}
                className="w-8 h-8 absolute top-1 right-1 cursor-pointer flex items-center justify-center mr-1 text-red-400 border-none active:scale-1 active:duration-75 transition-all ease-in-out hover:text-red-500 rounded-sm hover:rounded-sm"
              />
            </div>
          </div>

          <div>
            <h1 className="mt-5 mb-2 arial-narrow-bold text-[30px]">
              IMPORT TIME RECORD
            </h1>

            <div>
              <form action="" onSubmit={TR_save}>
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
                    onChange={Import_TimeRecord}
                    required
                    className="flex ml-1 arial-narrow"
                  />
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

            <div className="flex justify-center items-center">
              <div className="grid w-full grid-cols-7 p-1">
                <div className="prdc-color text-white arial-narrow-bold text-[12px] pl-2 h-[2.6rem] text-left flex items-center shadow-sm shadow-gray-900 ">
                  Date
                </div>
                <div className="prdc-color text-white arial-narrow-bold text-[12px] pl-2 h-[2.6rem] text-left flex items-center shadow-sm shadow-gray-900 ">
                  IN
                </div>
                <div className="prdc-color text-white arial-narrow-bold text-[12px] pl-2 h-[2.6rem] text-left flex items-center shadow-sm shadow-gray-900 ">
                  OUT
                </div>
                <div className="prdc-color text-white arial-narrow-bold text-[12px] pl-2 h-[2.6rem] text-left flex items-center shadow-sm shadow-gray-900 ">
                  IN
                </div>
                <div className="prdc-color text-white arial-narrow-bold text-[12px] pl-2 h-[2.6rem] text-left flex items-center shadow-sm shadow-gray-900 ">
                  OUT
                </div>
                <div className="prdc-color text-white arial-narrow-bold text-[12px] pr-2 h-[2.6rem] flex items-center justify-end shadow-sm shadow-gray-900 col-span-2">
                  {/* <select
                    onChange={(e) => setToggle(e.target.value)}
                    className="w-30 h-6.5 outline-none appearance-none rounded-sm px-1 text-[14px] arial-narrow bg-icon2"
                  >
                    <option value={1}>BIOMETRICS</option>
                    <option value={2}>ADJUSTMENT</option>
                    <option value={3}>SUMMARY</option>
                  </select> */}
                </div>
                <div className="col-span-full my-2">
                  {cutOffDate.map((dates) => (
                    <>
                      <div>
                        <p>{moment(dates.cutOff).format("MM-DD-YYYY, ddd")}</p>
                      </div>
                    </>
                  ))}
                </div>
              </div>
              {/* <table className="w-[100%] h-[10%] border-white overflow-hidden  justify-evenly border-separate border-spacing-4">
                <thead>
                  <tr className="shadow-sm shadow-gray-800 prdc-color h-10  text-center w-[100%] flex justify-between items-center">
                    <th className="w-[50%] text-white">
                      <span>Time</span>
                    </th>
                    <th className="w-[50%] text-white">
                      <span>Bio Id</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <div className="h-45 w-[100%] overflow-auto">
                    {dtr.map((data, index) => {
                      return (
                        <>
                          <tr className="w-[100%] h-10 flex justify-center items-center">
                            <td className="flex justify-center items-center text-[12px] w-[50%] h-7 text-center border-b border-l border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                              {data.Time}
                            </td>

                            <td className="flex justify-center items-center text-center text-[12px] w-[50%] h-7 border-b border-t bg-white border-b-black border-t-black border-r border-black ">
                              {data.BioID}
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

export default HrImportTimeRecord;
