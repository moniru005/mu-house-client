import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaAlignJustify, FaTimes } from "react-icons/fa";
import { useState } from "react";
import logo from "../../assets/images/Logo.png";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "You are Successfully Logged out",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const navbar = (
    <>
      <div className="flex lg:flex-row flex-col gap-2">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
      </div>
    </>
  );

  const loginButton = (
    <>
      <Link to="/login">
        <button className="btn btn-sm bg-slate-900 text-white">Login</button>
      </Link>
    </>
  );

  const logOutButton = (
    <>
      <Link to="login">
        <button onClick={handleLogOut} className="btn btn-sm bg-slate-900 text-white">
          <span>Logout</span>
        </button>
      </Link>
    </>
  );

  return (
    <div className="max-w-6xl mx-auto navbar">
      {/* Start */}
      <div className="navbar-start">
        <div className="flex flex-col items-center">
          <img className="w-16 lg:w-24" src={logo} alt="" />
          <a className="text-base font-semibold lg:text-xl lg:font-bold  uppercase">
            House Hunter
          </a>
        </div>
      </div>
      {/* Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navbar}</ul>
      </div>
      {/* End */}
      <div className="navbar-end">
        {user ? (
          <>
            <div className="flex flex-row items-center gap-2">
              <p>{user.displayName}</p>
              <button>{logOutButton}</button>
            </div>
          </>
        ) : (
          loginButton
        )}
        <div className="dropdown">
          <div
            onClick={() => setIsOpen(!isOpen)}
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden text-xl"
          >
            {isOpen === true ? <FaTimes /> : <FaAlignJustify />}
          </div>
          <ul
            tabIndex={0}
            className={`${
              isOpen ? "" : "hidden"
            } menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 -ml-40`}
          >
            {navbar}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
