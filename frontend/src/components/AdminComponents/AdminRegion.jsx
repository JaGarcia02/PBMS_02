import React from "react";
import { BiSave } from "react-icons/bi";
const AdminRegion = () => {
  return (
    <div className="w-full h-full flex flex-col p-4 relative">
      <span className="text-[18px] arial-narrow-bold text-black">Region</span>
      <span className="arial-narrow-italic text-[15px] mt-3 text-black">
        Set standard region to be used for the whole systems.
      </span>
      <div className="flex flex-col">
        <div className="flex ml-3 mt-4">
          <input type="radio" checked />
          <span className="ml-2 arial-narrow text-black">Asia</span>
        </div>
        <div className="flex ml-3 mt-4">
          <input type="radio" disabled={true} />{" "}
          <span className="ml-2 arial-narrow text-black">Africa</span>
        </div>
        <div className="flex ml-3 mt-4">
          <input type="radio" disabled={true} />{" "}
          <span className="ml-2 arial-narrow text-black">North America</span>
        </div>
        <div className="flex ml-3 mt-4">
          <input type="radio" disabled={true} />{" "}
          <span className="ml-2 arial-narrow text-black">South America</span>
        </div>
        <div className="flex ml-3 mt-4">
          <input type="radio" disabled={true} />{" "}
          <span className="ml-2 arial-narrow text-black">Antartica</span>
        </div>
        <div className="flex ml-3 mt-4">
          <input type="radio" disabled={true} />{" "}
          <span className="ml-2 arial-narrow text-black">Europe</span>
        </div>
        <div className="flex ml-3 mt-4">
          <input type="radio" disabled={true} />{" "}
          <span className="ml-2 arial-narrow text-black">Australia</span>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="absolute arial-narrow-bold bottom-4 left-3 flex border-green-500 active:scale-1 rounded-sm text-[14px] h-7 w-24 hover:(border-green-500 rounded-sm) active:duration-75 transition-all hover:(scale-108 ease-in-out  transform py-1 rounded-sm)  mb-5 flex items-center justify-center text-green-600   mr-12 disabled:(bg-gray-500 border-gray-500 cursor-not-allowed)  focus:(outline-none) dark:(bg-transparent border-green-500 border-2 text-green-500"
        >
          <BiSave className="mr-2 text-green-600" />
          Update
        </button>
      </div>
    </div>
  );
};

export default AdminRegion;
