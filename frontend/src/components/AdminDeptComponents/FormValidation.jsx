import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar";
import { FaSearch } from "react-icons/fa";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineWarning,
} from "react-icons/ai";
import { MdOutlineCancel, MdCheckCircleOutline } from "react-icons/md";
import { motion } from "framer-motion";
import { API_URL_FORMS } from "../../utils/Url";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import jwt from "jwt-decode";
import { Logs } from "../../utils/Logs";
import ReactPaginate from "react-paginate";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";
import moment from "moment";
import { BsSearch } from "react-icons/bs";

const Hr_ViewValidate = () => {
  const [validateModal, setValidateModal] = useState(false);
  const [cancelValidationModal, setCancelValidationModal] = useState(false);
  const [finishValidationModal, setFinishValidationModal] = useState(false);
  const [allRequest, setAllRequest] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const { user } = useSelector((state) => state.user);

  const [paramId, setParamId] = useState(null);

  const decoded = user ? jwt(user) : "";
  const [pageCount, setPageCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [itemOffset, setItemOffset] = useState(0);
  const [paginatedItems, setPaginatedItems] = useState([]);
  const [itemcount, setItemcount] = useState({ start: 0, end: 0 });
  console.log(paginatedItems);
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState({
    start: "01/01/2000",
    end: moment(),
  });

  const inputRef = useRef();

  const focusInput = (e) => {
    e.preventDefault();
    setValue(inputRef.current.value);
  };
  useEffect(() => {
    const endOffset = parseInt(itemOffset) + parseInt(itemsPerPage);
    setPaginatedItems(allRequest.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(allRequest.length / itemsPerPage));
  }, [allRequest, itemsPerPage, itemOffset]);

  useEffect(() => {
    setItemcount({
      start: itemOffset,
      end: itemOffset + paginatedItems.length,
    });
  }, [paginatedItems]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % allRequest?.length;

    setItemOffset(newOffset);
  };
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
    <div className="h-full w-full flex flex-col backg-color-prdc">
      <div className=" h-full flex items-center justify-center">
        <div className="flex flex-col   w-full h-full max-h-[px] max-w-[1500px] ">
          <div className=" flex items-center justify-between  f  w-full">
            <div className="ml-2 h-10  w-[48vh] max-w-[1000px]  rounded-sm relative items-start justify-center border-black  flex flex-col">
              <span className="arial-narrow-bold  text-[20px] text-black">
                Form Validation
              </span>
            </div>
            <div className="flex w-full  justify-end mr-3 items-center ">
              <div>
                <span className="mr-3 arial-narrow ">Filter Date:</span>
                <input
                  type="date"
                  className="border w-30 border-black h-6"
                  placeholder="filter-date"
                  onChange={(e) =>
                    setSelectedDate({ ...selectedDate, start: e.target.value })
                  }
                />{" "}
                -{" "}
                <input
                  type="date"
                  className="border w-30 border-black h-6"
                  placeholder="filter-date"
                  onChange={(e) =>
                    setSelectedDate({ ...selectedDate, end: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="w-full  h-full items-center mt-3 justify-center flex ">
            <div className="w-[99%] h-full flex flex-col rounded  relative">
              <table className="flex w-full justify-start flex-col items-start ">
                <tr className="w-full justify-evenly shadow-md shadow-gray-400 flex h-8  items-center prdc-color">
                  <th className="text-[11px] text-white flex justify-center items-center pr-3 w-[50%]">
                    No.
                  </th>
                  <th className="text-[11px] text-white flex items-center justify-center w-[100%]">
                    FORM NAME
                  </th>
                  <th className="text-[11px] text-white flex items-center justify-center w-[100%]">
                    REFERENCE NUMBER
                  </th>

                  <th className="text-[11px] text-white flex items-center justify-center w-[100%]">
                    DEPARTMENT
                  </th>
                  <th className="text-[11px] text-white flex items-center justify-center w-[100%]">
                    DATE REQUESTED
                  </th>
                  <th className="text-[11px] text-white flex items-center justify-center w-[100%]">
                    ACTION
                  </th>
                  <th className="text-[11px] text-white flex items-end justify-end  w-[100%]">
                    <div className=" flex h-7 w-[80%]   border-black border rounded-sm relative text-black shadow-sm shadow-gray-600 bg-white dark:(bg-gray-600 text-light-50 shadow-none) <md:(w-[100%])">
                      <FaSearch className="px-2 h-full w-8  absolute right-0 prdc-color text-white" />

                      <input
                        className="border-none  outline-none w-full bg-transparent placeholder-gray-40 "
                        placeholder="  Search..."
                        onChange={(e) => setSearchValue(e.target.value)}
                      />
                    </div>
                  </th>
                </tr>
                {/* {paginatedItems.map((data) => {
                return ( */}
                {allRequest
                  .filter(
                    (filter) =>
                      filter.Reference_number.toString().includes(
                        searchValue
                      ) ||
                      filter.Requestor.toString().includes(searchValue) ||
                      filter.type_of_form.toString().includes(searchValue) ||
                      (filter.form_department.includes(searchValue) &&
                        moment(filter.createdAt).isBetween(
                          moment(selectedDate.start),
                          moment(selectedDate.end),
                          "days",
                          []
                        ))
                  )

                  .map((data, index) => (
                    <tr
                      className={`w-full justify-evenly border border-gray-500  rounded-sm   flex h-8  items-center ${
                        data.canceled_by
                          ? " mt-3    flex   items-center"
                          : data.finished_by
                          ? " mt-3 b   justify-evenly   flex "
                          : data.validated_by
                          ? " mt-3     justify-evenly   flex   "
                          : " mt-3    justify-evenly   flex "
                      }`}
                    >
                      <td className="text-[11px] flex text-black  arial-narrow items-center justify-center pr-3 w-[50%]">
                        {index + 1}
                      </td>
                      <td className="text-[11px] items-center justify-center flex text-black arial-narrow w-[100%]">
                        {data.type_of_form}
                      </td>
                      <td className="text-[11px] items-center justify-center flex text-black arial-narrow w-[100%]">
                        {data.Reference_number}
                      </td>

                      <td className="text-[11px] items-center justify-center flex text-black arial-narrow w-[100%]">
                        {data.form_department}
                      </td>
                      <td className="text-[11px] items-center justify-center flex text-black arial-narrow w-[100%]">
                        {moment(data.createdAt).format("MMMM DD, YYYY")}
                      </td>
                      <td
                        className={`text-[11px] arial-narrow-bold items-center justify-center flex text-black  w-[100%]${
                          data.canceled_by
                            ? "  text-red-900"
                            : data.finished_by
                            ? " text-blue-900"
                            : data.validated_by
                            ? " text-green-900"
                            : " text-yellow-900"
                        }`}
                      >
                        {data.canceled_by
                          ? "CANCELLED"
                          : data.finished_by
                          ? "DONE"
                          : data.validated_by
                          ? "VALIDATED"
                          : "PENDING"}
                      </td>
                      <td className="text-[11px] flex text-black items-center justify-center arial-narrow w-[100%]">
                        {data.finished_by ||
                        data.canceled_by ||
                        !data.validated_by ? (
                          ""
                        ) : (
                          <AiFillCheckCircle
                            onClick={() => {
                              setFinishValidationModal(true);
                              setParamId(data.ID);
                            }}
                            className="w-7 h-7  pr-2 flex items-center justify-center text-[13px] cursor-pointer hover:text-green-900   mr-3 shadow-sm text-black   active:scale-1 active:duration-75 transition-all hover:scale-120 ease-in-out  transform py-1 rounded-sm  border-0"
                          />
                        )}
                        {data.canceled_by ||
                        data.finished_by ||
                        data.validated_by ? (
                          ""
                        ) : (
                          <AiFillCheckCircle
                            name=""
                            onClick={() => {
                              setValidateModal(true);
                              setParamId(data.ID);
                            }}
                            className="w-7 h-7  pr-2 flex items-center justify-center text-[13px] cursor-pointer  hover:text-green-900 mr-3 shadow-sm text-black   active:scale-1 active:duration-75 transition-all hover:scale-120 ease-in-out  transform py-1 rounded-sm  border-0"
                          />
                        )}

                        {data.canceled_by || data.finished_by ? (
                          ""
                        ) : (
                          <AiFillCloseCircle
                            onClick={() => {
                              setCancelValidationModal(true);
                              setParamId(data.ID);
                            }}
                            className="w-7 h-7  pr-2 flex items-center justify-center hover:text-red-900 text-black text-[13px] cursor-pointer   mr-3 shadow-sm text-black   active:scale-1 active:duration-75 transition-all hover:scale-108 ease-in-out  transform py-1 rounded-sm  "
                          />
                        )}
                      </td>
                    </tr>
                  ))}
              </table>
              <div className="absolute bottom-0 w-full flex items-center justify-center">
                <div className="absolute left-2">
                  <span>Show</span>{" "}
                  <select
                    className="absolute ml-2 w-25 shadow-sm rounded-md shadow-gray-700 mr-2 dark:(bg-gray-600 shadow-none text-white)"
                    onChange={(e) => {
                      setItemsPerPage(e.target.value);
                      const newOffset =
                        (0 * parseInt(itemsPerPage)) % paginatedItems?.length;
                      setItemOffset(newOffset);
                    }}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                </div>
                <div className="absolute right-2">
                  <span className="text-gray-400">
                    Result: {itemcount.start + 1} - {itemcount.end} of{" "}
                    {allRequest.length}
                  </span>
                </div>
                <ReactPaginate
                  breakLabel="..."
                  nextLabel={<HiArrowNarrowRight />}
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  pageCount={pageCount}
                  previousLabel={<HiArrowNarrowLeft />}
                  renderOnZeroPageCount={null}
                  containerClassName="list-none flex items-center gap-3 "
                  pageLinkClassName="cursor-pointer shadow-2xl text-black p-2 overflow-hidden dark:(text-white) prdc-colors  hover:( text-white)"
                  previousLinkClassName="p-2 cursor-pointer rounded-sm text-black overflow-hidden prdc-colors  hover:( text-white) dark:(text-white rounded-sm)"
                  nextLinkClassName="p-2 cursor-pointer rounded-sm text-black prdc-colors  hover:( text-white) dark:(text-white)"
                />
              </div>
            </div>
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
    </div>
  );
};

export default Hr_ViewValidate;
