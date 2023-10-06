import React, { useEffect, useState } from "react";
import moment from "moment";

const HrTimeRecord = ({
  ObjFilter,
  setToggle,
  timeRecordData,
  chosenCutOffDate,
}) => {
  const [chosenTimeRecordData, setChosenTimeRecordData] = useState({
    id: "",
  });

  return (
    <>
      <div className="flex flex-col w-full  p-1 items-center">
        <div className="relative prdc-color flex items-center justify-center text-[12px] w-full h-10 shadow-sm shadow-gray-900 text-white  arial-narrow-bold">
          EMPLOYEE'S TIME RECORD
          <select
            onChange={(e) => setToggle(e.target.value)}
            className="absolute right-2 w-40 h-6.5 outline-none appearance-none rounded-sm px-1 text-[14px] arial-narrow bg-icon2"
          >
            <option value={1}>BIOMETRICS</option>
            <option value={2}>ADJUSTMENT</option>
            <option value={3}>SUMMARY</option>
          </select>
        </div>
      </div>
      <div className="w-full px-1 ">
        {/* <table className="w-[100%] h-[10%] border-white overflow-hidden  justify-evenly border-separate border-spacing-4">
          <thead className="">
            <tr className="shadow-sm shadow-gray-800 prdc-color h-10  text-center w-[100%] flex justify-between items-center text-white arial-narrow-bold text-[14px]">
              <th className="w-[25%]">Date</th>
              <th className="w-[14%]">Time in</th>
              <th className="w-[14%]">Time out</th>
              <th className="w-[14%]">Time in</th>
              <th className="w-[14%]">Time out</th>
              <th className="w-[12%]">Total Hours</th>
              <th className="w-[15%]">Lates</th>
            </tr>
          </thead>
          <tbody>
            <div className="h-100 overflow-auto px-1">
              {chosenCutOffDate == "" ? (
                <>
                  {timeRecordData.map((data) => {
                    const Initial_Probationary = "2023-09-01T07:30";
                    const Initial_Regular = "2023-09-01T08:30";

                    const TimeIn = data.Time_in;
                    const BreakTimeStart = data.Time_break_start;
                    const BreakTimeEnd = data.Time_break_end;
                    const TimeOut = data.Time_out;

                    // working hours in millisec
                    const WorkingHours_InitialValue = moment(TimeOut).diff(
                      moment(TimeIn),
                      "milliseconds"
                    );

                    // -------- For Probi -------- //
                    const Probationary =
                      moment(Initial_Probationary).format("HH:mm");
                    // ---- split ---- //
                    const Probationary_milisec = Probationary.split(":");
                    const Probationary_milisec_Hours =
                      Probationary_milisec[0] * 60 * (60 * 1000);
                    const Probationary_milisec_Mins =
                      Probationary_milisec[1] * 60 * 1000;
                    // ---- split ---- //

                    const Probationary_Sched_Time =
                      Probationary_milisec_Hours + Probationary_milisec_Mins;
                    // -------- For Probi -------- //

                    const Regular = moment(Initial_Regular).format("HH:mm");
                    // ---- split ---- //
                    const Regular_milisec = Regular.split(":");
                    const Regular_millisec_Hour =
                      Regular_milisec[0] * 60 * (60 * 1000);
                    const Regular_millisec_Mins =
                      Regular_milisec[1] * 60 * 1000;
                    // ---- split ---- //

                    const Regular_Time_Schedule =
                      Regular_millisec_Hour + Regular_millisec_Mins;

                    // Lates ------------------------------------------------------ //
                    const TimeIn_split_value = moment(TimeIn)
                      .format("HH:mm")
                      .split(":");
                    // Converted to minutes
                    const timeIn_hour_converted_to_minutes =
                      TimeIn_split_value[0] * 60 * (60 * 1000);
                    const timeIn_mins = TimeIn_split_value[1] * 60 * 1000;

                    // Employee time in in milliseconds
                    const EmployeeTimein_Milliseconds =
                      timeIn_hour_converted_to_minutes + timeIn_mins;

                    // Converted to minutes
                    const Probi_split_value = Probationary.split(":");
                    const probi_hours_converted_to_minutes =
                      Probi_split_value[0] * 60 * (60 * 1000);
                    const probi_mins = Probi_split_value[1] * 60 * 1000;

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
                    // Lates ------------------------------------------------------ //

                    return (
                      <>
                        <tr className="w-[100%] h-10 flex justify-center items-center cursor-pointer">
                          <td className="flex justify-center items-center text-[12px] w-[35%] h-8 text-center border-b border-l border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                            {data.Date_day}
                          </td>

                          {data.Time_in == 0 ? (
                            <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                              N/A
                            </td>
                          ) : (
                            <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                              {moment(data.Time_in).format("HH:mm")}
                            </td>
                          )}

                          {data.Time_break_start == 0 ? (
                            <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                              N/A
                            </td>
                          ) : (
                            <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                              {moment(data.Time_break_start).format("HH:mm")}
                            </td>
                          )}

                          {data.Time_break_end == 0 ? (
                            <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                              N/A
                            </td>
                          ) : (
                            <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                              {moment(data.Time_break_end).format("HH:mm")}
                            </td>
                          )}

                          {data.Time_out == 0 ? (
                            <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                              N/A
                            </td>
                          ) : (
                            <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                              {moment(data.Time_out).format("HH:mm")}
                            </td>
                          )}
                          {data.Sched_Type ===
                          "Compressed : Monday - Friday | 07:30:00 - 18:00:00" ? (
                            <td className="flex justify-center items-center text-[12px] w-[17%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                              {WorkingHours_InitialValue <
                              Probationary_Sched_Time
                                ? ((WorkingHours_InitialValue -
                                    Probationary_Sched_Time) *
                                    -1) /
                                  3600000
                                : WorkingHours_InitialValue >
                                  Probationary_Sched_Time
                                ? 28800000 / 3600000
                                : ""}
                            </td>
                          ) : (
                            ""
                          )}
                          {data.Sched_Type ===
                          "Regular : Monday - Friday | 08:30:00 - 17:30:00" ? (
                            <td className="flex justify-center items-center text-[12px] w-[17%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                              {WorkingHours_InitialValue < Regular_Time_Schedule
                                ? (WorkingHours_InitialValue -
                                    Regular_Time_Schedule * -1) /
                                  3600000
                                : WorkingHours_InitialValue >
                                  Regular_Time_Schedule
                                ? 28800000 / 3600000
                                : ""}
                            </td>
                          ) : (
                            ""
                          )}
                          {data.Sched_Type ===
                          "Compressed : Monday - Friday | 07:30:00 - 18:00:00" ? (
                            <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t border-r bg-white border-b-black border-t-black border-l-black border-r-black text-left arial-narrow text-black ">
                              {EmployeeTimein_Milliseconds > 27000000
                                ? For_Probationary_Lates_Rquation > 1
                                  ? (For_Probationary_Lates_Rquation / 60000) *
                                    -1
                                  : For_Probationary_Lates_Rquation / 60000
                                : 0}
                            </td>
                          ) : (
                            ""
                          )}
                          {data.Sched_Type ===
                          "Regular : Monday - Friday | 08:30:00 - 17:30:00" ? (
                            <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t border-r bg-white border-b-black border-t-black border-l-black border-r-black text-left arial-narrow text-black ">
                              {EmployeeTimein_Milliseconds > 30600000
                                ? For_Regular_Lates_Rquation > 1
                                  ? (For_Regular_Lates_Rquation / 60000) * -1
                                  : For_Regular_Lates_Rquation / 60000
                                : 0}
                            </td>
                          ) : (
                            ""
                          )}
                        </tr>
                      </>
                    );
                  })}
                </>
              ) : (
                <>
                  {ObjFilter.ID == "" || ObjFilter.Bio == "" ? (
                    <>
                      {timeRecordData
                        .filter((fil) => fil.Cutoff == chosenCutOffDate)
                        .map((data) => {
                          const Initial_Probationary = "2023-09-01T07:30";
                          const Initial_Regular = "2023-09-01T08:30";

                          const TimeIn = data.Time_in;
                          const BreakTimeStart = data.Time_break_start;
                          const BreakTimeEnd = data.Time_break_end;
                          const TimeOut = data.Time_out;

                          // working hours in millisec
                          const WorkingHours_InitialValue = moment(
                            TimeOut
                          ).diff(moment(TimeIn), "milliseconds");

                          // -------- For Probi -------- //
                          const Probationary =
                            moment(Initial_Probationary).format("HH:mm");
                          // ---- split ---- //
                          const Probationary_milisec = Probationary.split(":");
                          const Probationary_milisec_Hours =
                            Probationary_milisec[0] * 60 * (60 * 1000);
                          const Probationary_milisec_Mins =
                            Probationary_milisec[1] * 60 * 1000;
                          // ---- split ---- //

                          const Probationary_Sched_Time =
                            Probationary_milisec_Hours +
                            Probationary_milisec_Mins;
                          // -------- For Probi -------- //

                          const Regular =
                            moment(Initial_Regular).format("HH:mm");
                          // ---- split ---- //
                          const Regular_milisec = Regular.split(":");
                          const Regular_millisec_Hour =
                            Regular_milisec[0] * 60 * (60 * 1000);
                          const Regular_millisec_Mins =
                            Regular_milisec[1] * 60 * 1000;
                          // ---- split ---- //

                          const Regular_Time_Schedule =
                            Regular_millisec_Hour + Regular_millisec_Mins;

                          // Lates ------------------------------------------------------ //
                          const TimeIn_split_value = moment(TimeIn)
                            .format("HH:mm")
                            .split(":");
                          // Converted to minutes
                          const timeIn_hour_converted_to_minutes =
                            TimeIn_split_value[0] * 60 * (60 * 1000);
                          const timeIn_mins = TimeIn_split_value[1] * 60 * 1000;

                          // Employee time in in milliseconds
                          const EmployeeTimein_Milliseconds =
                            timeIn_hour_converted_to_minutes + timeIn_mins;

                          // Converted to minutes
                          const Probi_split_value = Probationary.split(":");
                          const probi_hours_converted_to_minutes =
                            Probi_split_value[0] * 60 * (60 * 1000);
                          const probi_mins = Probi_split_value[1] * 60 * 1000;

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
                          // Lates ------------------------------------------------------ //
                          return (
                            <>
                              <tr className="w-[100%] h-10 flex justify-center items-center cursor-pointer">
                                <td className="flex justify-center items-center text-[12px] w-[35%] h-8 text-center border-b border-l border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                                  {data.Date_day}
                                </td>

                                {data.Time_in == 0 ? (
                                  <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                                    N/A
                                  </td>
                                ) : (
                                  <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                                    {moment(data.Time_in).format("HH:mm")}
                                  </td>
                                )}

                                {data.Time_break_start == 0 ? (
                                  <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                                    N/A
                                  </td>
                                ) : (
                                  <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                                    {moment(data.Time_break_start).format(
                                      "HH:mm"
                                    )}
                                  </td>
                                )}

                                {data.Time_break_end == 0 ? (
                                  <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                                    N/A
                                  </td>
                                ) : (
                                  <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                                    {moment(data.Time_break_end).format(
                                      "HH:mm"
                                    )}
                                  </td>
                                )}

                                {data.Time_out == 0 ? (
                                  <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                                    N/A
                                  </td>
                                ) : (
                                  <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                                    {moment(data.Time_out).format("HH:mm")}
                                  </td>
                                )}

                                {data.Sched_Type ===
                                "Compressed : Monday - Friday | 07:30:00 - 18:00:00" ? (
                                  <td className="flex justify-center items-center text-[12px] w-[17%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                                    {WorkingHours_InitialValue <
                                    Probationary_Sched_Time
                                      ? ((WorkingHours_InitialValue -
                                          Probationary_Sched_Time) *
                                          -1) /
                                        3600000
                                      : WorkingHours_InitialValue >
                                        Probationary_Sched_Time
                                      ? 28800000 / 3600000
                                      : ""}
                                  </td>
                                ) : (
                                  ""
                                )}
                                {data.Sched_Type ===
                                "Regular : Monday - Friday | 08:30:00 - 17:30:00" ? (
                                  <td className="flex justify-center items-center text-[12px] w-[17%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                                    {WorkingHours_InitialValue <
                                    Regular_Time_Schedule
                                      ? (WorkingHours_InitialValue -
                                          Regular_Time_Schedule * -1) /
                                        3600000
                                      : WorkingHours_InitialValue >
                                        Regular_Time_Schedule
                                      ? 28800000 / 3600000
                                      : ""}
                                  </td>
                                ) : (
                                  ""
                                )}
                                {data.Sched_Type ==
                                "Compressed : Monday - Friday | 07:30:00 - 18:00:00" ? (
                                  <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t border-r bg-white border-b-black border-t-black border-l-black border-r-black text-left arial-narrow text-black ">
                                    {EmployeeTimein_Milliseconds > 27000000
                                      ? For_Probationary_Lates_Rquation > 1
                                        ? (For_Probationary_Lates_Rquation /
                                            60000) *
                                          -1
                                        : For_Probationary_Lates_Rquation /
                                          60000
                                      : 0}
                                  </td>
                                ) : (
                                  ""
                                )}
                                {data.Sched_Type ==
                                "Regular : Monday - Friday | 08:30:00 - 17:30:00" ? (
                                  <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t border-r bg-white border-b-black border-t-black border-l-black border-r-black text-left arial-narrow text-black ">
                                    {EmployeeTimein_Milliseconds > 30600000
                                      ? For_Regular_Lates_Rquation > 1
                                        ? (For_Regular_Lates_Rquation / 60000) *
                                          -1
                                        : For_Regular_Lates_Rquation / 60000
                                      : 0}
                                  </td>
                                ) : (
                                  ""
                                )}
                              </tr>
                            </>
                          );
                        })}
                    </>
                  ) : (
                    <>
                      {timeRecordData
                        .filter(
                          (fil) =>
                            fil.BioID ==
                              ObjFilter.employee_data.Employee_BioID &&
                            fil.Cutoff === chosenCutOffDate
                        )
                        .map((data) => {
                          const Initial_Probationary = "2023-09-01T07:30";
                          const Initial_Regular = "2023-09-01T08:30";

                          const TimeIn = data.Time_in;
                          const BreakTimeStart = data.Time_break_start;
                          const BreakTimeEnd = data.Time_break_end;
                          const TimeOut = data.Time_out;

                          // working hours in millisec
                          const WorkingHours_InitialValue = moment(
                            TimeOut
                          ).diff(moment(TimeIn), "milliseconds");

                          // -------- For Probi -------- //
                          const Probationary =
                            moment(Initial_Probationary).format("HH:mm");
                          // ---- split ---- //
                          const Probationary_milisec = Probationary.split(":");
                          const Probationary_milisec_Hours =
                            Probationary_milisec[0] * 60 * (60 * 1000);
                          const Probationary_milisec_Mins =
                            Probationary_milisec[1] * 60 * 1000;
                          // ---- split ---- //

                          const Probationary_Sched_Time =
                            Probationary_milisec_Hours +
                            Probationary_milisec_Mins;
                          // -------- For Probi -------- //

                          const Regular =
                            moment(Initial_Regular).format("HH:mm");
                          // ---- split ---- //
                          const Regular_milisec = Regular.split(":");
                          const Regular_millisec_Hour =
                            Regular_milisec[0] * 60 * (60 * 1000);
                          const Regular_millisec_Mins =
                            Regular_milisec[1] * 60 * 1000;
                          // ---- split ---- //

                          const Regular_Time_Schedule =
                            Regular_millisec_Hour + Regular_millisec_Mins;

                          // Lates ------------------------------------------------------ //
                          const TimeIn_split_value = moment(TimeIn)
                            .format("HH:mm")
                            .split(":");
                          // Converted to minutes
                          const timeIn_hour_converted_to_minutes =
                            TimeIn_split_value[0] * 60 * (60 * 1000);
                          const timeIn_mins = TimeIn_split_value[1] * 60 * 1000;

                          // Employee time in in milliseconds
                          const EmployeeTimein_Milliseconds =
                            timeIn_hour_converted_to_minutes + timeIn_mins;

                          // Converted to minutes
                          const Probi_split_value = Probationary.split(":");
                          const probi_hours_converted_to_minutes =
                            Probi_split_value[0] * 60 * (60 * 1000);
                          const probi_mins = Probi_split_value[1] * 60 * 1000;

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
                          // Lates ------------------------------------------------------ //

                          return (
                            <>
                              <tr
                                onClick={() => setChosenTimeRecordData(data.ID)}
                                className="w-[100%] h-10 flex justify-center items-center cursor-pointer"
                              >
                                <td className="flex justify-center items-center text-[12px] w-[35%] h-8 text-center border-b border-l border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                                  {data.Date_day}
                                </td>

                                {data.Time_in == 0 ? (
                                  <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                                    N/A
                                  </td>
                                ) : (
                                  <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                                    {moment(data.Time_in).format("HH:mm")}
                                  </td>
                                )}

                                {data.Time_break_start == 0 ? (
                                  <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                                    N/A
                                  </td>
                                ) : (
                                  <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                                    {moment(data.Time_break_start).format(
                                      "HH:mm"
                                    )}
                                  </td>
                                )}

                                {data.Time_break_end == 0 ? (
                                  <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                                    N/A
                                  </td>
                                ) : (
                                  <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                                    {moment(data.Time_break_end).format(
                                      "HH:mm"
                                    )}
                                  </td>
                                )}

                                {data.Time_out == 0 ? (
                                  <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                                    N/A
                                  </td>
                                ) : (
                                  <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                                    {moment(data.Time_out).format("HH:mm")}
                                  </td>
                                )}
                                {ObjFilter.employee_data.Employee_Schedule ==
                                "Compressed : Monday - Friday | 07:30:00 - 18:00:00" ? (
                                  <td className="flex justify-center items-center text-[12px] w-[17%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                                    {WorkingHours_InitialValue <
                                    Probationary_Sched_Time
                                      ? ((WorkingHours_InitialValue -
                                          Probationary_Sched_Time) *
                                          -1) /
                                        3600000
                                      : WorkingHours_InitialValue >
                                        Probationary_Sched_Time
                                      ? 28800000 / 3600000
                                      : ""}
                                  </td>
                                ) : (
                                  ""
                                )}
                                {ObjFilter.employee_data.Employee_Schedule ==
                                "Regular : Monday - Friday | 08:30:00 - 17:30:00" ? (
                                  <td className="flex justify-center items-center text-[12px] w-[17%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                                    {WorkingHours_InitialValue <
                                    Regular_Time_Schedule
                                      ? (WorkingHours_InitialValue -
                                          Regular_Time_Schedule * -1) /
                                        3600000
                                      : WorkingHours_InitialValue >
                                        Regular_Time_Schedule
                                      ? 28800000 / 3600000
                                      : ""}
                                  </td>
                                ) : (
                                  ""
                                )}

                                {ObjFilter.employee_data.Employee_Schedule ==
                                "Compressed : Monday - Friday | 07:30:00 - 18:00:00" ? (
                                  <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t border-r bg-white border-b-black border-t-black border-l-black border-r-black text-left arial-narrow text-black ">
                                    {EmployeeTimein_Milliseconds > 27000000
                                      ? For_Probationary_Lates_Rquation > 1
                                        ? (For_Probationary_Lates_Rquation /
                                            60000) *
                                          -1
                                        : For_Probationary_Lates_Rquation /
                                          60000
                                      : 0}
                                  </td>
                                ) : (
                                  ""
                                )}
                                {ObjFilter.employee_data.Employee_Schedule ==
                                "Regular : Monday - Friday | 08:30:00 - 17:30:00" ? (
                                  <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t border-r bg-white border-b-black border-t-black border-l-black border-r-black text-left arial-narrow text-black ">
                                    {EmployeeTimein_Milliseconds > 30600000
                                      ? For_Regular_Lates_Rquation > 1
                                        ? (For_Regular_Lates_Rquation / 60000) *
                                          -1
                                        : For_Regular_Lates_Rquation / 60000
                                      : 0}
                                  </td>
                                ) : (
                                  ""
                                )}
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
        </table> */}
      </div>
      {/* <div className="w-full mt-2 px-1">
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
              {timeRecordData
                .filter(
                  (fil) =>
                    fil.ID == chosenTimeRecordData &&
                    fil.EmpID == ObjFilter.employee_data.Employee_ID
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

                  const Regular = moment(Initial_Regular).format("HH:mm");

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
                  const timeIn_mins = TimeIn_split_value[1] * 60 * 1000;

                  // Converted to minutes
                  const Probi_split_value = Probationary.split(":");
                  const probi_hours_converted_to_minutes =
                    Probi_split_value[0] * 60 * (60 * 1000);
                  const probi_mins = Probi_split_value[1] * 60 * 1000;

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
                  const REG = REG_InitialValue > 8 ? 8 : REG_InitialValue;

                  return (
                    <>
                      <tr className="w-[100%] h-10 flex justify-center items-center cursor-pointer text-center arial-narrow">
                        <td className="w-[25%]">{REG}</td>
                        <td className="w-[25%]"></td>
                        <td className="w-[25%]"></td>
                        <td className="w-[25%]"></td>
                        <td className="w-[25%]"></td>
                        <td className="w-[25%]"></td>
                        <td className="w-[25%]"></td>

                        {ObjFilter.employee_data.Employee_Schedule ==
                        "Compressed : Monday - Friday | 07:30:00 - 18:00:00" ? (
                          <td className="w-[25%]">
                            {For_Probationary_Lates_Rquation / 60000}
                          </td>
                        ) : (
                          ""
                        )}

                        {ObjFilter.employee_data.Employee_Schedule ==
                        "Regular : Monday - Friday | 08:30:00 - 17:30:00" ? (
                          <td className="w-[25%]">
                            {For_Regular_Lates_Rquation / 60000}
                          </td>
                        ) : (
                          ""
                        )}

                        <td className="w-[25%]"></td>
                      </tr>
                    </>
                  );
                })}
            </div>
          </tbody>
        </table>
      </div> */}
    </>
  );
};

