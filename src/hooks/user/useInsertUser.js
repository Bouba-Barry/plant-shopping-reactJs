import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ENDPOINTS } from "../ENDPOINTS";
import { useAxios } from "../axios/useAxios";

const insertUserFn = async (axios, user) => {
  try {
    const response = await axios.post(`${ENDPOINTS.USER}`, user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const useInsertUser = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const insertUserMutation = useMutation({
    mutationFn: (user) => insertUserFn(axios, user),
    onSuccess: async () => {
      // queryClient.invalidateQueries(["fetchUser"]);
    },
  });

  return {
    insertUserMutation,
  };
};

export default useInsertUser;
