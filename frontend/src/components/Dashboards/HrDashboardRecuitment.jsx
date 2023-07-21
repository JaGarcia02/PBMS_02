import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";
import { API_URL, API_URL_ADMIN, API_URL_HR } from "../../utils/Url";
import { BiBriefcase } from "react-icons/bi";
import { AiOutlineFileText } from "react-icons/ai";
import { MdArrowForwardIos } from "react-icons/md";
import HrPraRecruitment from "./HrDashboardRecruitment/HrPraRecruitment";
import { AnimatePresence } from "framer-motion";

const HrDashboardRecruitment = () => {
  const [dataRecruitment, setDataRecruitment] = useState([]);
  const [availableJob, setAvailableJob] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [option, setOption] = useState("Today");
  const [viewPra, setViewPra] = useState(null);

  useEffect(() => {
    axios
      .get(API_URL_HR + `get-applicants/${selectedCategory}?q=${searchValue}`)
      .then((res) => setDataRecruitment(res.data))
      .catch((err) => console.log(err));

    axios
      .get(API_URL_ADMIN + "view-all-prf-request")
      .then((res) => setAvailableJob(res.data))
      .catch((err) => console.log(err));
  }, []);

  const data = [
    {
      name: "New Applied",
      counts: dataRecruitment.filter((fil) => fil.applicant_status == 0).length,
      fill: "#B5EAD7",
    },
    {
      name: "Initial",
      counts: dataRecruitment.filter((fil) => fil.applicant_status == 1).length,
      fill: "#FFFF6D",
    },
    {
      name: "Exam",
      counts: dataRecruitment.filter((fil) => fil.applicant_status == 2).length,
      fill: "#C7CEEA",
    },
    {
      name: "Final",
      counts: dataRecruitment.filter((fil) => fil.applicant_status == 3).length,
      fill: "#FFCAAF",
    },
    {
      name: "Queueing",
      counts: dataRecruitment.filter((fil) => fil.applicant_status == 4).length,
      fill: "#B5E51B",
    },
    {
      name: "Pre Hired",
      counts: dataRecruitment.filter((fil) => fil.applicant_status == 5).length,
      fill: "#DAB894",
    },
    {
      name: "Placement",
      counts: dataRecruitment.filter((fil) => fil.applicant_status == 6).length,
      fill: "#C6E2E9",
    },
    {
      name: "Pooling",
      counts: dataRecruitment.filter((fil) => fil.applicant_status == 7).length,
      fill: "#FF9AA2",
    },
  ];
  return (
    <>
      <span className="arial-narrow-bold text-black text-3xl mb-3 ">
        Recruitment Dashboard
      </span>
      <div className="flex">
        <div className="bg-white rounded-md flex flex-col ">
          <span className="text-center arial-narrow text-[18px] my-3">
            Statistics of Application
          </span>
          <BarChart
            width={500}
            height={250}
            data={data}
            margin={{
              top: 5,
              right: 15,
              left: -30,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10 }}
              stroke="#4d4c4c"
              interval={0}
            />
            <YAxis />
            <Tooltip />

            <Bar dataKey="counts" barSize={40} />
          </BarChart>
        </div>
        {/* GRID 4 CORNERS OF THE WORLD */}
        <div className="grid inline-grid gap-3 grid-cols-2 w-[500px] h-[295px] ml-3">
          <div className="h-full w-full rounded-md flex items-center justify-between bg-white p-3 relative">
            <BiBriefcase className="text-[75px] text-gray-400" />
            <div className="flex flex-col text-center ">
              <span className="text-[65px] text-black arial-narrow">
                {dataRecruitment.length}
              </span>
              <span className="arial-narrow-bold text-gray-500">
                Total Applications
              </span>
              <div
                className="absolute h-23 w-2 !right-0 "
                style={{ background: "#FF00F7" }}
              ></div>
            </div>
          </div>
          <div className="h-full w-full rounded-md flex bg-white p-3 items-center justify-between relative">
            <img
              src="/interview.svg"
              className="img-svg w-[75px] h-[75px] pointer-events-none"
            />
            <div className="flex flex-col text-center">
              <span className="text-[65px] text-black arial-narrow">
                {
                  dataRecruitment.filter(
                    (fil) =>
                      fil.applicant_status == 1 || fil.applicant_status == 3
                  ).length
                }
              </span>
              <span className="arial-narrow-bold text-gray-500">
                Total Interviews
              </span>
              <div
                className="absolute h-23 w-2 !right-0 "
                style={{ background: "#2F12F8" }}
              ></div>
            </div>
          </div>
          <div className="h-full w-full rounded-md flex bg-white p-3 items-center justify-between relative">
            <AiOutlineFileText className="text-[75px] text-gray-400" />
            <div className="flex flex-col text-center">
              <span className="text-[65px] text-black arial-narrow">
                {
                  dataRecruitment.filter(
                    (fil) =>
                      (fil.applicant_status == 8 &&
                        moment(fil.createdAt).format("MM/DD/YYYY") ==
                          moment().format("MM/DD/YYYY")) ||
                      moment(fil.updatedAt).format("MM/DD/YYYY") ==
                        moment().format("MM/DD/YYYY")
                  ).length
                }
              </span>
              <span className="arial-narrow-bold text-gray-500">
                Hired Applicants
              </span>
              <div
                className="absolute h-23 w-2 !right-0 "
                style={{ background: "#029B16" }}
              ></div>
            </div>
          </div>
          <div className="h-full w-full rounded-md flex items-center justify-between bg-white p-3 relative">
            <img
              src="/rejected.svg"
              className="img-svg w-[75px] h-[75px] pointer-events-none"
            />
            <div className="flex flex-col text-center">
              <span className="text-[65px] text-black arial-narrow">
                {
                  dataRecruitment.filter(
                    (fil) =>
                      fil.applicant_status == 7 &&
                      (moment(fil.createdAt).format("MM/DD/YYYY") ==
                        moment().format("MM/DD/YYYY") ||
                        moment(fil.updatedAt).format("MM/DD/YYYY") ==
                          moment().format("MM/DD/YYYY"))
                  ).length
                }
              </span>
              <span className="arial-narrow-bold text-gray-500">
                Rejected Applicants
              </span>
              <div
                className="absolute h-23 w-2 !right-0 "
                style={{ background: "#FF0000" }}
              ></div>
            </div>
          </div>
        </div>
        {/*SIDE BAR RIGHT SIDE */}
        <div className="ml-4 flex flex-col">
          <div className="h-20 prdc-color w-77 rounded-md p-4  items-center justify-center">
            <p className="text-white arial-narrow-bold text-[20px]">
              Hello! <br /> You have{" "}
              {
                dataRecruitment.filter((fil) => fil.applicant_status == 0)
                  .length
              }{" "}
              new applicants today!
            </p>
          </div>
          <div className="h-51 bg-white w-77 rounded-md flex flex-col mt-3 p-3 overflow-y-auto">
            <span className="arial-narrow-bold text-[18px] text-black">
              You need to hire
            </span>
            <hr className="mt-2 border-black" />
            {availableJob.map((data, index) => (
              <>
                {index > 0 && <hr className="border-black" />}
                <div className="flex w-full items-center justify-between my-2">
                  <div>
                    <span className="arial-narrow">
                      {data.request_position}
                    </span>
                    <p className="arial-narrow-bold text-[25px] text-black">
                      {data.request_count.toString().padStart(2, 0)}
                    </p>
                  </div>
                  <MdArrowForwardIos
                    className="text-black text-[20px] cursor-pointer"
                    onClick={() => setViewPra(data)}
                  />
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex mt-3">
        <div className="h-60 w-253 flex flex-col bg-white rounded-md p-3  overflow-auto">
          <div className="w-full flex justify-between">
            <span className="arial-narrow-bold text-[20px] text-black">
              Recruitment Progress
            </span>
            <div className="flex text-black arial-narrow-bold">
              <span
                onClick={() => setOption("Today")}
                className={`${
                  option == "Today"
                    ? "text-green-800 underline underline-green-800"
                    : "text-black"
                } cursor-pointer hover:(underline underline-blue-600 text-blue-600)`}
              >
                Today
              </span>
              <span
                onClick={() => setOption("Upcoming")}
                className={`${
                  option == "Upcoming"
                    ? "text-green-800 underline underline-green-800"
                    : "text-black"
                } ml-4 cursor-pointer hover:(underline underline-blue-600 text-blue-600)`}
              >
                Upcoming
              </span>
            </div>
          </div>
          <hr className="w-full border-black mt-2 " />
          <table className="overflow-y-auto">
            <tr className="mt-1 h-12 text-black">
              <th>Full Name</th>
              <th>Profession</th>
              <th>Contact Number</th>
              <th>Schedule at</th>
              <th>Status</th>
            </tr>
            {dataRecruitment
              .filter((fil) =>
                option == "Today"
                  ? moment(fil.applicant_AppointmentDates).format(
                      "MM/DD/YYYY"
                    ) == moment().format("MM/DD/YYYY") &&
                    (fil.applicant_status == 1 ||
                      fil.applicant_status == 2 ||
                      fil.applicant_status == 3)
                  : moment(fil.applicant_AppointmentDates).isAfter() &&
                    (fil.applicant_status == 1 ||
                      fil.applicant_status == 2 ||
                      fil.applicant_status == 3)
              )
              .map((data) => (
                <tr className="text-center arial-narrow text-black h-9 ">
                  <td className="flex">
                    <img
                      src={API_URL + data.applicant_Pictures}
                      className="h-7 w-7 object-cover rounded-full mr-2"
                    />
                    {data.applicant_firstName +
                      " " +
                      data.applicant_middleName.charAt(0) +
                      "." +
                      " " +
                      data.applicant_lastName}
                  </td>
                  <td>{data.applicant_position}</td>
                  <td>{data.applicant_contactNum}</td>
                  <td>
                    {moment(data.applicant_AppointmentDates).format(
                      "MM/DD/YYYY - hh:mm a"
                    )}
                  </td>
                  <td className="text-left">
                    {data.applicant_status == 1 ? (
                      <div className="flex items-center">
                        <div
                          className="h-6 w-6 rounded-full border border-gray-500 mr-2"
                          style={{ background: "#FFFF6D" }}
                        />
                        Initial Interview
                      </div>
                    ) : data.applicant_status == 2 ? (
                      <div className="flex items-center">
                        <div
                          className="h-6 w-6 rounded-full border border-gray-500 mr-2"
                          style={{ background: "#C7CEEA" }}
                        />
                        Examination
                      </div>
                    ) : data.applicant_status == 3 ? (
                      <div className="flex items-center">
                        <div
                          className="h-6 w-6 rounded-full border border-gray-500 mr-2"
                          style={{ background: "#FFCAAF" }}
                        />
                        Final Interview
                      </div>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              ))}
          </table>
        </div>
        <div className="w-77 h-60 bg-white ml-4 p-3 rounded-md overflow-y-auto flex flex-col">
          <span className="text-[20px] arial-narrow-bold text-black">
            New Applicants
          </span>
          <hr className="border-black mt-3" />
          <div className="flex items-center  mt-3">
            {dataRecruitment
              .filter((fil) => fil.applicant_status == 0)
              .map((data) => (
                <>
                  <img
                    src={API_URL + data.applicant_Pictures}
                    className="h-9 w-9 rounded-full"
                  />
                  <div className="flex flex-col ml-5 arial-narrow text-black">
                    <span className="text-[19px]">
                      {" "}
                      {data.applicant_firstName +
                        " " +
                        data.applicant_middleName.charAt(0) +
                        "." +
                        " " +
                        data.applicant_lastName}
                    </span>
                    <span className="flex">
                      Applied for:{" "}
                      <p className="arial-narrow-bold">
                        {data.applicant_position}
                      </p>
                    </span>
                  </div>
                  <hr className="border-black mt-3" />
                </>
              ))}
          </div>
        </div>
      </div>
      {/*LAST DIV FOR DASHBOARD */}

      <AnimatePresence>
        {viewPra && (
          <HrPraRecruitment
            setViewPra={setViewPra}
            viewPra={viewPra}
            customClass={`bg-white h-full w-100 fixed top-0 flex flex-col z-9999 right-0 shadow-md shadow-gray-700 `}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default HrDashboardRecruitment;
