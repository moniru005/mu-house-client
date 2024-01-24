import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import ErrorPage from "../Pages/Home/Home/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home/Home";
import Dashboard from "../Layouts/Dashboard";
import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import OwnerHome from "../Pages/Dashboard/DashHome/OwnerHome";
import AddNewHouse from "../Pages/Dashboard/DashPages/AddNewHouse";
import HouseList from "../Pages/Dashboard/DashPages/HouseList";
import HouseUpdate from "../Pages/Dashboard/DashPages/HouseUpdate";

const route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
    ],
  },

  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <>
          <div className="bg-slate-100"><Navbar /></div>
          <Dashboard />
          <Footer />
        </>
      </PrivateRoute>
    ),
    children: [
        {
            path: 'ownerHome',
            element: <OwnerHome/>
        },
        {
            path: 'addNewHouse',
            element: <AddNewHouse/>
        },
        {
            path: 'houseList',
            element: <HouseList/>
        },
        {
            path: 'houseUpdate/:id',
            element: <HouseUpdate/>
        },
    ]
  },
]);

export default route;
