import React, { useState, useEffect, useCallback } from "react";
import {
  AiFillCloseSquare,
  AiOutlineCloseSquare,
  AiOutlineMail,
  AiOutlinePhone,
} from "react-icons/ai";
import {
  BsArrowLeftShort,
  BsCheck2Circle,
  BsFillExclamationDiamondFill,
  BsTelephone,
} from "react-icons/bs";
import { BiCake } from "react-icons/bi";
import { GrNotes } from "react-icons/gr";
import { AnimatePresence, motion } from "framer-motion";
import moment from "moment";
import HRPlacement from "./HrActiveEmployee/Placement";
import Navbar from "../Navbar";
import { IoIosCloudUpload } from "react-icons/io";
import { useDropzone } from "react-dropzone";
import HRAccountabilities from "./HrActiveEmployee/HRAccountabilities";
import HRBasicInformation from "./HrActiveEmployee/HRBasicInformation";
import HRGovIDs from "./HrActiveEmployee/HRGovIDs";
import HRFamBackground from "./HrActiveEmployee/HRFamBackground";
import HREdBackground from "./HrActiveEmployee/HREdBackground";
import HRWorkExp from "./HrActiveEmployee/HRWorkExp";
import { API_URL, API_URL_HR } from "../../utils/Url";
import axios from "axios";
import Remodal from "../../Reusable/Remodal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useBeforeUnload } from "react-router-dom";
import Modal from "../../ReusableComponent/Modal";

import { useSelector } from "react-redux";

