import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { motion } from "framer-motion";
import { AiFillCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";
import axios from "axios";
import { API_URL_HR } from "../../utils/Url";
import moment from "moment";
import {
  BsPersonFillDash,
  BsPersonFillLock,
  BsArrowLeftShort,
  BsArrowRightShort,
} from "react-icons/bs";
import HrActivePersonalInfo from "../../components/HrComponents/HrActivePersonalInfo";
import HrActiveRequirements from "../../components/HrComponents/HrActiveRequirements";
import { FaCircle, FaSearch } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

const Hr_ActiveEmployees = () => {
  const [viewDetails, setViewDetails] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeeInfo, setEmployeeInfo] = useState(null);
  const [profile, setProfile] = useState(null);
  const [searchEmployee, setSearchEmployee] = useState("");
  const [filter, setFilter] = useState({
    outlet: "Internal",
    status: "Active",
  });
  //STATES FOR PAGINATION
  const [pageCount, setPageCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [itemOffset, setItemOffset] = useState(0);
  const [paginatedItems, setPaginatedItems] = useState([]);
  const [itemcount, setItemcount] = useState({ start: 0, end: 0 });

  const [company, setCompany] = useState("");

  const { branding } = useSelector((state) => state.branding);

  console.log(paginatedItems);
  useEffect(() => {
    setSearchEmployee("");
    let subscribed = true;
    axios
      .get(API_URL_HR + `get-employee-list/?q=${searchEmployee}`)
      .then((res) => {
        if (subscribed) {
          setEmployeeList(res.data);
          setPageCount(Math.ceil(employeeList?.length / itemsPerPage));
          setItemOffset(0);
        }
      })
      .catch((err) => console.log(err));

    return () => {
      subscribed = false;
    };
  }, [filter]);

  const search = () => {
    let subscribed = true;
    axios
      .get(API_URL_HR + `get-employee-list/?q=${searchEmployee}`)
      .then((res) => {
        if (subscribed) {
          setEmployeeList(res.data);
          setPageCount(Math.ceil(employeeList?.length / itemsPerPage));
          setItemOffset(0);
        }
      })
      .catch((err) => console.log(err));

    return () => {
      subscribed = false;
    };
  };

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 13) {
        search();
      }
    };
    window.addEventListener("keydown", close);

    return () => {
      window.removeEventListener("keydown", close);
    };
  }, [searchEmployee]);

  //FUNCTION FOR PAGINATION

  useEffect(() => {
    const endOffset = parseInt(itemOffset) + parseInt(itemsPerPage);
    setPaginatedItems(
      employeeList
        ?.filter(
          (fil) =>
            fil.Employee_Designation == filter.outlet &&
            fil.Employee_Company == company &&
            (fil.Employee_Status == "Absent without Leave"
              ? "Inactive" == filter.status
              : fil.Employee_Status == "End of Contract"
              ? "Inactive" == filter.status
              : fil.Employee_Status == "Resigned"
              ? "Inactive" == filter.status
              : fil.Employee_Status == "Terminated"
              ? "Inactive" == filter.status
              : fil.Employee_Status == "Pullout"
              ? "Inactive" == filter.status
              : fil.Employee_Status == "Separated"
              ? "Inactive" == filter.status
              : fil.Employee_Status == "Retired"
              ? "Inactive" == filter.status
              : fil.Employee_Status == "Blacklisted"
              ? "Inactive" == filter.status
              : "Active" == filter.status)
        )
        .slice(itemOffset, endOffset)
    );
    setPageCount(
      Math.ceil(
        employeeList?.filter(
          (fil) =>
            fil.Employee_Designation == filter.outlet &&
            fil.Employee_Company == company &&
            (fil.Employee_Status == "Absent without Leave"
              ? "Inactive" == filter.status
              : fil.Employee_Status == "End of Contract"
              ? "Inactive" == filter.status
              : fil.Employee_Status == "Resigned"
              ? "Inactive" == filter.status
              : fil.Employee_Status == "Terminated"
              ? "Inactive" == filter.status
              : fil.Employee_Status == "Pullout"
              ? "Inactive" == filter.status
              : fil.Employee_Status == "Separated"
              ? "Inactive" == filter.status
              : fil.Employee_Status == "Retired"
              ? "Inactive" == filter.status
              : fil.Employee_Status == "Blacklisted"
              ? "Inactive" == filter.status
              : "Active" == filter.status)
        ).length / itemsPerPage
      )
    );
  }, [employeeList, itemsPerPage, itemOffset, filter, company]);

  useEffect(() => {
    setItemcount({
      start: itemOffset,
      end: itemOffset + paginatedItems.length,
    });
  }, [paginatedItems]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % employeeList?.length;

    setItemOffset(newOffset);
  };

  //BANISHING MODAL
  useEffect(() => {
    if (currentPage == 3) {
      axios
        .put(API_URL_HR + "employed-new", employeeInfo)
        .then((res) => {
          setTimeout(() => {
            setViewDetails(false);
            window.location.reload();
          }, 1500);

          // console.log(res);
        })
        .catch((err) => console.log(err));
    }
  }, [currentPage]);

  // ======================================================================================================================== MODALLLLLLLL

  const update_toggle = (employee_data) => {
    setViewDetails(true);
    setEmployeeInfo(employee_data);
  };

  const calculate_age = (dob1) => {
    let today = new Date();
    let birthDate = new Date(dob1); // create a date object directly from `dob1` argument
    let age_now = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }

    return age_now;
  };

  return (
    <div className="w-screen flex flex-col backg-color-prdc h-screen ">
      <Navbar />
      <div className="w-full  h-10  mt-10"></div>
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col   w-full h-full max-h-[1000px] max-w-[1500px] ">
          <div className="flex items-center justify-between   w-full ">
            <div className="ml-2 h-18 w-[48vh] max-w-[1000px] border rounded-sm relative items-center justify-center border-black  flex flex-col">
              <span className="arial-narrow-bold  text-[20px] text-black">
                Employee Management
              </span>
              <h1 className="prdc-color w-full h-0.7 absolute top-0" />
              <div>
                <span className="arial-narrow  ">Masterlist</span>
                <span className="text-gray-400 ml-3">
                  ({employeeList.filter((data) => data.Employee_ID).length})
                </span>
              </div>
            </div>
            <div className="ml-1 h-18 max-w-[1050px] w-full border rounded-sm relative items-center justify-between border-black  flex flex-col">
              <h1 className="prdc-color w-full h-0.7 absolute top-0" />
              <div className="w-[98%]  flex  justify-between items-center h-10 ">
                <div className=" w-55vh  flex items-center justify-start ">
                  <span className="arial-narrow  inline-block w-[5rem] text-[14px]">
                    OUTLET
                  </span>
                  <select
                    onChange={(e) =>
                      setFilter({ ...filter, outlet: e.target.value })
                    }
                    className="text-[14px]  w-[5rem] arial-narrow"
                  >
                    <option>Internal</option>
                    <option>External</option>
                  </select>
                </div>
                <div className=" w-60vh flex items-center justify-start ">
                  <span className="arial-narrow inline-block w-[5rem] text-[14px]">
                    COMPANY
                  </span>
                  <select
                    onChange={(e) => setCompany(e.target.value)}
                    value={company}
                    className="text-[14px] w-[5rem] arial-narrow"
                  >
                    <option value={branding ? branding[0]?.Business_Name : ""}>
                      {" "}
                      {/* NAKA DEFAULT MUNA TOH NEED NYU PALITAN SA KANBAN BOARD UNG NAME NG COMPANY */}
                      {branding ? branding[0]?.Business_Name : ""}
                    </option>
                    <option value="None">None</option>
                  </select>
                </div>
              </div>
              <div className="w-[98%] flex  justify-between items-center h-10 ">
                <div className=" w-55vh flex items-center justify-start ">
                  <span className="arial-narrow inline-block w-[5rem] text-[14px]">
                    STATUS
                  </span>
                  <select
                    onChange={(e) =>
                      setFilter({ ...filter, status: e.target.value })
                    }
                    className="text-[14px] w-[5rem] arial-narrow"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
                <div className=" w-55vh flex items-center justify-start ">
                  <span className="arial-narrow inline-block w-[5rem] text-[14px]">
                    BRANCH
                  </span>
                  <select className="text-[14px] w-[5rem] arial-narrow">
                    <option></option>
                    <option></option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full  h-full items-center mt-5 justify-center flex ">
            <div className="w-[99%] h-full border flex flex-col  rounded  relative shadow-gray-500">
              <table className="flex w-full justify-start flex-col items-start ">
                <tr className="w-full justify-evenly shadow-md shadow-gray-400 flex h-8  items-center prdc-color">
                  <th className="text-[11px] text-white flex  w-[100%]">
                    EMPLOYEE NO.
                  </th>{" "}
                  <th className="text-[11px] flex text-white  w-[100%]">
                    FULL NAME
                  </th>
                  <th className="text-[11px] flex text-white  w-[50%]">
                    Gender
                  </th>
                  <th className="text-[11px] flex text-white  w-[50%]">Age</th>
                  <th className="text-[11px] flex  text-white w-[100%]">
                    DEPARTMENT
                  </th>
                  <th className="text-[11px] flex text-white  w-[100%]">
                    Position
                  </th>
                  <th className="text-[11px] flex text-white  w-[100%]">
                    EMPLOYEE STATUS
                  </th>
                  <th className="text-[11px] flex text-white  w-[100%]">
                    Email
                  </th>
                  <th className="text-[11px] flex text-white w-[100%]">
                    COMPANY EMAIL
                  </th>
                  <th className="text-[11px] flex text-white w-[60%]">
                    BIOMETRICS ID
                  </th>
                  <th className="text-[11px] flex ml-2 text-white w-full h-full ">
                    <div className=" flex h-full w-full  border-0  relative  border-black border  text-black bg-white dark:(bg-gray-600 text-light-50 shadow-none) <md:(w-[100%])">
                      <FaSearch
                        onClick={search}
                        className="px-2 h-full w-8 cursor-pointer absolute right-0 prdc-color text-white"
                      />

                      <input
                        id="search"
                        className="border-none outline-none w-full bg-transparent placeholder-gray-40 "
                        placeholder="  Search..."
                        onChange={(e) => setSearchEmployee(e.target.value)}
                      />
                    </div>
                  </th>
                </tr>
                {paginatedItems.map((data) => {
                  return (
                    <tr
                      onClick={() => update_toggle(data)}
                      className="hover:bg-blue-100 mt-3 border border-black cursor-pointer  w-full justify-evenly   flex h-8  items-center"
                      key={data.ID}
                    >
                      <td className="text-[11px]  flex text-black arial-narrow w-[100%]">
                        {data.Employee_ID}
                      </td>
                      <td className="text-[11px] flex text-black arial-narrow w-[100%]">
                        {data.Employee_LastName +
                          ", " +
                          data.Employee_FirstName +
                          " " +
                          data.Employee_MiddleName}
                      </td>
                      <td className="text-[11px] flex text-black arial-narrow w-[50%]">
                        {data.Employee_Gender}
                      </td>
                      <td className="text-[11px] flex text-black arial-narrow w-[50%]">
                        {calculate_age(data.Employee_BirthDate)
                          ? calculate_age(data.Employee_BirthDate)
                          : "0"}
                      </td>
                      <td className="text-[11px] flex text-black arial-narrow w-[100%]">
                        {data.Employee_Department}
                      </td>
                      <td className="text-[11px] flex text-black arial-narrow w-[100%]">
                        {data.Employee_JobDesc}
                      </td>
                      <td className="text-[11px] flex text-black arial-narrow w-[100%]">
                        {data.Employee_TypeContract}
                      </td>
                      <td className="text-[11px] flex text-black arial-narrow w-[100%]">
                        {data.Employee_email}
                      </td>

                      <td className="text-[11px] flex text-black text-blue-500 arial-narrow w-[100%]">
                        {data.Employee_CompanyEmail}
                      </td>

                      <td className="text-[11px] flex text-black arial-narrow w-[60%]">
                        {data.Employee_BioID}
                      </td>
                      <td className="text-[11px] flex text-black text-blue-500 arial-narrow w-[100%]"></td>
                    </tr>
                  );
                })}
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
                    {
                      employeeList.filter(
                        (fil) =>
                          fil.Employee_ID &&
                          fil.Employee_Designation == filter.outlet &&
                          (fil.Employee_Status == "Absent without Leave"
                            ? "Inactive" == filter.status
                            : fil.Employee_Status == "End of Contract"
                            ? "Inactive" == filter.status
                            : fil.Employee_Status == "Resigned"
                            ? "Inactive" == filter.status
                            : fil.Employee_Status == "Terminated"
                            ? "Inactive" == filter.status
                            : fil.Employee_Status == "Pullout"
                            ? "Inactive" == filter.status
                            : fil.Employee_Status == "Separated"
                            ? "Inactive" == filter.status
                            : fil.Employee_Status == "Retired"
                            ? "Inactive" == filter.status
                            : fil.Employee_Status == "Blacklisted"
                            ? "Inactive" == filter.status
                            : "Active" == filter.status)
                      ).length
                    }
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
      {viewDetails && (
        <HrActivePersonalInfo
          setViewDetails={setViewDetails}
          setEmployeeInfo={setEmployeeInfo}
          employeeInfo={employeeInfo}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          profile={profile}
          setProfile={setProfile}
          setEmployeeList={setEmployeeList}
        />
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Hr_ActiveEmployees;
