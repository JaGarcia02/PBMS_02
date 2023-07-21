import React, { useState } from "react";

const SuperUser_Global2 = ({
  submitData,
  global2_name,
  global2_email,
  global2_username,
  global2_password,
  handleGlobal2,
  exclude_global2,
  setCurrentState,
  global1_email,
  global1_username,
  username,
  email,
}) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validation, setValidation] = useState(false);

  const validate = () => {
    if (global2_name.trim() === "") {
      document.getElementById("global2_name").style.borderColor = "red";
      setValidation(true);
    }
    if (global2_email.trim() === "") {
      document.getElementById("global2_email").style.borderColor = "red";
      setValidation(true);
    }
    if (global2_username.trim() === "") {
      document.getElementById("global2_username").style.borderColor = "red";
      setValidation(true);
    }
    if (global2_password.trim() === "") {
      document.getElementById("global2_password").style.borderColor = "red";
      setValidation(true);
    }
    if (global2_password.length < 9) {
      document.getElementById("global2_password").style.borderColor = "red";
      setValidation(true);
    }
    if (confirmPassword.trim() === "") {
      document.getElementById("global2_confirmPassword").style.borderColor =
        "red";
      setValidation(true);
    }
    if (global2_password != confirmPassword) {
      document.getElementById("global2_confirmPassword").style.borderColor =
        "red";
      setValidation(true);
    }
    if (global1_email == global2_email || email == global2_email) {
      setValidation(true);
      alert("Email Already Exist!");
    }
    if (global1_username == global2_username || username == global2_username) {
      setValidation(true);
      alert("Username Already Exist!");
    }

    return;
  };

  const clickSubmit = () => {
    if (
      global2_name.trim() === "" ||
      global2_email.trim() === "" ||
      global2_username.trim() === "" ||
      global2_password.trim() === "" ||
      confirmPassword.trim() === "" ||
      global2_password.length < 9 ||
      global2_password != confirmPassword ||
      global1_email == global2_email ||
      email == global2_email ||
      global1_username == global2_username ||
      username == global2_username
    ) {
      validate();
    } else {
      submitData();
    }
  };

  const clickSkip = () => {
    exclude_global2();
    window.location.assign("/pbms-admin");
  };

  return (
    <div>
      <div className="admin-create-form-2">
        <div className="admin-create-form-2-wrapper">
          <span className="arial-narrow-bold text-[20px] mb-4">
            Set Global Administrator (OPTIONAL)
          </span>
          <div className="admin-create-form-2-input-container">
            <span className="arial-narrow">Name</span>
            <input
              className="admin-create-form-3-input"
              name="global2_name"
              value={global2_name}
              onChange={handleGlobal2}
              id="global2_name"
            />
            {validation && global2_name.trim() === "" ? (
              <p className="w-full text-right arial-narrow text-red-600 absolute top-12">
                Name is required!
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="admin-create-form-2-input-container">
            <span className="arial-narrow">Email</span>
            <input
              className="admin-create-form-3-input"
              name="global2_email"
              value={global2_email}
              onChange={handleGlobal2}
              id="global2_email"
            />
            {validation && global2_email.trim() === "" ? (
              <p className="w-full text-right arial-narrow text-red-600 absolute top-12">
                Email is required!
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="admin-create-form-2-input-container">
            <span className="arial-narrow">Username</span>
            <input
              className="admin-create-form-3-input"
              name="global2_username"
              value={global2_username}
              onChange={handleGlobal2}
              id="global2_username"
            />
            {validation && global2_username.trim() === "" ? (
              <p className="w-full text-right arial-narrow text-red-600 absolute top-12">
                Username is required!
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="admin-create-form-2-input-container">
            <span className="arial-narrow">Password</span>
            <input
              className="admin-create-form-3-input"
              name="global2_password"
              type="password"
              value={global2_password}
              onChange={handleGlobal2}
              id="global2_password"
            />
            {validation && global2_password.trim() === "" ? (
              <p className="w-full text-right arial-narrow text-red-600 absolute top-12">
                Password is required!
              </p>
            ) : validation && global2_password.length < 9 ? (
              <p className="w-full text-right arial-narrow text-red-600 absolute top-12">
                Password is too short!
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="admin-create-form-2-input-container">
            <span className="arial-narrow">Confirm Password</span>
            <input
              className="admin-create-form-3-input"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="global2_confirmPassword"
            />
            {validation && confirmPassword.trim() === "" ? (
              <p className="w-full text-right arial-narrow text-red-600 absolute top-12">
                Confirm Password is required!
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="w-[70%] flex items-center justify-between">
            <div>
              <button
                className=" bg-gray-900 text-white rounded-sm text-center w-20 mt-6 mr-4"
                onClick={() => setCurrentState(4)}
              >
                BACK
              </button>
            </div>
            <div>
              <button
                className=" bg-gray-900 text-white rounded-sm text-center w-20 mt-6 mr-4"
                onClick={clickSkip}
              >
                <a href="/pbms-admin" className="w-full h-full">
                  SKIP
                </a>
              </button>
              <button
                className=" bg-gray-900 text-white rounded-sm text-center w-20 mt-6"
                onClick={clickSubmit}
              >
                <a href="/pbms-admin" className="w-full h-full">
                  SUBMIT
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperUser_Global2;
