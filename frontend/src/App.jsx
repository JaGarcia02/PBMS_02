/*PBMS V2 WEB APP VERSION */
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Navigate, Router } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Login from "./pages/Login";
import Dashboard from "./pages/UserPage/Dashboard";
import Createuser from "./pages/AdminModule/Createuser";
import SuperUserCreate from "./pages/AdminModule/SuperUserCreate";
import axios from "axios";
import jwt from "jwt-decode";
import BlockPage from "./pages/BlockPage";
import { Offline, Online } from "react-detect-offline";
import Lottie from "lottie-react";
import disconnected from "./lottieFiles/no_internet_connection.json";
import useLocalStorage from "./Hooks/useLocalStorage";
import Menu from "./pages/UserPage/Menu";
import Cookies from "js-cookie";
import RequestReset from "./pages/RequestReset";
import ChangePassword from "./pages/ChangePassword";
import ProtectedRoute from "./utils/ProtectedRoute";
import AccountSetting from "./pages/UserPage/AccountSetting";
import TsdDashboard from "./pages/TSD/TsdDashboard";
import BsdDashboard from "./pages/BSD/BsdDashboard";
import OpsDashboard from "./pages/OPS/OpsDashboard";
import SalesDashboard from "./pages/SALES/SalesDashboard";
import HrDashboard from "./pages/HR/HrDashboard";
import AccDashboard from "./pages/ACC/AccDashboard";
import TaDashboard from "./pages/TA/TaDashboard";
import AmadDashboard from "./pages/AMAD/AmadDashboard";
import ProfilePage from "./pages/UserPage/ProfilePage";
import { API_URL_ADMIN } from "./utils/Url";
import AdminLogin from "./pages/AdminModule/AdminLogin";
import AdminDashboard from "./pages/AdminModule/AdminDashboard";
import AdminProtectedRoute from "./utils/AdminProtectedRoute";
import Chat from "./pages/UserPage/Chat";
import AdminForgot from "./pages/AdminModule/AdminForgot";
import AdminRecovery from "./pages/AdminModule/AdminRecovery";
import ApplicationForm from "./pages/ApplicationForm";
import Hr_viewApplicants from "./pages/HR/Hr_viewApplicants";
import Hr_Compben from "./pages/HR/Hr_Compben";
import Hr_Timekeeping from "./pages/HR/Hr_Timekeeping";
import AdminSettings from "./pages/AdminModule/AdminSettings";
import Hr_DefaultSettings from "./pages/HR/Hr_DefaultSettings";
import Sales_DefaultSettings from "./pages/SALES/Sales_DefaultSettings";
import Ops_DefaultSettings from "./pages/OPS/Ops_DefaultSettings";
import Bsd_DefaultSettings from "./pages/BSD/Bsd_DefaultSettings";
import Acc_DefaultSettings from "./pages/ACC/Acc_DefaultSettings";
import Ta_DefaultSettings from "./pages/TA/Ta_DefaultSettings";
import Amad_DefaultSettings from "./pages/AMAD/Amad_DefaultSettings";
import { getSection } from "./features/sections/sectionSlice";
import { getAuthRole } from "./features/authorizationRole/authRoleSlice";
import AutoLogout from "./utils/AutoLogout";
import AdminAccountSettings from "./pages/AdminModule/AdminAccountSettings";
import Hr_ActiveEmployees from "./pages/HR/Hr_ActiveEmployees";
import DashbordModalPassword from "./pages/UserPage/DashbordModalPassword";
import ToDoList from "./pages/UserPage/ToDoList";
import TSD_DefaultSettings from "./pages/TSD/TSD_DefaultSettings";
import { getBrand } from "./features/branding/brandingSlice";
import Form from "./Forms/Form";
import Hr_DepartmentAdmin from "./pages/HR/Hr_DepartmentAdmin";

