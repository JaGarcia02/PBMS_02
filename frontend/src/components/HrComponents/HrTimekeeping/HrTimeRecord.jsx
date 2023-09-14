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
  console.log(chosenCutOffDate === "");

  return (
    <>
      <div className="grid w-full grid-cols-8 p-1">
        <div className="prdc-color text-white arial-narrow-bold text-[14px] pl-2 h-[2.6rem] text-left flex items-center shadow-sm shadow-gray-900 "></div>
        <div className="prdc-color text-white arial-narrow-bold text-[14px] pl-8 h-[2.6rem] text-left flex items-center shadow-sm shadow-gray-900 "></div>
        <div className="prdc-color text-white arial-narrow-bold text-[14px] pl-8 h-[2.6rem] text-left flex items-center shadow-sm shadow-gray-900 "></div>
        <div className="prdc-color text-white arial-narrow-bold text-[14px] pl-8 h-[2.6rem] text-left flex items-center shadow-sm shadow-gray-900 "></div>
        <div className="prdc-color text-white arial-narrow-bold text-[14px] pl-8 h-[2.6rem] text-left flex items-center shadow-sm shadow-gray-900 "></div>
        <div className="prdc-color text-white arial-narrow-bold text-[14px] h-[2.6rem] text-left flex items-center shadow-sm shadow-gray-900 "></div>
        <div className="prdc-color text-white arial-narrow-bold text-[12px] pr-2 h-[2.6rem] flex items-center justify-end shadow-sm shadow-gray-900 col-span-2">
          <select
            onChange={(e) => setToggle(e.target.value)}
            className="w-35 h-6.5 outline-none appearance-none rounded-sm px-1 text-[12px] arial-narrow bg-icon2"
          >
            <option value={1}>Employee Time Record</option>
            <option value={2}>Adjustment</option>
            <option value={3}>Summary</option>
          </select>
        </div>
      </div>
      <div className="w-full px-1 ">
        <table className="w-[100%] h-[10%] border-white overflow-hidden  justify-evenly border-separate border-spacing-4">
          <thead className="">
            <tr className="shadow-sm shadow-gray-800 prdc-color h-10  text-center w-[100%] flex justify-between items-center text-white arial-narrow-bold text-[14px]">
              <th className="w-[25%]">Date</th>
              <th className="w-[14%]">Time in</th>
              <th className="w-[14%]">Time out</th>
              <th className="w-[14%]">Time in</th>
              <th className="w-[14%]">Time out</th>
              <th className="w-[12%]">Bio Id</th>
              <th className="w-[15%]">Emp Id</th>
            </tr>
          </thead>
          <tbody>
            <div className="h-55 overflow-auto px-1">
              {chosenCutOffDate == "" ? (
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
            </div>
          </tbody>
        </table>
      </div>
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
              {timeRecordData
                .filter((fil) => fil.ID == chosenTimeRecordData)
                .map((data) => {
                  const InitalTimeProbi = "2023-09-01T07:30";
                  const InitalTimeRegular = "2023-09-01T08:30";

                  // Time Rules
                  const Probationary = moment(InitalTimeProbi).format("HH:mm");
                  const Regular = moment(InitalTimeRegular).format("HH:mm");

                  const TimeIn = data.Time_in;
                  const BreakTimeStart = data.Time_break_start;
                  const BreakTimeEnd = data.Time_break_end;
                  const TimeOut = data.Time_out;

                  // Regular hour
                  const REG_InitailValue = moment(TimeOut).diff(
                    moment(TimeIn) +
                      moment(BreakTimeEnd).diff(
                        moment(BreakTimeStart),
                        "hours"
                      ),
                    "hours"
                  );

                  // Lates

                  const REG = REG_InitailValue > 8 ? 8 : REG_InitailValue;
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
                        <td className="w-[25%]"></td>
                        <td className="w-[25%]"></td>
                      </tr>
                    </>
                  );
                })}
            </div>
          </tbody>
        </table>
      </div>
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
