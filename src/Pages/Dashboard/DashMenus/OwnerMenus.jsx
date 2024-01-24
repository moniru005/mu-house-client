import { Link, NavLink } from "react-router-dom";
// import { GrUserAdmin } from "react-icons/gr";
import { FaUserCheck, FaUsers } from "react-icons/fa";
// import { BiTask } from "react-icons/bi";
// import { FaMoneyCheckDollar } from "react-icons/fa6";
import { GrUserAdmin } from "react-icons/gr";
const OwnerMenus = () => {
  return (
    <>
      <Link to="/dashboard/adminHome">
        <h2 className="text-start text-xl  border-b-2 border-light-blue-600">
          House Owner
        </h2>
      </Link>
      <NavLink to="/dashboard/ownerHome" className={`flex items-center gap-2`}>
        <GrUserAdmin className="text-green-400 text-2xl"></GrUserAdmin>
        <button className="w-full">Owner Dashboard</button>
      </NavLink>
      <NavLink
        to="/dashboard/addNewHouse"
        className={`flex items-center gap-2`}
      >
        <FaUserCheck className="text-green-400 text-2xl"></FaUserCheck>
        <button className="w-full">Add New House</button>
      </NavLink>

      <NavLink to="/dashboard/houseList" className={`flex items-center gap-2`}>
        <FaUsers className="text-green-400 text-2xl"></FaUsers>
        <button className="w-full">House List</button>
      </NavLink>

      {/* <NavLink
        to="/dashboard/workSheetList"
        className={`flex items-center gap-2`}
      >
        <BiTask className="text-green-400 text-2xl"></BiTask>
        <button className="w-full">Update House</button>
      </NavLink> */}

      {/* <NavLink
        to="/dashboard/paymentHistory"
        className={`flex items-center gap-2`}
      >
        <FaMoneyCheckDollar className="text-green-400 text-2xl"></FaMoneyCheckDollar>
        <button className="w-full">Payment History</button>
      </NavLink> */}
    </>
  );
};

export default OwnerMenus;
