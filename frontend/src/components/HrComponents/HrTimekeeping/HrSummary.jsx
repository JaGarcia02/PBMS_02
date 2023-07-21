import React from "react";
import moment from "moment";

const HrSummary = ({ setToggle, ExcelData, ObjFilter, chosenDate }) => {
  return (
    <>
      <div className="flex flex-col w-full  p-1 items-center">
        <div className="relative prdc-color flex items-center justify-center text-[12px] w-full h-10 shadow-sm shadow-gray-900 text-white  arial-narrow-bold">
          EMPLOYEE'S WORK SUMMARY
          <select
            onChange={(e) => setToggle(e.target.value)}
            className="absolute right-2 w-30 h-6.5 outline-none appearance-none rounded-sm px-1 text-[14px] arial-narrow bg-icon2"
          >
            <option value={1}>BIOMETRICS</option>
            <option selected value={3}>
              SUMMARY
            </option>
          </select>
        </div>
        <div className="w-[90%] flex flex-col mt-4">
          <span className="text-[15px] ml-1 arial-narrow-bold text-black">
            REGULAR
          </span>

          <table className="w-[100%] h-[10%] border-separate border-spacing-4 border-transparent -mt-2 overflow-hidden">
            <thead>
              <tr className="arial-narrow text-black text-[12px] text-center shadow-sm shadow-gray-800  items-center justify-center bg-blue-200 h-10 dark:(bg-blue-500) <md:(hidden)">
                <th className="w-[20%]">Cut-off</th>
                <th className="w-[5%]">REG</th>
                <th className="w-[5%]">OT</th>
                <th className="w-[5%]">UT</th>
                <th className="w-[5%]">ND</th>
                <th className="w-[5%]">LWP</th>
                <th className="w-[5%]">REGNS</th>
                <th className="w-[5%]">OTNS</th>
                <th className="w-[5%]">OTND</th>
                <th className="w-[5%]">LATES</th>
                <th className="w-[5%]">ABSENT</th>
              </tr>
            </thead>
            {ExcelData.filter((fil) => fil.Employee_ID == ObjFilter.ID).map(
              (dat) => (
                <tbody>
                  <tr className="text-center shadow-sm shadow-gray-900 h-8">
                    <td className="text-[12px] arial-narrow text-black border border-gray-700 border-r-0 ">
                      {moment(chosenDate.split("_")[0]).format("MMMM DD") +
                        "-" +
                        moment(chosenDate.split("_")[1]).format("DD YYYY")}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.REG}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.OT}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.UT}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.ND}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.LWP}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.REGNS}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.OTNS}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.OTND}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.LATES}
                    </td>
                    <td className="text-[12px] arial-narrow border border-gray-700 border-l-0 text-black">
                      {dat.ABSENT}
                    </td>
                  </tr>
                </tbody>
              )
            )}
          </table>

          <span className="text-[15px] ml-1 arial-narrow-bold mt-7 text-black">
            SPECIAL HOLIDAY
          </span>
          <table className="w-[100%] h-[10%] border-separate border-spacing-4 border-transparent -mt-2 overflow-hidden">
            <thead>
              <tr className="arial-narrow text-black text-[12px] text-center shadow-sm shadow-gray-800  items-center justify-center bg-blue-200 h-10 dark:(bg-blue-500) <md:(hidden)">
                <th className="w-[20%]">Cut-off</th>
                <th className="w-[5%]">REG</th>
                <th className="w-[5%]">OT</th>
                <th className="w-[5%]">UT</th>
                <th className="w-[5%]">ND</th>
                <th className="w-[5%]">LWP</th>
                <th className="w-[5%]">REGNS</th>
                <th className="w-[5%]">OTNS</th>
                <th className="w-[5%]">OTND</th>
                <th className="w-[5%]">LATES</th>
                <th className="w-[5%]">ABSENT</th>
              </tr>
            </thead>
            {ExcelData.filter((fil) => fil.Employee_ID == ObjFilter.ID).map(
              (dat) => (
                <tbody>
                  <tr className="text-center shadow-sm shadow-gray-900 h-8">
                    <td className="text-[12px] arial-narrow text-black border border-gray-700 border-r-0 ">
                      {moment(chosenDate.split("_")[0]).format("MMMM DD") +
                        "-" +
                        moment(chosenDate.split("_")[1]).format("DD YYYY")}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.REG}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.OT}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.UT}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.ND}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.LWP}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.REGNS}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.OTNS}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.OTND}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.LATES}
                    </td>
                    <td className="text-[12px] arial-narrow border border-gray-700 border-l-0 text-black">
                      {dat.ABSENT}
                    </td>
                  </tr>
                </tbody>
              )
            )}
          </table>

          <span className="text-[15px] ml-1 arial-narrow-bold mt-7 text-black">
            LEGAL HOLIDAY
          </span>
          <table className="w-[100%] h-[10%] border-separate border-spacing-4 border-transparent -mt-2 overflow-hidden">
            <thead>
              <tr className="arial-narrow text-black text-[12px] text-center shadow-sm shadow-gray-800  items-center justify-center bg-blue-200 h-10 dark:(bg-blue-500) <md:(hidden)">
                <th className="w-[20%]">Cut-off</th>
                <th className="w-[5%]">REG</th>
                <th className="w-[5%]">OT</th>
                <th className="w-[5%]">UT</th>
                <th className="w-[5%]">ND</th>
                <th className="w-[5%]">LWP</th>
                <th className="w-[5%]">REGNS</th>
                <th className="w-[5%]">OTNS</th>
                <th className="w-[5%]">OTND</th>
                <th className="w-[5%]">LATES</th>
                <th className="w-[5%]">ABSENT</th>
              </tr>
            </thead>
            {ExcelData.filter((fil) => fil.Employee_ID == ObjFilter.ID).map(
              (dat) => (
                <tbody>
                  <tr className="text-center shadow-sm shadow-gray-900 h-8">
                    <td className="text-[12px] arial-narrow text-black border border-gray-700 border-r-0 ">
                      {moment(chosenDate.split("_")[0]).format("MMMM DD") +
                        "-" +
                        moment(chosenDate.split("_")[1]).format("DD YYYY")}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.REG}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.OT}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.UT}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.ND}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.LWP}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.REGNS}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.OTNS}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.OTND}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.LATES}
                    </td>
                    <td className="text-[12px] arial-narrow border border-gray-700 border-l-0 text-black">
                      {dat.ABSENT}
                    </td>
                  </tr>
                </tbody>
              )
            )}
          </table>

          <span className="text-[15px] ml-1 arial-narrow-bold mt-7 text-black">
            REST DAY
          </span>
          <table className="w-[100%] h-[10%] border-separate border-spacing-4 border-transparent -mt-2 overflow-hidden">
            <thead>
              <tr className="arial-narrow text-black text-[12px] text-center shadow-sm shadow-gray-800  items-center justify-center bg-blue-200 h-10 dark:(bg-blue-500) <md:(hidden)">
                <th className="w-[20%]">Cut-off</th>
                <th className="w-[5%]">REG</th>
                <th className="w-[5%]">OT</th>
                <th className="w-[5%]">UT</th>
                <th className="w-[5%]">ND</th>
                <th className="w-[5%]">LWP</th>
                <th className="w-[5%]">REGNS</th>
                <th className="w-[5%]">OTNS</th>
                <th className="w-[5%]">OTND</th>
                <th className="w-[5%]">LATES</th>
                <th className="w-[5%]">ABSENT</th>
              </tr>
            </thead>
            {ExcelData.filter((fil) => fil.Employee_ID == ObjFilter.ID).map(
              (dat) => (
                <tbody>
                  <tr className="text-center shadow-sm shadow-gray-900 h-8">
                    <td className="text-[12px] arial-narrow text-black border border-gray-700 border-r-0 ">
                      {moment(chosenDate.split("_")[0]).format("MMMM DD") +
                        "-" +
                        moment(chosenDate.split("_")[1]).format("DD YYYY")}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.REG}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.OT}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.UT}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.ND}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.LWP}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.REGNS}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.OTNS}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.OTND}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.LATES}
                    </td>
                    <td className="text-[12px] arial-narrow border border-gray-700 border-l-0 text-black">
                      {dat.ABSENT}
                    </td>
                  </tr>
                </tbody>
              )
            )}
          </table>

          <span className="text-[15px] ml-1 arial-narrow-bold mt-7 text-black">
            REST DAY WITH LEGAL HOLIDAY
          </span>
          <table className="w-[100%] h-[10%] border-separate border-spacing-4 border-transparent -mt-2 overflow-hidden">
            <thead>
              <tr className="arial-narrow text-black text-[12px] text-center shadow-sm shadow-gray-800  items-center justify-center bg-blue-200 h-10 dark:(bg-blue-500) <md:(hidden)">
                <th className="w-[20%]">Cut-off</th>
                <th className="w-[5%]">REG</th>
                <th className="w-[5%]">OT</th>
                <th className="w-[5%]">UT</th>
                <th className="w-[5%]">ND</th>
                <th className="w-[5%]">LWP</th>
                <th className="w-[5%]">REGNS</th>
                <th className="w-[5%]">OTNS</th>
                <th className="w-[5%]">OTND</th>
                <th className="w-[5%]">LATES</th>
                <th className="w-[5%]">ABSENT</th>
              </tr>
            </thead>
            {ExcelData.filter((fil) => fil.Employee_ID == ObjFilter.ID).map(
              (dat) => (
                <tbody>
                  <tr className="text-center shadow-sm shadow-gray-900 h-8">
                    <td className="text-[12px] arial-narrow text-black border border-gray-700 border-r-0 ">
                      {moment(chosenDate.split("_")[0]).format("MMMM DD") +
                        "-" +
                        moment(chosenDate.split("_")[1]).format("DD YYYY")}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.REG}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.OT}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.UT}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.ND}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.LWP}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.REGNS}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.OTNS}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.OTND}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.LATES}
                    </td>
                    <td className="text-[12px] arial-narrow border border-gray-700 border-l-0 text-black">
                      {dat.ABSENT}
                    </td>
                  </tr>
                </tbody>
              )
            )}
          </table>

          <span className="text-[15px] ml-1 arial-narrow-bold mt-7 text-black">
            REST DAY WITH SPECIAL HOLIDAY
          </span>
          <table className="w-[100%] h-[10%] border-separate border-spacing-4 border-transparent -mt-2 overflow-hidden">
            <thead>
              <tr className="arial-narrow text-black text-[12px] text-center shadow-sm shadow-gray-800  items-center justify-center bg-blue-200 h-10 dark:(bg-blue-500) <md:(hidden)">
                <th className="w-[20%]">Cut-off</th>
                <th className="w-[5%]">REG</th>
                <th className="w-[5%]">OT</th>
                <th className="w-[5%]">UT</th>
                <th className="w-[5%]">ND</th>
                <th className="w-[5%]">LWP</th>
                <th className="w-[5%]">REGNS</th>
                <th className="w-[5%]">OTNS</th>
                <th className="w-[5%]">OTND</th>
                <th className="w-[5%]">LATES</th>
                <th className="w-[5%]">ABSENT</th>
              </tr>
            </thead>
            {ExcelData.filter((fil) => fil.Employee_ID == ObjFilter.ID).map(
              (dat) => (
                <tbody>
                  <tr className="text-center shadow-sm shadow-gray-900 h-8">
                    <td className="text-[12px] arial-narrow text-black border border-gray-700 border-r-0 ">
                      {moment(chosenDate.split("_")[0]).format("MMMM DD") +
                        "-" +
                        moment(chosenDate.split("_")[1]).format("DD YYYY")}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.REG}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.OT}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.UT}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.ND}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.LWP}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.REGNS}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.OTNS}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.OTND}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.LATES}
                    </td>
                    <td className="text-[12px] arial-narrow border border-gray-700 border-l-0 text-black">
                      {dat.ABSENT}
                    </td>
                  </tr>
                </tbody>
              )
            )}
          </table>

          <span className="text-[15px] ml-1 arial-narrow-bold mt-7 text-black">
            NON STANDARD CASES
          </span>
          <table className="w-[100%] h-[10%] border-separate border-spacing-4 border-transparent -mt-2 overflow-hidden">
            <thead>
              <tr className="arial-narrow text-black text-[12px] text-center shadow-sm shadow-gray-800  items-center justify-center bg-blue-200 h-10 dark:(bg-blue-500) <md:(hidden)">
                <th className="w-[20%]">Cut-off</th>
                <th className="w-[5%]">REG</th>
                <th className="w-[5%]">OT</th>
                <th className="w-[5%]">UT</th>
                <th className="w-[5%]">ND</th>
                <th className="w-[5%]">LWP</th>
                <th className="w-[5%]">REGNS</th>
                <th className="w-[5%]">OTNS</th>
                <th className="w-[5%]">OTND</th>
                <th className="w-[5%]">LATES</th>
                <th className="w-[5%]">ABSENT</th>
              </tr>
            </thead>
            {ExcelData.filter((fil) => fil.Employee_ID == ObjFilter.ID).map(
              (dat) => (
                <tbody>
                  <tr className="text-center shadow-sm shadow-gray-900 h-8">
                    <td className="text-[12px] arial-narrow text-black border border-gray-700 border-r-0 ">
                      {moment(chosenDate.split("_")[0]).format("MMMM DD") +
                        "-" +
                        moment(chosenDate.split("_")[1]).format("DD YYYY")}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.REG}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.OT}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.UT}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.ND}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.LWP}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.REGNS}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.OTNS}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.OTND}
                    </td>
                    <td className="text-[12px] border border-gray-700 border-l-0 border-r-0 arial-narrow text-black">
                      {dat.LATES}
                    </td>
                    <td className="text-[12px] arial-narrow border border-gray-700 border-l-0 text-black">
                      {dat.ABSENT}
                    </td>
                  </tr>
                </tbody>
              )
            )}
          </table>
        </div>
      </div>
    </>
  );
};

export default HrSummary;
