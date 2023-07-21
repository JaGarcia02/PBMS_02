import { motion, MotionConfig } from "framer-motion";
import React, { useState } from "react";
import { AiFillCloseCircle, AiOutlineCloseSquare } from "react-icons/ai";
import { BiSave } from "react-icons/bi";
import HrApplicantResume from "../HrApplicantResume";
import setRequirements from "../HrApplicantResume";
import axios from "axios";
import { API_URL_HR, API_URL } from "../../../utils/Url";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { Logs } from "../../../utils/Logs";
import { useEdit, useAdd } from "../../../Hooks/useAuthorized";
import {
  BsPersonFillDash,
  BsPersonFillLock,
  BsArrowLeftShort,
} from "react-icons/bs";
const HrRequirementsForm = ({
  setRequirements,
  reqObjs,
  setReqObjs,
  ID,
  applicantInfo,
}) => {
  const { branding } = useSelector((state) => state.branding);
  // disable button =======================================================================================
  const [saveDisable, setSaveDisable] = useState(false);

  // console.log(reqObjs.applicant_NBI);
  // console.log(reqObjs.applicant_Medical);
  const updateRequirements = () => {
    setSaveDisable(true);
    if (reqObjs.applicant_NBI == null && reqObjs.applicant_Medical == null) {
      alert("PBMS Warning!\nApplicant Has No Mandatory Requirements!");
    } else {
      axios
        .put(API_URL_HR + "update-requirements", {
          applicant_NBI: reqObjs.applicant_NBI,
          applicant_Medical: reqObjs.applicant_Medical,
          applicant_SSS: reqObjs.applicant_SSS,
          applicant_TOR: reqObjs.applicant_TOR,
          applicant_Diploma: reqObjs.applicant_Diploma,
          applicant_BirthCert: reqObjs.applicant_BirthCert,
          applicant_PhilHealth: reqObjs.applicant_PhilHealth,
          applicant_PagIbig: reqObjs.applicant_PagIbig,
          applicant_TIN: reqObjs.applicant_TIN,
          applicant_BarangayClearance: reqObjs.applicant_BarangayClearance,
          applicant_MarriageCertificate: reqObjs.applicant_MarriageCert,
          applicant_PoliceClearance: reqObjs.applicant_PoliceClearance,
          applicant_Pictures: reqObjs.applicant_Pictures,
          applicant_BirthcertDependent: reqObjs.applicant_BirthcertDependent,
          applicant_COE: reqObjs.applicant_COE,
          applicant_DriversLicense: reqObjs.applicant_DriversLicense,
          applicant_NC2Certificate: reqObjs.applicant_NC2Certificate,
          applicant_SOA: reqObjs.applicant_SOA,
          applicant_Trainings: reqObjs.applicant_Trainings,
          applicant_HMA: reqObjs.applicant_HMA,
          applicant_onebyone: reqObjs.applicant_onebyone,
          applicant_twobytwo: reqObjs.applicant_twobytwo,
          ID: ID,
        })
        .then((res) => {
          setReqObjs({
            applicant_TOR: res.data.applicant_TOR,
            applicant_SSS: res.data.applicant_SSS,
            applicant_Diploma: res.data.applicant_Diploma,
            applicant_BirthCert: res.data.applicant_BirthCert,
            applicant_NBI: res.data.applicant_NBI,
            applicant_PhilHealth: res.data.applicant_PhilHealth,
            applicant_PagIbig: res.data.applicant_PagIbig,
            applicant_TIN: res.data.applicant_TIN,
            applicant_Medical: res.data.applicant_MedicalResult,
            applicant_BarangayClearance: res.data.applicant_BarangayClearance,
            applicant_MarriageCert: res.data.applicant_MarriageCertificate,
            applicant_PoliceClearance: res.data.applicant_PoliceClearance,
            applicant_Pictures: res.data.applicant_Pictures,

            applicant_BirthcertDependent: res.data.applicant_BirthcertDependent,
            applicant_COE: res.data.applicant_COE,
            applicant_DriversLicense: res.data.applicant_DriversLicense,
            applicant_NC2Certificate: res.data.applicant_NC2Certificate,
            applicant_SOA: res.data.applicant_SOA,
            applicant_Vaccine: res.data.applicant_Vaccine,
            applicant_Trainings: res.data.applicant_Trainings,
            applicant_HMA: res.data.applicant_HMA,
            applicant_onebyone: res.data.applicant_onebyone,
            applicant_twobytwo: res.data.applicant_twobytwo,
          });
          notify_RequirementsPassed();
          // disable button ============================================================================
          setRequirements(false);
        })
        .catch((err) => console.log(err));

      // Notify Email already exist
      const notify_RequirementsPassed = () => {
        toast.info("Requirements Updated!", {
          position: "bottom-right",
          hideProgressBar: true,
          pauseOnHover: false,
          theme: "colored",
          autoClose: 4000,
        });
      };
    }
    // Logs(
    //   "UPDATE",
    //   `Applicant Requirements Updated.  Applicant: (${applicantInfo.firstname} ${applicantInfo.lastname})`
    // );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      exit={{ opacity: 0 }}
      className="fixed h-full w-full z-20 top-0 left-0 bg-black bg-opacity-50 flex items-center justify-center z-60"
    >
      <motion.div className="absolute bg-white h-125 w-200 items-center shadow-md shadow-gray-900  z-999">
        <div className="w-full h-full">
          <ToastContainer />
          <div className="flex prdc-color w-full h-22 ">
            <div className="mt-2 ml-2">
              <img
                src={
                  branding
                    ? API_URL + branding[0]?.Logo
                    : "/imgs/deafult_logo.jpg"
                }
                alt=""
                className="h-18 w-25 rounded-sm object-contain"
              />
            </div>
            <div className="block mt-5 ml-2">
              <span className="flex text-white text-[25px] arial-narrow-bold">
                PRE-HIRING
              </span>
              <span className="text-white arial-narrow-bold text-[15px]">
                MANDATORY REQUIREMENTS
              </span>
            </div>
          </div>

          <button
            onClick={() => setRequirements(false)}
            className="w-8 h-8 absolute top-1 right-1 focus:outline-none text-[30px] cursor-pointer flex items-center justify-center mr-1 text-red-400 border-none active:scale-1 active:duration-75 transition-all ease-in-out hover:text-red-500 rounded-sm hover:rounded-sm"
          >
            <AiOutlineCloseSquare />
          </button>
          <table className="flex items-start justify-evenly mt-5">
            <div className="">
              <tr className="block">
                <td className="flex items-center">
                  <input type="checkbox" className="h-6 w-6" />
                  <span className="pl-1 arial-narrow text-[16px]">
                    Updated Resume
                  </span>
                </td>
                <td className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-6 w-6"
                    name="applicant_Diploma"
                    checked={reqObjs.applicant_Diploma == "1" ? true : false}
                    onChange={(e) =>
                      setReqObjs({
                        ...reqObjs,
                        [e.target.name]: e.target.checked ? "1" : null,
                      })
                    }
                  />
                  <span className="pl-1 arial-narrow text-[16px]">Diploma</span>
                </td>
                <td className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-6 w-6"
                    name="applicant_TOR"
                    checked={reqObjs.applicant_TOR == "1" ? true : false}
                    onChange={(e) =>
                      setReqObjs({
                        ...reqObjs,
                        [e.target.name]: e.target.checked ? "1" : null,
                      })
                    }
                  />
                  <span className="pl-1 arial-narrow text-[16px]">
                    Transcript of Records (TOR)
                  </span>
                </td>
                <td className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-6 w-6"
                    name="applicant_BirthCert"
                    checked={reqObjs.applicant_BirthCert == "1" ? true : false}
                    onChange={(e) =>
                      setReqObjs({
                        ...reqObjs,
                        [e.target.name]: e.target.checked ? "1" : null,
                      })
                    }
                  />
                  <span className="pl-1 arial-narrow text-[16px]">
                    Birth Certificate
                  </span>
                </td>
                <td className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-6 h-6"
                    name="applicant_BirthcertDependent"
                    checked={
                      reqObjs.applicant_BirthcertDependent == "1" ? true : false
                    }
                    onChange={(e) =>
                      setReqObjs({
                        ...reqObjs,
                        [e.target.name]: e.target.checked ? "1" : null,
                      })
                    }
                  />
                  <span className="pl-1 arial-narrow text-[16px]">
                    Birth Certificate of Dependents (if applicable)
                  </span>
                </td>
                <td className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-6 w-6"
                    name="applicant_PoliceClearance"
                    checked={
                      reqObjs.applicant_PoliceClearance == "1" ? true : false
                    }
                    onChange={(e) =>
                      setReqObjs({
                        ...reqObjs,
                        [e.target.name]: e.target.checked ? "1" : null,
                      })
                    }
                  />
                  <span className="pl-1 arial-narrow text-[16px]">
                    Police Clearance
                  </span>
                </td>
                <td className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-6 w-6"
                    name="applicant_BarangayClearance"
                    checked={
                      reqObjs.applicant_BarangayClearance == "1" ? true : false
                    }
                    onChange={(e) =>
                      setReqObjs({
                        ...reqObjs,
                        [e.target.name]: e.target.checked ? "1" : null,
                      })
                    }
                  />
                  <span className="pl-1 arial-narrow text-[16px]">
                    Barangay Clearance
                  </span>
                </td>
                <td className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-6 h-6"
                    name="applicant_NBI"
                    checked={reqObjs.applicant_NBI == "1" ? true : false}
                    onChange={(e) =>
                      setReqObjs({
                        ...reqObjs,
                        [e.target.name]: e.target.checked ? "1" : null,
                      })
                    }
                  />
                  <span className="pl-1 arial-narrow text-[16px] flex">
                    NBI Clearance<p className="text-red-500 ml-1">*</p>
                  </span>
                </td>

                <td className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-6 h-6"
                    name="applicant_COE"
                    checked={reqObjs.applicant_COE == "1" ? true : false}
                    onChange={(e) =>
                      setReqObjs({
                        ...reqObjs,
                        [e.target.name]: e.target.checked ? "1" : null,
                      })
                    }
                  />
                  <span className="pl-1 arial-narrow text-[16px]">
                    Certificate of Employment (from previous employer)
                  </span>
                </td>

                <td className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-6 h-6"
                    name="applicant_DriversLicense"
                    checked={
                      reqObjs.applicant_DriversLicense == "1" ? true : false
                    }
                    onChange={(e) =>
                      setReqObjs({
                        ...reqObjs,
                        [e.target.name]: e.target.checked ? "1" : null,
                      })
                    }
                  />
                  <span className="pl-1 arial-narrow text-[16px]">
                    Driver's License (if applicable)
                  </span>
                </td>

                <td className="flex items-center">
                  <input
                    type="checkbox"
                    name="applicant_MarriageCert"
                    className="h-6 w-6"
                    checked={
                      reqObjs.applicant_MarriageCert == "1" ? true : false
                    }
                    onChange={(e) =>
                      setReqObjs({
                        ...reqObjs,
                        [e.target.name]: e.target.checked ? "1" : null,
                      })
                    }
                  />
                  <span className="pl-1 arial-narrow text-[16px]">
                    Marriage Certificate (if applicable)
                  </span>
                </td>

                <td className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-6 h-6"
                    name="applicant_Medical"
                    checked={reqObjs.applicant_Medical == "1" ? true : false}
                    onChange={(e) =>
                      setReqObjs({
                        ...reqObjs,
                        [e.target.name]: e.target.checked ? "1" : null,
                      })
                    }
                  />
                  <span className="pl-1 arial-narrow text-[16px] flex">
                    Medical Exam Result<p className="text-red-500 ml-1">*</p>
                  </span>
                </td>
              </tr>
            </div>

            <div className="">
              <tr className="">
                <td className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-6 h-6"
                    name="applicant_NC2Certificate"
                    checked={
                      reqObjs.applicant_NC2Certificate == "1" ? true : false
                    }
                    onChange={(e) =>
                      setReqObjs({
                        ...reqObjs,
                        [e.target.name]: e.target.checked ? "1" : null,
                      })
                    }
                  />
                  <span className="pl-1 arial-narrow text-[16px]">
                    NC II / NC III Certification (if applicable)
                  </span>
                </td>
                <td className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-6 h-6"
                    name="applicant_SOA"
                    checked={reqObjs.applicant_SOA == "1" ? true : false}
                    onChange={(e) =>
                      setReqObjs({
                        ...reqObjs,
                        [e.target.name]: e.target.checked ? "1" : null,
                      })
                    }
                  />
                  <span className="pl-1 arial-narrow text-[16px]">
                    Statement of Account - SOA (with existing SSS/Pag-IBIG
                    Loans)
                  </span>
                </td>
                <td className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-6 h-6"
                    name="applicant_Trainings"
                    checked={reqObjs.applicant_Trainings == "1" ? true : false}
                    onChange={(e) =>
                      setReqObjs({
                        ...reqObjs,
                        [e.target.name]: e.target.checked ? "1" : null,
                      })
                    }
                  />
                  <span className="pl-1 arial-narrow text-[16px]">
                    Trainings / Certificates (if applicable)
                  </span>
                </td>
                <td className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-6 h-6"
                    name="applicant_Vaccine"
                    checked={reqObjs.applicant_Vaccine == "1" ? true : false}
                    onChange={(e) =>
                      setReqObjs({
                        ...reqObjs,
                        [e.target.name]: e.target.checked ? "1" : null,
                      })
                    }
                  />
                  <span className="pl-1 arial-narrow text-[16px]">
                    Vaccination / Booster Card
                  </span>
                </td>
                <td className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-6 h-6"
                    name="applicant_SSS"
                    checked={reqObjs.applicant_SSS == "1" ? true : false}
                    onChange={(e) =>
                      setReqObjs({
                        ...reqObjs,
                        [e.target.name]: e.target.checked ? "1" : null,
                      })
                    }
                  />
                  <span className="pl-1 arial-narrow text-[16px]">
                    SSS ID / E-1 / E-4 Form
                  </span>
                </td>

                <td className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-6 w-6"
                    name="applicant_PhilHealth"
                    checked={reqObjs.applicant_PhilHealth == "1" ? true : false}
                    onChange={(e) =>
                      setReqObjs({
                        ...reqObjs,
                        [e.target.name]: e.target.checked ? "1" : null,
                      })
                    }
                  />
                  <span className="pl-1 arial-narrow text-[16px]">
                    PhilHealth ID / MDR Form
                  </span>
                </td>

                <td className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-6 w-6"
                    name="applicant_PagIbig"
                    checked={reqObjs.applicant_PagIbig == "1" ? true : false}
                    onChange={(e) =>
                      setReqObjs({
                        ...reqObjs,
                        [e.target.name]: e.target.checked ? "1" : null,
                      })
                    }
                  />
                  <span className="pl-1 arial-narrow text-[16px]">
                    Pag-IBIG ID / MDF Form
                  </span>
                </td>

                <td className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-6 w-6"
                    name="applicant_TIN"
                    checked={reqObjs.applicant_TIN == "1" ? true : false}
                    onChange={(e) =>
                      setReqObjs({
                        ...reqObjs,
                        [e.target.name]: e.target.checked ? "1" : null,
                      })
                    }
                  />
                  <span className="pl-1 arial-narrow text-[16px]">
                    TIN ID / 1902 Form / 2316
                  </span>
                </td>
                <td className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-6 h-6"
                    name="applicant_HMA"
                    checked={reqObjs.applicant_HMA == "1" ? true : false}
                    onChange={(e) =>
                      setReqObjs({
                        ...reqObjs,
                        [e.target.name]: e.target.checked ? "1" : null,
                      })
                    }
                  />
                  <span className="pl-1 arial-narrow text-[16px]">
                    Contract
                  </span>
                </td>
                <td className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-6 h-6"
                    name="applicant_HMA"
                    checked={reqObjs.applicant_HMA == "1" ? true : false}
                    onChange={(e) =>
                      setReqObjs({
                        ...reqObjs,
                        [e.target.name]: e.target.checked ? "1" : null,
                      })
                    }
                  />
                  <span className="pl-1 arial-narrow text-[16px]">
                    Hello Money Account / MBTC
                  </span>
                </td>

                <td className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-6 h-6"
                    name="applicant_onebyone"
                    checked={reqObjs.applicant_onebyone == "1" ? true : false}
                    onChange={(e) =>
                      setReqObjs({
                        ...reqObjs,
                        [e.target.name]: e.target.checked ? "1" : null,
                      })
                    }
                  />
                  <span className="pl-1 arial-narrow text-[16px]">
                    1x1 Colored Picture (2pcs, formal, white background)
                  </span>
                </td>
                <td className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-6 h-6"
                    name="applicant_twobytwo"
                    checked={reqObjs.applicant_twobytwo == "1" ? true : false}
                    onChange={(e) =>
                      setReqObjs({
                        ...reqObjs,
                        [e.target.name]: e.target.checked ? "1" : null,
                      })
                    }
                  />
                  <span className="pl-1 arial-narrow text-[16px]">
                    2x2 Colored Picture (2pcs, formal, white background)
                  </span>
                </td>
              </tr>
            </div>
          </table>
          <div className="w-full mt-6 relative flex items-center justify-end ">
            <button
              className="flex items-center mr-1 arial-narrow-bold justify-center text-[15px] rounded-sm w-22 h-8 shadow-sm border-[2.5px] prdc-text border-yellow-500 active:scale-1 active:duration-75 transition-all ease-in-out transition py-1 hover:border-[3px] hover:border-yellow-500  hover:bg-yellow-500 hover:text-white disabled:(cursor-not-allowed)"
              type="submit"
              onClick={updateRequirements}
              disabled={useEdit() ? false : true}
            >
              <BiSave className="mr-2" />
              Save
            </button>
          </div>
        </div>
        <div className="flex prdc-color w-full h-5 absolute bottom-0"></div>
      </motion.div>
    </motion.div>
  );
};

export default HrRequirementsForm;
