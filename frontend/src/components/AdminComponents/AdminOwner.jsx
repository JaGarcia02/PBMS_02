import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../../components/AdminComponents/AdminSidebar";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { IoIosCloudUpload } from "react-icons/io";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { API_URL_ADMIN } from "../../utils/Url";
import Lottie from "lottie-react";
import loadingSpinner from "../../lottieFiles/loading_green.json";
import { ImCheckmark } from "react-icons/im";
import AddAdminOfficer from "../../components/AdminComponents/AddAdminOfficer";

const AdminOwner = () => {
  const [file, setUploadFile] = useState(null);
  const [Owner, setOwner] = useState({
    Business_Name: "",
    Business_Address: "",
    TIN: "",
  });
  const [validation, setValidation] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function TIN_number_format(text) {
    var result = [];
    text = text.replace(/[^\d]/g, "");
    while (text.length >= 6) {
      result.push(text.substring(0, 3));
      text = text.substring(3);
    }
    if (text.length > 0) result.push(text);
    return result.join("-");
  }

  const { Business_Name, Business_Address, TIN } = Owner;

  // const handleChange = (e) => {
  //   setOwner((prev) => ({
  //     ...prev,
  //     [e.target.name]: e.target.value,
  //   }));
  // if (Owner.TIN) {
  //   setOwner({ ...Owner, TIN: TIN_number_format(e.target.value) });
  // }else{
  // }
  // };

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    multiple: false,
    accept: { "image/png": [".png"], "image/jpg": [".jpg"] },
    onDrop: (acceptFiles) => {
      setUploadFile(acceptFiles[0]);
      console.log(
        acceptFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
    },
  });

  const validate = () => {
    if (Business_Address.trim() === "") {
      document.getElementById("business_address").style.borderColor = "red";
      setValidation(true);
    }
    if (Business_Name.trim() === "") {
      document.getElementById("business_name").style.borderColor = "red";
      setValidation(true);
    }
    if (TIN.trim() === "") {
      document.getElementById("tin").style.borderColor = "red";
      setValidation(true);
    }
    if (file == null) {
      document.getElementById("file_logo").style.borderColor = "red";
      setValidation(true);
    }

    return;
  };

  const Modal = () => {
    return (
      <div className="flex w-full h-full bg-black/50 fixed z-80 items-center justify-center">
        <motion.div
          className="absolute flex flex-col items-center justify-center h-60 w-60  rounded-md bg-white"
          initial={{
            scale: 0,
          }}
          animate={{
            scale: 1,
          }}
        >
          {loading && (
            <Lottie
              animationData={loadingSpinner}
              loop={true}
              className="h-90 w-90"
            />
          )}
          {success && (
            <>
              <ImCheckmark className="text-green-500 text-[50px] mb-4" />
              <span className="text-green-700 text-[25px] arial-narrow-bold ">
                DONE!
              </span>
              <button
                className="bg-blue-900 text-white mt-10 w-20 h-10 shadow-sm shadow-gray-900 rounded-sm"
                onClick={() => window.location.reload()}
              >
                OK
              </button>
            </>
          )}
        </motion.div>
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();

    if (
      Business_Name.trim() === "" ||
      Business_Address.trim() === "" ||
      TIN.trim() === "" ||
      file == null
    ) {
      validate();
    } else {
      formData.append("logo", file);
      formData.append("Business_Name", Business_Name);
      formData.append("Business_Address", Business_Address);
      formData.append("TIN", TIN);
      setShowModal(true);
      setLoading(true);
      axios
        .post(API_URL_ADMIN + "upload", formData)
        .then((res) => {
          setSuccess(true);
        })
        .catch((err) => alert(err))
        .finally((result) => setLoading(false));
    }
  };

  return (
    <div className="w-full h-full flex flex-col p-1">
      <div className=" w-full flex ">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <span className="arial-narrow-bold p-3 text-[18px] text-black ">
            System Owner
          </span>
          <div className="admin-owner-div">
            <span className="admin-owner-span">Business Name:</span>
            <input
              className="admin-owner-input"
              name="Business_Name"
              placeholder="Business Name"
              value={Business_Name}
              onChange={(e) =>
                setOwner({ ...Owner, Business_Name: e.target.value })
              }
              id="business_name"
            />
            <p className="admin-owner-error-message">
              {validation && Business_Name.trim() === ""
                ? "Business name is required!"
                : ""}
            </p>
          </div>
          <div className="admin-owner-div">
            <span className="admin-owner-span">Business Address:</span>
            <input
              className="admin-owner-input"
              name="Business_Address"
              placeholder="Business Address"
              value={Business_Address}
              onChange={(e) =>
                setOwner({ ...Owner, Business_Address: e.target.value })
              }
              id="business_address"
            />
            <p className="admin-owner-error-message">
              {validation && Business_Address.trim() === ""
                ? "Business address is required!"
                : ""}
            </p>
          </div>
          <div className="admin-owner-div">
            <span className="admin-owner-span">Tax Identification Number:</span>
            <input
              type="text"
              className="admin-owner-input"
              name="TIN"
              value={TIN}
              placeholder="XXX-XXX-XXX-XXX"
              onChange={(e) =>
                setOwner({ ...Owner, TIN: TIN_number_format(e.target.value) })
              }
              id="tin"
              maxLength={14}
              onInput={(e) => {
                if (e.target.value.length > e.target.maxLength)
                  e.target.value = e.target.value.slice(0, e.target.maxLength);
              }}
            />
            <p className="admin-owner-error-message">
              {validation && TIN.trim() === "" ? "TIN is required!" : ""}
            </p>
          </div>
          <div className="flex my-3 h-20 relative">
            <span className="admin-owner-span">Logo:</span>
            <div className="flex flex-col items-end">
              <div
                className="h-20 w-80 flex items-center justify-center rounded-md bg-blue-300 cursor-pointer overflow-auto border"
                {...getRootProps()}
                id="file_logo"
              >
                {file ? (
                  <div className="flex items-center">
                    <label>{file?.name}</label>
                    <img
                      src={file?.preview}
                      className="h-16 w-16 object-contain p-3"
                    />
                  </div>
                ) : isDragReject ? (
                  <p>IMAGE ONLY!</p>
                ) : (
                  <>
                    <IoIosCloudUpload className="text-[40px] mr-4 text-blue-600" />
                    <p className="font-Roboto text-[15px]">
                      Choose a file or drag it here.
                    </p>
                  </>
                )}
              </div>
              <input
                type="file"
                accept="image/png, image/jpeg"
                {...getInputProps()}
              />
              <p className="text-red-600 text-[12px] mt-2 arial-narrow">
                {validation && !file ? "Logo is required!" : ""}
              </p>
            </div>
          </div>
          <div className="w-full  ml-30  flex items-center justify-center">
            <button
              className=" border-green-500  active:scale-1 rounded-sm text-[14px] h-7 w-24 hover:(border-green-500 rounded-sm) active:duration-75 transition-all hover:(scale-108 ease-in-out  transform py-1 rounded-sm)  mb-5 flex items-center justify-center text-green-600   mr-12 disabled:(bg-gray-500 border-gray-500 cursor-not-allowed)  focus:(outline-none) dark:(bg-transparent border-green-500 border-2 text-green-500"
              type="submit"
            >
              <IoPaperPlaneOutline className="mr-2 text-green-600" />
              Submit
            </button>
          </div>
        </form>
      </div>
      {showModal && <Modal />}
      <div className="w-full mt-10 ">
        <AddAdminOfficer />
      </div>
    </div>
  );
};

export default AdminOwner;
