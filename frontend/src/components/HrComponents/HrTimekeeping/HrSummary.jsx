import React, { useState } from "react";
import moment from "moment";
import HrEditSummary from "./HrEditSummary";
import { BiSave, BiEdit } from "react-icons/bi";

const HrSummary = ({ setToggle, ObjFilter, chosenDate, CutOff, cutList }) => {
  const [openModalEdit, setOpenModalEdit] = useState(false);

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
            <option value={2}>ADJUSTMENT</option>
            <option selected value={3}>
              SUMMARY
            </option>
          </select>
        </div>
        <div className="w-[90%] flex flex-col mt-4">
          {/* Button Edit */}
          <div className="flex w-[100%] mb-5 mt-2">
            {cutList != "" ? (
              <button
                className="w-35 h-7 prdc-color text-white flex justify-center items-center arial-narrow-bold transition ease-in-out duration-[0.5s] hover:(bg-white text-black border-[2px] border-black)"
                onClick={() => setOpenModalEdit(true)}
              >
                <BiEdit className="mr-1" />
                Edit Summary
              </button>
            ) : (
              ""
            )}
          </div>
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
            {CutOff.data.summary
              ?.filter(
                (fil) =>
                  fil.Employee_ID == ObjFilter.ID && fil.cutOffID == chosenDate
              )
              .map((dat) => (
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
              ))}
          </table>

          <span className="text-[15px] ml-1 arial-narrow-bold mt-7 text-black">
            SPECIAL HOLIDAY
          </span>
          <table className="w-[100%] h-[10%] border-separate border-spacing-4 border-transparent -mt-2 overflow-hidden">
            <thead>
              <tr className="arial-narrow text-black text-[12px] text-center shadow-sm shadow-gray-800  items-center justify-center bg-blue-200 h-10 dark:(bg-blue-500) <md:(hidden)">
                <th className="w-[20%]">Cut-off</th>
                <th className="w-[5%]">SH</th>
                <th className="w-[5%]">SH-OT</th>
                <th className="w-[6%]">SH-NS</th>
                <th className="w-[5%]">SH-ND</th>
                <th className="w-[8%]">SH-OTNS</th>
                <th className="w-[8%]">SH-OTND</th>
                <th className="w-[8%]">SH-LATE</th>
                <th className="w-[5%]"></th>
              </tr>
            </thead>
            {CutOff.data.summary
              ?.filter(
                (fil) =>
                  fil.Employee_ID == ObjFilter.ID && fil.cutOffID == chosenDate
              )
              .map((dat) => (
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
                    <td className="text-[12px] border border-gray-700 border-l-0  arial-narrow text-black">
                      {dat.OTND}
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>

          <span className="text-[15px] ml-1 arial-narrow-bold mt-7 text-black">
            LEGAL HOLIDAY
          </span>
          <table className="w-[100%] h-[10%] border-separate border-spacing-4 border-transparent -mt-2 overflow-hidden">
            <thead>
              <tr className="arial-narrow text-black text-[12px] text-center shadow-sm shadow-gray-800  items-center justify-center bg-blue-200 h-10 dark:(bg-blue-500) <md:(hidden)">
                <th className="w-[19%]">Cut-off</th>
                <th className="w-[6%]">LHS</th>
                <th className="w-[6%]">LHD</th>
                <th className="w-[6%]">LHD-OT</th>
                <th className="w-[6%]">LHD-NS</th>
                <th className="w-[6%]">LHD-ND</th>
                <th className="w-[6%]">LHD-OTNS</th>
                <th className="w-[6%]">LHD-OTND</th>
                <th className="w-[6%]">LHD-LATES</th>
              </tr>
            </thead>
            {CutOff.data.summary
              ?.filter(
                (fil) =>
                  fil.Employee_ID == ObjFilter.ID && fil.cutOffID == chosenDate
              )
              .map((dat) => (
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
                    <td className="text-[12px] border border-gray-700 border-l-0 arial-narrow text-black">
                      {dat.OTND}
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>

          <span className="text-[15px] ml-1 arial-narrow-bold mt-7 text-black">
            REST DAY
          </span>
          <table className="w-[100%] h-[10%] border-separate border-spacing-4 border-transparent -mt-2 overflow-hidden">
            <thead>
              <tr className="arial-narrow text-black text-[12px] text-center shadow-sm shadow-gray-800  items-center justify-center bg-blue-200 h-10 dark:(bg-blue-500) <md:(hidden)">
                <th className="w-[20%]">Cut-off</th>
                <th className="w-[5%]">RD</th>
                <th className="w-[5%]">RD-OT</th>
                <th className="w-[5%]">RD-NS</th>
                <th className="w-[5%]">RD-ND</th>
                <th className="w-[8%]">RD-OTNS</th>
                <th className="w-[8%]">RD-OTND</th>
                <th className="w-[8%]">RD-LATE</th>
                <th className="w-[5%]"></th>
              </tr>
            </thead>
            {CutOff.data.summary
              ?.filter(
                (fil) =>
                  fil.Employee_ID == ObjFilter.ID && fil.cutOffID == chosenDate
              )
              .map((dat) => (
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
                      {dat.LATES}
                    </td>

                    <td className="text-[12px] arial-narrow border border-gray-700 border-r-0 border-l-0 text-black">
                      {dat.ABSENT}
                    </td>
                    <td className="text-[12px] arial-narrow border border-gray-700 border-l-0 text-black"></td>
                  </tr>
                </tbody>
              ))}
          </table>

          <span className="text-[15px] ml-1 arial-narrow-bold mt-7 text-black">
            REST DAY WITH LEGAL HOLIDAY
          </span>
          <table className="w-[100%] h-[10%] border-separate border-spacing-4 border-transparent -mt-2 overflow-hidden">
            <thead>
              <tr className="arial-narrow text-black text-[12px] text-center shadow-sm shadow-gray-800  items-center justify-center bg-blue-200 h-10 dark:(bg-blue-500) <md:(hidden)">
                <th className="w-[23%]">Cut-off</th>
                <th className="w-[8%]">RDLHD</th>
                <th className="w-[8%]">RDLHD-OT</th>
                <th className="w-[8%]">RDLHD-NS</th>
                <th className="w-[8%]">RDLHD-ND</th>
                <th className="w-[8%]">RDLHD-OTNS</th>
                <th className="w-[8%]">RDLHD-OTND</th>
                <th className="w-[8%]">RDLHD-LATE</th>
              </tr>
            </thead>
            {CutOff.data.summary
              ?.filter(
                (fil) =>
                  fil.Employee_ID == ObjFilter.ID && fil.cutOffID == chosenDate
              )
              .map((dat) => (
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

                    <td className="text-[12px] arial-narrow border border-gray-700 border-l-0 text-black">
                      {dat.ABSENT}
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>

          <span className="text-[15px] ml-1 arial-narrow-bold mt-7 text-black">
            REST DAY WITH SPECIAL HOLIDAY
          </span>
          <table className="w-[100%] h-[10%] border-separate border-spacing-4 border-transparent -mt-2 overflow-hidden">
            <thead>
              <tr className="arial-narrow text-black text-[12px] text-center shadow-sm shadow-gray-800  items-center justify-center bg-blue-200 h-10 dark:(bg-blue-500) <md:(hidden)">
                <th className="w-[23%]">Cut-off</th>
                <th className="w-[8%]">RDSH</th>
                <th className="w-[8%]">RDSH-OT</th>
                <th className="w-[8%]">RDSH-NS</th>
                <th className="w-[8%]">RDSH-ND</th>
                <th className="w-[8%]">RDSH-OTNS</th>
                <th className="w-[8%]">RDSH-OTND</th>
                <th className="w-[8%]">RDSH-LATE</th>
              </tr>
            </thead>
            {CutOff.data.summary
              ?.filter(
                (fil) =>
                  fil.Employee_ID == ObjFilter.ID && fil.cutOffID == chosenDate
              )
              .map((dat) => (
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

                    <td className="text-[12px] arial-narrow border border-gray-700 border-l-0 text-black">
                      {dat.ABSENT}
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>

          <span className="text-[15px] ml-1 arial-narrow-bold mt-7 text-black">
            NON STANDARD CASES
          </span>
          <table className="w-[100%] h-[10%] border-separate border-spacing-4 border-transparent -mt-2 overflow-hidden">
            <thead>
              <tr className="arial-narrow text-black text-[12px] text-center shadow-sm shadow-gray-800  items-center justify-center bg-blue-200 h-10 dark:(bg-blue-500) <md:(hidden)">
                <th className="w-[25%]">Cut-off</th>
                <th className="w-[15%]">WAYBILL</th>
                <th className="w-[15%]">PRELOAD</th>
                <th className="w-[15%]">TUKOD</th>
                <th className="w-[15%]">TUKOD-DAY</th>
              </tr>
            </thead>
            {CutOff.data.summary
              ?.filter(
                (fil) =>
                  fil.Employee_ID == ObjFilter.ID && fil.cutOffID == chosenDate
              )
              .map((dat) => (
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

                    <td className="text-[12px] arial-narrow border border-gray-700 border-l-0 text-black">
                      {dat.ABSENT}
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>
        </div>
        {openModalEdit && (
          <HrEditSummary
            setOpenModalEdit={setOpenModalEdit}
            ObjFilter={ObjFilter}
            CutOff={CutOff}
          />
        )}
      </div>
    </>
  );
};

export default HrSummary;
