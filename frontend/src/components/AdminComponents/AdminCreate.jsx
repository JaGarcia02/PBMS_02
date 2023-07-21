import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { ImCross } from "react-icons/im";
import { MdPersonAddAlt1 } from "react-icons/md";
import axios from "axios";
import { API_URL_ADMIN } from "../../utils/Url";
import {
  BsPersonFillDash,
  BsPersonFillLock,
  BsArrowLeftShort,
  BsClockFill,
  BsLockFill,
  BsPersonFillAdd,
} from "react-icons/bs";
import { useSelector } from "react-redux";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminCreate = () => {
  const [showModal, setShowModal] = useState(false);
  const [adminData, setAdminData] = useState([]);

  const { admin } = useSelector((state) => state.auth);

  // Notify Delete
  const notify_Delete = () => {
    toast.error("Admin Successfully Deleted", {
      position: "bottom-right",
      hideProgressBar: true,
      autoClose: 3000,
      pauseOnHover: false,
      theme: "colored",
    });
  };
  // Notify Email is existing
  const notify_EmailExist = () => {
    toast.info("Email is already in use!", {
      position: "bottom-right",
      hideProgressBar: true,
      autoClose: 3000,
      pauseOnHover: false,
      theme: "colored",
    });
  };
  // Notify Create
  const notify_Create = () => {
    toast.success("Admin Successfully Created", {
      position: "bottom-right",
      hideProgressBar: true,
      autoClose: 3000,
      pauseOnHover: false,
      theme: "colored",
    });
  };
  // Notify Passwrod not match
  const notify_WrongPassword = () => {
    toast.warn("Password didn't match", {
      position: "bottom-right",
      hideProgressBar: true,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  useEffect(() => {
    axios
      .get(API_URL_ADMIN + "get-admin")
      .then((res) => setAdminData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const deleteGlobal = (ID) => {
    const config = {
      headers: {
        Authorization: `Bearer ${admin}`,
      },
    };
    axios
      .delete(API_URL_ADMIN + `remove-admin/${ID}`, config)
      .then((res) => {
        notify_Delete();
        setAdminData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const AddModal = () => {
    const [admin_input, setAdmin_input] = useState({
      name: "",
      username: "",
      password: "",
      role: 1,
      email: "",
      confirm_password: "",
    });

    const create_new_global = (e) => {
      e.preventDefault();
      const data = {
        name: admin_input.name,
        username: admin_input.username,
        password: admin_input.password,
        role: admin_input.role,
        email: admin_input.email,
      };
      if (admin_input.password == admin_input.confirm_password) {
        axios
          .post(API_URL_ADMIN + "create-admin", data)
          .then((res) => {
            notify_Create();
            setShowModal(false);
            setAdminData(res.data);
            // =========================================================================== alert added
          })
          .catch((err) => notify_EmailExist());
      } else {
        // =============================================================================== alert added
        notify_WrongPassword();
        console.log("Password not Match");
      }
    };
    return (
      <motion.div className="w-screen h-screen fixed flex top-0 left-0 items-center justify-center bg-black/50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          exit={{ opacity: 0 }}
          className="w-110 h-114 relative bg-white shadow-md rounded-md"
        >
          <button
            onClick={() => setShowModal(false)}
            className="w-16 h-8 absolute top-2 right-2 flex items-center justify-center text-[12px] text-black border border-black bg-white active:scale-1 active:duration-75 rounded-sm hover:border-[2.5px] hover:border-black"
          >
            <BsArrowLeftShort className="text-[20px] " />
            Back
          </button>
          <div className="w-full h-15 bg-gray-500 flex">
            <span className="arial-narrow-bold text-[22px] mt-4.5 ml-2 text-white">
              CREATE GLOBAL ADMIN
            </span>
          </div>

          <form
            className="h-full p-2 w-full  flex flex-col items-center"
            onSubmit={create_new_global}
          >
            <div className=" flex  mt-7">
              <span className="w-[10rem] inline-block arial-narrow-bold ">
                Name:
              </span>
              <input
                className=" border-black border rounded-sm"
                placeholder="Name"
                required
                onChange={(e) =>
                  setAdmin_input({ ...admin_input, name: e.target.value })
                }
              />
            </div>
            <div className=" flex mt-5">
              <span className="w-[10rem] inline-block arial-narrow-bold ">
                Username:
              </span>
              <input
                className=" border-black border rounded-sm"
                placeholder="Username"
                required
                onChange={(e) =>
                  setAdmin_input({ ...admin_input, username: e.target.value })
                }
              />
            </div>
            <div className=" flex mt-5">
              <span className="w-[10rem] inline-block arial-narrow-bold ">
                Company:
              </span>
              <input
                className=" border-black border  rounded-sm"
                placeholder="Company"
                // required
                // onChange={(e) =>
                //   setAdmin_input({ ...admin_input, username: e.target.value })
                // }
              />
            </div>
            <div className="  flex mt-5">
              <span className="w-[10rem] inline-block arial-narrow-bold ">
                Email:
              </span>
              <input
                className=" border-black border rounded-sm"
                type="email"
                placeholder="example@example.com"
                required
                onChange={(e) =>
                  setAdmin_input({ ...admin_input, email: e.target.value })
                }
              />
            </div>
            <div className="  flex mt-5">
              <span className="w-[10rem] inline-block arial-narrow-bold ">
                Password:
              </span>
              <input
                className=" border-black border rounded-sm"
                placeholder="Password"
                type="password"
                required
                onChange={(e) =>
                  setAdmin_input({ ...admin_input, password: e.target.value })
                }
              />
            </div>
            <div className=" flex mt-5">
              <span className="w-[10rem] inline-block arial-narrow-bold ">
                Confirm Password:
              </span>
              <input
                className="h-6 border-black border rounded-sm"
                placeholder="Confirm Password"
                type="password"
                required
                onChange={(e) =>
                  setAdmin_input({
                    ...admin_input,
                    confirm_password: e.target.value,
                  })
                }
              />
            </div>
            {/* ===================================================================================================================== */}
            <button
              className="ml-23 mt-12 border-green-500  active:scale-1 rounded-sm text-[14px] h-7 w-24 hover:(border-green-500 rounded-sm) active:duration-75 transition-all mb-5 flex items-center justify-center text-green-600   mr-12 disabled:(bg-gray-500 border-gray-500 cursor-not-allowed) hover:(bg-green-500 text-white)  focus:(outline-none) dark:(bg-transparent border-green-500 border-2 text-green-500"
              type="submit"
            >
              <BsPersonFillAdd className="mr-2" />
              Submit
            </button>

            {/* ===================================================================================================================== */}
          </form>
        </motion.div>
      </motion.div>
    );
  };
  return (
    <div className="w-full h-full flex flex-col p-4">
      <span className="text-[32px] arial-narrow-bold text-black">
        Global Admin Account
      </span>
      <p className="text-[15px] arial-narrow mt-1">
        Set user for global admin user. Limited for two (3) users only, one (1)
        primary, and one (2) secondary account user.
      </p>
      <div className=" w-full flex mt-8">
        <button
          onClick={() => setShowModal(true)}
          className="w-40  border-green-500 active:scale-1 rounded-sm text-[14px] h-8  hover:(border-green-500 rounded-sm) active:duration-75 transition-all hover:(ease-in-out rounded-sm bg-green-500 text-white) flex items-center justify-center mr-12 disabled:(bg-gray-500 border-gray-500 cursor-not-allowed)  focus:(outline-none) dark:(bg-transparent border-green-500 border-2 text-green-500"
        >
          <MdPersonAddAlt1 className="mr-2 text-[17px]" />
          Alternative User
        </button>
      </div>

      {/* Notification ================================================================================================================================= */}
      <ToastContainer />
      {/* Notification ================================================================================================================================= */}

      <table className="w-full mt-1 item-center justify-center flex flex-col">
        <tr className=" arial-narrow-bold  flex border-b border-black mt-5 text-[15px]">
          <th className="w-50 arial-narrow-bold text-black   text-left text-[15px]">
            No.
          </th>

          <th className="w-110 arial-narrow-bold text-black text-left text-[15px]">
            Full Name
          </th>

          <th className="w-110 arial-narrow-bold text-black  text-left text-[15px]">
            Email
          </th>

          <th className="w-120 arial-narrow-bold text-black text-left text-[15px]">
            Company
          </th>

          <th className="arial-narrow-bold w-110 text-[15px]  text-black text-left">
            UserName
          </th>

          <th className="arial-narrow-bold w-90 text-[15px]  text-black text-left">
            Action
          </th>
          <th></th>
        </tr>
        {adminData.map((data, index) => {
          return (
            <tr className="w-full items-center h-full justify-center border-b border-black flex">
              <td className="border-black w-50  items-center justify-start flex   text-[14px] text-black ">
                {index + 1}
              </td>
              <td className=" w-110 text-left   text-[14px] arial-narrow  ">
                <div className="flex">
                  <span className="bg-yellow-500 text-black flex items-center justify-center text-center ml-4 h-7 w-7 p-1 rounded-full  font-Roboto text-[18px] text-white">
                    {data.Admin_name.charAt(0).toUpperCase()}
                  </span>
                  <span className="mt-1.5 ml-2">{data.Admin_name}</span>
                </div>
              </td>
              <td className="w-110 text-[14px]   text-black text-left border-black arial-narrow ]">
                {data.email}
              </td>
              <td className="w-120 text-[13px]   text-black text-left border-black  arial-narrow">
                Peso Resource Development Corp.
              </td>
              <td className="w-110 text-[13px]   text-black border-black text-left arial-narrow">
                {data.Admin_username}
              </td>

              <td className=" w-90  h-8">
                <div className="flex">
                  <button
                    className="w-6 h-6 flex items-center  mt-0.5 mr-1 border-none justify-center text-[16px] text-black "
                    onClick={() => {
                      deleteGlobal(data.ID);
                    }}
                    // onClick={notify}
                  >
                    <BsLockFill className="" />
                  </button>
                  <button
                    className="w-6 h-6 flex items-center rounded-full mt-0.5 mr-1  justify-center text-[16px] text-red-500 border-red-500 border-[2.5px] active:scale-1 active:duration-75 transition-all hover:bg-red-500 hover:text-white hover:border-red-500"
                    onClick={() => {
                      deleteGlobal(data.ID);
                    }}
                    // onClick={notify}
                  >
                    <BsPersonFillDash className="" />
                  </button>
                  <button
                    className="w-6 h-6 flex items-center rounded-full mt-0.5 mr-1 justify-center text-[16px] text-black border-black border-[2.5px] active:scale-1 active:duration-75 transition-all hover:bg-black hover:text-white hover:border-black"
                    // onClick={() => {
                    //   deleteGlobal(data.ID);
                    // }}
                    // onClick={notify}
                  >
                    <BsPersonFillLock className="" />
                  </button>
                  <button
                    className="w-6 h-6 flex items-center rounded-full mt-0.5 justify-center text-[16px] text-gray-500 border-gray-500 border-[2.5px] active:scale-1 active:duration-75 transition-all hover:bg-gray-500 hover:text-white hover:border-gray-500"
                    // onClick={() => {
                    //   deleteGlobal(data.ID);
                    // }}
                    // onClick={notify}
                  >
                    <BsClockFill className="" />
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </table>
      <AnimatePresence>{showModal && <AddModal />}</AnimatePresence>
    </div>
  );
};

export default AdminCreate;
