import React, { useState } from "react";
import { useEffect } from "react";
import { IoIosCloudUpload } from "react-icons/io";

const SuperUser_Owner = ({
  handleSystemOwner,
  Business_Name,
  Business_Address,
  TIN,
  getInputProps,
  getRootProps,
  isDragReject,
  uploadedFile,
  setCurrentState,
}) => {
  const [validation, setValidation] = useState(false);

  const validate = () => {
    if (Business_Name.trim() === "") {
      document.getElementById("Business_Name").style.borderColor = "red";
      setValidation(true);
    }
    if (Business_Address.trim() === "") {
      document.getElementById("Business_Address").style.borderColor = "red";
      setValidation(true);
    }
    if (TIN.trim() === "") {
      document.getElementById("TIN").style.borderColor = "red";
      setValidation(true);
    }
    if (uploadedFile == null) {
      document.getElementById("file_logo").style.borderColor = "red";
      setValidation(true);
    }
    if (TIN.length <= 12) {
      document.getElementById("TIN").style.borderColor = "red";
      setValidation(true);
    }

    return;
  };

  const clickNext = (e) => {
    if (
      Business_Name.trim() === "" ||
      Business_Address.trim() === "" ||
      TIN.trim() === "" ||
      uploadedFile == null ||
      TIN.length <= 12
    ) {
      validate();
    } else {
      setCurrentState(3);
    }
  };

  // ========================================================================= //
  function convertToValidPhoneNumber(text) {
    var result = [];
    text = text.replace(/[^\d]/g, "");
    while (text.length >= 6) {
      result.push(text.substring(0, 3));
      text = text.substring(3);
    }
    if (text.length > 0) result.push(text);
    return result.join("-");
  }
  // ========================================================================= //

  return (
    <div className="admin-create-form-2">
      <div className="admin-create-form-2-wrapper">
        <span className="text-black arial-narrow-bold text-[25px] mb-6">
          System Owner
        </span>
        <div className="admin-create-form-2-input-container">
          <span className="arial-narrow">Business Name</span>
          <input
            className="admin-create-form-2-input"
            name="Business_Name"
            onChange={handleSystemOwner}
            value={Business_Name}
            id="Business_Name"
          />
          {validation && Business_Name.trim() === "" ? (
            <p className="w-full text-right text-red-600 arial-narrow text-[13px] absolute top-13">
              Business Name is required!
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="admin-create-form-2-input-container">
          <span className="arial-narrow">Business Address</span>
          <input
            className="admin-create-form-2-input"
            name="Business_Address"
            onChange={handleSystemOwner}
            value={Business_Address}
            id="Business_Address"
          />
          {validation && Business_Address.trim() === "" ? (
            <p className="absolute text-red-600  text-[13px] w-full top-13 arial-narrow text-right">
              Business Address is required!
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="admin-create-form-2-input-container">
          <span className="arial-narrow">Tax Identification Number</span>
          <input
            className="admin-create-form-2-input"
            name="TIN"
            onChange={handleSystemOwner}
            value={convertToValidPhoneNumber(TIN)}
            maxLength={16}
            id="TIN"
            placeholder="XXX-XXX-XXX-XXX"
          />

          {validation && TIN.trim() === "" ? (
            <p className="absolute text-red-600  text-[13px] w-full top-13 arial-narrow text-right">
              TIN Number is required!
            </p>
          ) : validation && TIN.length <= 12 ? (
            <p className="absolute text-red-600  text-[13px] w-full top-13 arial-narrow text-right">
              TIN is not valid!
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="admin-create-form-2-input-container">
          <span className="arial-narrow">Company Logo</span>
          <div className="flex h-20 mt-1 w-full relative">
            <div
              className="w-full flex items-center justify-center rounded-md bg-blue-300 cursor-pointer overflow-auto border"
              {...getRootProps()}
              id="file_logo"
            >
              {uploadedFile ? (
                <div className="flex items-center">
                  <label>{uploadedFile?.name}</label>
                  <img
                    src={uploadedFile?.preview}
                    className="h-16 w-16 object-contain p-3"
                  />
                </div>
              ) : isDragReject ? (
                <p>IMAGE ONLY!</p>
              ) : (
                <>
                  <IoIosCloudUpload className="text-[40px] mr-2 text-blue-600" />
                  <p className="font-Roboto text-[15px]">
                    Upload company logo.
                  </p>
                </>
              )}
            </div>
            <input
              type="file"
              accept="image/png, image/jpeg"
              {...getInputProps()}
            />
          </div>
          {validation && uploadedFile == null ? (
            <p className="w-full text-right text-red-600 absolute top-27 arial-narrow text-[13px]">
              Company Logo is required!
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="w-full mt-4 flex items-center justify-end">
          <button
            className="mr-15 bg-gray-900 text-white rounded-sm text-center w-20"
            onClick={clickNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuperUser_Owner;
