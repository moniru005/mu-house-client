import { Link, NavLink } from "react-router-dom";
import {  FaUsers } from "react-icons/fa";
import { BiTask } from "react-icons/bi";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

const RenterMenus = () => {
  return (
    <>
    <Link to='/dashboard/hrHome'>
    <h2 className="text-start text-xl  border-b-2 border-light-blue-600">HR Dashboard</h2>
    </Link>
      
    <NavLink to="/dashboard/hrHome" className={`flex items-center gap-2`}>
        <HiOutlineBuildingOffice2 className="text-purple-400 text-2xl"></HiOutlineBuildingOffice2>
        <button className="w-full">HR Home</button>
      </NavLink>

      {/* <NavLink
        to="/dashboard/addEmployee"
        className={`flex items-center gap-2`}
      >
        <FaUserCheck className="text-purple-400 text-2xl"></FaUserCheck>
        <button className="w-full">Add Employee</button>
      </NavLink> */}

      <NavLink to="/dashboard/allUsers" className={`flex items-center gap-2`}>
        <FaUsers className="text-purple-400 text-2xl"></FaUsers>
        <button className="w-full">Employees List</button>
      </NavLink>

      <NavLink
        to="/dashboard/paymentHistory"
        className={`flex items-center gap-2`}
      >
        <FaMoneyCheckDollar className="text-purple-400 text-2xl"></FaMoneyCheckDollar>
        <button className="w-full">Payment History</button>
      </NavLink>

      <NavLink
        to="/dashboard/workSheetList"
        className={`flex items-center gap-2`}
      >
        <BiTask className="text-purple-400 text-2xl"></BiTask>
        <button className="w-full">Employee Task List</button>
      </NavLink>
    </>
  );
};

export default RenterMenus;
