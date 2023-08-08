import moment from "moment";
import React from "react";
import { BsFillPlusCircleFill, BsFillTrash3Fill } from "react-icons/bs";
import { MdModeEditOutline } from "react-icons/md";

const HrAdjustment = ({ setToggle, ObjFilter, chosenDate, CutOff }) => {
  return (
    <div className="flex flex-col w-full  p-1 items-center">
      <div className="relative prdc-color flex items-center justify-center text-[12px] w-full h-10 shadow-sm shadow-gray-900 text-white  arial-narrow-bold">
        EMPLOYEE'S ADJUSTMENT
        <select
          onChange={(e) => setToggle(e.target.value)}
          className="absolute right-2 w-30 h-6.5 outline-none appearance-none rounded-sm px-1 text-[14px] arial-narrow bg-icon2"
        >
          <option value={1}>BIOMETRICS</option>
          <option selected value={2}>
            ADJUSTMENT
          </option>
          <option value={3}>SUMMARY</option>
        </select>
      </div>
      <div className="w-full h-full flex  flex-col overflow-y-auto">
        <div className="w-[98%] text-black mt-3 arial-narrow-bold items-center justify-start flex flex-col">
          <span className=" text-13px w-full">
            {" "}
            REST DAY WITH LEGAL HOLIDAY
          </span>
          <table className="w-[100%]   border-spacing-4 border-transparent mt-2 overflow-hidden">
            <thead>
              <tr className="  arial-narrow-bold  text-black text-[12px] border-gray-500 border w-full h-10 rounded-md flex items-center bg-blue-200   dark:(bg-blue-500) <md:(hidden)">
                <th className="w-[14%]">Date</th>
                <th className="w-[12%]">RDLHD</th>
                <th className="w-[12%]">RDLHD-OT</th>
                <th className="w-[12%]">RDLHD-NS</th>
                <th className="w-[13%]">RDLHD-ND</th>
                <th className="w-[13%]">RDLHD-OTNS</th>
                <th className="w-[12%]">RDLHD-OTND</th>
                <th className="w-[12%]">RDLHD-LATE</th>
                <th className="w-[12%] ">
                  <BsFillPlusCircleFill className="h-4 w-4 text-black cursor-pointer" />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className=" arial-narrow-bold  text-black text-[12px] mt-2 border-gray-500 border w-full h-10 rounded-md flex items-center    dark:(bg-blue-500) <md:(hidden)">
                <td className="w-[14%] text-[18px] arial-narrow text-black  ">
                  {/* {moment(chosenDate.split("_")[0]).format("MMMM DD") +
                  "-" +
                  moment(chosenDate.split("_")[1]).format("DD YYYY")} */}
                  <> </>
                </td>
                <td className="w-[12%] text-[12px]  arial-narrow text-black">
                  {/* {dat.REG} */}
                  <> </>
                </td>
                <td className="w-[12%] text-[12px]  arial-narrow text-black">
                  {/* {dat.OT} */}
                  <> </>
                </td>
                <td className="w-[12%] text-[12px]  arial-narrow text-black">
                  {/* {dat.UT} */}
                  <> </>
                </td>
                <td className="w-[13%] text-[12px]  arial-narrow text-black">
                  {/* {dat.ND} */}
                  <> </>
                </td>
                <td className="w-[13%] text-[12px]  arial-narrow text-black">
                  {/* {dat.LWP} */}
                  <> </>
                </td>
                <td className="w-[12%] text-[12px]  arial-narrow text-black">
                  {/* {dat.REGNS} */}
                  <> </>
                </td>
                <td className="w-[12%] items-center justify-evenly flex text-[12px]  arial-narrow text-black">
                  <MdModeEditOutline className="h-4 w-4 text-black cursor-pointer" />{" "}
                  <BsFillTrash3Fill className="h-4 w-4 text-black cursor-pointer" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-[98%] text-black mt-3 arial-narrow-bold items-center justify-start flex flex-col">
          <span className=" text-13px w-full">
            {" "}
            REST DAY WITH SPECIAL HOLIDAY
          </span>
          <table className="w-[100%]   border-spacing-4 border-transparent mt-2 overflow-hidden">
            <thead>
              <tr className="  arial-narrow-bold  text-black text-[12px] border-gray-500 border w-full h-10 rounded-md flex items-center bg-blue-200   dark:(bg-blue-500) <md:(hidden)">
                <th className="w-[14%]">Date</th>
                <th className="w-[12%]">RDSH</th>
                <th className="w-[12%]">RDSH-OT</th>
                <th className="w-[12%]">RDSH-NS</th>
                <th className="w-[13%]">RDSH-ND</th>
                <th className="w-[13%]">RDSH-OTNS</th>
                <th className="w-[12%]">RDSH-OTND</th>
                <th className="w-[12%]">RDSH-LATE</th>
                <th className="w-[12%] ">
                  <BsFillPlusCircleFill className="h-4 w-4 text-black cursor-pointer" />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className=" arial-narrow-bold  text-black text-[12px] mt-2 border-gray-500 border w-full h-10 rounded-md flex items-center    dark:(bg-blue-500) <md:(hidden)">
                <td className="w-[14%] text-[18px] arial-narrow text-black  ">
                  {/* {moment(chosenDate.split("_")[0]).format("MMMM DD") +
                  "-" +
                  moment(chosenDate.split("_")[1]).format("DD YYYY")} */}
                  <> </>
                </td>
                <td className="w-[12%] text-[12px]  arial-narrow text-black">
                  {/* {dat.REG} */}
                  <> </>
                </td>
                <td className="w-[12%] text-[12px]  arial-narrow text-black">
                  {/* {dat.OT} */}
                  <> </>
                </td>
                <td className="w-[12%] text-[12px]  arial-narrow text-black">
                  {/* {dat.UT} */}
                  <> </>
                </td>
                <td className="w-[13%] text-[12px]  arial-narrow text-black">
                  {/* {dat.ND} */}
                  <> </>
                </td>
                <td className="w-[13%] text-[12px]  arial-narrow text-black">
                  {/* {dat.LWP} */}
                  <> </>
                </td>
                <td className="w-[12%] text-[12px]  arial-narrow text-black">
                  {/* {dat.REGNS} */}
                  <> </>
                </td>
                <td className="w-[12%] items-center justify-evenly flex text-[12px]  arial-narrow text-black">
                  <MdModeEditOutline className="h-4 w-4 text-black cursor-pointer" />{" "}
                  <BsFillTrash3Fill className="h-4 w-4 text-black cursor-pointer" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-[98%] text-black mt-3 arial-narrow-bold items-center justify-start flex flex-col">
          <span className=" text-13px w-full"> NO STANDART CASES</span>
          <table className="w-[100%]   border-spacing-4 border-transparent mt-2 overflow-hidden">
            <thead>
              <tr className="  arial-narrow-bold  text-black text-[12px] border-gray-500 border w-full h-10 rounded-md flex items-center bg-blue-200   dark:(bg-blue-500) <md:(hidden)">
                <th className="w-[16%]">Date</th>
                <th className="w-[15%]">WAYBILL</th>
                <th className="w-[15%]">PRELOAD</th>
                <th className="w-[15%]">TUKOD</th>
                <th className="w-[15%]">TUKOD-DAY</th>
                <th className="w-[10%]"></th>
                <th className="w-[10%]"></th>
                <th className="w-[10%]"></th>
                <th className="w-[14%] ">
                  <BsFillPlusCircleFill className="h-4 w-4 text-black cursor-pointer" />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className=" arial-narrow-bold  text-black text-[12px] mt-2 border-gray-500 border w-full h-10 rounded-md flex items-center    dark:(bg-blue-500) <md:(hidden)">
                <td className="w-[16%] text-[18px] arial-narrow text-black  ">
                  {/* {moment(chosenDate.split("_")[0]).format("MMMM DD") +
                  "-" +
                  moment(chosenDate.split("_")[1]).format("DD YYYY")} */}
                  <> </>
                </td>
                <td className="w-[14%] text-[12px]  arial-narrow text-black">
                  {/* {dat.REG} */}
                  <> </>
                </td>
                <td className="w-[14%] text-[12px]  arial-narrow text-black">
                  {/* {dat.OT} */}
                  <> </>
                </td>
                <td className="w-[14%] text-[12px]  arial-narrow text-black">
                  {/* {dat.UT} */}
                  <> </>
                </td>
                <td className="w-[14%] text-[12px]  arial-narrow text-black">
                  {/* {dat.ND} */}
                  <> </>
                </td>
                <td className="w-[14%] text-[12px]  arial-narrow text-black">
                  {/* {dat.LWP} */}
                  <> </>
                </td>
                <td className="w-[14%] text-[12px]  arial-narrow text-black">
                  {/* {dat.REGNS} */}
                  <> </>
                </td>
                <td className="w-[14%] items-center justify-evenly flex text-[12px]  arial-narrow text-black">
                  <MdModeEditOutline className="h-4 w-4 text-black cursor-pointer" />{" "}
                  <BsFillTrash3Fill className="h-4 w-4 text-black cursor-pointer" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HrAdjustment;
