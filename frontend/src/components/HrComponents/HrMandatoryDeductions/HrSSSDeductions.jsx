import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { OutTable, ExcelRenderer } from "react-excel-renderer";
import { API_URL_HR } from "../../../utils/Url";

const HrSSSDeductions = () => {
  const [header, setHeader] = useState([]);
  const [cols, setCols] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL_HR + "get-sss")
      .then((res) => setCols(res.data))
      .catch((err) => console.log(err));
  }, []);

  const submit_newSSS = () => {
    axios
      .post(API_URL_HR + "upload-sss", { SSS_data: cols })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    ExcelRenderer(file, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        let newRows = [];
        res.rows.slice(1).map((row, index) => {
          if (row && row !== "undefined!") {
            newRows.push({
              Range1: row[0],
              Range2: row[1],
              Provident_fund: row[2],
              Monthly_salary: row[3],
              ER: row[4],
              EE: row[5],
              Total: row[6],
              Final_EC: row[7],
              Provident_ER: row[8],
              Provident_EE: row[9],
              Final_ER: row[10],
              Final_EE: row[11],
              Final_Total: row[12],
            });
          }
        });

        setCols(newRows);
      }
    });
  };
  return (
    <div className="overflow-auto">
      <div className="flex items-center justify-start mt-2">
        <div>
          <img
            className="h-10 w-10 mr-1"
            src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Social_Security_System_%28SSS%29.svg"
            alt=""
          />
        </div>
        <div>
          <span className="arial-narrow-bold text-black text-[30px] ">
            SOCIAL SECURITY SYSTEM
          </span>
          <input type="file" onChange={handleFile} className="ml-5 absolute" />
        </div>
      </div>

      <br />
      <table className="w-[100%] h-[10%] border-gray-100 overflow-hidden  justify-evenly border-separate border-spacing-4">
        <thead>
          <tr className="shadow-sm shadow-gray-800 prdc-color h-10 text-center">
            <th className="text-white arial-narrow-bold w-5 w-[6%]">Range 1</th>
            <th className="text-white arial-narrow-bold w-5 w-[5%]">Range 2</th>
            <th className="text-white arial-narrow-bold w-5 w-[10%]">
              Provident Fund
            </th>
            <th className="text-white arial-narrow-bold w-5 w-[9%]">
              Monthly Salary
            </th>
            <th className="text-white arial-narrow-bold w-5 w-[5%]">ER</th>
            <th className="text-white arial-narrow-bold w-5 w-[5%]">EE</th>
            <th className="text-white arial-narrow-bold w-5 w-[5%]">Total</th>
            <th className="text-white arial-narrow-bold w-5 w-[8%]">
              Final EC
            </th>
            <th className="text-white arial-narrow-bold w-5 w-[8%]">
              Provident ER
            </th>
            <th className="text-white arial-narrow-bold w-5 w-[8%]">
              Provident EE
            </th>
            <th className="text-white arial-narrow-bold w-5 w-[8%]">
              Final ER
            </th>
            <th className="text-white arial-narrow-bold w-5 w-[8%]">
              Final EE
            </th>
            <th className="text-white arial-narrow-bold w-5 w-[8%]">
              Final Total
            </th>
          </tr>
        </thead>
        <tbody>
          {cols.map((data) => {
            return (
              <tr className="border border-black arial-narrow">
                <td className="text-[16px] text-center border-b border-l border-t border-b-black border-t-black border-l-black text-left arial-narrow text-black ">
                  {data.Range1}
                </td>
                <td className="text-[16px] h-10 text-center border-b border-t border-b-black border-t-black text-black ">
                  {data.Range2}
                </td>
                <td className="text-[16px] h-10 text-center border-b border-t border-b-black border-t-black text-black ">
                  {data.Provident_fund}
                </td>
                <td className="text-[16px] h-10 text-center border-b border-t border-b-black border-t-black text-black ">
                  {data.Monthly_salary}
                </td>
                <td className="text-[16px] h-10 text-center border-b border-t border-b-black border-t-black text-black ">
                  {data.ER}
                </td>
                <td className="text-[16px] h-10 text-center border-b border-t border-b-black border-t-black text-black ">
                  {data.EE}
                </td>
                <td className="text-[16px] h-10 text-center border-b border-t border-b-black border-t-black text-black ">
                  {data.Total}
                </td>
                <td className="text-[16px] h-10 text-center border-b border-t border-b-black border-t-black text-black ">
                  {data.Final_EC}
                </td>
                <td className="text-[16px] h-10 text-center border-b border-t border-b-black border-t-black text-black ">
                  {data.Provident_ER}
                </td>
                <td className="text-[16px] h-10 text-center border-b border-t border-b-black border-t-black text-black ">
                  {data.Provident_EE}
                </td>
                <td className="text-[16px] h-10 text-center border-b border-t border-b-black border-t-black text-black ">
                  {data.Final_ER}
                </td>
                <td className="text-[16px] h-10 text-center border-b border-t border-b-black border-t-black text-black ">
                  {data.Final_EE}
                </td>
                <td className="text-[16px] h-10 text-center border-b border-t border-b-black border-t-black border-r border-black ">
                  {data.Final_Total}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-end items-center">
        <button
          onClick={() => submit_newSSS()}
          className="w-30 h-8 bg-gray-600 text-white arial-narrow-bold text-[16px] rounded-sm mr-0.8"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default HrSSSDeductions;
