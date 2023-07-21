import React, { useState } from "react";

const SuperUser_Global1 = ({
  handleGlobal1,
  global1_name,
  global1_email,
  global1_username,
  global1_password,
  setCurrentState,
  username,
  email,
}) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validation, setValidation] = useState(false);

  const validate = () => {
    if (global1_name.trim() === "") {
      document.getElementById("global1_name").style.borderColor = "red";
      setValidation(true);
    }
    if (global1_username.trim() === "") {
      document.getElementById("global1_username").style.borderColor = "red";
      setValidation(true);
    }
    if (global1_email.trim() === "") {
      document.getElementById("global1_email").style.borderColor = "red";
      setValidation(true);
    }
    if (global1_password.trim() === "") {
      document.getElementById("global1_password").style.borderColor = "red";
      setValidation(true);
    }
    if (confirmPassword.trim() === "") {
      document.getElementById("global1_confirmPassword").style.borderColor =
        "red";
      setValidation(true);
    }
    if (global1_password.length < 9) {
      document.getElementById("global1_password").style.borderColor = "red";
      setValidation(true);
    }
    if (global1_password !== confirmPassword) {
      document.getElementById("global1_confirmPassword").style.borderColor =
        "red";
      setValidation(true);
    }
    if (global1_email == email) {
      document.getElementById("global1_email").style.borderColor = "red";
      setValidation(true);
    }
    if (global1_username == username) {
      document.getElementById("global1_username").style.borderColor = "red";
      setValidation(true);
    }

    return;
  };

  const clickNext = () => {
    if (
      global1_name.trim() === "" ||
      global1_email.trim() === "" ||
      global1_username.trim() === "" ||
      global1_password.trim() === "" ||
      confirmPassword.trim() === "" ||
      global1_password < 9 ||
      global1_password !== confirmPassword ||
      global1_email === email ||
      global1_username === username
    ) {
      validate();
    } else {
      setCurrentState(5);
    }
  };

  return (
    <div className="admin-create-form-2">
      <div className="admin-create-form-2-wrapper">
        <span className="arial-narrow-bold text-[20px] mb-4">
          Set Global Administrator
        </span>
        <div className="admin-create-form-2-input-container">
          <span className="arial-narrow">Name</span>
          <input
            className="admin-create-form-3-input"
            name="global1_name"
            onChange={handleGlobal1}
            value={global1_name}
            id="global1_name"
          />
          {validation && global1_name.trim() === "" ? (
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
            name="global1_email"
            onChange={handleGlobal1}
            value={global1_email}
            id="global1_email"
          />
          {validation && global1_email.trim() === "" ? (
            <p className="w-full text-right arial-narrow text-red-600 absolute top-12">
              Email is required!
            </p>
          ) : validation && global1_email == email ? (
            <p className="w-full text-right arial-narrow text-red-600 absolute top-12">
              Email is already exist!
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="admin-create-form-2-input-container">
          <span className="arial-narrow">Username</span>
          <input
            className="admin-create-form-3-input"
            name="global1_username"
            onChange={handleGlobal1}
            value={global1_username}
            id="global1_username"
          />
          {validation && global1_username.trim() === "" ? (
            <p className="w-full text-right arial-narrow text-red-600 absolute top-12">
              Username is required!
            </p>
          ) : validation && global1_username == username ? (
            <p className="w-full text-right arial-narrow text-red-600 absolute top-12">
              Username is already exist!
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="admin-create-form-2-input-container">
          <span className="arial-narrow">Password</span>
          <input
            className="admin-create-form-3-input"
            name="global1_password"
            onChange={handleGlobal1}
            value={global1_password}
            type="password"
            id="global1_password"
          />
          {validation && global1_password.trim() === "" ? (
            <p className="w-full text-right arial-narrow text-red-600 absolute top-12">
              Password is required!
            </p>
          ) : validation && global1_password.length < 9 ? (
            <p className="w-full text-right arial-narrow text-red-600 absolute top-12">
              Password is too short
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="admin-create-form-2-input-container">
          <span className="arial-narrow">Confirm Password</span>
          <input
            className="admin-create-form-3-input"
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            id="global1_confirmPassword"
          />
          {validation && confirmPassword.trim() === "" ? (
            <p className="w-full text-right arial-narrow text-red-600 absolute top-12">
              Confirm Password is required!
            </p>
          ) : validation && global1_password != confirmPassword ? (
            <p className="w-full text-right arial-narrow text-red-600 absolute top-12">
              Password doesn't match!
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="w-[70%] flex items-center justify-between">
          <button
            className=" bg-gray-900 text-white rounded-sm text-center w-20 mt-6 mr-4"
            onClick={() => setCurrentState(3)}
          >
            Back
          </button>

          <button
            className=" bg-gray-900 text-white rounded-sm text-center w-20 mt-6"
            onClick={clickNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuperUser_Global1;
