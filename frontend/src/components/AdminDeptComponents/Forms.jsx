import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import uniqid from "uniqid";
import jwt from "jwt-decode";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";
import { API_URL, API_URL_ADMIN } from "../../utils/Url";
import { HiDocumentText } from "react-icons/hi";
import { SiMicrosoftword } from "react-icons/si";
import { AnimatePresence } from "framer-motion";
import FormConfirmation from "./FormConfirmation";
import FormAdd from "./FormAdd";
import { BsList } from "react-icons/bs";
import { BiSearch, BiSortAlt2 } from "react-icons/bi";
import { HiViewGrid } from "react-icons/hi";
import { IoAdd } from "react-icons/io5";
import moment from "moment";

const Forms = () => {
  //   const [submitData, setSubmitData] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [passingData, setPassingData] = useState({
    ID: "",
    FormName: "",
    FormUrl: "",
  });
  const [view, setView] = useState(false);
  const [sort, setSort] = useState(false);

  const decoded = user ? jwt(user) : "";

  const [formData, setFormData] = useState([]);

  const Hi = () => {
    alert("Hi");
  };

  useEffect(() => {
    axios
      .get(API_URL_ADMIN + `get-forms/${sort ? "admin_FormName" : "ID"}`)
      .then((res) => setFormData(res.data))
      .catch((err) => console.log(err));
  }, [sort]);

  const click_form = (ID, FormName, FormUrl) => {
    setPassingData({
      ID: ID,
      FormName: FormName,
      FormUrl: FormUrl,
    });
    setShowConfirmation(true);
  };

  return (
    <div className="w-full relative h-full flex flex-col p-4 ">
      <div className="flex justify-between items-center ml-0.5">
        <div className="w-[50%] arial-narrow text-[18px]">
          <span>Department Forms</span>
        </div>
        <div className="w-[50%] flex justify-end">
          <button
            onClick={() => setShowAddForm(true)}
            className="prdc-color text-white mr-2 rounded-sm arial-narrow-bold w-35 flex justify-center items-center outline-none duration-[0.5s] ease-in-out transition hover:bg-white hover:text-black hover:(border-black border-[2.5px])"
          >
            <IoAdd className="mr-1 text-[16px] <md:(text-[14px])" />
            Add new Forms
          </button>
          <input
            className="arial-narrow text-[14px] h-8 w-[40%] border border-gray-400 px-1 shadow-sm shadow-gray-600 outline-none"
            onChange={(e) => setSearchData(e.target.value)}
            placeholder="Search. . . ."
          />
          <div className="flex justify-center items-center prdc-color text-white w-8 shadow-sm shadow-gray-600 mr-0.5">
            <BiSearch />
          </div>
        </div>
      </div>
      {/* <div className="flex justify-between items-center">
        <div>
          <span className="text-[18px] text-black arial-narrow-bold">
            Department Forms
          </span>
        </div>

        <div>
          <button onClick={() => setShowAddForm(true)} className="">
            Add new Forms
          </button>

          <input
            type="text"
            placeholder="Search. . ."
            className="arial-narrow text-[14px] h-8 w-[40%] border border-gray-400 px-1 shadow-sm shadow-gray-600 outline-none"
          />
        </div>
        <div className="flex justify-center items-center prdc-color text-white w-8 shadow-sm shadow-gray-600 mr-0.5">
          <BiSearch />
        </div>
      </div> */}

      {view ? (
        <div className="flex mt-7 flex justify-center items-center">
          {formData
            .filter((fil) =>
              searchData == ""
                ? fil.admin_FormStatus == 1 &&
                  fil.admin_Dept == decoded.dept &&
                  fil.admin_FormStatus == 1
                : fil.admin_FormName.includes(searchData) &&
                  fil.admin_FormStatus == 1 &&
                  fil.admin_Dept == decoded.dept &&
                  fil.admin_FormStatus == 1
            )
            .map((data) => (
              <div
                key={data.ID}
                className="h-40 w-40 border border-gray-400 m-2 relative flex flex-col items-center justify-center rounded-sm cursor-pointer duration-[0.5s] hover:(bg-gray-200)"
                onClick={() =>
                  click_form(data.ID, data.admin_FormName, data.admin_FormPath)
                }
              >
                <SiMicrosoftword className="text-[70px] -mt-10 text-blue-900 shadow-md shadow-gray-600" />
                <p className="absolute bottom-0 w-full h-10 flex items-center justify-center arial-narrow-bold bg-blue-900 text-white duration-[0.5s] hover:(bg-blue-800)">
                  {data.admin_FormName}
                </p>
              </div>
            ))}
        </div>
      ) : (
        <>
          <div className="w-full overflow-auto flex justify-center">
            <table className="w-full border-gray-100 border-separate border-spacing-4 arial-narrow-bold">
              <thead>
                <tr className="text-white shadow-sm shadow-gray-800  items-center justify-center prdc-color h-10 w-full">
                  <th className="">NO.</th>
                  <th className="">FORM NAME</th>
                  <th className="">DEPARTMENT</th>
                  <th className="">DATE UPLOADED</th>
                </tr>
              </thead>
              <tbody>
                {formData
                  .filter((fil) =>
                    searchData == ""
                      ? fil.admin_FormStatus == 1 &&
                        fil.admin_Dept == decoded.dept &&
                        fil.admin_FormStatus == 1
                      : fil.admin_FormName.includes(searchData) &&
                        fil.admin_FormStatus == 1 &&
                        fil.admin_Dept == decoded.dept &&
                        fil.admin_FormStatus == 1
                  )
                  .map((data, index) => (
                    <tr
                      className=" border border-black  arial-narrow h-10  text-black cursor-pointer"
                      onClick={() =>
                        click_form(
                          data.ID,
                          data.admin_FormName,
                          data.admin_FormPath
                        )
                      }
                    >
                      <td className="text-center text-[16px]  border-b border-l border-t border-b-black border-t-black border-l-black text-left arial-narrow text-black">
                        {index + 1}
                      </td>
                      <td className=" text-center text-[16px] arial-narrow  border-b border-t border-b-black border-t-black text-black">
                        {data.admin_FormName}
                      </td>
                      <td className="text-center text-[16px] arial-narrow  border-b border-t border-b-black border-t-black text-black">
                        {data.admin_Dept}
                      </td>
                      <td className="text-center text-[16px] arial-narrow border-b border-t border-b-black border-t-black border-r border-black">
                        {moment(data.updatedAt).format("MMMM DD, YYYY")}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {showConfirmation && (
        <AnimatePresence>
          <FormConfirmation
            passingData={passingData}
            setShowConfirmation={setShowConfirmation}
            setPassingData={setPassingData}
          />
        </AnimatePresence>
      )}
      {showAddForm && (
        <AnimatePresence>
          <FormAdd setShowAddForm={setShowAddForm} />
        </AnimatePresence>
      )}
      <div className="absolute bottom-5 right-5">
        <div className="flex justify-end">
          <BiSortAlt2
            onClick={() => setSort(!sort)}
            className="h-7 w-7 transition ease-in-out delay-[0.1s] hover:(text-yellow-500 cursor-pointer)"
          />
          <BsList
            onClick={() => setView(false)}
            className="ml-2 h-7 w-7 transition ease-in-out delay-[0.1s] hover:(text-yellow-500 cursor-pointer)"
          />
          <HiViewGrid
            onClick={() => setView(true)}
            className="ml-2 h-7 w-7 transition ease-in-out delay-[0.1s] hover:(text-yellow-500 cursor-pointer)"
          />
        </div>
      </div>
    </div>
  );
};

export default Forms;
