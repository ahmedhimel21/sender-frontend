import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useAuth } from "../hooks/useAuth";

export const useConsumer = () => {
    const {user, loading} = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const {data: isConsumer, isLoading: isConsumerLoading} = useQuery({
        queryKey: ['isConsumer', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/consumer/${user?.email}`);
            return res.data.consumer;
        }
    })
    return [isConsumer, isConsumerLoading]
}