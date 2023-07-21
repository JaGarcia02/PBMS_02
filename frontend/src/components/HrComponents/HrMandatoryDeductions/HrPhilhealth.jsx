import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL_HR } from "../../../utils/Url";

const HrPhilhealth = () => {
  const [philHealth, setPhilHealth] = useState(0);

  const submit_philhealth = () => {
    axios
      .post(API_URL_HR + "upload-philHealth", { phillH: philHealth })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(API_URL_HR + "get-philhealth")
      .then((res) => setPhilHealth(res.data[0]?.hr_PhilHealth * 100))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="flex flex-col">
        <div className="flex items-center justify-start mt-2">
          <div>
            <img
              className="h-10 w-25 mr-1"
              src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Philippine_Health_Insurance_Corporation_%28PhilHealth%29.svg"
              alt=""
            />
          </div>
          <div>
            <span className="arial-narrow-bold text-black text-[30px]">
              PHILHEALTH
            </span>
          </div>
        </div>
        <div className="flex mt-5 items-start w-[30%]">
          <span className="inline-block w-[12rem] arial-narrow-bold text-black">
            DEDUCTION VALUE:
          </span>
          <input
            className="border-black border w-40 focus:outline-none"
            onChange={(e) => setPhilHealth(e.target.value)}
            type="number"
            value={philHealth}
          />
          %
        </div>
        <button
          onClick={submit_philhealth}
          className="absolute bottom-0 right-9 border-2 border-green-700 rounded-none w-25 arial-narrow-bold hover:(border-2 border-green-700 text-green-700)"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default HrPhilhealth;
