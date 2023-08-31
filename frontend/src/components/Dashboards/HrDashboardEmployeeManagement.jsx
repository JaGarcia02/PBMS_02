import React, { PureComponent } from "react";
import { AiOutlineFileText } from "react-icons/ai";
import { BiBriefcase } from "react-icons/bi";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
const HrDashboardEmployeeManagement = () => {
  const gender = [
    { name: "Group A", value: 700 },
    { name: "Group B", value: 300 },
  ];
  const pies = [
    { name: "aaaaa", value: 700 },
    { name: "aaaaaaaa", value: 300 },
  ];
  const data = [
    {
      name: "HR",
      // counts: dataRecruitment.filter((fil) => fil.applicant_status == 0).length,
      fill: "#BF3C68",
      counts: 10,
    },
    {
      name: "Sales",
      // counts: dataRecruitment.filter((fil) => fil.applicant_status == 1).length,
      fill: "#4C785B",
      counts: 9,
    },
    {
      name: "Finance",
      // counts: dataRecruitment.filter((fil) => fil.applicant_status == 2).length,
      fill: "#B6D6F2",
      counts: 6,
    },
    {
      name: "Accounting",
      // counts: dataRecruitment.filter((fil) => fil.applicant_status == 3).length,
      fill: "#B6D6F2",
      counts: 5,
    },
    {
      name: "Operations",
      // counts: dataRecruitment.filter((fil) => fil.applicant_status == 4).length,
      fill: "#24382A",
      counts: 4,
    },
    {
      name: "T.A",
      // counts: dataRecruitment.filter((fil) => fil.applicant_status == 5).length,
      fill: "#F24E29",
      counts: 3,
    },
    {
      name: "I.T",
      // counts: dataRecruitment.filter((fil) => fil.applicant_status == 5).length,
      fill: "#8C2703",
      counts: 1,
    },
    {
      name: "AMAD",
      // counts: dataRecruitment.filter((fil) => fil.applicant_status == 6).length,
      fill: "#4B2473",
      counts: 2,
    },
    {
      name: "CASD",
      // counts: dataRecruitment.filter((fil) => fil.applicant_status == 7).length,
      fill: "#BF1F2C",
      counts: 10,
    },
    {
      name: "Execom",
      // counts: dataRecruitment.filter((fil) => fil.applicant_status == 7).length,
      fill: "#000000",
      counts: 3,
    },
  ];
  const COLORS = ["#BF3C68", "#B6D6F2"];
  const COLORSE = ["#FC4445", "#2B3043"];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <div className="flex flex-col w-full ">
      <span className="arial-narrow-bold text-black text-3xl mb-3 ">
        Employee Management Dashboard
      </span>
      <div className="flex flex-row">
        <div className="bg-white h-80 rounded-md flex flex-col shadow-2xl border items-center justify-center shadow-gray-500  border-gray-600">
          <div className="w-full mt-5">
            <span className=" arial-narrow-bold text-[18px] ml-8 ">
              Total Employees
            </span>
            <div className="flex items-center justify-center">
              <hr className="h-2 w-5 bg-blue-300 mr-2 " />
              <span className="arial-narrow text-black text-12px mr-5">
                Male
              </span>
              <hr className="h-2 w-5 bg-red-500 mr-2 " />
              <span className="arial-narrow text-black text-12px">Female</span>
            </div>
          </div>
          <div className="flex w-full ">
            <PieChart width={360} height={200}>
              <Pie
                data={gender}
                cx={170}
                cy={100}
                innerRadius={50}
                outerRadius={90}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
              >
                {gender.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </div>
          <div className="flex items-center justify-center flex-col">
            <div className="items-center justify-center flex">
              <hr className="h-2 w-2 bg-blue-300 mr-2 " />
              <span className="arial-narrow text-black text-12px mr-5">
                Male
              </span>
            </div>
            <div className="items-center justify-center flex">
              <hr className="h-2 w-2 bg-red-500 mr-2 " />
              <span className="arial-narrow text-black text-12px">Female</span>
            </div>
          </div>
        </div>

        <div className="ml-2 bg-white rounded-md flex flex-col shadow-gray-500 border border-gray-600 shadow-2xl p-2 h-80">
          {" "}
          <span></span>
          <BarChart
            width={600}
            height={250}
            data={data}
            margin={{
              top: 5,
              right: 15,
              left: -30,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10 }}
              stroke="#4d4c4c"
              interval={0}
            />
            <YAxis />
            <Tooltip />

            <Bar dataKey="counts" barSize={40} />
          </BarChart>
        </div>
        <div className="ml-2 bg-white rounded-md flex flex-col shadow-gray-500 border border-gray-600 shadow-2xl p-2 h-80">
          <PieChart width={400} height={250}>
            <Pie
              data={pies}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pies.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORSE[index % COLORSE.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className=" w-[625px] mt-5 h-[250px] items-center justify-between rounded rounded-2xl shadow shadow-gray-600 shadow-2xl bg-white items-center flex">
          <div className="items-center justify-center flex flex-col">
            <div className="rounded-full h-40 w-40 border border-black shadow shadow-2xl "></div>
            <span>Total</span>
          </div>
          <div className="grid inline-grid gap-3 grid-cols-2 mt-5">
            <div className="h-20 w-50 rounded-md flex  border border-black bg-white p-3 relative">
              <div className="flex flex-col text-center ">
                <span className="arial-narrow-bold text-gray-500">Regular</span>
                <div
                  className="absolute h-20 w-2 !right-0 !top-0 rounded rounded-2xl"
                  style={{ background: "#4C785B" }}
                ></div>
              </div>
            </div>
            <div className="h-20 w-50 rounded-md flex border border-black bg-white p-3 items-center justify-between relative">
              <div className="flex flex-col text-center">
                <span className="arial-narrow-bold text-gray-500">
                  Probationary
                </span>
                <div
                  className="absolute h-20 w-2 !right-0 !top-0 rounded rounded-2xl"
                  style={{ background: "#24382A" }}
                ></div>
              </div>
            </div>
            <div className="h-20 w-50 rounded-md border-black border flex bg-white p-3 items-center justify-between relative">
              <div className="flex flex-col text-center">
                <span className="arial-narrow-bold text-gray-500">OJT</span>
                <div
                  className="absolute h-20 w-2 !right-0 !top-0 rounded rounded-2xl"
                  style={{ background: "#74B88B" }}
                ></div>
              </div>
            </div>
            <div className="h-20 w-50 border border-black rounded-md flex items-center justify-between  p-3 relative">
              <div className="flex flex-col text-center">
                <span className="arial-narrow-bold text-gray-500">
                  Reliever
                </span>
                <div
                  className="absolute h-20 w-2 !right-0 !top-0 rounded rounded-2xl"
                  style={{ background: "#7CC494" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-[780px] mt-5 h-[250px] flex-col  rounded rounded-2xl shadow shadow-gray-600 shadow-2xl bg-white  flex">
          <span className="w-full">List of Incomplete Requirements</span>
          <table className="w-full">
            <tr>
              <th>Employee Name</th>
              <th>Position Title</th>
              <th>Department</th>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HrDashboardEmployeeManagement;
