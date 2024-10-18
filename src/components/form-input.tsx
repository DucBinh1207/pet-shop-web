import { ComponentProps } from "react";
import Input from "./common/input";

type FormInputProps = {
  inputProps: ComponentProps<"input">;
  error?: string;
};

export default function FormInput({ inputProps, error }: FormInputProps) {
  return (
    <>
      <Input {...inputProps} />
      {error && (
        <span className="ml-[5px] mt-[5px] text-[13px] leading-[18px] text-red-500">
          {error}
        </span>
      )}
    </>
  );
}
