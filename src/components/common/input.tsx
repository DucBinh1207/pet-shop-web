"use client";

import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, forwardRef, useMemo } from "react";

interface InputProps
  extends Pick<
      ComponentProps<"input">,
      | "className"
      | "onChange"
      | "onBlur"
      | "type"
      | "placeholder"
      | "id"
      | "name"
      | "value"
      | "checked"
      | "onClick"
    >,
    VariantProps<typeof inputVariants> {
  trimOnBlur?: boolean;
}

const inputVariants = cva(
  "font-medium border-solid border rounded-[3px] outline-none tracking-[0.01em]",
  {
    variants: {
      inputSize: {
        small: "px-[10px] py-[8px] text-[11px] leading-[14px]",
        medium: "px-[12px] py-[9px] text-[13px] leading-[16px]",
        large: "px-[14px] py-[10px] text-[15px] leading-[18px]",
        quantity: "w-[50px]",
        medium_full_width:
          "px-[12px] py-[9px] text-[13px] leading-[16px] w-full font-quicksand ",
        form_controls: "w-[18px]  h-[18px] ",
      },
      variant: {
        primary: "text-primary border-input_border_color bg-background_color ",
        secondary: "bg-green-500 text-white",
        third: "bg-red-500 text-white",
        quantity:
          "text-center text-[18px] font-medium leading-[1] tracking-[0.015em] text-primary bg-white border-none outline-none appearance-none",
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        class: "focus:outline-none focus:border-primary",
      },
      {
        variant: "secondary",
        class: "focus:bg-green-600 focus:border-green-600",
      },
      {
        variant: "third",
        class: "focus:bg-red-600 focus:border-red-600",
      },
    ],
    defaultVariants: {
      inputSize: "medium",
      variant: "primary",
    },
  },
);

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      inputSize,
      variant,
      type,
      trimOnBlur,
      className: classProps,
      onChange: onChangeProp,
      onBlur: onBlurProp,
      ...rest
    },
    ref,
  ) => {
    const classVariants = useMemo(() => {
      return inputVariants({ inputSize, variant });
    }, [inputSize, variant]);

    let className = classVariants;

    // If classProps exists add it to className
    if (classProps) {
      className += " " + classProps;
    }

    const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
      if (trimOnBlur) {
        const trimmedValue = event.target.value.trim();
        onChangeProp?.({
          ...event,
          target: {
            ...event.target,
            value: trimmedValue,
          },
        });
        onBlurProp?.(event);
      }
    };

    return (
      <input
        ref={ref}
        type={type}
        className={className}
        onChange={onChangeProp}
        {...rest}
        onBlur={handleBlur}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
