import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import "../Layouts/Dashboard.css";
import { RingLoader } from 'react-spinners';
import useRole from "../Hooks/useRole";
import OwnerMenus from "../Pages/Dashboard/DashMenus/OwnerMenus";
import RenterMenus from "../Pages/Dashboard/DashMenus/RenterMenus";
import GeneralUserMenus from "../Pages/Dashboard/DashMenus/GeneralUserMenus";


const Dashboard = () => {
  const [isOwner, isRenter, isOwnerAndRenterLoading] = useRole();

  //Dashboard Menu
  let menuComponent;
  if(isOwnerAndRenterLoading){
    menuComponent = <RingLoader color="#36d7b7"/>;
  }
  else if(isOwner){
    menuComponent = <OwnerMenus/>;
  }
  else if(isRenter){
    menuComponent = <RenterMenus/>;
  }
  else{
    menuComponent = <GeneralUserMenus/>;
  }

 


  return (
    <div className="flex flex-col lg:flex-row w-full">
      <Helmet>
        <title>Dashboard | EMS</title>
      </Helmet>

      {/* Dashboard Sidebar */}
      <div className="w-full lg:w-3/12 ">
        <div className="text-md font-workSans flex flex-col lg:flex-row gap-2 p-4 ">
          <ul className="sidebar flex flex-col gap-2 font-medium w-full ">
         
          {menuComponent}
          
          </ul>
        </div>
      </div>

      {/* Dashboard Contents */}
      <div className="w-full lg:w-9/12 flex p-4 bg-white">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
