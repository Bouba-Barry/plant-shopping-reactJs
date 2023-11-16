import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ENDPOINTS } from "../ENDPOINTS";
import { useAxios } from "../axios/useAxios";

const authUserFn = async (axios, user) => {
  try {
    console.log("user information to check login ... : ", user);
    const response = await axios.post(`${ENDPOINTS.USER}/auth`, user);
    console.log("respondeddd data : ", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const useGetUser = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const authUserMutation = useMutation({
    mutationFn: (params) => authUserFn(axios, params),
    onSuccess: async (data) => {
      //      queryClient.invalidateQueries(["fetchUser"]);
      
    },
  });

  return {
    authUserMutation,
  };
};
