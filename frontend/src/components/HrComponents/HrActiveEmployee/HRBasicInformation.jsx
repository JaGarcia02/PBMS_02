import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";
import { API_URL_HR } from "../../../utils/Url";
const HRBasicInformation = ({
  setToggleState,
  setEmployeeInfo,
  employeeInfo,
  profile,
  setProfile,
  click_save,
}) => {
  const [regionData, setRegion] = useState([]);
  const [provinceData, setProvince] = useState([]);
  const [cityData, setCity] = useState([]);
  const [barangayData, setBarangay] = useState([]);
  const [regionAddr, setRegionAddr] = useState("");
  const [provinceAddr, setProvinceAddr] = useState("");
  const [cityAddr, setCityAddr] = useState("");
  const [barangayAddr, setBarangayAddr] = useState("");

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

  const region = () => {
    regions().then((response) => {
      setRegion(response);
      setEmployeeInfo({ ...employeeInfo, Employee_province: "" });
    });
  };

  const province = (e) => {
    setRegionAddr(e.target.selectedOptions[0].text);
    provinces(e.target.value).then((response) => {
      setProvince(response);
      setCity([]);
      setBarangay([]);
    });
    setEmployeeInfo({
      ...employeeInfo,
      Employee_region: e.target.selectedOptions[0].text,
    });
  };

  const city = (e) => {
    setProvinceAddr(e.target.selectedOptions[0].text);
    cities(e.target.value).then((response) => {
      setCity(response);
    });
    setEmployeeInfo({
      ...employeeInfo,
      Employee_province: e.target.selectedOptions[0].text,
    });
  };

  const barangay = (e) => {
    setCityAddr(e.target.selectedOptions[0].text);
    barangays(e.target.value).then((response) => {
      setBarangay(response);
    });
    setEmployeeInfo({
      ...employeeInfo,
      Employee_city: e.target.selectedOptions[0].text,
    });
  };

  const brgy = (e) => {
    setBarangayAddr(e.target.selectedOptions[0].text);
    setEmployeeInfo({
      ...employeeInfo,
      Employee_barangay: e.target.selectedOptions[0].text,
    });
  };
  console.log(employeeInfo);
  return (
    <div className="w-full p-8 backg-color-prdc relative h-full flex">
      <div className="h-full  w-full flex">
        <div className="flex-1 flex-col ml-5">
          <span className="arial-narrow-bold emptext-color">FULL NAME:</span>
          <div className="flex items-center mt-1 justify-center">
            <span className="arial-narrow emptext-color inline-block w-[8rem] text-[14px] <md:(inline-block w-[7rem])">
              First Name:
            </span>
            <input
              className="w-50 pl-1 arial-narrow-bold focus:outline-none h-6 text-[14px] arial-narrow border-b border-black backg-color-prdc <md:(ml-0 w-40  h-6 text-[14px])"
              value={employeeInfo.Employee_FirstName}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  Employee_FirstName: e.target.value,
                })
              }
            />
          </div>
          <div className="flex items-center mt-1 justify-center">
            <span className="arial-narrow emptext-color inline-block w-[8rem] text-[14px] <md:(inline-block w-[7rem])">
              Middle Name:
            </span>
            <input
              className="w-50 pl-1 arial-narrow-bold focus:outline-none h-6 text-[14px] arial-narrow border-b border-black backg-color-prdc <md:(ml-0 w-40  h-6 text-[14px])"
              value={employeeInfo.Employee_MiddleName}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  Employee_MiddleName: e.target.value,
                })
              }
            />
          </div>
          <div className="flex items-center mt-1 justify-center">
            <span className="arial-narrow emptext-color inline-block w-[8rem] text-[14px] <md:(inline-block w-[7rem])">
              Last Name:
            </span>
            <input
              className="w-50 pl-1 arial-narrow-bold focus:outline-none h-6 text-[14px] arial-narrow border-b border-black backg-color-prdc <md:(ml-0 w-40  h-6 text-[14px])"
              value={employeeInfo.Employee_LastName}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  Employee_LastName: e.target.value,
                })
              }
            />
          </div>
          <div className="flex items-center mt-1 arial-narrow justify-center">
            <span className="arial-narrow emptext-color inline-block w-[8rem] text-[14px] <md:(inline-block w-[7rem])">
              Suffix:
            </span>
            <input
              value={employeeInfo.Employee_Suffix ?? ""}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  Employee_Suffix: e.target.value,
                })
              }
              className="w-50 pl-1 arial-narrow-bold focus:outline-none h-6 text-[14px] arial-narrow border-b border-black backg-color-prdc <md:(ml-0 w-40  h-6 text-[14px])"
            ></input>
          </div>
          <span className="arial-narrow-bold emptext-color flex mt-7">
            PRESENT ADDRESS:
          </span>
          <div className="flex items-center mt-1 arial-narrow justify-center">
            <span className=" emptext-color inline-block w-[8rem] text-[14px] <md:(inline-block w-[7rem])">
              Street Address:
            </span>
            <input
              className="w-50 pl-1 focus:outline-none h-6 text-[14px]  border-b border-black backg-color-prdc arial-narrow-bold <md:(ml-0 w-40  h-6 text-[14px]) bg-transparent bg-transparent"
              value={employeeInfo.Employee_address}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  Employee_address: e.target.value,
                })
              }
            />
          </div>
          <div className="flex items-center mt-1 arial-narrow justify-center">
            <span className="arial-narrow emptext-color inline-block w-[8rem] text-[14px] <md:(inline-block w-[7rem])">
              Region:
            </span>
            <select
              id="region"
              onChange={province}
              onClick={region}
              className="w-50 arial-narrow-bold border-t-0 border border-l-0 border-r-0 h-6 text-[14px] backg-color-prdc border-black  <md:(ml-0 w-40  h-6 text-[14px])"
            >
              <option selected hidden>
                {employeeInfo.Employee_region}
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
          <div className="flex items-center mt-1 arial-narrow justify-center">
            <span className="arial-narrow emptext-color inline-block w-[8rem] text-[14px] <md:(inline-block w-[7rem])">
              Province:
            </span>
            <select
              id="city"
              required
              onChange={city}
              className="w-50 arial-narrow-bold border-t-0 border border-l-0 border-r-0 h-6 text-[14px] backg-color-prdc border-black  <md:(ml-0 w-40  h-6 text-[14px])"
            >
              <option selected hidden>
                {employeeInfo.Employee_province}
              </option>
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
          </div>
          <div className="flex items-center mt-1 arial-narrow justify-center">
            <span className=" arial-narrow emptext-color inline-block w-[8rem] text-[14px] <md:(inline-block w-[7rem])">
              City:
            </span>
            <select
              id="city"
              required
              onChange={barangay}
              className="w-50 arial-narrow-bold border-t-0 border border-l-0 border-r-0 h-6 text-[14px] backg-color-prdc border-black  <md:(ml-0 w-40  h-6 text-[14px])"
            >
              <option selected hidden>
                {employeeInfo.Employee_city ? employeeInfo.Employee_city : ""}
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
          </div>

          <div className="w-full flex items-center mt-1 arial-narrow justify-center">
            <span className="arial-narrow emptext-color inline-block w-[8rem] text-[14px] <md:(inline-block w-[7rem])">
              Barangay:
            </span>
            <select
              id="barangay2"
              required
              onChange={brgy}
              className="w-50 arial-narrow-bold border-t-0 border border-l-0 border-r-0 h-6 text-[14px] backg-color-prdc border-black  <md:(ml-0 w-40  h-6 text-[14px])"
            >
              <option selected hidden>
                {employeeInfo.Employee_barangay
                  ? employeeInfo.Employee_barangay
                  : ""}
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
        </div>

        <div className="flex-1 flex-col w-full   mt-6 h-full flex">
          <div className="w-full mt-1 flex  items-center text-black mt-2 px-4 justify-evenly <md:(w-full items-center text-black mt-2 px-4 justify-between)">
            <span className="arial-narrow emptext-color inline-block w-[8rem] text-[14px] <md:(inline-block w-[7rem])">
              Mobile Number:
            </span>
            <input
              value={employeeInfo.Employee_MobileNumber ?? ""}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  Employee_MobileNumber: MobileNumberFormat(e.target.value),
                })
              }
              maxLength={13}
              onInput={(e) => {
                if (e.target.value.length > e.target.maxLength)
                  e.target.value = e.target.value.slice(0, e.target.maxLength);
              }}
              className="w-50 pl-1 focus:outline-none arial-narrow-bold h-6 text-[14px] border-b border-b-black  bg-red-200 backg-color-prdc <md:(ml-0 w-40  h-6 text-[14px])"
            />
          </div>
          <div className="w-full mt-1 flex arial-narrow items-center text-black  px-4 justify-evenly <md:(w-full items-center text-black mt-2 px-4 justify-between)">
            <span className="focus:outline-none   emptext-color inline-block w-[8rem] text-[14px] <md:(inline-block w-[7rem])">
              Landline:
            </span>

            <input
              type="number"
              value={employeeInfo.Employee_Landline ?? ""}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  Employee_Landline: e.target.value,
                })
              }
              className="w-50 pl-1 focus:outline-none arial-narrow-bold h-6 text-[14px] border-b border-b-black  bg-red-200 backg-color-prdc <md:(ml-0 w-40  h-6 text-[14px])"
            />
          </div>
          <div className="w-full mt-1 flex items-center text-black  px-4 justify-evenly <md:(w-full items-center text-black mt-2 px-4 justify-between)">
            <span className="  arial-narrow emptext-color inline-block w-[8rem] text-[14px] <md:(inline-block w-[7rem])">
              Email Address:
            </span>
            <input
              value={employeeInfo.Employee_email}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  Employee_email: e.target.value,
                })
              }
              className="w-50 pl-1 focus:outline-none border-t-0 focus:outline-none arial-narrow-bold border border-l-0 border-r-0 h-6 text-[14px] backg-color-prdc border-black  <md:(ml-0 w-40  h-6 text-[14px])"
            />
          </div>
          <div className="w-full mt-1 focus:outline-none flex items-center text-black  px-4 justify-evenly <md:(w-full items-center text-black mt-2 px-4 justify-between)">
            <span className="arial-narrow emptext-color inline-block w-[8rem] text-[14px] <md:(inline-block w-[7rem])">
              Gender:
            </span>
            <select
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  Employee_Gender: e.target.value,
                })
              }
              value={employeeInfo.Employee_Gender}
              className="w-50 focus:outline-none border-t-0 border arial-narrow-bold border-l-0 border-r-0 h-6 text-[14px] backg-color-prdc border-black  <md:(ml-0 w-40  h-6 text-[14px])"
            >
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          <div className="w-full mt-1 focus:outline-none flex items-center text-black  px-4 justify-evenly <md:(w-full items-center text-black mt-2 px-4 justify-between)">
            <span className="arial-narrow emptext-color inline-block w-[8rem] text-[14px] <md:(inline-block w-[7rem])">
              Birthdate:
            </span>
            <div className="flex items-center ">
              <input
                type="date"
                onChange={(e) =>
                  setEmployeeInfo({
                    ...employeeInfo,
                    Employee_BirthDate: e.target.value,
                  })
                }
                value={moment(employeeInfo.Employee_BirthDate).format(
                  "YYYY-MM-DD"
                )}
                className="w-30  focus:outline-none items-end border-t-0 mr-5 border arial-narrow-bold border-l-0 border-r-0 h-6 text-[14px] backg-color-prdc border-black  <md:(ml-0 w-40  h-6 text-[14px])"
              ></input>
              <span className="arial-narrow emptext-color arial-narrow  text-[14px] <md:(inline-block)">
                Age:
              </span>
              <input
                id="age"
                className="w-9 focus:outline-none border-t-0 border  text-center arial-narrow-bold border-l-0 border-r-0 h-6 text-[14px] backg-color-prdc border-black  <md:(ml-0 w-40  h-6 text-[14px])"
                placeholder="Age"
                value={
                  calculate_age(employeeInfo.Employee_BirthDate)
                    ? calculate_age(employeeInfo.Employee_BirthDate)
                    : "0"
                }
              />
            </div>
          </div>
          <div className="w-full mt-1 flex items-center text-black  px-4 justify-evenly <md:(w-full items-center text-black mt-2 px-4 justify-between)">
            <span className="arial-narrow emptext-color arial-narrow inline-block w-[8rem] text-[14px] <md:(inline-block w-[7rem])">
              Birthplace:
            </span>
            <input
              value={employeeInfo.Employee_Birthplace ?? ""}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  Employee_Birthplace: e.target.value,
                })
              }
              className="w-50 pl-1 focus:outline-none border-t-0 arial-narrow-bold border border-l-0 border-r-0 h-6 text-[14px] backg-color-prdc border-black  <md:(ml-0 w-40  h-6 text-[14px])"
            ></input>
          </div>
          <div className="w-full mt-1 flex items-center text-black  px-4 justify-evenly <md:(w-full items-center text-black mt-2 px-4 justify-between)">
            <span className=" arial-narrow emptext-color inline-block w-[8rem] text-[14px] <md:(inline-block w-[7rem])">
              Civil Status:
            </span>
            <input
              value={employeeInfo.Employee_CivilStatus ?? ""}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  Employee_CivilStatus: e.target.value,
                })
              }
              className="w-50 pl-1 focus:outline-none arial-narrow-bold focus:outline-none border-t-0 border border-l-0 border-r-0 h-6 text-[14px] backg-color-prdc border-black  <md:(ml-0 w-40  h-6 text-[14px])"
            ></input>
          </div>
          <div className="w-full mt-1 flex items-center text-black  px-4 justify-evenly <md:(w-full items-center text-black mt-2 px-4 justify-between)">
            <span className=" arial-narrow emptext-color inline-block w-[8rem] text-[14px] <md:(inline-block w-[7rem])">
              Religion:
            </span>
            <input
              value={employeeInfo.Employee_Religion ?? ""}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  Employee_Religion: e.target.value,
                })
              }
              className="w-50 pl-1 focus:outline-none arial-narrow-bold focus:outline-none border-t-0 border border-l-0 border-r-0 h-6 text-[14px] backg-color-prdc border-black  <md:(ml-0 w-40  h-6 text-[14px])"
            ></input>
          </div>
          <div className="w-full mt-1 justify-evenly flex items-center text-black  px-4  <md:(w-full items-center text-black mt-2 px-4 justify-between)">
            <span className=" arial-narrow emptext-color inline-block w-[8rem] text-[14px] <md:(inline-block w-[7rem])">
              Height:
            </span>
            <div className="w-50 pl-1 focus:outline-none justify-between arial-narrow border-t-0 border border-l-0 border-r-0 h-6 text-[14px] backg-color-prdc border-black flex items-center <md:(ml-0 w-40  h-6 text-[14px])">
              <input
                type="number"
                value={employeeInfo.Employee_Height ?? ""}
                onChange={(e) =>
                  setEmployeeInfo({
                    ...employeeInfo,
                    Employee_Height: e.target.value,
                  })
                }
                className="focus:outline-none arial-narrow-bold "
              ></input>
              <p className=" text-[14px]">cm</p>
            </div>
          </div>
          <div className="w-full mt-1 justify-evenly flex items-center text-black  px-4  <md:(w-full items-center text-black mt-2 px-4 justify-between)">
            <span className=" arial-narrow emptext-color inline-block w-[8rem] text-[14px] <md:(inline-block w-[7rem])">
              Weight:
            </span>
            <div className="w-50 justify-between arial-narrow border-t-0 border border-l-0 border-r-0 h-6 text-[14px] backg-color-prdc border-black flex items-center <md:(ml-0 w-40  h-6 text-[14px])">
              <input
                type="number"
                value={employeeInfo.Employee_Weight ?? ""}
                onChange={(e) =>
                  setEmployeeInfo({
                    ...employeeInfo,
                    Employee_Weight: e.target.value,
                  })
                }
                className="focus:outline-none pl-1 arial-narrow-bold"
              ></input>
              <p className=" text-[14px]">kg</p>
            </div>
          </div>
          <div className="w-full mt-1 flex items-center text-black  px-4 justify-evenly <md:(w-full items-center text-black mt-2 px-4 justify-between)">
            <span className=" arial-narrow emptext-color inline-block w-[8rem] text-[14px] <md:(inline-block w-[7rem])">
              Nationality:
            </span>
            <input
              value={employeeInfo.Employee_Nationality ?? ""}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  Employee_Nationality: e.target.value,
                })
              }
              className="w-50 pl-1 focus:outline-none arial-narrow-bold border-t-0 border border-l-0 border-r-0 h-6 text-[14px] backg-color-prdc border-black  <md:(ml-0 w-40  h-6 text-[14px])"
            ></input>
          </div>
          <button
            onClick={click_save}
            className="prdc-border text-white initial-pag-border arial-narrow-bold absolute bottom-0 right-6 active:scale-1  rounded-sm text-[14px] h-7 w-20  hover:(border-black rounded-sm) active:duration-75 transition-all hover:(scale-108 ease-in-out  transform py-1 rounded-sm) group  mb-5 flex items-center justify-center     disabled:(bg-gray-500 border-gray-500 cursor-not-allowed)  focus:(outline-none) dark:(bg-transparent border-black border-[0.5px] hover:(arial-narrow-bold)"
          >
            SAVE
            {/* <AiOutlineArrowRight className="ml-2 text-initial group-hover:(text-[17px])" /> */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HRBasicInformation;
