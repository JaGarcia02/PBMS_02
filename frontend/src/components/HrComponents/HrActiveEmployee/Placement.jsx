import axios from "axios";
import moment from "moment";
import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { API_URL_HR } from "../../../utils/Url";

const HRPlacement = ({
  setToggleState,
  setEmployeeInfo,
  employeeInfo,
  profile,
  setProfile,
  setCloseCondition,
  click_save,

  setUnsaved,
}) => {
  return (
    <div className="w-full p-8 relative backg-color-prdc h-full flex">
      <div className=" flex h-full w-full ">
        <div className="flex-1 flex-col w-full h-full flex">
          <div className="w-full mt-3 flex items-center text-black mt-2 px-4 justify-evenly <md:(w-full items-center text-black mt-2 px-4 justify-between)">
            <span className="arial-narrow emptext-color inline-block w-[8rem] text-[14px] <md:(inline-block w-[7rem])">
              Employee ID no:
            </span>
            <input
              className="w-40 pl-1 arial-narrow-bold border-t-0 border border-l-0 border-r-0 h-6 text-[14px] backg-color-prdc border-black  <md:(ml-0 w-40  h-6 text-[14px])"
              value={employeeInfo.Employee_ID}
            />
          </div>
          <div className="w-full mt-3 flex items-center text-black mt-2 px-4 justify-evenly <md:(w-full items-center text-black mt-2 px-4 justify-between)">
            <span className="arial-narrow emptext-color inline-block w-[8rem] text-[14px] <md:(inline-block w-[7rem])">
              Employee Type:
            </span>

            <select
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  Employee_Designation: e.target.value,
                })
              }
              value={employeeInfo.Employee_Designation}
              className="w-40 border-t-0 arial-narrow-bold border border-l-0 border-r-0 h-6 text-[14px] backg-color-prdc border-black  <md:(ml-0 w-40  h-6 text-[14px])"
            >
              <option>Internal</option>
              <option>External</option>
            </select>
          </div>
          <div className="w-full mt-3 flex items-center text-black mt-2 px-4 justify-evenly <md:(w-full items-center text-black mt-2 px-4 justify-between)">
            <span className=" arial-narrow emptext-color inline-block w-[8rem] text-[14px] <md:(inline-block w-[7rem])">
              Company Assigned:
            </span>
            <select className="w-40 arial-narrow-bold border-t-0 border border-l-0 border-r-0 h-6 text-[14px] backg-color-prdc border-black  <md:(ml-0 w-40  h-6 text-[14px])">
              <option> {employeeInfo.Employee_Company}</option>
            </select>
          </div>
          <div className="w-full mt-3 flex  items-center text-black mt-2 px-4 justify-evenly <md:(w-full items-center text-black mt-2 px-4 justify-between)">
            <span className="arial-narrow emptext-color inline-block w-[8rem] text-[14px] <md:(inline-block w-[7rem])">
              Branch:
            </span>
            <select className="w-40 arial-narrow-bold border-t-0 border border-l-0 border-r-0 h-6 text-[14px] backg-color-prdc border-black  <md:(ml-0 w-40  h-6 text-[14px])">
              <option> {employeeInfo.Employee_CompBranch}</option>
            </select>
          </div>
          <div className="w-full mt-3 flex items-center text-black mt-2 px-4 justify-evenly <md:(w-full items-center text-black mt-2 px-4 justify-between)">
            <span className="arial-narrow emptext-color inline-block w-[8rem] text-[14px] <md:(inline-block w-[7rem])">
              Department:
            </span>
            <select
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  Employee_Department: e.target.value,
                })
              }
              value={employeeInfo.Employee_Department}
              className="w-40 border-t-0 arial-narrow-bold border border-l-0 border-r-0 h-6 text-[14px] backg-color-prdc border-black  <md:(ml-0 w-40  h-6 text-[14px])"
            >
              <option value="HR"> Human Resources </option>
              <option value="SALES"> Sales </option>
              <option value="OPS"> Operations </option>
              <option value="AMAD"> Assent Management </option>
              <option value="ACC"> Accounting and Finance </option>
              <option value="TA"> Talent Acquisition </option>
              <option value="BSD"> Business Support </option>
              <option value="TSD"> Technical Support </option>
            </select>
          </div>
          <div className="w-full mt-3 flex items-center text-black mt-2 px-4 justify-evenly <md:(w-full items-center text-black mt-2 px-4 justify-between)">
            <span className="arial-narrow emptext-color inline-block w-[8rem] text-[14px] <md:(inline-block w-[7rem])">
              Position Title:
            </span>
            <input
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  Employee_JobDesc: e.target.value,
                })
              }
              value={employeeInfo.Employee_JobDesc}
              className="w-40 arial-narrow-bold focus:outline-none pl-1 border-t-0 border border-l-0 border-r-0 h-6 text-[14px] backg-color-prdc border-black  <md:(ml-0 w-40  h-6 text-[14px])"
            />
          </div>
          <div className="w-full mt-3 flex items-center text-black mt-2 px-4 justify-evenly <md:(w-full items-center text-black mt-2 px-4 justify-between)">
            <span className="  arial-narrow emptext-color inline-block w-[8rem] text-[14px] <md:(inline-block w-[7rem])">
              Position Level:
            </span>
            <select
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  Employee_Position: e.target.value,
                })
              }
              value={employeeInfo.Employee_Position}
              className="w-40 arial-narrow-bold border-t-0 border border-l-0 border-r-0 h-6 text-[14px] backg-color-prdc border-black  <md:(ml-0 w-40  h-6 text-[14px])"
            >
              <option value="6">Rank & File</option>
              <option value="5">Supervisor</option>
              <option value="4">Manager</option>
              <option value="3">Executive</option>
              <option value="2"> Department Admin</option>
            </select>
          </div>
        </div>
        <div className="flex-1 ">
          <div className="flex-1 flex-col w-full h-full flex">
            <div className="w-full mt-3 flex items-center text-black mt-2 px-4 justify-evenly <md:(w-full items-center text-black mt-2 px-4 justify-between)">
              <span className="arial-narrow emptext-color inline-block w-[8rem] text-[14px] <md:(inline-block w-[7rem])">
                Company Email:
              </span>
              <input
                onChange={(e) =>
                  setEmployeeInfo({
                    ...employeeInfo,
                    Employee_CompanyEmail: e.target.value,
                  })
                }
                value={employeeInfo.Employee_CompanyEmail}
                className="w-40 arial-narrow-bold pl-1 focus:outline-none arial-narrow h-6 text-[14px] border-b border-b-black  bg-red-200 backg-color-prdc <md:(ml-0 w-40  h-6 text-[14px])"
              />
            </div>
            <div className="w-full mt-3 flex arial-narrow items-center text-black mt-2 px-4 justify-evenly <md:(w-full items-center text-black mt-2 px-4 justify-between)">
              <span className="   emptext-color inline-block w-[8rem] text-[14px] <md:(inline-block w-[7rem])">
                Contract Type:
              </span>
              <select
                onChange={(e) => {
                  setEmployeeInfo({
                    ...employeeInfo,
                    Employee_TypeContract: e.target.value,
                  });
                  setUnsaved(true);
                }}
                value={employeeInfo.Employee_TypeContract}
                className="w-40 arial-narrow-bold  border-t-0 border border-l-0 border-r-0 h-6 text-[14px] backg-color-prdc border-black  <md:(ml-0 w-40  h-6 text-[14px])"
              >
                <option> Probationary</option>
                <option> Regular</option>
              </select>
            </div>
            <div className="w-full mt-3 flex items-center text-black mt-2 px-4 justify-evenly <md:(w-full items-center text-black mt-2 px-4 justify-between)">
              <span className="  arial-narrow emptext-color inline-block w-[8rem] text-[14px] <md:(inline-block w-[7rem])">
                Date Hired:
              </span>
              <span className="w-40 arial-narrow-bold border-t-0 flex items-end pb-1  arial-narrow border border-l-0 border-r-0 h-6 text-[14px] backg-color-prdc border-black  <md:(ml-0 w-40  h-6 text-[14px])">
                {moment(employeeInfo?.createdAt).format("MM/DD/YY hh:mm a")}
              </span>
            </div>
            <div className="w-full mt-3 flex items-center text-black mt-2 px-4 justify-evenly <md:(w-full items-center text-black mt-2 px-4 justify-between)">
              <span className="arial-narrow emptext-color inline-block w-[8rem] text-[14px] <md:(inline-block w-[7rem])">
                Starting Date:
              </span>
              <input
                type="date"
                onChange={(e) =>
                  setEmployeeInfo({
                    ...employeeInfo,
                    Employee_DateStart: e.target.value,
                  })
                }
                value={employeeInfo.Employee_DateStart}
                className="w-40 arial-narrow-bold focus:outline-none border-t-0 border arial-narrow border-l-0 border-r-0 h-6 text-[14px] backg-color-prdc border-black  <md:(ml-0 w-40  h-6 text-[14px])"
              ></input>
            </div>
            <div className="w-full mt-3 flex items-center text-black mt-2 px-4 justify-evenly <md:(w-full items-center text-black mt-2 px-4 justify-between)">
              <span className="arial-narrow  emptext-color arial-narrow inline-block w-[8rem] text-[14px] <md:(inline-block w-[7rem])">
                Schedule:
              </span>
              <input
                onChange={(e) =>
                  setEmployeeInfo({
                    ...employeeInfo,
                    Employee_Schedule: e.target.value,
                  })
                }
                value={employeeInfo.Employee_Schedule ?? ""}
                className="w-40 arial-narrow-bold pl-1 focus:outline-none border-t-0 border arial-narrow border-l-0 border-r-0 h-6 text-[14px] backg-color-prdc border-black  <md:(ml-0 w-40  h-6 text-[14px])"
              ></input>
            </div>
            <div className="w-full mt-3 flex items-center text-black mt-2 px-4 justify-evenly <md:(w-full items-center text-black mt-2 px-4 justify-between)">
              <span className="arial-narrow emptext-color arial-narrow inline-block w-[8rem] text-[14px] <md:(inline-block w-[7rem])">
                Biometrics:
              </span>
              <input
                onChange={(e) => {
                  setEmployeeInfo({
                    ...employeeInfo,
                    Employee_BioID: e.target.value,
                  });
                  setCloseCondition(true);
                }}
                value={employeeInfo.Employee_BioID}
                type="number"
                className="w-40 arial-narrow-bold pl-1 focus:outline-none border-t-0 arial-narrow border border-l-0 border-r-0 h-6 text-[14px] backg-color-prdc border-black  <md:(ml-0 w-40  h-6 text-[14px])"
              ></input>
            </div>
            <div className="w-full mt-3 flex items-center text-black mt-2 px-4 justify-evenly <md:(w-full items-center text-black mt-2 px-4 justify-between)">
              <span className=" arial-narrow emptext-color inline-block w-[8rem] text-[14px] <md:(inline-block w-[7rem])">
                Salary:
              </span>
              <input
                type="number"
                onChange={(e) =>
                  setEmployeeInfo({
                    ...employeeInfo,
                    Employee_Salary: e.target.value,
                  })
                }
                value={employeeInfo.Employee_Salary}
                className="w-40 arial-narrow-bold pl-1 focus:outline-none arial-narrow border-t-0 border border-l-0 border-r-0 h-6 text-[14px] backg-color-prdc border-black  <md:(ml-0 w-40  h-6 text-[14px])"
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
    </div>
  );
};

export default HRPlacement;
