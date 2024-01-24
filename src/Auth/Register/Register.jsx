import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import useValidatePhone from "../../Hooks/useValidatePhone";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {validatePhoneNumber} = useValidatePhone();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();

  const selectedValue = watch("role");
  console.log(selectedValue);

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
      createUser(data.email, data.password).then((result) => {
        const loggedUser = result.user;
        console.log("Logged User", loggedUser);
        updateUserProfile(data.name, data.photoURL).then(() => {
          console.log("User Profile Updated");
          const userInfo = {
            name: data.name,
            email: data.email,
            image: res.data.data.display_url,
            role: data.role,
          };

          console.log(userInfo);

          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: `${data.name} Successfully Registered`,
                showConfirmButton: false,
                timer: 1500,
              });
              reset();
              navigate("/");
            }
          });
        });
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Signup | House Hunter</title>
      </Helmet>
      <div className=" my-4 flex flex-col justify-center items-center font-workSans">
        <div className=" rounded-lg bg-gradient-to-tr from-[#202123] to-[#454546] p-6">
          <div className="mb-4 flex flex-col justify-center items-center">
            <h2 className="text-xl text-center font-semibold text-white">
              Please <span className="text-green-200 font-bold">Sign Up</span> with  
            </h2>
            <h2><span className="text-3xl text-white uppercase font-bold">House Hunter</span></h2>
          </div>
          {/* form */}
          <div className="">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col space-y-4 w-full"
            >
              {/* Name & Designation */}
              <div>
                {/* Name */}
                <div className="w-full ">
                    <input
                      {...register("name", { required: true, maxLength: 20 })}
                      className="p-2 rounded border border-[#00C957] w-full"
                      type="text"
                      name="name"
                      placeholder="Name"
                    />
                  
                  {errors.name && (
                    <span className="text-red-100">
                      Your Full Name is Required
                    </span>
                  )}
                </div>
              </div>

              {/* Phone Number */}
              <div className={`w-full`}>
                  
                    <input
                      {...register("phone", { validate: validatePhoneNumber })}
                      className="p-2 rounded border border-[#00C957] w-full"
                      type="text"
                      placeholder="Phone"
                    />
                  {errors.phone && <span className="text-red-200">
                      {errors.phone.message}
                    </span>
                  }
                </div>

              {/* Email */}
              <div className="w-full">
                <input
                  {...register("email", { required: true })}
                  className="p-2 rounded border border-[#00C957] w-full"
                  type="email"
                  name="email"
                  placeholder="Email"
                />
              </div>
              {errors.email?.type === "required" && (
                <span className="text-red-100">Your Email is required</span>
              )}

              {/* Password */}
              <div className="relative">
                <input
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/,
                  })}
                  className="p-2 rounded border border-[#00C957] w-full"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                />
                <span
                  className="absolute top-3 right-2 text-xl text-[#0d0d0e]"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
                {/* Password Validation Message */}
                <div className="w-96">
                  {errors.password?.type === "required" && (
                    <span className="text-red-100">
                      Password field is required
                    </span>
                  )}
                  {errors.password?.type === "minLength" && (
                    <span className="text-red-100">
                      Password must be 6 characters
                    </span>
                  )}
                  {errors.password?.type === "maxLength" && (
                    <span className="text-red-100">
                      Password must be less than 20 characters
                    </span>
                  )}
                  {errors.password?.type === "pattern" && (
                    <span className="text-red-100">
                      Password at least one uppercase, one lowercase, one number
                      and one special character
                    </span>
                  )}
                </div>
              </div>

              <div className="w-full">
                <select
                id="role"
                  defaultValue="default"
                  {...register("role", { required: 'Please select your Role' })}
                  className="select select-bordered w-full p-2 rounded"
                >
                  <option value="generalUser" disabled>
                    Select Role
                  </option>
                  <option value="owner">House Owner</option>
                  <option value="renter">House Renter</option>
                  
                </select>
                {errors.role && (<span className="text-red-100">
                  {errors.role.message}
                  </span>
                )}
              </div>

              {/* <label className="text-white">Choose a profile picture</label> */}
              <input
                {...register("image", { required: 'Please upload a file' })}
                type="file"
                id="fileInput"
                className="bg-white file-input file-input-md file-input-bordered file-input-success focus:outline-none w-full my-6 text-black"
              />
              {errors.image && <p className="text-red-200">{errors.image.message}</p>}
              <input
                className="p-2 border border-[#fdfefe] bg-[#242526ac] hover:bg-[#515252]  text-white rounded-lg shadow-black shadow-xl hover:shadow-md cursor-pointer text-lg font-medium hover:animate-pulse"
                type="submit"
                value="Sign Up"
              />
            </form>
            <p className="p-4 text-center text-white">
              Have an account? Please
              <Link to="/login">
                <button className="text-green-200 pl-1 hover:text-white">Login</button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
