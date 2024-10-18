import { get, post } from "./axios";
import { ResponseAuthType } from "@/types/response-auth";
import { UserType } from "@/types/user";
import { LoginFormType } from "@/app/login/_components/login-form";
import { RegisterFormType } from "@/app/register/_components/register-form";

export async function LoginApi({ data }: { data: LoginFormType }) {
  return await post<ResponseAuthType>({
    url: "/auth/login",
    data,
  });
}

export async function RegisterApi({ data }: { data: RegisterFormType }) {
  return await post<ResponseAuthType>({
    url: "/auth/register",
    data,
  });
}

export async function GetUser() {
  return await get<UserType>({
    url: "/auth/user",
  });
}
