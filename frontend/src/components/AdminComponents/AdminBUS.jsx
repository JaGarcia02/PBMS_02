import React, { useState } from "react";
import { useEffect } from "react";
import { IoAddSharp } from "react-icons/io5";
import axios from "axios";
import { API_URL_ADMIN } from "../../utils/Url";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminBUS = () => {
  const [sections, setSections] = useState([]);

  // Notify Delete
  const notify_CreateSection = () => {
    toast.success("Section Created", {
      position: "bottom-right",
      hideProgressBar: true,
      autoClose: 3000,
      pauseOnHover: false,
      theme: "colored",
    });
  };
  // Notify Delete
  const notify_DeleteSection = () => {
    toast.error("Section Created", {
      position: "bottom-right",
      hideProgressBar: true,
      autoClose: 3000,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  useEffect(() => {
    axios
      .get(API_URL_ADMIN + "get-section")
      .then((res) => setSections(res.data))
      .catch((err) => console.log(err));
  }, []);

  const createOrUpdate = (sectionName, checked, department) => {
    if (checked) {
      axios
        .put(API_URL_ADMIN + `update-section/${sectionName}`, {
          admin_sectionDepartment: department,
        })
        .then((res) => {
          notify_CreateSection();
          setSections(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .delete(API_URL_ADMIN + `remove-section/${sectionName}`)

        .then((res) => {
          notify_DeleteSection(), setSections(res.data);
        })

        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="w-full h-full flex flex-col p-4">
      <ToastContainer />
      <span className="text-[32px] arial-narrow-bold text-black">
        Business Unit Segment
      </span>
      <p className="text-[15px] arial-narrow mt-1">
        Check/uncheck under system column to set which sub-module and the system
        with your enterprise system have access on.
      </p>

      {/* <button className="ml-7 m w-42 h-8 mt-2 text-[15px] justify-center border-none items-center text-black flex hover:(bg-gray-300)">
        <IoAddSharp className="mr-1 w-5 h-fixed text-black" />
        Add Business Unit
      </button> */}
      <table className="w-120  h-auto mt-4">
        <tr className="  text-left">
          <th className="w-91   text-black arial-narrow-bold">Sub-Module</th>
          <th className="w-91 text-black arial-narrow-bold">System</th>
        </tr>
        <tr className="border  border-black">
          <td className=" border border-black items-start">
            <div className=" h-25  border-black border-b flex items-start ">
              <div className="items-center justify-center flex ">
                <span className="arial-narrow pl-2">Accounting</span>
              </div>
            </div>
            <div className="flex h-21   items-start ">
              <div className=" items-center justify-center mt-3 flex">
                <span className="arial-narrow pl-2">Finance</span>
              </div>
            </div>
          </td>

          <td className=" border border-black">
            <div className="flex h-7 items-start ">
              <div className="items-center justify-center flex">
                <input type="checkbox" className="ml-5" />
                <span className="arial-narrow pl-2">Payroll</span>
              </div>
            </div>

            <div className="flex h-7 items-start ">
              <div className="items-center justify-center flex">
                <input type="checkbox" className="ml-5" />
                <span className="arial-narrow pl-2">Payables</span>
              </div>
            </div>

            <div className="flex h-7  items-start ">
              <div className="items-center justify-center flex">
                <input type="checkbox" className="ml-5" />
                <span className="arial-narrow pl-2">Disbursment</span>
              </div>
            </div>

            <div className="flex h-7 border-b border-black   items-start ">
              <div className="items-center justify-center flex">
                <input type="checkbox" className="ml-5" />
                <span className="arial-narrow pl-2">Book keeping</span>
              </div>
            </div>
            <div className="flex h-8  items-start ">
              <div className="items-center justify-center flex">
                <input type="checkbox" className="ml-5" />
                <span className="arial-narrow pl-2">Billing</span>
              </div>
            </div>
            <div className="flex h-8   items-start ">
              <div className="items-center justify-center flex">
                <input type="checkbox" className="ml-5" />
                <span className="arial-narrow pl-2">Reciept</span>
              </div>
            </div>
            <div className="flex h-8    items-start ">
              <div className="items-center justify-center flex">
                <input type="checkbox" className="ml-5" />
                <span className="arial-narrow pl-2">Treasury</span>
              </div>
            </div>
          </td>
        </tr>
        <tr className="  text-left">
          <td className="border  border-black">
            <td className=" border-black text-black arial-narrow flex ">
              <span className="arial-narrow pl-2">Human Resources</span>
            </td>
          </td>

          <td className="border  border-black">
            <div className="flex h-7    items-start">
              <div className="items-center justify-center flex">
                <input
                  type="checkbox"
                  className="ml-5"
                  onChange={(e) =>
                    createOrUpdate("hr-default", e.target.checked, "HR")
                  }
                  checked={sections?.some(
                    (data) => data.admin_sectionName == "hr-default"
                  )}
                />
                <span className="arial-narrow pl-2">HR Default Settings</span>
              </div>
            </div>
            <div className="flex h-7    items-start ">
              <div className="items-center justify-center flex">
                <input
                  type="checkbox"
                  className="ml-5"
                  onChange={(e) =>
                    createOrUpdate(
                      "Compensation-Benefits",
                      e.target.checked,
                      "HR"
                    )
                  }
                  checked={sections?.some(
                    (data) => data.admin_sectionName == "Compensation-Benefits"
                  )}
                />
                <span className="arial-narrow pl-2">Compensation Benefits</span>
              </div>
            </div>
            <div className="flex h-7    items-start ">
              <div className="items-center justify-center flex">
                <input
                  type="checkbox"
                  className="ml-5"
                  onChange={(e) =>
                    createOrUpdate("Timekeeping", e.target.checked, "HR")
                  }
                  checked={sections?.some(
                    (data) => data.admin_sectionName == "Timekeeping"
                  )}
                />
                <span className="arial-narrow pl-2">Time Keeping</span>
              </div>
            </div>
            <div className="flex h-7 items-start ">
              <div className="items-center justify-center flex">
                <input
                  type="checkbox"
                  className="ml-5"
                  onChange={(e) =>
                    createOrUpdate("Recruitment", e.target.checked, "HR")
                  }
                  checked={sections?.some(
                    (data) => data.admin_sectionName == "Recruitment"
                  )}
                />
                <span className="arial-narrow pl-2">Recruitment</span>
              </div>
            </div>
            <div className="flex h-7 items-start ">
              <div className="items-center justify-center flex">
                <input
                  type="checkbox"
                  className="ml-5"
                  onChange={(e) =>
                    createOrUpdate(
                      "Employee-Management",
                      e.target.checked,
                      "HR"
                    )
                  }
                  checked={sections?.some(
                    (data) => data.admin_sectionName == "Employee-Management"
                  )}
                />
                <span className="arial-narrow pl-2">Employee Management</span>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default AdminBUS;

/**
 *
 *
 *
 *
 *
 *
 */
