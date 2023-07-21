import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL_ADMIN, API_URL_HR } from "../../utils/Url";
import { motion } from "framer-motion";
import { AiFillCloseCircle } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BsPersonFillDash,
  BsPersonFillLock,
  BsArrowLeftShort,
  BsPersonFillAdd,
  BsPersonAdd,
  BsPersonDash,
} from "react-icons/bs";
import { IoPaperPlaneOutline } from "react-icons/io5";
const AddAdminOfficer = () => {
  const [officers, setOfficers] = useState([]);
  const [autoFilledData, setAutoFilledData] = useState([]);
  const [showRegister, setShowRegister] = useState(false);
  const [onHover, setOnHover] = useState(0);

  // Notify Add Officer
  const notify_AddOfficer = () => {
    toast.success("Officer Added", {
      position: "bottom-right",
      hideProgressBar: true,
      autoClose: 3000,
      pauseOnHover: false,
      theme: "colored",
    });
  };
  // Notify Remove Officer
  const notify_RemoveOfficer = () => {
    toast.error("Officer Removed", {
      position: "bottom-right",
      hideProgressBar: true,
      autoClose: 3000,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  useEffect(() => {
    axios
      .get(API_URL_ADMIN + "getOfficers")
      .then((res) => setOfficers(res.data))
      .catch((err) => console.log(err));

    axios
      .get(API_URL_HR + "get-employee-list/?q=")
      .then((res) => setAutoFilledData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const removeOfficer = (data) => {
    axios
      .get(API_URL_ADMIN + "remove/" + data)
      .then((res) => {
        notify_RemoveOfficer();
        setOfficers(res.data);
      })
      .catch((err) => console.log(err));
  };

  function Phone_number_format(text) {
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

  const AddOfficer = ({ autoFilledData }) => {
    const [officerForm, setOfficerForm] = useState({
      Name: "",
      Position: "",
      Address: "",
      Contact_num: "",
    });

    // const handleChange = (e) => {
    //   setOfficerForm((prev) => ({
    //     ...prev,
    //     [e.target.name]: e.target.value,
    //   }));
    // };

    const { Name, Position, Address, Contact_num } = officerForm;

    const submitOfficer = (e) => {
      e.preventDefault();
      axios
        .post(API_URL_ADMIN + "setOfficer", officerForm)
        .then((res) => {
          setOfficers(res.data);
          setShowRegister(false);
          notify_AddOfficer();
        })
        .catch((err) => console.log(err));
    };

    const onChangeData = (e) => {
      const dataPicked = autoFilledData
        .filter((filter) => filter.Employee_ID == e.target.value)
        .map((data) => {
          return (
            data.Employee_FirstName +
            " " +
            data.Employee_MiddleName +
            " " +
            data.Employee_LastName
          );
        })
        .toString();

      const dataPickedPosition = autoFilledData.filter(
        (filter) => filter.Employee_ID == e.target.value
      )[0]?.Employee_JobDesc;

      setOfficerForm({
        ...officerForm,
        Name: dataPicked ? dataPicked : e.target.value,
        Position: dataPickedPosition ? dataPickedPosition : "",
      });
    };

    console.log(officerForm.Name);

    return (
      <div className="flex w-screen h-screen  bg-black/50 fixed top-0  !left-0 z-120 items-center justify-center">
        <motion.div
          className="absolute flex flex-col items-center justify-center h-90 w-100  rounded-md bg-white"
          initial={{
            scale: 0,
          }}
          animate={{
            scale: 1,
          }}
        >
          <form
            className="flex flex-col w-full h-full p-2"
            onSubmit={submitOfficer}
          >
            <div className="flex w-full justify-between">
              <span className="text-black arial-narrow-bold text-[20px] mt-5">
                Key Officer Registration
              </span>
              <button
                onClick={() => setShowRegister(false)}
                className="w-18 h-8 absolute top-1 right-1 pr-2 flex items-center justify-center text-[80%]   mr-3 shadow-sm text-black   border border-black active:scale-1 active:duration-75 transition-all hover:scale-108 ease-in-out  transform py-1 rounded-sm hover:rounded-sm hover:border-black "
              >
                <BsArrowLeftShort className=" text-[20px] cursor-pointer text-black hover:(text-black ) <md:(text-[50px])" />{" "}
                Back
              </button>
            </div>
            <div className="flex mt-6 h-4 mb-4">
              <span className=" inline-block ml-2 w-[6rem] arial-narrow text-black">
                Name
              </span>
              <input
                className="w-60 border h-7 border-black rounded-md bg-white focus:(outline-none)"
                name="Name"
                onChange={onChangeData}
                list="NameOfficer"
                required
                autoComplete="off"
                value={officerForm.Name}
              />
              <datalist id="NameOfficer">
                {autoFilledData
                  .filter(
                    (filter) =>
                      filter.Employee_Position == "Rank and File" ||
                      filter.Employee_Position == "Admin" ||
                      filter.Employee_Position == "Executive"
                  )
                  .map((dataRes) => (
                    <option value={dataRes.Employee_ID}>
                      {dataRes.Employee_FirstName +
                        " " +
                        dataRes.Employee_MiddleName +
                        " " +
                        dataRes.Employee_LastName}
                    </option>
                  ))}
              </datalist>
            </div>
            <div className="flex mt-6 h-4 mb-4">
              <span className=" inline-block ml-2 w-[6rem] arial-narrow text-black">
                Position
              </span>
              <input
                className="w-60 border h-7 border-black rounded-md bg-white focus:(outline-none)"
                name="Position"
                onChange={(e) =>
                  setOfficerForm({ ...officerForm, Position: e.target.value })
                }
                value={officerForm.Position}
                required
              />
            </div>
            <div className="flex mt-6 h-4 mb-4">
              <span className=" inline-block ml-2 w-[6rem] arial-narrow text-black">
                Address
              </span>
              <input
                className="w-60 border h-7 border-black rounded-md bg-white focus:(outline-none)"
                name="Address"
                onChange={(e) =>
                  setOfficerForm({ ...officerForm, Address: e.target.value })
                }
                required
              />
            </div>
            <div className="flex mt-6 h-4">
              <span className=" inline-block ml-2 w-[6rem] arial-narrow text-black">
                Contact #
              </span>
              <input
                type="text"
                className="w-60 border h-7 border-black rounded-md bg-white focus:(outline-none)"
                name="Contact_num"
                value={Contact_num}
                onChange={(e) =>
                  setOfficerForm({
                    ...officerForm,
                    Contact_num: Phone_number_format(e.target.value),
                  })
                }
                required
                maxLength={13}
                onInput={(e) => {
                  if (e.target.value.length > e.target.maxLength)
                    e.target.value = e.target.value.slice(
                      0,
                      e.target.maxLength
                    );
                }}
              />
            </div>
            <div className="w-full flex mt-9 items-center justify-center">
              <button
                className=" border-green-500 ml-18  active:scale-1 rounded-sm text-[14px] h-7 w-24 hover:(border-green-500 rounded-sm) active:duration-75 transition-all hover:(scale-108 ease-in-out  transform py-1 rounded-sm)  mb-5 flex items-center justify-center text-green-600   mr-12 disabled:(bg-gray-500 border-gray-500 cursor-not-allowed)  focus:(outline-none) dark:(bg-transparent border-green-500 border-2 text-green-500"
                type="submit"
              >
                <IoPaperPlaneOutline className="mr-2 text-green-600" />
                Submit
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex">
        <span className="arial-narrow-bold p-3 text-[20px] text-black ">
          Key Officer
        </span>
      </div>

      <div className="w-full px-3 flex mt-5">
        <table className="w-full border-collapse mb-4">
          <thead>
            <tr>
              <th className="text-left">Name</th>
              <th className="text-left">Position</th>
              <th className="text-left">Address</th>
              <th className="text-left">Contact #</th>
              <th className="text-left w-30"></th>
            </tr>
          </thead>
          <tbody>
            {officers.map((data) => (
              <tr
                key={data.id}
                className="border border-gray-400"
                onMouseEnter={() => setOnHover(data.id)}
                onMouseLeave={() => setOnHover(null)}
              >
                <td>{data.Name}</td>
                <td>{data.Position}</td>
                <td>{data.Address}</td>
                <td>{data.Contact_num}</td>
                {data.id == onHover && (
                  <td className="flex w-full justify-end">
                    <button
                      onClick={() => setShowRegister(true)}
                      className="active:scale-1 mr-1 rounded-sm text-[20px] h-7 w-10 hover:(border-green-500 rounded-sm) active:duration-75 transition-all hover:(scale-108 ease-in-out  transform py-1 rounded-sm) flex items-center justify-center text-green-600 disabled:(bg-gray-500 border-gray-500 cursor-not-allowed)  focus:(outline-none) "
                    >
                      <BsPersonAdd className="mr-1 text-green-600" />
                    </button>
                    <button
                      className="active:scale-1 rounded-sm text-[20px] h-7 w-10 hover:(border-red-500 rounded-sm) active:duration-75 transition-all hover:(scale-108 ease-in-out  transform py-1 rounded-sm) flex items-center justify-center text-red-600 disabled:(bg-gray-500 border-gray-500 cursor-not-allowed)  focus:(outline-none) "
                      onClick={() => removeOfficer(data.id)}
                    >
                      <BsPersonDash className="mr-1 text-red-600" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
            {officers.length === 0 && (
              <tr>
                <td>
                  <button
                    className="bg-green-500 w-7 mr-1 text-[18px] h-7"
                    onClick={() => setShowRegister(true)}
                  >
                    +
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer />
      {showRegister && <AddOfficer autoFilledData={autoFilledData} />}
    </div>
  );
};

export default AddAdminOfficer;
