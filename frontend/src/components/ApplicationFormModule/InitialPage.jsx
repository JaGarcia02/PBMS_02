import React from "react";
import { useState, useEffect } from "react";
import { GrLinkNext } from "react-icons/gr";
import axios from "axios";
import { API_URL_ADMIN } from "../../utils/Url";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";
import { HiArrowSmRight } from "react-icons/hi";
import { AiOutlineArrowRight } from "react-icons/ai";
const InitialPage = ({ setToggleState, setFieldForms, fieldForms }) => {
  const [regionData, setRegion] = useState([]);
  const [provinceData, setProvince] = useState([]);
  const [cityData, setCity] = useState([]);
  const [barangayData, setBarangay] = useState([]);
  const [regionAddr, setRegionAddr] = useState("");
  const [provinceAddr, setProvinceAddr] = useState("");
  const [cityAddr, setCityAddr] = useState("");
  const [barangayAddr, setBarangayAddr] = useState("");
  const [jobOffers, setJobOffers] = useState([]);
  const [validate, setValidate] = useState(false);
  const calculate_age = (dob1) => {
    let today = new Date();
    let birthDate = new Date(dob1); // create a date object directly from `dob1` argument
    let age_now = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    console.log(age_now);
    return age_now;
  };

  // JOB POSITION FUNCTION

  useEffect(() => {
    let subscribed = true;
    axios
      .get(API_URL_ADMIN + "view-all-prf-request")
      .then((res) => {
        if (subscribed) setJobOffers(res.data);
      })
      .catch((err) => console.log(err));

    return () => (subscribed = false);
  }, []);

  const region = () => {
    regions().then((response) => {
      setRegion(response);
    });
  };

  const province = (e) => {
    setRegionAddr(e.target.selectedOptions[0].text);
    provinces(e.target.value).then((response) => {
      setProvince(response);
      setCity([]);
      setBarangay([]);
    });
    setFieldForms({ ...fieldForms, region: e.target.selectedOptions[0].text });
  };

  const city = (e) => {
    setProvinceAddr(e.target.selectedOptions[0].text);
    cities(e.target.value).then((response) => {
      setCity(response);
    });
    setFieldForms({
      ...fieldForms,
      province: e.target.selectedOptions[0].text,
    });
  };

  const barangay = (e) => {
    setCityAddr(e.target.selectedOptions[0].text);
    barangays(e.target.value).then((response) => {
      setBarangay(response);
    });
    setFieldForms({ ...fieldForms, city: e.target.selectedOptions[0].text });
  };

  const brgy = (e) => {
    setBarangayAddr(e.target.selectedOptions[0].text);
    setFieldForms({
      ...fieldForms,
      barangay: e.target.selectedOptions[0].text,
    });
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

  return (
    <div className="w-full h-119 relative items-center flex-col flex ">
      <span className="arial-narrow-bold mt-4 ml-1 text-[20px]">
        APPLICATION FORM
      </span>
      <div className="h-10 flex  mt-2 items-center justify-center w-full">
        <div className="rounded-full flex-col items-center justify-center flex w-6 h-6  empmanage-border text-white">
          <p className="mt-5 font-bold text-[12px]">1</p>
          <span className="mt-3 text-black text-[10px] w-30 text-center  text-gray-500">
            Application Form
          </span>
        </div>
        <hr className="border border-green-800 w-15" />
        <div className="rounded-full  flex-col items-center justify-center flex w-6 h-6 shadow-sm shadow-black border border-black text-black">
          <p className="mt-5 font-bold text-[12px]">2</p>
          <span className="mt-3 text-black text-[10px] w-30 text-center  text-gray-500">
            Cover Letter
          </span>
        </div>
        <hr className="border border-black w-15" />
        <div className="rounded-full flex-col items-center justify-center flex w-6 h-6 shadow-sm shadow-black border border-black text-black">
          <p className="mt-5 font-bold text-[12px]">3</p>
          <span className="mt-3 text-black text-[10px] w-30 text-center  text-gray-500">
            Upload Resume
          </span>
        </div>
      </div>
      <form
        onSubmit={() => setToggleState(2)}
        className="w-[95%]  h-119 mt-6 arial-narrow bg-white text-start items-center flex flex-col"
      >
        <span className="arial-narrow-bold flex ml-4 text-[13px]  w-full">
          Full Name <p className="text-red-500 ml-1">*</p>
        </span>
        <div className="w-[95%] bg-white justify-start mt-1 flex flex-row">
          <input
            required
            className="rounded-sm capitalize text-[13px] h-6 border mr-1 arial-narrow  border-black w-full pl-2"
            placeholder="First name"
            onChange={(e) =>
              setFieldForms({ ...fieldForms, firstname: e.target.value })
            }
            value={fieldForms.firstname}
          />
          <input
            id="middlename"
            className="rounded-sm text-[13px] capitalize h-6 border mr-1 arial-narrow  border-black w-full pl-2"
            placeholder="Middle name"
            onChange={(e) =>
              setFieldForms({ ...fieldForms, middlename: e.target.value })
            }
            value={fieldForms.middlename}
          />
        </div>
        <div className="w-[95%] bg-white justify-start mt-1 flex flex-row">
          <input
            id="lastname"
            className="rounded-sm text-[13px] capitalize h-6 border mr-1 arial-narrow  border-black w-full pl-2"
            placeholder="Last Name"
            onChange={(e) =>
              setFieldForms({ ...fieldForms, lastname: e.target.value })
            }
            value={fieldForms.lastname}
          />
          <input
            className="rounded-sm capitalize text-[13px] h-6 border mr-1 arial-narrow  border-black w-full pl-2"
            placeholder="Suffix"
            onChange={(e) =>
              setFieldForms({ ...fieldForms, Suffix: e.target.value })
            }
            value={fieldForms.Suffix}
          />
        </div>
        <div className="w-[95%] mt-4 justify-evenly flex">
          <span className="arial-narrow-bold text-[13px] mr-1 flex w-full">
            E-mail <p className="text-red-500 ml-1">*</p>
          </span>
          <span className="arial-narrow-bold text-[13px] mr-1 flex w-full">
            Phone number <p className="text-red-500 ml-1">*</p>
          </span>
        </div>
        <div className="w-[95%] mt-1 justify-evenly flex">
          <input
            id="email"
            // className="rounded-sm border text-[13px] mr-1 w-full border-black w-full pl-2 "
            className="rounded-sm border text-[13px] h-6 mr-1 w-full border-black w-full pl-2 "
            placeholder="myname@example.com"
            required
            onChange={(e) =>
              setFieldForms({ ...fieldForms, email: e.target.value })
            }
            value={fieldForms.email}
          />
          <input
            className="rounded-sm border mr-1 w-full text-[13px] border-black w-full pl-2"
            placeholder="(0000)-0000-000"
            value={fieldForms.contactNum}
            onChange={(e) =>
              setFieldForms({
                ...fieldForms,
                contactNum: MobileNumberFormat(e.target.value),
              })
            }
            maxLength={13}
            onInput={(e) => {
              if (e.target.value.length > e.target.maxLength)
                e.target.value = e.target.value.slice(0, e.target.maxLength);
            }}
          />
        </div>
        <div className="w-[95%] justify-evenly mt-4 flex">
          <span className="arial-narrow-bold text-[13px] mr-1 flex w-full">
            Gender <p className="text-red-500 ml-1">*</p>
          </span>
          <span className="arial-narrow-bold text-[13px] mr-1 pr-4 flex w-full">
            Birthdate <p className="text-red-500 ml-1">*</p>
          </span>
          <span className="arial-narrow-bold text-[13px] mr-3 w-full">
            Age{" "}
          </span>
        </div>
        <div className="w-[95%] justify-evenly mt-1 flex">
          <select
            value={fieldForms.gender}
            onChange={(e) =>
              setFieldForms({ ...fieldForms, gender: e.target.value })
            }
            className={`rounded-sm ${
              fieldForms.gender == "" ? "text-gray-400" : "text-black"
            } border mr-1 w-full text-[13px] h-6  border-black w-[95%] pl-1`}
          >
            <option value="" selected hidden>
              Select Gender
            </option>
            <option className="text-black" value="Male">
              Male
            </option>
            <option className="text-black" value="Female">
              Female
            </option>
          </select>
          <input
            type="date"
            id="birthDate"
            required
            onChange={(e) =>
              setFieldForms({ ...fieldForms, birthDate: e.target.value })
            }
            value={fieldForms.birthDate}
            className={`${
              fieldForms.birthDate == "" ? "text-gray-400" : "text-black"
            } rounded-sm border mr-1 text-center text-[13px] h-6 w-full border-black w-full pl-2`}
          />
          <input
            id="age"
            // className="rounded-sm border mr-1 w-full border-black w-full pl-2"
            className="rounded-sm border mr-1  text-[13px] border-black h-6 w-full pl-2"
            placeholder="Age"
            value={
              calculate_age(fieldForms.birthDate)
                ? calculate_age(fieldForms.birthDate)
                : "0"
            }
          />
        </div>
        <span className="arial-narrow-bold text-[13px] ml-4 flex mt-4 w-full">
          Permanent address <p className="text-red-500 ml-1">*</p>
        </span>
        <div className="w-[95%] mt-1 justify-evenly  flex">
          <input
            id="street"
            // className="rounded-sm border mr-1 w-full border-black w-[95%] pl-2"
            className="rounded-sm border mr-1 w-full text-[13px] h-6 border-black w-[95%] pl-2"
            placeholder="Street address"
            required
            onChange={(e) =>
              setFieldForms({ ...fieldForms, address: e.target.value })
            }
            value={fieldForms.address}
          />
          <select
            id="region"
            onChange={province}
            onClick={region}
            className={`${
              fieldForms.region == "" ? "text-gray-400" : "text-black"
            } rounded-sm border mr-1 w-full text-[13px] h-6 border-black w-[95%] pl-1`}
          >
            <option value="" selected hidden>
              {fieldForms.region ? fieldForms.region : "Select Region"}
            </option>
            {regionData &&
              regionData.length > 0 &&
              regionData.map((item) => (
                <option
                  className="text-black"
                  key={item.region_code}
                  value={item.region_code}
                >
                  {item.region_name}
                </option>
              ))}
          </select>
        </div>
        <div className="w-[95%] justify-evenly mt-2 flex">
          <select
            id="city"
            required
            value={fieldForms.city}
            onChange={city}
            className={`${
              fieldForms.province == "" ? "text-gray-400" : "text-black"
            } rounded-sm border mr-1 w-full text-[13px] h-6 border-black w-[95%] pl-1`}
          >
            <option selected hidden>
              {fieldForms.province ? fieldForms.province : "Select Province"}
            </option>{" "}
            {provinceData &&
              provinceData.length > 0 &&
              provinceData.map((item) => (
                <option
                  className="text-black"
                  key={item.province_code}
                  value={item.province_code}
                >
                  {item.province_name}
                </option>
              ))}
          </select>
          <select
            id="barangay"
            required
            onChange={barangay}
            className={`${
              fieldForms.city == "" ? "text-gray-400" : "text-black"
            } rounded-sm border mr-1 w-full text-[13px] h-6 border-black w-[95%] pl-1`}
          >
            <option selected hidden>
              {fieldForms.city ? fieldForms.city : "Select City"}
            </option>
            {cityData &&
              cityData.length > 0 &&
              cityData.map((item) => (
                <option
                  className="text-black"
                  key={item.city_code}
                  value={item.city_code}
                >
                  {item.city_name}
                </option>
              ))}
          </select>
          <select
            id="barangay2"
            required
            onChange={brgy}
            className={`${
              fieldForms.barangay == "" ? "text-gray-400" : "text-black"
            } rounded-sm border mr-1 w-full text-[13px] h-6 border-black w-[95%] pl-1`}
          >
            <option selected hidden>
              {fieldForms.barangay ? fieldForms.barangay : "Select Barangay"}
            </option>
            {barangayData &&
              barangayData?.length > 0 &&
              barangayData?.map((item) => (
                <option
                  className="text-black"
                  key={item.brgy_code}
                  value={item.brgy_code}
                >
                  {item.brgy_name}
                </option>
              ))}
          </select>
        </div>
        <div className="w-[95%] justify-evenly flex mt-4">
          <span className="arial-narrow-bold flex text-[13px] mr-1 w-full">
            Applied Position <p className="text-red-500 ml-1">*</p>
          </span>
          <span className="arial-narrow-bold flex text-[13px] w-full">
            How did you hear about us? <p className="text-red-500 ml-1">*</p>
          </span>
        </div>
        <div className="w-[95%] mt-1 justify-evenly flex">
          <select
            id="position"
            required
            className={`${
              fieldForms.position == "" ? "text-gray-400" : "text-black"
            } rounded-sm border text-[13px] h-6  mr-1 w-full h-6 border-black w-full pl-1
           `}
            onChange={(e) =>
              setFieldForms({ ...fieldForms, position: e.target.value })
            }
            value={fieldForms.position}
          >
            <option value="" selected hidden>
              {fieldForms.position ? fieldForms.position : "Select Position"}
            </option>
            {jobOffers
              .filter((fil) => fil.request_status == 1)
              .map((data) => (
                <option className="text-black" value={data.request_position}>
                  {data.request_department + " - " + data.request_position}
                </option>
              ))}
          </select>
          <select
            id="select"
            required
            className={`rounded-sm border ${
              fieldForms.aboutUs == "" ? "text-gray-400 " : "text-black"
            }  mr-1 w-full h-6 text-[13px] border-black w-full pl-1`}
            onChange={(e) =>
              setFieldForms({ ...fieldForms, aboutUs: e.target.value })
            }
            value={fieldForms.aboutUs}
          >
            <option value="" hidden selected>
              {fieldForms.aboutUs ? fieldForms.aboutUs : "Please Select"}
            </option>
            <option className="text-black" value="Indeed">
              Indeed
            </option>
            <option className="text-black" value="Referral">
              Referral
            </option>
            <option className="text-black" value="JobStreet">
              JobStreet
            </option>
            <option className="text-black" value="Facebook">
              Facebook
            </option>
          </select>
        </div>
        <button
          type="submit"
          className=" absolute bottom-2  right-4 border-none active:scale-1 self-center text-[14px] h-7 w-7 items-center   active:duration-75 transition-all hover:(scale-130 ease-in-out  transform py-1 )   flex items-center justify-center text-black    disabled:(bg-gray-500 border-gray-500 cursor-not-allowed)  focus:(outline-none) dark:(bg-transparent  text-black)"
        >
          <HiArrowSmRight className="font-bold  text-[30px] " />
        </button>
      </form>
    </div>
  );
};

export default InitialPage;
