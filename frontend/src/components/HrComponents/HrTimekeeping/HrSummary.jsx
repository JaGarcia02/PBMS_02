import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import HrEditSummary from "./HrEditSummary";
import { BiSave, BiEdit } from "react-icons/bi";
import { API_URL_HR } from "../../../utils/Url";

const HrSummary = ({
  setToggle,
  ObjFilter,
  timeRecordData,
  chosenCutOffDate,
}) => {
  const [cutOffData, setCutOffData] = useState([]);
  const [Total_Reg, setTotal_Reg] = useState(0);
  const [Total_Lates, setTotal_Lates] = useState(0);

  // =========================================== This is for total Reg hours based on chosen cutoff =========================================== //
  let sum_of_hours_TimeIn = 0;
  let sum_of_mins_TimeIn = 0;
  let sum_of_hours_TimeOut = 0;
  let sum_of_mins_TimeOut = 0;
  const EmpTime_In = timeRecordData
    ?.filter(
      (fil) => fil.Cutoff == chosenCutOffDate && fil.EmpID == ObjFilter.ID
    )
    ?.map((data) => moment(data.Time_in).format("HH:mm"));

  for (let i = 0; i < EmpTime_In.length; i++) {
    const T_in_Hours = EmpTime_In[i].split(":")[0] * 60 * (60 * 1000);
    const T_in_Mins = EmpTime_In[i].split(":")[1] * 60 * 1000;
    sum_of_hours_TimeIn += T_in_Hours;
    sum_of_mins_TimeIn += T_in_Mins;
  }

  const EmpTime_out = timeRecordData
    ?.filter(
      (fil) => fil.Cutoff == chosenCutOffDate && fil.EmpID == ObjFilter.ID
    )
    ?.map((data) => moment(data.Time_out).format("HH:mm"));

  for (let i = 0; i < EmpTime_out.length; i++) {
    const T_out_Hours = EmpTime_out[i].split(":")[0] * 60 * (60 * 1000);
    const T_out_Mins = EmpTime_out[i].split(":")[1] * 60 * 1000;
    sum_of_hours_TimeOut += T_out_Hours;
    sum_of_mins_TimeOut += T_out_Mins;
  }

  // =========================================== This is for total Reg hours based on chosen cutoff =========================================== //

  // =========================================== This is for Lates =========================================== //
  const Emp_Probi_TimeIn = "7:30";
  const Emp_Probi_TimeIn_Split = Emp_Probi_TimeIn.split(":");
  const Emp_Probi_Hours = Emp_Probi_TimeIn_Split[0] * 60 * (60 * 1000);
  const Emp_Probi_Mins = Emp_Probi_TimeIn_Split[1] * 60 * 1000;

  const Emp_Probi_TimeIn_Sched = Emp_Probi_Hours + Emp_Probi_Mins;

  const Emp_Regular_TimeOut = "8:30";
  const Emp_Regular_TimeOut_Split = Emp_Regular_TimeOut.split(":");
  const Emp_Hours_Reg = Emp_Regular_TimeOut_Split[0] * 60 * (60 * 1000);
  const Emp_Mins_Reg = Emp_Regular_TimeOut_Split[1] * 60 * 1000;

  const Emp_Reg_TimeIn_Sched = Emp_Hours_Reg + Emp_Mins_Reg;
  // =========================================== This is for Lates =========================================== //

  useEffect(() => {
    const total_time_in = sum_of_hours_TimeIn + sum_of_mins_TimeIn;
    const total_time_out = sum_of_hours_TimeOut + sum_of_mins_TimeOut;
    const Total_Reg_Hours = total_time_in + total_time_out;
    setTotal_Reg(Total_Reg_Hours);
  }, [
    sum_of_hours_TimeIn,
    sum_of_mins_TimeIn,
    sum_of_hours_TimeOut,
    sum_of_mins_TimeOut,
  ]);

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

  return (
    <>
      <div className="flex flex-col w-full  p-1 items-center">
        <div className="relative prdc-color flex items-center justify-center text-[12px] w-full h-10 shadow-sm shadow-gray-900 text-white  arial-narrow-bold">
          EMPLOYEE'S WORK SUMMARY
          <select
            onChange={(e) => setToggle(e.target.value)}
            className="absolute right-2 w-40 h-6.5 outline-none appearance-none rounded-sm px-1 text-[14px] arial-narrow bg-icon2"
          >
            <option value={1}>BIOMETRICS</option>
            <option value={2}>ADJUSTMENT</option>
            <option selected value={3}>
              SUMMARY
            </option>
          </select>
        </div>
        <div className="w-[100%]">
          <div className="w-full mt-2 px-1">
            {ObjFilter.ID == "" ||
            ObjFilter.Bio == "" ||
            chosenCutOffDate == "" ? (
              <table className="w-[100%] h-[10%] border-white overflow-hidden justify-evenly border-separate border-spacing-4">
                <thead>
                  <tr className="shadow-sm shadow-gray-800 prdc-color h-10  text-center w-[100%] flex justify-between items-center text-white arial-narrow-bold text-[14px]">
                    <th className="w-[25%]">REG</th>
                    <th className="w-[25%]">OT</th>
                    <th className="w-[25%]">UT</th>
                    <th className="w-[25%]">ND</th>
                    <th className="w-[25%]">LWP</th>
                    <th className="w-[25%]">REGNS</th>
                    <th className="w-[25%]">OTNS</th>
                    <th className="w-[25%]">OTND</th>
                    <th className="w-[25%]">LATES</th>
                    <th className="w-[25%]">ABSENT</th>
                  </tr>
                </thead>
                {/* <tbody>
                  <div className="h-10 overflow-auto">
                    <tr className="w-[100%] h-10 flex justify-center items-center cursor-pointer text-center arial-narrow">
                      <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-l border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black "></td>
                      <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black "></td>
                      <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black "></td>
                      <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black "></td>
                      <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black "></td>
                      <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black "></td>
                      <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black "></td>
                      <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black "></td>
                      <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t border-r bg-white border-b-black border-t-black border-l-black border-r-black text-left arial-narrow text-black "></td>
                    </tr>
                  </div>
                </tbody> */}
              </table>
            ) : (
              <table className="w-[100%] h-[10%] border-white overflow-hidden justify-evenly border-separate border-spacing-4">
                <thead>
                  <tr className="shadow-sm shadow-gray-800 prdc-color h-10  text-center w-[100%] flex justify-between items-center text-white arial-narrow-bold text-[14px]">
                    <th className="w-[25%]">REG</th>
                    <th className="w-[25%]">OT</th>
                    <th className="w-[25%]">UT</th>
                    <th className="w-[25%]">ND</th>
                    <th className="w-[25%]">LWP</th>
                    <th className="w-[25%]">REGNS</th>
                    <th className="w-[25%]">OTNS</th>
                    <th className="w-[25%]">OTND</th>
                    <th className="w-[25%]">LATES</th>
                    <th className="w-[25%]">ABSENT</th>
                  </tr>
                </thead>
                <tbody>
                  <div className="h-10 overflow-auto">
                    <tr className="w-[100%] h-10 flex justify-center items-center cursor-pointer text-center arial-narrow">
                      <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-l border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                        {Math.round((Total_Reg / 3600000) * 100) / 100}
                      </td>
                      <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black "></td>
                      <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black "></td>
                      <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black "></td>
                      <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black "></td>
                      <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black "></td>
                      <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black "></td>

                      {ObjFilter.employee_data.Employee_Schedule ==
                      "Compressed : Monday - Friday | 07:30:00 - 18:00:00" ? (
                        <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                          {Emp_Probi_TimeIn_Sched - Total_Reg}
                        </td>
                      ) : (
                        ""
                      )}

                      {ObjFilter.employee_data.Employee_Schedule ==
                      "Regular : Monday - Friday | 08:30:00 - 17:30:00" ? (
                        <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                          {" "}
                          {Emp_Reg_TimeIn_Sched - Total_Reg}
                        </td>
                      ) : (
                        ""
                      )}

                      <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t border-r bg-white border-b-black border-t-black border-l-black border-r-black text-left arial-narrow text-black "></td>
                    </tr>
                  </div>
                </tbody>
              </table>
            )}

            {/* <table className="w-[100%] h-[10%] border-white overflow-hidden  justify-evenly border-separate border-spacing-4">
                    <thead>
                      <tr className="shadow-sm shadow-gray-800 prdc-color h-10  text-center w-[100%] flex justify-between items-center text-white arial-narrow-bold text-[14px]">
                        <th className="w-[25%]">REG</th>
                        <th className="w-[25%]">OT</th>
                        <th className="w-[25%]">UT</th>
                        <th className="w-[25%]">ND</th>
                        <th className="w-[25%]">LWP</th>
                        <th className="w-[25%]">REGNS</th>
                        <th className="w-[25%]">OTNS</th>
                        <th className="w-[25%]">OTND</th>
                        <th className="w-[25%]">LATES</th>
                        <th className="w-[25%]">ABSENT</th>
                      </tr>
                    </thead>
                    <tbody>
                      <div className="h-55 overflow-auto">
                        <tr className="w-[100%] h-10 flex justify-center items-center cursor-pointer text-center arial-narrow">
                          <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-l border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black "></td>
                          <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black "></td>
                          <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black "></td>
                          <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black "></td>
                          <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black "></td>
                          <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black "></td>
                          <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black "></td>
                          <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black "></td>
                          <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t border-r bg-white border-b-black border-t-black border-l-black border-r-black text-left arial-narrow text-black "></td>
                        </tr>
                      </div>
                    </tbody>
                  </table> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default HrSummary;
