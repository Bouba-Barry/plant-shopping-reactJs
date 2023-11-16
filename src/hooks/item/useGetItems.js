import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS } from "../ENDPOINTS";
import { useAxios } from "../axios/useAxios";

const fetchAllItem = async (axios) => {
  try {
    const response = await axios.get(`${ENDPOINTS.ITEMS}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const useGetItems = () => {
  const axios = useAxios();

  const { status, data } = useQuery({
    queryKey: ["fetchAllItems"],
    queryFn: () => fetchAllItem(axios),
    refetchOnWindowFocus: false,
  });

  return {
    statusItems: status,
    plantList: data ?? [],
  };
};
