import axios, { AxiosRequestConfig } from "axios";
import { ErrorStatus } from "@/constants/error-status";
import {
  deleteAuthTokenFromInternalServer,
  getAuthTokenFromInternalServer,
} from "./api/internal-auth-api";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 50000,
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = await getAuthTokenFromInternalServer();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case ErrorStatus.BAD_REQUEST:
          throw new Error(error.response.data.message);
        case ErrorStatus.UNAUTHORIZED:
          deleteAuthTokenFromInternalServer();
          window.location.href = "/login";
          throw new Error(error.response.data.message);
        case ErrorStatus.NOT_FOUND:
          window.location.href = "/not_found";
          break;
        case ErrorStatus.SERVER_ERROR:
          window.location.href = "/error";
          break;
      }
    }

    if (error.request) {
      throw new Error("Không thể kết nối");
    }
  },
);

export const get = <T>({
  url,
  params,
  config,
}: {
  url: string;
  params?: AxiosRequestConfig["params"];
  config?: AxiosRequestConfig;
}): Promise<T> => apiClient.get(url, { url, params, ...config });

export const post = <T>({
  url,
  data,
  config,
}: {
  url: string;
  data: unknown;
  config?: AxiosRequestConfig;
}): Promise<T> => apiClient.post(url, data, config);

export const update = <T>({
  url,
  data,
  config,
}: {
  url: string;
  data: unknown;
  config?: AxiosRequestConfig;
}): Promise<T> => apiClient.put(url, data, config);

export const remove = ({ url }: { url: string }) => apiClient.delete(url);

export const postFormData = <T>({
  url,
  data,
  config,
}: {
  url: string;
  data: FormData;
  config?: AxiosRequestConfig;
}): Promise<T> => {
  return apiClient.post(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...config?.headers,
    },
    ...config,
  });
};

export const updateFormData = <T>({
  url,
  data,
  config,
}: {
  url: string;
  data: FormData;
  config?: AxiosRequestConfig;
}): Promise<T> => {
  return apiClient.put(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...config?.headers,
    },
    ...config,
  });
};
