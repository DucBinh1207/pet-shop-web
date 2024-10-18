import { toastError } from "@/utils/toast";
import axios, { AxiosError } from "axios";

export async function saveAuthTokenForInternalServer(token: string) {
  try {
    const response = await axios.post("/api/auth/token", { token });
    if (response.data.error) {
      console.log(response);
      throw new AxiosError(response.data.error.message);
    }
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const errMessage = err.response?.data?.message as string;
    toastError(errMessage);
  }
}

export async function getAuthTokenFromInternalServer() {
  try {
    const token = await axios.get("/api/auth/token");
    return token.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const errMessage = err.response?.data?.message as string;
    toastError(errMessage);
  }
}

export async function deleteAuthTokenFromInternalServer() {
  try {
    await axios.delete("/api/auth/token");
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const errMessage = err.response?.data?.message as string;
    toastError(errMessage);
  }
}
