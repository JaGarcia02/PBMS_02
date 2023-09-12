import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineClose, AiOutlineCloseSquare } from "react-icons/ai";
import { useSelector } from "react-redux";
import jwt from "jwt-decode";
import axios from "axios";
import { API_URL, API_URL_ADMIN } from "../../utils/Url";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDropzone } from "react-dropzone";
import { BiCloudUpload } from "react-icons/bi";
import { AiOutlineSave } from "react-icons/ai";

const FormAdd = ({ setShowAddForm }) => {
  const { user } = useSelector((state) => state.user);
  const { branding } = useSelector((state) => state.branding);
  const [fieldForms, setFieldForms] = useState({
    formName: "",
    dateRequest: "",
  });

  const [file, setFile] = useState(null);
  const decoded = jwt(user);

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    multiple: false,
    accept: { "application/msword": [".docx"] },
    onDrop: (acceptFiles) => {
      setFile(acceptFiles[0]);
      console.log(
        acceptFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
    },
  });

  const submit_form = (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("formName", fieldForms.formName);
    formData.append("formDept", jwt(user)?.dept);
    formData.append("file", file);
    formData.append("role", jwt(user).role);
    formData.append("dateReq", fieldForms.dateRequest);

    axios
      .post(API_URL_ADMIN + "create-form", formData)
      .then((res) =>
        toast.success("Form successfully submitted!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      )
      .catch((err) => {
        const message =
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString();

        toast.error(message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  return (
    <motion.div className="w-screen h-screen fixed !top-0 !left-0 flex z-999 bg-black/70 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        exit={{ opacity: 0 }}
        className="h-95 w-120 bg-gray-100 relative items-center justify-center shadow-md rounded-sm"
      >
        <AiOutlineCloseSquare
          onClick={() => setShowAddForm(false)}
          className="w-6.5 h-6.5 absolute top-1 right-1 cursor-pointer flex items-center justify-center mr-1 text-red-400 border-none active:scale-1 active:duration-75 transition-all ease-in-out hover:text-red-500 rounded-sm hover:rounded-sm"
        />
        <div className="h-18  w-full prdc-color flex px-4 ">
          <img
            src={API_URL + branding[0]?.Logo}
            className="h-15 object-cover self-center"
          />
          <p className="text-[25px] arial-narrow-bold uppercase text-white self-center ml-4">
            {decoded.dept == "HR"
              ? "Human Resources"
              : decoded.dept == "SALES"
              ? "Sales"
              : decoded.dept == "OPS"
              ? "Operation"
              : decoded.dept == "AMAD"
              ? "Asset Management"
              : decoded.dept == "ACC"
              ? "Accounting & Finance"
              : decoded.dept == "TA"
              ? "Talent Acquisition"
              : decoded.dept == "BSD"
              ? "Business Support"
              : decoded.dept == "TSD"
              ? "Technical Services"
              : ""}{" "}
            <br />
            DEPARTMENT FORM
          </p>
        </div>
        <form
          className="w-full h-full flex flex-col mt-2"
          onSubmit={submit_form}
        >
          <div className="flex w-full items-center text-black mt-2 px-8 justify-between">
            <span className=" border-black arial-narrow-bold  inline-block w-[8rem] text-[18px]">
              Date Requested :
            </span>
            <input
              type="date"
              className=" w-40 h-6 border border-black arial-narrow px-2 text-[16px]"
              required
              onChange={(e) =>
                setFieldForms({ ...fieldForms, dateRequest: e.target.value })
              }
            />
          </div>

          <div className="flex w-full items-center text-black mt-2 px-8 justify-between">
            <span className=" border-black arial-narrow-bold  inline-block w-[8rem] text-[18px]">
              Form Name :
            </span>
            <input
              className="w-40 h-6 border border-black arial-narrow px-2 text-[16px]"
              placeholder="Form name"
              required
              onChange={(e) =>
                setFieldForms({ ...fieldForms, formName: e.target.value })
              }
            />
          </div>

          <div className="flex w-full items-center text-black mt-2 px-8 justify-between">
            <span className="border-black arial-narrow-bold  inline-block w-[8rem] text-[18px]">
              Department :
            </span>
            <input
              className=" w-40 h-6 border border-black arail-narrow px-2 text-[16px]"
              required
              readOnly
              value={jwt(user)?.dept}
            />
          </div>

          <div className="mt-6 flex flex-col self-center">
            <span className="text-center arial-narrow-bold text-black mb-2">
              Upload Document
            </span>
            <div className=" h-15 w-60  flex border-gray-400 items-center justify-center cursor-pointer overflow-auto border">
              <div
                className="h-14 w-80 flex items-center justify-center flex-col rounded-md  cursor-pointer  "
                {...getRootProps()}
                id="file"
              >
                {file ? (
                  <div className="flex items-center">
                    <label>{file.name}</label>
                    <iframe
                      src={file.preview}
                      className="h-16 w-16 object-contain p-3"
                    />
                  </div>
                ) : isDragReject ? (
                  <p>DOCX FILE ONLY!</p>
                ) : (
                  <>
                    <BiCloudUpload className="text-[40px] mr-4 text-blue-600" />
                    <p className="font-Roboto text-[10px] text-gray-400">
                      Choose a file or drag it here or browse your word file.
                    </p>
                  </>
                )}
              </div>
              <input type="file" accept=".docx" {...getInputProps()} />
            </div>
          </div>
          <button className="flex justify-center items-center mt-8 mr-2 w-25 h-7 self-end align-bottom border-[1px] border-[prdc-color] text-black rounded-none arial-narrow-bold hover:(border-[2px] border-black text-green-600)">
            <AiOutlineSave className="mr-1" />
            SUBMIT
          </button>
        </form>
        <hr className="prdc-color w-full absolute h-4 bottom-0" />
      </motion.div>
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
        theme="colored"
      />
    </motion.div>
  );
};

export default FormAdd;
