import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ENDPOINTS } from "../ENDPOINTS";
import { useAxios } from "../axios/useAxios";

const insertOrderFn = async (axios, order) => {
  try {
    const response = await axios.post(`${ENDPOINTS.ORDER}`, order);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const useInsertOrder = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const insertOrderMutation = useMutation({
    mutationFn: (order) => insertOrderFn(axios, order),
    onSuccess: async () => {
      queryClient.invalidateQueries(["fetchAllItems"]);
    },
  });

  return {
    insertOrderMutation,
  };
};

export default useInsertOrder;
