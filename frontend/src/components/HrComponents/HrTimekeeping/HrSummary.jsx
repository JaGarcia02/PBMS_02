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

  // console.log(ObjFilter);

  const test1 = timeRecordData
    ?.filter(
      (fil) => fil.Cutoff == chosenCutOffDate && fil.EmpID == ObjFilter.ID
    )
    ?.map((data) => data);

  for (let i = 0; i < test1.length; i++) {
    const T_in = moment(test1[i].Time_in).format("HH:mm");
    const T_out = moment(test1[i].Time_out).format("HH:mm");

    // const T_in_Hours = T_in.split(":")[0] * 60 * (60 * 1000);
    // const T_in_Mins = T_out.split(":")[1] * 60 * 1000;

    console.log(T_in);
  }

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