export default HrTimeRecord;

/***
 * 
 * 
 * 
 * <div className="col-span-full my-2">
{cutList.map((dates) => (
  <>
    <div className="flex border h-8 mb-2 shadow-gray-600 shadow-sm border-gray-400 items-center pl-2">
      <p className="text-[12px] w-[15%] arial-narrow uppercase text-black">
        {moment(dates).format("MM-DD-YYYY, ddd")}
      </p>

      {CutOff.data?.dtr
        ?.sort((before, after) =>
          moment(before.Time).diff(moment(after.Time))
        )
        .filter(
          (fil, index, self) =>
            moment(fil.Time).format("MMM-DD-YYYY, ddd") ==
              moment(dates).format("MMM-DD-YYYY, ddd") &&
            fil.BioID == ObjFilter.employee_data.Employee_BioID &&
            index ==
              self.findIndex(
                (t) =>
                  moment(fil.Time).diff(moment(t.Time), "minutes") <=
                    5 && fil.BioID == t.BioID
              )
        )

        .map((time) => {
          // const emp_Time = CutOff.data?.dtr
          //   ?.sort((before, after) =>
          //     moment(before.Time).diff(moment(after.Time))
          //   )
          //   .filter(
          //     (fil, index, self) =>
          //       moment(fil.Time).format("MMM-DD-YYYY, ddd") ==
          //         moment(dates).format("MMM-DD-YYYY, ddd") &&
          //       fil.BioID == ObjFilter.employee_data.Employee_BioID &&
          //       index ==
          //         self.findIndex(
          //           (t) =>
          //             moment(fil.Time).diff(
          //               moment(t.Time),
          //               "minutes"
          //             ) <= 5 && fil.BioID == t.BioID
          //         )

          return (
            <>
              <p className="arial-narrow-bold text-[14px] w-[13%] text-black">
                {moment(time.Time).format("HH:mm")}
              </p>
            </>
          );
        })}

      <p className="arial-narrow-bold text-[14px]">
        {moment(
          CutOff.data?.dtr
            ?.sort((before, after) =>
              moment(before.Time).diff(moment(after.Time))
            )
            .filter(
              (fil, index, self) =>
                moment(fil.Time).format("MMM-DD-YYYY, ddd") ==
                  moment(dates).format("MMM-DD-YYYY, ddd") &&
                fil.BioID == ObjFilter.employee_data.Employee_BioID &&
                index ==
                  self.findIndex(
                    (t) =>
                      moment(fil.Time).diff(
                        moment(t.Time),
                        "minutes"
                      ) <= 5 && fil.BioID == t.BioID
                  )
            )[3]?.Time
        ).diff(
          moment(
            CutOff.data?.dtr
              ?.sort((before, after) =>
                moment(before.Time).diff(moment(after.Time))
              )
              .filter(
                (fil, index, self) =>
                  moment(fil.Time).format("MMM-DD-YYYY, ddd") ==
                    moment(dates).format("MMM-DD-YYYY, ddd") &&
                  fil.BioID ==
                    ObjFilter.employee_data.Employee_BioID &&
                  index ==
                    self.findIndex(
                      (t) =>
                        moment(fil.Time).diff(
                          moment(t.Time),
                          "minutes"
                        ) <= 5 && fil.BioID == t.BioID
                    )
              )[2]?.Time
          ),
          "hours"
        ) +
          moment(
            CutOff.data?.dtr
              ?.sort((before, after) =>
                moment(before.Time).diff(moment(after.Time))
              )
              .filter(
                (fil, index, self) =>
                  moment(fil.Time).format("MMM-DD-YYYY, ddd") ==
                    moment(dates).format("MMM-DD-YYYY, ddd") &&
                  fil.BioID ==
                    ObjFilter.employee_data.Employee_BioID &&
                  index ==
                    self.findIndex(
                      (t) =>
                        moment(fil.Time).diff(
                          moment(t.Time),
                          "minutes"
                        ) <= 5 && fil.BioID == t.BioID
                    )
              )[1]?.Time
          ).diff(
            moment(
              CutOff.data?.dtr
                ?.sort((before, after) =>
                  moment(before.Time).diff(moment(after.Time))
                )
                .filter(
                  (fil, index, self) =>
                    moment(fil.Time).format("MMM-DD-YYYY, ddd") ==
                      moment(dates).format("MMM-DD-YYYY, ddd") &&
                    fil.BioID ==
                      ObjFilter.employee_data.Employee_BioID &&
                    index ==
                      self.findIndex(
                        (t) =>
                          moment(fil.Time).diff(
                            moment(t.Time),
                            "minutes"
                          ) <= 5 && fil.BioID == t.BioID
                      )
                )[0]?.Time
            ),
            "hours"
          ) ==
        0
          ? ""
          : moment(
              CutOff.data?.dtr
                ?.sort((before, after) =>
                  moment(before.Time).diff(moment(after.Time))
                )
                .filter(
                  (fil, index, self) =>
                    moment(fil.Time).format("MMM-DD-YYYY, ddd") ==
                      moment(dates).format("MMM-DD-YYYY, ddd") &&
                    fil.BioID ==
                      ObjFilter.employee_data.Employee_BioID &&
                    index ==
                      self.findIndex(
                        (t) =>
                          moment(fil.Time).diff(
                            moment(t.Time),
                            "minutes"
                          ) <= 5 && fil.BioID == t.BioID
                      )
                )[3]?.Time
            ).diff(
              moment(
                CutOff.data?.dtr
                  ?.sort((before, after) =>
                    moment(before.Time).diff(moment(after.Time))
                  )
                  .filter(
                    (fil, index, self) =>
                      moment(fil.Time).format("MMM-DD-YYYY, ddd") ==
                        moment(dates).format("MMM-DD-YYYY, ddd") &&
                      fil.BioID ==
                        ObjFilter.employee_data.Employee_BioID &&
                      index ==
                        self.findIndex(
                          (t) =>
                            moment(fil.Time).diff(
                              moment(t.Time),
                              "minutes"
                            ) <= 5 && fil.BioID == t.BioID
                        )
                  )[2]?.Time
              ),
              "hours"
            ) +
              moment(
                CutOff.data?.dtr
                  ?.sort((before, after) =>
                    moment(before.Time).diff(moment(after.Time))
                  )
                  .filter(
                    (fil, index, self) =>
                      moment(fil.Time).format("MMM-DD-YYYY, ddd") ==
                        moment(dates).format("MMM-DD-YYYY, ddd") &&
                      fil.BioID ==
                        ObjFilter.employee_data.Employee_BioID &&
                      index ==
                        self.findIndex(
                          (t) =>
                            moment(fil.Time).diff(
                              moment(t.Time),
                              "minutes"
                            ) <= 5 && fil.BioID == t.BioID
                        )
                  )[1]?.Time
              ).diff(
                moment(
                  CutOff.data?.dtr
                    ?.sort((before, after) =>
                      moment(before.Time).diff(moment(after.Time))
                    )
                    .filter(
                      (fil, index, self) =>
                        moment(fil.Time).format("MMM-DD-YYYY, ddd") ==
                          moment(dates).format("MMM-DD-YYYY, ddd") &&
                        fil.BioID ==
                          ObjFilter.employee_data.Employee_BioID &&
                        index ==
                          self.findIndex(
                            (t) =>
                              moment(fil.Time).diff(
                                moment(t.Time),
                                "minutes"
                              ) <= 5 && fil.BioID == t.BioID
                          )
                    )[0]?.Time
                ),
                "hours"
              ) >
            8
          ? 8
          : moment(
              CutOff.data?.dtr
                ?.sort((before, after) =>
                  moment(before.Time).diff(moment(after.Time))
                )
                .filter(
                  (fil, index, self) =>
                    moment(fil.Time).format("MMM-DD-YYYY, ddd") ==
                      moment(dates).format("MMM-DD-YYYY, ddd") &&
                    fil.BioID ==
                      ObjFilter.employee_data.Employee_BioID &&
                    index ==
                      self.findIndex(
                        (t) =>
                          moment(fil.Time).diff(
                            moment(t.Time),
                            "minutes"
                          ) <= 5 && fil.BioID == t.BioID
                      )
                )[3]?.Time
            ).diff(
              moment(
                CutOff.data?.dtr
                  ?.sort((before, after) =>
                    moment(before.Time).diff(moment(after.Time))
                  )
                  .filter(
                    (fil, index, self) =>
                      moment(fil.Time).format("MMM-DD-YYYY, ddd") ==
                        moment(dates).format("MMM-DD-YYYY, ddd") &&
                      fil.BioID ==
                        ObjFilter.employee_data.Employee_BioID &&
                      index ==
                        self.findIndex(
                          (t) =>
                            moment(fil.Time).diff(
                              moment(t.Time),
                              "minutes"
                            ) <= 5 && fil.BioID == t.BioID
                        )
                  )[2]?.Time
              ),
              "hours"
            ) +
            moment(
              CutOff.data?.dtr
                ?.sort((before, after) =>
                  moment(before.Time).diff(moment(after.Time))
                )
                .filter(
                  (fil, index, self) =>
                    moment(fil.Time).format("MMM-DD-YYYY, ddd") ==
                      moment(dates).format("MMM-DD-YYYY, ddd") &&
                    fil.BioID ==
                      ObjFilter.employee_data.Employee_BioID &&
                    index ==
                      self.findIndex(
                        (t) =>
                          moment(fil.Time).diff(
                            moment(t.Time),
                            "minutes"
                          ) <= 5 && fil.BioID == t.BioID
                      )
                )[1]?.Time
            ).diff(
              moment(
                CutOff.data?.dtr
                  ?.sort((before, after) =>
                    moment(before.Time).diff(moment(after.Time))
                  )
                  .filter(
                    (fil, index, self) =>
                      moment(fil.Time).format("MMM-DD-YYYY, ddd") ==
                        moment(dates).format("MMM-DD-YYYY, ddd") &&
                      fil.BioID ==
                        ObjFilter.employee_data.Employee_BioID &&
                      index ==
                        self.findIndex(
                          (t) =>
                            moment(fil.Time).diff(
                              moment(t.Time),
                              "minutes"
                            ) <= 5 && fil.BioID == t.BioID
                        )
                  )[0]?.Time
              ),
              "hours"
            )}
      </p>
      {/* // console.log(
          //   moment(emp_Time[0].Time).diff(
          //     moment(emp_Time[3].Time),
          //     "hours"
          //   )
          // );

          // const TotalHorus = moment(emp_Time[0].Time).diff(
          //   moment(emp_Time[3].Time),
          //   "hours"
          // );

          // console.log(moment(emp_Time[3].Time).format("HH:mm"));

          // const work_start = emp_Time[0].Time;
          // const work_end = emp_Time[3].Time;

          // console.log(work_start);
          // console.log(work_end);

          // const total_working_hours = moment(emp_Time[3].Time).diff(
          //   moment(emp_Time[0].Time),
          //   "hour"
          // );

          // console.log(total_working_hours);

          // const hours_array = [
          //   {
          //     workinghours: total_working_hours,
          //   },
          // ]; */

