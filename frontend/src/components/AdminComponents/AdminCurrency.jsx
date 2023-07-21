import { useState } from "react";
import axios from "axios";
import { API_URL_ADMIN } from "../../utils/Url";
import { BiSave } from "react-icons/bi";
function AdminCurrency() {
  const [currency, setCurrency] = useState("");

  const update_currency = (e) => {
    e.preventDefault();

    axios
      .post(API_URL_ADMIN + "setup_setting", { currency })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full h-full flex flex-col p-4 relative">
      <span className="arial-narrow-bold text-[18px] text-black">Currency</span>
      <span className="arial-narrow-italic text-[15px] mt-3 text-black">
        Applicable to all amount matters in the system.
      </span>
      <div className="h-full w-full flex flex-col mt-8">
        <div className="h-10 w-100 flex justify-between items-center">
          <span className="text-black ml-10 arial-narrow">Symbol</span>
          <select
            className=" w-50 mr-10 h-7 shadow shadow-gray-600 text-[14px]"
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option>₱</option>
            <option>$</option>
          </select>
        </div>

        <button
          onClick={update_currency}
          className=" absolute arial-narrow-bold bottom-4 left-3 border-green-500 active:scale-1 rounded-sm text-[14px] h-7 w-24 hover:(border-green-500 rounded-sm) active:duration-75 transition-all hover:(scale-108 ease-in-out  transform py-1 rounded-sm)  mb-5 flex items-center justify-center text-green-600   mr-12 disabled:(bg-gray-300 border-green-500 cursor-not-allowed)  focus:(outline-none) dark:(bg-transparent border-green-500 border-2 text-green-500"
        >
          <BiSave className="mr-2 text-green-600 " />
          Update
        </button>
      </div>
    </div>
  );
}

export default AdminCurrency;
