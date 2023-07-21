import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/authSlice";
import Lottie from "lottie-react";
import spinner from "../../lottieFiles/spinner_red.json";
import dotdotdot from "../../lottieFiles/three_dot.json";
import { MdOutlineError } from "react-icons/md";
import { useEffect } from "react";
import { getBrand } from "../../features/branding/brandingSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { API_URL } from "../../utils/Url";
const AdminLogin = () => {
  const dispatch = useDispatch();
  const { branding } = useSelector((state) => state.branding);
  const [loginFields, setLoginFields] = useState({
    username: "",
    password: "",
  });
  const [text, setText] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBrand());
  }, []);

  const { isLoadingAdmin, isErrorAdmin, messageAdmin } = useSelector(
    (state) => state.auth
  );

  const { username, password } = loginFields;

  const adminLogin = (e) => {
    e.preventDefault();

    const adminData = { username, password };
    dispatch(login(adminData));
  };

  const whenChanges = (e) => {
    setLoginFields((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const whenChanged = (option) => {
    if (option == "administrator") {
      navigate("/administrator");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="h-screen w-screen  bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={adminLogin}
        className="h-[450px] relative w-90 shadow-lg bg-white shadow-gray-500 rounded-lg flex flex-col text-black items-center justify-start"
      >
        <img
          className=" h-20 w-20 mb-7 object-contain  mt-7 "
          src={
            branding ? API_URL + branding[0]?.Logo : "/imgs/deafult_logo.jpg"
          }
        />
        <div className="items-center justify-center flex">
          <h2 className="arial-narrow-bold text-[30px]">Administrator</h2>
        </div>

        {/* ============================================================================================= || DropDown || ============================================================================================= */}
        {/* Log in as Dorpdown */}
        {/* <div className="items-center justify-center flex mb-4 rounded-sm border w-41">
          <select
            className="w-40 h-6 border-black txt bg-transparentdge"
            onChange={(e) => whenChanged(e.target.val)}
          >
            <option value="user" className="">
              Login as User
            </option>
            <option value="administrator" className="" selected>
              Login as Admin
            </option>
          </select>
        </div> */}
        {/* Log in as Dorpdown */}
        {/* ============================================================================================= || DropDown || ============================================================================================= */}

        <div className="flex items-center justify-center mt-5">
          <FaUserAlt className="text-[25px] mr-2" />
          <input
            onChange={whenChanges}
            name="username"
            type="text"
            value={username}
            className="bg-white w-60 border border-black rounded-sm p-1 shadow-sm shadow-gray-500 placeholder-gray-600"
            placeholder="Username "
          />
        </div>
        <div className="flex items-center justify-center mt-8 ">
          <FaLock className="text-[25px] mr-2 " />
          <input
            onChange={whenChanges}
            name="password"
            value={password}
            type="password"
            className="bg-white w-60 border border-black p-1 rounded-sm shadow-sm shadow-gray-500  placeholder-gray-600"
            placeholder="Password"
          />
        </div>
        <div className="text-[12px] w-full flex items-center justify-evenly px-5 mt-5">
          <div className="items-center flex">
            <input type="checkbox" className="h-[12px] mr-1" />
            <span>Remember me</span>
          </div>
          <Link to="/admin-forgot">
            <span className="">Forgot Password?</span>
          </Link>{" "}
        </div>
        {isErrorAdmin && (
          <div className="bg-red-800 text-white rounded-md absolute bottom-22 w-auto h-8 flex items-center justify-center p-1 arial-narrow-bold">
            <MdOutlineError className="mr-2" /> {messageAdmin}
          </div>
        )}

        <button
          type="submit"
          className="flex items-center justify-center mt-15 bg-gray-900 text-white w-40 rounded-2xl arial-narrow-bold active:scale-1 active:duration-75 transition-all hover:scale-108 ease-in-out transform py-1 rounded-xl hover:bg-blue-900 hover:rounded-md"
          disabled={isLoadingAdmin}
        >
          {isLoadingAdmin ? (
            <Lottie animationData={dotdotdot} loop={true} className=" mt-2 " />
          ) : (
            "LOG IN"
          )}
        </button>

        <span className="absolute bottom-0 arial-narrow text-[12px] pb-1">
          ©2022 PESO RESOURCE DEVELOPMENT CORP.
        </span>
      </form>
    </div>
  );
};

export default AdminLogin;
