import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
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
import FormValidation from "../../components/AdminDeptComponents/FormValidation";
import Forms from "../../components/AdminDeptComponents/Forms";
import HrUserManagement from "../../components/HrComponents/HrUserManagement";

const Hr_ViewValidate = () => {
  const [validateModal, setValidateModal] = useState(false);
  const [cancelValidationModal, setCancelValidationModal] = useState(false);
  const [finishValidationModal, setFinishValidationModal] = useState(false);
  const [userObj, setUserObj] = useState(null);
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
          <AiOutlineWarning className="text-yellow-800 text-[80px] mb-4" />
          <span className="text-green-600 arial-narrow text-[18px] font-bold">
            Are you sure you want to Validate?
          </span>
          <div className="flex mt-3  items-center justify-between">
            <button
              onClick={() => setValidateModal(false)}
              className="w-20 h-6  pr-2 flex items-center justify-center text-[13px]   mr-3 shadow-sm text-black   border border-black active:scale-1 active:duration-75 transition-all hover:scale-108 ease-in-out  transform py-1 rounded-sm hover:rounded-sm hover:border-black "
            >
              <MdOutlineCancel className="mr-1 text-[18px]  cursor-pointer text-black hover:(text-black ) <md:(text-[50px])" />
              Close
            </button>
            <button
              className="w-20 h-6  pr-2 flex items-center justify-center text-[13px]   mr-3 shadow-sm text-black   border border-black active:scale-1 active:duration-75 transition-all hover:scale-108 ease-in-out  transform py-1 rounded-sm hover:rounded-sm hover:border-black "
              onClick={() => validate_form()}
            >
              <MdCheckCircleOutline className="mr-1 text-[18px]  cursor-pointer text-black hover:(text-black ) <md:(text-[50px])" />
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
          <AiOutlineWarning className="text-red-800 text-[80px] mb-4" />
          <span className="text-red-600 arial-narrow text-[18px] font-bold">
            Are you sure you want to Cancel?
          </span>
          <div className="flex mt-3  items-center justify-between">
            <button
              onClick={() => setCancelValidationModal(false)}
              className="w-20 h-6  pr-2 flex items-center justify-center text-[13px]   mr-3 shadow-sm text-black   border border-black active:scale-1 active:duration-75 transition-all hover:scale-108 ease-in-out  transform py-1 rounded-sm hover:rounded-sm hover:border-black "
            >
              <MdOutlineCancel className="mr-1 text-[18px]  cursor-pointer text-black hover:(text-black ) <md:(text-[50px])" />
              Close
            </button>
            <button
              onClick={() => cancel_request()}
              className="w-20 h-6  pr-2 flex items-center justify-center text-[13px]   mr-3 shadow-sm text-red-700   border border-red-700 active:scale-1 active:duration-75 transition-all hover:scale-108 ease-in-out  transform py-1 rounded-sm hover:rounded-sm hover:border-black "
            >
              <MdCheckCircleOutline className="mr-1 text-[18px]  cursor-pointer text-red-700 hover:(text-black ) <md:(text-[50px])" />
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
          <div className="flex mt-3  items-center justify-between">
            <button
              onClick={() => setCancelValidationModal(false)}
              className="w-20 h-6  pr-2 flex items-center justify-center text-[13px]   mr-3 shadow-sm text-black   border border-black active:scale-1 active:duration-75 transition-all hover:scale-108 ease-in-out  transform py-1 rounded-sm hover:rounded-sm hover:border-black "
            >
              <MdOutlineCancel className="mr-1 text-[18px]  cursor-pointer text-black hover:(text-black ) <md:(text-[50px])" />
              Close
            </button>
            <button
              onClick={() => Finished_Request()}
              className="w-20 h-6  pr-2 flex items-center justify-center text-[13px]   mr-3 shadow-sm text-blue-700   border border-blue-700 active:scale-1 active:duration-75 transition-all hover:scale-108 ease-in-out  transform py-1 rounded-sm hover:rounded-sm hover:border-black "
            >
              <MdCheckCircleOutline className="mr-1 text-[18px]  cursor-pointer text-blue-700 hover:(text-black ) <md:(text-[50px])" />
              Done
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    // <div className="w-screen h-screen flex flex-col backg-color-prdc">
    //   <Navbar />
    //   <div className="w-full  h-10  mt-10"></div>
    //   <div className="w-full h-full flex items-center justify-center">
    //     <div className="flex flex-col   w-full h-full max-h-[1000px] max-w-[1500px] ">
    // <div className=" flex items-center justify-between   w-full">
    //   <span className="ml-5 arial-narrow-bold text-[20px] ">
    //     Validate
    //   </span>
    //   <div className=" flex h-8 w-[15%] border-black border relative text-black shadow-sm shadow-gray-600 bg-white dark:(bg-gray-600 text-light-50 shadow-none) <md:(w-[100%])">
    //     <FaSearch className="px-2 h-full w-8  absolute right-0 prdc-color text-white" />

    //     <input
    //       className="border-none outline-none w-full bg-transparent placeholder-gray-40 "
    //       placeholder="  Search..."
    //       onChange={(e) => setSearchValue(e.target.value)}
    //     />
    //   </div>
    //       </div>
    //       <div className="w-full  h-full items-center mt-5 justify-center flex ">
    //         <div className="w-[99%] h-full border flex flex-col shadow-sm rounded  relative shadow-gray-500">
    //           <table className="flex w-full justify-start flex-col items-start ">
    //             <tr className="w-full justify-evenly shadow-md shadow-gray-400 flex h-8  items-center prdc-color">
    //               <th className="text-[11px] text-white flex  w-[100%]">No.</th>
    //               <th className="text-[11px] text-white flex  w-[100%]">
    //                 Requestor
    //               </th>
    //               <th className="text-[11px] text-white flex  w-[100%]">
    //                 Reference Number
    //               </th>
    //               <th className="text-[11px] text-white flex  w-[100%]">
    //                 Type of Form
    //               </th>
    //               <th className="text-[11px] text-white flex  w-[100%]"></th>
    //             </tr>
    //             {/* {paginatedItems.map((data) => {
    //             return ( */}
    //             {allRequest
    //               .filter(
    //                 (filter) =>
    //                   filter.Reference_number.toString().includes(
    //                     searchValue
    //                   ) ||
    //                   filter.Requestor.toString().includes(searchValue) ||
    //                   filter.type_of_form.toString().includes(searchValue)
    //               )
    //               .map((data, index) => (
    //                 <tr
    //                   className={`shadow-sm  border-b border-b-gray-700 w-full justify-evenly  flex h-8  items-center ${
    //                     data.canceled_by
    //                       ? "bg-red-400"
    //                       : data.finished_by
    //                       ? "bg-blue-200"
    //                       : data.validated_by
    //                       ? "bg-green-400"
    //                       : "bg-yellow-200"
    //                   }`}
    //                 >
    //                   <td className="text-[11px] flex text-black arial-narrow w-[100%]">
    //                     {index + 1}
    //                   </td>
    //                   <td className="text-[11px] flex text-black arial-narrow  w-[100%]">
    //                     {data.Requestor}
    //                   </td>
    //                   <td className="text-[11px] flex text-black arial-narrow w-[100%]">
    //                     {data.Reference_number}
    //                   </td>
    //                   <td className="text-[11px] flex text-black arial-narrow w-[100%]">
    //                     {data.type_of_form}
    //                   </td>
    //                   <td className="text-[11px] flex text-black arial-narrow w-[100%]">
    //                     {data.finished_by ||
    //                     data.canceled_by ||
    //                     !data.validated_by ? (
    //                       ""
    //                     ) : (
    //                       <button
    //                         onClick={() => {
    //                           setFinishValidationModal(true);
    //                           setParamId(data.ID);
    //                         }}
    //                         className="w-20 h-6  pr-2 flex items-center justify-center text-[13px]   mr-3 shadow-sm text-black   border border-black active:scale-1 active:duration-75 transition-all hover:scale-108 ease-in-out  transform py-1 rounded-sm hover:rounded-sm hover:border-black "
    //                       >
    //                         Done
    //                       </button>
    //                     )}
    //                     {data.canceled_by ||
    //                     data.finished_by ||
    //                     data.validated_by ? (
    //                       ""
    //                     ) : (
    //                       <button
    //                         name=""
    //                         onClick={() => {
    //                           setValidateModal(true);
    //                           setParamId(data.ID);
    //                         }}
    //                         className="w-20 h-6  pr-2 flex items-center justify-center text-[13px]   mr-3 shadow-sm text-black   border border-black active:scale-1 active:duration-75 transition-all hover:scale-108 ease-in-out  transform py-1 rounded-sm hover:rounded-sm hover:border-black "
    //                       >
    //                         <MdCheckCircleOutline className="mr-1 text-[18px]  cursor-pointer text-black hover:(text-black ) <md:(text-[50px])" />
    //                         Validate
    //                       </button>
    //                     )}

    //                     {data.canceled_by || data.finished_by ? (
    //                       ""
    //                     ) : (
    //                       <button
    //                         onClick={() => {
    //                           setCancelValidationModal(true);
    //                           setParamId(data.ID);
    //                         }}
    //                         className="w-20 h-6  pr-2 flex items-center justify-center text-[13px]   mr-3 shadow-sm text-black   border border-black active:scale-1 active:duration-75 transition-all hover:scale-108 ease-in-out  transform py-1 rounded-sm hover:rounded-sm hover:border-black "
    //                       >
    //                         <MdOutlineCancel className="mr-1 text-[18px] cursor-pointer text-black hover:(text-black ) <md:(text-[50px])" />
    //                         Cancel
    //                       </button>
    //                     )}
    //                   </td>
    //                 </tr>
    //               ))}
    //           </table>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   {validateModal && <Validate_Modal decoded={decoded} paramId={paramId} />}
    //   {cancelValidationModal && (
    //     <Cancel_Validate_Modal decoded={decoded} paramId={paramId} />
    //   )}
    //   {finishValidationModal && (
    //     <Finished_Request_Modal decoded={decoded} paramId={paramId} />
    //   )}
    // </div>
    <div className="w-screen h-screen flex relative overflow-y-auto overflow-x-hidden">
      <Navbar />
      <div className="w-full h-full  mt-15">
        <div className="w-full h-full  flex ">
          <div className="flex-[0.2]  border-l border border-t-0 border-b-0 border-gray-500  border-2px flex-col  flex h-full arial-narrow ">
            <span className=" text-[20px] text-center mt-5  text-black arial-narrow-bold">
              Department
            </span>
            <span className=" text-[18px] text-center mb-5  text-black arial-narrow-bold">
              Admin
            </span>
            <div
              className="text-gray-400 pl-5  cursor-pointer items-center flex justify-between mr-6"
              onClick={() => setDefaults(!Defaults)}
            >
              <p>Default</p> <IoMdArrowDropdown />
            </div>
            <AnimatePresence>
              {Defaults && (
                <motion.div className="ml-3">
                  <div
                    onClick={() => setToggleState(1)}
                    className={toggleState === 1 ? div_active : div_deactive}
                  >
                    Department Forms
                  </div>
                  <div
                    onClick={() => setToggleState(2)}
                    className={toggleState === 2 ? div_active : div_deactive}
                  >
                    Validate Forms
                  </div>
                  <div
                    onClick={() => setToggleState(3)}
                    className={toggleState === 3 ? div_active : div_deactive}
                  >
                    User Management
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Tabs */}
          <div className="flex-[0.9] bg-gray-100  ">
            {toggleState == 1 ? (
              <Forms
                setReset={setReset}
                reset={reset}
                setUserObj={setUserObj}
              />
            ) : toggleState == 2 ? (
              <FormValidation />
            ) : toggleState == 3 ? (
              <HrUserManagement />
            ) : (
              ""
            )}
          </div>
          {/* Tabs */}
        </div>
      </div>
      {reset && <HrResetUser setReset={setReset} userObj={userObj} />}
    </div>
  );
};

export default Hr_ViewValidate;
