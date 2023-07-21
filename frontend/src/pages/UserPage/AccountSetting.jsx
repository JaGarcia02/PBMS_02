import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwt from "jwt-decode";
import Navbar from "../../components/Navbar";
import { AnimatePresence, motion } from "framer-motion";
import { AiFillCloseCircle } from "react-icons/ai";
import { FcLock } from "react-icons/fc";
import axios from "axios";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL_ADMIN, API_URL_USER } from "../../utils/Url";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import { change_password_auth } from "../../features/user/userSlice";

const AccountSetting = () => {
  const [changedEmail, setChangeEmail] = useState("");
  const [changedPassword, setChangePassword] = useState("");
  const [ExPassword, setExPassword] = useState("");
  const [error, setError] = useState("");
  const [userCredential, setUserCredential] = useState(null);
  const [chosenTab, setChosenTab] = useState(1);
  const [exLogin, setExLogin] = useState(false);
  const [location, setLocation] = useState({});
  const [showSubMenu, setShowSubMenu] = useState(false);

  const { user, isSuccessUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user !== undefined || user !== null) {
      setUserCredential(jwt(user));
    }

    const getData = async () => {
      const res = await axios.get("https://ipapi.co/json/");
      setLocation({ country: res.data.country_name, city: res.data.city });
    };
    getData();
  }, []);

  console.log(location);

  const saveChanges = () => {
    axios
      .post(API_URL_USER + "login-user", {
        username: userCredential?.username,
        password: ExPassword,
      })
      .then((res) => {
        if (chosenTab === 1) {
          console.log("Password Changed");
        }
        if (chosenTab === 2) {
          dispatch(
            change_password_auth({
              newPassword: changedPassword,
              ID: userCredential?.id,
              username: userCredential?.username,
              role: userCredential?.role,
              country: location?.country,
              city: location?.city,
              email: userCredential?.email,
            })
          );

          setExLogin(false);
        }
      })
      .catch((error) => setError(error.response.data.message));
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="h-15 flex w-full" />
      <div className="flex w-full h-full ">
        <div
          className={`flex-[0.2] items-center flex flex-col border-r bg-white transition-all duration-200  border-r-gray-300 dark:(bg-gray-900) ${
            showSubMenu
              ? "<md:(fixed left-[0%]  z-40 h-full )"
              : "<md:(fixed left-[-12rem] flex items-center z-40 h-full )"
          }`}
        >
          {showSubMenu ? (
            <BsFillArrowLeftCircleFill
              className="hidden absolute right-[-18px] text-blue-900 hover:(text-red-600) cursor-pointer bottom-45 text-[30px] <md:(block)"
              onClick={() => setShowSubMenu(!showSubMenu)}
            />
          ) : (
            <BsFillArrowRightCircleFill
              className="hidden absolute right-[-18px] text-blue-900 hover:(text-red-600) cursor-pointer bottom-45 text-[30px] <md:(block)"
              onClick={() => setShowSubMenu(!showSubMenu)}
            />
          )}

          <span className="mt-8 w-full ml-4 text-black arial-narrow-bold text-[30px] dark:(text-white)">
            Account Setting
          </span>
          <div className="flex flex-col mt-8  w-full">
            <span
              className={`text-[18px] flex items-center h-10 pl-6 cursor-pointer dark:(text-white) hover:(bg-green-500) ${
                chosenTab === 1 && "bg-green-400"
              } mt-1 arial-narrow text-black`}
              onClick={() => setChosenTab(1)}
            >
              Email Setting
            </span>
            <span
              className={`text-[18px] flex items-center h-10 mt-7 cursor-pointer dark:(text-white) hover:(bg-green-500) ${
                chosenTab === 2 && "bg-green-400"
              } pl-6 arial-narrow text-black`}
              onClick={() => setChosenTab(2)}
            >
              Password Setting
            </span>
          </div>
        </div>
        <div className="flex-[0.9] dark:(bg-gray-900) <md:(flex-1)">
          {chosenTab === 1 && (
            <>
              <form
                className="flex items-center flex-col justify-center text-black h-full w-full"
                onSubmit={(e) => {
                  e.preventDefault();
                  setExLogin(true);
                }}
              >
                <span className="font-bold text-[30px] dark:(text-white)">
                  Email Settings
                </span>
                <input
                  className="mt-9 border-t w-[30%] rounded-sm border-t-gray-400 shadow-sm shadow-gray-800 <md:(w-60) focus:(outline-none)"
                  type="email"
                  defaultValue={userCredential?.email ?? ""}
                  required
                  onChange={(e) => setChangeEmail(e.target.value)}
                />
                <button
                  className="mt-5 bg-green-500 w-[20%] hover:(bg-green-400 border-green-400) <md:(w-50 mt-10) focus:(outline-none)"
                  type="submit"
                >
                  Save Changes
                </button>
              </form>
              <AnimatePresence>
                {exLogin && (
                  <motion.div className="fixed h-full w-full z-20 top-0 left-0 bg-black bg-opacity-50 flex items-center z-90 justify-center">
                    <motion.div
                      className="absolute h-60 flex w-120 z-50 rounded-md bg-white shadow-white shadow-sm flex-col items-center dark:(bg-slate-900 text-white) <md:(w-full h-full rounded-none)"
                      initial={{
                        scale: 0,
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      animate={{
                        scale: 1,
                      }}
                      exit={{ scale: 0 }}
                    >
                      <div className="w-full h-full relative flex justify-center items-center flex-col">
                        <AiFillCloseCircle
                          className="absolute right-1 top-1 text-[20px] text-red-600 cursor-pointer hover:(text-red-400)"
                          onClick={() => {
                            setExLogin(false);
                            setError("");
                          }}
                        />
                        <FcLock className="text-[50px] " />
                        <span className="arial-narrow text-[20px] text-black mt-4 ">
                          Please enter your current password for confirmation
                        </span>
                        <input
                          className="shadow-sm shadow-gray-700 rounded-sm mt-4 border-t border-t-gray-400 focus:(outline-none)"
                          type="password"
                          onChange={(e) => setExPassword(e.target.value)}
                        />
                        <button
                          className="mt-4 bg-green-500 w-[25%] hover:(border-green-300 bg-green-300)  focus:(outline-none)"
                          onClick={saveChanges}
                        >
                          Submit
                        </button>
                        {error && (
                          <span className="text-red-600 absolute bottom-1 arial-narrow font-bold">
                            {error}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
          {chosenTab === 2 && (
            <>
              <form
                className="flex items-center flex-col justify-center text-black h-full w-full relative"
                onSubmit={(e) => {
                  e.preventDefault();
                  setExLogin(true);
                }}
              >
                <span className="font-bold text-[30px] dark:(text-white)">
                  Password Settings
                </span>
                <input
                  className="mt-9 border-t w-[30%] rounded-sm border-t-gray-400 shadow-sm shadow-gray-800 <md:(w-60) focus:(outline-none)"
                  type="password"
                  required
                  minLength="8"
                  onChange={(e) => setChangePassword(e.target.value)}
                />
                <button
                  className="mt-5 bg-green-500 w-[20%] hover:(bg-green-400 border-green-400) <md:(w-50 mt-10) focus:(outline-none)"
                  type="submit"
                >
                  Save Changes
                </button>
              </form>
              <AnimatePresence>
                {exLogin && (
                  <motion.div className="fixed h-full w-full z-70 top-0 left-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <motion.div
                      className="absolute h-60 flex w-120 z-50 rounded-md bg-white shadow-white shadow-sm flex-col items-center dark:(bg-slate-900 text-white) <md:(w-full h-full rounded-none)"
                      initial={{
                        scale: 0,
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      animate={{
                        scale: 1,
                      }}
                      exit={{ scale: 0 }}
                    >
                      <div className="w-full h-full relative flex justify-center items-center flex-col">
                        <AiFillCloseCircle
                          className="absolute right-1 top-1 text-[20px] text-red-600 cursor-pointer hover:(text-red-400) <md:(text-[40px] right-3 top-3)"
                          onClick={() => {
                            setExLogin(false);
                            setError("");
                          }}
                        />
                        <FcLock className="text-[50px] " />
                        <span className="arial-narrow text-[20px] text-black mt-4 dark:(text-white)">
                          Please enter your current password for confirmation
                        </span>
                        <input
                          className="shadow-sm shadow-gray-700 rounded-sm mt-4 border-t border-t-gray-400 focus:(outline-none)"
                          type="password"
                          onChange={(e) => setExPassword(e.target.value)}
                        />
                        <button
                          className="mt-4 bg-green-500 w-[25%] hover:(border-green-300 bg-green-300) focus:(outline-none)"
                          onClick={saveChanges}
                        >
                          Submit
                        </button>
                        {error && (
                          <span className="text-red-600 absolute bottom-1 arial-narrow font-bold">
                            {error}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default AccountSetting;
