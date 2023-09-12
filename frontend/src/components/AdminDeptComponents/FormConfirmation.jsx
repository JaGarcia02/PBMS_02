import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";
import { useSelector } from "react-redux";
import jwt from "jwt-decode";
import moment from "moment";
import { AiFillCloseCircle, AiOutlineCloseSquare } from "react-icons/ai";
import uniqid from "uniqid";
import { MdCheckCircleOutline } from "react-icons/md";
import axios from "axios";
import {
  API_URL,
  API_URL_ADMIN,
  API_URL_FORMS,
  API_URL_HR,
} from "../../utils/Url";
import Lottie from "lottie-react";
import SpinnerJson from "../../lottieFiles/spinner.json";
import { Logs } from "../../utils/Logs";

const FormConfirmation = ({ passingData, setShowConfirmation }) => {
  const { branding } = useSelector((state) => state.branding);
  const { user } = useSelector((state) => state.user);
  const decoded = user ? jwt(user) : "";
  function loadFile(url, callback) {
    PizZipUtils.getBinaryContent(url, callback);
  }
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [officers, setOfficers] = useState([]);
  const [Managers, setManagers] = useState([]);

  //GET THE OFFICERS
  useEffect(() => {
    axios
      .get(API_URL_ADMIN + "getOfficers")
      .then((res) => setOfficers(res.data))
      .catch((err) => console.log(err));
  }, []);

  //UNIQUE ID GENERATION
  const UniqID2 =
    decoded.dept +
    "-" +
    moment().format("YYSS") +
    "-" +
    uniqid().toString().toUpperCase();

  const generateDocument = (url) => {
    setLoading(true);
    axios
      .post(API_URL_FORMS + "add-request", {
        requestor: decoded.name,
        refNum: UniqID2,
        dateofRequest: moment(),
        formType: passingData.FormName,
        form_department: decoded.dept,
      })
      .then((res) => {
        Logs("ADD", `Request a form ${UniqID2}`);
        loadFile(url, function (error, content) {
          if (error) {
            throw error;
          }
          var zip = new PizZip(content);
          var doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
          });
          doc.setData(
            officers.reduce(
              (data, item) => ({
                ...data,
                [item.Position]: item.Name,
                ID: UniqID2,
                Requestor: decoded.name,
              }),
              {}
            )
          );
          try {
            // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
            doc.render();
          } catch (error) {
            // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
            function replaceErrors(key, value) {
              if (value instanceof Error) {
                return Object.getOwnPropertyNames(value).reduce(function (
                  error,
                  key
                ) {
                  error[key] = value[key];
                  return error;
                },
                {});
              }
              return value;
            }
            console.log(JSON.stringify({ error: error }, replaceErrors));

            if (error.properties && error.properties.errors instanceof Array) {
              const errorMessages = error.properties.errors
                .map(function (error) {
                  return error.properties.explanation;
                })
                .join("\n");
              console.log("errorMessages", errorMessages);
              // errorMessages is a humanly readable message looking like this :
              // 'The tag beginning with "foobar" is unopened'
            }
            throw error;
          }
          var out = doc.getZip().generate({
            type: "blob",
            mimeType:
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          }); //Output the document using Data-URI
          saveAs(out, UniqID2 + ".docx");
        });
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <motion.div className="w-screen h-screen fixed !top-0 !left-0 flex z-999 bg-black/70 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        exit={{ opacity: 0 }}
        className="h-95 w-120 bg-gray-100 relative items-center justify-center shadow-md rounded-sm"
      >
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
              <span className="my-1 font-Roboto text-[22px] text-white arial-narrow-bold w-full text-center flex">
                FORM REQUEST
              </span>
              <span className="my-3 font-Roboto text-[22px] text-white arial-narrow-bold w-full text-center">
                CONFIRMATION
              </span>
            </div>

            <AiOutlineCloseSquare
              onClick={() => setShowConfirmation(false)}
              className="w-8 h-8 absolute top-1 right-1 cursor-pointer flex items-center justify-center mr-1 text-red-400 border-none active:scale-1 active:duration-75 transition-all ease-in-out hover:text-red-500 rounded-sm hover:rounded-sm"
            />
          </div>
        </div>

        <div className="w-full h-full flex flex-col p-3 mt-[10px]">
          <div className="flex justify-between items-center w-[100%] px-10">
            <span className="arial-narrow-bold text-[18px]">Reference #</span>
            <span className="arial-narrow text-[16px] border-[1px] border-black w-50 h-6 flex justify-center items-center">
              {UniqID2}
            </span>
          </div>
          <div className="flex justify-between items-center w-[100%] px-10 mt-5">
            <span className="arial-narrow-bold text-[18px]">Type of Form:</span>
            <span className="arial-narrow text-[16px] border-[1px] border-black w-50 h-6 flex justify-center items-center">
              {passingData.FormName}
            </span>
          </div>
          <div className="flex justify-between items-center w-[100%] px-10 mt-5">
            <span className="arial-narrow-bold text-[18px]">Requestor:</span>
            <span className="arial-narrow text-[16px] border-[1px] border-black w-50 h-6 flex justify-center items-center">
              {decoded.name}
            </span>
          </div>
          <div className="flex justify-between items-center w-[100%] px-10 mt-5">
            <span className="arial-narrow-bold text-[18px]">Request Date:</span>
            <span className="arial-narrow text-[16px] border-[1px] border-black w-50 h-6 flex justify-center items-center">
              {moment().format("MMMM DD, YYYY - hh:mm A")}
            </span>
          </div>
          {/* <span className="mt-4 text-center arial-narrow-bold text-black text-[20px]">
            Request Confirmation
          </span>
          <div className="flex w-full items-center text-black mt-6 px-4 justify-between">
            <span className="inline-block arial-narrow-bold w-[6rem] text-[14px]">
              Reference #:
            </span>
            <span className=" border w-40 border-black rounded-sm arial-narrow">
              {UniqID2}
            </span>
          </div>
          <div className="flex w-full items-center text-black mt-4 px-4 justify-between">
            <span className="inline-block arial-narrow-bold w-[6rem] text-[14px]">
              Type of Form:
            </span>
            <span className=" border w-40 border-black rounded-sm arial-narrow">
              {passingData.FormName}
            </span>
          </div>
          <div className="flex w-full items-center text-black mt-4 px-4 justify-between">
            <span className="inline-block arial-narrow-bold w-[6rem] text-[14px]">
              Requestor:
            </span>
            <span className=" border w-40 border-black rounded-sm arial-narrow">
              {decoded.name}
            </span>
          </div>
          <div className="flex w-full items-center text-black mt-4 px-4 justify-between">
            <span className="inline-block arial-narrow-bold w-[6rem] text-[14px]">
              Request Date:
            </span>
            <span className=" border w-40 border-black rounded-sm arial-narrow">
              {moment().format("MMMM DD, YYYY - hh:mm A")}
            </span>
          </div> */}
          {success ? (
            <span className=" rounded-sm w-[50%] self-center arial-narrow flex items-center justify-center mt-9 text-black">
              FORM HAS BEEN CREATED !
            </span>
          ) : (
            <button
              onClick={() => generateDocument(API_URL + passingData.FormUrl)}
              disabled={success || loading}
              className="border-[2px] border-black rounded-sm w-[40%] h-7 self-center arial-narrow-bold flex items-center justify-center mt-10 hover:(border-black text-green-600)"
            >
              {loading ? (
                <Lottie animationData={SpinnerJson} loop={true} />
              ) : (
                <>
                  <MdCheckCircleOutline className="mr-1 text-[18px] cursor-pointer" />
                  Confirm
                </>
              )}
            </button>
          )}
          <hr className="prdc-color w-full absolute h-4 bottom-0 left-0" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FormConfirmation;
