import React, { useEffect, useState } from "react";
import uniqid from "uniqid";
import { AiFillCloseSquare, AiFillPlusSquare } from "react-icons/ai";
const HRWorkExp = ({
  setToggleState,
  setEmployeeInfo,
  employeeInfo,
  profile,
  setProfile,
  click_save,
}) => {
  const work = JSON.parse(employeeInfo.Employee_WorkExperience)
    ? JSON?.parse(employeeInfo.Employee_WorkExperience)
    : {
        charrefs: [],
        works: [],
      };
  const [addWork, setAddNewWork] = useState(false);
  const [addNewCharRef, setAddNewCharRef] = useState(false);
  const [workarray, setWorkArray] = useState({
    ID: uniqid(),
    company: "",
    position: "",
    workdatestart: "",
    workdateend: "",
    salary: "",
  });
  const [workexp, setWorkexp] = useState(work);
  console.log(employeeInfo);
  const [charRef, setCharRef] = useState({
    ID: uniqid(),
    fullname: "",
    company: "",
    position: "",
    contactnumber: "",
  });
  const remove_arraywork = (index) => {
    const newItems = workexp.works.filter((value) => value.ID !== index);
    setWorkexp({ ...workexp, works: newItems });
  };
  const remove_arraycharRef = (index) => {
    const newItems = workexp.charrefs.filter((value) => value.ID !== index);
    setWorkexp({ ...workexp, charrefs: newItems });
  };
  const add_work = () => {
    setAddNewWork(!addWork);
    setWorkexp({ ...workexp, works: [...workexp.works, workarray] });
    setWorkArray({
      ID: uniqid(),
      company: "",
      position: "",
      workdatestart: "",
      workdateend: "",
      salary: "",
    });
  };
  const add_charRef = () => {
    setAddNewCharRef(!addNewCharRef);
    setWorkexp({ ...workexp, charrefs: [...workexp.charrefs, charRef] });
    setCharRef({
      ID: uniqid(),
      fullname: "",
      company: "",
      position: "",
      contactnumber: "",
    });
  };
  useEffect(() => {
    setEmployeeInfo({
      ...employeeInfo,
      Employee_WorkExperience: JSON.stringify(workexp),
    });
  }, [workexp]);

  return (
    <div className="w-full p-3 items-center  overflow-y-auto  backg-color-prdc max-h-[1000px] h-[74vh] flex-col flex">
      <div className="flex-1 w-full ">
        <span className="emptext-color arial-narrow-bold w-full self-start ml-3">
          WORK EXPERIENCE
        </span>
        <table className="h-full w-full items-center flex-col justify-start mt-3 flex ">
          <tr className="w-full justify-evenly items-center flex px-2">
            <th className="w-[70%] border-gray-400 border-2 bg-gray-300 emptext-color  ml-1 h-7 mt-3 items-center justify-center flex arial-narrow-bold text-[15px]  shadow-md shadow-gray-100 bg-gray-200">
              <span className="items-center justify-center flex w-full arial-narrow-bold text-[15px]">
                Company
              </span>
            </th>
            <th className="w-[100%] border-gray-400 border-2 bg-gray-300  emptext-color  ml-1 h-7 mt-3 items-center justify-center flex arial-narrow-bold text-[15px]  shadow-md shadow-gray-100 bg-gray-200">
              POSITION
            </th>
            <th className="w-[55%] border-gray-400 border-2 bg-gray-300  emptext-color  ml-1 h-7 mt-3 items-center justify-center flex arial-narrow-bold text-[15px]  shadow-md shadow-gray-100 bg-gray-200">
              DATE STARTED
            </th>
            <th className="w-[55%] border-gray-400 border-2 bg-gray-300  emptext-color  ml-1 h-7 mt-3 items-center justify-center flex arial-narrow-bold text-[15px]  shadow-md shadow-gray-100 bg-gray-200">
              DATE ENDED
            </th>
            <th className="w-[100%] border-gray-400 border-2 bg-gray-300  emptext-color  ml-1 h-7 mt-3 items-center justify-center flex arial-narrow-bold text-[15px]  shadow-md shadow-gray-100 bg-gray-200">
              SALARY
            </th>
          </tr>
          <tr className="w-full    arial-narrow flex px-2">
            <td className="w-[70%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
              <input
                onChange={(e) =>
                  setWorkArray({
                    ...workarray,
                    company: e.target.value,
                  })
                }
                placeholder="Add Company"
                value={workarray.company}
                className={`${
                  workarray.company == "" ? "arial-narrow" : "arial-narrow-bold"
                } w-[95%] backg-color-prdc text-center focus:outline-none  h-6 text-[15px]`}
              />
              <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
            </td>
            <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
              <input
                onChange={(e) =>
                  setWorkArray({
                    ...workarray,
                    position: e.target.value,
                  })
                }
                placeholder="Add Position"
                value={workarray.position}
                className={`${
                  workarray.position == ""
                    ? "text-gray-400 arial-narrow"
                    : "text-black arial-narrow-bold"
                } w-[95%] text-black text-center backg-color-prdc focus:outline-none  h-6  text-[15px]`}
              />
              <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
            </td>

            <td className="w-[55%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
              <input
                onChange={(e) =>
                  setWorkArray({
                    ...workarray,
                    workdatestart: e.target.value,
                  })
                }
                value={workarray.workdatestart}
                type="date"
                className={`${
                  workarray.workdatestart == ""
                    ? "text-gray-400 arial-narrow"
                    : "text-black arial-narrow-bold"
                } w-[95%] text-black text-center backg-color-prdc focus:outline-none  h-6  text-[15px]`}
              />
              <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
            </td>

            <td className="w-[55%] border border-gray-500    relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
              <input
                onChange={(e) =>
                  setWorkArray({
                    ...workarray,
                    workdateend: e.target.value,
                  })
                }
                value={workarray.workdateend}
                type="date"
                className={`${
                  workarray.workdateend == ""
                    ? "text-gray-400 arial-narrow"
                    : "text-black arial-narrow-bold"
                } w-[95%] text-black text-center backg-color-prdc focus:outline-none  h-6  text-[15px]`}
              />
              <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
            </td>

            <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
              <input
                onChange={(e) =>
                  setWorkArray({
                    ...workarray,
                    salary: e.target.value,
                  })
                }
                placeholder="Add Salary"
                value={workarray.salary}
                className={`${
                  workarray.salary == ""
                    ? "text-gray-400 arial-narrow"
                    : "arial-narrow-bold text-black"
                } w-[95%] backg-color-prdc text-center focus:outline-none  arial-narrow text-[15px]`}
              />
              <AiFillPlusSquare
                className="text-center w-5 button-plus-fambg  text-[15px] hover:text-[20px]"
                onClick={add_work}
              />
              <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
            </td>
          </tr>
          {workexp?.works.map((data) => (
            <tr className="w-full   arial-narrow flex px-2">
              <td className="w-[70%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow-bold text-[11px]  shadow-md shadow-gray-100 ">
                <input
                  value={data.company}
                  className="w-full text-black backg-color-prdc text-center focus:outline-none  h-6 arial-narrow-bold text-[15px]"
                />
                <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
              </td>
              <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
                <input
                  value={data.position}
                  className={`${
                    data.position == ""
                      ? "text-gray-400 arial-narrow"
                      : "text-black arial-narrow-bold"
                  } w-full text-black text-center backg-color-prdc focus:outline-none  h-6  text-[15px]`}
                />
                <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
              </td>
              <td className="w-[55%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow-bold text-[11px]  shadow-md shadow-gray-100 ">
                <input
                  value={data.workdatestart}
                  type="date"
                  className={`${
                    data.workdatestart == ""
                      ? "text-gray-400 arial-narrow"
                      : "text-black arial-narrow-bold"
                  } w-full text-black text-center backg-color-prdc focus:outline-none  h-6  text-[15px]`}
                />
                <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
              </td>
              <td className="w-[55%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow-bold text-[11px]  shadow-md shadow-gray-100 ">
                <input
                  value={data.workdateend}
                  type="date"
                  className={`${
                    data.workdateend == ""
                      ? "text-gray-400 arial-narrow"
                      : "text-black arial-narrow-bold"
                  } w-full text-black text-center backg-color-prdc focus:outline-none  h-6  text-[15px]`}
                />
                <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
              </td>

              <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow-bold text-[11px]  shadow-md shadow-gray-100 ">
                <input
                  value={data.salary}
                  className="w-full text-black backg-color-prdc text-center focus:outline-none  arial-narrow-bold text-[15px]"
                />
                <AiFillCloseSquare
                  className="text-center w-5 text-[15px] hover:text-[20px] text-red-900"
                  onClick={() => remove_arraywork(data.ID)}
                />
                <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
              </td>
            </tr>
          ))}
        </table>
      </div>
      <div className="flex-1 w-full my-5 ">
        <span className="emptext-color arial-narrow-bold w-full self-start ml-3">
          CHARACTER REFERENCE/S
        </span>
        <table className="h-full w-full items-center flex-col justify-start mt-3 flex ">
          <tr className="w-full justify-evenly items-center flex px-2">
            <th className="w-[100%] border-gray-400 border-2 bg-gray-300 emptext-color  ml-1 h-7 mt-3 items-center justify-center flex arial-narrow-bold text-[15px]  shadow-md shadow-gray-100 bg-gray-200">
              <span className="items-center justify-center flex w-full arial-narrow-bold text-[15px]">
                FULL NAME
              </span>
            </th>
            <th className="w-[100%] border-gray-400 border-2 bg-gray-300  emptext-color  ml-1 h-7 mt-3 items-center justify-center flex arial-narrow-bold text-[15px]  shadow-md shadow-gray-100 bg-gray-200">
              COMPANY
            </th>

            <th className="w-[100%] border-gray-400 border-2 bg-gray-300  emptext-color  ml-1 h-7 mt-3 items-center justify-center flex arial-narrow-bold text-[15px]  shadow-md shadow-gray-100 bg-gray-200">
              POSITION
            </th>
            <th className="w-[100%] border-gray-400 border-2 bg-gray-300  emptext-color  ml-1 h-7 mt-3 items-center justify-center flex arial-narrow-bold text-[15px]  shadow-md shadow-gray-100 bg-gray-200">
              CONTACT NUMBER
            </th>
          </tr>
          <tr className="w-full   arial-narrow flex px-2">
            <td className="w-[100%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
              <input
                onChange={(e) =>
                  setCharRef({
                    ...charRef,
                    fullname: e.target.value,
                  })
                }
                placeholder="Add Fullname"
                value={charRef.fullname}
                className={`${
                  charRef.fullname == "" ? "arial-narrow" : "arial-narrow-bold"
                } w-[95%] backg-color-prdc text-center focus:outline-none  h-6 text-[15px]`}
              />
              <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
            </td>
            <td className="w-[100%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
              <input
                onChange={(e) =>
                  setCharRef({
                    ...charRef,
                    company: e.target.value,
                  })
                }
                placeholder="Add Position"
                value={charRef.company}
                className={`${
                  charRef.company == ""
                    ? "text-gray-400 arial-narrow"
                    : "text-black arial-narrow-bold"
                } w-[95%] text-black text-center backg-color-prdc focus:outline-none  h-6  text-[15px]`}
              />
              <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
            </td>

            <td className="w-[100%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
              <input
                onChange={(e) =>
                  setCharRef({
                    ...charRef,
                    position: e.target.value,
                  })
                }
                placeholder="Add Position"
                value={charRef.position}
                className={`${
                  charRef.position == ""
                    ? "text-gray-400 arial-narrow"
                    : "text-black arial-narrow-bold"
                } w-[95%] text-black text-center backg-color-prdc focus:outline-none  h-6  text-[15px]`}
              />
              <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
            </td>

            <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
              <input
                onChange={(e) =>
                  setCharRef({
                    ...charRef,
                    contactnumber: e.target.value,
                  })
                }
                placeholder="Add Contact Number"
                value={workarray.contactnumber}
                className={`${
                  charRef.contactnumber == ""
                    ? "text-gray-400 arial-narrow"
                    : "arial-narrow-bold text-black"
                } w-[95%] backg-color-prdc text-center focus:outline-none  arial-narrow text-[15px]`}
              />
              <AiFillPlusSquare
                className="text-center w-5 button-plus-fambg  text-[15px] hover:text-[20px]"
                onClick={add_charRef}
              />
              <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
            </td>
          </tr>
          {workexp?.charrefs.map((data) => (
            <tr className="w-full    arial-narrow flex px-2">
              <td className="w-[100%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow-bold text-[11px]  shadow-md shadow-gray-100 ">
                <input
                  value={data.fullname}
                  className="w-full text-black backg-color-prdc text-center focus:outline-none  h-6 arial-narrow-bold text-[15px]"
                />
                <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
              </td>
              <td className="w-[100%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
                <input
                  value={data.company}
                  className={`${
                    data.position == ""
                      ? "text-gray-400 arial-narrow"
                      : "text-black arial-narrow-bold"
                  } w-full text-black text-center backg-color-prdc focus:outline-none  h-6  text-[15px]`}
                />
                <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
              </td>
              <td className="w-[100%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow-bold text-[11px]  shadow-md shadow-gray-100 ">
                <input
                  value={data.position}
                  className={`${
                    data.workdatestart == ""
                      ? "text-gray-400 arial-narrow"
                      : "text-black arial-narrow-bold"
                  } w-full text-black text-center backg-color-prdc focus:outline-none  h-6  text-[15px]`}
                />
                <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
              </td>

              <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow-bold text-[11px]  shadow-md shadow-gray-100 ">
                <input
                  value={data.contactnumber}
                  className="w-full text-black backg-color-prdc text-center focus:outline-none  arial-narrow-bold text-[15px]"
                />
                <AiFillCloseSquare
                  className="text-center w-5 text-[15px] hover:text-[20px] text-red-900"
                  onClick={() => remove_arraycharRef(data.ID)}
                />
                <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
              </td>
            </tr>
          ))}
        </table>
      </div>
      <button
        onClick={click_save}
        className="empmanage-border text-white initial-pag-border arial-narrow-bold absolute bottom-0 right-6 active:scale-1  rounded-sm text-[14px] h-7 w-20  hover:(border-black rounded-sm) active:duration-75 transition-all hover:(scale-108 ease-in-out  transform py-1 rounded-sm) group  mb-5 flex items-center justify-center     disabled:(bg-gray-500 border-gray-500 cursor-not-allowed)  focus:(outline-none) dark:(bg-transparent border-black border-[0.5px] hover:(arial-narrow-bold)"
      >
        SAVE
        {/* <AiOutlineArrowRight className="ml-2 text-initial group-hover:(text-[17px])" /> */}
      </button>
    </div>
  );
};

export default HRWorkExp;
