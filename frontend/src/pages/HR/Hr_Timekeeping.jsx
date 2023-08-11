import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { API_URL_HR } from "../../utils/Url";
import { OutTable, ExcelRenderer } from "react-excel-renderer";
import moment from "moment";
import { useSelector } from "react-redux";
import { MdAddCircle } from "react-icons/md";
import { BsSearch, BsSave2Fill, BsFillCalendarPlusFill } from "react-icons/bs";
import { AiFillSave, AiFillFileExcel, AiFillFileAdd } from "react-icons/ai";
import HrTimeRecord from "../../components/HrComponents/HrTimekeeping/HrTimeRecord";
import HrSummary from "../../components/HrComponents/HrTimekeeping/HrSummary";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HrAddCutOff from "../../components/HrComponents/HrTimekeeping/HrAddCutOff";
import HrAdjustment from "../../components/HrComponents/HrTimekeeping/HrAdjustment";
import HrImportTimeRecord from "../../components/HrComponents/HrTimekeeping/HrImportTimeRecord";
import HrImportSummary from "../../components/HrComponents/HrTimekeeping/HrImportSummary";

const Hr_Timekeeping = () => {
  const { branding } = useSelector((state) => state.branding);
  const [hrEmployee, setHrEmployee] = useState([]);
  const [ExcelData, setExcelData] = useState([]);
  const [CutOff, setCutOff] = useState([]);
  const [cutList, setCutList] = useState([]);
  const [toggle, setToggle] = useState(1);
  const [chosenDate, setChosenDate] = useState("");
  const [ObjFilter, setObjFilter] = useState({
    ID: "",
    employee_data: [],
  });
  const [addCutOffModal, setAddCutOffModal] = useState(false);
  const [dtr, setDtr] = useState([]);
  // const [cutOffId, setCutOffId] = useState({
  //   dateStart: "",
  //   dateEnd: "",
  // });
  // import time record
  const [openImportTR, setOpenImportTR] = useState(false);
  // import summary
  const [openImportSummary, setOpenImportSummary] = useState(false);

  console.log(cutList);

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
  }, []);

  function getRange(startDate, endDate, type) {
    let fromDate = moment(startDate);
    let toDate = moment(endDate);
    let diff = toDate.diff(fromDate, type);
    let range = [];
    for (let i = 0; i <= diff; i++) {
      range.push(moment(startDate).add(i, type));
    }
    setCutList(range.map((item) => item._d));
  }

  useEffect(() => {
    const split = chosenDate.split("_");
    getRange(split[0], split[1], "days");
  }, [chosenDate]);

  // This is for the exel data to render

  const handleChange = (event, objectname, ID) => {
    let ObjIndex = ExcelData.findIndex((obj) => obj.Employee_ID == ID);

    let object = ExcelData[ObjIndex];

    object[objectname] = event;

    setExcelData([...ExcelData]);
  };

  return (
    <div className="flex flex-col h-screen w-screen">
      <Navbar />
      <div className="flex h-full w-full flex-col mt-15 p-4 items-center max-h-[2000px] justify-center">
        <ToastContainer />
        <div className="grid grid-cols-4 grid-rows-[75px,1fr] w-full h-full max-w-[2000px] gap-3">
          <div className="flex-[0.3] text-center flex flex-col border h-20 border-gray-700 justify-center text-black border-t-gray-700 border-t-4">
            <span className="arial-narrow-bold text-[25px]">Timekeeping</span>
            <span className="arial-narrow text-[20px] mt-1">Internal</span>
          </div>
          <div className="col-span-3 flex-1 border h-20 flex border-gray-700 border-t-4  border-t-gray-700">
            <div className="flex-1 flex flex-col px-3 justify-center ">
              <div className="flex items-center mb-3">
                <span className=" arial-narrow-bold text-black text-[15px] inline-block w-25">
                  COMPANY:
                </span>
                <p className="text-[15px] arial-narrow text-black">
                  {branding ? branding[0]?.Business_Name : ""}
                </p>
              </div>
              <div className="flex items-center">
                <span className="arial-narrow-bold text-black text-[15px] text-[15px] inline-block w-25">
                  BRANCH:
                </span>
                <p className="text-[15px] arial-narrow text-black">Internal</p>
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex items-center mb-3">
                <button
                  className="  arial-narrow-bold prdc-color  text-white text-[14px] w-[100%] justify-center border-[2.5px] rounded-sm hover:(rounded-sm) p-1  flex items-center focus:(outline-none)  transition ease-in-out duration-[0.5s] rounded-sm  hover:(text-black border-black bg-white)"
                  onClick={() => setAddCutOffModal(true)}
                >
                  <BsFillCalendarPlusFill className="mr-2" />
                  Create Cut-off
                </button>
                {/* <span className=" arial-narrow-bold text-black text-[15px] inline-block w-25">
                  ADD CUT-OFF:
                </span>
                <input
                  type="date"
                  className="border border-gray-700 mr-2 h-5 w-22.1 text-[14px] arial-narrow px-1"
                  onChange={(e) =>
                    setCutOffId({
                      ...cutOffId,
                      dateStart: moment(e.target.value).format("MM-DD-YYYY"),
                    })
                  }
                />
                {" - "}
                <input
                  type="date"
                  className="border border-gray-700 h-5 w-22.1 text-[14px] arial-narrow ml-2 px-1"
                  onChange={(e) =>
                    setCutOffId({
                      ...cutOffId,
                      dateEnd: moment(e.target.value).format("MM-DD-YYYY"),
                    })
                  }
                />
                <MdAddCircle
                  className="ml-2 text-gray-700 cursor-pointer hover:text-green-500"
                  onClick={SaveButton}
                /> */}
              </div>
              <div className="flex items-center">
                <span className="arial-narrow-bold text-black text-[15px] inline-block w-25">
                  CUT-OFF:{" "}
                </span>
                <select
                  onChange={(e) => setChosenDate(e.target.value)}
                  className="text-[12px] w-50 arial-narrow h-5 border border-gray-700"
                >
                  {[
                    ...new Set(CutOff.data?.dtr?.map((item) => item.cutOffID)),
                    <option selected hidden>
                      Choose Cut off
                    </option>,
                  ].map((data) => (
                    <option>{data}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex justify-end items-center h-full">
                {/* <label
                  for="dtr-upload"
                  className="w-[50%] bg-gray-700 text-white mr-2 arial-narrow cursor-pointer text-center mb-2"
                >
                  ADD TIME RECORD
                </label>
                <label
                  for="EmpSum"
                  className="w-[50%] bg-gray-700 text-white mr-2 arial-narrow cursor-pointer text-center mb-2"
                >
                  IMPORT SUMMARY
                </label>
                <input
                  id="EmpSum"
                  type="file"
                  className="hidden"
                  onChange={handleFile}
                />
                <input
                  id="dtr-upload"
                  type="file"
                  onChange={handleDTR}
                  className="hidden"
                /> */}
                <div className="flex flex-col justify-center items-center mr-2 h-[100%]">
                  <button
                    className="prdc-color text-white arial-narrow-bold h-7 w-50 flex justify-center items-center mb-2 focus:outline-none transition ease-in-out duration-[0.5s] hover:( border-[2px] border-black bg-white text-black)"
                    onClick={() => setOpenImportTR(true)}
                  >
                    <AiFillFileAdd className="mr-2" />
                    Import Time Record
                  </button>
                  {/* <button
                    className="prdc-color text-white arial-narrow-bold h-7 w-50 flex justify-center items-center focus:outline-none transition ease-in-out duration-[0.5s] hover:( border-[2px] border-black bg-white text-black)"
                    onClick={() => setOpenImportSummary(true)}
                  >
                    <AiFillFileAdd className="mr-2" />
                    Import Summary
                  </button> */}
                </div>
              </div>
            </div>
          </div>

          <div className="border flex flex-col border-black h-full max-h-[1000px] overflow-auto border-b-4 border-b-gray-700">
            {/* TABLE FOR LIST OF EMPLOYEE */}
            <div className="flex mt-1.5 ml-1 justify-start">
              <span className="prdc-color text-white flex justify-center items-center w-8">
                <BsSearch />
              </span>
              <input
                type="text"
                placeholder="Search. . ."
                className="border border-black px-1 arial-narrow w-35 h-7 focus:outline-none text-[14px]"
              />
            </div>
            <table className="w-[100%] h-[10%] border-separate border-spacing-4 border-transparent -mt-2 overflow-hidden">
              <thead>
                <tr className="shadow-sm shadow-gray-800  items-center justify-center prdc-color h-10 dark:(bg-blue-500) <md:(hidden)">
                  <th
                    className=" text-white  arial-narrow-bold pl-2 text-left cursor-pointer text-[11px] hover:(bg-yellow-900) <md:(hidden) dark:(border-white text-white) "
                    onClick={() => setSort("ID")}
                  >
                    Employee ID
                  </th>
                  <th
                    className=" text-white pl-2 arial-narrow-bold  text-left cursor-pointer text-[11px] hover:(bg-yellow-900) <md:(hidden) dark:(border-white text-white) "
                    onClick={() => setSort("ID")}
                  >
                    Full Name
                  </th>
                  <th
                    className=" text-white pl-2 arial-narrow-bold  text-left cursor-pointer text-[11px] hover:(bg-yellow-900) <md:(hidden) dark:(border-white text-white) "
                    onClick={() => setSort("ID")}
                  >
                    BIO
                  </th>
                </tr>
              </thead>
              <tbody>
                {hrEmployee.map((data) => (
                  <tr
                    onClick={() =>
                      setObjFilter({
                        ID: data.Employee_ID,
                        employee_data: data,
                      })
                    }
                    className="text-black cursor-pointer shadow-sm shadow-gray-600"
                  >
                    <td className="text-[12px] arial-narrow w-[30%] text-left  border border-gray-400 border-r-0 pl-2 py-2">
                      {data.Employee_ID}
                    </td>
                    <td className="arial-narrow text-[12px] w-[50%] text-left border border-gray-400 border-l-0 border-r-0 pl-2 py-2">
                      {data.Employee_LastName +
                        ", " +
                        data.Employee_FirstName +
                        " " +
                        data.Employee_MiddleName.charAt(0) +
                        "."}
                    </td>
                    <td className="arial-narrow text-[12px] w-[20%] text-left border border-gray-400 border-l-0 pl-2 py-2">
                      {data.Employee_BioID}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-auto flex items-center justify-center h-12 w-full">
              <button className="rounded-none w-[35%] bg-gray-800 text-white arial-narrow-bold">
                PAYROLL
              </button>
            </div>
          </div>
          {/* TABLE FOR LIST OF DATES ACCORDING TO CUT OFF CHOSEN */}
          <div className="border flex flex-col border-black border-b-4  overflow-auto border-b-gray-700 col-span-2 h-full max-h-[1000px]">
            {toggle == 1 ? (
              <HrTimeRecord
                cutList={cutList}
                dtr={dtr}
                CutOff={CutOff}
                ObjFilter={ObjFilter}
                setToggle={setToggle}
              />
            ) : toggle == 2 ? (
              <HrAdjustment
                cutList={cutList}
                dtr={dtr}
                CutOff={CutOff}
                ObjFilter={ObjFilter}
                setToggle={setToggle}
              />
            ) : toggle == 3 ? (
              <HrSummary
                setToggle={setToggle}
                ExcelData={ExcelData}
                ObjFilter={ObjFilter}
                chosenDate={chosenDate}
                CutOff={CutOff}
                cutList={cutList}
              />
            ) : (
              ""
            )}
          </div>
          <div className="border border-black border-b-4 border-b-gray-700 h-full max-h-[1000px] flex flex-col p-1">
            <div className="h-10 w-full flex items-center justify-center text-white prdc-color shadow-sm shadow-gray-900">
              <span className="arial-narrow-bold text-[12px]">
                EMPLOYEE'S INFORMATION
              </span>
            </div>

            {/* Name */}
            <div className="flex items-center p-4">
              <span className=" arial-narrow text-black text-[15px] inline-block w-20">
                NAME:
              </span>
              <p className="text-[15px] arial-narrow-bold text-black ml-6">
                {ObjFilter.ID !== ""
                  ? ObjFilter.employee_data.Employee_LastName +
                    ", " +
                    ObjFilter.employee_data.Employee_FirstName +
                    " " +
                    ObjFilter.employee_data.Employee_MiddleName?.charAt(0) +
                    "."
                  : " "}
              </p>
            </div>

            {/* Position */}
            <div className="flex items-center p-4">
              <span className=" arial-narrow text-black text-[15px] inline-block w-20">
                POSITION:
              </span>
              <p className="text-[15px] arial-narrow-bold text-black ml-6">
                {typeof ObjFilter.employee_data !== undefined
                  ? ObjFilter.employee_data.Employee_JobDesc
                  : " "}
              </p>
            </div>

            {/* Contract */}
            <div className="flex items-center p-4">
              <span className=" arial-narrow text-black text-[15px] inline-block w-20">
                CONTRACT:
              </span>
              <p className="text-[15px] arial-narrow-bold text-black ml-6">
                {typeof ObjFilter.employee_data !== undefined
                  ? ObjFilter.employee_data.Employee_TypeContract
                  : " "}
              </p>
            </div>

            {/* Schedule Type */}
            <div className="flex items-center p-4">
              <span className=" arial-narrow text-black text-[15px] inline-block w-27">
                SCHEDULE TYPE:
              </span>
              <p className="text-[15px] arial-narrow-bold text-black">
                {typeof ObjFilter.employee_data !== undefined
                  ? ObjFilter.employee_data.Employee_ScheduleType
                  : " "}
              </p>
            </div>

            {/* Schedule */}
            <div className="flex items-center justify-between p-4">
              <span className=" arial-narrow text-black text-[15px] inline-block w-20">
                SCHEDULE:
              </span>
              <p className="text-[12px] arial-narrow-bold text-black w-50 text-center">
                {typeof ObjFilter.employee_data !== undefined
                  ? ObjFilter.employee_data.Employee_Schedule
                  : " "}
              </p>
            </div>

            {/* Basic Pay */}
            <div className="flex items-center p-4">
              <span className="arial-narrow text-black text-[15px] inline-block w-20">
                BASIC PAY:
              </span>
              <p className="text-[15px] arial-narrow-bold text-black ml-6">
                {typeof ObjFilter.employee_data !== undefined
                  ? ObjFilter.employee_data.Employee_Salary
                  : " "}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex mt-auto mx-auto justify-center items-center">
              <button className="w-28 bg-gray-800 rounded-none mb-2 text-white arial-narrow-bold mr-2">
                PRINT
              </button>

              <button className="w-28 bg-gray-800 rounded-none mb-2 text-white arial-narrow-bold">
                VALIDATE
              </button>
            </div>
          </div>
        </div>
      </div>
      {addCutOffModal && <HrAddCutOff setAddCutOffModal={setAddCutOffModal} />}
      {openImportTR && (
        <HrImportTimeRecord
          setOpenImportTR={setOpenImportTR}
          hrEmployee={hrEmployee}
          setHrEmployee={setHrEmployee}
          CutOff={CutOff}
          setCutOff={setCutOff}
          setDtr={setDtr}
          dtr={dtr}
          cutList={cutList}
          ObjFilter={ObjFilter}
        />
      )}
      {openImportSummary && (
        <HrImportSummary
          setOpenImportSummary={setOpenImportSummary}
          setCutOff={setCutOff}
          hrEmployee={hrEmployee}
          setHrEmployee={setHrEmployee}
          ExcelData={ExcelData}
          setExcelData={setExcelData}
        />
      )}
    </div>
  );
};

export default Hr_Timekeeping;
