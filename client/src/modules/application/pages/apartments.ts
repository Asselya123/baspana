import { useQuery } from "@tanstack/react-query";
import { axiosAuthorizedApi } from "@/api";
import { Apartment } from "@/types";

const getApartments = async () => {
  const response = await axiosAuthorizedApi.get("/api/apartments/");
  return response.data;
};

export const useGetApartments = () => {
  return useQuery<Apartment[]>({
    queryKey: ["apartments"],
    queryFn: () => getApartments(),
  });
};

const getApartmentById = async (id: string) => {
  const response = await axiosAuthorizedApi.get(`/api/apartments/${id}`);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return response.data;
};

export const useGetApartmentById = (id: string) => {
  return useQuery<Apartment>({
    queryKey: ["apartments", id],
    queryFn: () => getApartmentById(id),
    retry: 2,
  });
};
