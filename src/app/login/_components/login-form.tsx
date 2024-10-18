"use client";

import Button from "@/components/common/button";
import Input from "@/components/common/input";
import cn from "@/utils/style/cn";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoginApi } from "@/services/auth-api";
import FormInput from "@/components/form-input";
import { toastError } from "@/utils/toast";
import useMutation from "@/hooks/use-mutation";
import {
  getAuthTokenFromInternalServer,
  saveAuthTokenForInternalServer,
} from "@/services/api/login";

const schema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(3, "Password must be at least 3 characters")
    .max(20, "Password can have a maximum of 20 characters"),
});

export type LoginFormType = z.infer<typeof schema>;

export default function LoginForm() {
  const [isRememberMe, setIsRememberMe] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    defaultValues: {
      email: "devfe1@gmail.com",
      password: "123456",
    },
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });

  const { mutate, isMutating } = useMutation({
    fetcher: LoginApi,
    options: {
      onSuccess: async (data) => {
        const token = data.token;
        await saveAuthTokenForInternalServer(token);
        router.push("/");
      },
      onError: (error) => {
        toastError(error.message);
      },
      onFinally: () => {},
    },
  });

  const onSubmit = handleSubmit((data: LoginFormType) => {
    mutate({ data });
  });

  return (
    <div className="mx-auto flex rounded-[4px] border border-solid border-light_gray_color_second bg-white large-screen:mb-[40px] large-screen:mt-[15px] large-screen:w-[1160px] small-screen:mb-[30px] small-screen:mt-[30px] smallest-screen:mb-[20px] smallest-screen:mt-[10px]">
      <div className="flex w-full justify-center">
        <div className="w-[380px] max-w-full px-[20px] pb-[50px] pt-[40px]">
          <div className="flex flex-col">
            <h2 className="mb-[35px] text-center font-quicksand text-[27px] font-bold leading-[1.27] tracking-[-0.01em] text-primary">
              Login
            </h2>

            <form onSubmit={onSubmit}>
              <ul className="flex flex-col gap-[20px]">
                <li className="flex flex-col">
                  <label
                    className="pb-[10px] text-[13px] font-normal leading-[18px] tracking-[0.02em] text-primary"
                    htmlFor="email"
                  >
                    Email address *
                  </label>
                  <FormInput
                    inputProps={{
                      id: "email",
                      placeholder: "example@gmail.com",
                      ...register("email"),
                    }}
                    error={errors.email?.message}
                  />
                </li>

                <li className="flex flex-col">
                  <label
                    className="pb-[10px] text-[13px] font-normal leading-[18px] tracking-[0.02em] text-primary"
                    htmlFor="password"
                  >
                    Password *
                  </label>
                  <FormInput
                    inputProps={{
                      id: "password",
                      type: "password",
                      ...register("password"),
                    }}
                    error={errors.password?.message}
                  />
                </li>

                <li className="flex items-center justify-between">
                  <label htmlFor="remember_me" className="cursor-pointer">
                    <Input
                      type="checkbox"
                      id="remember_me"
                      inputSize="form_controls"
                      className={cn(
                        "relative mr-[7px] cursor-pointer appearance-none rounded-[3px] align-middle after:absolute after:bottom-[1px] after:left-[1px] after:right-[1px] after:top-0",
                        {
                          "after:bg-checked": isRememberMe,
                        },
                      )}
                      name="weight"
                      onClick={() => {
                        setIsRememberMe(!isRememberMe);
                      }}
                    />
                    <span className="text-[13px] font-normal leading-[18px] tracking-[0.02em] text-primary hover:text-secondary">
                      &nbsp;Remember Me
                    </span>
                  </label>

                  <Link
                    href="/lost-password"
                    className="text-[14px] font-normal leading-[1.5] tracking-[0.02em] text-primary hover:text-secondary"
                  >
                    Lost your password ?
                  </Link>
                </li>

                <li className="flex flex-col">
                  <Button
                    type="submit"
                    size="xsm"
                    variant="secondary"
                    className={cn(
                      "text-center text-[13px] font-bold leading-[16px]",
                      { "opacity-30": isMutating },
                    )}
                    disabled={isMutating}
                  >
                    Log In
                  </Button>
                </li>

                <li className="flex flex-col">
                  <div className="flex justify-center gap-[20px] text-[14px] font-normal leading-[1.5] tracking-[0.02em] text-text_color">
                    Not A Member ?
                    <Link
                      href="/register"
                      className="text-[14px] font-normal leading-[1.5] tracking-[0.02em] text-primary hover:text-secondary"
                    >
                      Register
                    </Link>
                  </div>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
