import React, { useEffect, useState, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkToken } from "../features/user/userSlice";
import moment from "moment";
import {
  IoMdNotificationsOutline,
  IoMdClose,
  IoMdArrowDropdown,
} from "react-icons/io";
import { IoBriefcaseOutline, IoSettingsSharp } from "react-icons/io5";
import { MdOutlineMail, MdOutlineArrowBackIosNew } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { IoNewspaperOutline } from "react-icons/io5";
import { CgMenuGridR, CgGlobeAlt } from "react-icons/cg";
import { HiNewspaper, HiSun } from "react-icons/hi";
import {
  BsFillFileEarmarkBarGraphFill,
  BsFileBarGraphFill,
  BsMoonFill,
  BsCircleFill,
} from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineDocumentChartBar } from "react-icons/hi2";
import { BiLogOut } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, redirect } from "react-router-dom";
import jwt from "jwt-decode";
import { RiGlobalLine } from "react-icons/ri";
import Switch from "../Switch/Switch";
import { logout_user, reset } from "../features/user/userSlice";
import { useIdleTimer } from "react-idle-timer";
import { API_URL, API_URL_USER } from "../utils/Url";
import axios from "axios";
import withClickOutside from "../utils/withClickedOutside";

const Navbar = forwardRef(({ open, setOpen }, ref) => {
  const [admin, setAdmin] = useState(null);
  const [time, setTime] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [transaction, setTransaction] = useState(false);
  const [toggleAdmin, setToggleAdmin] = useState(false);
  const dispatch = useDispatch();
  const [userNotification, setUserNotification] = useState([]);

  const { branding } = useSelector((state) => state.branding);

  const onIdle = () => {
    dispatch(logout_user(decodedToken?.employeeId));
    dispatch(reset());

    userChannel.postMessage({
      payload: {
        type: "SIGN_OUT_USER",
      },
    });
    redirect("/");
  };

  const { getRemainingTime } = useIdleTimer({
    onIdle,
    timeout: 900_000,
    throttle: 500,
    crossTab: true,
    syncTimers: 200,
  });

  const userChannel = new BroadcastChannel("user");

  const { user, isLoadingUser, isSuccessUser, isErrorUser, messageUser } =
    useSelector((state) => state.user);

  const decodedToken = jwt(user);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format("MMMM DD, YYYY  hh:mm A"));
      dispatch(checkToken(user));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setAdmin(jwt(user));

    axios
      .get(API_URL_USER + `get-notif/${decodedToken.role}/${decodedToken.dept}`)
      .then((res) => setUserNotification(res.data))
      .catch((err) => console.log(err));
  }, []);

  //LOGOUT FUNCTION
  const handleLogout = () => {
    dispatch(logout_user(decodedToken?.employeeId));
    dispatch(reset());

    userChannel.postMessage({
      payload: {
        type: "SIGN_OUT_USER",
      },
    });
    redirect("/");
    localStorage.setItem("theme", "light");
  };

  //FUNCTIONS THAT LOGOUTS THE OTHER TABS
  useEffect(() => {
    userChannel.onmessage = (data) => {
      if (data.data.payload.type === "SIGN_OUT_USER") {
        dispatch(logout_user(decodedToken?.employeeId));
        dispatch(reset());
      }
      console.log(data);
      window.location.reload();
      redirect("/");
      userChannel.close();
    };
  }, [handleLogout]);

  const section_data = admin?.section.split(",");

  const SuccessModal = ({ userNotification }) => {
    return (
      <div
        id="clickbox"
        className="w-100 absolute right-5  overflow-auto text-black  rounded-xl top-15 h-130 backg-color-prdc shadow-xl shadow-gray-500 rounded-sm"
      >
        <div className="flex flex-col m-3 ">
          <span className="text-[30px] arial-narrow-bold  ml- my-3">
            Notification
          </span>
          {userNotification.map((data) => {
            return (
              <div onClick={() => click_notif(data.ID)}>
                <Link to={data.user_notif_link}>
                  <div className="h-20 mt-1 bg-color-prdc shadow-md shadow-gray-800 rounded-xl flex-col flex items-center justify-center">
                    <div className="mr-24">{data.user_notif_desc}</div>{" "}
                    <div>
                      <span className="mr-60 text-[10px]">
                        {moment(data.createdAt).fromNow()}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        className="fixed w-screen h-15 prdc-color  flex  items-center justify-between z-50 <md:(px-3)"
        ref={ref}
      >
        <GiHamburgerMenu
          className="text-white text-[20px] hidden cursor-pointer <md:(flex)"
          onClick={() => setShowMenu(true)}
        />
        <div className="flex h-full items-center <md:(hidden)">
          <img
            src={
              branding ? API_URL + branding[0]?.Logo : "/imgs/deafult_logo.jpg"
            }
            className="h-full px-4 py-1 mr-5"
          />
          <Link
            to={decodedToken.dept == "HR" ? "/hr-dashboard" : ""}
            reloadDocument
          >
            <div className="text-white text-[22px] mr-10 ml-4 flex-col flex h-8 w-8 rounded-md items-center cursor-pointer justify-center hover:( text-yellow-400) group">
              <RxDashboard />
              <span className="text-[12px] absolute bottom-1 hidden group-hover:flex">
                Dashboard
              </span>
            </div>
          </Link>

          {/* <a className="" href="/menu">
            <div className="text-white text-[20px] mr-7 ml-4 flex-col flex h-8 w-8 rounded-md items-center cursor-pointer justify-center hover:( text-yellow-400) group">
              <CgMenuGridR />
              <span className="text-[12px] absolute bottom-1 hidden group-hover:flex">
                Menu
              </span>
            </div>
          </a> */}
          {/* <Link to="/menu"> */}
          <div
            onMouseOver={() => setTransaction(true)}
            onMouseOut={() => setTransaction(false)}
            className="text-white text-[20px] mr-7 ml-4 flex-col flex h-8 w-8 rounded-md items-center cursor-pointer justify-center hover:( text-yellow-400) group"
          >
            <IoNewspaperOutline />
            <span className="text-[12px] absolute bottom-1 hidden hover:bg-transparent group-hover:flex ">
              Transaction
            </span>
            {transaction && (
              <>
                <div className="z-50 bg-gray-600 w-40 overflow-auto rounded-md absolute left-30 top-14 flex flex-col text-center z-[999] <md:(hidden)">
                  {section_data
                    .filter((op) => op != "all" && !op.includes("default"))
                    .map((section) => (
                      <a className="" href={section}>
                        <span className="border-b text-white w-full border-black text-[13px]  h-10 flex items-center pl-3 cursor-pointer hover:(bg-gray-400 text-black)">
                          {section}
                        </span>
                      </a>
                    ))}
                  {/* EXE COMMS VALIDATE CONDITION */}

                  {decodedToken.role <= 3 && (
                    <>
                      <a className="" href="/depadmin">
                        <span className="border-b text-white w-full border-black text-[13px]  h-10 flex items-center pl-3 cursor-pointer hover:(bg-gray-400 text-black)">
                          Department Admin
                        </span>
                      </a>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
          {/* </Link> */}

          <Link to="#">
            <div className="text-white text-[20px] mr-7 ml-4 flex-col flex h-8 w-8 rounded-md items-center cursor-pointer justify-center hover:( text-yellow-400) group">
              <HiOutlineDocumentChartBar />
              <span className="text-[12px] absolute bottom-1 hidden group-hover:flex">
                Reports
              </span>
            </div>
          </Link>
          <Link
            to={
              admin?.dept == "HR"
                ? "/hr-default"
                : admin?.dept == "ACC"
                ? "/acc-default"
                : admin?.dept == "AMAD"
                ? "/amad-default"
                : admin?.dept == "BSD"
                ? "/bsd-default"
                : admin?.dept == "OPS"
                ? "/ops-default"
                : admin?.dept == "SALES"
                ? "/sales-default"
                : admin?.dept == "TA"
                ? "/ta-default"
                : admin?.dept == "TSD"
                ? "/tsd-settings"
                : "#"
            }
            reloadDocument
          >
            <div
              className={`text-white text-[25px] mr-7 ml-4 flex-col ${
                admin?.role <= 2 ? "flex" : "hidden"
              } h-8 w-8 rounded-md items-center cursor-pointer justify-center hover:( text-yellow-400) group`}
            >
              <RiGlobalLine />
              <span className="text-[12px] absolute bottom-1 hidden group-hover:flex">
                Admin
              </span>
            </div>
          </Link>

          <div
            className={`ml-4 text-white  rounded-t-md  text-[25px] items-center cursor-pointer ${
              admin?.role <= 2 ? "flex" : "hidden"
            }  `}
            title="Admin"
            id="adminBox"
          ></div>
        </div>
        <div className="flex items-center">
          <a className="" href="/mywork">
            <div className="text-white text-[20px] mr-2 ml-4 flex-col flex h-8 w-8 rounded-md items-center cursor-pointer justify-center hover:( text-yellow-400) group">
              <IoBriefcaseOutline className="admin-navbar-mail-icon" />
              <span className="text-[12px] absolute bottom-1 hidden group-hover:flex">
                My Work
              </span>
            </div>
          </a>

          <a className="" href="/messenger/0">
            <div className="text-white text-[20px] mr-2 ml-4 flex-col flex h-8 w-8 rounded-md items-center cursor-pointer justify-center hover:( text-yellow-400) group">
              <MdOutlineMail className="admin-navbar-mail-icon" />
              <span className="text-[12px] absolute bottom-1 hidden group-hover:flex">
                Mail
              </span>
            </div>
          </a>

          {/* 

          <Link to="/messenger/0">
            <MdOutlineMail className="mr-9 text-[25px] cursor-pointer mt-2 text-white  <md:(text-[25px] mr-5)" />
          </Link> */}

          <div
            className="text-white text-[20px] pl-10 flex-col flex h-8 w-8 rounded-md items-center cursor-pointer justify-center hover:( text-yellow-400) group"
            onClick={() => setOpen(!open)}
          >
            {userNotification.length !== 0 && (
              <div className="w-5 h-5 bg-red-600 absolute top-3 right-50 rounded-full text-[15px] flex items-center justify-center">
                {userNotification.length}
              </div>
            )}
            <IoMdNotificationsOutline className=" admin-navbar-notification-icon <md:(text-[25px] mr-2)" />
            <span className="text-[12px] absolute bottom-1 hidden group-hover:flex">
              Notification
            </span>
          </div>

          {open && <SuccessModal userNotification={userNotification} />}

          <span className=" admin-navbar-timestamp  pl-7 <md:(text-[12px] mr-0 w-25)">
            {time}
          </span>
          <div
            className="p-1 rounded-t-md hover:(bg-gray-600) mr-4  <md:(hidden)"
            onMouseOver={() => setToggle(true)}
            onMouseOut={() => setToggle(false)}
          >
            <span className="bg-yellow-500 text-black flex items-center justify-center text-center h-9 w-9 p-1 rounded-full cursor-pointer font-Roboto text-[25px] text-gray-700">
              {admin?.username.charAt(0).toUpperCase()}
            </span>
            {toggle && (
              <>
                <div className="z-50 bg-gray-600 w-35 overflow-auto rounded-md absolute right-4 top-12 flex flex-col text-center z-[999] <md:(hidden)">
                  <a className="" href="/account-setting">
                    <span className="border-b text-white w-full border-black h-10 flex items-center cursor-pointer hover:(bg-gray-400 text-black)">
                      <MdOutlineArrowBackIosNew className="text-[15px] " />
                      Account Setting
                    </span>
                  </a>
                  <a className="" href="/profile">
                    <span className="border-b text-white w-full border-black h-10 flex items-center justify-center relative cursor-pointer hover:(bg-gray-400 text-black)">
                      <MdOutlineArrowBackIosNew className="text-[15px] absolute left-0" />
                      Profile
                    </span>
                  </a>
                  <span
                    className="h-10 flex text-white items-center justify-center cursor-pointer hover:(bg-gray-400 text-black )"
                    onClick={handleLogout}
                  >
                    Logout
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {/*========================================= BELOW THIS IS THE SIDEBAR MENU WHEN RESPONSIVE =================================== */}
      <div
        className={`hidden prdc-color w-[250px] h-screen fixed top-0 transition-all duration-500 flex-col justify-center z-50 ${
          showMenu ? "left-0" : "left-[-100%]"
        } items-center <md:(flex)`}
      >
        <div className="w-full h-full relative flex flex-col">
          <IoMdClose
            className="absolute top-1 right-1 text-[50px] text-red-600 cursor-pointer"
            onClick={() => setShowMenu(false)}
          />
          <a href="/profile">
            <div className="my-15  flex items-center w-full cursor-pointer transition-all duration-300 hover:(bg-red-500)">
              <span className="bg-yellow-500 text-black flex items-center justify-center text-center ml-4 h-12 w-12 p-1 rounded-full  font-Roboto text-[25px] text-gray-700">
                {admin?.username.charAt(0).toUpperCase()}
              </span>
              <span className="text-white font-Roboto ml-3 text-[25px]">
                {admin?.name}
              </span>
            </div>
          </a>
          <a href="/dashboard">
            <span className="navbar-menu-responsive">
              <AiOutlineHome className="text-white mx-4" /> Home
            </span>
          </a>
          <a href="/menu">
            <span className="navbar-menu-responsive">
              <CgMenuGridR className="text-white mx-4" /> Dashboard
            </span>
          </a>
          <span className="navbar-menu-responsive">
            <HiNewspaper className="text-white mx-4" /> Transactions
          </span>
          <span className="navbar-menu-responsive">
            <BsFillFileEarmarkBarGraphFill className="text-white mx-4" />
            Reports
          </span>
          {admin?.role <= 2 && (
            <a href="/users">
              <span className="navbar-menu-responsive">
                <CgGlobeAlt className="text-white mx-4" /> Admin
              </span>
            </a>
          )}
          <a href="/account-setting">
            <span className="navbar-menu-responsive">
              <IoSettingsSharp className="text-white mx-4" /> Account Settings
            </span>
          </a>
          <span className="navbar-menu-responsive" onClick={handleLogout}>
            <BiLogOut className="text-white mx-4" /> Logout
          </span>
        </div>
      </div>
    </>
  );
});

export default withClickOutside(Navbar);
