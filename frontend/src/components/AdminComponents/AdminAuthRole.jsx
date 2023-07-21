import React, { useState, useEffect } from "react";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";
import { API_URL_ADMIN } from "../../utils/Url";
import { ToastContainer, toast } from "react-toastify";
import { Logs } from "../../utils/Logs";

const AdminAuthRole = () => {
  const [authData, setAuthData] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL_ADMIN + "get-authorization")
      .then((res) => setAuthData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const notify_AuthRole = () => {
    toast.warn("Authorization Role Has Been Changed / Updated!", {
      position: "bottom-right",
      hideProgressBar: true,
      pauseOnHover: false,
      theme: "colored",
      autoClose: 4000,
    });
  };

  const updateAuth = (
    admin_add,
    admin_edit,
    admin_print,
    admin_void,
    admin_delete,
    admin_role
  ) => {
    axios
      .put(API_URL_ADMIN + "update-auth", {
        admin_add,
        admin_edit,
        admin_print,
        admin_void,
        admin_delete,
        admin_authNumberRole: admin_role,
      })
      .then((res) => {
        notify_AuthRole();
        setAuthData(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full h-full flex flex-col p-4">
      <ToastContainer />
      <span className="text-[18px] arial-narrow-bold text-black">
        Authorization and Role
      </span>
      <table className=" w-[70%] flex mt-5 text-left flex-col">
        <tr className="flex  items-start w-[100%] text-left">
          <th className="w-40 border-b border-black arial-narrow-bold ">
            Roles
          </th>
          <th className="w-20 border-b border-black arial-narrow"> ADD</th>
          <th className="w-20 border-b border-black arial-narrow"> EDIT</th>
          <th className="w-20 border-b border-black arial-narrow"> PRINT</th>
          <th className="w-20 border-b border-black arial-narrow"> CANCEL</th>
          <th className="w-20 border-b border-black arial-narrow"> DELETE</th>
        </tr>
        {authData.map((data) => {
          return (
            <tr className="flex item-center w-[95%]">
              <td className="w-40 border-b border-black arial-narrow pt-5">
                {data.admin_authDescription}
              </td>

              <td className="w-20 text-start items-start border-b  border-black  items-end flex">
                {data.admin_add == 1 ? (
                  <AiFillCheckCircle
                    className="text-[25px] text-green-500 cursor-pointer flex "
                    onClick={() =>
                      updateAuth(
                        0,
                        data.admin_edit,
                        data.admin_print,
                        data.admin_void,
                        data.admin_delete,
                        data.admin_authNumberRole
                      )
                    }
                  />
                ) : (
                  <AiFillCloseCircle
                    className="text-[25px] cursor-pointer text-red-500 flex "
                    onClick={() =>
                      updateAuth(
                        1,
                        data.admin_edit,
                        data.admin_print,
                        data.admin_void,
                        data.admin_delete,
                        data.admin_authNumberRole
                      )
                    }
                  />
                )}
              </td>
              <td className="w-20 text-start items-start border-b  border-black  items-end flex">
                {data.admin_edit == 1 ? (
                  <AiFillCheckCircle
                    className="text-[25px] cursor-pointer text-green-500 flex "
                    onClick={() =>
                      updateAuth(
                        data.admin_add,
                        0,
                        data.admin_print,
                        data.admin_void,
                        data.admin_delete,
                        data.admin_authNumberRole
                      )
                    }
                  />
                ) : (
                  <AiFillCloseCircle
                    className="text-[25px] cursor-pointer text-red-500 flex "
                    onClick={() =>
                      updateAuth(
                        data.admin_add,
                        1,
                        data.admin_print,
                        data.admin_void,
                        data.admin_delete,
                        data.admin_authNumberRole
                      )
                    }
                  />
                )}
              </td>
              <td className="pl-2 w-20 text-start items-start border-b  border-black  items-end flex">
                {data.admin_print == 1 ? (
                  <AiFillCheckCircle
                    className="text-[25px] cursor-pointer text-green-500 flex "
                    onClick={() =>
                      updateAuth(
                        data.admin_add,
                        data.admin_edit,
                        0,
                        data.admin_void,
                        data.admin_delete,
                        data.admin_authNumberRole
                      )
                    }
                  />
                ) : (
                  <AiFillCloseCircle
                    className="text-[25px] cursor-pointer text-red-500 flex "
                    onClick={() =>
                      updateAuth(
                        data.admin_add,
                        data.admin_edit,
                        1,
                        data.admin_void,
                        data.admin_delete,
                        data.admin_authNumberRole
                      )
                    }
                  />
                )}
              </td>

              <td className="w-20 text-start items-start border-b  border-black  items-end flex">
                {data.admin_void == 1 ? (
                  <AiFillCheckCircle
                    className="text-[25px] cursor-pointer text-green-500 flex "
                    onClick={() =>
                      updateAuth(
                        data.admin_add,
                        data.admin_edit,
                        data.admin_print,
                        0,
                        data.admin_delete,
                        data.admin_authNumberRole
                      )
                    }
                  />
                ) : (
                  <AiFillCloseCircle
                    className="text-[25px] cursor-pointer text-red-500 flex "
                    onClick={() =>
                      updateAuth(
                        data.admin_add,
                        data.admin_edit,
                        data.admin_print,
                        1,
                        data.admin_delete,
                        data.admin_authNumberRole
                      )
                    }
                  />
                )}
              </td>

              <td className="pl-3 w-20 text-start items-start border-b  border-black  items-end flex">
                {data.admin_delete == 1 ? (
                  <AiFillCheckCircle
                    className="text-[25px] cursor-pointer text-green-500 flex "
                    onClick={() =>
                      updateAuth(
                        data.admin_add,
                        data.admin_edit,
                        data.admin_print,
                        data.admin_void,
                        0,
                        data.admin_authNumberRole
                      )
                    }
                  />
                ) : (
                  <AiFillCloseCircle
                    className="text-[25px] cursor-pointer text-red-500 flex "
                    onClick={() =>
                      updateAuth(
                        data.admin_add,
                        data.admin_edit,
                        data.admin_print,
                        data.admin_void,
                        1,
                        data.admin_authNumberRole
                      )
                    }
                  />
                )}
              </td>
            </tr>
          );
        })}
      </table>
      {/* <table className=" w-[70%] flex mt-5 text-left flex-col">
        <tr className="flex  items-start w-[100%] text-left">
          <td className="w-161 border-b border-black arial-narrow-bold ">
            Role
          </td>
        </tr>
        <tr className="flex item-center items-end w-[95%]">
          <td className="w-41 border-b border-black arial-narrow pt-2">
            Admin
          </td>
          <td className="w-120 border-b  border-black arial-narrow ">
            Can access all the department (module) functions.
          </td>
        </tr>
        <tr className="flex item-center items-end w-[95%]">
          <td className="w-41 border-b border-black arial-narrow pt-2">
            Viewer
          </td>

          <td className="w-120 border-b  border-black arial-narrow ">
            Viewer only.
          </td>
        </tr>
        <tr className="flex item-center items-end w-[95%]">
          <td className="w-41 border-b border-black arial-narrow pt-2">
            Encoder
          </td>

          <td className="w-120 border-b  border-black arial-narrow ">
            Applicable for all authorization.
          </td>
        </tr>
        <tr className="flex item-center items-end w-[95%]">
          <td className="w-41 border-b border-black arial-narrow pt-2">
            Approver
          </td>

          <td className="w-120 border-b  border-black arial-narrow ">
            Applicable only for the authorize Executives, Manager, and
            Supervisor.
          </td>
        </tr>
      </table> */}
    </div>
  );
};

export default AdminAuthRole;
