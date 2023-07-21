/*EMPTY FIELDS THAT NEEDS TO DISCUSS WITH 
1. DATE HIRED
2. EMPLOYEE STREET ADDRESS
3. EMPLOYEE CONTACT NUMBER
*/
import React from "react";
import Navbar from "../../components/Navbar";
import { FaUserTie } from "react-icons/fa";
import { useSelector } from "react-redux";
import jwt from "jwt-decode";
import moment from "moment";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.user);
  const decodedToken = jwt(user);

  return (
    <div className="w-screen h-screen flex flex-col">
      <Navbar />
      <div className="h-15 w-full" />
      <div className="bg-white w-full h-full px-20 py-5 flex justify-center <md:(px-0 py-0) dark:(bg-gray-900)">
        <div className="grid grid-cols-1 grid-row gap-1 w-90 <md:(w-full)">
          <div className="bg-gray-300 rounded-md h-full w-full flex flex-col items-center justify-start p-3 text-center dark:(bg-[rgba(255,255,255,0.14)] shadow-sm shadow-white backdrop-blur-md) <md:(justify-center rounded-none)">
            <span className="my-2 arial-narrow-bold text-[20px] font-bold text-black dark:(text-white)">
              EMPLOYEE INFO
            </span>
            <FaUserTie className="text-[120px] text-white bg-blue-900 rounded-full p-2" />
            <span className="mt-4 arial-narrow font-bold text-[20px] text-black dark:(text-white)">
              {decodedToken?.name}
            </span>
            <span className="mt-2 arial-narrow font-semibold text-black dark:(text-white)">
              090909090
            </span>
            <span className="arial-narrow font-semibold text-black dark:(text-white)">
              {decodedToken?.email}
            </span>
            <span className="arial-narrow font-semibold text-black dark:(text-white)">
              Robert Robertson, 1234 NW Bobcat Lane, St. Robert, MO 65584-5678.
            </span>
          </div>

          <div className="bg-gray-300 rounded-md h-full w-full p-3 text-center dark:(bg-[rgba(255,255,255,0.14)] shadow-sm shadow-white backdrop-blur-md) <md:(rounded-none)">
            <span className="text-[20px] arial-narrow-bold font-bold text-black dark:(text-white)">
              EMPLOYEE STATUS
            </span>
            <div className="w-full grid gap-3 grid-cols-2 text-start mt-4 text-black dark:(text-white) arial-narrow text-[18px]">
              <div className="w-full flex justify-start">
                <span>Employee ID:</span>
              </div>

              <div className="w-full flex justify-end">
                <span>{decodedToken?.employeeId}</span>
              </div>
              <div className="w-full flex justify-start">
                <span>Position:</span>
              </div>

              <div className="flex w-full justify-end">
                <span>
                  {decodedToken?.role === 4
                    ? "Associate"
                    : decodedToken?.role === 3
                    ? "Team Leader"
                    : decodedToken?.role === 2
                    ? "Supervisor"
                    : decodedToken?.role === 1
                    ? "Manager"
                    : "Admin"}
                </span>
              </div>

              <div className="w-full flex justify-start">
                <span>Department:</span>
              </div>

              <div className="w-full flex justify-end">
                <span>{decodedToken?.dept}</span>
              </div>

              <div className="w-full flex justify-start">
                <span>Date Hired:</span>
              </div>

              <div className="w-full flex justify-end">
                <span>
                  {moment(decodedToken?.created).format("MMM, DD, YYYY")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
