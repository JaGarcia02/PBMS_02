import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import DatePicker from "react-date-picker";
import { IoIosCloudUpload } from "react-icons/io";
import axios from "axios";
import { BsCheck2Circle } from "react-icons/bs";
import ReCAPTCHA from "react-google-recaptcha";
import { API_URL, API_URL_ADMIN, API_URL_HR } from "../utils/Url";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { BiSave } from "react-icons/bi";
import InitialPage from "../components/ApplicationFormModule/InitialPage";
import SecondaryPage from "../components/ApplicationFormModule/SecondaryPage";
import TertiaryPage from "../components/ApplicationFormModule/TertiaryPage";
import { useIdleTimer } from "react-idle-timer";
import moment from "moment";
const ApplicationForm = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [stateprovince, setStateProvince] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [fieldForms, setFieldForms] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    contactNum: "",
    gender: "",
    birthDate: "",
    address: "",
    region: "",
    province: "",
    city: "",
    barangay: "",
    position: "",
    aboutUs: "",
    coverletter: "",
    Suffix: "",
    resume: null,
    picture: null,
  });
  const [toggleState, setToggleState] = useState(1);
  const [time, setTime] = useState(null);
  const { branding } = useSelector((state) => state.branding);
  console.log(fieldForms);
  // AVAILABLE POSITION
  // Capitalize given name ============================================================================================================================
  // const formatFirstName = function (givenName) {
  //   let split_given_name = givenName.split(" ");
  //   for (let i = 0; i < split_given_name.length; i++) {
  //     split_given_name[i] =
  //       split_given_name[i][0].toUpperCase() + split_given_name[i].substring(1);
  //   }
  //   return split_given_name.join(" ");
  // };

  const handleChange = (e) => {
    setFieldForms((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const {
    firstname,
    middlename,
    lastname,
    email,
    contactNum,
    gender,
    birthDate,
    address,
    region,
    province,
    city,
    barangay,
    position,
    aboutUs,
    coverletter,
    resume,
    picture,
    Suffix,
  } = fieldForms;

  const applicantSubmit = (e) => {
    const dateNow = new Date();
    const addSixMonth = new Date(dateNow.setMonth(dateNow.getMonth() + 6));
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("firstname", firstname);
    formdata.append("middlename", middlename);
    formdata.append("lastname", lastname);
    formdata.append("email", email);
    formdata.append("contactNum", contactNum);
    formdata.append("Gender", gender);
    formdata.append("birthDate", birthDate);
    formdata.append("address", address);
    formdata.append("region", region);
    formdata.append("province", province);
    formdata.append("city", city);
    formdata.append("barangay", barangay);
    formdata.append("position", position);
    formdata.append("aboutUs", aboutUs);
    formdata.append("coverletter", coverletter);
    formdata.append("picture", picture);
    formdata.append("resume", resume);
    formdata.append("Suffix", Suffix);
    formdata.append("expiry_date", addSixMonth);

    axios
      .post(API_URL_HR + "applicant-form", formdata)
      .then((res) => {
        setShowModal(true);
        // setTimeout(() => {
        //   setShowModal(false);
        //   window.location.reload();
        // }, 1500);
      })
      .catch((error) => console.log(error));
  };

  const validateCaptcha = async (value) => {
    const res = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${
        import.meta.env.VITE_RECAPTCHA_SECRETKEY
      }
    &response=${value}`,
      {
        method: "POST",
        mode: "no-cors",
      }
    );

    if (res) {
      setRecaptcha(true);
    }
  };

  const SuccessModal = () => {
    return (
      <motion.div className="w-screen h-screen fixed flex items-center  justify-center bg-black/50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          exit={{ opacity: 0 }}
          className="w-80 h-75  bg-white shadow-md rounded-sm"
        >
          <div className="items-center mt-5 justify-center flex flex-col">
            <BsCheck2Circle className="text-green-600 w-30 h-30" />
            <span className="arial-narrow-bold text-[30px] text-black item-center justify-center  flex text-center">
              Thank you!
            </span>
            <span className="arial-narrow text-[20px] item-center text-black justify-center flex text-center">
              Your submission has been sent.
            </span>
            <button
              onClick={() => window.location.reload()}
              className="w-40 mt-5 bg-green-300 items-center justify-center text-black h-10"
            >
              Okay
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="h-screen w-screen justify-center items-center flex  prdc-color">
      <div className="justify-center items-center relative  flex  bg-white border  rounded-md  w-200 h-120 overflow-y-auto overflow-x-hidden border-black text-black">
        <div className="flex-1 flex w-full shadow-md shadow-black h-full items-center justify-center bg-transparent">
          <img
            className="h-full"
            src={
              "/imgs/prdctest.jpg"
              // branding ? API_URL + branding[0].Logo : "/imgs/default_logo.jpg"
            }
            alt="logo-app"
          />
        </div>
        <div className=" flex   items-center justify-center flex-1">
          {toggleState == 1 ? (
            <InitialPage
              setToggleState={setToggleState}
              setFieldForms={setFieldForms}
              fieldForms={fieldForms}
            />
          ) : toggleState == 2 ? (
            <SecondaryPage
              setToggleState={setToggleState}
              setFieldForms={setFieldForms}
              fieldForms={fieldForms}
            />
          ) : toggleState == 3 ? (
            <TertiaryPage
              setToggleState={setToggleState}
              setFieldForms={setFieldForms}
              fieldForms={fieldForms}
              applicantSubmit={applicantSubmit}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <AnimatePresence>{showModal && <SuccessModal />}</AnimatePresence>
      <span className="absolute text-white bottom-0 right-0 flex  items-center justify-center w-35 pl-7 <md:(text-[12px] mr-0 w-10 bg-white)">
        {time}
      </span>
    </div>
  );
};

export default ApplicationForm;
