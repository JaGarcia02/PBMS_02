import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL_HR } from "../../../utils/Url";

const HrPagIbig = () => {
  const [pagibigValue, setPagibigValue] = useState("");

  const submit_pagibig = () => {
    axios
      .post(API_URL_HR + "upload-pagibig", { pagibig: pagibigValue })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(API_URL_HR + "get-pagibig")
      .then((res) => setPagibigValue(res.data[0].pagibig_value))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-start mt-2">
        <div>
          <img
            className="h-10 w-10 mr-1"
            src="https://upload.wikimedia.org/wikipedia/commons/5/5b/Pag-IBIG.svg"
            alt=""
          />
        </div>
        <div>
          <span className="arial-narrow-bold text-black text-[30px]">
            PAG-IBIG
          </span>
        </div>
      </div>
      <div className="flex mt-5 items-start w-[30%]">
        <span className="inline-block w-[12rem] arial-narrow-bold text-black">
          DEDUCTION VALUE:
        </span>
        <input
          className="border-black border w-40 focus:outline-none"
          onChange={(e) => setPagibigValue(e.target.value)}
          value={pagibigValue}
        />
      </div>
      <button
        className="absolute bottom-0 right-9 border-2 border-green-700 rounded-none w-25 arial-narrow-bold hover:(border-2 border-green-700 text-green-700)"
        onClick={submit_pagibig}
      >
        Submit
      </button>
    </div>
  );
};

export default HrPagIbig;
