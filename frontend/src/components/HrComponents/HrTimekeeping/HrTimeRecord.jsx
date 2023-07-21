import React from "react";
import moment from "moment";

const HrTimeRecord = ({ cutList, dtr, handleDTR, ObjFilter, setToggle }) => {
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

                {dtr
                  .sort((before, after) =>
                    moment(before.Time).diff(moment(after.Time))
                  )
                  .filter(
                    (fil, index, self) =>
                      moment(fil.Time).format("MMM-DD-YYYY, ddd") ==
                        moment(dates).format("MMM-DD-YYYY, ddd") &&
                      fil.Employee == ObjFilter.ID &&
                      index ==
                        self.findIndex(
                          (t) =>
                            moment(fil.Time).diff(moment(t.Time), "minutes") <=
                              5 && fil.Employee == t.Employee
                        )
                  )
                  .map((time) => (
                    <p className="arial-narrow text-[12px] w-[15%] text-black">
                      {moment(time.Time).format("HH:mm")}
                    </p>
                  ))}
              </div>
            </>
          ))}
        </div>
      </div>

      <label
        for="dtr-upload"
        className="w-[27%] mt-auto ml-auto mr-3 bg-gray-800 text-white arial-narrow-bold cursor-pointer mb-3 h-7 text-center flex items-center justify-center"
      >
        ADD TIME RECORD
      </label>
      <input
        id="dtr-upload"
        type="file"
        onChange={handleDTR}
        className="hidden"
      />
    </>
  );
};

export default HrTimeRecord;