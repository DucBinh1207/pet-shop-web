"use client";

import Button from "@/components/common/button";
import Input from "@/components/common/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { RegisterApi } from "@/services/auth-api";

const schema = z.object({
  email: z.string().email("Invalid email format"),
});

export type RegisterFormType = z.infer<typeof schema>;

export default function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "devfe1@gmail.com",
    },
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });

  const onSubmitHandle = async (data: RegisterFormType) => {
    try {
      const response = await RegisterApi({
        data: data,
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto flex rounded-[4px] border border-solid border-light_gray_color_second bg-white large-screen:mb-[40px] large-screen:mt-[15px] large-screen:w-[1160px] small-screen:mb-[30px] small-screen:mt-[30px] smallest-screen:mb-[20px] smallest-screen:mt-[10px]">
      <div className="flex w-full justify-center">
        <div className="w-[380px] max-w-full px-[20px] pb-[50px] pt-[40px]">
          <div className="flex flex-col">
            <h2 className="mb-[35px] text-center font-quicksand text-[27px] font-bold leading-[1.27] tracking-[-0.01em] text-primary">
              Register
            </h2>

            <form onSubmit={handleSubmit(onSubmitHandle)}>
              <ul className="flex flex-col">
                <li className="flex flex-col">
                  <label
                    className="pb-[10px] text-[13px] font-normal leading-[18px] tracking-[0.02em] text-primary"
                    htmlFor="username"
                  >
                    Email address *
                  </label>
                  <Input id="username" {...register("email")} />
                  <span className="ml-[5px] mt-[5px] text-[13px] leading-[18px] text-red-500">
                    {errors.email?.message}
                  </span>
                </li>

                <li className="mb-[25px] mt-[10px] flex text-[14px] leading-[1.5] tracking-[0.02em] text-text_color">
                  A link to set a new password will be sent to your email
                  address.
                </li>

                <li className="text-[14px] leading-[1.5] tracking-[0.02em] text-text_color">
                  Your personal data will be used to support your experience
                  throughout this website, to manage access to your account, and
                  for other purposes described in our
                  <Link
                    href="/privacy"
                    className="inline text-primary hover:text-secondary"
                  >
                    privacy policy
                  </Link>
                </li>

                <li className="mt-[20px] flex flex-col">
                  <Button
                    size="xsm"
                    variant="secondary"
                    className="text-center text-[13px] font-bold leading-[16px]"
                  >
                    Register
                  </Button>
                </li>

                <li className="mt-[32px] flex flex-col">
                  <div className="flex justify-center gap-[20px] text-[14px] font-normal leading-[1.5] tracking-[0.02em] text-text_color">
                    You A Member ?
                    <Link
                      href="/login"
                      className="text-[14px] font-normal leading-[1.5] tracking-[0.02em] text-primary hover:text-secondary"
                    >
                      Login
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
