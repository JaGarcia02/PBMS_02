import React, { useState } from "react";
import { AiFillCloseCircle, AiOutlineCloseSquare } from "react-icons/ai";
import { motion, MotionConfig } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { API_URL_ADMIN, API_URL, API_URL_HR } from "../../../utils/Url";
import { BiSave } from "react-icons/bi";
import { useAdd, useEdit } from "../../../Hooks/useAuthorized";
import axios from "axios";
import { Logs } from "../../../utils/Logs";

const HrUpdateEmploymentStatus = ({
  setDataStatus,
  updateStatus,
  setUpdateStatus,
}) => {
  const { branding } = useSelector((state) => state.branding);
  const [checkEmpty, setCheckEmpty] = useState(false);

  const sumbit_UpdateEmploymentStatus = (e) => {
    e.preventDefault();
    if (updateStatus.activator.trim() == "") {
      setCheckEmpty(true);
    } else {
      axios
        .put(API_URL_HR + `update-empStatus/${updateStatus.ID}`, {
          employee_status: updateStatus.activator,
        })
        .then((res) => {
          setDataStatus(res.data);
          notify_Update();
          Logs("UPDATE", "Employment Category Updated");
        })
        .catch((err) => console.log(err));
    }
  };

  // Notify Update
  const notify_Update = () => {
    toast.info("Employment Status Updated", {
      position: "bottom-right",
      hideProgressBar: true,
      autoClose: 5000,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  return (
    <motion.div
      className="w-full h-full absolute bg-black/50 items-center flex justify-center !top-0 !left-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      exit={{ opacity: 0 }}
    >
      <motion.div className="absolute bg-white h-80 w-120 items-center shadow-md shadow-gray-900 z-999">
        <div className="w-full h-full flex flex-col item-center text-center mb-5">
          <div className=" prdc-color w-full h-25">
            {/* =========================================== */}
            <div className="flex items-center">
              <div className="mt-2 ml-2">
                <img
                  src={
                    branding
                      ? API_URL + branding[0]?.Logo
                      : "/imgs/deafult_logo.jpg"
                  }
                  alt=""
                  className="h-20 object-contain w-25 rounded-sm"
                />
              </div>
              <div className="block mt-2">
                <span className="my-1 font-Roboto text-[23px] text-white arial-narrow-bold w-full text-center flex">
                  UPDATE
                </span>
                <span className="my-3 font-Roboto text-[23px] text-white arial-narrow-bold w-full text-center">
                  EMPLOYMENT TYPE
                </span>
              </div>

              <AiOutlineCloseSquare
                onClick={() => setUpdateStatus({ activator: null, ID: null })}
                className="w-8 h-8 absolute top-1 right-1 cursor-pointer flex items-center justify-center mr-1 text-red-400 border-none active:scale-1 active:duration-75 transition-all ease-in-out hover:text-red-500 rounded-sm hover:rounded-sm"
              />
            </div>
          </div>

          <form className="w-full" onSubmit={sumbit_UpdateEmploymentStatus}>
            <div className="flex justify-center items-center w-[100%] mt-16.5">
              <label
                htmlFor=""
                className="arial-narrow-bold text-[16px] mr-[1rem]"
              >
                Employment Type:
              </label>
              <input
                type="text"
                id="input_category"
                className={`border-[2.5px] ${
                  updateStatus.activator.employee_status == "" && checkEmpty
                    ? "border-red-500"
                    : "border-gray-500"
                } px-2 arial-narrow h-6 w-60 text-[16px] outline-none rounded-sm `}
                placeholder="Employment type"
                onChange={(e) =>
                  setUpdateStatus({
                    ...updateStatus,
                    activator: e.target.value,
                  })
                }
                value={updateStatus.activator}
              />
            </div>
            <div className=" w-full flex items-center justify-end ">
              <button
                className="absolute bottom-8 arial-narrow-bold mr-4 mt-10 text-black text-[14px] h-8 w-25 justify-center border-[2.5px] border-black rounded-sm hover:(rounded-sm border-black) p-1  flex items-center focus:(outline-none) dark:(text-green-500 bg-transparent shadow-none hover:bg-green-400 hover:text-black) active:duration-75 transition-all ease-in-out rounded-sm hover:text-green-500"
                type="submit"
                disabled={useEdit() ? false : true}
              >
                <BiSave className="mr-2" />
                Update
              </button>
            </div>
          </form>
          <ToastContainer />
          <hr className="prdc-color w-full absolute h-4 bottom-0" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HrUpdateEmploymentStatus;
