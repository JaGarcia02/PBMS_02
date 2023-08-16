import React from "react";
import moment from "moment";

const HrTimeRecord = ({ cutList, dtr, ObjFilter, setToggle, CutOff }) => {
  // console.log(cutList.map((dates) => moment(dates).format("MM-DD-YYYY,ddd")));

  console.log(cutList);
  const getTime = (indexNum) => {
    return cutList.map((dates) => {
      CutOff.data?.dtr
        ?.sort((before, after) => moment(before.Time).diff(moment(after.Time)))
        .filter(
          (fil, index, self) =>
            moment(fil.Time).format("MMM-DD-YYYY, ddd") ==
              moment(dates).format("MMM-DD-YYYY, ddd") &&
            fil.BioID == ObjFilter.employee_data.Employee_BioID &&
            index ==
              self.findIndex(
                (t) =>
                  moment(fil.Time).diff(moment(t.Time), "minutes") <= 5 &&
                  fil.BioID == t.BioID
              )
        )[indexNum]?.Time;
    });
  };

  return (
    <>
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
          <select
            onChange={(e) => setToggle(e.target.value)}
            className="w-30 h-6.5 outline-none appearance-none rounded-sm px-1 text-[14px] arial-narrow bg-icon2"
          >
            <option value={1}>BIOMETRICS</option>
            <option value={2}>ADJUSTMENT</option>
            <option value={3}>SUMMARY</option>
          </select>
        </div>
        <div className="col-span-full my-2">
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
                        <p className="arial-narrow text-[12px] w-[15%] text-black">
                          {moment(time.Time).format("HH:mm")}
                        </p>
                      </>
                    );
                  })}
                <p className="arial-narrow text-[12px]">
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
                    // ]; */}

                {/* // console.log(hours_array);

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
                  // })} */}
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default HrTimeRecord;
