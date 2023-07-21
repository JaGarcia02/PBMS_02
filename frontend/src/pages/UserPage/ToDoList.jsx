import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { CgAddR } from "react-icons/cg";

const ToDoList = () => {
  const [addNewTask, setAddNewTask] = useState(false);
  return (
    <div className="h-screen backg-color-prdc w-screen">
      <Navbar />
      <div className="flex flex-col w-full h-full">
        <div className="mt-15  flex w-full items-center flex-row justify-end h-full  ">
          <table className="h-full w-[85%] items-center flex-col justify-start mt-3 flex bg-gray-200 ">
            <tr className="w-full flex px-2">
              <th className="w-[38%]  rounded-sm relative h-10 mt-3 items-center justify-start flex shadow-md shadow-gray-100 bg-white">
                <CgAddR
                  className="ml-3 absolute hover:text-[20px]"
                  onClick={() => setAddNewTask(!addNewTask)}
                />
                <span className="items-center justify-center flex w-full arial-narrow-bold text-[15px]">
                  TASKS
                </span>
              </th>
              <th className="w-[20%] rounded-sm ml-1 h-10 mt-3 items-center justify-center flex arial-narrow-bold text-[15px]  shadow-md shadow-gray-100 bg-white">
                DATE CREATED
              </th>
              <th className="w-[20%] rounded-sm ml-1 h-10 mt-3 items-center justify-center flex arial-narrow-bold text-[15px]  shadow-md shadow-gray-100 bg-white">
                DEADLINE
              </th>
              <th className="w-[20%] ml-1 h-10 mt-3 items-center justify-center flex arial-narrow-bold text-[15px]  shadow-md shadow-gray-100 bg-white">
                STATUS
              </th>
            </tr>
            <tr className="w-full flex px-2">
              <td className="w-[38%]  rounded-sm h-10 mt-3 items-center justify-center flex shadow-md shadow-gray-100 arial-narrow text-[11px] bg-white">
                TASK 1
              </td>
              <td className="w-[20%] rounded-sm ml-1 h-10 mt-3 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 bg-white">
                {" "}
                DATE CREATED{" "}
              </td>
              <td className="w-[20%] rounded-sm ml-1 h-10 mt-3 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 bg-white">
                DATE DEADLINE
              </td>
              <td className="w-[20%] rounded-sm ml-1 h-10 mt-3 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 bg-white"></td>
            </tr>
            {addNewTask && (
              <tr className="w-full flex px-2">
                <td className="w-[38%]  rounded-sm h-10 mt-3 items-center justify-center flex shadow-md shadow-gray-100 arial-narrow text-[11px] bg-white"></td>
                <td className="w-[20%] rounded-sm ml-1 h-10 mt-3 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 bg-white"></td>
                <td className="w-[20%] rounded-sm ml-1 h-10 mt-3 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 bg-white"></td>
                <td className="w-[20%] rounded-sm ml-1 h-10 mt-3 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 bg-white"></td>
              </tr>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
