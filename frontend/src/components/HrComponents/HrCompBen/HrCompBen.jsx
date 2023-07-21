import React, { useState } from "react";
import { AiFillBank } from "react-icons/ai";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { IoIosListBox, IoMdArrowDropdown } from "react-icons/io";
import { MdGroups } from "react-icons/md";
import { RiPinDistanceFill } from "react-icons/ri";

import { FaCalendarAlt } from "react-icons/fa";
import HrCompBenTable from "./HrCompBenTable";
import { TiExport } from "react-icons/ti";

const HrCompBen = () => {
  const [GovMenu, setGovMenu] = useState(false);
  const [OutletMenu, setOutletMenu] = useState(false);
  const [Company, setCompany] = useState(false);
  const [Branch, setBranch] = useState(false);
  const [CutOff, setCutOff] = useState(false);

  return (
    <div className="w-full flex h-full  mt-2  justify-center">
      <div className="flex-[0.3]  py-3 overflow-auto flex flex-col mr-2 bg-white border border-gray-400 border-t-3 border-t-gray-700 border-b-3 border-b-gray-700">
        <div
          className={`flex items-center justify-between ${
            GovMenu ? "mb-1" : "mb-3"
          }`}
        >
          <span className="text-black text-[23px] ml-2 flex items-center arial-narrow">
            <AiFillBank className="mr-3" />{" "}
            <p className="text-[19px] arial-narrow-bold">Government</p>
          </span>
          <IoMdArrowDropdown
            className={`mr-3 text-[20px] text-black cursor-pointer transition-all transform duration-300 ${
              GovMenu ? "rotate-180" : ""
            } `}
            onClick={() => setGovMenu(!GovMenu)}
          />
        </div>
        {/* GOVERNMENT TAB */}
        {GovMenu && (
          <div className="ml-11 flex flex-col text-[12px] arial-narrow leading-5 mb-3">
            <span>Home Development Mutual Fund Contribution</span>
            <span>Philippine Health Insurance Corporation Contribution</span>
            <span>Social Security System Contribution</span>
          </div>
        )}

        <div
          className={`flex items-center justify-between ${
            OutletMenu ? "mb-1" : "mb-3"
          }`}
        >
          <span className="text-black text-[23px] ml-2 flex items-center arial-narrow">
            <MdGroups className="mr-3" />{" "}
            <p className="text-[19px] arial-narrow-bold">Outlet</p>
          </span>
          <IoMdArrowDropdown
            className={`mr-3 text-[20px] text-black cursor-pointer transition-all transform duration-300 ${
              OutletMenu ? "rotate-180" : ""
            } `}
            onClick={() => setOutletMenu(!OutletMenu)}
          />
        </div>
        {/* OUTLET TAB */}
        {OutletMenu && (
          <div className="ml-11 flex flex-col text-[12px] arial-narrow leading-5 mb-3">
            <span>Internal</span>
            <span>External</span>
          </div>
        )}
        <div
          className={`flex items-center justify-between ${
            Company ? "mb-1" : "mb-3"
          }`}
        >
          <span className="text-black text-[23px] ml-2 flex items-center arial-narrow">
            <HiBuildingOffice2 className="mr-3" />{" "}
            <p className="text-[19px] arial-narrow-bold">Company</p>
          </span>
          <IoMdArrowDropdown
            className={`mr-3 text-[20px] text-black cursor-pointer transition-all transform duration-300 ${
              Company ? "rotate-180" : ""
            } `}
            onClick={() => setCompany(!Company)}
          />
        </div>
        {/* COMPANY TAB */}
        {Company && (
          <div className="ml-11 flex flex-col text-[12px] arial-narrow leading-5 mb-3">
            <span>Peso Resources Development Corp</span>
          </div>
        )}
        <div
          className={`flex items-center justify-between ${
            Branch ? "mb-1" : "mb-3"
          }`}
        >
          <span className="text-black text-[23px] ml-2 flex items-center arial-narrow">
            <RiPinDistanceFill className="mr-3" />{" "}
            <p className="text-[19px] arial-narrow-bold">Branch</p>
          </span>
          <IoMdArrowDropdown
            className={`mr-3 text-[20px] text-black cursor-pointer transition-all transform duration-300 ${
              Branch ? "rotate-180" : ""
            } `}
            onClick={() => setBranch(!Branch)}
          />
        </div>

        {/* BRANCH TAB */}
        {Branch && (
          <div className="ml-11 flex flex-col text-[12px] arial-narrow leading-5 mb-3">
            <span>Quezon City</span>
          </div>
        )}
        <div className="flex items-center justify-between mb-3">
          <span className="text-black text-[23px] ml-2 flex items-center arial-narrow">
            <FaCalendarAlt className="mr-3" />{" "}
            <p className="text-[19px] arial-narrow-bold">Cutoff</p>
          </span>
          <IoMdArrowDropdown
            className={`mr-3 text-[20px] text-black cursor-pointer transition-all transform duration-300 ${
              CutOff ? "rotate-180" : ""
            } `}
            onClick={() => setCutOff(!CutOff)}
          />
        </div>
        {/* CUTOFF */}
        {CutOff && (
          <div className="ml-11 flex flex-col text-[12px] arial-narrow leading-5 mb-3">
            <div className="flex items-center">
              <span className="inline-block w-10">From: </span>
              <input className="border border-black h-4" type="date" />
            </div>
            <div className="flex items-center">
              <span className="inline-block w-10">to: </span>
              <input className="border border-black h-4" type="date" />
            </div>
          </div>
        )}
        <button
          className="mt-auto w-30 mx-auto rounded-sm text-white items-center flex justify-evenly hover:(bg-blue-800 border border-blue-800)"
          style={{ backgroundColor: "#4A4E5F" }}
        >
          <IoIosListBox /> VIEW LIST
        </button>
      </div>
      <div className="flex-1 flex flex-col bg-white border-b-3 border-b-gray-700 p-1 ">
        <HrCompBenTable />
        <button
          className="mt-auto ml-auto mb-2 mr-1 flex items-center w-25 justify-evenly rounded-sm text-white"
          style={{ backgroundColor: "#707070" }}
        >
          <TiExport /> EXPORT
        </button>
      </div>
    </div>
  );
};

export default HrCompBen;
