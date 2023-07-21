import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { API_URL_HR } from "../../utils/Url";
import { OutTable, ExcelRenderer } from "react-excel-renderer";
import moment from "moment";
import { useSelector } from "react-redux";
import { MdAddCircle } from "react-icons/md";
import HrTimeRecord from "../../components/HrComponents/HrTimekeeping/HrTimeRecord";
import HrSummary from "../../components/HrComponents/HrTimekeeping/HrSummary";

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
  const [dtr, setDtr] = useState([]);
  const [cutOffId, setCutOffId] = useState({
    dateStart: "",
    dateEnd: "",
  });

  useEffect(() => {
    axios
      .get(API_URL_HR + `get-employee-list/?q=`)
      .then((res) => setHrEmployee(res.data))
      .catch((err) => console.log(err));

    axios
      .get(API_URL_HR + "get-cutdata")
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

  const handleFile = (e) => {
    const file = e.target.files[0];
    ExcelRenderer(file, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        let newRows = [];
        res.rows.slice(1).map((row, index) => {
          if (row && row !== "undefined!") {
            newRows.push({
              Employee_ID: row[1],
              REG: row[2],
              LATES: row[3],
              OT: row[4],
            });
          }
        });

        setExcelData(newRows);
      }
    });
  };

  const handleDTR = (e) => {
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
              Employee: row[1],
            });
          }
        });

        setDtr(newRows);
      }
    });
  };

  const SaveButton = () => {
    const timeKeepingData = hrEmployee.map((data) => {
      return {
        cutOffID: cutOffId.dateStart + "_" + cutOffId.dateEnd,
        REG: ExcelData.filter((fil) => fil.Employee_ID == data.Employee_ID)[0]
          ?.REG,
        ABSENT: ExcelData.filter(
          (fil) => fil.Employee_ID == data.Employee_ID
        )[0]?.ABSENT,
        Employee_ID: ExcelData.filter(
          (fil) => fil.Employee_ID == data.Employee_ID
        )[0]?.Employee_ID,
      };
    });

    axios
      .post(API_URL_HR + "save-cutoff", { timeKeepingData })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const handleChange = (event, objectname, ID) => {
    let ObjIndex = ExcelData.findIndex((obj) => obj.Employee_ID == ID);

    let object = ExcelData[ObjIndex];

    object[objectname] = event;

    setExcelData([...ExcelData]);
  };

  console.log(ObjFilter);

  return (
    <div className="flex flex-col h-screen w-screen">
      <Navbar />
      <div className="flex h-full w-full flex-col mt-15 p-4 items-center max-h-[2000px] justify-center">
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
                  BRANCH:{" "}
                </span>
                <p className="text-[15px] arial-narrow text-black">Internal</p>
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex items-center mb-3">
                <span className=" arial-narrow-bold text-black text-[15px] inline-block w-25">
                  ADD CUT-OFF:
                </span>
                <input
                  type="date"
                  className="border border-gray-700 mr-2 h-4 text-[12px] arial-narrow"
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
                  className="border border-gray-700 h-4 text-[12px] arial-narrow ml-2"
                  onChange={(e) =>
                    setCutOffId({
                      ...cutOffId,
                      dateEnd: moment(e.target.value).format("MM-DD-YYYY"),
                    })
                  }
                />
                <MdAddCircle className="ml-2 text-gray-700 cursor-pointer" />
              </div>
              <div className="flex items-center">
                <span className="arial-narrow-bold text-black text-[15px] inline-block w-25">
                  CUT-OFF:{" "}
                </span>
                <select
                  onChange={(e) => setChosenDate(e.target.value)}
                  className="text-[12px] w-50 arial-narrow h-4 border border-gray-700"
                >
                  {[...new Set(CutOff.map((item) => item.cutOffID))].map(
                    (data) => (
                      <option>{data}</option>
                    )
                  )}
                </select>
              </div>
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex flex-col justify-end items-end h-full">
                <label
                  for="EmpSum"
                  className="w-[50%] bg-gray-700 text-white mr-2 arial-narrow cursor-pointer text-center mb-2"
                >
                  IMPORT SUMMARY
                </label>
                <button className="w-[50%] bg-gray-700 rounded-none text-white mr-2 arial-narrow cursor-pointer text-center mb-2">
                  PRINT
                </button>
                <input
                  id="EmpSum"
                  type="file"
                  className="hidden"
                  onChange={handleFile}
                />
              </div>
            </div>
          </div>

          <div className="border flex flex-col border-black h-full max-h-[1000px] overflow-auto border-b-4 border-b-gray-700">
            {/* TABLE FOR LIST OF EMPLOYEE */}
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
                VALIDATE
              </button>{" "}
            </div>
          </div>
          {/* TABLE FOR LIST OF DATES ACCORDING TO CUT OFF CHOSEN */}
          <div className="border flex flex-col border-black border-b-4  overflow-auto border-b-gray-700 col-span-2 h-full max-h-[1000px]">
            {toggle == 1 ? (
              <HrTimeRecord
                cutList={cutList}
                dtr={dtr}
                handleDTR={handleDTR}
                ObjFilter={ObjFilter}
                setToggle={setToggle}
              />
            ) : toggle == 3 ? (
              <HrSummary
                setToggle={setToggle}
                ExcelData={ExcelData}
                ObjFilter={ObjFilter}
                chosenDate={chosenDate}
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
            <div className="flex items-center p-4">
              <span className=" arial-narrow text-black text-[15px] inline-block w-25">
                NAME:
              </span>
              <p className="text-[15px] arial-narrow-bold text-black">
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
            <div className="flex items-center p-4">
              <span className=" arial-narrow text-black text-[15px] inline-block w-25">
                POSITION:
              </span>
              <p className="text-[15px] arial-narrow-bold text-black">
                {typeof ObjFilter.employee_data !== undefined
                  ? ObjFilter.employee_data.Employee_JobDesc
                  : " "}
              </p>
            </div>
            <div className="flex items-center p-4">
              <span className=" arial-narrow text-black text-[15px] inline-block w-25">
                CONTRACT:
              </span>
              <p className="text-[15px] arial-narrow-bold text-black">
                {typeof ObjFilter.employee_data !== undefined
                  ? ObjFilter.employee_data.Employee_TypeContract
                  : " "}
              </p>
            </div>
            <div className="flex items-center p-4">
              <span className=" arial-narrow text-black text-[15px] inline-block w-25">
                SCHEDULE TYPE:
              </span>
              <p className="text-[15px] arial-narrow-bold text-black">
                {typeof ObjFilter.employee_data !== undefined
                  ? ObjFilter.employee_data.Employee_ScheduleType
                  : " "}
              </p>
            </div>
            <div className="flex items-center p-4">
              <span className=" arial-narrow text-black text-[15px] inline-block w-25">
                SCHEDULE:
              </span>
              <p className="text-[15px] arial-narrow-bold text-black">
                {typeof ObjFilter.employee_data !== undefined
                  ? ObjFilter.employee_data.Employee_Schedule
                  : " "}
              </p>
            </div>
            <div className="flex items-center p-4">
              <span className=" arial-narrow text-black text-[15px] inline-block w-25">
                BASIC PAY:
              </span>
              <p className="text-[15px] arial-narrow-bold text-black">
                {typeof ObjFilter.employee_data !== undefined
                  ? ObjFilter.employee_data.Employee_Salary
                  : " "}
              </p>
            </div>
            <button className="mt-auto mx-auto w-28 bg-gray-800 rounded-none mb-2 text-white arial-narrow-bold">
              PAYROLL
            </button>
          </div>
        </div>

        {/*ExcelData.filter((fil) => fil.Employee_ID == ObjFilter).map((dat) => (
          <>
            <p>{dat.Employee_LastName}</p>
            <input
              className=""
              value={dat.REG}
              onChange={(e) =>
                handleChange(e.target.value, "REG", dat.Employee_ID)
              }
            />
          </>
            ))*/}
        {/* <button onClick={SaveButton}>Save</button>
        <table>
          <tr>
            <th>Dates</th>
            <th>In</th>
            <th>Out</th>
            <th>In</th>
            <th>Out</th>
          </tr>
          {cutList.map((dates) => (
            <tr>
              <td>{moment(dates).format("MMM-DD-YYYY, ddd")}</td>
              {dtr
                .sort((before, after) =>
                  moment(before.Time).diff(moment(after.Time))
                )
                .filter(
                  (fil, index, self) =>
                    moment(fil.Time).format("MMM-DD-YYYY, ddd") ==
                      moment(dates).format("MMM-DD-YYYY, ddd") &&
                    fil.Employee == ObjFilter &&
                    index ==
                      self.findIndex(
                        (t) =>
                          moment(fil.Time).diff(moment(t.Time), "minutes") <=
                            5 && fil.Employee == t.Employee
                      )
                )
                .map((time) => (
                  <td>{moment(time.Time).format("hh:mm a")}</td>
                ))}
            </tr>
          ))}
        </table> */}
      </div>
    </div>
  );
};

export default Hr_Timekeeping;
