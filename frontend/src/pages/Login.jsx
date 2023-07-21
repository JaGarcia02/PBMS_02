import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import { AiOutlineArrowRight } from "react-icons/ai";
import Lottie from "lottie-react";
import spinner from "../lottieFiles/spinner.json";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import useLocalStorage from "../Hooks/useLocalStorage";
import { login_user } from "../features/user/userSlice";
import axios from "axios";
import dotdotdot from "../lottieFiles/three_dot.json";
import { FaUserAlt, FaLock, FaEyeSlash } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";
import { getBrand } from "../features/branding/brandingSlice";
import { API_URL } from "../utils/Url";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { BiShow, BiHide } from "react-icons/bi";
import { GrFormViewHide } from "react-icons/gr";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const { user, isLoadingUser, isSuccessUser, isErrorUser, messageUser } =
    useSelector((state) => state.user);
  const { branding } = useSelector((state) => state.branding);

  const { username, password } = formData;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* useEffect(() => {
    if (isErrorUser) {
      setError(messageUser);
    }
    if (isSuccessUser || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isErrorUser, isSuccessUser, messageUser, navigate, dispatch]);*/
  const userChannel = new BroadcastChannel("user");

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username,
      password,
    };

    userChannel.postMessage({
      payload: {
        type: "SIGN_IN_USER",
      },
    });

    dispatch(login_user(userData));
  };
  //  ================================================================================================
  // useEffect(() => {
  //   userChannel.onmessage = (data) => {
  //     if (data.data.payload.type === "SIGN_IN_USER") {
  //       navigate("/dashboard");
  //       window.location.reload();
  //     }
  //   };
  // }, [handleSubmit]);
  //  ================================================================================================
  return (
    <div className="h-screen w-screen  bg-gray-100 flex items-center justify-center">
      <form
        className="h-[450px] relative w-90 shadow-lg bg-white shadow-gray-500 rounded-lg flex flex-col text-black items-center justify-start <md:(h-full rounded-none border-none)"
        onSubmit={handleSubmit}
      >
        {/* <div className="flex-[0.7] flex h-full w-full bg-black relative items-center justify-center <md:(hidden)">
          <img src="/imgs/PRDC.jpg" className="object-cover h-full w-full " />
          <span className="absolute text-emerald-500 text-[70px] font-Anton text-center z-4"> */}
        {/*Your Business&nbsp;<p className="text-red-600">Our Core</p>*/}
        {/* </span>
        </div> */}
        <div className="flex-[0.3] bg-white flex flex-col h-full items-center justify-center relative dark:(bg-black/60) <md:(flex-1)">
          <img
            src={
              branding ? API_URL + branding[0]?.Logo : "/imgs/deafult_logo.jpg"
            }
            className=" h-20 w-20 mb-7 object-contain mt-7"
          />

          {/* =============================================================================== || USER || =============================================================================== */}
          <div className="items-center justify-center flex invisible">
            <h2 className="arial-narrow-bold text-[30px] text-light-50">
              User
            </h2>
          </div>
          {/* =============================================================================== || USER || =============================================================================== */}

          {/* ============================================================================================= || DropDown || ============================================================================================= */}
          {/* <div className="items-center justify-center flex mb-4 rounded-sm border w-41">
            <select
              className="w-40 h-6 border-black txt bg-transparentdge"
              onChange={(e) => whenChanged(e.target.val)}
            >
              <option value="user" className="" selected>
                Login as User
              </option>
              <option value="administrator" className="">
                Login as Admin
              </option>
            </select>
          </div> */}
          {/* ============================================================================================= || DropDown || ============================================================================================= */}

          <div className="flex items-center justify-center mt-5">
            <FaUserAlt className="text-[25px] mr-2" />
            <input
              className="bg-white w-60 border border-black rounded-sm p-1 shadow-sm shadow-gray-500 placeholder-gray-600 "
              name="username"
              placeholder="Username"
              value={username}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-center mt-8 ">
            <FaLock className="text-[25px] mr-2 " />
            <input
              className="bg-white w-60 border border-black p-1 rounded-sm shadow-sm shadow-gray-500  placeholder-gray-600"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
            />

            {showPassword ? (
              <BiShow
                className="absolute right-1 bg-white h-7 w-5.5 cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <GrFormViewHide
                className="absolute right-1 bg-white h-7 w-5.5 cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>

          <div className="text-[12px] w-full flex items-center justify-evenly px-5 mt-5">
            <div className="items-center flex mr-5">
              <input type="checkbox" className="h-[12px] mr-1" />
              <span>Remember me</span>
            </div>
            <Link to="/forgot-password">
              <span className="ml-6">Forgot Password?</span>
            </Link>
          </div>
        </div>
        {/* 
          {isErrorUser && (
            <div className="bg-red-800 text-white rounded-md absolute bottom-22 w-auto h-8 flex items-center justify-center p-1 arial-narrow-bold">
              <MdOutlineError className="mr-2" /> {messageAdmin}
            </div>
          )}

          <button
            type="submit"
            className=" flex items-center justify-center mt-18 bg-gray-900 text-white w-40 rounded-2xl arial-narrow-bold"
            disabled={messageUser}
          >
            {isLoadingUser ? (
              <Lottie
                animationData={dotdotdot}
                loop={true}
                className=" mt-2 "
              />
            ) : (
              "LOG IN"
            )}
          </button> */}

        {messageUser && (
          <span className="bg-red-800 text-white rounded-md absolute bottom-22 w-40 justify-center h-8 flex items-center">
            {messageUser}
          </span>
        )}

        <button
          className="flex items-center justify-center mt-15 bg-gray-900 text-white w-40 rounded-2xl arial-narrow-bold active:scale-1 active:duration-75 transition-all hover:scale-108 ease-in-out transform py-1 rounded-xl hover:bg-blue-900 hover:rounded-md"
          type="submit"
        >
          {isLoadingUser ? (
            <Lottie animationData={dotdotdot} loop={true} className="  " />
          ) : (
            "LOG IN"
          )}
        </button>

        <span className="absolute bottom-0 arial-narrow text-[12px] pb-1">
          ©2022 PESO RESOURCE DEVELOPMENT CORP.
        </span>
      </form>
      {/* <button class="w-40 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg">
        Button
      </button> */}
    </div>
  );
};

export default Login;
