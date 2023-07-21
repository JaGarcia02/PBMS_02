import React, { useEffect, useState } from "react";
import { IoMdNotificationsOutline, IoMdSettings } from "react-icons/io";
import { IoNewspaperOutline } from "react-icons/io5";
import { HiOutlineDocumentChartBar } from "react-icons/hi2";
import { RiGlobalLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { checkToken, logoutAdmin, reset } from "../../features/auth/authSlice";
import { Link } from "react-router-dom";
import moment from "moment";
import { MdOutlineMail } from "react-icons/md";
import jwt from "jwt-decode";
import { getBrand, getSettings } from "../../features/branding/brandingSlice";
import axios from "axios";
import { API_URL, API_URL_ADMIN } from "../../utils/Url";

const AdminSidebar = () => {
  const [time, setTime] = useState(null);
  const [hoverUser, setHoverUser] = useState(false);
  const [notification, setNotification] = useState(false);
  const [admin_notif, setAdmin_Notif] = useState([]);
  const { admin } = useSelector((state) => state.auth);
  const { branding, timeFormat } = useSelector((state) => state.branding);
  const dispatch = useDispatch();
  const adminChannel = new BroadcastChannel("admin");
  const decoded = jwt(admin);

  const logout_admin = () => {
    dispatch(logoutAdmin());
    dispatch(reset());

    adminChannel.postMessage({
      payload: {
        type: "ADMIN_SIGN_OUT",
      },
    });
    redirect("/");
  };

  useEffect(() => {
    dispatch(getBrand());
    dispatch(getSettings());

    axios
      .get(API_URL_ADMIN + "get-admin-notif")
      .then((res) => setAdmin_Notif(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format(timeFormat[0].DateTimeFormat));
      dispatch(checkToken(admin));
    }, 2000);

    return () => clearInterval(interval);
  }, [timeFormat]);

  useEffect(() => {
    function clickOutside(e) {
      if (document.getElementById("clickbox").contains(e.target)) {
        setNotification(true);
      } else {
        setNotification(false);
      }
    }

    window.addEventListener("click", clickOutside);

    return () => window.removeEventListener("click", clickOutside);
  }, [notification]);

  useEffect(() => {
    adminChannel.onmessage = (data) => {
      if (data.data.payload.type === "ADMIN_SIGN_OUT") {
        dispatch(logoutAdmin());
        dispatch(reset());
      }
      window.location.reload();
      redirect("/");
      adminChannel.close();
    };
  }, [logout_admin]);

  const SuccessModal = () => {
    const click_notif = (ID) => {
      axios
        .put(API_URL_ADMIN + "update-notif", { ID })
        .then((res) => setAdmin_Notif(res.data))
        .catch((err) => console.log(err));
    };

    return (
      <div
        id="clickbox"
        className="w-100 absolute right-5  overflow-auto text-black  rounded-xl top-15 h-130 backg-color-prdc shadow-xl shadow-gray-500 rounded-sm"
      >
        <div className="flex flex-col m-3 ">
          <span className="text-[30px] arial-narrow-bold  ml- my-3">
            Notification
          </span>
          {admin_notif.map((data) => {
            return (
              <div onClick={() => click_notif(data.ID)}>
                <Link to={data.notif_link}>
                  <div className="h-20 mt-1 bg-color-prdc shadow-md shadow-gray-800 rounded-xl flex-col flex items-center justify-center">
                    <div className="mr-24">{data.notif_desc}</div>{" "}
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
    <div className="admin-navbar-container">
      <div className="admin-navbar-wrapper">
        <div className="admin-navbar-first-list">
          <img
            src={
              branding ? API_URL + branding[0]?.Logo : "/imgs/deafult_logo.jpg"
            }
            alt=""
            className="h-full px-4 py-1 mr-5"
          />
          <Link to="/admin-dashboard">
            <div className="admin-navbar-iconlist-1 pl-3 group">
              <RxDashboard />
              <span className="text-[12px] absolute bottom-1 hidden group-hover:flex">
                Dashboard{" "}
              </span>
            </div>
          </Link>
          <Link to="/users">
            <div className="admin-navbar-iconlist-2 group pl-2">
              <IoNewspaperOutline />
              <span className="text-[12px] absolute bottom-1 hidden group-hover:flex">
                Transaction{" "}
              </span>
            </div>
          </Link>

          <div className="  admin-navbar-iconlist-2 pr-4 group">
            <HiOutlineDocumentChartBar className="" />
            <span className="text-[12px] absolute bottom-1 hidden group-hover:flex">
              Report
            </span>
          </div>
          <Link to="/admin-settings">
            <div className="admin-navbar-iconlist-2 pr-20 group ">
              <RiGlobalLine className="admin-navbar-mail-icon" />
              <span className="text-[12px] absolute bottom-1 hidden group-hover:flex">
                Administration
              </span>
            </div>
          </Link>
        </div>
        <div className=" admin-navbar-second-list">
          <div className="text-white text-[20px] mr-4 flex-col flex rounded-md items-center h-8 w-8 cursor-pointer group justify-center hover:( text-yellow-400)">
            <MdOutlineMail className="admin-navbar-mail-icon" />
            <span className="text-[12px]  absolute bottom-1 hidden group-hover:flex">
              Message
            </span>
          </div>

          <div
            onClick={() => setNotification(true)}
            id="clickbox"
            className="text-white pl-8  text-[20px] flex-col flex rounded-md items-center h-8 w-8 cursor-pointer group justify-center hover:( text-yellow-400)"
          >
            {admin_notif.filter((data) => data.notif_status == 0).length !==
              0 && (
              <div className="w-5 h-5 bg-red-600 absolute top-3 right-50 rounded-full text-[15px] flex items-center justify-center">
                {admin_notif.filter((data) => data.notif_status == 0).length}
              </div>
            )}
            <IoMdNotificationsOutline className="admin-navbar-notification-icon" />
            {notification && <SuccessModal />}{" "}
            <span className="text-[12px] mr-4 absolute bottom-1 hidden group-hover:flex">
              Notification
            </span>
          </div>
          <span className=" admin-navbar-timestamp  pl-7">{time}</span>
          <div
            className="p-1 rounded-t-md hover:(bg-gray-600)"
            onMouseOver={() => setHoverUser(true)}
            onMouseOut={() => setHoverUser(false)}
          >
            <span className="admin-navbar-user-icon">
              {decoded?.username.charAt(0).toUpperCase()}
            </span>
            {hoverUser && (
              <>
                <div className="admin-hover-container">
                  <a className="" href="/account-setting">
                    <span className="admin-account-setting-item">
                      Account Setting
                    </span>
                  </a>

                  <span className="admin-logout-item" onClick={logout_admin}>
                    Logout
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
