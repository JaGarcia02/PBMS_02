import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";
import { useSelector } from "react-redux";
import jwt from "jwt-decode";
import moment from "moment";
import { AiFillCloseCircle } from "react-icons/ai";
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
        className="h-80 w-100 bg-gray-100 relative items-center justify-center shadow-md rounded-sm"
      >
        <AiFillCloseCircle
          className="absolute right-1 top-1 text-[25px] text-red-600 cursor-pointer"
          onClick={() => setShowConfirmation(false)}
        />
        <div className="w-full h-full flex flex-col p-3">
          <span className="mt-4 text-center arial-narrow-bold text-black text-[20px]">
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
          </div>
          {success ? (
            <span className=" rounded-sm w-[50%] self-center arial-narrow flex items-center justify-center mt-9 text-black">
              FORM HAS BEEN CREATED !
            </span>
          ) : (
            <button
              onClick={() => generateDocument(API_URL + passingData.FormUrl)}
              disabled={success || loading}
              className="border border-black rounded-sm w-[50%] self-center arial-narrow flex items-center justify-center mt-9 hover:(border border-black)"
            >
              {loading ? (
                <Lottie animationData={SpinnerJson} loop={true} />
              ) : (
                <>
                  <MdCheckCircleOutline className="mr-1 text-[18px]  cursor-pointer text-black hover:(text-black ) <md:(text-[50px])" />{" "}
                  Confirm
                </>
              )}
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FormConfirmation;
