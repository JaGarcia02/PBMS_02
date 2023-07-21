import React from "react";
import { useSelector } from "react-redux";
import { API_URL } from "../../../utils/Url";
import { AiOutlineClose } from "react-icons/ai";
import moment from "moment";
import { motion } from "framer-motion";

const HrPraRecruitment = ({ viewPra, setViewPra, customClass }) => {
  const { branding } = useSelector((state) => state?.branding);
  console.log(viewPra);

  return (
    <motion.div
      initial={{
        x: 500,
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      animate={{
        x: 0,
      }}
      exit={{ x: 500 }}
      className={customClass}
    >
      <AiOutlineClose
        className="text-white absolute text-[25px] right-1 top-1 cursor-pointer w-8 border border-white"
        onClick={() => setViewPra(null)}
      />
      <div
        className="flex h-20 w-full items-center p-3"
        style={{ background: "#2B3043" }}
      >
        <img
          src={API_URL + branding[0].Logo}
          className="h-15 w-15 object-contain"
        />
        <span className="text-white text-[30px] ml-4 arial-narrow-bold">
          {viewPra?.request_position}
        </span>
      </div>
      <div className="flex flex-col p-4 ">
        <div className="flex items-center justify-between arial-narrow text-black">
          <span>Date Requested:</span>
          <span className="border w-[55%] border-black px-1">
            {moment(viewPra?.request_date).format("MM/DD/YYYY - hh:mm a")}
          </span>
        </div>
        <div className="flex items-center justify-between arial-narrow text-black mt-3">
          <span>Position Title:</span>
          <span className="border w-[55%] border-black px-1">
            {viewPra?.request_position}
          </span>
        </div>
        <div className="flex items-center justify-between arial-narrow text-black mt-3">
          <span>Position Level:</span>
          <span className="border w-[55%] border-black px-1">
            {viewPra?.request_positionLevel}
          </span>
        </div>
        <div className="flex items-center justify-between arial-narrow text-black mt-3">
          <span>No. of Vacancies:</span>
          <span className="border w-[55%] border-black px-1">
            {viewPra?.request_count}
          </span>
        </div>
        <div className="flex items-center justify-between arial-narrow text-black mt-3">
          <span>Requesting Department:</span>
          <span className="border w-[55%] border-black px-1">
            {viewPra?.request_department}
          </span>
        </div>
        <div className="flex items-center justify-between arial-narrow text-black mt-3">
          <span>Salary Range:</span>
          <span className="border w-[55%] border-black px-1">
            {viewPra?.request_salary}
          </span>
        </div>
        <div className="flex flex-col mt-6">
          <span className="arial-narrow-bold text-[20px] text-black">
            JOB DESCRIPTION
          </span>
          <p className=" mt-3 h-9 overflow-y-auto w-full border border-black px-1">
            {viewPra?.request_jobDescription}
          </p>
        </div>
        <div className="flex flex-col mt-6">
          <span className="arial-narrow-bold text-[20px] text-black">
            JOB QUALIFICATION
          </span>
          <p className=" mt-3 h-9 overflow-y-auto w-full border border-black px-1">
            {viewPra?.request_qualification}
          </p>
        </div>
        <div className="flex flex-col mt-6">
          <span className="arial-narrow-bold text-[20px] text-black">
            JOB SPECIFICATION & WORK EXPERIENCE
          </span>
          <p className=" mt-3 h-9 overflow-y-auto w-full border border-black px-1">
            {viewPra?.request_specifiactionWorkExperience}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default HrPraRecruitment;
