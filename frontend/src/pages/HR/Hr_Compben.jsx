import React from "react";
import Navbar from "../../components/Navbar";
import HrCompBen from "../../components/HrComponents/HrCompBen/HrCompBen";

const Hr_Compben = () => {
  return (
    <div className="w-screen h-screen  flex justify-center">
      <Navbar />
      <div
        className="mt-15 w-full p-4 flex flex-col max-w-[2000px]"
        style={{ backgroundColor: "#F2ECEC" }}
      >
        <div className="w-full flex h-20  justify-center">
          <div className="flex-[0.3] bg-white border border-t-4 border-t-gray-700 border-gray-400 relative mr-2 flex flex-col items-center justify-center">
            <p className="arial-narrow-bold text-black text-[22px] mb-1">
              Compensation Benefits
            </p>
            <p className="arial-narrow text-black text-[18px]">
              Government Deductions
            </p>
          </div>
          <div className="flex-1 flex bg-white border-gray-400 border border-t-4 border-t-gray-700">
            <div className="flex-1 px-4 flex flex-col justify-center">
              <div className="flex items-center mb-3">
                <span className=" arial-narrow-bold text-black text-[15px] inline-block w-25">
                  GOVERNMENT:
                </span>
                <p className="text-[15px] arial-narrow text-black">
                  House Development Mutual Fund Contribution
                </p>
              </div>
              <div className="flex items-center">
                <span className="arial-narrow-bold text-black text-[15px] text-[15px] inline-block w-25">
                  OUTLET:{" "}
                </span>
                <p className="text-[15px] arial-narrow text-black">Internal</p>
              </div>
            </div>
            <div className="flex-1 px-4  flex flex-col justify-center">
              <div className="flex items-center mb-3">
                <span className=" arial-narrow-bold text-black text-[15px] inline-block w-25">
                  COMPANY:
                </span>
                <p className="text-[15px] arial-narrow text-black">
                  PESO Resources Development Corporation
                </p>
              </div>
              <div className="flex items-center">
                <span className="arial-narrow-bold text-black text-[15px] text-[15px] inline-block w-25">
                  BRANCH:
                </span>
                <p className="text-[15px] arial-narrow text-black">
                  Quezon City
                </p>
              </div>
            </div>
          </div>
        </div>
        <HrCompBen />
      </div>
    </div>
  );
};

export default Hr_Compben;
