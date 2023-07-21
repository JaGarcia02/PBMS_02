import React, { useEffect, useState } from "react";
import { CgAddR } from "react-icons/cg";
import uniqid from "uniqid";
import { AiFillCloseSquare, AiFillPlusSquare } from "react-icons/ai";
const HRFamBackground = ({
  setToggleState,
  setEmployeeInfo,
  employeeInfo,
  profile,
  setProfile,
  click_save,
}) => {
  const fam = JSON.parse(employeeInfo.Employee_FamilyBackground)
    ? JSON?.parse(employeeInfo.Employee_FamilyBackground)
    : {
        father: "",
        fatherbday: "",
        fatherwork: "",
        fathercompany: "",
        mother: "",
        motherbday: "",
        motherwork: "",
        mothercompany: "",
        spouse: "",
        spousebday: "",
        spousework: "",
        spousecompany: "",
        childrens: [],
        siblings: [],
      };

  const [addSiblings, setAddNewSiblings] = useState(false);
  const [addNewChildren, setAddNewChildren] = useState(false);
  const [siblingarray, setSiblingArray] = useState({
    ID: uniqid(),
    sibling: "",
    siblingbday: "",
    siblingwork: "",
    siblingcompany: "",
  });

  const [childrenarray, setChildrenArray] = useState({
    ID: uniqid(),
    children: "",
    childrenbday: "",
    childrenwork: "",
    childrencompany: "",
  });
  const [family, setFamily] = useState(fam);

  const remove_arraysibling = (index) => {
    const newItems = family.siblings.filter((value) => value.ID !== index);
    setFamily({ ...family, siblings: newItems });
  };
  const remove_arraychildren = (index) => {
    const newItems = family.childrens.filter((value) => value.ID !== index);
    setFamily({ ...family, childrens: newItems });
  };
  const add_sibling = () => {
    setAddNewSiblings(!addSiblings);
    setFamily({ ...family, siblings: [...family.siblings, siblingarray] });
    setSiblingArray({
      ID: uniqid(),
      sibling: "",
      siblingbday: "",
      siblingwork: "",
      siblingcompany: "",
    });
  };
  const add_children = () => {
    setAddNewChildren(!addNewChildren);
    setFamily({ ...family, childrens: [...family.childrens, childrenarray] });
    setChildrenArray({
      ID: uniqid(),
      children: "",
      childrenbday: "",
      childrenwork: "",
      childrencompany: "",
    });
  };

  useEffect(() => {
    setEmployeeInfo({
      ...employeeInfo,
      Employee_FamilyBackground: JSON.stringify(family),
    });
  }, [family]);

  return (
    <div className="w-full p-3 items-center backg-color-prdc max-h-[1000px] h-[74vh] overflow-y-auto flex-col flex">
      <table className=" w-full items-center flex-col justify-start mt-3 flex ">
        <tr className="w-full justify-evenly items-center flex px-2">
          <th className="w-[55%] border-gray-400 border-2 bg-gray-300 emptext-color  ml-1 h-7 mt-3 items-center justify-center flex arial-narrow-bold text-[15px]  shadow-md shadow-gray-100 bg-gray-200">
            <span className="items-center justify-center flex w-full arial-narrow-bold text-[15px]"></span>
          </th>
          <th className="w-[100%] border-gray-400 border-2 bg-gray-300  emptext-color  ml-1 h-7 mt-3 items-center justify-center flex arial-narrow-bold text-[15px]  shadow-md shadow-gray-100 bg-gray-200">
            FULL NAME
          </th>
          <th className="w-[55%] border-gray-400 border-2 bg-gray-300  emptext-color  ml-1 h-7 mt-3 items-center justify-center flex arial-narrow-bold text-[15px]  shadow-md shadow-gray-100 bg-gray-200">
            BIRTHDATE
          </th>
          <th className="w-[100%] border-gray-400 border-2 bg-gray-300  emptext-color  ml-1 h-7 mt-3 items-center justify-center flex arial-narrow-bold text-[15px]  shadow-md shadow-gray-100 bg-gray-200">
            OCCUPATION
          </th>
          <th className="w-[100%] border-gray-400 border-2 bg-gray-300  emptext-color  ml-1 h-7 mt-3 items-center justify-center flex arial-narrow-bold text-[15px]  shadow-md shadow-gray-100 bg-gray-200">
            COMPANY
          </th>
        </tr>
        <tr className="w-full   arial-narrow flex px-2">
          <td className="w-[55%] border  border-gray-500 relative emptext-color  ml-1 h-7  items-center justify-center flex arial-narrow text-[15px]   shadow-gray-100">
            <span className="text-[15px] emptext-color items-center pl-3 arial-narrow flex w-full h-6">
              FATHER:
            </span>
            <hr className="h-[2px]  w-full borderFambackground absolute bottom-0" />
          </td>
          <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setFamily({
                  ...family,
                  father: e.target.value,
                })
              }
              value={family.father}
              className="w-[95%]  backg-color-prdc  text-center focus:outline-none  h-6 arial-narrow-bold text-[15px]"
            />
            <hr className="h-[2px] w-full borderFambackground absolute bottom-0" />
          </td>
          <td className="w-[55%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setFamily({
                  ...family,
                  fatherbday: e.target.value,
                })
              }
              value={family.fatherbday}
              type="date"
              className={`${
                family.fatherbday == ""
                  ? "text-gray-400 arial-narrow"
                  : "text-black arial-narrow-bold"
              } w-[95%] text-black text-center backg-color-prdc focus:outline-none  h-6  text-[15px]`}
            />
            <hr className="h-[2px] w-full borderFambackground absolute bottom-0" />
          </td>
          <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setFamily({
                  ...family,
                  fatherwork: e.target.value,
                })
              }
              value={family.fatherwork}
              className="w-[95%] backg-color-prdc text-center focus:outline-none  h-6 arial-narrow-bold text-[15px]"
            />
            <hr className="h-[2px] w-full borderFambackground absolute bottom-0" />
          </td>
          <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setFamily({
                  ...family,
                  fathercompany: e.target.value,
                })
              }
              value={family.fathercompany}
              className="w-[95%] backg-color-prdc text-center focus:outline-none  h-6 arial-narrow-bold text-[15px]"
            />
            <hr className="h-[2px] w-full borderFambackground absolute bottom-0" />
          </td>
        </tr>
        <tr className="w-full  arial-narrow flex px-2">
          <td className="w-[55%] border  border-gray-500 relative emptext-color  ml-1 h-7  items-center justify-center flex arial-narrow text-[15px]   shadow-gray-100">
            <span className="text-[15px] emptext-color items-center pl-3 arial-narrow flex w-full h-6">
              MOTHER:
            </span>
            <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
          </td>
          <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setFamily({
                  ...family,
                  mother: e.target.value,
                })
              }
              value={family.mother}
              className="w-[95%] backg-color-prdc text-black text-center focus:outline-none  h-6 arial-narrow-bold text-[15px]"
            />
            <hr className="h-[2px] w-full borderFambackground absolute bottom-0" />
          </td>
          <td className="w-[55%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setFamily({
                  ...family,
                  motherbday: e.target.value,
                })
              }
              value={family.motherbday}
              type="date"
              className={`${
                family.motherbday == ""
                  ? "text-gray-400 arial-narrow"
                  : "text-black arial-narrow-bold"
              } w-[95%] text-black text-center backg-color-prdc focus:outline-none  h-6  text-[15px]`}
            />
            <hr className="h-[2px] w-full borderFambackground absolute bottom-0" />
          </td>
          <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setFamily({
                  ...family,
                  motherwork: e.target.value,
                })
              }
              value={family.motherwork}
              className="w-[95%] backg-color-prdc text-black text-center focus:outline-none  h-6 arial-narrow-bold text-[15px]"
            />
            <hr className="h-[2px] w-full borderFambackground absolute bottom-0" />
          </td>
          <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setFamily({
                  ...family,
                  mothercompany: e.target.value,
                })
              }
              value={family.mothercompany}
              className="w-[95%] backg-color-prdc text-black text-center focus:outline-none  h-6 arial-narrow-bold text-[15px]"
            />
            <hr className="h-[2px] w-full borderFambackground absolute bottom-0" />
          </td>
        </tr>
        <tr className="w-full   arial-narrow flex px-2">
          <td className="w-[55%] border  border-gray-500 relative emptext-color  ml-1 h-7  items-center justify-center flex arial-narrow text-[15px]   shadow-gray-100">
            <span className="text-[15px] emptext-color items-center pl-3 arial-narrow flex w-full h-6">
              SIBLINGS:
            </span>
            <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
          </td>

          <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setSiblingArray({
                  ...siblingarray,
                  sibling: e.target.value,
                })
              }
              placeholder="Add Sibling"
              value={siblingarray.sibling}
              className={`${
                siblingarray.sibling == ""
                  ? "arial-narrow"
                  : "arial-narrow-bold"
              } w-[95%] backg-color-prdc text-center focus:outline-none  h-6 text-[15px]`}
            />
            <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
          </td>
          <td className="w-[55%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setSiblingArray({
                  ...siblingarray,
                  siblingbday: e.target.value,
                })
              }
              value={siblingarray.siblingbday}
              type="date"
              className={`${
                siblingarray.siblingbday == ""
                  ? "text-gray-400 arial-narrow"
                  : "text-black arial-narrow-bold"
              } w-[95%] text-black text-center backg-color-prdc focus:outline-none  h-6  text-[15px]`}
            />
            <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
          </td>
          <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setSiblingArray({
                  ...siblingarray,
                  siblingwork: e.target.value,
                })
              }
              placeholder="Add Work"
              value={siblingarray.siblingwork}
              className={`${
                siblingarray.siblingwork == ""
                  ? "text-gray-400 arial-narrow"
                  : "arial-narrow-bold text-black"
              } w-[95%] backg-color-prdc text-center focus:outline-none  arial-narrow text-[15px]`}
            />
            <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
          </td>
          <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setSiblingArray({
                  ...siblingarray,
                  siblingcompany: e.target.value,
                })
              }
              placeholder="Add Company"
              value={siblingarray.siblingcompany}
              className={`${
                siblingarray.siblingcompany == ""
                  ? "text-gray-400 arial-narrow"
                  : "arial-narrow-bold text-black"
              } w-[95%] backg-color-prdc text-center focus:outline-none  arial-narrow text-[15px]`}
            />
            <AiFillPlusSquare
              className="text-center w-5 button-plus-fambg  text-[15px] hover:text-[20px]"
              onClick={add_sibling}
            />
            <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
          </td>
        </tr>
        {family?.siblings.map((data) => (
          <tr className="w-full   arial-narrow flex px-2">
            <td className="w-[55%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
              <span className="text-[15px] emptext-color items-center pl-3 arial-narrow flex w-full h-6">
                SIBLINGS:
              </span>
              <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
            </td>
            <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow-bold text-[11px]  shadow-md shadow-gray-100 ">
              <input
                value={data.sibling}
                className="w-[95%] text-black backg-color-prdc text-center focus:outline-none  h-6 arial-narrow-bold text-[15px]"
              />
              <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
            </td>
            <td className="w-[55%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow-bold text-[11px]  shadow-md shadow-gray-100 ">
              <input
                value={data.siblingbday}
                type="date"
                className={`${
                  data.siblingbday == ""
                    ? "text-gray-400 arial-narrow"
                    : "text-black arial-narrow-bold"
                } w-[95%] text-black text-center backg-color-prdc focus:outline-none  h-6  text-[15px]`}
              />
              <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
            </td>
            <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
              <input
                value={data.siblingwork}
                className="w-[95%] text-black backg-color-prdc text-center focus:outline-none  arial-narrow-bold text-[15px]"
              />
              <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
            </td>
            <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow-bold text-[11px]  shadow-md shadow-gray-100 ">
              <input
                value={data.siblingcompany}
                className="w-[95%] text-black backg-color-prdc text-center focus:outline-none  arial-narrow-bold text-[15px]"
              />
              <AiFillCloseSquare
                className="text-center w-5 text-[15px] hover:text-[20px] text-red-900"
                onClick={() => remove_arraysibling(data.ID)}
              />
              <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
            </td>
          </tr>
        ))}
        {}
        <tr className="w-full   arial-narrow flex px-2">
          <td className="w-[55%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
            <span className="text-[15px] emptext-color items-center pl-3 arial-narrow flex w-full h-6">
              SPOUSE:
            </span>
            <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
          </td>
          <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow-bold text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setFamily({
                  ...family,
                  spouse: e.target.value,
                })
              }
              value={family.spouse}
              className="w-[95%] text-black backg-color-prdc text-center focus:outline-none  h-6 arial-narrow-bold text-[15px]"
            />
            <hr className="h-[2px] w-full borderFambackground absolute bottom-0" />
          </td>
          <td className="w-[55%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow-bold text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setFamily({
                  ...family,
                  spousebday: e.target.value,
                })
              }
              value={family.spousebday}
              type="date"
              className={`${
                family.spousebday == ""
                  ? "text-gray-400 arial-narrow"
                  : "arial-narrow-bold text-black"
              } w-[95%] text-black backg-color-prdc text-center focus:outline-none  h-6 arial-narrow text-[15px]`}
            />
            <hr className="h-[2px] w-full borderFambackground absolute bottom-0" />
          </td>
          <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow-bold text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setFamily({
                  ...family,
                  spousework: e.target.value,
                })
              }
              value={family.spousework}
              className="w-[95%] text-black backg-color-prdc text-center focus:outline-none  h-6 arial-narrow-bold text-[15px]"
            />
            <hr className="h-[2px] w-full borderFambackground absolute bottom-0" />
          </td>
          <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow-bold text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setFamily({
                  ...family,
                  spousecompany: e.target.value,
                })
              }
              value={family.spousecompany}
              className="w-[95%] text-black backg-color-prdc text-center focus:outline-none  h-6 arial-narrow-bold text-[15px]"
            />
            <hr className="h-[2px] w-full borderFambackground absolute bottom-0" />
          </td>
        </tr>
        <tr className="w-full   arial-narrow flex px-2">
          <td className="w-[55%] border  border-gray-500 relative emptext-color  ml-1 h-7  items-center justify-center flex arial-narrow-bold text-[15px]   shadow-gray-100">
            <span className="text-[15px] emptext-color items-center pl-3 arial-narrow flex w-full h-6">
              CHILDREN:
            </span>
            <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
          </td>
          <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setChildrenArray({
                  ...childrenarray,
                  children: e.target.value,
                })
              }
              placeholder="Add Children"
              value={childrenarray.children}
              className={`${
                childrenarray.children == ""
                  ? "text-gray-400 arial-narrow"
                  : "arial-narrow-bold text-black"
              } w-[95%] backg-color-prdc text-center focus:outline-none  arial-narrow text-[15px]`}
            />
            <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
          </td>
          <td className="w-[55%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setChildrenArray({
                  ...childrenarray,
                  childrenbday: e.target.value,
                })
              }
              value={childrenarray.childrenbday}
              type="date"
              className={`${
                childrenarray.childrenbday == ""
                  ? "text-gray-400 arial-narrow"
                  : "text-black arial-narrow-bold"
              } w-[95%] text-black text-center backg-color-prdc focus:outline-none  h-6  text-[15px]`}
            />
            <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
          </td>
          <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setChildrenArray({
                  ...childrenarray,
                  childrenwork: e.target.value,
                })
              }
              placeholder="Add Occupation"
              value={childrenarray.childrenwork}
              className={`${
                childrenarray.childrenwork == ""
                  ? "text-gray-400 arial-narrow"
                  : "arial-narrow-bold text-black"
              } w-[95%] backg-color-prdc text-center focus:outline-none  arial-narrow text-[15px]`}
            />
            <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
          </td>
          <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
            <input
              onChange={(e) =>
                setChildrenArray({
                  ...childrenarray,
                  childrencompany: e.target.value,
                })
              }
              placeholder="Add Company"
              value={childrenarray.childrencompany}
              className={`${
                childrenarray.childrencompany == ""
                  ? "text-gray-400 arial-narrow"
                  : "arial-narrow-bold text-black"
              } w-[95%] backg-color-prdc text-center focus:outline-none  arial-narrow text-[15px]`}
            />
            <AiFillPlusSquare
              className="text-center button-plus-fambg w-5 text-[15px] hover:text-[20px]"
              onClick={add_children}
            />
            <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
          </td>
        </tr>
        {family?.childrens.map((data) => (
          <tr className="w-full   arial-narrow flex px-2">
            <td className="w-[55%] border  border-gray-500 relative emptext-color  ml-1 h-7  items-center justify-center flex arial-narrow-bold text-[15px]   shadow-gray-100">
              <span className="text-[15px] emptext-color items-center pl-3 arial-narrow flex w-full h-6">
                CHILDREN:
              </span>
              <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
            </td>
            <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
              <input
                placeholder="Add Children"
                value={data.children}
                className={`arial-narrow-bold text-black w-[95%] backg-color-prdc text-center focus:outline-none  arial-narrow text-[15px]`}
              />
              <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
            </td>
            <td className="w-[55%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
              <input
                value={data.childrenbday}
                type="date"
                className={`text-black arial-narrow-bold w-[95%] text-black text-center backg-color-prdc focus:outline-none  h-6  text-[15px]`}
              />
              <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
            </td>
            <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
              <input
                value={data.childrenwork}
                className="arial-narrow-bold text-black w-[95%] backg-color-prdc text-center focus:outline-none  arial-narrow text-[15px]"
              />
              <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
            </td>
            <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
              <input
                value={data.childrencompany}
                className="arial-narrow-bold text-black w-[95%] backg-color-prdc text-center focus:outline-none  arial-narrow text-[15px]"
              />
              <AiFillCloseSquare
                className="text-center text-red-600 w-5 text-[15px] cursor-pointer hover:text-[20px]"
                onClick={() => remove_arraychildren(data.ID)}
              />
              <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
            </td>
          </tr>
        ))}
      </table>
      <div className="h-10 w-full mt-5 flex items-end justify-end">
        <button
          onClick={click_save}
          className="empmanage-border text-white initial-pag-border arial-narrow-bold absolute bottom-0 right-6 active:scale-1  rounded-sm text-[14px] h-7 w-20  hover:(border-black rounded-sm) active:duration-75 transition-all hover:(scale-108 ease-in-out  transform py-1 rounded-sm) group  mb-5 flex items-center justify-center     disabled:(bg-gray-500 border-gray-500 cursor-not-allowed)  focus:(outline-none) dark:(bg-transparent border-black border-[0.5px] hover:(arial-narrow-bold)"
        >
          SAVE
          {/* <AiOutlineArrowRight className="ml-2 text-initial group-hover:(text-[17px])" /> */}
        </button>
      </div>
    </div>
  );
};

export default HRFamBackground;
