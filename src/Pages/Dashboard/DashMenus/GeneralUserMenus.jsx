import { Link, NavLink } from "react-router-dom";
import { BiTask } from "react-icons/bi";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { useState } from "react";

const GeneralUserMenus = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    <Link to="/dashboard/ownerHome">
        <h2 className="text-start text-xl  border-b-2 border-light-blue-600">
          User Dashboard
        </h2>
      </Link>
      {/* <NavLink to="/dashboard/employeeHome">
        <button className="w-full">Employee Dashboard</button>
      </NavLink> */}
      {/* <NavLink to="/dashboard/employeeTask">
        <button className="w-full">Employee Task</button>
      </NavLink> */}
      <NavLink className={`flex items-center gap-2`}>
      <BiTask className="text-blue-400 text-2xl"></BiTask>
      <button onClick={() => setIsOpen(!isOpen)} >
        Employee Task
      </button>
      </NavLink>
      
      {
        isOpen===true&& <>
        <NavLink to="/dashboard/employeeWorkSheet" className={`flex items-center gap-2`}>
      <BiTask className="text-blue-400 text-2xl"></BiTask>
        <button className="w-full">Employee Task-1</button>
      </NavLink>

      <NavLink to="/dashboard/employeeTask2" className={`flex items-center gap-2`}>
      <BiTask className="text-blue-400 text-2xl"></BiTask>
        <button className="w-full">Employee Task-2</button>
      </NavLink>
        </>
      }


      <NavLink
        to="/dashboard/paymentHistory"
        className={`flex items-center gap-2`}
      >
        <FaMoneyCheckDollar className="text-blue-400 text-2xl"></FaMoneyCheckDollar>
        <button className="w-full">Payment History</button>
      </NavLink>
      
    </>
  );
};

export default GeneralUserMenus;
