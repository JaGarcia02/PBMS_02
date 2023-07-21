import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, API_URL_HR } from "../../utils/Url";
import Navbar from "../../components/Navbar";
import { AnimatePresence } from "framer-motion";
import HrApplicantResume from "../../components/HrComponents/HrApplicantResume";
import moment from "moment";
import { FaUserAltSlash, FaSearch, FaCircle } from "react-icons/fa";
import HrApplicantUpdateDateInterview from "../../components/HrComponents/HrApplicantResume/HrApplicantUpdateDateInterview";

const Hr_viewApplicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [applicantInfo, setApplicantInfo] = useState({
    lastname: "",
    firstname: "",
    middlename: "",
    email: "",
    birthdate: "",
    contactnum: "",
    address: "",
    zip: "",
    position: "",
    source: "",
    datestart: "",
    applydate: "",
    resumeLink: "",
    status: "",
    department: "",
    picture: "",
    region: "",
    province: "",
    barangay: "",
    city: "",
    Gender: "",
    cover: "",
    createdAt: "",
    appointment: "",
    updatedAt: "",
    PoolReason: "",
  });

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        setOpenModal(false);
        // document.body.style.overflow = "unset";
      }
    };
    window.addEventListener("keydown", close);

    return () => {
      window.removeEventListener("keydown", close);
    };
  }, []);

  useEffect(() => {
    axios
      .get(API_URL_HR + `get-applicants/${selectedCategory}?q=${searchValue}`)

      .then((res) => setApplicants(res.data))
      .catch((err) => console.log(err));
  }, [selectedCategory, searchValue]);

  console.log(applicantInfo);
  return (
    <div className="h-screen w-screen backg-color-prdc flex flex-col">
      <Navbar />

      <div className="mt-20 h-11 flex items-center justify-between px-5  w-full">
        <span className="arial-narrow-bold text-[20px] ">
          Recruitment Portal
        </span>

        <div className=" flex h-8 w-[15%] border-black border relative text-black shadow-sm shadow-gray-600 bg-white dark:(bg-gray-600 text-light-50 shadow-none) <md:(w-[100%])">
          <FaSearch className="px-2 h-full w-8  absolute right-0 prdc-color text-white" />
          <input
            className="border-none outline-none text-[12px] w-full bg-transparent placeholder-gray-40 pl-3 "
            placeholder="  Search..."
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className="items-center justify-end flex flex-col mt-5 bg-gray-100 h-full ">
        <div className="grid  w-full justify-center h-[80vh] bottom-0 grid-cols-8">
          <div className=" border border-top-0 border-bottom-0 border-left-0 border-gray-400 overflow-y-auto  ">
            <div className=" p-3  ">
              <div className="w-full text-center h-12 arial-narrow-bold text-[15px] sticky z-20 bg-white top-3 h-6 border text-gray-800 border-gray-300 shadow-sm shadow-gray-200 rounded-md mb-4 item-center justify-center">
                <hr className="h-2 new-applied border-b rounded-sm border-gray-300" />
                <span className="px-2  text-[16px] h-[80%] arial-narrow-bold items-center flex justify-between">
                  New Applied{" "}
                  <p className="text-gray-400 ">
                    <FaCircle className="text-[8px] mr-1 text-gray-400" />
                    {
                      applicants.filter((data) => data.applicant_status == 0)
                        .length
                    }
                  </p>
                </span>
              </div>
              {applicants
                .filter((data) => data.applicant_status == 0)
                .map((dataName) => {
                  return (
                    <div
                      className=" w-full mb-2 h-20 rounded-md cursor-pointer  flex shadow-md shadow-gray-800  items-start justify-center transition-all duration-300 transform group hover:(bg-gray-100)"
                      onClick={() => {
                        document.body.style.overflow = "hidden";
                        setApplicantInfo({
                          lastname: dataName.applicant_lastName,
                          firstname: dataName.applicant_firstName,
                          middlename: dataName.applicant_middleName,
                          email: dataName.applicant_email,
                          birthdate: dataName.applicant_birthDate,
                          contactnum: dataName.applicant_contactNum,
                          address: dataName.applicant_address,
                          zip: dataName.applicant_zipCode,
                          position: dataName.applicant_position,
                          source: dataName.applicant_aboutUs,
                          datestart: dataName.applicant_probDateStart,
                          applydate: dataName.createdAt,
                          resumeLink: dataName.applicant_resume,
                          picture: dataName.applicant_Pictures,
                          status: dataName.applicant_status,
                          region: dataName.applicant_region,
                          province: dataName.applicant_province,
                          barangay: dataName.applicant_barangay,
                          city: dataName.applicant_city,
                          suffix: dataName.applicant_Suffix,
                          Gender: dataName.applicant_gender,
                          cover: dataName.applicant_coverletter,
                          appointment: dataName.applicant_AppointmentDates,
                          PoolReason: dataName.applicant_PoolReason,
                          BirthcertDependent:
                            dataName.applicant_BirthcertDependent,
                          COE: dataName.applicant_COE,
                          DriversLicense: dataName.applicant_DriversLicense,
                          NC2Certificate: dataName.applicant_NC2Certificate,
                          SOA: dataName.applicant_SOA,
                          Trainings: dataName.applicant_Trainings,
                          Vaccine: dataName.applicant_Vaccine,
                          HMA: dataName.applicant_HMA,
                          onebyone: dataName.applicant_onebyone,
                          twobytwo: dataName.applicant_twobytwo,
                          updatedAt: dataName.updatedAt,
                          ID: dataName.ID,
                        });
                        setOpenModal(true);
                      }}
                    >
                      <div className="justify-center flex w-full flex-col">
                        <div className="flex items-center h-8 w-full mt-2">
                          <div className="items-center justify-center w-[28%] mr-1 justify-start  flex">
                            <img
                              src={API_URL + dataName.applicant_Pictures}
                              className=" rounded-full w-8  h-8 object-cover bg-green-500"
                            />
                          </div>
                          <div className="flex flex-col  mt-1 text-start w-[72%] ">
                            <span className=" truncate capitalize text-[13px] arial-narrow-bold  ">
                              {dataName.applicant_lastName +
                                ", " +
                                dataName.applicant_firstName +
                                " " +
                                dataName.applicant_middleName}
                            </span>
                            <span className="flex text-start items-start justify-start   text-[12px] mt-1  arial-narrow">
                              {dataName.applicant_position}
                            </span>
                          </div>
                        </div>
                        <div className="mt-5  h-5 flex-col w-full px-2 items-center justify-center flex ">
                          <hr className="border new-applied w-full mb-1 opacity-90" />
                          <div className="flex w-full items-center mb-1 items-center justify-end">
                            <span className="text-[7px]  mr-1">
                              Date Applied:
                            </span>
                            <span className="text-[7px]">
                              {moment(dataName.createdAt).format(
                                "MMM DD YYYY | hh:mm a"
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className=" border border-top-0 border-bottom-0 border-left-0 border-gray-400 overflow-y-auto  ">
            <div className=" p-3">
              <div className="w-full text-center h-12 arial-narrow-bold text-[15px] sticky z-20 bg-white top-3 h-6 border text-gray-800 border-gray-300 shadow-sm shadow-gray-200 rounded-md mb-4 item-center justify-center">
                <hr className="h-2 initial-interview border-b rounded-sm border-gray-300" />
                <span className="px-2  text-[16px] h-[80%] arial-narrow-bold items-center flex justify-between">
                  Initial{" "}
                  <p className="text-gray-400 ">
                    <FaCircle className="text-[8px] mr-1 text-gray-400" />
                    {
                      applicants.filter((data) => data.applicant_status == 1)
                        .length
                    }
                  </p>
                </span>
              </div>
              {applicants
                .filter((data) => data.applicant_status == 1)
                .map((dataName) => {
                  return (
                    <div
                      className=" w-full mb-2 h-20 rounded-md cursor-pointer  flex shadow-md shadow-gray-800  items-start justify-center transition-all duration-300 transform group hover:(bg-gray-100)"
                      onClick={() => {
                        document.body.style.overflow = "hidden";
                        setApplicantInfo({
                          lastname: dataName.applicant_lastName,
                          firstname: dataName.applicant_firstName,
                          middlename: dataName.applicant_middleName,
                          email: dataName.applicant_email,
                          birthdate: dataName.applicant_birthDate,
                          contactnum: dataName.applicant_contactNum,
                          address: dataName.applicant_address,
                          zip: dataName.applicant_zipCode,
                          position: dataName.applicant_position,
                          source: dataName.applicant_aboutUs,
                          datestart: dataName.applicant_probDateStart,
                          applydate: dataName.createdAt,
                          resumeLink: dataName.applicant_resume,
                          picture: dataName.applicant_Pictures,
                          status: dataName.applicant_status,
                          suffix: dataName.applicant_Suffix,
                          region: dataName.applicant_region,
                          province: dataName.applicant_province,
                          barangay: dataName.applicant_barangay,
                          city: dataName.applicant_city,
                          Gender: dataName.applicant_gender,
                          cover: dataName.applicant_coverletter,
                          appointment: dataName.applicant_AppointmentDates,
                          BirthcertDependent:
                            dataName.applicant_BirthcertDependent,
                          COE: dataName.applicant_COE,
                          DriversLicense: dataName.applicant_DriversLicense,
                          NC2Certificate: dataName.applicant_NC2Certificate,
                          SOA: dataName.applicant_SOA,
                          Trainings: dataName.applicant_Trainings,
                          Vaccine: dataName.applicant_Vaccine,
                          HMA: dataName.applicant_HMA,
                          onebyone: dataName.applicant_onebyone,
                          twobytwo: dataName.applicant_twobytwo,
                          updatedAt: dataName.updatedAt,
                          PoolReason: dataName.applicant_PoolReason,
                          ID: dataName.ID,
                        });
                        setOpenModal(true);
                      }}
                    >
                      <div className="justify-center flex w-full flex-col">
                        <div className="flex items-center h-8 w-full mt-2">
                          <div className="items-center justify-center w-[28%] mr-1 justify-start  flex">
                            <img
                              src={API_URL + dataName.applicant_Pictures}
                              className=" rounded-full w-8  h-8 object-cover bg-green-500"
                            />
                          </div>
                          <div className="flex flex-col  mt-1 text-start w-[72%] ">
                            <span className=" truncate capitalize text-[13px] arial-narrow-bold  ">
                              {dataName.applicant_lastName +
                                ", " +
                                dataName.applicant_firstName +
                                " " +
                                dataName.applicant_middleName}
                            </span>
                            <span className="flex text-start items-start justify-start   text-[12px] mt-1  arial-narrow">
                              {dataName.applicant_position}
                            </span>
                          </div>
                        </div>
                        <div className="mt-5  h-5 flex-col w-full px-2 items-center justify-center flex ">
                          <hr className="border initial-interview w-full mb-1 opacity-90" />
                          <div className="flex w-full items-center mb-1 items-center justify-end">
                            <span className="text-[7px] mr-1">
                              Initial Interview:
                            </span>
                            <span className="text-[8px]">
                              {dataName.applicant_AppointmentDates
                                ? moment(
                                    dataName.applicant_AppointmentDates
                                  ).format("MMM DD YYYY | hh:mm a")
                                : "SET DATE FIRST"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className=" border border-top-0 border-bottom-0 border-left-0 border-gray-400 overflow-y-auto  ">
            <div className=" p-3">
              <div className="w-full text-center h-12 arial-narrow-bold text-[15px] sticky z-20 bg-white top-3 h-6 border text-gray-800 border-gray-300 shadow-sm shadow-gray-200 rounded-md mb-4 item-center justify-center">
                <hr className="h-2 exam-interview border-b rounded-sm border-gray-300" />
                <span className="px-2  text-[16px] h-[80%] arial-narrow-bold items-center flex justify-between">
                  Exam{" "}
                  <p className="text-gray-400 ">
                    <FaCircle className="text-[8px] mr-1 text-gray-400" />
                    {
                      applicants.filter((data) => data.applicant_status == 2)
                        .length
                    }
                  </p>
                </span>
              </div>
              {applicants
                .filter((data) => data.applicant_status == 2)
                .map((dataName) => {
                  return (
                    <div
                      className=" w-full mb-2 h-20 rounded-md cursor-pointer  flex shadow-md shadow-gray-800  items-start justify-center transition-all duration-300 transform group hover:(bg-gray-100)"
                      onClick={() => {
                        document.body.style.overflow = "hidden";
                        setApplicantInfo({
                          lastname: dataName.applicant_lastName,
                          firstname: dataName.applicant_firstName,
                          middlename: dataName.applicant_middleName,
                          email: dataName.applicant_email,
                          birthdate: dataName.applicant_birthDate,
                          contactnum: dataName.applicant_contactNum,
                          address: dataName.applicant_address,
                          zip: dataName.applicant_zipCode,
                          position: dataName.applicant_position,
                          source: dataName.applicant_aboutUs,
                          datestart: dataName.applicant_probDateStart,
                          applydate: dataName.createdAt,
                          resumeLink: dataName.applicant_resume,
                          picture: dataName.applicant_Pictures,
                          status: dataName.applicant_status,
                          region: dataName.applicant_region,
                          province: dataName.applicant_province,
                          barangay: dataName.applicant_barangay,
                          city: dataName.applicant_city,
                          Gender: dataName.applicant_gender,
                          cover: dataName.applicant_coverletter,
                          appointment: dataName.applicant_AppointmentDates,
                          BirthcertDependent:
                            dataName.applicant_BirthcertDependent,
                          suffix: dataName.applicant_Suffix,
                          COE: dataName.applicant_COE,
                          DriversLicense: dataName.applicant_DriversLicense,
                          NC2Certificate: dataName.applicant_NC2Certificate,
                          SOA: dataName.applicant_SOA,
                          Trainings: dataName.applicant_Trainings,
                          Vaccine: dataName.applicant_Vaccine,
                          HMA: dataName.applicant_HMA,
                          onebyone: dataName.applicant_onebyone,
                          twobytwo: dataName.applicant_twobytwo,
                          updatedAt: dataName.updatedAt,
                          PoolReason: dataName.applicant_PoolReason,
                          ID: dataName.ID,
                        });
                        setOpenModal(true);
                      }}
                    >
                      <div className="justify-center flex w-full flex-col">
                        <div className="flex items-center h-8 w-full mt-2">
                          <div className="items-center justify-center w-[28%] mr-1 justify-start  flex">
                            <img
                              src={API_URL + dataName.applicant_Pictures}
                              className=" rounded-full w-8  h-8 object-cover bg-green-500"
                            />
                          </div>
                          <div className="flex flex-col  mt-1 text-start w-[72%] ">
                            <span className=" truncate capitalize text-[13px] arial-narrow-bold  ">
                              {dataName.applicant_lastName +
                                ", " +
                                dataName.applicant_firstName +
                                " " +
                                dataName.applicant_middleName}
                            </span>
                            <span className="flex text-start items-start justify-start   text-[12px] mt-1  arial-narrow">
                              {dataName.applicant_position}
                            </span>
                          </div>
                        </div>
                        <div className="mt-5  h-5 flex-col w-full px-2 items-center justify-center flex ">
                          <hr className="border exam-interview w-full mb-1 opacity-90" />
                          <div className="flex w-full items-center mb-1 items-center justify-end">
                            <span className="text-[7px] mr-1">Exam:</span>
                            <span className="text-[8px]">
                              {moment(
                                dataName.applicant_AppointmentDates
                              ).format("MMM DD YYYY | hh:mm a")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className=" border border-top-0 border-bottom-0 border-left-0 border-gray-400 overflow-y-auto  ">
            <div className=" p-3">
              <div className="w-full text-center h-12 arial-narrow-bold text-[15px] sticky z-20 bg-white top-3 h-6 border text-gray-800 border-gray-300 shadow-sm shadow-gray-200 rounded-md mb-4 item-center justify-center">
                <hr className="h-2 final-interview border-b rounded-sm border-gray-300" />
                <span className="px-2  text-[16px] h-[80%] arial-narrow-bold items-center flex justify-between">
                  Final{" "}
                  <p className="text-gray-400 ">
                    <FaCircle className="text-[8px] mr-1 text-gray-400" />
                    {
                      applicants.filter((data) => data.applicant_status == 3)
                        .length
                    }
                  </p>
                </span>
              </div>
              {applicants
                .filter((data) => data.applicant_status == 3)
                .map((dataName) => {
                  return (
                    <div
                      className=" w-full mb-2 h-20 rounded-md cursor-pointer  flex shadow-md shadow-gray-800  items-start justify-center transition-all duration-300 transform group hover:(bg-gray-100)"
                      onClick={() => {
                        document.body.style.overflow = "hidden";
                        setApplicantInfo({
                          lastname: dataName.applicant_lastName,
                          firstname: dataName.applicant_firstName,
                          middlename: dataName.applicant_middleName,
                          email: dataName.applicant_email,
                          birthdate: dataName.applicant_birthDate,
                          contactnum: dataName.applicant_contactNum,
                          address: dataName.applicant_address,
                          zip: dataName.applicant_zipCode,
                          position: dataName.applicant_position,
                          source: dataName.applicant_aboutUs,
                          datestart: dataName.applicant_probDateStart,
                          applydate: dataName.createdAt,
                          resumeLink: dataName.applicant_resume,
                          picture: dataName.applicant_Pictures,
                          status: dataName.applicant_status,
                          region: dataName.applicant_region,
                          province: dataName.applicant_province,
                          barangay: dataName.applicant_barangay,
                          city: dataName.applicant_city,
                          Gender: dataName.applicant_gender,
                          suffix: dataName.applicant_Suffix,
                          cover: dataName.applicant_coverletter,
                          appointment: dataName.applicant_AppointmentDates,
                          BirthcertDependent:
                            dataName.applicant_BirthcertDependent,
                          COE: dataName.applicant_COE,
                          DriversLicense: dataName.applicant_DriversLicense,
                          NC2Certificate: dataName.applicant_NC2Certificate,
                          SOA: dataName.applicant_SOA,
                          Trainings: dataName.applicant_Trainings,
                          Vaccine: dataName.applicant_Vaccine,
                          HMA: dataName.applicant_HMA,
                          onebyone: dataName.applicant_onebyone,
                          twobytwo: dataName.applicant_twobytwo,
                          updatedAt: dataName.updatedAt,
                          PoolReason: dataName.applicant_PoolReason,
                          ID: dataName.ID,
                        });
                        setOpenModal(true);
                      }}
                    >
                      <div className="justify-center flex w-full flex-col">
                        <div className="flex items-center h-8 w-full mt-2">
                          <div className="items-center justify-center w-[28%] mr-1 justify-start  flex">
                            <img
                              src={API_URL + dataName.applicant_Pictures}
                              className=" rounded-full w-8  h-8 object-cover bg-green-500"
                            />
                          </div>
                          <div className="flex flex-col  mt-1 text-start w-[72%] ">
                            <span className=" truncate capitalize text-[13px] arial-narrow-bold  ">
                              {dataName.applicant_lastName +
                                ", " +
                                dataName.applicant_firstName +
                                " " +
                                dataName.applicant_middleName}
                            </span>
                            <span className="flex text-start items-start justify-start   text-[12px] mt-1  arial-narrow">
                              {dataName.applicant_position}
                            </span>
                          </div>
                        </div>
                        <div className="mt-5  h-5 flex-col w-full px-2 items-center justify-center flex ">
                          <hr className="border final-interview w-full mb-1 opacity-90" />
                          <div className="flex w-full items-center mb-1 items-center justify-end">
                            <span className="text-[7px] mr-1">
                              Final Interview:
                            </span>
                            <span className="text-[8px]">
                              {moment(
                                dataName.applicant_AppointmentDates
                              ).format("MMM DD YYYY | hh:mm a")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className=" border border-top-0 border-bottom-0 border-left-0 border-gray-400 overflow-y-auto  ">
            <div className=" p-3">
              <div className="w-full text-center h-12 arial-narrow-bold text-[15px] sticky z-20 bg-white top-3 h-6 border text-gray-800 border-gray-300 shadow-sm shadow-gray-200 rounded-md mb-4 item-center justify-center">
                <hr className="h-2 queueing-interview rounded-sm  border-b border-gray-300" />
                <span className="px-2  text-[16px] h-[80%] arial-narrow-bold items-center flex justify-between">
                  Queueing{" "}
                  <p className="text-gray-400 ">
                    <FaCircle className="text-[8px] mr-1 text-gray-400" />
                    {
                      applicants.filter((data) => data.applicant_status == 4)
                        .length
                    }
                  </p>
                </span>
              </div>
              {applicants
                .filter((data) => data.applicant_status == 4)
                .map((dataName) => {
                  return (
                    <div
                      className=" w-full mb-2 h-20 rounded-md cursor-pointer  flex shadow-md shadow-gray-800  items-start justify-center transition-all duration-300 transform group hover:(bg-gray-100)"
                      onClick={() => {
                        document.body.style.overflow = "hidden";
                        setApplicantInfo({
                          lastname: dataName.applicant_lastName,
                          firstname: dataName.applicant_firstName,
                          middlename: dataName.applicant_middleName,
                          email: dataName.applicant_email,
                          birthdate: dataName.applicant_birthDate,
                          contactnum: dataName.applicant_contactNum,
                          address: dataName.applicant_address,
                          zip: dataName.applicant_zipCode,
                          position: dataName.applicant_position,
                          source: dataName.applicant_aboutUs,
                          datestart: dataName.applicant_probDateStart,
                          applydate: dataName.createdAt,
                          resumeLink: dataName.applicant_resume,
                          status: dataName.applicant_status,
                          SSS: dataName.applicant_SSS,
                          PagIbig: dataName.applicant_PagIbig,
                          suffix: dataName.applicant_Suffix,
                          NBI: dataName.applicant_NBI,
                          Diploma: dataName.applicant_Diploma,
                          BarangayClearance:
                            dataName.applicant_BarangayClearance,
                          BirthCert: dataName.applicant_BirthCert,
                          Medical: dataName.applicant_MedicalResult,
                          PhilHealth: dataName.applicant_PhilHealth,
                          TIN: dataName.applicant_TIN,
                          TOR: dataName.applicant_TOR,
                          picture: dataName.applicant_Pictures,
                          MarriageContract:
                            dataName.applicant_MarriageCertificate,
                          PoliceClearance: dataName.applicant_PoliceClearance,
                          region: dataName.applicant_region,
                          province: dataName.applicant_province,
                          barangay: dataName.applicant_barangay,
                          city: dataName.applicant_city,
                          Gender: dataName.applicant_gender,
                          cover: dataName.applicant_coverletter,
                          appointment: dataName.applicant_AppointmentDates,
                          updatedAt: dataName.updatedAt,
                          PoolReason: dataName.applicant_PoolReason,
                          BirthcertDependent:
                            dataName.applicant_BirthcertDependent,
                          COE: dataName.applicant_COE,
                          DriversLicense: dataName.applicant_DriversLicense,
                          NC2Certificate: dataName.applicant_NC2Certificate,
                          SOA: dataName.applicant_SOA,
                          Trainings: dataName.applicant_Trainings,
                          Vaccine: dataName.applicant_Vaccine,
                          HMA: dataName.applicant_HMA,
                          onebyone: dataName.applicant_onebyone,
                          twobytwo: dataName.applicant_twobytwo,
                          ID: dataName.ID,
                        });
                        setOpenModal(true);
                      }}
                    >
                      <div className="justify-center flex w-full flex-col">
                        <div className="flex items-center h-8 w-full mt-2">
                          <div className="items-center justify-center w-[28%] mr-1 justify-start  flex">
                            <img
                              src={API_URL + dataName.applicant_Pictures}
                              className=" rounded-full w-8  h-8 object-cover bg-green-500"
                            />
                          </div>
                          <div className="flex flex-col  mt-1 text-start w-[72%] ">
                            <span className=" truncate capitalize text-[13px] arial-narrow-bold  ">
                              {dataName.applicant_lastName +
                                ", " +
                                dataName.applicant_firstName +
                                " " +
                                dataName.applicant_middleName}
                            </span>
                            <span className="flex text-start items-start justify-start   text-[12px] mt-1  arial-narrow">
                              {dataName.applicant_position}
                            </span>
                          </div>
                        </div>
                        <div className="mt-5  h-5 flex-col w-full px-2 items-center justify-center flex ">
                          <hr className="border queueing-interview w-full mb-1 opacity-90" />
                          <div className="flex w-full items-center mb-1 items-center justify-end">
                            <span className="text-[7px] mr-1">
                              Passed Final:
                            </span>
                            <span className="text-[8px]">
                              {moment(dataName.updatedAt).format(
                                "MMM DD YYYY | hh:mm a"
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className=" border border-top-0 border-bottom-0 border-left-0 border-gray-400 overflow-y-auto  ">
            <div className=" p-3">
              <div className="w-full text-center h-12 arial-narrow-bold text-[15px] sticky z-20 bg-white top-3 h-6 border text-gray-800 border-gray-300 shadow-sm shadow-gray-200 rounded-md mb-4 item-center justify-center">
                <hr className="h-2 prehired-interview border-b rounded-sm border-gray-300" />
                <span className="px-2  text-[16px] h-[80%] arial-narrow-bold items-center flex justify-between">
                  Pre-hired{" "}
                  <p className="text-gray-400 ">
                    <FaCircle className="text-[8px] mr-1 text-gray-400" />
                    {
                      applicants.filter((data) => data.applicant_status == 5)
                        .length
                    }
                  </p>
                </span>
              </div>
              {applicants
                .filter((data) => data.applicant_status == 5)
                .map((dataName) => {
                  return (
                    <div
                      className=" w-full mb-2 h-20 rounded-md cursor-pointer  flex shadow-md shadow-gray-800  items-start justify-center transition-all duration-300 transform group hover:(bg-gray-100)"
                      onClick={() => {
                        document.body.style.overflow = "hidden";
                        setApplicantInfo({
                          lastname: dataName.applicant_lastName,
                          firstname: dataName.applicant_firstName,
                          middlename: dataName.applicant_middleName,
                          email: dataName.applicant_email,
                          birthdate: dataName.applicant_birthDate,
                          contactnum: dataName.applicant_contactNum,
                          address: dataName.applicant_address,
                          zip: dataName.applicant_zipCode,
                          position: dataName.applicant_position,
                          source: dataName.applicant_aboutUs,
                          datestart: dataName.applicant_probDateStart,
                          applydate: dataName.createdAt,
                          resumeLink: dataName.applicant_resume,
                          status: dataName.applicant_status,
                          SSS: dataName.applicant_SSS,
                          PagIbig: dataName.applicant_PagIbig,
                          NBI: dataName.applicant_NBI,
                          suffix: dataName.applicant_Suffix,
                          Diploma: dataName.applicant_Diploma,
                          BarangayClearance:
                            dataName.applicant_BarangayClearance,
                          BirthCert: dataName.applicant_BirthCert,
                          Medical: dataName.applicant_MedicalResult,
                          PhilHealth: dataName.applicant_PhilHealth,
                          TIN: dataName.applicant_TIN,
                          TOR: dataName.applicant_TOR,
                          picture: dataName.applicant_Pictures,
                          MarriageContract:
                            dataName.applicant_MarriageCertificate,
                          PoliceClearance: dataName.applicant_PoliceClearance,
                          region: dataName.applicant_region,
                          province: dataName.applicant_province,
                          barangay: dataName.applicant_barangay,
                          city: dataName.applicant_city,
                          Gender: dataName.applicant_gender,
                          cover: dataName.applicant_coverletter,
                          appointment: dataName.applicant_AppointmentDates,
                          BirthcertDependent:
                            dataName.applicant_BirthcertDependent,
                          COE: dataName.applicant_COE,
                          DriversLicense: dataName.applicant_DriversLicense,
                          NC2Certificate: dataName.applicant_NC2Certificate,
                          SOA: dataName.applicant_SOA,
                          Trainings: dataName.applicant_Trainings,
                          Vaccine: dataName.applicant_Vaccine,
                          HMA: dataName.applicant_HMA,
                          onebyone: dataName.applicant_onebyone,
                          twobytwo: dataName.applicant_twobytwo,
                          updatedAt: dataName.updatedAt,
                          PoolReason: dataName.applicant_PoolReason,
                          ID: dataName.ID,
                        });
                        setOpenModal(true);
                      }}
                    >
                      <div className="justify-center flex w-full flex-col">
                        <div className="flex items-center h-8 w-full mt-2">
                          <div className="items-center justify-center w-[28%] mr-1 justify-start  flex">
                            <img
                              src={API_URL + dataName.applicant_Pictures}
                              className=" rounded-full w-8  h-8 object-cover bg-green-500"
                            />
                          </div>
                          <div className="flex flex-col  mt-1 text-start w-[72%] ">
                            <span className="truncate capitalize text-[13px] arial-narrow-bold  ">
                              {dataName.applicant_lastName +
                                ", " +
                                dataName.applicant_firstName +
                                " " +
                                dataName.applicant_middleName}
                            </span>
                            <span className="flex text-start items-start justify-start   text-[12px] mt-1  arial-narrow">
                              {dataName.applicant_position}
                            </span>
                          </div>
                        </div>
                        <div className="mt-5  h-5 flex-col w-full px-2 items-center justify-center flex ">
                          <hr className="border prehired-interview w-full mb-1 opacity-90" />
                          <div className="flex w-full items-center mb-1 items-center justify-end">
                            <span className="text-[7px] mr-1">
                              Passed requirements:
                            </span>
                            <span className="text-[8px]">
                              {moment(dataName.updatedAt).format(
                                "MMM DD YYYY | hh:mm a"
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className=" border border-top-0 border-bottom-0 border-left-0 border-gray-400 overflow-y-auto  ">
            <div className=" p-3">
              <div className="w-full text-center h-12 arial-narrow-bold text-[15px] sticky z-20 bg-white top-3 h-6 border text-gray-800 border-gray-300 shadow-sm shadow-gray-200 rounded-md mb-4 item-center justify-center">
                <hr className="h-2 placement-interview border-b rounded-sm border-gray-300" />
                <span className="px-2  text-[16px] h-[80%] arial-narrow-bold items-center flex justify-between">
                  Placement{" "}
                  <p className="text-gray-400 ">
                    <FaCircle className="text-[8px] mr-1 text-gray-400" />
                    {
                      applicants.filter((data) => data.applicant_status == 6)
                        .length
                    }
                  </p>
                </span>
              </div>
              {applicants
                .filter((data) => data.applicant_status == 6)
                .map((dataName) => {
                  return (
                    <div
                      className=" w-full mb-2 h-20 rounded-md cursor-pointer  flex shadow-md shadow-gray-800  items-start justify-center transition-all duration-300 transform group hover:(bg-gray-100)"
                      onClick={() => {
                        document.body.style.overflow = "hidden";
                        setApplicantInfo({
                          lastname: dataName.applicant_lastName,
                          firstname: dataName.applicant_firstName,
                          middlename: dataName.applicant_middleName,
                          email: dataName.applicant_email,
                          birthdate: dataName.applicant_birthDate,
                          contactnum: dataName.applicant_contactNum,
                          address: dataName.applicant_address,
                          zip: dataName.applicant_zipCode,
                          position: dataName.applicant_position,
                          source: dataName.applicant_aboutUs,
                          datestart: dataName.applicant_probDateStart,
                          suffix: dataName.applicant_Suffix,
                          applydate: dataName.createdAt,
                          resumeLink: dataName.applicant_resume,
                          status: dataName.applicant_status,
                          SSS: dataName.applicant_SSS,
                          PagIbig: dataName.applicant_PagIbig,
                          NBI: dataName.applicant_NBI,
                          Diploma: dataName.applicant_Diploma,
                          BarangayClearance:
                            dataName.applicant_BarangayClearance,
                          BirthCert: dataName.applicant_BirthCert,
                          Medical: dataName.applicant_MedicalResult,
                          PhilHealth: dataName.applicant_PhilHealth,
                          TIN: dataName.applicant_TIN,
                          TOR: dataName.applicant_TOR,
                          picture: dataName.applicant_Pictures,
                          MarriageContract:
                            dataName.applicant_MarriageCertificate,
                          PoliceClearance: dataName.applicant_PoliceClearance,
                          region: dataName.applicant_region,
                          province: dataName.applicant_province,
                          barangay: dataName.applicant_barangay,
                          city: dataName.applicant_city,
                          Gender: dataName.applicant_gender,
                          cover: dataName.applicant_coverletter,
                          appointment: dataName.applicant_AppointmentDates,
                          BirthcertDependent:
                            dataName.applicant_BirthcertDependent,
                          COE: dataName.applicant_COE,
                          DriversLicense: dataName.applicant_DriversLicense,
                          NC2Certificate: dataName.applicant_NC2Certificate,
                          SOA: dataName.applicant_SOA,
                          Trainings: dataName.applicant_Trainings,
                          Vaccine: dataName.applicant_Vaccine,
                          HMA: dataName.applicant_HMA,
                          onebyone: dataName.applicant_onebyone,
                          twobytwo: dataName.applicant_twobytwo,
                          updatedAt: dataName.updatedAt,
                          PoolReason: dataName.applicant_PoolReason,
                          ID: dataName.ID,
                        });
                        setOpenModal(true);
                      }}
                    >
                      <div className="justify-center flex w-full flex-col">
                        <div className="flex items-center h-8 w-full mt-2">
                          <div className="items-center justify-center w-[28%] mr-1 justify-start  flex">
                            <img
                              src={API_URL + dataName.applicant_Pictures}
                              className=" rounded-full w-8  h-8 object-cover bg-green-500"
                            />
                          </div>
                          <div className="flex flex-col  mt-1 text-start w-[72%] ">
                            <span className="truncate capitalize text-[13px] arial-narrow-bold  ">
                              {dataName.applicant_lastName +
                                ", " +
                                dataName.applicant_firstName +
                                " " +
                                dataName.applicant_middleName}
                            </span>
                            <span className="flex text-start items-start justify-start   text-[12px] mt-1  arial-narrow">
                              {dataName.applicant_position}
                            </span>
                          </div>
                        </div>
                        <div className="mt-5  h-5 flex-col w-full px-2 items-center justify-center flex ">
                          <hr className="border placement-interview w-full mb-1 opacity-90" />
                          <div className="flex w-full items-center mb-1 items-center justify-end">
                            <span className="text-[7px] mr-1">Updated at:</span>
                            <span className="text-[8px]">
                              {moment(dataName.updatedAt).format(
                                "MMM DD YYYY | hh:mm a"
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className=" border border-top-0 border-bottom-0 border-left-0 border-gray-400 overflow-y-auto  ">
            <div className=" p-3">
              <div className="w-full text-center h-12 arial-narrow-bold text-[15px] sticky z-20 bg-white top-3 h-6 border text-gray-800 border-gray-300 shadow-sm shadow-gray-200 rounded-md mb-4 item-center justify-center">
                <hr className="h-2 pooling-interview border-b rounded-sm border-gray-300" />
                <span className="px-2  text-[16px] h-[80%] arial-narrow-bold items-center flex justify-between">
                  Pooling{" "}
                  <p className="text-gray-400 ">
                    <FaCircle className="text-[8px] mr-1 text-gray-400" />
                    {
                      applicants.filter((data) => data.applicant_status == 7)
                        .length
                    }
                  </p>
                </span>
              </div>
              {applicants
                .filter((data) => data.applicant_status == 7)
                .map((dataName) => {
                  return (
                    <div
                      className=" w-full mb-2 h-20 rounded-md cursor-pointer  flex shadow-md shadow-gray-800  items-start justify-center transition-all duration-300 transform group hover:(bg-gray-100)"
                      onClick={() => {
                        document.body.style.overflow = "hidden";
                        setApplicantInfo({
                          lastname: dataName.applicant_lastName,
                          firstname: dataName.applicant_firstName,
                          middlename: dataName.applicant_middleName,
                          email: dataName.applicant_email,
                          birthdate: dataName.applicant_birthDate,
                          contactnum: dataName.applicant_contactNum,
                          address: dataName.applicant_address,
                          zip: dataName.applicant_zipCode,
                          position: dataName.applicant_position,
                          source: dataName.applicant_aboutUs,
                          datestart: dataName.applicant_probDateStart,
                          suffix: dataName.applicant_Suffix,
                          resumeLink: dataName.applicant_resume,
                          picture: dataName.applicant_Pictures,
                          status: dataName.applicant_status,
                          region: dataName.applicant_region,
                          province: dataName.applicant_province,
                          barangay: dataName.applicant_barangay,
                          city: dataName.applicant_city,
                          Gender: dataName.applicant_gender,
                          cover: dataName.applicant_coverletter,
                          timeStamp: dataName.createdAt,
                          appointment: dataName.applicant_AppointmentDates,
                          BirthcertDependent:
                            dataName.applicant_BirthcertDependent,
                          COE: dataName.applicant_COE,
                          DriversLicense: dataName.applicant_DriversLicense,
                          NC2Certificate: dataName.applicant_NC2Certificate,
                          SOA: dataName.applicant_SOA,
                          Trainings: dataName.applicant_Trainings,
                          Vaccine: dataName.applicant_Vaccine,
                          HMA: dataName.applicant_HMA,
                          onebyone: dataName.applicant_onebyone,
                          twobytwo: dataName.applicant_twobytwo,
                          updatedAt: dataName.updatedAt,
                          PoolReason: dataName.applicant_PoolReason,
                          ID: dataName.ID,
                        });
                        setOpenModal(true);
                      }}
                    >
                      <div className="justify-center flex w-full flex-col">
                        <div className="flex items-center h-8 w-full mt-2">
                          <div className="items-center justify-center w-[28%] mr-1 justify-start  flex">
                            <img
                              src={API_URL + dataName.applicant_Pictures}
                              className=" rounded-full w-8  h-8 object-cover bg-green-500"
                            />
                          </div>
                          <div className="flex flex-col  mt-1 text-start w-[72%] ">
                            <span className="truncate capitalize  text-[13px] arial-narrow-bold  ">
                              {dataName.applicant_lastName +
                                ", " +
                                dataName.applicant_firstName +
                                " " +
                                dataName.applicant_middleName}
                            </span>
                            <span className="flex text-start items-start justify-start   text-[12px] mt-1  arial-narrow">
                              {dataName.applicant_position}
                            </span>
                          </div>
                        </div>
                        <div className="mt-5  h-5 flex-col w-full px-2 items-center justify-center flex ">
                          <hr className="border pooling-interview w-full mb-1 opacity-90" />
                          <div className="flex w-full items-center mb-1 items-center justify-end">
                            <span className="text-[7px] mr-1">Pooled:</span>
                            <span className="text-[8px]">
                              {moment(dataName.updatedAt).format(
                                "MMM DD YYYY | hh:mm a"
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {openModal && (
          <HrApplicantResume
            applicantInfo={applicantInfo}
            setOpenModal={setOpenModal}
            setApplicantInfo={setApplicantInfo}
            setApplicants={setApplicants}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hr_viewApplicants;
