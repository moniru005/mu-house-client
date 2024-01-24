import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useHouse = () => {
    const axiosPublic = useAxiosPublic();
    const { data: houses = [], isLoading, refetch } = useQuery({
        queryKey: ["houses"],
        queryFn: async () => {
          const res = await axiosPublic.get("/houses");
          return res.data;
        },
      });
      return [houses, isLoading, refetch]
};

export default useHouse;