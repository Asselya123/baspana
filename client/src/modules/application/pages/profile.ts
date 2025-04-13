import { useQuery } from "@tanstack/react-query";
import { axiosAuthorizedApi } from "@/api";
import { Profile } from "@/types";

const getProfile = async () => {
  const response = await axiosAuthorizedApi.get("/api/profile/");
  return response.data;
};

export const useGetProfile = () => {
  return useQuery<Profile>({
    queryKey: ["profile"],
    queryFn: () => getProfile(),
  });
};
