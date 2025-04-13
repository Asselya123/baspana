import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { axiosAuthorizedApi } from "@/api";
import { Application } from "@/types";

const deleteApplication = async (id: string) => {
  const response = await axiosAuthorizedApi.delete(`/api/applications/${id}/`);
  return response.data;
};

export const useDeleteApplication = (id: string) => {
  const queryClient = useQueryClient();
  const { message } = App.useApp();
  return useMutation({
    mutationFn: () => deleteApplication(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      message.success("Заявка успешно удалена");
    },
    onError: () => {
      message.error("Не удалось удалить заявку");
    },
  });
};

const getApplications = async () => {
  const response = await axiosAuthorizedApi.get("/api/applications/");
  return response.data;
};

export const useGetApplications = () => {
  return useQuery<Application[]>({
    queryKey: ["applications"],
    queryFn: () => getApplications(),
  });
};

const createApplication = async (application: Partial<Application>) => {
  const response = await axiosAuthorizedApi.post("/api/applications/", {
    ...application,
    status: "in_progress",
    name: "Постановка на учет",
  });
  return response.data;
};

export const useCreateApplication = (
  onSuccess: (application: Application) => void,
) => {
  const queryClient = useQueryClient();
  const { message } = App.useApp();
  return useMutation({
    mutationFn: (application: Partial<Application>) =>
      createApplication(application),
    onSuccess: (application) => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      message.success("Заявка успешно создана");
      onSuccess(application);
    },
    onError: () => {
      message.error("Не удалось создать заявку");
    },
  });
};