{
  /* // console.log(hours_array);

          // console.log(moment(TotalHorus).format("HH"));
          // console.log(TotalHorus);

          // const working_hours = moment(
          //   moment(work_end, "HH:mm:ss").diff(
          //     moment(work_start, "HH:mm:ss")
          //   )
          // ).format("HH:mm");

          // console.log(moment(TotalHorus).format("HH"));
          // const working_hours = [time];
          // console.log(working_hours[0].Time);

          // console.log(emp_Time[0].Time);

        //   return (
        //     <>
        //       <p className="arial-narrow text-[12px] w-[15%] text-black">
        //         {moment(time.Time).format("HH:mm")}
        //       </p>
        //       <p className="arial-narrow text-[12px] w-[15%] text-black">
        //         {TotalHorus}
        //       </p>
        //     </>
        //   );
        // })} */
}
// </div>
// </>
// ))}
{
  /* </div>  */
}

/*******************************************************************************************
 * 
 *   {chosenCutOffDate == "" ? (
                <>
                  {timeRecordData.map((data) => {
                    return (
                      <>
                        <tr className="w-[100%] h-10 flex justify-center items-center cursor-pointer">
                          <td className="flex justify-center items-center text-[12px] w-[35%] h-8 text-center border-b border-l border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                            {data.Date_day}
                          </td>
                          <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                            {moment(data.Time_in).format("HH:mm")}
                          </td>
                          <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                            {moment(data.Time_break_start).format("HH:mm")}
                          </td>
                          <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                            {moment(data.Time_break_end).format("HH:mm")}
                          </td>
                          <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                            {moment(data.Time_out).format("HH:mm")}
                          </td>
                          <td className="flex justify-center items-center text-[12px] w-[17%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                            {data.BioID}
                          </td>
                          <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t border-r bg-white border-b-black border-t-black border-l-black border-r-black text-left arial-narrow text-black ">
                            {data.EmpID}
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </>
              ) : (
                <>
                  {ObjFilter.ID == "" || ObjFilter.Bio == "" ? (
                    <>
                      {timeRecordData
                        .filter((fil) => fil.Cutoff == chosenCutOffDate)
                        .map((data) => {
                          return (
                            <>
                              <tr className="w-[100%] h-10 flex justify-center items-center cursor-pointer">
                                <td className="flex justify-center items-center text-[12px] w-[35%] h-8 text-center border-b border-l border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                                  {data.Date_day}
                                </td>
                                <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                                  {moment(data.Time_in).format("HH:mm")}
                                </td>
                                <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                                  {moment(data.Time_break_start).format(
                                    "HH:mm"
                                  )}
                                </td>
                                <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                                  {moment(data.Time_break_end).format("HH:mm")}
                                </td>
                                <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                                  {moment(data.Time_out).format("HH:mm")}
                                </td>
                                <td className="flex justify-center items-center text-[12px] w-[17%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                                  {data.BioID}
                                </td>
                                <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t border-r bg-white border-b-black border-t-black border-l-black border-r-black text-left arial-narrow text-black ">
                                  {data.EmpID}
                                </td>
                              </tr>
                            </>
                          );
                        })}
                    </>
                  ) : (
                    <>
                      {timeRecordData
                        .filter(
                          (fil) =>
                            fil.BioID == ObjFilter.employee_data.Employee_BioID
                        )
                        .map((data) => {
                          return (
                            <>
                              <tr
                                onClick={() => setChosenTimeRecordData(data.ID)}
                                className="w-[100%] h-10 flex justify-center items-center cursor-pointer"
                              >
                                <td className="flex justify-center items-center text-[12px] w-[35%] h-8 text-center border-b border-l border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                                  {data.Date_day}
                                </td>
                                <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                                  {moment(data.Time_in).format("HH:mm")}
                                </td>
                                <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                                  {moment(data.Time_break_start).format(
                                    "HH:mm"
                                  )}
                                </td>
                                <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                                  {moment(data.Time_break_end).format("HH:mm")}
                                </td>
                                <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                                  {moment(data.Time_out).format("HH:mm")}
                                </td>
                                <td className="flex justify-center items-center text-[12px] w-[17%] h-8 text-center border-b border-t bg-white border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                                  {data.BioID}
                                </td>
                                <td className="flex justify-center items-center text-[12px] w-[20%] h-8 text-center border-b border-t border-r bg-white border-b-black border-t-black border-l-black border-r-black text-left arial-narrow text-black ">
                                  {data.EmpID}
                                </td>
                              </tr>
                            </>
                          );
                        })}
                    </>
                  )}
                </>
              )}
 * 
 * 
 */
