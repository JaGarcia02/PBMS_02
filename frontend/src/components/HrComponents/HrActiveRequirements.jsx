import React, { useState } from "react";
import axios from "axios";
import { API_URL_HR } from "../../utils/Url";
import { useEdit } from "../../Hooks/useAuthorized";
import {
  BsPersonFillDash,
  BsPersonFillLock,
  BsArrowLeftShort,
  BsArrowRightShort,
} from "react-icons/bs";
import { BiSave } from "react-icons/bi";
import { motion, MotionConfig } from "framer-motion";
const HrActiveRequirements = ({
  employeeInfo,
  setEmployeeInfo,
  setCurrentPage,
}) => {
  const [requirements, setRequirements] = useState({
    Employee_SSS: employeeInfo.Employee_SSS,
    Employee_Pag_Ibig: employeeInfo.Employee_Pag_Ibig,
    Employee_PhilHealth: employeeInfo.Employee_PhilHealth,
    Employee_TIN: employeeInfo.Employee_TIN,
  });

  const [validate, setValidate] = useState(false);

  const validateReqData = () => {
    if (requirements.Employee_SSS.trim() === "") {
      document.getElementById("sss").style.borderColor = "red";
      setValidate(true);
    } else {
      document.getElementById("sss").style.borderColor = "black";
      setValidate(false);
    }

    if (requirements.Employee_PhilHealth.trim() === "") {
      document.getElementById("pilhelth").style.borderColor = "red";
      setValidate(true);
    } else {
      document.getElementById("pilhelth").style.borderColor = "black";
      setValidate(false);
    }

    if (requirements.Employee_Pag_Ibig.trim() === "") {
      document.getElementById("pagibig").style.borderColor = "red";
      setValidate(true);
    } else {
      document.getElementById("pagibig").style.borderColor = "black";
      setValidate(false);
    }

    if (requirements.Employee_TIN.trim() === "") {
      document.getElementById("tin").style.borderColor = "red";
      setValidate(true);
    } else {
      document.getElementById("tin").style.borderColor = "black";
      setValidate(false);
    }
  };

  const save_employment = () => {
    // if (requirements.Employee_SSS.trim() == "") {
    //   validateReqData();
    // } else {
    setEmployeeInfo({
      ...employeeInfo,
      Employee_SSS: requirements.Employee_SSS,
      Employee_Pag_Ibig: requirements.Employee_Pag_Ibig,
      Employee_PhilHealth: requirements.Employee_PhilHealth,
      Employee_TIN: requirements.Employee_TIN,
    });

    setCurrentPage(3);
    // }
  };
  // ========================================================================================================================================================================
  function SSS_number_format(text) {
    var result = [];
    text = text.replace(/[^\d]/g, "");
    while (text.length >= 6) {
      result.push(text.substring(0, 2));
      text = text.substring(2);
      result.push(text.substring(0, 7));
      text = text.substring(7);
      result.push(text.substring(0, 1));
      text = text.substring(1);
    }
    if (text.length > 0) result.push(text);
    return result.join("-");
  }
  function PagIbig_number_format(text) {
    var result = [];
    text = text.replace(/[^\d]/g, "");
    while (text.length >= 6) {
      result.push(text.substring(0, 4));
      text = text.substring(4);
    }
    if (text.length > 0) result.push(text);
    return result.join("-");
  }
  function TIN_number_format(text) {
    var result = [];
    text = text.replace(/[^\d]/g, "");
    while (text.length >= 6) {
      result.push(text.substring(0, 3));
      text = text.substring(3);
    }
    if (text.length > 0) result.push(text);
    return result.join("-");
  }
  // ========================================================================================================================================================================
  return (
    <motion.div
      className="w-full h-full absolute bg-black/50 items-center flex justify-center !top-0 !left-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      exit={{ opacity: 0 }}
    >
      <motion.div className="bg-gray-200 h-[700px] w-[39rem] items-center rounded-md shadow-md shadow-gray-900 overflow-y-auto overflow-x-hidden z-999">
        <div className="items-center  flex justify-center items-center mt-8">
          <div className="float-left">
            <div className="flex justify-center  items-center mb-5 mt-10">
              <h1 className="text-[28px]">Employee Requirements</h1>
            </div>
            <div className=" flex flex-col">
              {/* Government ========================================= */}
              <div className="justify-between flex mt-2">
                <div className="block">
                  <label htmlFor="" className="flex flex font-Roboto">
                    SSS
                  </label>
                  <input
                    id="sss"
                    placeholder="00-0000000-0"
                    type="text"
                    className="border border-black w-35 arial-narrow-bold text-black"
                    // placeholder="Given Name. . ."
                    onChange={(e) =>
                      setRequirements({
                        ...requirements,
                        Employee_SSS: SSS_number_format(e.target.value),
                      })
                    }
                    value={requirements.Employee_SSS}
                    maxLength={12}
                    onInput={(e) => {
                      if (e.target.value.length > e.target.maxLength)
                        e.target.value = e.target.value.slice(
                          0,
                          e.target.maxLength
                        );
                    }}
                  />
                  {validate && requirements.Employee_SSS.trim() === "" ? (
                    <p className="absolute text-red-600 left-4 text-[14px] top-35  arial-narrow">
                      This Field is required
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="block">
                  <label htmlFor="" className="flex ml-1 flex font-Roboto">
                    Phil Health
                  </label>
                  <input
                    type="text"
                    placeholder="00-0000000-0"
                    id="pilhelth"
                    className="border border-black ml-1 w-35 arial-narrow-bold text-black"
                    maxLength={12}
                    onChange={(e) =>
                      setRequirements({
                        ...requirements,
                        Employee_PhilHealth: SSS_number_format(e.target.value),
                      })
                    }
                    value={requirements.Employee_PhilHealth}
                    // placeholder="Middle name. . ."
                    onInput={(e) => {
                      if (e.target.value.length > e.target.maxLength)
                        e.target.value = e.target.value.slice(
                          0,
                          e.target.maxLength
                        );
                    }}
                  />
                  {validate &&
                  requirements.Employee_PhilHealth.trim() === "" ? (
                    <p className="absolute text-red-600 left-40 text-[14px] top-35  arial-narrow">
                      This Field is required
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="block">
                  <label htmlFor="" className="flex ml-1 flex font-Roboto">
                    Pag-Ibig
                  </label>
                  <input
                    type="text"
                    placeholder="0000-0000-0000"
                    id="pagibig"
                    className="border border-black ml-1 w-35 arial-narrow-bold text-black"
                    onChange={(e) =>
                      setRequirements({
                        ...requirements,
                        Employee_Pag_Ibig: PagIbig_number_format(
                          e.target.value
                        ),
                      })
                    }
                    value={requirements.Employee_Pag_Ibig}
                    // placeholder="Last name. . ."
                    maxLength={14}
                    onInput={(e) => {
                      if (e.target.value.length > e.target.maxLength)
                        e.target.value = e.target.value.slice(
                          0,
                          e.target.maxLength
                        );
                    }}
                  />
                  {validate && requirements.Employee_Pag_Ibig.trim() === "" ? (
                    <p className="absolute text-red-600 left-76 text-[14px] top-35  arial-narrow">
                      This Field is required
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="block">
                  <label htmlFor="" className="flex ml-1 flex font-Roboto">
                    TIN
                  </label>
                  <input
                    type="text"
                    placeholder="000-000-0000"
                    id="tin"
                    className="border border-black ml-1 w-35 arial-narrow-bold text-black"
                    onChange={(e) =>
                      setRequirements({
                        ...requirements,
                        Employee_TIN: TIN_number_format(e.target.value),
                      })
                    }
                    value={requirements.Employee_TIN}
                    // placeholder="Last name. . ."
                    maxLength={12}
                    onInput={(e) => {
                      if (e.target.value.length > e.target.maxLength)
                        e.target.value = e.target.value.slice(
                          0,
                          e.target.maxLength
                        );
                    }}
                  />
                  {validate && requirements.Employee_TIN.trim() === "" ? (
                    <p className="absolute text-red-600 left-112 text-[14px] top-35  arial-narrow">
                      This Field is required
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              {/*  ========================================= */}

              {/* Clearance ========================================= */}
              <div className="flex justify-between mt-5">
                <div className="block">
                  <label htmlFor="" className="flex flex font-Roboto">
                    NBI Clearance
                  </label>
                  <input
                    type="text"
                    className="border border-black w-45 arial-narrow-bold text-black"
                    // placeholder="Given Name. . ."
                  />
                </div>
                <div className="block">
                  <label htmlFor="" className="flex ml-3 flex font-Roboto">
                    Police Clearance
                  </label>
                  <input
                    type="text"
                    className="border border-black ml-3 w-45 arial-narrow-bold text-black"
                    // placeholder="Middle name. . ."
                  />
                </div>
                <div className="block">
                  <label htmlFor="" className="flex ml-3 flex font-Roboto">
                    Barangay Clearance
                  </label>
                  <input
                    type="text"
                    className="border border-black ml-3 w-45 arial-narrow-bold text-black"
                    // placeholder="Last name. . ."
                  />
                </div>
              </div>
              {/*  ========================================= */}

              {/* Certificate ========================================= */}
              <div className="flex justify-between mt-5">
                <div className="block w-[50%]">
                  <label htmlFor="" className="flex flex font-Roboto">
                    TOR
                  </label>
                  <input
                    type="text"
                    className="border border-black w-70 arial-narrow-bold text-black"
                    // placeholder="Given Name. . ."
                  />
                </div>
                <div className="block w-[50%]">
                  <label htmlFor="" className="flex ml-3 flex font-Roboto">
                    Diploma
                  </label>
                  <input
                    type="text"
                    className="border border-black ml-3 w-68.5 arial-narrow-bold text-black"
                    // placeholder="Middle name. . ."
                  />
                </div>
              </div>
              {/*  ========================================= */}

              {/* Additional Certificate ========================================= */}
              <div className="flex justify-between mt-5">
                <div className="block w-[50%]">
                  <label htmlFor="" className="flex flex font-Roboto">
                    Birth Certificate
                  </label>
                  <input
                    type="text"
                    className="border border-black w-70 arial-narrow-bold text-black"
                    // placeholder="Given Name. . ."
                  />
                </div>
                <div className="block w-[50%]">
                  <label htmlFor="" className="flex ml-3 flex font-Roboto">
                    Medical Certificate
                  </label>
                  <input
                    type="text"
                    className="border border-black ml-3 w-68.5 arial-narrow-bold text-black"
                    // placeholder="Middle name. . ."
                  />
                </div>
              </div>
              {/*  ========================================= */}

              {/* Birth Certificate ========================================= */}

              <div className="flex justify-between mt-21.5">
                <div className="block">
                  <button
                    onClick={() => setCurrentPage(1)}
                    className="w-18 h-7 absolute bottom-2 left-5 top-140 pr-2 flex items-center justify-center text-[80%]   mr-3 shadow-sm text-black   border border-black active:scale-1 active:duration-75 transition-all hover:scale-108 ease-in-out  transform py-1 rounded-sm hover:rounded-sm hover:border-black "
                  >
                    <BsArrowLeftShort className=" text-[20px] cursor-pointer text-black hover:(text-black ) <md:(text-[50px])" />
                    Back
                  </button>
                </div>
                <div className="block">
                  <button
                    className="border-green-500 mt-39 active:scale-1 rounded-sm text-[14px] h-8 w-24 hover:(border-green-500 rounded-sm) active:duration-75 transition-all hover:(scale-108 ease-in-out  transform py-1 rounded-sm)  mb-5 flex items-center justify-center text-green-600   mr-5 disabled:(bg-gray-500 border-gray-500 cursor-not-allowed)  focus:(outline-none) dark:(bg-transparent border-green-500 border-2 text-green-500"
                    type="submit"
                    disabled={useEdit() ? false : true}
                    onClick={save_employment}
                  >
                    <BiSave className="mr-2 text-green-600" />
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HrActiveRequirements;
