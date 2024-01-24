import { Link } from "react-router-dom";


const GeneralUserMenus = () => {


  return (
    <>
    <Link to="/dashboard/userHome">
        <h2 className="text-start text-xl  border-b-2 border-light-blue-600">
          User Dashboard
        </h2>
      </Link>


      
    </>
  );
};

export default GeneralUserMenus;
