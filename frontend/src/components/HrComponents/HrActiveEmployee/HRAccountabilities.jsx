import React, { useEffect, useState } from "react";
import uniqid from "uniqid";
import { AiFillCloseSquare, AiFillPlusSquare } from "react-icons/ai";
const HRAccountabilities = ({
  setToggleState,
  setEmployeeInfo,
  employeeInfo,
  profile,
  setProfile,
  click_save,
}) => {
  const itm = JSON.parse(employeeInfo.Employee_ItemsAccountability)
    ? JSON?.parse(employeeInfo.Employee_ItemsAccountability)
    : {
        items: [],
      };
  const [addItem, setAddItem] = useState(false);
  const [itemarray, setItemArray] = useState({
    ID: uniqid(),
    item: "",
    brand: "",
    serial: "",
    qty: "",
    released: "",
    dtreleased: "",
    dtrecieved: "",
    dtturnedover: "",
  });
  const [item, setItem] = useState(itm);
  console.log(employeeInfo);
  const remove_arrayitem = (index) => {
    const newItems = item.items.filter((value) => value.ID !== index);
    setItem({ ...item, items: newItems });
  };
  const add_item = () => {
    setAddItem(!addItem);
    setItem({ ...item, items: [...item.items, itemarray] });
    setItemArray({
      ID: uniqid(),
      item: "",
      brand: "",
      serial: "",
      qty: "",
      released: "",
      dtreleased: "",
      dtrecieved: "",
      dtturnedover: "",
    });
  };
  useEffect(() => {
    setEmployeeInfo({
      ...employeeInfo,
      Employee_ItemsAccountability: JSON.stringify(item),
    });
  }, [item]);

  const handleChange = (event, objectname, ID) => {
    let ObjIndex = item.items.findIndex((obj) => obj.ID == ID);

    let object = item.items[ObjIndex];

    object[objectname] = event;

    setItem({ ...item });
  };

  console.log(item);

  return (
    <div className="w-full p-8 backg-color-prdc relative h-full flex">
      <div className="h-full  w-full flex-1">
        <span className="emptext-color arial-narrow-bold w-full self-start ml-3">
          ASSET INFORMATION
        </span>
        <table className="h-full w-full items-center flex-col justify-start mt-3 flex ">
          <tr className="w-full justify-evenly items-center flex px-2">
            <th className="w-[100%] border-gray-400 border-2 bg-gray-300 emptext-color  ml-1 h-7 mt-3 items-center justify-center flex arial-narrow-bold text-[15px]  shadow-md shadow-gray-100 bg-gray-200">
              <span className="items-center justify-center flex w-full arial-narrow-bold text-[15px]">
                ITEM NAME
              </span>
            </th>
            <th className="w-[100%] border-gray-400 border-2 bg-gray-300  emptext-color  ml-1 h-7 mt-3 items-center justify-center flex arial-narrow-bold text-[15px]  shadow-md shadow-gray-100 bg-gray-200">
              BRAND / MODEL
            </th>
            <th className="w-[100%] border-gray-400 border-2 bg-gray-300  emptext-color  ml-1 h-7 mt-3 items-center justify-center flex arial-narrow-bold text-[15px]  shadow-md shadow-gray-100 bg-gray-200">
              SERIAL NUMBER
            </th>
            <th className="w-[50%] border-gray-400 border-2 bg-gray-300  emptext-color  ml-1 h-7 mt-3 items-center justify-center flex arial-narrow-bold text-[15px]  shadow-md shadow-gray-100 bg-gray-200">
              QTY.
            </th>
            <th className="w-[100%] border-gray-400 border-2 bg-gray-300  emptext-color  ml-1 h-7 mt-3 items-center justify-center flex arial-narrow-bold text-[15px]  shadow-md shadow-gray-100 bg-gray-200">
              RELEASED BY
            </th>
            <th className="w-[100%] border-gray-400 border-2 bg-gray-300  emptext-color  ml-1 h-7 mt-3 items-center justify-center flex arial-narrow-bold text-[15px]  shadow-md shadow-gray-100 bg-gray-200">
              DT RELEASED
            </th>
            <th className="w-[100%] border-gray-400 border-2 bg-gray-300  emptext-color  ml-1 h-7 mt-3 items-center justify-center flex arial-narrow-bold text-[15px]  shadow-md shadow-gray-100 bg-gray-200">
              DT RECEIVED
            </th>
            <th className="w-[100%] border-gray-400 border-2 bg-gray-300  emptext-color  ml-1 h-7 mt-3 items-center justify-center flex arial-narrow-bold text-[15px]  shadow-md shadow-gray-100 bg-gray-200">
              DT TURNED OVER
            </th>
          </tr>

          <tr className="w-full   arial-narrow flex px-2">
            <td className="w-[100%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
              <input
                onChange={(e) =>
                  setItemArray({
                    ...itemarray,
                    item: e.target.value,
                  })
                }
                placeholder="Add Item"
                value={itemarray.item}
                className={`${
                  itemarray.item == "" ? "arial-narrow" : "arial-narrow-bold"
                } w-full backg-color-prdc text-center focus:outline-none  h-6 text-[15px]`}
              />
              <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
            </td>

            <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
              <input
                onChange={(e) =>
                  setItemArray({
                    ...itemarray,
                    brand: e.target.value,
                  })
                }
                placeholder="Add Model"
                value={itemarray.brand}
                className={`${
                  itemarray.brand == ""
                    ? "text-gray-400 arial-narrow"
                    : "text-black arial-narrow-bold"
                } w-full text-black text-center backg-color-prdc focus:outline-none  h-6  text-[15px]`}
              />
              <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
            </td>

            <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
              <input
                onChange={(e) =>
                  setItemArray({
                    ...itemarray,
                    serial: e.target.value,
                  })
                }
                placeholder="Add Serial no."
                value={itemarray.serial}
                className={`${
                  itemarray.serial == ""
                    ? "text-gray-400 arial-narrow"
                    : "text-black arial-narrow-bold"
                } w-[100%] text-black text-center backg-color-prdc focus:outline-none  h-6  text-[15px]`}
              />
              <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
            </td>
            <td className="w-[49%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
              <input
                onChange={(e) =>
                  setItemArray({
                    ...itemarray,
                    qty: e.target.value,
                  })
                }
                placeholder="Add QTY"
                value={itemarray.qty}
                className={`${
                  itemarray.qty == ""
                    ? "text-gray-400 arial-narrow"
                    : "text-black arial-narrow-bold"
                } w-[100%] text-black text-center backg-color-prdc focus:outline-none  h-6  text-[15px]`}
              />
              <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
            </td>
            <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
              <input
                onChange={(e) =>
                  setItemArray({
                    ...itemarray,
                    released: e.target.value,
                  })
                }
                placeholder="Released by"
                value={itemarray.released}
                className={`${
                  itemarray.released == ""
                    ? "text-gray-400 arial-narrow"
                    : "text-black arial-narrow-bold"
                } w-[100%] text-black text-center backg-color-prdc focus:outline-none  h-6  text-[15px]`}
              />
              <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
            </td>
            <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
              <input
                onChange={(e) =>
                  setItemArray({
                    ...itemarray,
                    dtreleased: e.target.value,
                  })
                }
                value={itemarray.dtreleased}
                type="date"
                className={`${
                  itemarray.dtreleased == ""
                    ? "text-gray-400 arial-narrow"
                    : "text-black arial-narrow-bold"
                } w-[100%] text-black text-center backg-color-prdc focus:outline-none  h-6  text-[15px]`}
              />
              <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
            </td>
            <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
              <input
                onChange={(e) =>
                  setItemArray({
                    ...itemarray,
                    dtrecieved: e.target.value,
                  })
                }
                value={itemarray.dtrecieved}
                type="date"
                className={`${
                  itemarray.dtrecieved == ""
                    ? "text-gray-400 arial-narrow"
                    : "text-black arial-narrow-bold"
                } w-[100%] text-black text-center backg-color-prdc focus:outline-none  h-6  text-[15px]`}
              />
              <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
            </td>
            <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
              <input
                onChange={(e) =>
                  setItemArray({
                    ...itemarray,
                    dtturnedover: e.target.value,
                  })
                }
                value={itemarray.dtturnedover}
                type="date"
                className={`${
                  itemarray.dtturnedover == ""
                    ? "text-gray-400 arial-narrow"
                    : "text-black arial-narrow-bold"
                } w-[100%] text-black text-center backg-color-prdc focus:outline-none  h-6  text-[15px]`}
              />
              <AiFillPlusSquare
                className="text-center w-5 button-plus-fambg  text-[15px] hover:text-[20px]"
                onClick={add_item}
              />
              <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
            </td>
          </tr>

          {item?.items.map((data) => (
            <tr className="w-full   arial-narrow flex px-2">
              <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow-bold text-[11px]  shadow-md shadow-gray-100 ">
                <input
                  onChange={(e) =>
                    handleChange(e.target.value, "item", data.ID)
                  }
                  value={data.item}
                  className="w-full text-black backg-color-prdc text-center focus:outline-none  h-6 arial-narrow-bold text-[15px]"
                />
                <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
              </td>
              <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
                <input
                  onChange={(e) =>
                    handleChange(e.target.value, "brand", data.ID)
                  }
                  value={data.brand}
                  className={`${
                    data.brand == ""
                      ? "text-gray-400 arial-narrow"
                      : "text-black arial-narrow-bold"
                  } w-full text-black text-center backg-color-prdc focus:outline-none  h-6  text-[15px]`}
                />
                <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
              </td>
              <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
                <input
                  onChange={(e) =>
                    handleChange(e.target.value, "serial", data.ID)
                  }
                  value={data.serial}
                  className={`${
                    data.serial == ""
                      ? "text-gray-400 arial-narrow"
                      : "text-black arial-narrow-bold"
                  } w-full text-black text-center backg-color-prdc focus:outline-none  h-6  text-[15px]`}
                />
                <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
              </td>
              <td className="w-[50%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
                <input
                  onChange={(e) => handleChange(e.target.value, "qty", data.ID)}
                  value={data.qty}
                  className={`${
                    data.qty == ""
                      ? "text-gray-400 arial-narrow"
                      : "text-black arial-narrow-bold"
                  } w-full text-black text-center backg-color-prdc focus:outline-none  h-6  text-[15px]`}
                />
                <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
              </td>
              <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow text-[11px]  shadow-md shadow-gray-100 ">
                <input
                  onChange={(e) =>
                    handleChange(e.target.value, "released", data.ID)
                  }
                  value={data.released}
                  className={`${
                    data.released == ""
                      ? "text-gray-400 arial-narrow"
                      : "text-black arial-narrow-bold"
                  } w-full text-black text-center backg-color-prdc focus:outline-none  h-6  text-[15px]`}
                />
                <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
              </td>
              <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow-bold text-[11px]  shadow-md shadow-gray-100 ">
                <input
                  onChange={(e) =>
                    handleChange(e.target.value, "dtreleased", data.ID)
                  }
                  value={data.dtreleased}
                  type="date"
                  className={`${
                    data.dtreleased == ""
                      ? "text-gray-400 arial-narrow"
                      : "text-black arial-narrow-bold"
                  } w-full text-black text-center backg-color-prdc focus:outline-none  h-6  text-[15px]`}
                />
                <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
              </td>
              <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow-bold text-[11px]  shadow-md shadow-gray-100 ">
                <input
                  onChange={(e) =>
                    handleChange(e.target.value, "dtrecieved", data.ID)
                  }
                  value={data.dtrecieved}
                  type="date"
                  className={`${
                    data.dtrecieved == ""
                      ? "text-gray-400 arial-narrow"
                      : "text-black arial-narrow-bold"
                  } w-full text-black text-center backg-color-prdc focus:outline-none  h-6  text-[15px]`}
                />
                <hr className="h-[2px] w-full  borderFambackground absolute bottom-0" />
              </td>

              <td className="w-[99%] border border-gray-500   relative  ml-1 h-7 items-center justify-center flex arial-narrow-bold text-[11px]  shadow-md shadow-gray-100 ">
                <input
                  onChange={(e) =>
                    handleChange(e.target.value, "dtturnedover", data.ID)
                  }
                  value={data.dtturnedover}
                  type="date"
                  className={`${
                    data.dtturnedover == ""
                      ? "text-gray-400 arial-narrow"
                      : "text-black arial-narrow-bold"
                  } w-full text-black text-center backg-color-prdc focus:outline-none  h-6  text-[15px]`}
                />
                <AiFillCloseSquare
                  className="text-center w-5 text-[15px] hover:text-[20px] text-red-900"
                  onClick={() => remove_arrayitem(data.ID)}
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

export default HRAccountabilities;
