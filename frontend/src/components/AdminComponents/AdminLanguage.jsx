import React from "react";
import { BiSave } from "react-icons/bi";
function AdminLanguage() {
  return (
    <div className="w-full h-full flex flex-col p-4 relative">
      <span className="arial-narrow-bold text-[18px] text-black">Language</span>
      <span className="arial-narrow-italic text-[15px] mt-3 text-black">
        Set standard language to be used for the whole systems.
      </span>
      <div className="flex flex-col items-start justify-start">
        <div className="items-center mt-3 flex justify-center">
          <input type="radio" checked />
          <span className="ml-3">English</span>
        </div>
        <div className="items-center mt-3 flex justify-center">
          <input type="radio" disabled={true} />
          <span className="ml-3">Indonesian</span>
        </div>
        <div className="items-center mt-3 flex justify-center">
          <input type="radio" disabled={true} />
          <span className="ml-3">Italiano</span>
        </div>
        <button
          onClick={() => window.location.reload()}
          disabled={true}
          className=" absolute arial-narrow-bold bottom-4 left-3 border-green-500 active:scale-1 rounded-sm text-[14px] h-7 w-24 hover:(border-green-500 rounded-sm) active:duration-75 transition-all hover:(scale-108 ease-in-out  transform py-1 rounded-sm)  mb-5 flex items-center justify-center text-green-600   mr-12 disabled:(bg-gray-300 border-green-500 cursor-not-allowed)  focus:(outline-none) dark:(bg-transparent border-green-500 border-2 text-green-500"
        >
          <BiSave className="mr-2 text-green-600 " />
          Update
        </button>
      </div>
    </div>
  );
}

export default AdminLanguage;
