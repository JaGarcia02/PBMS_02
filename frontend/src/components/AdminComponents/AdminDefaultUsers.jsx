import React, { useEffect } from "react";
import axios from "axios";
import { API_URL_USER } from "../../utils/Url";
import { useSelector } from "react-redux";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsEyeSlash } from "react-icons/bs";

const AdminDefaultUsers = () => {
  const { admin } = useSelector((state) => state.auth);
  const [defaultUsers, setDefaultUsers] = useState([]);

  const DefaultUseresNotifyCheckBox = (bool, dept) => {
    if (bool) {
      toast.success(`${dept} default admin has been activated!`, {
        position: "bottom-right",
        hideProgressBar: true,
        pauseOnHover: false,
        theme: "colored",
      });
    } else {
      toast.error(`${dept} default admin account has been deactivated!`, {
        position: "bottom-right",
        hideProgressBar: true,
        pauseOnHover: false,
        theme: "colored",
      });
    }
  };

  const config = {
    headers: {
      Authorization: `Bearer ${admin}`,
    },
  };

  useEffect(() => {
    axios
      .get(API_URL_USER + "checkAll/ID?q=IT", config)
      .then((res) => setDefaultUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const DefaultHR = async (bool, emp_ID, access, username, dept) => {
    if (bool) {
      const res = await axios.post(
        API_URL_USER + "create-user",
        {
          username: username,
          password: "password",
          role: "2",
          section: access,
          employee_id: "IT" + emp_ID,
          email: username + "@gmail.com", // WAG KALIMUTAN PALITAN OR ELSE SABOG GMAIL KO
          LastName: "IT",
          firstName: "IT",
          MiddleName: "IT",
          department: dept,
          change_password: 0,
        },
        config
      );

      setDefaultUsers([...defaultUsers, res.data]);
    } else {
      const res1 = await axios.delete(
        API_URL_USER + `delete-default/${"IT" + emp_ID}`,
        config
      );
      setDefaultUsers(res1.data);
    }
    DefaultUseresNotifyCheckBox(bool, dept);
  };

  return (
    <div className="w-full h-full flex flex-col p-4">
      <ToastContainer autoClose={3000} />
      <span className="text-[18px] text-black arial-narrow-bold">
        Default Users
      </span>
      <div>
        <div className="flex ml-5 mt-5  arial-narrow text-black">
          <input
            type="checkbox"
            onChange={(e) =>
              DefaultHR(
                e.target.checked,
                "HR",
                "Recruitment,Compensation-Benefits,Timekeeping,all,hr-default,Employee-Management",
                "hrdup",
                "HR"
              )
            }
            checked={defaultUsers?.some((data) => data?.employee_id == "ITHR")}
          />
          <span className="ml-2">Human Resources Department</span>
        </div>
        <div className="flex ml-5 mt-5  arial-narrow text-black">
          <input
            type="checkbox"
            onChange={(e) =>
              DefaultHR(
                e.target.checked,
                "TA",
                "Recruitment,ta-default,all",
                "tadup",
                "TA"
              )
            }
            checked={defaultUsers?.some((data) => data?.employee_id == "ITTA")}
          />{" "}
          <span className="ml-2">Talent Acquisition Department</span>
        </div>
        <div className="flex ml-5 mt-5  arial-narrow text-black">
          <input
            type="checkbox"
            onChange={(e) =>
              DefaultHR(
                e.target.checked,
                "OPS",
                "Compensation,ops-default,all",
                "opsdup",
                "OPS"
              )
            }
            checked={defaultUsers?.some((data) => data?.employee_id == "ITOPS")}
          />{" "}
          <span className="ml-2">Operation Department</span>
        </div>
        <div className="flex ml-5 mt-5  arial-narrow text-black">
          <input
            type="checkbox"
            onChange={(e) =>
              DefaultHR(
                e.target.checked,
                "ACC",
                "Billing,acc-default,all",
                "accdup",
                "ACC"
              )
            }
            checked={defaultUsers?.some((data) => data?.employee_id == "ITACC")}
          />{" "}
          <span className="ml-2">Accounting Department</span>
        </div>
        <div className="flex ml-5 mt-5  arial-narrow text-black">
          <input
            type="checkbox"
            onChange={(e) =>
              DefaultHR(e.target.checked, "TSD", "all", "tsddup", "TSD")
            }
            checked={defaultUsers?.some((data) => data?.employee_id == "ITTSD")}
          />{" "}
          <span className="ml-2">Technical Services Department</span>
        </div>
        <div className="flex ml-5 mt-5 arial-narrow text-black">
          <input
            type="checkbox"
            onChange={(e) =>
              DefaultHR(
                e.target.checked,
                "AMAD",
                "Inventory,amad-default,all",
                "amaddup",
                "AMAD"
              )
            }
            checked={defaultUsers?.some(
              (data) => data?.employee_id == "ITAMAD"
            )}
          />{" "}
          <span className="ml-2">Assets Management and Admin Department</span>
        </div>
        <div className="flex ml-5 mt-5  arial-narrow text-black">
          <input
            type="checkbox"
            onChange={(e) =>
              DefaultHR(
                e.target.checked,
                "BSD",
                "Ticketing,all",
                "bsddup",
                "BSD"
              )
            }
            checked={defaultUsers?.some((data) => data?.employee_id == "ITBSD")}
          />{" "}
          <span className="ml-2">Business Support Department</span>
        </div>
        <div className="flex ml-5 mt-5 arial-narrow text-black ">
          <input
            type="checkbox"
            onChange={(e) =>
              DefaultHR(
                e.target.checked,
                "SALES",
                "Client,sales-default,all",
                "salesdup",
                "SALES"
              )
            }
            checked={defaultUsers?.some(
              (data) => data?.employee_id == "ITSALES"
            )}
          />{" "}
          <span className="ml-2">Sales Department</span>
        </div>
      </div>
    </div>
  );
};

export default AdminDefaultUsers;
