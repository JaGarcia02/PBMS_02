import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoIosCloudUpload } from "react-icons/io";
import { AiOutlineSave, AiOutlineCheck } from "react-icons/ai";
import axios from "axios";
import { API_URL_ADMIN, API_URL_FORMS } from "../../utils/Url";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsFillTrashFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import jwt from "jwt-decode";

const AdminForms = () => {
  const [uploadFile, setUploadFile] = useState(null);
  const [formDesc, setFormDesc] = useState({
    formName: "",
    formDept: "",
  });
  const [listForms, setListForms] = useState([]);

  const { admin } = useSelector((state) => state.auth);

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    multiple: false,
    accept: { "application/*": [".docx", ".doc"] },
    onDrop: (acceptFiles) => {
      setUploadFile(acceptFiles[0]);
      console.log(
        acceptFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
    },
  });

  const { formName, formDept } = formDesc;
  //GET THE LIST OF FORMS
  useEffect(() => {
    const get_forms = async () => {
      const res = await axios.get(API_URL_ADMIN + "get-forms/ID");

      setListForms(res.data);
    };
    get_forms();
  }, []);

  //FUNCTION WHEN SAVE WAS CLICK
  const submit_Form = (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("formName", formName);
    formData.append("formDept", formDept);
    formData.append("file", uploadFile);
    formData.append("role", jwt(admin).role);

    axios
      .post(API_URL_ADMIN + "create-form", formData)
      .then((res) => {
        toast.success("Form successfully created!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setListForms(res.data);
        setUploadFile(null);
        setFormDesc({ formName: "", formDept: "" });
      })
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

  //FUNCTION THAT DELETE A FORM
  const deleteForm = (ID) => {
    axios
      .delete(API_URL_ADMIN + `delete-form/${ID}`)
      .then((res) => {
        toast.info("Form successfully deleted!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setListForms(res.data);
      })
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

  const approve = (ID) => {
    axios
      .put(API_URL_FORMS + "approve-form", { ID: ID })
      .then((res) => {
        toast.success("Form successfully approved", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setListForms(res.data);
      })
      .catch((err) =>
        toast.reject("Error", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      );
  };

  return (
    <div className="w-full h-full flex flex-col p-4">
      <span className="text-[18px] arial-narrow-bold text-black">
        Upload Company Forms
      </span>
      <form onSubmit={submit_Form} className="w-120  flex flex-col pr-12">
        <div className="items-center justify-start flex mt-10">
          <spa className="inline-block arial-narrow w-[7rem] text-[14px]">
            Form Name:
          </spa>
          <input
            required
            className=" border w-80 border-black focus:(outline-none)"
            onChange={(e) =>
              setFormDesc({ ...formDesc, formName: e.target.value })
            }
            value={formDesc.formName}
          />
        </div>
        <div className="items-center justify-start flex mt-10">
          <span className="inline-block arial-narrow w-[7rem] text-[14px]">
            Form Department:
          </span>
          <select
            required
            className=" border w-80 border-black focus:(outline-none)"
            onChange={(e) =>
              setFormDesc({ ...formDesc, formDept: e.target.value })
            }
            value={formDesc.formDept}
          >
            <option hidden selected value="">
              Choose department
            </option>
            <option value="All">Public Form</option>
            <option value="HR">Human Resources</option>
            <option value="SALES">Sales</option>
            <option value="OPS">Operations</option>
            <option value="AMAD">Asset Management Admin</option>
            <option value="ACC">Accounting & Finance</option>
            <option value="TA">Talent Acquisition</option>
            <option value="BSD">Business Support</option>
            <option value="TSD">Technical Services</option>
          </select>
        </div>
        <div className="items-center justify-start flex mt-10">
          <span className="inline-block arial-narrow w-[7rem] text-[14px]">
            Document File:
          </span>
          <div className="flex flex-col items-end">
            <div
              className="h-20 w-80 flex items-center justify-center rounded-md bg-blue-300 cursor-pointer overflow-auto border"
              {...getRootProps()}
              id="file_logo"
            >
              {uploadFile ? (
                <div className="flex items-center">
                  <label>{uploadFile?.name}</label>
                </div>
              ) : isDragReject ? (
                <p>Docx File only!</p>
              ) : (
                <>
                  <IoIosCloudUpload className="text-[40px] mr-4 text-blue-600" />
                  <p className="font-Roboto text-[15px]">
                    Choose a file or drag it here.
                  </p>
                </>
              )}
            </div>
            <input type="file" required {...getInputProps()} />
          </div>
        </div>
        <button
          type="submit"
          className="self-end mt-5 w-25 h-9 rounded-sm bg-green-800 text-white flex items-center justify-center"
        >
          <AiOutlineSave className="mr-1 " /> Save
        </button>
      </form>
      <div className="w-full flex flex-col mt-30 flex items-start">
        <span className="arial-narrow-bold text-[18px] text-black">
          List of Forms
        </span>
        <table className="w-[90%] text-black arial-narrow-bold text-[15px] mt-4">
          <tr>
            <th className="w-4 text-left">#</th>
            <th className="w-70 text-left">Form Name</th>
            <th className="text-left w-70">Form Department</th>
            <th className="text-left">Action</th>
          </tr>

          {listForms.map((data, index) => (
            <tr className="border border-gray-400">
              <td>{index + 1}</td>
              <td>{data.admin_FormName}</td>
              <td>{data.admin_Dept}</td>
              <td className="flex">
                <button
                  className="bg-red-600 flex items-center justify-center p-1 text-white"
                  onClick={() => deleteForm(data.ID)}
                >
                  <BsFillTrashFill />
                </button>
                {data.admin_FormStatus == 0 && (
                  <button
                    className="bg-green-600 flex items-center justify-center p-1 text-white ml-1"
                    onClick={() => approve(data.ID)}
                  >
                    <AiOutlineCheck />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </table>
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
        theme="colored"
      />
    </div>
  );
};

export default AdminForms;
