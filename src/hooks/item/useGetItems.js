import { ENDPOINTS } from "../ENDPOINTS";
import { useAxios } from "../axios/useAxios";

const fetchAllItem = async (axios) => {
  try {
    const response = await axios.get(`${ENDPOINTS.ITEMS}`);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: error.response ? error.response.status : 500,
    };
  }
};

export const useGetItems = () => {
  const { axios } = useAxios();

  const result = fetchAllItem(axios);
  if (result.status == 200)
    return { statusItems: "success", plantList: result.data };
  else return { statusItems: "error", plantList: [] };
};
