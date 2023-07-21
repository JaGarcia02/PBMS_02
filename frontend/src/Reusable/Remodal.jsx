import React from "react";
import { motion } from "framer-motion";

const Remodal = ({
  children,
  Icon,
  custom_color,
  custom_text,
  border_color,
  click_save,
  disregard,
}) => {
  return (
    <motion.div className="bg-black/50 h-screen w-screen fixed items-center justify-center flex z-9999999">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        exit={{ opacity: 0 }}
        className="absolute bg-white h-75 w-120 items-center shadow-md shadow-gray-900 z-999"
      >
        <div className="flex flex-col items-center justify-center">
          <div className={`h-3 w-full ${custom_color}`}></div>
          {Icon}
          <span className={`text-[30px] ${custom_text} arial-narrow-bold`}>
            Success!
          </span>
          <span className={`${custom_color} h-1 w-50 mt-2`}></span>

          <span className="text-center arial-narrow-bold items-center justify-center flex text-[20px] mt-5">
            {children}
          </span>

          <div>
            <button
              onClick={disregard}
              className="rounded-full w-30 mt-5 mb-8 bg-gray-400 mr-2  border-[2.5px]  bg-white items-center text-white justify-center h-8 arial-narrow-bold text-[18px] hover:(border-gray-400) focus:(outline-none)"
            >
              Discard
            </button>
            <button
              onClick={click_save}
              className={`rounded-full w-30 mt-5 mb-8 bg-yellow-400   border-[2.5px] ${border_color} bg-white items-center text-white justify-center h-8 arial-narrow-bold text-[18px] hover:(border-yellow-400) focus:(outline-none)`}
            >
              Save
            </button>
          </div>
          <span className={`h-3 w-full ${custom_color}`}></span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Remodal;
