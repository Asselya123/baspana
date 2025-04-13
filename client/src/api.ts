import { useMutation } from "@tanstack/react-query";
import { App } from "antd";
import axios from "axios";
import { LoginRequest, LoginResponse } from "./types";

const baseURL = import.meta.env.VITE_API_URL;

const axiosApi = axios.create({
  baseURL: baseURL,
});

export const axiosAuthorizedApi = axios.create({
  baseURL: baseURL,
});

axiosAuthorizedApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

axiosAuthorizedApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
    }
  },
);

export const login = async (
  credentials: LoginRequest,
): Promise<LoginResponse> => {
  const response = await axiosApi.post("/api/login/", credentials);
  return response.data;
};

type ChangePasswordRequest = {
  old_password: string;
  new_password: string;
};

const changePassword = async (
  credentials: ChangePasswordRequest,
): Promise<unknown> => {
  const response = await axiosAuthorizedApi.post(
    "/api/change-password/",
    credentials,
  );
  return response.data;
};

export const useChangePassword = (onSuccess?: () => void) => {
  const { message } = App.useApp();
  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      message.success("Пароль успешно изменен");
      onSuccess?.();
    },
    onError: () => {
      message.error("Не удалось изменить пароль");
    },
  });
};
