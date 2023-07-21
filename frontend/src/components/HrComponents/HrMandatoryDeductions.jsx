import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { OutTable, ExcelRenderer } from "react-excel-renderer";
import { API_URL_HR } from "../../utils/Url";
import HrSSSDeductions from "./HrMandatoryDeductions/HrSSSDeductions";
import { TbReceiptTax } from "react-icons/tb";
import { BsFillArrowDownSquareFill } from "react-icons/bs";
import HrPagIbig from "./HrMandatoryDeductions/HrPagIbig";
import HrPhilhealth from "./HrMandatoryDeductions/HrPhilhealth";

const HrMandatoryDeductions = () => {
  const [option, setOption] = useState(1);

  return (
    <div className="w-full relative h-full flex flex-col p-4">
      <div className=" flex justify-between w-full mb-3">
        <span className="text-[18px] text-black arial-narrow text-[18px]">
          Mandatory Deductions
        </span>

        <select
          onChange={(e) => setOption(e.target.value)}
          className="border-[2px] border-gray-500 w-50 h-6.5 outline-none appearance-none rounded-sm px-1 text-[14px] arial-narrow bg-icon"
        >
          <option value="1">SSS</option>
          <option value="2">PAG-IBIG</option>
          <option value="3">PHILHEALTH</option>
          <option value="4">TAX</option>
        </select>
      </div>

      {/* <div className="flex w-[40%] justify-between my-3 arial-narrow-bold">
        <div
          className="flex items-center cursor-pointer p-1 rounded-md hover:(bg-blue-200)"
          onClick={() => setOption(1)}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Social_Security_System_%28SSS%29.svg"
            className="h-5 w-5 mr-2 pointer-events-none"
          />
          <span>SSS</span>
        </div>

        <div
          className="flex items-center cursor-pointer p-1 rounded-md hover:(bg-blue-200)"
          onClick={() => setOption(2)}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/5b/Pag-IBIG.svg"
            className="h-5 w-5 mr-2 pointer-events-none"
          />
          <span>PAG-IBIG</span>
        </div>

        <div
          className="flex items-center cursor-pointer p-1 rounded-md hover:(bg-blue-200)"
          onClick={() => setOption(3)}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Philippine_Health_Insurance_Corporation_%28PhilHealth%29.svg"
            className="h-5 w-9 mr-2 object-contain pointer-events-none"
          />
          <span>PHILHEALTH</span>
        </div>

        <div
          className="flex items-center cursor-pointer p-1 rounded-md hover:(bg-blue-200)"
          onClick={() => setOption(4)}
        >
          <TbReceiptTax className="mr-2 text-[19px]" />
          <span>TAX</span>
        </div>
      </div> */}

      {option == 1 ? (
        <HrSSSDeductions />
      ) : option == 2 ? (
        <HrPagIbig />
      ) : option == 3 ? (
        <HrPhilhealth />
      ) : (
        ""
      )}
    </div>
  );
};

export default HrMandatoryDeductions;
