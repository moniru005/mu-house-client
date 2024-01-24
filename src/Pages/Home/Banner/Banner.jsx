import banner from "../../../assets/images/panoramic-view.jpg";
const Banner = () => {
  return (
    <div>
      <div className="relative">
        <img src={banner} alt="" />
        <div className="absolute flex items-center h-full top-0 left-0 right-5 bottom-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0.00) 100%)] "></div>
        <div className="lg:flex hidden absolute top-48 left-32">
        <form className=" ">
          <div className="flex flex-col lg:flex-row gap-2 justify-center items-center">
            <div className="flex flex-col gap-1">
              <label className="text-white">City </label>
              <input className="p-2 rounded" type="text" name="city" id="" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-white">Bedrooms </label>
              <input className="p-2 rounded" type="text" name="bedrooms" id="" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-white">Bathrooms </label>
              <input className="p-2 rounded" type="text" name="bathrooms" id="" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-white">Room Size </label>
              <input className="p-2 rounded" type="text" name="roomSize" id="" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-white">Rent/Month </label>
              <input className="p-2 rounded" type="text" name="rent" id="" />
            </div>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Banner;
