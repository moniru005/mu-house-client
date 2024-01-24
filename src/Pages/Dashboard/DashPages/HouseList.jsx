import { FaEdit, FaTrashAlt } from "react-icons/fa";
// import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading/Loading";
import { useState } from "react";
import useRole from "../../../Hooks/useRole";
import { Link } from "react-router-dom";


const HouseList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // const [selectedDate, setSelectedDate] = useState("");

  const axiosSecure = useAxiosSecure();
  const[isRenter] = useRole();
  console.log(isRenter);
 

  //fetch Task
  const { data: houses = [], isLoading: loading, refetch, } = useQuery({
    queryKey: ["houses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/houses");
      return res.data;
    },
  });


  //Search Filter
  const filteredHouses = houses?.filter((house) => {
    const query = searchQuery.toLowerCase();
    const search = house.name?.toLowerCase();
    const available = house.available;
    const city = house.city;
    const roomSize = house.roomSize?.toLowerCase();

    return search?.includes(query) || 
    available?.includes(query) || city?.includes(query) || roomSize?.includes(query);
    
  });


// Task Delete   
const handleDeleteTask = (house) => {
    Swal.fire({
        title: `You want delete this Task?`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
            
            axiosSecure.delete(`/houses/${house._id}`).then((res) => {
                console.log(res.data);
                if (res.data.deletedCount > 0) {
                  Swal.fire({
                    title: "Deleted!",
                    text: "Your data has been deleted.",
                    icon: "success",
                  });
                  refetch();
                }
              });
        }
      });
  };

  //Loading
  if(loading){
    <Loading></Loading>
  }

  
  return (
    <div className="font-workSans w-full ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex justify-between items-center font-medium mb-6 w-full">
          <h2 className="text-xl text-start w-full">House List: ({filteredHouses.length})</h2>
          <div className=" lg:ml-8 flex gap-4 ">
            <input
              className="p-2 border border-[#8e8e8e] font-workSans font-medium rounded-lg"
              type="text"
              placeholder="Search any key"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* <input
            className="p-2 border border-[#0064A5]"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            /> */}
          </div>
        </div>
        <table id="" className="table lg:table-lg table-sm w-full border">
          <thead className="border">
            <tr className="user-heading font-medium">
              <th className={`border`}>SL</th>
              <th className="w-56 ">Name</th>
              <th className="border">City</th>
              <th className="border">Size (SFT)</th>
              <th className="border">Phone</th>
              <th className="border">Available</th>
              <th className="border">A</th>
            </tr>
          </thead>
          <tbody>
            {filteredHouses?.map((house, index) => (
              <tr key={house._id} className="user-body text-center">
                <td className={`border`}>{index + 1}</td>
                <td className="border capitalize ">
                    <div className="flex flex-col items-center">
                    <img className=" rounded-badge w-12 h-12" src={house.image} alt="" />
                    <p>{house.name}</p>
                    </div>
                </td>
                <td className="border capitalize">{house.city}</td>
                <td className="border ">{house.roomSize}</td>
                <td className="border ">{house.phone}</td>
                <td className="border ">{house.available}</td>
                
                
                
                <td className={`border flex flex-col gap-2`}>
                  <button
                    onClick={() => handleDeleteTask(house)}
                    className="bg-red-600 p-2 rounded w-8"
                  >
                    <FaTrashAlt className="text-white"></FaTrashAlt>
                  </button>
                  <Link to={`/dashboard/houseUpdate/${house._id}`}>
                  <button
                    className="bg-green-600 p-2 rounded w-8"
                  >
                    <FaEdit className="text-white"></FaEdit>
                  </button>
                  </Link>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default HouseList;