const HrActivePersonalInfo = ({
  setCurrentPage,

  employeeInfo,
  profile,
  setProfile,
  setEmployeeInfo,
  setViewDetails,
  setEmployeeList,
}) => {
  const [personalInfo, setPersonalInfo] = useState({
    Employee_ID: employeeInfo.Employee_ID,
    Employee_BioID: employeeInfo.Employee_BioID,
    Employee_LastName: employeeInfo.Employee_LastName,
    Employee_FirstName: employeeInfo.Employee_FirstName,
    Employee_MiddleName: employeeInfo.Employee_MiddleName,
    Employee_email: employeeInfo.Employee_email,
    Employee_ContactNum: employeeInfo.Employee_ContactNum,
    Employee_address: employeeInfo.Employee_address,
    Employee_region: employeeInfo.Employee_region,
    Employee_province: employeeInfo.Employee_province,
    Employee_city: employeeInfo.Employee_city,
    Employee_barangay: employeeInfo.Employee_barangay,
    Employee_Company: employeeInfo.Employee_Company,
    Employee_CompanyEmail: employeeInfo.Employee_CompanyEmail,
    Employee_Salary: employeeInfo.Employee_Salary,
    Employee_JobDesc: employeeInfo.Employee_JobDesc,
    Employee_COE: employeeInfo.Employee_COE,
    Employee_CompBranch: employeeInfo.Employee_CompBranch,
    Employee_Position: employeeInfo.Employee_Position,
    Employee_BirthDate: employeeInfo.Employee_BirthDate,
    Employee_TypeContract: employeeInfo.Employee_TypeContract,
    Employee_Status: employeeInfo.Employee_Status,
    Employee_Department: employeeInfo.Employee_Department,
    Employee_Picture: employeeInfo.Employee_Picture,
    Employee_Suffix: employeeInfo.Employee_Suffix,
    Employee_MobileNumber: employeeInfo.Employee_MobileNumber,
    Employee_Landline: employeeInfo.Employee_Landline,
    Employee_Birthplace: employeeInfo.Employee_Birthplace,
    Employee_CivilStatus: employeeInfo.Employee_CivilStatus,
    Employee_Religion: employeeInfo.Employee_Religion,
    Employee_Height: employeeInfo.Employee_Height,
    Employee_Weight: employeeInfo.Employee_Weight,
    Employee_Nationality: employeeInfo.Employee_Nationality,
    Employee_DriversLicense: employeeInfo.Employee_DriversLicense,
    Employee_PRC: employeeInfo.Employee_PRC,
    Employee_FamilyBackground: employeeInfo.Employee_FamilyBackground,
    createdAt: employeeInfo.createdAt,
    Employee_EducationBackground: employeeInfo.Employee_EducationBackground,
    Employee_WorkExperience: employeeInfo.Employee_WorkExperience,
    Employee_ItemsAccountability: employeeInfo.Employee_ItemsAccountability,
    Employee_Gender: employeeInfo.Employee_Gender,
  });

  const [closeCondition, setCloseCondition] = useState(false);
  const [closeModal, setCloseModal] = useState(false);

  const { branding } = useSelector((state) => state.branding);
  const [select, setSelect] = useState("");
  const [validate, setValidate] = useState(false);
  const [toggleState, setToggleState] = useState(1);
  const [unsaved, setUnsaved] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  console.log(employeeInfo);
  const validateReqData = () => {
    if (select.trim() === "") {
      document.getElementById("select").style.borderColor = "red";
      setValidate(true);
    } else {
      document.getElementById("select").style.borderColor = "black";
      setValidate(false);
    }

    if (personalInfo.Employee_Position.trim() === "") {
      document.getElementById("pos").style.borderColor = "red";
      setValidate(true);
    } else {
      document.getElementById("pos").style.borderColor = "black";
      setValidate(false);
    }

    if (personalInfo.Employee_TypeContract.trim() === "") {
      document.getElementById("con").style.borderColor = "red";
      setValidate(true);
    } else {
      setValidate(false);
    }
  };

  function MobileNumberFormat(text) {
    var result = [];
    text = text.replace(/[^\d]/g, "");
    while (text.length >= 6) {
      result.push(text.substring(0, 4));
      text = text.substring(4);
      result.push(text.substring(0, 3));
      text = text.substring(3);
    }
    if (text.length > 0) result.push(text);
    return result.join(" ");
  }

  //DROP ZONE
  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    multiple: false,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    onDrop: (acceptFiles) => {
      setProfile(acceptFiles[0]);
      setPersonalInfo({ ...personalInfo, Employee_Picture: acceptFiles[0] });
      console.log(
        acceptFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
    },
  });

  const handleUnload = (e) => {
    console.log("hey");
    alert("HEY");
  };

  useEffect(() => {
    window.addEventListener("locationchange", handleUnload);
    return () => window.removeEventListener("locationchange", handleUnload);
  }, [handleUnload]);

  // SAVING DATA FUNCTION BUTTON
  const click_save = (e) => {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("ID", employeeInfo.ID);
    formdata.append(
      "Employee_FirstName",
      employeeInfo.Employee_FirstName ?? ""
    );
    formdata.append("Employee_LastName", employeeInfo.Employee_LastName ?? "");
    formdata.append(
      "Employee_MiddleName",
      employeeInfo.Employee_MiddleName ?? ""
    );
    formdata.append("profile", profile ? profile : null);

    formdata.append(
      "Employee_BarangayClearance",
      employeeInfo.Employee_BarangayClearance
    );
    formdata.append("Employee_BioID", employeeInfo.Employee_BioID ?? "");
    formdata.append(
      "Employee_BirthCert",
      employeeInfo.Employee_Birthcert ?? ""
    );
    formdata.append(
      "Employee_BirthDate",
      employeeInfo.Employee_BirthDate ?? ""
    );
    formdata.append(
      "Employee_BirthCertDependent",
      employeeInfo.Employee_BirthCertDependent ?? ""
    );
    formdata.append("Employee_COE", employeeInfo.Employee_COE ?? "");
    formdata.append(
      "Employee_CompBranch",
      employeeInfo.Employee_CompBranch ?? ""
    );
    formdata.append("Employee_Company", employeeInfo.Employee_Company ?? "");
    formdata.append(
      "Employee_ContactNum",
      employeeInfo.Employee_ContactNum ?? ""
    );
    formdata.append(
      "Employee_Department",
      employeeInfo.Employee_Department ?? ""
    );
    formdata.append("Employee_Diploma", employeeInfo.Employee_Diploma ?? "");
    formdata.append(
      "Employee_DriversLicense",
      employeeInfo.Employee_DriversLicense ?? ""
    );
    formdata.append("Employee_HMA", employeeInfo.Employee_HMA ?? "");
    formdata.append("Employee_JobDesc", employeeInfo.Employee_JobDesc ?? "");

    formdata.append(
      "Employee_MarriageCertificate",
      employeeInfo.Employee_MarriageCertificate ?? ""
    );
    formdata.append(
      "Employee_MedicalCertificate",
      employeeInfo.Employee_MedicalCertificate ?? ""
    );
    formdata.append("Employee_NBI", employeeInfo.Employee_NBI ?? "");
    formdata.append(
      "Employee_NC2Certificate",
      employeeInfo.Employee_NC2Certificate
    );
    formdata.append("Employee_Pag_Ibig", employeeInfo.Employee_Pag_Ibig ?? "");
    formdata.append(
      "Employee_PhilHealth",
      employeeInfo.Employee_PhilHealth ?? ""
    );
    formdata.append("Employee_Picture", employeeInfo.Employee_Picture ?? "");
    formdata.append(
      "Employee_PoliceClearance",
      employeeInfo.Employee_PoliceClearance ?? ""
    );
    formdata.append("Employee_Position", employeeInfo.Employee_Position ?? "");

    formdata.append("Employee_Resume", employeeInfo.Employee_Resume ?? "");
    formdata.append("Employee_SOA", employeeInfo.Employee_SOA ?? "");
    formdata.append("Employee_SSS", employeeInfo.Employee_SSS ?? "");
    formdata.append("Employee_Status", employeeInfo.Employee_Status ?? "");
    formdata.append("Employee_TIN", employeeInfo.Employee_TIN ?? "");
    formdata.append("Employee_TOR", employeeInfo.Employee_TOR ?? "");
    formdata.append(
      "Employee_Trainings",
      employeeInfo.Employee_Trainings ?? ""
    );
    formdata.append(
      "Employee_TypeContract",
      employeeInfo.Employee_TypeContract ?? ""
    );
    formdata.append(
      "Employee_CompanyEmail",
      employeeInfo.Employee_CompanyEmail ?? ""
    );
    formdata.append("Employee_Vaccine", employeeInfo.Employee_Vaccine ?? "");
    formdata.append("Employee_Salary", employeeInfo.Employee_Salary ?? "");
    formdata.append("Employee_Address", employeeInfo.Employee_address ?? "");
    formdata.append("Employee_barangay", employeeInfo.Employee_barangay ?? "");
    formdata.append("Employee_city", employeeInfo.Employee_city ?? "");
    formdata.append("Employee_email", employeeInfo.Employee_email ?? "");
    formdata.append("Employee_hasPbms", employeeInfo.Employee_hasPbms ?? "");
    formdata.append("Employee_onebyone", employeeInfo.Employee_onebyone ?? "");
    formdata.append("Employee_province", employeeInfo.Employee_province ?? "");
    formdata.append("Employee_region", employeeInfo.Employee_region ?? "");
    formdata.append("Employee_twobytwo", employeeInfo.Employee_twobywo ?? "");
    formdata.append(
      "Employee_DateStart",
      employeeInfo.Employee_DateStart ?? ""
    );
    formdata.append("Employee_Schedule", employeeInfo.Employee_Schedule ?? "");
    formdata.append("Employee_Suffix", employeeInfo.Employee_Suffix ?? "");
    formdata.append("Employee_PRC", employeeInfo.Employee_PRC ?? "");
    formdata.append(
      "Employee_MobileNumber",
      employeeInfo.Employee_MobileNumber ?? ""
    );
    formdata.append("Employee_Landline", employeeInfo.Employee_Landline ?? "");
    formdata.append(
      "Employee_Birthplace",
      employeeInfo.Employee_Birthplace ?? ""
    );
    formdata.append(
      "Employee_CivilStatus",
      employeeInfo.Employee_CivilStatus ?? ""
    );
    formdata.append("Employee_Religion", employeeInfo.Employee_Religion ?? "");
    formdata.append("Employee_Gender", employeeInfo.Employee_Gender ?? "");
    formdata.append("Employee_Height", employeeInfo.Employee_Height ?? "");
    formdata.append("Employee_Weight", employeeInfo.Employee_Weight ?? "");
    formdata.append(
      "Employee_Nationality",
      employeeInfo.Employee_Nationality ?? ""
    );
    formdata.append(
      "Employee_FamilyBackground",
      employeeInfo.Employee_FamilyBackground ?? null
    );
    formdata.append(
      "Employee_EducationBackground",
      employeeInfo.Employee_EducationBackground ?? null
    );
    formdata.append(
      "Employee_WorkExperience",
      employeeInfo.Employee_WorkExperience ?? null
    );
    formdata.append(
      "Employee_ItemsAccountability",
      employeeInfo.Employee_ItemsAccountability ?? null
    );
    formdata.append(
      "Employee_Designation",
      employeeInfo.Employee_Designation ?? ""
    );

    axios
      .put(API_URL_HR + "employed-new", formdata)
      .then((res) => {
        // setTimeout(() => {
        //   setShowModal(false);

        toast.success("Updated Successfully!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setViewDetails(false);
        setEmployeeList(res.data);
        // }, 1500);
      })
      .catch((error) => console.log(error));
  };

  // WHEN CLICK ESCAPE CLOSE THE MODAL
  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27 && !closeCondition) {
        setViewDetails(false);
      }
      if (closeCondition && e.keyCode === 27) {
        setCloseModal(true);
      }

      return;
    };
    window.addEventListener("keydown", close);

    return () => {
      window.removeEventListener("keydown", close);
    };
  }, [closeCondition]);

  // WHEN THE USER TRY TO GO TO OTHER PAGES
  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);

  const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };
  //stay
  const div = "   relative  ";
  const div_active =
    div + " cursor-pointer arial-narrow  textempmanages text-[17px] ";
  const div_deactive =
    div + "arial-narrow  textempmanage text-[17px] cursor-pointer";
  //end
  const SuccessModal = () => {
    return (
      <motion.div
        className="w-full h-full bg-black/50 items-center flex justify-center !top-0 !left-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        exit={{ opacity: 0 }}
      >
        <motion.div className=" bg-white h-[55vh] w-[42vw] items-center shadow-md shadow-gray-900  z-999">
          <div className="w-full h-full flex relative flex-col item-center  mb-5">
            <div className="relative prdc-color items-center justify-center flex w-full h-20">
              {/* Close Button ================================================================================================================================== close button */}
              <div className="flex w-full items-center justify-center">
                <img
                  src={
                    branding
                      ? API_URL + branding[0]?.Logo
                      : "/imgs/deafult_logo.jpg"
                  }
                  alt=""
                  className="h-15 object-contain w-25  rounded-sm"
                />

                <span className="arial-narrow-bold w-full text-left items-center justify-center text-white text-[5vh]">
                  {" "}
                  PAST CONTRACT
                </span>
              </div>
              {/* Close Button ================================================================================================================================== close button */}
              <AiOutlineCloseSquare
                onClick={() => setShowModal(false)}
                className="cursor-pointer text-white absolute top-2 right-3 h-10 text-[3vh]     text-[80%] flex items-center justify-center    border-0   active:scale-1 active:duration-75 transition-all hover:scale-150 ease-in-out transform  rounded-md  hover:rounded-md"
              />
            </div>

            <div className=" flex  flex-col  w-full  m-12 ">
              <div className=" items-center flex ">
                <span className="arial-narrow inline-block w-[8rem]  text-black text-[15px]">
                  End of Contract Date:
                </span>
                <input
                  type="date"
                  className="w-[16vw] border  text-[15px] border-black rounded"
                />
              </div>

              <div className="items-center mt-5 flex">
                <span className="inline-block w-[8rem] arial-narrow text-black text-[15px]">
                  Reason:
                </span>
                <select
                  className="w-[16vw] border  text-[15px] border-black rounded "
                  onChange={(e) =>
                    setEmployeeInfo({
                      ...employeeInfo,
                      Employee_Status: e.target.value,
                    })
                  }
                  value={employeeInfo.Employee_Status}
                >
                  <option>Absensce without leave</option>
                  <option>End of Contract</option>
                  <option>Resigned</option>
                  <option>Terminated</option>
                  <option>Pullout</option>
                  <option>Separated</option>
                  <option>Retired</option>
                  <option>Blacklisted</option>
                </select>
              </div>

              <div className=" w-full mt-5 flex items-end justify-end">
                <button
                  onClick={click_save}
                  className="prdc-border absolute bottom-5 right-5 text-white initial-pag-border arial-narrow-bold self-end active:scale-1  rounded-sm text-[14px] h-7 w-20  hover:(border-black rounded-sm) active:duration-75 transition-all hover:(scale-108 ease-in-out  transform py-1 rounded-sm) group  mb-2 flex items-center justify-center text-black    disabled:(bg-gray-500 border-gray-500 cursor-not-allowed)  focus:(outline-none) dark:(bg-transparent border-black border-[0.5px] hover:(arial-narrow-bold)"
                >
                  SAVE
                  {/* <AiOutlineArrowRight className="ml-2 text-initial group-hover:(text-[17px])" /> */}
                </button>
              </div>
            </div>

            {/* save button ================================================================ */}
            <div className="absolute bottom-7 right-2">
              <ToastContainer />
            </div>
            {/* save button ================================================================ */}
            <div className="flex prdc-color w-full h-5 absolute bottom-0"></div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="fixed h-screen w-screen bg-gray-100 flex items-center justify-center">
      <motion.div
        className="absolute pt-15 max-w-[2000px] w-full max-h-[1200px] h-full flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        exit={{ opacity: 0 }}
      >
        <div className="flex w-full h-full">
          <div className=" bg-gray-100 justify-center  flex flex-[0.2] p-3">
            <div className="relative backg-color-prdc relative w-full rounded-sm shadow-sm shadow-gray-600 flex flex-col items-center ">
              <hr className="h-1 w-full prdc-border absolute top-0 left-0" />
              <hr className="h-1 absolute w-full prdc-border bottom-0 left-0" />
              <AiOutlineCloseSquare
                onClick={() => setViewDetails(false)}
                className="cursor-pointer backbutton-text absolute top-2 right-3 h-10 text-[3vh]     text-[80%] flex items-center justify-center    border-0   active:scale-1 active:duration-75 transition-all hover:scale-150 ease-in-out transform  rounded-md  hover:rounded-md"
              />
              <div className="w-full flex items-center justify-center">
                <div
                  className="rounded-full relative cursor-pointer items-center flex justify-center flex-col  bg-black mt-5 w-37 h-37"
                  {...getRootProps()}
                  id="file"
                >
                  <img
                    src={
                      profile
                        ? profile.preview
                        : API_URL + employeeInfo.Employee_Picture
                    }
                    className="w-37  h-37 rounded-full"
                    alt=""
                  />{" "}
                  {personalInfo.Employee_Picture ? (
                    <div className="flex items-center"></div>
                  ) : isDragReject ? (
                    <p>IMAGE ONLY!</p>
                  ) : (
                    <></>
                  )}
                </div>
                <input type="file" accept="image/" {...getInputProps()} />
              </div>
              <span className="arial-narrow-bold capitalize mt-2 text-black text-[20px]">
                {personalInfo.Employee_FirstName +
                  " " +
                  personalInfo.Employee_MiddleName.charAt(0).toUpperCase() +
                  `${personalInfo.Employee_MiddleName == "" ? " " : ". "}` +
                  personalInfo.Employee_LastName +
                  " " +
                  personalInfo.Employee_Suffix}
              </span>
              <span className="arial-narrow-bold text-[18px] mt-2 text-gray-500">
                {personalInfo.Employee_JobDesc}
              </span>
              <span className="arial-narrow-bold text-[14px]  text-gray-500">
                {employeeInfo.Employee_Department == "HR"
                  ? "Human Resources"
                  : employeeInfo.Employee_Department == "SALES"
                  ? "Sales"
                  : employeeInfo.Employee_Department == "OPS"
                  ? "Operations"
                  : employeeInfo.Employee_Department == "AMAD"
                  ? "Asset Management"
                  : employeeInfo.Employee_Department == "ACC"
                  ? "Accounting and Finance"
                  : employeeInfo.Employee_Department == "TA"
                  ? "Talent Acquisition"
                  : employeeInfo.Employee_Department == "BSD"
                  ? "Business Support"
                  : employeeInfo.Employee_Department == "TSD"
                  ? "Technical Support"
                  : ""}
              </span>
              <hr className="h-0.8 mt-2 w-[90%] bg-gray-500  " />
              <div className="w-full   flex items-center text-gray-500 mt-1 px-4 justify-center <md:(w-full items-center text-black mt-2 px-4 justify-between)">
                <span className=" arial-narrow-bold text-[14px] backg-color-prdc border-black text-gray-500  <md:(ml-0 w-40  h-6 text-[14px])">
                  {employeeInfo.Employee_Status}
                </span>
              </div>
              <div className="items-center ml-8 mt-10 justify-start flex  w-full ">
                <div className="border mr-2 rounded-full p-1 h-6 w-6 border-black items-center justify-center flex ">
                  <GrNotes className="text-black h-6 w-6" />
                </div>
                <p className="arial-narrow-bold text-[14px] text-black">
                  {employeeInfo.Employee_TypeContract}
                </p>
              </div>
              <div className="items-center ml-8 mt-2 justify-start flex  w-full ">
                <div className="border mr-2 rounded-full p-1 h-6 w-6 border-black items-center justify-center flex ">
                  <AiOutlineMail className="text-black h-6 w-6" />
                </div>
                <p className="arial-narrow-bold text-[14px] text-black">
                  {personalInfo.Employee_email}
                </p>
              </div>
              <div className="items-center ml-8 mt-2 justify-start flex  w-full ">
                <div className="border mr-2 rounded-full p-1 h-6 w-6 border-black items-center justify-center flex ">
                  <BsTelephone className="text-black h-6 w-6" />
                </div>
                <p className="arial-narrow-bold text-[14px] text-black">
                  {personalInfo.Employee_ContactNum}
                </p>
              </div>
              <div className="items-center ml-8 mt-2 justify-start flex  w-full ">
                <div className="border mr-2 rounded-full p-1 h-6 w-6 border-black items-center justify-center flex ">
                  <BiCake className="text-black h-6 w-6" />
                </div>
                <p className="arial-narrow-bold text-[14px] text-black">
                  {moment(personalInfo.Employee_BirthDate).format(
                    "MMMM DD, YYYY"
                  )}
                </p>
              </div>

              <div className="w-full items-center flex flex-col justify-center mt-auto mb-10">
                <div className="px-5 text-[13px]  w-full items-start flex flex-col">
                  {personalInfo.Employee_TypeContract == "Probationary" && (
                    <>
                      <span className="arial-narrow w-full mt-5  emptext-color">
                        Date Hired:
                        {moment(personalInfo?.createdAt).format(
                          " MMMM DD, YYYY"
                        )}
                      </span>
                      <span className="arial-narrow w-full mt-2 emptext-color">
                        Contract Duration:
                        {moment(personalInfo?.createdAt)
                          .add(6, "months")
                          .format(" MMMM DD, YYYY")}
                      </span>
                    </>
                  )}
                </div>
                {employeeInfo.Employee_Status == "Employed" && (
                  <button
                    onClick={() => setShowModal(true)}
                    className="w-26 h-7 absolute bottom-2  back-button text-white  shadow-sm text-[80%] flex items-center justify-center  shadow-red-800 hover:border-red-500 border-0  disabled:(bg-gray-400 shadow-gray-800 cursor-not-allowed hover:bg-gray-500 hover:rounded-md) active:scale-1 active:duration-75 transition-all hover:scale-108 ease-in-out transform  rounded-md hover:bg-red-500 hover:rounded-md"
                  >
                    END CONTRACT
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className=" bg-gray-100 flex p-3 flex-[0.8] flex-col">
            <div className="px-3 pb-2  w-full relative shadow-sm shadow-gray-600 rounded-sm h-15 backg-color-prdc items-end justify-between flex">
              <hr className="h-1 !top-0 !left-0  w-full absolute prdc-border self-start" />
              <span
                onClick={() => toggleTab(1)}
                className={toggleState === 1 ? div_active : div_deactive}
              >
                Placement
              </span>
              <span
                onClick={() => toggleTab(2)}
                className={toggleState === 2 ? div_active : div_deactive}
              >
                Accountabilities
              </span>
              <span
                onClick={() => toggleTab(3)}
                className={toggleState === 3 ? div_active : div_deactive}
              >
                Basic Information
              </span>
              <span
                onClick={() => toggleTab(4)}
                className={toggleState === 4 ? div_active : div_deactive}
              >
                Government IDs
              </span>
              <span
                onClick={() => toggleTab(5)}
                className={toggleState === 5 ? div_active : div_deactive}
              >
                Family Background
              </span>
              <span
                onClick={() => toggleTab(6)}
                className={toggleState === 6 ? div_active : div_deactive}
              >
                Educational Background
              </span>
              <span
                onClick={() => toggleTab(7)}
                className={toggleState === 7 ? div_active : div_deactive}
              >
                Work Experience
              </span>
              <span
                // onClick={() => toggleTab(7)}
                className={toggleState === 8 ? div_active : div_deactive}
              >
                Employee History
              </span>
            </div>
            <div className="w-full relative h-full mt-5  rounded-sm shadow-sm shadow-gray-600  backg-color-prdc flex">
              {toggleState == 1 ? (
                <HRPlacement
                  setToggleState={setToggleState}
                  setEmployeeInfo={setEmployeeInfo}
                  employeeInfo={employeeInfo}
                  profile={profile}
                  setProfile={setProfile}
                  setCloseCondition={setCloseCondition}
                  setUnsaved={setUnsaved}
                  click_save={click_save}
                />
              ) : toggleState == 2 ? (
                <HRAccountabilities
                  setToggleState={setToggleState}
                  setEmployeeInfo={setEmployeeInfo}
                  employeeInfo={employeeInfo}
                  profile={profile}
                  setProfile={setProfile}
                  click_save={click_save}
                />
              ) : toggleState == 3 ? (
                <HRBasicInformation
                  setToggleState={setToggleState}
                  setEmployeeInfo={setEmployeeInfo}
                  employeeInfo={employeeInfo}
                  profile={profile}
                  setProfile={setProfile}
                  click_save={click_save}
                />
              ) : toggleState == 4 ? (
                <HRGovIDs
                  setToggleState={setToggleState}
                  setEmployeeInfo={setEmployeeInfo}
                  employeeInfo={employeeInfo}
                  profile={profile}
                  setProfile={setProfile}
                  click_save={click_save}
                />
              ) : toggleState == 5 ? (
                <HRFamBackground
                  setToggleState={setToggleState}
                  setEmployeeInfo={setEmployeeInfo}
                  employeeInfo={employeeInfo}
                  profile={profile}
                  setProfile={setProfile}
                  click_save={click_save}
                />
              ) : toggleState == 6 ? (
                <HREdBackground
                  setToggleState={setToggleState}
                  setEmployeeInfo={setEmployeeInfo}
                  employeeInfo={employeeInfo}
                  profile={profile}
                  setProfile={setProfile}
                  click_save={click_save}
                />
              ) : toggleState == 7 ? (
                <HRWorkExp
                  setToggleState={setToggleState}
                  setEmployeeInfo={setEmployeeInfo}
                  employeeInfo={employeeInfo}
                  profile={profile}
                  setProfile={setProfile}
                  click_save={click_save}
                />
              ) : (
                ""
              )}

              <hr className="h-1 absolute w-full prdc-border bottom-0 left-0" />
            </div>
          </div>
        </div>
      </motion.div>
      {closeModal && (
        <Remodal
          Icon={
            <BsFillExclamationDiamondFill className="text-yellow-400  mt-7 w-20 mb-3 h-20" />
          }
          children={"Unsaved Changes"}
          custom_color={"bg-yellow-400"}
          custom_text={"text-yellow-400"}
          border_color={"border-yellow-400"}
          click_save={click_save}
          disregard={() => setViewDetails(false)}
        />
      )}
      <AnimatePresence>{showModal && <SuccessModal />}</AnimatePresence>
    </div>
  );
};

export default HrActivePersonalInfo;
