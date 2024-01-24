// ... (previous imports remain the same)

import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isOwnerAndRenter, isPending: isOwnerAndRenterLoading } = useQuery({
        queryKey: [user?.email, 'isOwnerAndRenter'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/owner/${user.email}`);
            console.log(res.data);
            return res.data; // Retrieve both admin and HR status from the backend
        }
    });

    // Extract isOwner and isRenter from the response data
    const isOwner = isOwnerAndRenter?.owner || false;
    const isRenter = isOwnerAndRenter?.isRenter || false;

    return [isOwner, isRenter, isOwnerAndRenterLoading]; // Return both admin and HR status
};

export default useRole;