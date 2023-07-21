import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import HrResetUser from "../../components/HrComponents/HrUserManagement/HrResetUser";
import HrUserManagement from "../../components/HrComponents/HrUserManagement";
import HrRequest from "../../components/HrComponents/HrRequest";

const TSD_DefaultSettings = () => {
  const [toggleState, setToggleState] = useState(1);
  const [reset, setReset] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <div className="w-screen h-screen flex flex-col">
      <Navbar />
      <div className="w-full h-full mt-20">
        <span className="mt-5 text-[20px] my-5 ml-6 text-black arial-narrow-bold">
          TSD Admin Settings
        </span>
        <div className="w-full h-full flex ">
          <div className="flex-[0.2]    flex-col mt-5 flex h-full arial-narrow ">
            <div className="text-gray-400 pl-5 ">Default</div>
            <div
              // onClick={() => toggleTab(1)}
              className=" w-full cursor-pointer pl-5  focus:(bg-yellow-300)  hover:(bg-yellow-300 )"
            >
              Date & Time
            </div>
            <div
              //   onClick={() => toggleTab(2)}
              className="w-full cursor-pointer pl-5 active:(bg-yellow-300) hover:(bg-yellow-300) active:"
            >
              Language
            </div>
            <div
              //   onClick={() => toggleTab(3)}
              className="w-full cursor-pointer pl-5 hover:(bg-yellow-300)"
            >
              Region
            </div>
            <div
              //   onClick={() => toggleTab(4)}
              className="w-full cursor-pointer pl-5 hover:(bg-yellow-300)"
            >
              Currency
            </div>
            <div
              //   onClick={() => toggleTab(5)}
              className="w-full cursor-pointer pl-5 hover:(bg-yellow-300 rounded-md)"
            >
              System Owner
            </div>
            <div
              //   onClick={() => toggleTab(6)}
              className="w-full cursor-pointer pl-5 hover:(bg-yellow-300 rounded-md)"
              title="Settings for Default users"
            >
              Default Users
            </div>
            <div className="text-gray-400 pl-5">Utilities</div>
            <div
              //   onClick={() => toggleTab(7)}
              className="w-full cursor-pointer pl-5 hover:(bg-yellow-300 rounded-md)"
            >
              Business Unit Segment
            </div>
            <div
              //   onClick={() => toggleTab(8)}
              className="w-full cursor-pointer pl-5 hover:(bg-yellow-300 rounded-md)"
            >
              Authorization and Role
            </div>
            <div
              onClick={() => toggleTab(1)}
              className=" w-full cursor-pointer pl-5  focus:(bg-yellow-300)  hover:(bg-yellow-300 )"
            >
              User Management
            </div>
            <div
              onClick={() => toggleTab(2)}
              className=" w-full cursor-pointer pl-5  focus:(bg-yellow-300)  hover:(bg-yellow-300 )"
            >
              Personel Request
            </div>
          </div>
          <div className="flex-1 h-full border border-black  overflow-auto">
            {toggleState == 1 ? (
              <HrUserManagement
                setReset={setReset}
                reset={reset}
                setUserObj={setUserObj}
              />
            ) : toggleState == 2 ? (
              <HrRequest />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      {reset && <HrResetUser setReset={setReset} userObj={userObj} />}
    </div>
  );
};

export default TSD_DefaultSettings;
