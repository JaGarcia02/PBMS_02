import React from "react";
import { useState, useEffect } from "react";
import Adduser from "../../components/AdminComponents/Adduser";
import { useSelector, useDispatch } from "react-redux";
import Resetuser from "../../components/AdminComponents/Resetuser";
import { AnimatePresence } from "framer-motion";
import ReactPaginate from "react-paginate";
import { HiArrowNarrowRight, HiArrowNarrowLeft } from "react-icons/hi";
import { getAllUsers } from "../../features/users/usersSlice";
import Lottie from "lottie-react";
import loadingSearch from "../../lottieFiles/spinner.json";
import { FaSearch } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import AdminSidebar from "../../components/AdminComponents/AdminSidebar";

const Createuser = () => {
  const [toggle, setToggle] = useState(false);
  const [currentList, setCurrentList] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const [toggleInfo, setToggleInfo] = useState(false);
  const [info, setInfo] = useState({});
  const [sort, setSort] = useState("ID");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const dispatch = useDispatch();

  const { listUsers, isLoadingList, isErrorList, messageList } = useSelector(
    (state) => state.users
  );

  const [itemOffset, setItemOffset] = useState(0);

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.

  useEffect(() => {
    dispatch(getAllUsers({ search: searchValue, sort: sort }));
    setPageCount(
      Math.ceil(
        listUsers?.filter((filter) => filter.role <= 3).length / itemsPerPage
      )
    );
    setItemOffset(0);
  }, [dispatch, searchValue, sort]);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  useEffect(() => {
    const endOffset = parseInt(itemOffset) + parseInt(itemsPerPage);
    setCurrentList(
      listUsers
        ?.filter((filter) => filter.role <= 3)
        .slice(itemOffset, endOffset)
    );
    setPageCount(
      Math.ceil(
        listUsers?.filter((filter) => filter.role <= 3).length / itemsPerPage
      )
    );
  }, [listUsers, itemsPerPage, itemOffset]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % listUsers?.length;

    setItemOffset(newOffset);
  };

  const infoOpener = (
    ID,
    LastName,
    firstName,
    Division,
    Department,
    Position,
    Status,
    EmployeeNum,
    Suspension,
    AccountStatus,
    username,
    email,
    company,
    middleName,
    user_category,
    section
  ) => {
    setToggleInfo(true);
    setInfo({
      ID: ID,
      Division: Division,
      Department: Department,
      Position: Position,
      Status: Status,
      EmployeeNum: EmployeeNum,
      Suspension: Suspension,
      AccountStatus: AccountStatus,
      username: username,
      email: email,
      user_category: user_category,
      company: company,
      section: section,
      LastName: LastName,
      firstName: firstName,
      MiddleName: middleName,
    });
  };

  return (
    <div className="flex flex-col relative bg-white h-screen dark:(bg-stone-900)">
      <AdminSidebar />
      <Adduser toggle={toggle} setToggle={setToggle} />

      <div className="mt-15 flex relative flex-col h-full">
        {/*<div className=" ml-6 flex mt-5 relative mb-1 <md:(hidden)">
          <div className="flex items-center">
            <span className="ml-4 text-black flex items-center font-Roboto dark:(text-white)">
              <FcLock className="mr-1" />
              Locked
            </span>
          </div>logout
          <div className="flex items-center ml-4">
            <span className="ml-4 text-black flex items-center font-Roboto dark:(text-white)">
              <FcCancel className="mr-1" />
              Suspended
            </span>
          </div>
          <div className="flex text-black items-center ml-4">
            <span className="ml-4 flex items-center dark:(text-white)">
              <FaUserAltSlash className="mr-1 " />
              Inactive
            </span>
          </div>
          <div className="absolute flex items-center h-8 rounded-full border border-black bg-gray-200 right-4">
            <FaSearch className="px-2 h-8 w-8" />
            <input
              className="border-none outline-none bg-transparent placeholder-gray-400"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search"
            />
          </div>
        </div>*/}
        <div className="mt-3 w-full flex items-center justify-between items-center <md:(mt-15 text-center)">
          <span className="ml-6 mt-2 arial-narrow-bold text-black text-[20px] dark:(text-white) <md:(text-[18px] text-center)">
            ACCOUNT MANAGEMENT
          </span>
        </div>
        <div className="w-full mt-3 ml-6 flex items-center justify-between <md:(justify-center mb-3 flex-col)">
          {/* <span className="arial-narrow font-semibold text-xl text-black dark:(text-white)">
            Total users: {listUsers?.length}
          </span> */}
          <div className="w-full flex justify-between <md:(w-[80%])">
            <div className="flex h-8 w-[40%] rounded-full text-black shadow-sm shadow-gray-600 bg-white dark:(bg-gray-600 text-light-50 shadow-none) <md:(w-[100%])">
              <FaSearch className="px-2 h-8 w-8" />
              <input
                className="border-none outline-none w-full bg-transparent placeholder-gray-40 "
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  const newOffset =
                    (0 * parseInt(itemsPerPage)) % listUsers?.length;
                  setItemOffset(newOffset);
                }}
                placeholder="Search"
              />
            </div>{" "}
            <button
              className="mr-10 text-yellow-600 text-[13px] h-7  border-yellow-500 rounded-sm hover:(rounded-sm border-yellow-500) p-1  flex items-center focus:(outline-none) dark:(text-green-400 bg-transparent shadow-none border-green-400 hover:bg-green-400 hover:text-black) active:duration-75 transition-all hover:scale-108 ease-in-out  transform py-1 rounded-sm"
              onClick={() => setToggle(true)}
            >
              <IoAdd className="mr-2 text-[18px] text-yellow-600 <md:(text-[14px] mr-1)" />
              Add Account
            </button>
          </div>
        </div>
        {isLoadingList ? (
          <div className="w-full relative flex items-center justify-center h-[60vh]">
            <Lottie
              animationData={loadingSearch}
              loop={true}
              className="h-80 w-80 mt-1  absolute"
            />
          </div>
        ) : (
          <div className="w-full h-[60vh] mt-1 overflow-auto flex justify-center <md:(overflow-auto)">
            <table className="w-screen h-[10%]  mt-4 overflow-hidden  dark:(bg-white/20 shadow-md shadow-xs)  <md:(w-70 h-auto)">
              <thead>
                <tr className="shadow-sm shadow-gray-800 bg-color-prdc h-10 dark:(bg-blue-500) <md:(hidden)">
                  <th
                    className="w-15 text-black arial-narrow-bold text-left cursor-pointer text-[14px] hover:(bg-yellow-900) <md:(hidden) dark:(border-white text-white) "
                    onClick={() => setSort("ID")}
                  >
                    <span className="ml-2">No.</span>
                  </th>
                  <th className=" text-black text-left w-35 arial-narrow-bold text-[14px] <md:(hidden) dark:(border-white text-white)">
                    User Category
                  </th>
                  <th
                    className=" text-black text-left arial-narrow-bold text-[14px] cursor-pointer hover:(bg-yellow-900) w-30  <md:(hidden) dark:(border-white text-white)"
                    onClick={() => setSort("employee_id")}
                  >
                    Employee No.
                  </th>
                  {/* <th className=" text-black text-left arial-narrow-bold text-[14px] w-30 <md:(hidden) dark:(border-white text-white)">
                    Username
                  </th> */}

                  <th
                    className=" text-black text-left arial-narrow-bold text-[14px] cursor-pointer w-45 hover:(bg-yellow-900) <md:(hidden) dark:(border-white text-white)"
                    onClick={() => setSort("LastName")}
                  >
                    Full Name
                  </th>
                  <th className=" text-black text-left w-40 arial-narrow-bold text-[14px] <md:(hidden) dark:(border-white text-white)">
                    Email Address
                  </th>

                  <th className=" text-black text-left w-50 arial-narrow-bold text-[14px] <md:(hidden) dark:(border-white text-white)">
                    Company
                  </th>

                  <th className=" text-black text-left w-35 arial-narrow-bold text-[14px] <md:(hidden) dark:(border-white text-white)">
                    Department
                  </th>

                  <th className=" text-black text-left arial-narrow-bold text-[14px] w-35 <md:(hidden) dark:(border-white text-white)">
                    Role
                  </th>
                  {/*<th className=" text-white text-center <md:(hidden) dark:(border-white text-white)">
                    Lock Status
                  </th>
                  <th className="text-left text-white text-center <md:(hidden) dark:(border-white text-white)">
                    Lock Counter
                  </th>
                  <th className=" text-black text-left arial-narrow-bold text-[14px] <md:(hidden) dark:(border-white text-white)">
                    Authorization
                  </th>*/}
                  <th className=" text-black text-left arial-narrow-bold w-25 text-[14px] <md:(hidden) dark:(border-white text-white)">
                    Status
                  </th>
                  {/*<th className=" text-white text-center <md:(hidden) dark:(border-white text-white)">
                    Account Suspend Status
                </th>*/}
                </tr>
              </thead>

              <tbody>
                {currentList
                  ?.filter((filter) => filter.role <= 3)
                  .map((items, index) => (
                    <tr
                      onClick={() =>
                        infoOpener(
                          items.ID,
                          items.LastName,
                          items.firstName,
                          items.division,
                          items.department,
                          items.role,
                          items.counterLogin,
                          items.employee_id,
                          items.Suspension,
                          items.acctStatus,
                          items.username,
                          items.email,
                          items.company,
                          items.MiddleName,
                          items.user_category,
                          items.section
                        )
                      }
                      className={
                        items.acctStatus == "Inactive"
                          ? "border-b border-b-black bg-dark-200 arial-narrow h-5 text-white hover:(bg-yellow-100 text-black) cursor-pointer dark:(bg-gray-900 hover:bg-blue-200) <md:(flex border-b border-black h-full flex-col mb-3)"
                          : items.Suspension == 1
                          ? "border-b border-b-black bg-red-400 arial-narrow h-5 text-black hover:(bg-yellow-100 text-black) cursor-pointer  <md:(flex h-full flex-col border-b border-black mb-3)"
                          : items.counterLogin >= 5
                          ? "border-b border-b-black bg-yellow-200 arial-narrow h-5 text-black hover:(bg-yellow-100 text-black) cursor-pointer dark:(bg-yellow-200 text-black hover:bg-blue-200) <md:(flex h-full flex-col border-b border-black mb-3)"
                          : "border-b border-b-black cursor-pointer arial-narrow h-5 text-black hover:(bg-yellow-100 text-black)  dark:(text-white) <md:(flex h-full flex-col border-b border-black mb-3)"
                      }
                      key={items.ID}
                    >
                      <td className="text-left arial-narrow  text-[13px] px-2  dark:(border-blue-300) <md:(block px-5 text-right border-none before:content-ID) before:float-left">
                        {index + 1}
                      </td>
                      <td className="text-left arial-narrow  text-[13px]   dark:(border-blue-300) <md:(block px-5 text-right border-none before:content-Name) before:float-left">
                        {items.user_category}
                      </td>
                      <td className="text-left arial-narrow  text-[13px]   dark:(border-blue-300) <md:(block px-5 text-right border-none before:content-Employee-number) before:float-left">
                        {items.employee_id}
                      </td>
                      {/* <td className="text-left arial-narrow  text-[13px]   dark:(border-blue-300) <md:(block px-5 text-right border-none before:content-Employee-number) before:float-left">
                      {items.username}
                    </td> */}

                      <td className="text-left arial-narrow  text-[13px]   dark:(border-blue-300) <md:(block px-5 text-right border-none before:content-Name) before:float-left">
                        {items.LastName +
                          ", " +
                          items.firstName +
                          " " +
                          items.MiddleName}
                      </td>
                      <td className="text-left arial-narrow  text-[13px]   dark:(border-blue-300) <md:(block px-5 text-right border-none before:content-Employee-number) before:float-left">
                        {items.email}
                      </td>
                      <td className="text-left arial-narrow  text-[13px]   dark:(border-blue-300) <md:(block px-5 text-right border-none before:content-Name) before:float-left">
                        {items.company}
                      </td>
                      <td className="text-left arial-narrow  text-[13px]   dark:(border-blue-300) <md:(block px-5 text-right border-none before:content-Department) before:float-left">
                        {items.department == "HR"
                          ? "Human Resources"
                          : items.department == "OPS"
                          ? "Operations"
                          : items.department == "AMAD"
                          ? "Assets Management and Admin"
                          : items.department == "ACC"
                          ? "Accounting"
                          : items.department == "TA"
                          ? "Talent Acquisition"
                          : items.department == "BSD"
                          ? "Business Support"
                          : items.department == "TSD"
                          ? "Technical Services"
                          : items.department == "SALES"
                          ? "Sales"
                          : ""}
                      </td>
                      <td className="text-left arial-narrow  text-[13px]   dark:(border-blue-300) <md:(block px-5 text-right border-none before:content-Position) before:float-left">
                        {items.role == 2
                          ? "Department Admin"
                          : items.role == 3
                          ? "Executives"
                          : items.role == 4
                          ? "Manager"
                          : items.role == 5
                          ? "Supervisor"
                          : items.role == 6
                          ? "Rank & File"
                          : ""}
                      </td>
                      {/*<td className="text-center   dark:(border-blue-300 text-white) <md:(block px-5 text-right border-none before:content-Lock-Status) before:float-left">
                      {items.counterLogin >= 5 ? "Locked" : "Active"}
                    </td>
                    <td className="text-center   dark:(border-blue-300 text-white) <md:(block px-5 text-right border-none before:content-Lock-Status) before:float-left">
                      {items.counterLogin}
                      </td>*/}

                      {/* <td className=" text-left arial-narrow  text-[13px]  dark:(border-blue-300) <md:(block px-5 text-right border-none before:content-Account-Status) before:float-left">
                      {items.online_status}
                    </td> */}
                      {/*<td className=" text-center  text-center  dark:(border-blue-300 text-white) <md:(block px-5 text-right border-none before:content-Suspension-Status) before:float-left">
                      {items.Suspension == 0 ? (
                        <ImCross className="text-red-600 bg-light-50 p-1 rounded-full" />
                      ) : (
                        <ImCheckmark className="text-green-600  bg-gray-400 p-1 rounded-full" />
                      )}
                      </td>*/}
                    </tr>
                  ))}
                {listUsers?.filter((filter) => filter.role <= 3).length ==
                  0 && (
                  <tr>
                    <td
                      className="font-Roboto text-2xl text-black  dark:(text-white)"
                      colSpan={12}
                      align="center"
                      valign="middle"
                    >
                      Nothing found!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        <div className="w-full items-center border-t border-t-gray-800 justify-center flex absolute bottom-0 <md:(static)">
          <div className="absolute left-2">
            <span>Display</span>{" "}
            <select
              className="absolute ml-2 w-25 shadow-sm rounded-md shadow-gray-700 mr-2 dark:(bg-gray-600 shadow-none text-white)"
              onChange={(e) => {
                setItemsPerPage(e.target.value);
                const newOffset =
                  (0 * parseInt(itemsPerPage)) % listUsers?.length;
                setItemOffset(newOffset);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
          <ReactPaginate
            breakLabel="..."
            nextLabel={<HiArrowNarrowRight />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel={<HiArrowNarrowLeft />}
            renderOnZeroPageCount={null}
            containerClassName="list-none flex items-center gap-3 "
            pageLinkClassName="cursor-pointer shadow-2xl text-black p-2 overflow-hidden dark:(text-white) hover:(bg-blue-400 text-white)"
            previousLinkClassName="p-2 cursor-pointer rounded-sm text-black overflow-hidden hover:(bg-blue-400) dark:(text-white rounded-sm)"
            nextLinkClassName="p-2 cursor-pointer rounded-sm text-black hover:(bg-blue-400) dark:(text-white)"
            //activeClassName="color-1 py-[7px] rounded-sm dark:(bg-blue-900)"
          />
        </div>
      </div>
      <AnimatePresence>
        {toggleInfo && (
          <Resetuser
            ID={info.ID}
            EmployeeNum={info.EmployeeNum}
            LastName={info.LastName}
            MiddleName={info.MiddleName}
            firstName={info.firstName}
            department={info.Department}
            division={info.Division}
            position={info.Position}
            status={info.Status}
            category={info.Category}
            setToggleInfo={setToggleInfo}
            Suspension={info.Suspension}
            AccountStatus={info.AccountStatus}
            username={info.username}
            email={info.email}
            company={info.company}
            user_category={info.user_category}
            section={info.section}
            role={info.role}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Createuser;
