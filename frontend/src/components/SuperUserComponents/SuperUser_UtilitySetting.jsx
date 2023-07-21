import React, { useState } from "react";

const SuperUser_UtilitySetting = ({
  handleSettings,
  timezone,
  dateFormat,
  region,
  language,
  currency,
  setCurrentState,
}) => {
  const [validation, setValidation] = useState(false);

  const validate = () => {
    if (timezone.trim() === "") {
      document.getElementById("timezone").style.borderColor = "red";
      setValidation(true);
    }
    if (dateFormat.trim() === "") {
      document.getElementById("dateTimeFormat").style.borderColor = "red";
      setValidation(true);
    }
    if (region.trim() === "") {
      document.getElementById("region").style.borderColor = "red";
      setValidation(true);
    }
    if (language.trim() === "") {
      document.getElementById("lang").style.borderColor = "red";
      setValidation(true);
    }
    if (currency.trim() === "") {
      document.getElementById("currency").style.borderColor = "red";
      setValidation(true);
    }

    return;
  };

  const clickNext = () => {
    if (
      timezone.trim() === "" ||
      dateFormat.trim() === "" ||
      region.trim() === "" ||
      language.trim() === "" ||
      currency.trim() === ""
    ) {
      validate();
    } else {
      setCurrentState(4);
    }
  };

  return (
    <div className="admin-create-form-2">
      <div className="admin-create-form-2-wrapper">
        <span className="text-black arial-narrow-bold text-[18px] mb-4">
          Set Date & Time, Region, Language, and Currency
        </span>
        <div className="admin-create-form-3-input-container">
          <span>Set Timezone</span>
          <select
            className="admin-create-form-3-input"
            name="timezone"
            onChange={handleSettings}
            value={timezone}
            id="timezone"
          >
            <option value="" selected hidden disabled>
              Choose timezone
            </option>
            <option value="UTC+8">UTC+8</option>
          </select>
        </div>
        <div className="admin-create-form-3-input-container">
          <span>Date Format & Time</span>
          <select
            className="admin-create-form-3-input"
            name="dateFormat"
            onChange={handleSettings}
            value={dateFormat}
            id="dateTimeFormat"
          >
            <option value="" selected hidden disabled>
              Choose date and time format
            </option>
            <option value="MM/DD/YYYY hh:mm">MM/DD/YYYY hh:mm</option>
            <option value="DD/MM/YYYY hh:mm">DD/MM/YYYY hh:mm</option>
            <option value="MMMM DD, YYYY hh:mm a">MMMM DD, YYYY hh:mm a</option>
            <option value="MMMM-DD-YYYY hh:mm a">MMMM-DD-YYYY hh:mm a</option>
            <option value="MM/DD/YYYY HH:mm">MM/DD/YYYY HH:mm</option>
            <option value="DD/MM/YYYY HH:mm">DD/MM/YYYY HH:mm</option>
            <option value="MMMM DD, YYYY HH:mm a">MMMM DD, YYYY HH:mm </option>
            <option value="MMMM-DD-YYYY HH:mm a">MMMM-DD-YYYY HH:mm </option>
          </select>
        </div>
        <div className="admin-create-form-3-input-container">
          <span>Region</span>
          <select
            className="admin-create-form-3-input"
            name="region"
            onChange={handleSettings}
            value={region}
            id="region"
          >
            <option value="" selected hidden disabled>
              Choose Region
            </option>
            <option value="Asia">Asia</option>
          </select>
        </div>
        <div className="admin-create-form-3-input-container">
          <span>Language</span>
          <select
            className="admin-create-form-3-input"
            name="language"
            onChange={handleSettings}
            value={language}
            id="lang"
          >
            <option value="" selected hidden disabled>
              Choose Language
            </option>
            <option value="EN">EN</option>
          </select>
        </div>
        <div className="w-[70%] flex">
          <div className="flex flex-col flex-1 ">
            <span className="arial-narrow">Currency</span>
            <select
              className="border w-70 rounded-md border border-gray-700"
              name="currency"
              onChange={handleSettings}
              value={currency}
              id="currency"
            >
              <option value="" selected hidden disabled>
                Choose Currency
              </option>
              <option value="$">$ (United State Dollar)</option>
              <option value="₱">₱ (Philippine Peso)</option>
            </select>
          </div>
        </div>
        <div className="w-[70%] flex items-center justify-between">
          <button
            className=" bg-gray-900 text-white rounded-sm text-center w-20 mt-6 mr-4"
            onClick={() => setCurrentState(2)}
          >
            Back
          </button>
          <button
            className=" bg-gray-900 text-white rounded-sm text-center w-20 mt-6"
            onClick={clickNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuperUser_UtilitySetting;
