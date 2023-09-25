import React, { useState } from "react";
import moment from "moment";
import HrEditSummary from "./HrEditSummary";
import { BiSave, BiEdit } from "react-icons/bi";

const HrSummary = ({
  setToggle,
  ObjFilter,
  timeRecordData,
  chosenCutOffDate,
}) => {
  console.log(timeRecordData);
  // console.log(ObjFilter.ID);
  // console.log(chosenCutOffDate);
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
            <table className="w-[100%] h-[10%] border-white overflow-hidden  justify-evenly border-separate border-spacing-4">
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
                  {chosenCutOffDate == "" ? (
                    ""
                  ) : (
                    <>
                      {ObjFilter.ID == "" || ObjFilter.Bio == "" ? (
                        ""
                      ) : (
                        <>
                          {timeRecordData
                            .filter(
                              (fil) =>
                                fil.EmpID == ObjFilter.ID &&
                                fil.Cutoff == chosenCutOffDate
                            )
                            .map((data) => {
                              // Time Rules
                              const Initial_Probationary = "2023-09-01T07:30";
                              const Initial_Regular = "2023-09-01T08:30";

                              const TimeIn = data.Time_in;
                              const BreakTimeStart = data.Time_break_start;
                              const BreakTimeEnd = data.Time_break_end;
                              const TimeOut = data.Time_out;

                              const Probationary =
                                moment(Initial_Probationary).format("HH:mm");

                              const Regular =
                                moment(Initial_Regular).format("HH:mm");

                              // Regular hour
                              const REG_InitialValue = moment(TimeOut).diff(
                                moment(TimeIn) +
                                  moment(BreakTimeEnd).diff(
                                    moment(BreakTimeStart),
                                    "hours"
                                  ),
                                "hours"
                              );

                              // Lates
                              const TimeIn_split_value = moment(TimeIn)
                                .format("HH:mm")
                                .split(":");
                              // Converted to minutes
                              const timeIn_hour_converted_to_minutes =
                                TimeIn_split_value[0] * 60 * (60 * 1000);
                              const timeIn_mins =
                                TimeIn_split_value[1] * 60 * 1000;

                              // Converted to minutes
                              const Probi_split_value = Probationary.split(":");
                              const probi_hours_converted_to_minutes =
                                Probi_split_value[0] * 60 * (60 * 1000);
                              const probi_mins =
                                Probi_split_value[1] * 60 * 1000;

                              // Converted to minutes
                              const Reg_split_value = Regular.split(":");
                              const reg_hours_converted_to_minutes =
                                Reg_split_value[0] * 60 * (60 * 1000);
                              const reg_mins = Reg_split_value[1] * 60 * 1000;

                              // Equation for Lates
                              const For_Regular_Lates_Rquation =
                                timeIn_hour_converted_to_minutes -
                                reg_hours_converted_to_minutes +
                                (timeIn_mins - reg_mins);

                              const For_Probationary_Lates_Rquation =
                                timeIn_hour_converted_to_minutes -
                                probi_hours_converted_to_minutes +
                                (timeIn_mins - probi_mins);

                              // Official Data
                              const REG =
                                REG_InitialValue > 8 ? 8 : REG_InitialValue;

                              return (
                                <>
                                  <span>{data.Cutoff}</span>
                                  <tr className="w-[100%] h-10 flex justify-center items-center cursor-pointer text-center arial-narrow">
                                    <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-l border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                                      {REG}
                                    </td>
                                    <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black "></td>
                                    <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black "></td>
                                    <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black "></td>
                                    <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black "></td>
                                    <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black "></td>
                                    <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black "></td>

                                    {data.Schedle_Type ==
                                    "Compressed : Monday - Friday | 07:30:00 - 18:00:00" ? (
                                      <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                                        {For_Probationary_Lates_Rquation /
                                          60000}
                                      </td>
                                    ) : (
                                      ""
                                    )}

                                    {data.Schedle_Type ==
                                    "Regular : Monday - Friday | 08:30:00 - 17:30:00" ? (
                                      <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                                        {For_Regular_Lates_Rquation / 60000}
                                      </td>
                                    ) : (
                                      ""
                                    )}

                                    <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t border-r bg-white border-b-black border-t-black border-l-black border-r-black text-left arial-narrow text-black "></td>
                                  </tr>
                                </>
                              );
                            })}
                        </>
                      )}
                    </>
                  )}
                </div>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default HrSummary;
