import React, { useEffect, useState } from "react";
import { AiFillCloseSquare, AiFillPlusSquare } from "react-icons/ai";
const HREdBackground = ({
  setToggleState,
  setEmployeeInfo,
  employeeInfo,
  profile,
  setProfile,
  click_save,
}) => {
  const edu = JSON.parse(employeeInfo.Employee_EducationBackground)
    ? JSON?.parse(employeeInfo.Employee_EducationBackground)
    : {
        postgrad: "",
        postgradStart: "",
        postgradEnd: "",
        postgradCourse: "",
        college: "",
        collegeStart: "",
        collegeEnd: "",
        collegeCourse: "",
        vocational: "",
        vocationalStart: "",
        vocationalEnd: "",
        vocationalCourse: "",
        senior: "",
        seniorStart: "",
        seniorEnd: "",
        seniorCourse: "",
        junior: "",
        juniorStart: "",
        juniorEnd: "",
        juniorCourse: "",
        elem: "",
        elemStart: "",
        elemEnd: "",
        elemCourse: "",
      };
  const [education, setEducation] = useState(edu);
  console.log(employeeInfo);
  useEffect(() => {
    setEmployeeInfo({
      ...employeeInfo,
      Employee_EducationBackground: JSON.stringify(education),
    });
  }, [education]);
  return (
    <div className="w-full p-3 items-center   backg-color-prdc h-full flex-col flex">
      <table className="h-full w-full items-center flex-col justify-start mt-3 flex ">
        <tr className="w-full justify-evenly items-center flex px-2">
          <th className="w-[70%] border-gray-400 border-2 bg-gray-300 emptext-color  ml-1 h-7 mt-3 items-center justify-center flex arial-narrow-bold text-[15px]  shadow-md shadow-gray-100 bg-gray-200">
            <span className="items-center justify-center flex w-full arial-narrow-bold text-[15px]"></span>
          </th>
          <th className="w-[100%] border-gray-400 border-2 bg-gray-300  emptext-color  ml-1 h-7 mt-3 items-center justify-center flex arial-narrow-bold text-[15px]  shadow-md shadow-gray-100 bg-gray-200">
            SCHOOL/UNIVERSITY
          </th>
          <th className="w-[55%] border-gray-400 border-2 bg-gray-300  emptext-color  ml-1 h-7 mt-3 items-center justify-center flex arial-narrow-bold text-[15px]  shadow-md shadow-gray-100 bg-gray-200">
            DATE STARTED
          </th>
          <th className="w-[55%] border-gray-400 border-2 bg-gray-300  emptext-color  ml-1 h-7 mt-3 items-center justify-center flex arial-narrow-bold text-[15px]  shadow-md shadow-gray-100 bg-gray-200">
            DATE ENDED
          </th>
          <th className="w-[100%] border-gray-400 border-2 bg-gray-300  emptext-color  ml-1 h-7 mt-3 items-center justify-center flex arial-narrow-bold text-[15px]  shadow-md shadow-gray-100 bg-gray-200">
            COURSE TAKEN
          </th>
        </tr>
        <tr className="w-full   arial-narrow flex px-2">
          <td className="w-[69.8%] border  border-gray-500 relative emptext-color  ml-1 h-7  items-center justify-center flex arial-narrow text-[15px]   shadow-gray-100">
            <span className="text-[15px] emptext-color items-center pl-3 arial-narrow flex w-full h-6">
              POST GRADUATION:
            </span>
            <hr className="h-[2px]  w-full borderFambackground absolute bottom-0" />
          </td>
          <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setEducation({
                  ...education,
                  postgrad: e.target.value,
                })
              }
              value={education.postgrad}
              className="w-[95%]  backg-color-prdc  text-center focus:outline-none  h-6 arial-narrow-bold text-[15px]"
            />
            <hr className="h-[2px] w-full borderFambackground absolute bottom-0" />
          </td>
          <td className="w-[55%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setEducation({
                  ...education,
                  postgradStart: e.target.value,
                })
              }
              value={education.postgradStart}
              type="date"
              className={`${
                education.postgradStart == ""
                  ? "text-gray-400 arial-narrow"
                  : "text-black arial-narrow-bold"
              } w-[95%] text-black text-center backg-color-prdc focus:outline-none  h-6  text-[15px]`}
            />
            <hr className="h-[2px] w-full borderFambackground absolute bottom-0" />
          </td>
          <td className="w-[55%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setEducation({
                  ...education,
                  postgradEnd: e.target.value,
                })
              }
              value={education.postgradEnd}
              type="date"
              className={`${
                education.postgradEnd == ""
                  ? "text-gray-400 arial-narrow"
                  : "text-black arial-narrow-bold"
              } w-[95%] text-black text-center backg-color-prdc focus:outline-none  h-6  text-[15px]`}
            />
            <hr className="h-[2px] w-full borderFambackground absolute bottom-0" />
          </td>

          <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setEducation({
                  ...education,
                  postgradCourse: e.target.value,
                })
              }
              value={education.postgradCourse}
              className="w-[95%] backg-color-prdc text-center focus:outline-none  h-6 arial-narrow-bold text-[15px]"
            />
            <hr className="h-[2px] w-full borderFambackground absolute bottom-0" />
          </td>
        </tr>
        <tr className="w-full   arial-narrow flex px-2">
          <td className="w-[69.8%] border  border-gray-500 relative emptext-color  ml-1 h-7  items-center justify-center flex arial-narrow text-[15px]   shadow-gray-100">
            <span className="text-[15px] emptext-color items-center pl-3 arial-narrow flex w-full h-6">
              COLLEGE:
            </span>
            <hr className="h-[2px]  w-full borderFambackground absolute bottom-0" />
          </td>
          <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setEducation({
                  ...education,
                  college: e.target.value,
                })
              }
              value={education.college}
              className="w-[95%]  backg-color-prdc  text-center focus:outline-none  h-6 arial-narrow-bold text-[15px]"
            />
            <hr className="h-[2px] w-full borderFambackground absolute bottom-0" />
          </td>
          <td className="w-[55%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setEducation({
                  ...education,
                  collegeStart: e.target.value,
                })
              }
              value={education.collegeStart}
              type="date"
              className={`${
                education.collegeStart == ""
                  ? "text-gray-400 arial-narrow"
                  : "text-black arial-narrow-bold"
              } w-[95%] text-black text-center backg-color-prdc focus:outline-none  h-6  text-[15px]`}
            />
            <hr className="h-[2px] w-full borderFambackground absolute bottom-0" />
          </td>
          <td className="w-[55%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setEducation({
                  ...education,
                  collegeEnd: e.target.value,
                })
              }
              value={education.collegeEnd}
              type="date"
              className={`${
                education.collegeEnd == ""
                  ? "text-gray-400 arial-narrow"
                  : "text-black arial-narrow-bold"
              } w-[95%] text-black text-center backg-color-prdc focus:outline-none  h-6  text-[15px]`}
            />
            <hr className="h-[2px] w-full borderFambackground absolute bottom-0" />
          </td>

          <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setEducation({
                  ...education,
                  collegeCourse: e.target.value,
                })
              }
              value={education.collegeCourse}
              className="w-[95%] backg-color-prdc text-center focus:outline-none  h-6 arial-narrow-bold text-[15px]"
            />
            <hr className="h-[2px] w-full borderFambackground absolute bottom-0" />
          </td>
        </tr>
        <tr className="w-full   arial-narrow flex px-2">
          <td className="w-[69.8%] border  border-gray-500 relative emptext-color  ml-1 h-7  items-center justify-center flex arial-narrow text-[15px]   shadow-gray-100">
            <span className="text-[15px] emptext-color items-center pl-3 arial-narrow flex w-full h-6">
              VOCATIONAL:
            </span>
            <hr className="h-[2px]  w-full borderFambackground absolute bottom-0" />
          </td>
          <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setEducation({
                  ...education,
                  vocational: e.target.value,
                })
              }
              value={education.vocational}
              className="w-[95%]  backg-color-prdc  text-center focus:outline-none  h-6 arial-narrow-bold text-[15px]"
            />
            <hr className="h-[2px] w-full borderFambackground absolute bottom-0" />
          </td>
          <td className="w-[55%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setEducation({
                  ...education,
                  vocationalStart: e.target.value,
                })
              }
              value={education.vocationalStart}
              type="date"
              className={`${
                education.vocationalStart == ""
                  ? "text-gray-400 arial-narrow"
                  : "text-black arial-narrow-bold"
              } w-[95%] text-black text-center backg-color-prdc focus:outline-none  h-6  text-[15px]`}
            />
            <hr className="h-[2px] w-full borderFambackground absolute bottom-0" />
          </td>
          <td className="w-[55%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setEducation({
                  ...education,
                  vocationalEnd: e.target.value,
                })
              }
              value={education.vocationalEnd}
              type="date"
              className={`${
                education.vocationalEnd == ""
                  ? "text-gray-400 arial-narrow"
                  : "text-black arial-narrow-bold"
              } w-[95%] text-black text-center backg-color-prdc focus:outline-none  h-6  text-[15px]`}
            />
            <hr className="h-[2px] w-full borderFambackground absolute bottom-0" />
          </td>

          <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setEducation({
                  ...education,
                  vocationalEnd: e.target.value,
                })
              }
              value={education.vocationalEnd}
              className="w-[95%] backg-color-prdc text-center focus:outline-none  h-6 arial-narrow-bold text-[15px]"
            />
            <hr className="h-[2px] w-full borderFambackground absolute bottom-0" />
          </td>
        </tr>
        <tr className="w-full   arial-narrow flex px-2">
          <td className="w-[69.8%] border  border-gray-500 relative emptext-color  ml-1 h-7  items-center justify-center flex arial-narrow text-[15px]   shadow-gray-100">
            <span className="text-[15px] emptext-color items-center pl-3 arial-narrow flex w-full h-6">
              SENIOR HIGHSCHOOL:
            </span>
            <hr className="h-[2px]  w-full borderFambackground absolute bottom-0" />
          </td>
          <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setEducation({
                  ...education,
                  senior: e.target.value,
                })
              }
              value={education.senior}
              className="w-[95%]  backg-color-prdc  text-center focus:outline-none  h-6 arial-narrow-bold text-[15px]"
            />
            <hr className="h-[2px] w-full borderFambackground absolute bottom-0" />
          </td>
          <td className="w-[55%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setEducation({
                  ...education,
                  seniorStart: e.target.value,
                })
              }
              value={education.seniorStart}
              type="date"
              className={`${
                education.seniorStart == ""
                  ? "text-gray-400 arial-narrow"
                  : "text-black arial-narrow-bold"
              } w-[95%] text-black text-center backg-color-prdc focus:outline-none  h-6  text-[15px]`}
            />
            <hr className="h-[2px] w-full borderFambackground absolute bottom-0" />
          </td>
          <td className="w-[55%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setEducation({
                  ...education,
                  vocationalStart: e.target.value,
                })
              }
              value={education.seniorEnd}
              type="date"
              className={`${
                education.seniorEnd == ""
                  ? "text-gray-400 arial-narrow"
                  : "text-black arial-narrow-bold"
              } w-[95%] text-black text-center backg-color-prdc focus:outline-none  h-6  text-[15px]`}
            />
            <hr className="h-[2px] w-full borderFambackground absolute bottom-0" />
          </td>

          <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setEducation({
                  ...education,
                  seniorCourse: e.target.value,
                })
              }
              value={education.seniorCourse}
              className="w-[95%] backg-color-prdc text-center focus:outline-none  h-6 arial-narrow-bold text-[15px]"
            />
            <hr className="w-[95%] backg-color-prdc text-center focus:outline-none  h-6 arial-narrow-bold text-[15px]" />
            <hr className="h-[2px] w-full borderFambackground absolute bottom-0" />
          </td>
        </tr>
        <tr className="w-full   arial-narrow flex px-2">
          <td className="w-[69.8%] border  border-gray-500 relative emptext-color  ml-1 h-7  items-center justify-center flex arial-narrow text-[15px]   shadow-gray-100">
            <span className="text-[15px] emptext-color items-center pl-3 arial-narrow flex w-full h-6">
              JUNIOR HIGHSCHOOL:
            </span>
            <hr className="h-[2px]  w-full borderFambackground absolute bottom-0" />
          </td>
          <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setEducation({
                  ...education,
                  junior: e.target.value,
                })
              }
              value={education.junior}
              className="w-[95%]  backg-color-prdc  text-center focus:outline-none  h-6 arial-narrow-bold text-[15px]"
            />
            <hr className="h-[2px] w-full borderFambackground absolute bottom-0" />
          </td>
          <td className="w-[55%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setEducation({
                  ...education,
                  juniorStart: e.target.value,
                })
              }
              value={education.juniorStart}
              type="date"
              className={`${
                education.juniorStart == ""
                  ? "text-gray-400 arial-narrow"
                  : "text-black arial-narrow-bold"
              } w-[95%] text-black text-center backg-color-prdc focus:outline-none  h-6  text-[15px]`}
            />
            <hr className="h-[2px] w-full borderFambackground absolute bottom-0" />
          </td>
          <td className="w-[55%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setEducation({
                  ...education,
                  juniorEnd: e.target.value,
                })
              }
              value={education.juniorEnd}
              type="date"
              className={`${
                education.juniorEnd == ""
                  ? "text-gray-400 arial-narrow"
                  : "text-black arial-narrow-bold"
              } w-[95%] text-black text-center backg-color-prdc focus:outline-none  h-6  text-[15px]`}
            />
            <hr className="h-[2px] w-full borderFambackground absolute bottom-0" />
          </td>

          <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setEducation({
                  ...education,
                  juniorCourse: e.target.value,
                })
              }
              value={education.juniorCourse}
              className="w-[95%] backg-color-prdc text-center focus:outline-none  h-6 arial-narrow-bold text-[15px]"
            />
            <hr className="h-[2px] w-full borderFambackground absolute bottom-0" />
          </td>
        </tr>
        <tr className="w-full   arial-narrow flex px-2">
          <td className="w-[69.8%] border  border-gray-500 relative emptext-color  ml-1 h-7  items-center justify-center flex arial-narrow text-[15px]   shadow-gray-100">
            <span className="text-[15px] emptext-color items-center pl-3 arial-narrow flex w-full h-6">
              ELEMENTARY:
            </span>
            <hr className="h-[2px]  w-full borderFambackground absolute bottom-0" />
          </td>
          <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setEducation({
                  ...education,
                  elem: e.target.value,
                })
              }
              value={education.elem}
              className="w-[95%]  backg-color-prdc  text-center focus:outline-none  h-6 arial-narrow-bold text-[15px]"
            />
            <hr className="h-[2px] w-full borderFambackground absolute bottom-0" />
          </td>
          <td className="w-[55%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setEducation({
                  ...education,
                  elemStart: e.target.value,
                })
              }
              value={education.elemStart}
              type="date"
              className={`${
                education.elemStart == ""
                  ? "text-gray-400 arial-narrow"
                  : "text-black arial-narrow-bold"
              } w-[95%] text-black text-center backg-color-prdc focus:outline-none  h-6  text-[15px]`}
            />
            <hr className="h-[2px] w-full borderFambackground absolute bottom-0" />
          </td>
          <td className="w-[55%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setEducation({
                  ...education,
                  elemEnd: e.target.value,
                })
              }
              value={education.elemEnd}
              type="date"
              className={`${
                education.elemEnd == ""
                  ? "text-gray-400 arial-narrow"
                  : "text-black arial-narrow-bold"
              } w-[95%] text-black text-center backg-color-prdc focus:outline-none  h-6  text-[15px]`}
            />
            <hr className="h-[2px] w-full borderFambackground absolute bottom-0" />
          </td>
          <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setEducation({
                  ...education,
                  elemCourse: e.target.value,
                })
              }
              value={education.elemCourse}
              className="w-[95%] backg-color-prdc text-center focus:outline-none  h-6 arial-narrow-bold text-[15px]"
            />
            <hr className="h-[2px] w-full borderFambackground absolute bottom-0" />
          </td>
        </tr>
        <button
          onClick={click_save}
          className="prdc-border text-white initial-pag-border arial-narrow-bold absolute bottom-0 right-6 active:scale-1  rounded-sm text-[14px] h-7 w-20  hover:(border-black rounded-sm) active:duration-75 transition-all hover:(scale-108 ease-in-out  transform py-1 rounded-sm) group  mb-5 flex items-center justify-center     disabled:(bg-gray-500 border-gray-500 cursor-not-allowed)  focus:(outline-none) dark:(bg-transparent border-black border-[0.5px] hover:(arial-narrow-bold)"
        >
          SAVE
          {/* <AiOutlineArrowRight className="ml-2 text-initial group-hover:(text-[17px])" /> */}
        </button>
      </table>
    </div>
  );
};

export default HREdBackground;