function App() {
  const { user, messageUser } = useSelector((state) => state.user);
  const { admin, messageAdmin } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let [value, setValue] = useLocalStorage("theme", localStorage.theme);
  const lightTheme = "light";
  const darkTheme = "dark";
  const body = document.body;

  //JWT DECODER THAT CONTAINS THE CREDENTIAL OF THE CURRENT USER THAT LOGGED IN
  /*useEffect(() => {
    try {
      if (admin !== null) {
        jwt(admin);
      }
    } catch (error) {
      console.log(error);
      alert("Token is invalid");
      Cookies.remove("user_access_token");
      navigate("/");
      window.location.reload();
    }
  }, [admin]);*/
  //CHECK IF THE TOKEN IS NOT EXPIRED!!

  useEffect(() => {
    const handleTabClose = (event) => {
      event.preventDefault();

      console.log("beforeunload event triggered");

      return (event.returnValue = "Are you sure you want to exit?");
    };

    window.addEventListener("unload", handleTabClose);

    return () => {
      window.removeEventListener("unload", handleTabClose);
    };
  }, []);

  useEffect(() => {
    switch (messageAdmin) {
      case "Not Authorized no TOKEN!":
        alert("NO TOKEN! PLEASE RELOGIN AGAIN");
        Cookies.remove("admin_access_token");

        navigate("/");
        window.location.reload();
        break;

      case "Not Authorized!":
        alert("INVALID TOKEN! RE-LOGIN AGAIN");
        Cookies.remove("admin_access_token");

        navigate("/");
        window.location.reload();
        break;
    }
  }, [messageAdmin]);

  useEffect(() => {
    switch (messageUser) {
      case "Not Authorized no TOKEN":
        alert("NO TOKEN! PLEASE RELOGIN AGAIN");
        Cookies.remove("user_access_token");

        navigate("/");
        window.location.reload();
        break;

      case "Not Authorized":
        alert("INVALID TOKEN! RE-LOGIN AGAIN");
        Cookies.remove("user_access_token");

        navigate("/");
        window.location.reload();
        break;
    }
  }, [messageUser]);

  //FUNCTION THAT CHECKS IF THE SYSTEM DOESN'T HAVE A SUPERUSER ACCOUNT
  useEffect(() => {
    const checkIfTheresAdmin = async () => {
      try {
        const res = await axios.get(API_URL_ADMIN + "checkAdmin");
        if (res.data === 0) {
          navigate("/admin-create");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    checkIfTheresAdmin();
  }, []);

  useEffect(() => {
    if (value == darkTheme) {
      body.classList.replace(lightTheme, darkTheme);
      setValue("dark");
      value = darkTheme;
    } else {
      body.classList.replace(darkTheme, lightTheme);
      setValue("light");
      value = lightTheme;
    }
  }, []);

  useEffect(() => {
    dispatch(getSection());
    dispatch(getAuthRole());
    dispatch(getBrand());
  }, []);

  return (
    <>
      <DashbordModalPassword />
      {/*CHECK IF THE INTERNET CONNECTION WAS STILL ACTIVE */}
      {/*<Offline>
        <div className="fixed flex flex-col items-center justify-start bg-white w-screen h-screen z-50">
          <Lottie
            animationData={disconnected}
            loop={false}
            className="h-100 w-100"
          />
          <div className="relative flex flex-col text-center items-center justify-center">
            <div className="flex absolute -z-2 h-30 w-150  clip-path-disconnected bg-yellow-200" />
            <span className="font-Roboto text-[40px] text-red-600 mb-4">
              Oops!
            </span>
            <span className="font-Roboto text-[18px]">
              Something went wrong with your Internet Connection!
            </span>
          </div>
          <button
            className="mt-12 border-black w-30 h-10 rounded-full outline-none hover:(border-green-400 bg-green-400 text-white) focus:(outline-none)"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      </Offline>*/}
      {/*ROUTES FOR REACT JS CHECK THE DOCUMENTATION OF  
    https://reactrouter.com/en/v6.3.0/getting-started/overview
    BrowserRouter is not on the App.jsx it's in "main.jsx"*/}

      <Routes>
        {/*PUBLIC ROUTES */}
        <Route path="/application-form" element={<ApplicationForm />} />
        <Route path="/form" element={<Form />} />
        <Route
          exact
          path="/"
          element={
            user ? (
              <Navigate to="/dashboard" replace={true} />
            ) : admin ? (
              <Navigate to="/admin-dashboard" />
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/admin-forgot"
          element={
            admin ? (
              <Navigate to="/admin-dashboard" replace={true} />
            ) : (
              <AdminForgot />
            )
          }
        />
        <Route path="/admin-create" element={<SuperUserCreate />} />
        <Route
          path="/forgot-password"
          element={
            user ? (
              <Navigate to="/dashboard" replace={true} />
            ) : (
              <RequestReset />
            )
          }
        />
        <Route
          path="/pbms-admin"
          element={
            admin ? (
              <Navigate to="/admin-dashboard" />
            ) : user ? (
              <Navigate to="/dashboard" />
            ) : (
              <AdminLogin />
            )
          }
        />
        <Route path="/change-password/:token" element={<ChangePassword />} />
        <Route path="/account-recovery/:token" element={<AdminRecovery />} />
        {/*ROUTES FOR ADMINISTRATOR */}
        <Route element={<AdminProtectedRoute role={1} />}>
          <Route path="/users" element={<Createuser />} />
          <Route exact path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-settings" element={<AdminSettings />} />
          <Route
            path="/admin-accountsetting"
            element={<AdminAccountSettings />}
          />
        </Route>
        {/*ROUTES THAT ACCESSIBLE BY ANYONE THAT LOGGED IN */}
        <Route element={<ProtectedRoute access={"all"} role={6} dept={{}} />}>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/account-setting" element={<AccountSetting />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/messenger/:id" element={<Chat />} />
          <Route path="/mywork" element={<ToDoList />} />
        </Route>
        {/*ROUTE FOR EXE COMMS */}
        <Route element={<ProtectedRoute access={"all"} role={3} dept={{}} />}>
          <Route path="/depadmin" element={<Hr_DepartmentAdmin />} />
        </Route>
        {/*ROUTES FOR TSD */}
        <Route
          element={<ProtectedRoute role={6} access={"all"} dept={"TSD"} />}
        >
          <Route path="/tsd-dashboard" element={<TsdDashboard />} />
        </Route>

        <Route
          element={
            <ProtectedRoute role={2} access={"tsd-default"} dept={"TSD"} />
          }
        >
          <Route path="/tsd-default" element={<TSD_DefaultSettings />} />
        </Route>
        {/*ROUTES FOR BSD */}
        <Route
          element={<ProtectedRoute role={6} access={"all"} dept={"BSD"} />}
        >
          <Route path="/bsd-dashboard" element={<BsdDashboard />} />
        </Route>
        <Route
          element={
            <ProtectedRoute role={2} access={"bsd-default"} dept={"BSD"} />
          }
        >
          <Route path="/bsd-default" element={<Bsd_DefaultSettings />} />
        </Route>
        {/*ROUTES FOR OPS */}
        <Route
          element={<ProtectedRoute role={6} access={"all"} dept={"OPS"} />}
        >
          <Route path="/ops-dashboard" element={<OpsDashboard />} />
        </Route>
        <Route
          element={
            <ProtectedRoute role={2} dept={"OPS"} access={"ops-default"} />
          }
        >
          <Route path="/ops-default" element={<Ops_DefaultSettings />} />
        </Route>
        {/*ROUTE FOR SALES*/}
        <Route
          element={<ProtectedRoute role={6} access={"all"} dept={"SALES"} />}
        >
          <Route path="/sales-dashboard" element={<SalesDashboard />} />
        </Route>
        {/*SALES ADMIN SETTINGS */}
        <Route
          element={
            <ProtectedRoute role={3} dept={"SALES"} access={"sales-default"} />
          }
        >
          <Route path="/sales-default" element={<Sales_DefaultSettings />} />
        </Route>

        {/*ROUTES FOR HR */}

        <Route element={<ProtectedRoute role={6} dept={"HR"} access={"all"} />}>
          <Route path="/hr-dashboard" element={<HrDashboard />} />
        </Route>
        <Route
          element={
            <ProtectedRoute role={6} dept={"HR"} access={"hr-default"} />
          }
        >
          <Route path="/hr-default" element={<Hr_DefaultSettings />} />
        </Route>
        <Route
          element={
            <ProtectedRoute role={6} dept={"HR"} access={"Recruitment"} />
          }
        >
          <Route path="/Recruitment" element={<Hr_viewApplicants />} />
        </Route>

        {/*FROM HERE DONT USE ACCESS ALL*/}
        <Route
          element={
            <ProtectedRoute
              role={6}
              access={"Compensation-Benefits"}
              dept={"HR"}
            />
          }
        >
          <Route path="/Compensation-Benefits" element={<Hr_Compben />} />
        </Route>
        <Route
          element={
            <ProtectedRoute
              role={6}
              access={"Employee-Management"}
              dept={"HR"}
            />
          }
        >
          <Route path="/Employee-Management" element={<Hr_ActiveEmployees />} />
        </Route>

        <Route
          element={
            <ProtectedRoute role={6} access={"Timekeeping"} dept={"HR"} />
          }
        >
          <Route path="/Timekeeping" element={<Hr_Timekeeping />} />
        </Route>
        {/*ROUTES FOR ACCOUNTING */}
        <Route
          element={<ProtectedRoute role={6} dept={"ACC"} access={"all"} />}
        >
          <Route path="/acc-dashboard" element={<AccDashboard />} />
        </Route>
        <Route
          element={
            <ProtectedRoute role={2} dept={"ACC"} access={"acc-default"} />
          }
        >
          <Route path="/acc-default" element={<Acc_DefaultSettings />} />
        </Route>
        {/*ROUTES FOR TA */}
        <Route element={<ProtectedRoute role={6} dept={"TA"} access={"all"} />}>
          <Route path="/ta-dashboard" element={<TaDashboard />} />
        </Route>
        <Route
          element={
            <ProtectedRoute role={2} dept={"TA"} access={"ta-default"} />
          }
        >
          <Route path="/ta-default" element={<Ta_DefaultSettings />} />
        </Route>
        {/*ROUTES FOR AMAD */}
        <Route
          element={<ProtectedRoute role={6} dept={"AMAD"} access={"all"} />}
        >
          <Route path="/amad-dashboard" element={<AmadDashboard />} />
        </Route>
        <Route
          element={
            <ProtectedRoute role={2} dept={"AMAD"} access={"amad-default"} />
          }
        >
          <Route path="/amad-default" element={<Amad_DefaultSettings />} />
        </Route>
        {/*WILDCARD ROUTE */}
        <Route path="/*" element={<BlockPage />} />
      </Routes>
    </>
  );
}

export default App;
