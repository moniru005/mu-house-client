// import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
// import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import HouseList from "./HouseList";
import useHouse from "../../../Hooks/useHouse";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddNewHouse = () => {
  //   const navigate = useNavigate();
  const [, , refetch] = useHouse();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  //   const { createUser, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();


  const onSubmit = async (data) => {
    //image upload to imgBB and then get an url
    console.log(data);
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    console.log(res.data);
    if (res.data.success) {
      const houseInfo = {
        name: data.name,
        address: data.address,
        city: data.city,
        bedroom: data.bedroom,
        bathroom: data.bathroom,
        roomSize: data.size,
        rent: data.rent,
        available: data.date,
        phone: data.phone,
        description: data.description,
        image: res.data.data.display_url,
      };
      console.log(houseInfo);

      axiosPublic.post("/houses", houseInfo).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `New House Successfully Added`,
            showConfirmButton: false,
            timer: 1500,
          });
          reset();
          //   navigate("/");
          refetch();
        }
      });
    }
  };

  return (
    <div className="border rounded-t-md w-full mb-4 flex flex-col lg:flex-row font-workSans ">
      <Helmet>
        <title>Add New House | EMS</title>
      </Helmet>
      <div className="w-full">
        <div className="">
          <div className=" border-b-2  mb-4 rounded-t-md py-4 bg-gradient-to-r from-black to-slate-400 px-2">
            <h3 className="text-3xl text-white flex flex-col text-center w-full">
              <span className="">Add New House</span>
            </h3>
            <p className="text-center w-full text-white">
              <small>Add New House using in this form</small>
            </p>
          </div>
          {/* form */}
          <div className="rounded-lg p-6">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col space-y-2"
            >
              {/* Name & Address */}
              <div className={`flex flex-col lg:flex-row gap-2`}>
                {/* Name */}
                <div className="w-full lg:w-1/2">
                  <input
                    {...register("name", { required: true, maxLength: 20 })}
                    className="p-2 rounded border border-slate-400 w-full"
                    type="text"
                    name="name"
                    placeholder="Name"
                  />
                  {errors.name && (
                    <span className="text-red-100">{errors.name.message}</span>
                  )}
                </div>

                {/* Address */}
                <div className="w-full lg:w-1/2">
                  <div className="w-full ">
                  <input
                    {...register("address", { required: true, maxLength: 20 })}
                    className="p-2 rounded border border-slate-400 w-full"
                    type="text"
                    name="address"
                    placeholder="Address"
                  />
                    {errors.address && (
                      <span className="text-red-100">Address is Required</span>
                    )}
                  </div>
                  {errors.address && (
                    <span className="text-red-100">
                      {errors.address.message}
                    </span>
                  )}
                </div>
              </div>

              {/* City & bedroom & bathroom */}
              <div className={`flex flex-col lg:flex-row gap-2`}>
                {/* city */}
                <div className="w-full lg:w-4/12 ">
                  <input
                    {...register("city", {
                      required: true,
                      maxLength: 20,
                    })}
                    className="p-2 rounded border border-slate-400 w-full"
                    type="text"
                    placeholder="City"
                  />
                  {errors.city && (
                    <span className="text-red-100">City is Required</span>
                  )}
                </div>

                {/* bedroom */}
                <div className="w-full lg:w-4/12 ">
                  <input
                    {...register("bedroom", {
                      required: true,
                      maxLength: 20,
                    })}
                    className="p-2 rounded border border-slate-400 w-full"
                    type="number"
                    placeholder="Bedroom"
                  />
                  {errors.bedroom && (
                    <span className="text-red-100">Date is Required</span>
                  )}
                </div>
                {/* bathroom */}
                <div className="w-full lg:w-4/12 ">
                  <input
                    {...register("bathroom", {
                      required: true,
                      maxLength: 20,
                    })}
                    className="p-2 rounded border border-slate-400 w-full"
                    type="number"
                    placeholder="Bathroom"
                  />
                  {errors.bathroom && (
                    <span className="text-red-100">Date is Required</span>
                  )}
                </div>
              </div>

              {/* room size & rent & date */}
              <div className={`flex flex-col lg:flex-row gap-2`}>
                {/* room size */}
                <div className="w-full lg:w-4/12">
                  <input
                    {...register("size", { required: true, maxLength: 20 })}
                    className="p-2 rounded border border-slate-400 w-full"
                    type="text"
                    name="size"
                    placeholder="Room Size"
                  />
                  {errors.size && (
                    <span className="text-red-100">{errors.size.message}</span>
                  )}
                </div>

                {/* Rent */}
                <div className="w-full lg:w-4/12">
                  <div className="w-full ">
                  <input
                    {...register("rent", { required: true, maxLength: 20 })}
                    className="p-2 rounded border border-slate-400 w-full"
                    type="text"
                    name="rent"
                    placeholder="Rent"
                  />
                    {errors.rent && (
                      <span className="text-red-100">Rent is Required</span>
                    )}
                  </div>
                </div>

                {/* date */}
                <div className="w-full lg:w-4/12">
                  <div className="w-full ">
                  <input
                    {...register("date", { required: true, maxLength: 20 })}
                    className="p-2 rounded border border-slate-400 w-full"
                    type="date"
                    name="date"
                    placeholder="Date"
                  />
                    {errors.date && (
                      <span className="text-red-100">Rent is Required</span>
                    )}
                  </div>
                </div>

              </div>

              {/* phone & Description */}
              <div className={`flex flex-col lg:flex-row gap-2`}>
                {/* Phone */}
              <div className="w-full lg:w-5/12">
                  <input
                    {...register("phone", { required: true, maxLength: 20 })}
                    className="p-2 rounded border border-slate-400 w-full"
                    type="text"
                    name="phone"
                    placeholder="Phone"
                  />
                  {errors.phone && (
                    <span className="text-red-100">{errors.size.message}</span>
                  )}
                </div>
                {/* Description */}
                <div className="w-full lg:w-7/12 ">
                  <textarea
                    {...register("description", {
                      required: true,
                    })}
                    rows="10"
                    className="h-10 p-2 rounded border border-slate-400 w-full"
                    placeholder="Description">
                  </textarea>
                  {errors.description && (
                    <span className="text-red-100">
                      Description is Required
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-3">
                <label className="text-black">Upload your Property image</label>
                <input
                  {...register("image", { required: "Please upload a file" })}
                  type="file"
                  id="fileInput"
                  className="file-input w-full my-2 file-input-bordered text-black"
                />
                {errors.image && (
                  <p className="text-red-200">{errors.image.message}</p>
                )}
              </div>

              <div className="w-full">
                <input
                  className="p-2 border border-[#0064A5] bg-[#2B3440] hover:bg-[#4b5460] text-white rounded cursor-pointer text-base font-medium w-full"
                  type="submit"
                  value="Add House"
                />
              </div>
            </form>
          </div>

          {/* Data Table */}
          <div className="mt-10">
            <hr className="border-b-2 border-b-light-blue-600" />
            <HouseList/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewHouse;
