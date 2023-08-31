import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL_HR } from "../../../utils/Url";

const HRGovIDs = ({
  setToggleState,
  setEmployeeInfo,
  employeeInfo,
  profile,
  setProfile,
  click_save,
}) => {
  console.log(employeeInfo);

  return (
    <div className="w-full p-8 items-center  mt-15  backg-color-prdc h-full flex-col flex">
      <div className="flex items-end mt-3">
        <span className="arial-narrow emptext-color inline-block w-[14rem] text-[14px] <md:(inline-block w-[7rem])">
          SSS Number:
        </span>
        <input
          className="w-40 arial-narrow-bold pl-1 focus:outline-none h-6 text-[14px] arial-narrow border-b border-black backg-color-prdc <md:(ml-0 w-40  h-6 text-[14px])"
          value={employeeInfo.Employee_SSS}
          onChange={(e) =>
            setEmployeeInfo({
              ...employeeInfo,
              Employee_SSS: e.target.value,
            })
          }
          type="number"
          maxLength={9}
        />
      </div>
      <div className="flex items-end mt-3">
        <span className="arial-narrow emptext-color inline-block w-[14rem] text-[14px] <md:(inline-block w-[7rem])">
          Pag-Ibig ID Number:
        </span>
        <input
          className="w-40 arial-narrow-bold pl-1 focus:outline-none h-6 text-[14px] arial-narrow border-b border-black backg-color-prdc <md:(ml-0 w-40  h-6 text-[14px])"
          value={employeeInfo.Employee_Pag_Ibig}
          onChange={(e) =>
            setEmployeeInfo({
              ...employeeInfo,
              Employee_Pag_Ibig: e.target.value,
            })
          }
          type="number"
          maxLength={12}
        />
      </div>
      <div className="flex items-end mt-3">
        <span className="arial-narrow emptext-color inline-block w-[14rem] text-[14px] <md:(inline-block w-[7rem])">
          Philhealth Number:
        </span>
        <input
          className="w-40 arial-narrow-bold pl-1 focus:outline-none h-6 text-[14px] arial-narrow border-b border-black backg-color-prdc <md:(ml-0 w-40  h-6 text-[14px])"
          value={employeeInfo.Employee_PhilHealth}
          onChange={(e) =>
            setEmployeeInfo({
              ...employeeInfo,
              Employee_PhilHealth: e.target.value,
            })
          }
          type="number"
          maxLength={12}
        />
      </div>
      <div className="flex items-end mt-3">
        <span className="arial-narrow emptext-color inline-block w-[14rem] text-[14px] <md:(inline-block w-[7rem])">
          Tax Identification Number:
        </span>
        <input
          className="w-40 arial-narrow-bold pl-1 focus:outline-none h-6 text-[14px] arial-narrow border-b border-black backg-color-prdc <md:(ml-0 w-40  h-6 text-[14px])"
          value={employeeInfo.Employee_TIN}
          onChange={(e) =>
            setEmployeeInfo({
              ...employeeInfo,
              Employee_TIN: e.target.value,
            })
          }
          type="number"
          maxLength={12}
        />
      </div>
      <div className="flex items-end mt-3">
        <span className="arial-narrow  emptext-color inline-block w-[14rem] text-[14px] <md:(inline-block w-[7rem])">
          Driver's License Number:
        </span>
        <input
          className="w-40 arial-narrow-bold pl-1 focus:outline-none h-6 text-[14px] arial-narrow border-b border-black backg-color-prdc <md:(ml-0 w-40  h-6 text-[14px])"
          value={employeeInfo.Employee_DriversLicense}
          onChange={(e) =>
            setEmployeeInfo({
              ...employeeInfo,
              Employee_DriversLicense: e.target.value,
            })
          }
          maxLength={11}
        />
      </div>

      <div className="flex items-end mt-3">
        <span className="arial-narrow  emptext-color inline-block w-[14rem] text-[14px] <md:(inline-block w-[7rem])">
          PRC Number:
        </span>
        <input
          className="w-40 arial-narrow-bold pl-1 focus:outline-none h-6 text-[14px] arial-narrow border-b border-black backg-color-prdc <md:(ml-0 w-40  h-6 text-[14px])"
          value={employeeInfo.Employee_PRC}
          onChange={(e) =>
            setEmployeeInfo({
              ...employeeInfo,
              Employee_PRC: e.target.value,
            })
          }
          type="number"
        />
      </div>
      <button
        onClick={click_save}
        className="prdc-border text-white initial-pag-border arial-narrow-bold absolute bottom-0 right-6 active:scale-1  rounded-sm text-[14px] h-7 w-20  hover:(border-black rounded-sm) active:duration-75 transition-all hover:(scale-108 ease-in-out  transform py-1 rounded-sm) group  mb-5 flex items-center justify-center     disabled:(bg-gray-500 border-gray-500 cursor-not-allowed)  focus:(outline-none) dark:(bg-transparent border-black border-[0.5px] hover:(arial-narrow-bold)"
      >
        SAVE
        {/* <AiOutlineArrowRight className="ml-2 text-initial group-hover:(text-[17px])" /> */}
      </button>
    </div>
  );
};

export default HRGovIDs;
