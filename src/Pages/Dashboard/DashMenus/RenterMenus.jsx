import { Link, NavLink } from "react-router-dom";
import {  FaAddressBook, FaUsers } from "react-icons/fa";

import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

const RenterMenus = () => {
  return (
    <>
    <Link to='/dashboard/renterHome'>
    <h2 className="text-start text-xl  border-b-2 border-light-blue-600">Renter Dashboard</h2>
    </Link>
      
    <NavLink to="/dashboard/renterHome" className={`flex items-center gap-2`}>
        <HiOutlineBuildingOffice2 className="text-purple-400 text-2xl"></HiOutlineBuildingOffice2>
        <button className="w-full">Renter Home</button>
      </NavLink>

    

      <NavLink to="/dashboard/houseList" className={`flex items-center gap-2`}>
        <FaUsers className="text-purple-400  text-2xl"></FaUsers>
        <button className="w-full">House List</button>
      </NavLink>

      <NavLink to="/dashboard/bookings" className={`flex items-center gap-2`}>
        <FaAddressBook className="text-purple-400  text-2xl"></FaAddressBook>
        <button className="w-full">Bookings</button>
      </NavLink>
   

    </>
  );
};

export default RenterMenus;
