import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL_ADMIN } from "../../utils/Url";
import { useDropzone } from "react-dropzone";

import SuperUser_Owner from "../../components/SuperUserComponents/SuperUser_Owner";
import SuperUser_UtilitySetting from "../../components/SuperUserComponents/SuperUser_UtilitySetting";
import SuperUser_Global1 from "../../components/SuperUserComponents/SuperUser_Global1";
import SuperUser_Global2 from "../../components/SuperUserComponents/SuperUser_Global2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SuperUserCreate = () => {
  const [currentState, setCurrentState] = useState(1);

  //SUPER USER
  const [superUserValidation, setSuperUserValidation] = useState(false);
  const [formdata, setFormData] = useState({
    username: "",
    password: "",
    confirm_password: "",
    email: "",
    name: "",
    role: 0,
  });

  // Notify Delete
  const notify_ErrorCases = () => {
    toast.error("Admin Successfully Deleted", {
      position: "bottom-right",
      hideProgressBar: true,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const { username, password, confirm_password, email, name } = formdata;

  //SYSTEM OWNER
  const [uploadedFile, setUploadedFile] = useState(null);
  const [ownerForm, setOwnerForm] = useState({
    Business_Name: "",
    Business_Address: "",
    TIN: "",
  });

  const handleSystemOwner = (e) => {
    setOwnerForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const { Business_Name, Business_Address, TIN } = ownerForm;

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    multiple: false,
    accept: { "image/png": [".png"], "image/jpg": [".jpg"] },
    onDrop: (acceptFiles) => {
      setUploadedFile(acceptFiles[0]);
      console.log(
        acceptFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
    },
  });

  //SuperUser Setting
  const [utilities, setUtilities] = useState({
    timezone: "",
    dateFormat: "",
    region: "",
    language: "",
    currency: "",
  });

  const handleSettings = (e) => {
    setUtilities((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const { timezone, dateFormat, region, language, currency } = utilities;

  //SuperUser Create Global 1

  const [globalForm1, setGlobalForm1] = useState({
    global1_name: "",
    global1_username: "",
    global1_password: "",
    global1_email: "",
    role: 1,
  });

  const handleGlobal1 = (e) => {
    setGlobalForm1((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const { global1_name, global1_username, global1_email, global1_password } =
    globalForm1;

  //SuperUser Create Global Alter
  const [globalForm2, setGlobalForm2] = useState({
    global2_name: "",
    global2_username: "",
    global2_email: "",
    global2_password: "",
    role: 1,
  });

  const handleGlobal2 = (e) => {
    setGlobalForm2((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const { global2_name, global2_username, global2_email, global2_password } =
    globalForm2;

  const navigate = useNavigate();

  //VALIDATE

  const validate = () => {
    if (username.trim() === "") {
      document.getElementById("super_username").style.borderColor = "red";
      setSuperUserValidation(true);
    }
    if (name.trim() === "") {
      document.getElementById("super_name").style.borderColor = "red";
      setSuperUserValidation(true);
    }
    if (password.trim() === "") {
      document.getElementById("super_password").style.borderColor = "red";
      setSuperUserValidation(true);
    }
    if (password !== confirm_password) {
      document.getElementById("super_password").style.borderColor = "red";
      document.getElementById("super_confirmPassword").style.borderColor =
        "red";
      setSuperUserValidation(true);
    }
    if (email.trim() === "") {
      document.getElementById("super_email").style.borderColor = "red";
      setSuperUserValidation(true);
    }
    if (confirm_password.trim() === "") {
      document.getElementById("super_confirmPassword").style.borderColor =
        "red";
      setSuperUserValidation(true);
    }
    if (password.length < 9) {
      document.getElementById("super_password").style.borderColor = "red";
      setSuperUserValidation(true);
    }

    return;
  };

  const createSuperUser = (e) => {
    e.preventDefault();
    if (
      username.trim() === "" ||
      name.trim() === "" ||
      password.trim() === "" ||
      email.trim() === "" ||
      confirm_password.trim() === "" ||
      confirm_password !== password ||
      password.length < 9
    ) {
      validate();
    } else {
      setCurrentState(2);
    }
  };

  useEffect(() => {
    const checkIfTheresAdmin = async () => {
      try {
        const res = await axios.get(API_URL_ADMIN + "checkAdmin");
        if (res.data !== 0) {
          navigate("/");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    checkIfTheresAdmin();
  }, []);

  const submitData = () => {
    //SUPERUSER
    const data = {
      name,
      username,
      password,
      email,
      role: 0,
    };

    axios
      .post(API_URL_ADMIN + "create-admin", data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });

    //SYSTEM OWNER

    let formdata = new FormData();

    formdata.append("logo", uploadedFile);
    formdata.append("Business_Name", Business_Name);
    formdata.append("Business_Address", Business_Address);
    formdata.append("TIN", TIN);

    axios
      .post(API_URL_ADMIN + "upload", formdata)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    //ADMIN SETTINGS
    const dataUtil = {
      timezone,
      dateTimeFormat: dateFormat,
      region,
      language,
      currency,
    };
    axios
      .post(API_URL_ADMIN + "setup_setting", dataUtil)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    //ADMIN CREATION GLOBAL 1
    const globalAdmin1 = {
      username: global1_username,
      password: global1_password,
      email: global1_email,
      name: global1_name,
      role: 1,
    };

    axios
      .post(API_URL_ADMIN + "create-admin", globalAdmin1)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.log(error));

    //ADMIN CREATION GLOBAL 2
    const globalAdmin2 = {
      username: global2_username,
      password: global2_password,
      email: global2_email,
      name: global2_name,
      role: 1,
    };

    axios
      .post(API_URL_ADMIN + "create-admin", globalAdmin2)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    axios
      .get(API_URL_ADMIN + "create-auth")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    axios
      .put(API_URL_ADMIN + `update-section/${"all"}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    navigate("/pbms-admin");
  };

  const exclude_global2 = () => {
    const data = {
      name,
      username,
      password,
      email,
      role: 0,
    };

    axios
      .post(API_URL_ADMIN + "create-admin", data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });

    //SYSTEM OWNER

    let formdata = new FormData();

    formdata.append("logo", uploadedFile);
    formdata.append("Business_Name", Business_Name);
    formdata.append("Business_Address", Business_Address);
    formdata.append("TIN", TIN);

    axios
      .post(API_URL_ADMIN + "upload", formdata)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    //ADMIN SETTINGS
    const dataUtil = {
      timezone,
      dateTimeFormat: dateFormat,
      region,
      language,
      currency,
    };
    axios
      .post(API_URL_ADMIN + "setup_setting", dataUtil)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    //ADMIN CREATION GLOBAL 1
    const globalAdmin1 = {
      username: global1_username,
      password: global1_password,
      email: global1_email,
      name: global1_name,
      role: 1,
    };

    axios
      .post(API_URL_ADMIN + "create-admin", globalAdmin1)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.log(error));

    axios
      .get(API_URL_ADMIN + "create-auth")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    axios
      .put(API_URL_ADMIN + `update-section/${"all"}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="admin-create-admin-container">
      <ToastContainer autoClose={1000} />
      {currentState == 1 && (
        <form className="admin-create-form-1" onSubmit={createSuperUser}>
          <div className="admin-create-form-1-wrapper">
            <span className="text-black font-Roboto text-[15px] my-2">
              CREATE SUPERUSER ACCOUNT
            </span>
            <input
              className="admin-create-form-1-input"
              placeholder="Name"
              type="text"
              required
              name="name"
              value={name}
              onChange={handleChange}
              id="super_name"
            />
            {superUserValidation && name.trim() === "" ? (
              <p className="text-[14px] arial-narrow text-red-600 w-full text-right absolute top-18">
                Name is required!
              </p>
            ) : (
              ""
            )}
            <input
              className="admin-create-form-1-input"
              placeholder="Username"
              type="text"
              required
              name="username"
              value={username}
              onChange={handleChange}
              id="super_username"
            />
            {superUserValidation && username.trim() === "" ? (
              <p className="absolute text-red-600 text-[14px] top-31 w-full text-right arial-narrow">
                Username is required!
              </p>
            ) : (
              ""
            )}
            <input
              className="admin-create-form-1-input"
              placeholder="Email"
              type="email"
              required
              name="email"
              value={email}
              onChange={handleChange}
              id="super_email"
            />
            {superUserValidation && email.trim() === "" ? (
              <p className="absolute top-44 arial-narrow w-full text-right text-[14px] text-red-600">
                Email is required!
              </p>
            ) : (
              ""
            )}
            <input
              className="admin-create-form-1-input"
              placeholder="Password"
              type="password"
              required
              name="password"
              value={password}
              onChange={handleChange}
              id="super_password"
              minLength="8"
            />
            {/* ========================================================================================================================================================================================================= */}
            {superUserValidation && password.trim() === "" ? (
              <p className="text-[14px] text-red-600 arial-narrow w-full absolute top-57 text-right">
                Password is required!
              </p>
            ) : superUserValidation && password.length < 9 ? (
              <p className="text-[14px] text-red-600 arial-narrow w-full absolute top-57 text-right">
                Password is too short!
              </p>
            ) : (
              ""
            )}
            <input
              className="admin-create-form-1-input"
              placeholder="Confirm Password"
              type="password"
              required
              name="confirm_password"
              value={confirm_password}
              onChange={handleChange}
              id="super_confirmPassword"
              minLength="8"
            />
            {superUserValidation && password.trim() === "" ? (
              <p className="text-[14px] text-red-600 arial-narrow w-full absolute top-70 text-right">
                Confirm Password is required!
              </p>
            ) : superUserValidation && password != confirm_password ? (
              <p className="text-[14px] text-red-600 arial-narrow w-full absolute top-70 text-right">
                Password doesn't match!
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="w-full flex items-end justify-end">
            <button
              className="admin-create-form-1-button"
              onClick={createSuperUser}
            >
              Next
            </button>
          </div>
        </form>
      )}
      {/* =============================================================================================================== */}
      {currentState == 2 && (
        <SuperUser_Owner
          handleSystemOwner={handleSystemOwner}
          Business_Name={Business_Name}
          Business_Address={Business_Address}
          TIN={TIN}
          getInputProps={getInputProps}
          getRootProps={getRootProps}
          isDragReject={isDragReject}
          uploadedFile={uploadedFile}
          setCurrentState={setCurrentState}
        />
      )}
      {/* =============================================================================================================== */}
      {currentState == 3 && (
        <SuperUser_UtilitySetting
          handleSettings={handleSettings}
          timezone={timezone}
          dateFormat={dateFormat}
          region={region}
          language={language}
          currency={currency}
          setCurrentState={setCurrentState}
        />
      )}
      {currentState == 4 && (
        <SuperUser_Global1
          handleGlobal1={handleGlobal1}
          global1_name={global1_name}
          global1_email={global1_email}
          global1_username={global1_username}
          global1_password={global1_password}
          setCurrentState={setCurrentState}
          username={username}
          email={email}
        />
      )}
      {currentState == 5 && (
        <SuperUser_Global2
          handleGlobal2={handleGlobal2}
          global2_name={global2_name}
          global2_email={global2_email}
          global2_username={global2_username}
          global2_password={global2_password}
          global1_email={global1_email}
          global1_username={global1_username}
          username={username}
          email={email}
          submitData={submitData}
          exclude_global2={exclude_global2}
          setCurrentState={setCurrentState}
        />
      )}
    </div>
  );
};

export default SuperUserCreate;
