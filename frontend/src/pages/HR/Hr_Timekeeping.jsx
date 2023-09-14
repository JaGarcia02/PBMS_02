import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { API_URL_HR } from "../../utils/Url";
import { OutTable, ExcelRenderer } from "react-excel-renderer";
import moment from "moment";
import { useSelector } from "react-redux";
import { MdAddCircle, MdAccessTimeFilled, MdTimer } from "react-icons/md";
import { BsSearch, BsSave2Fill, BsFillCalendarPlusFill } from "react-icons/bs";
import { AiFillSave, AiFillFileExcel, AiFillFileAdd } from "react-icons/ai";
import HrTimeRecord from "../../components/HrComponents/HrTimekeeping/HrTimeRecord";
import HrSummary from "../../components/HrComponents/HrTimekeeping/HrSummary";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HrAddCutOff from "../../components/HrComponents/HrTimekeeping/HrAddCutOff";
import HrAdjustment from "../../components/HrComponents/HrTimekeeping/HrAdjustment";
import HrImportTimeRecord from "../../components/HrComponents/HrTimekeeping/HrImportTimeRecord";
import HrAddTimeRecord from "../../components/HrComponents/HrTimekeeping/HrAddTimeRecord";

const Hr_Timekeeping = () => {
  const { branding } = useSelector((state) => state.branding);
  const [hrEmployee, setHrEmployee] = useState([]);
  // const [ExcelData, setExcelData] = useState([]);
  const [timeRecordData, setTimeRecordData] = useState([]);
  const [cutList, setCutList] = useState([]);
  const [toggle, setToggle] = useState(1);
  const [chosenDate, setChosenDate] = useState([]);
  const [chosenCutOffDate, setChosenCutOffDate] = useState("");
  const [searchData, setSearchData] = useState("");

  const [ObjFilter, setObjFilter] = useState({
    ID: "",
    Bio: "",
    employee_data: [],
  });
  const [addCutOffModal, setAddCutOffModal] = useState(false);
  const [dtr, setDtr] = useState([]);
  const [cutOffId, setCutOffId] = useState({
    dateStart: "",
    dateEnd: "",
  });
  // import time record
  const [openImportTR, setOpenImportTR] = useState(false);
  // import summary
  const [openInsertTimeRecord, setOpenInsertTimeRecord] = useState(false);

  useEffect(() => {
    axios
      .get(API_URL_HR + `get-employee-list/?q=`)
      .then((res) => setHrEmployee(res.data))
      .catch((err) => console.log(err));

    axios
      .get(API_URL_HR + "get-timekeepingrecord")
      .then((res) => {
        setTimeRecordData(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(API_URL_HR + "view-cutoff-category")
      .then((res) => {
        setChosenDate(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // function getRange(startDate, endDate, type) {
  //   let fromDate = moment(startDate);
  //   let toDate = moment(endDate);
  //   let diff = toDate.diff(fromDate, type);
  //   let range = [];
  //   for (let i = 0; i <= diff; i++) {
  //     range.push(moment(startDate).add(i, type));
  //   }
  //   setCutList(range.map((item) => item._d));
  // }

  // useEffect(() => {
  //   const split = chosenDate.split("_");
  //   getRange(split[0], split[1], "days");
  // }, [chosenDate]);

  // This is for the exel data to render

  // const handleChange = (event, objectname, ID) => {
  //   let ObjIndex = ExcelData.findIndex((obj) => obj.Employee_ID == ID);

  //   let object = ExcelData[ObjIndex];

  //   object[objectname] = event;

  //   setExcelData([...ExcelData]);
  // };

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
              <div className="flex items-center">
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
                  // onClick={SaveButton}
                /> */}
              </div>
              <div className="flex-col items-center">
                <span className="arial-narrow-bold text-black text-[15px] inline-block mr-2">
                  Cutoff dates:{" "}
                </span>
                <select
                  onChange={(e) => setChosenCutOffDate(e.target.value)}
                  className="text-[14px] px-2 w-56 arial-narrow-bold h-6.5 rounded-sm border-[2px] border-gray-700 hover:cursor-pointer"
                >
                  <option value="">Select cutoff date</option>
                  {chosenDate.map((data) => {
                    return (
                      <>
                        <option value={data.cutOff}>{data.cutOff}</option>
                      </>
                    );
                  })}

                  {/* {[
                    ...new Set(CutOff.data?.dtr?.map((item) => item.cutOffID)),
                    <option selected hidden>
                      Choose Cut off
                    </option>,
                  ].map((data) => (
                    <option>{data}</option>
                  ))}
                  */}
                </select>
                <div className="mt-2">
                  <span className="arial-narrow-bold text-black text-[15px] inline-block mr-3.5">
                    Cutoff Year:
                  </span>
                  <select className="text-[14px] px-2 w-35 arial-narrow-bold h-6.5 rounded-sm border-[2px] border-gray-700 hover:cursor-pointer">
                    <option value="">Select cutoff year</option>
                    {chosenDate.map((data) => {
                      return (
                        <>
                          <option value={data.cutOff_year}>
                            {data.cutOff_year}
                          </option>
                        </>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex justify-end items-center h-full">
                {/* <label
                  for="dtr-upload"
                  className="w-[75%] bg-gray-700 mr-8 text-white arial-narrow-bold cursor-pointer text-center mb-2"
                >
                  ADD TIME RECORD
                </label>
                <input
                  id="dtr-upload"
                  type="file"
                  // onChange={handleDTR}
                  className="hidden"
                /> */}

                {/* <label
                  for="EmpSum"
                  className="w-[50%] bg-gray-700 text-white mr-2 arial-narrow cursor-pointer text-center mb-2"
                >
                  IMPORT SUMMARY
                </label>
                <input
                  id="EmpSum"
                  type="file"
                  className="hidden"
                  // onChange={handleFile}
                /> */}

                <div className="flex flex-col justify-center items-center mr-2 h-[100%]">
                  <button
                    className="arial-narrow-bold prdc-color mb-2 mt-2 text-white text-[14px] w-55 h-6.5 justify-center border-[2.5px] rounded-sm hover:(rounded-sm) p-1  flex items-center focus:(outline-none)  transition ease-in-out duration-[0.5s] rounded-sm  hover:(text-black border-black bg-white)"
                    onClick={() => setAddCutOffModal(true)}
                  >
                    <BsFillCalendarPlusFill className="mr-2" />
                    Create Cut-off
                  </button>
                  <button
                    className="arial-narrow-bold prdc-color mb-2 text-white text-[14px] w-55 h-6.5 justify-center border-[2.5px] rounded-sm hover:(rounded-sm) p-1  flex items-center focus:(outline-none)  transition ease-in-out duration-[0.5s] rounded-sm  hover:(text-black border-black bg-white)"
                    onClick={() => setOpenInsertTimeRecord(true)}
                  >
                    <MdTimer className="mr-2" />
                    Insert Time Record
                  </button>
                  {/* <button
                    className="prdc-color text-white arial-narrow-bold rounded-sm h-7 w-55 h-6.5 flex justify-center items-center mb-2 focus:outline-none transition ease-in-out duration-[0.5s] hover:( border-[2px] border-black bg-white text-black)"
                    onClick={() => setOpenImportTR(true)}
                  >
                    <AiFillFileAdd className="mr-2" />
                    Import Time Record
                  </button> */}
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
                onChange={(e) => setSearchData(e.target.value)}
                className="border border-black px-1 arial-narrow w-35 h-7 focus:outline-none text-[14px]"
              />
            </div>
            <div className="w-full h-full flex justify-center pb-5">
              <div className="w-[100%]">
                <table className="w-[100%] h-[10%] border-white overflow-hidden justify-evenly border-separate border-spacing-4 arial-narrow-bold">
                  <thead>
                    <tr className="shadow-sm shadow-gray-800 prdc-color h-10 text-center w-[100%] flex justify-between items-center">
                      <th className="w-[20%] text-white text-[12px]">
                        Employee ID
                      </th>
                      <th className="w-[50%] text-white text-[12px]">
                        Full Name
                      </th>

                      <th className="w-[15%] text-white text-[12px]">BIO</th>
                    </tr>
                    {/* <tr className="shadow-sm shadow-gray-800 prdc-color">
                  <th
                    className="text-white arial-narrow-bold cursor-pointer text-[11px] h-10 flex justify-center items-center"
                    onClick={() => setSort("ID")}
                  >
                    Employee ID
                  </th>
                  <th
                    className="text-white arial-narrow-bold cursor-pointer text-[11px] "
                    onClick={() => setSort("ID")}
                  >
                    Last Name
                  </th>
                  <th className="text-white text-[11px]">First Name</th>
                  <th className="text-white text-[11px]">MI</th>
                  <th
                    className=" text-white arial-narrow-bold text-left text-[11px] flex justify-center items-center"
                    onClick={() => setSort("ID")}
                  >
                    BIO
                  </th>
                </tr> */}
                  </thead>
                  <tbody>
                    {hrEmployee
                      .filter((val) => {
                        if (
                          val.Employee_ID.toLowerCase().includes(
                            searchData.toLocaleLowerCase()
                          )
                        ) {
                          return val;
                        } else if (
                          val.Employee_BioID.toLowerCase().includes(
                            searchData.toLocaleLowerCase()
                          )
                        ) {
                          return val;
                        }
                      })
                      .map((data) => (
                        <tr
                          onClick={() =>
                            setObjFilter({
                              ID: data.Employee_ID,
                              Bio: data.Employee_BioID,
                              employee_data: data,
                            })
                          }
                          className="w-[100%] h-10 flex justify-center items-center shadow cursor-pointer"
                        >
                          <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-l border-t bg-white border-b-black border-t-black border-l-black arial-narrow text-black">
                            {data.Employee_ID}
                          </td>
                          <td className="flex justify-center items-center text-[12px] w-[65%] h-8 text-center arial-narrow text-black border-b border-t bg-white border-b-black border-t-black border-l-black">
                            {data.Employee_LastName +
                              ", " +
                              data.Employee_FirstName +
                              " " +
                              data.Employee_MiddleName.charAt(0) +
                              "."}
                          </td>

                          <td className="flex justify-center items-center text-[12px] w-[15%] h-8 text-center arial-narrow text-black border-b border-t border-r bg-white border-b-black border-t-black border-l-black border-r-black">
                            {data.Employee_BioID}
                          </td>
                          {/* <td className="text-[12px] arial-narrow w-[10%] text-left  border border-gray-400 border-r-0 pl-2 py-2">
                            {data.Employee_ID}
                          </td>
                          <td className="arial-narrow text-[12px] w-[10%] text-left border border-gray-400 border-l-0 border-r-0 pl-2 py-2">
                            {
                              data.Employee_LastName
                              // +
                              //   ", " +
                              //   data.Employee_FirstName +
                              //   " " +
                              //   data.Employee_MiddleName.charAt(0) +
                              //   "."
                            }
                            {","}
                          </td>
                          <td className="arial-narrow text-[12px] w-[10%] text-left border border-gray-400 border-l-0 border-r-0 pl-2 py-2">
                            {data.Employee_FirstName}
                          </td>
                          <td className="arial-narrow text-[12px] w-[1%] text-left border border-gray-400 border-l-0 border-r-0 pl-2 py-2">
                            {data.Employee_MiddleName.charAt(0)}
                          </td>
                          <td className="arial-narrow text-[12px] w-[10%] text-left border border-gray-400 border-l-0 pl-2 py-2">
                            {data.Employee_BioID}
                          </td> */}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
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
                timeRecordData={timeRecordData}
                chosenCutOffDate={chosenCutOffDate}
                ObjFilter={ObjFilter}
                setToggle={setToggle}
              />
            ) : toggle == 2 ? (
              <HrAdjustment
                cutList={cutList}
                dtr={dtr}
                timeRecordData={timeRecordData}
                ObjFilter={ObjFilter}
                setToggle={setToggle}
              />
            ) : toggle == 3 ? (
              <HrSummary
                setToggle={setToggle}
                ExcelData={ExcelData}
                ObjFilter={ObjFilter}
                timeRecordData={timeRecordData}
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

            <div className="flex w-[100%] items-center justify-start p-2 h-10 mt-2 shadow shadow-gray-500">
              <span className="text-[18px] arial-narrow-bold mr-2">Name:</span>
              <p className="text-[16px] arial-narrow">
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

            <div className="flex justify-start items-center w-[100%] mt-2 p-2 h-10 shadow shadow-gray-500">
              {/* Position */}
              <div className="w-[50%] flex items-center h-10">
                <span className="text-[18px] arial-narrow-bold mr-2">
                  Position:
                </span>
                <p className="text-[16px] arial-narrow">
                  {typeof ObjFilter.employee_data !== undefined
                    ? ObjFilter.employee_data.Employee_JobDesc
                    : " "}
                </p>
              </div>
            </div>
            <div className="flex w-[100%] mt-2 p-2 h-10 shadow shadow-gray-500">
              {/* Basic pay */}
              <div className="w-[100%] flex items-center">
                <span className="text-[18px] arial-narrow-bold mr-2">
                  Basic pay:
                </span>
                <p className="text-[16px] arial-narrow">
                  {typeof ObjFilter.employee_data !== undefined
                    ? ObjFilter.employee_data.Employee_Salary
                    : " "}
                </p>
              </div>
            </div>

            <div className="flex justify-start items-center w-[100%] mt-2 p-2 h-10 shadow shadow-gray-500">
              {/* Contract */}
              <div className="w-[100%] flex items-center h-10">
                <span className="text-[18px] arial-narrow-bold mr-1">
                  Contract:
                </span>
                <p className="text-[16px] arial-narrow">
                  {typeof ObjFilter.employee_data !== undefined
                    ? ObjFilter.employee_data.Employee_TypeContract
                    : " "}
                </p>
              </div>
            </div>

            <div className="flex justify-start items-center w-[100%] mt-2 p-2 h-10 shadow shadow-gray-500">
              {/* Schedule Type */}
              <div className="w-[100%] flex items-center h-10">
                <span className="text-[18px] arial-narrow-bold mr-1">
                  Shedule Type:
                </span>
                <p className="text-[16px] arial-narrow">
                  {typeof ObjFilter.employee_data !== undefined
                    ? ObjFilter.employee_data.Employee_ScheduleType
                    : " "}
                </p>
              </div>
            </div>

            {/* Schedule */}
            <div className="items-center justify-start mt-2 p-2 h-14 shadow shadow-gray-500">
              <div className="flex">
                <span className="text-[18px] arial-narrow-bold">
                  Employee Shcedule:
                </span>
              </div>
              <p className="text-[12px] arial-narrow mt-1">
                {typeof ObjFilter.employee_data !== undefined
                  ? ObjFilter.employee_data.Employee_Schedule
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
      {openInsertTimeRecord && (
        <HrAddTimeRecord
          setOpenInsertTimeRecord={setOpenInsertTimeRecord}
          setTimeRecordData={setTimeRecordData}
          timeRecordData={timeRecordData}
        />
      )}
      {/* {openImportTR && (
        <HrImportTimeRecord
          setOpenImportTR={setOpenImportTR}
          hrEmployee={hrEmployee}
          setHrEmployee={setHrEmployee}
          CutOff={CutOff}
          setCutOff={setCutOff}
          setDtr={setDtr}
          dtr={dtr}
          // cutList={cutList}
          ObjFilter={ObjFilter}
        />
      )} */}
    </div>
  );
};

export default Hr_Timekeeping;
