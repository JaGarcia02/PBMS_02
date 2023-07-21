import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { AiOutlineWarning } from "react-icons/ai";
import { MdOutlineCancel, MdCheckCircleOutline } from "react-icons/md";
import { API_URL_FORMS } from "../../utils/Url";
import axios from "axios";
import { useSelector } from "react-redux";
import jwt from "jwt-decode";
import { Logs } from "../../utils/Logs";
import { IoMdArrowDropdown } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";

const FormValidation = () => {
  const [validateModal, setValidateModal] = useState(false);
  const [cancelValidationModal, setCancelValidationModal] = useState(false);
  const [finishValidationModal, setFinishValidationModal] = useState(false);
  const [allRequest, setAllRequest] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [reset, setReset] = useState(false);
  const { user } = useSelector((state) => state.user);

  const div = "prdc-colors  hover:text-white";
  const div_active =
    div + "w-full cursor-pointer pl-5 prdc-color text-white  hover:text-white";
  const div_deactive = div + "w-full cursor-pointer pl-5 hover:text-white";
  const [paramId, setParamId] = useState(null);

  const decoded = user ? jwt(user) : "";

  const [toggleState, setToggleState] = useState(1);
  const [Defaults, setDefaults] = useState(false);

  //FUNCTION THAT GET THE DATA
  useEffect(() => {
    const getRequest = async () => {
      const res = await axios.get(API_URL_FORMS + "get-request");

      setAllRequest(res.data);
    };
    getRequest();
  }, []);

  //VALIDATE MODAL FUNCTION
  const Validate_Modal = ({ decoded, paramId }) => {
    const validate_form = () => {
      Logs("UPDATE", "Validate Form");
      axios
        .put(API_URL_FORMS + "valid-cancel", {
          action: 1,
          Employee_ID: decoded.employeeId,
          ID: paramId,
          Dept: decoded.dept,
        })
        .then((res) => window.location.reload())
        .catch((err) => console.log(err));
    };

    return (
      <motion.div className="fixed h-full w-full !top-0 !left-0 bg-black bg-opacity-80 flex items-center justify-center z-600 ">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          exit={{ scale: 0, opacity: 0 }}
          className="absolute h-50 flex w-80 z-50 rounded-md bg-white shadow-white shadow-sm flex-col items-center justify-center dark:(bg-slate-900 text-white)"
        >
          <AiOutlineWarning className="text-yellow-500 text-[80px] mb-4" />
          <span className="text-green-600 arial-narrow text-[18px] font-bold">
            Are you sure you want to Validate?
          </span>
          <div className="flex justify-between items-center w-52 mt-2 arial-narrow">
            <button
              onClick={() => setValidateModal(false)}
              className="flex justify-center items-center w-25 border-[2px] rounded-sm transition transform ease-in-out hover:(border-[2px] border-red-600)"
            >
              <MdOutlineCancel className="mr-2 text-[20px] text-red-600" />
              Close
            </button>
            <button
              className="flex justify-center items-center w-25 border-[2px] rounded-sm transition transform ease-in-out hover:(border-[2px] border-green-600)"
              onClick={() => validate_form()}
            >
              <MdCheckCircleOutline className="mr-2 text-[20px] text-green-600" />
              Validate
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  //CANCEL MODAL FUNCTION
  const Cancel_Validate_Modal = ({ decoded, paramId }) => {
    Logs("UPDATE", "Validate Form");
    const cancel_request = () => {
      axios
        .put(API_URL_FORMS + "valid-cancel", {
          action: 2,
          Employee_ID: decoded.employeeId,
          ID: paramId,
          Dept: decoded.dept,
        })
        .then((res) => window.location.reload())
        .catch((err) => console.log(err));
    };

    return (
      <motion.div className="fixed h-full w-full !top-0 !left-0 bg-black bg-opacity-80 flex items-center justify-center z-600 ">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          exit={{ scale: 0, opacity: 0 }}
          className="absolute h-50 flex w-80 z-50 rounded-md bg-white shadow-white shadow-sm flex-col items-center justify-center dark:(bg-slate-900 text-white)"
        >
          <AiOutlineWarning className="text-red-600 text-[80px] mb-4" />
          <span className="text-red-600 arial-narrow text-[18px] font-bold">
            Are you sure you want to Cancel?
          </span>
          <div className="flex justify-between items-center w-52 mt-2 arial-narrow">
            <button
              onClick={() => setCancelValidationModal(false)}
              className="flex justify-center items-center w-25 rounded-sm transition transform ease-in-out hover:(border-[2px] border-red-600) "
            >
              <MdOutlineCancel className="mr-2 text-[20px] text-red-600" />
              Close
            </button>
            <button
              onClick={() => cancel_request()}
              className="flex justify-center items-center w-25 border-[2px] rounded-sm transition transform ease-in-out hover:(border-[2px] border-red-600)"
            >
              <MdCheckCircleOutline className="mr-2 text-[20px] text-red-600" />
              Cancel
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  //FINISHED DONE MODAL FUNCTION
  const Finished_Request_Modal = ({ decoded, paramId }) => {
    Logs("UPDATE", "Finished Formed");
    const Finished_Request = () => {
      axios
        .put(API_URL_FORMS + "valid-cancel", {
          action: 3,
          Employee_ID: decoded.employeeId,
          ID: paramId,
          Dept: decoded.dept,
        })
        .then((res) => window.location.reload())
        .catch((err) => console.log(err));
    };

    return (
      <motion.div className="fixed h-full w-full !top-0 !left-0 bg-black bg-opacity-80 flex items-center justify-center z-600 ">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          exit={{ scale: 0, opacity: 0 }}
          className="absolute h-50 flex w-80 z-50 rounded-md bg-white shadow-white shadow-sm flex-col items-center justify-center dark:(bg-slate-900 text-white)"
        >
          <AiOutlineWarning className="text-blue-700 text-[80px] mb-4" />
          <span className="text-blue-700 arial-narrow text-[18px] font-bold">
            Are you this Request is Done ?
          </span>
          <div className="flex justify-between items-center w-52 mt-2 arial-narrow">
            <button
              onClick={() => setFinishValidationModal(false)}
              className="flex justify-center items-center w-25 rounded-sm transition transform ease-in-out hover:(border-[2px] border-red-600)"
            >
              <MdOutlineCancel className="mr-2 text-[20px] text-red-600" />
              Close
            </button>
            <button
              onClick={() => Finished_Request()}
              className="flex justify-center items-center w-25 border-[2px] rounded-sm transition transform ease-in-out hover:(border-[2px] border-blue-600)"
            >
              <MdCheckCircleOutline className="mr-2 text-[20px] text-blue-600" />
              Done
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <>
      <div className="w-full relative flex flex-col p-4">
        <div className=" flex items-center justify-between   w-full">
          <div className="flex w-full items-center justify-between ">
            <span className="text-[18px] text-black arial-narrow">
              Form Validation
            </span>
          </div>
          <div className=" border-none flex h-8 w-[30%] border-black border relative text-black shadow-sm shadow-gray-600 bg-white dark:(bg-gray-600 text-light-50 shadow-none) <md:(w-[100%])">
            <FaSearch className="px-2 h-full w-8 absolute right-0 prdc-color text-white" />

            <input
              className="border border-gray-400 outline-none w-full bg-transparent placeholder-gray-40 arial-narrow px-2"
              placeholder="Search..."
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full h-[60vh] overflow-auto flex justify-center ">
          <div className="w-full overflow-auto flex justify-center">
            <table className="w-[100%] h-[10%] border-gray-100 overflow-hidden arial-narrow-bold text-[18px] justify-evenly border-separate border-spacing-4">
              <thead>
                <tr className="shadow-sm shadow-gray-800 prdc-color h-10  text-center">
                  <th className="w-[8%] text-white">No.</th>
                  <th className="w-[30%] text-white">Requestor</th>
                  <th className="w-[30%] text-white">Reference Number</th>
                  <th className="w-[30%] text-white">Type of Form</th>
                  <th></th>
                </tr>
              </thead>
              {/* {paginatedItems.map((data) => {
                return ( */}
              {allRequest
                .filter(
                  (filter) =>
                    filter.Reference_number.toString().includes(searchValue) ||
                    filter.Requestor.toString().includes(searchValue) ||
                    filter.type_of_form.toString().includes(searchValue)
                )
                .map((data, index) => (
                  <tr
                    className={`border border-black  arial-narrow h-10  text-black ${
                      data.canceled_by
                        ? "bg-red-400"
                        : data.finished_by
                        ? "bg-blue-200"
                        : data.validated_by
                        ? "bg-green-400"
                        : "bg-yellow-200"
                    }`}
                  >
                    <td className="text-[12px] text-center border-b border-l border-t border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                      {index + 1}
                    </td>
                    <td className="text-[12px] text-center border-b border-t border-b-black border-t-black text-black">
                      {data.Requestor}
                    </td>
                    <td className="text-[12px] text-center border-b border-t  border-b-black border-t-black text-black ">
                      {data.Reference_number}
                    </td>
                    <td className="text-[12px] text-center border-b border-t  border-b-black border-t-black text-black ">
                      {data.type_of_form}
                    </td>
                    <td className="text-center border-b border-t  border-b-black border-t-black border-r border-black ">
                      <div className="flex justify-center">
                        {data.finished_by ||
                        data.canceled_by ||
                        !data.validated_by ? (
                          ""
                        ) : (
                          <button
                            onClick={() => {
                              setFinishValidationModal(true);
                              setParamId(data.ID);
                            }}
                            className="w-20 h-8 bg-white flex items-center focus:outline-none justify-center text-[14px] mr-3 arial-narrow shadow-sm text-black border-[2px] border-black active:scale-1 active:duration-75 py-1 rounded-sm hover:rounded-sm hover:(border-blue-600) "
                          >
                            Done
                          </button>
                        )}
                        {data.canceled_by ||
                        data.finished_by ||
                        data.validated_by ? (
                          ""
                        ) : (
                          <button
                            name=""
                            onClick={() => {
                              setValidateModal(true);
                              setParamId(data.ID);
                            }}
                            className="w-20 h-8 bg-white  pr-2 flex items-center focus:outline-none justify-center text-[14px] mr-3 arial-narrow shadow-sm text-black border-[2px] border-black active:scale-1 active:duration-75 py-1 rounded-sm hover:rounded-sm hover:(border-green-600) "
                          >
                            <MdCheckCircleOutline className="mr-1 text-[18px]  cursor-pointer text-green-600" />
                            Validate
                          </button>
                        )}

                        {data.canceled_by || data.finished_by ? (
                          ""
                        ) : (
                          <button
                            onClick={() => {
                              setCancelValidationModal(true);
                              setParamId(data.ID);
                            }}
                            className="w-20 h-8  pr-2 flex items-center focus:outline-none bg-white justify-center text-[14px] arial-narrow mr-3 shadow-sm text-black border-[2px] border-black active:scale-1 active:duration-75 py-1 rounded-sm hover:rounded-sm hover:(border-red-600)"
                          >
                            <MdOutlineCancel className="mr-1 text-[18px] cursor-pointer text-red-600" />
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
            </table>
          </div>
        </div>
      </div>

      {validateModal && <Validate_Modal decoded={decoded} paramId={paramId} />}
      {cancelValidationModal && (
        <Cancel_Validate_Modal decoded={decoded} paramId={paramId} />
      )}
      {finishValidationModal && (
        <Finished_Request_Modal decoded={decoded} paramId={paramId} />
      )}
    </>
  );
};

export default FormValidation;
