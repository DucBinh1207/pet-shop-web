import Button from "@/components/common/button";
import CancelIcon from "@/components/common/icons/cancel-icon";
import MinusIcon from "@/components/common/icons/minus-icon";
import PlusIcon from "@/components/common/icons/plus-icon";
import Input from "@/components/common/input";
import Image from "next/image";
import Link from "next/link";

export default function ProductItem() {
  return (
    <tr className="medium-screen:relative medium-screen:flex medium-screen:w-full medium-screen:flex-wrap medium-screen:pl-[90px] medium-screen:item-center medium-screen:pb-[20px] medium-screen:mb-[15px] medium-screen:border-b medium-screen:border-solid medium-screen:border-light_gray_color_second group">
      <td className="medium-screen:absolute medium-screen:left-0 medium-screen:top-0 medium-screen:h-full medium-screen:p-0 medium-screen:border-b-0 medium-screen:w-[70px] relative w-[90px] border-b border-solid border-light_gray_color_second py-[20px] pr-[20px]">
        <div className="up-medium-screen:before:left-[-40px] medium-screen:before:content-none before:absolute before:bottom-0 before:left-[-40px] before:top-0 before:block before:w-[40px] before:content-['']">
          <Button
            type="button"
            size="none"
            variant="none"
            className="hover_animate medium-screen:bottom-[20px] medium-screen:left-[50%] up-medium-screen:top-[50%] medium-screen:translate-x-[-50%] absolute left-[-25px] z-10 inline-flex translate-y-[-50%] opacity-0 hover:scale-150 group-hover:visible group-hover:opacity-100"
            startIcon={
              <CancelIcon
                size={15}
                className="fill-current text-primary opacity-100"
              />
            }
          ></Button>
        </div>
        <Link
          href="/foods"
          className="medium-screen:h-[60px] medium-screen:w-[70px] relative block h-[75px] w-[90px]"
        >
          <Image src="/assets/images/food1.jpg" fill alt="dog food"></Image>
        </Link>
      </td>

      <td className="medium-screen:block medium-screen:basis-auto medium-screen:mb-[20px] medium-screen:w-full medium-screen:flex-1 up-medium-screen:w-[75%] medium-screen:p-0 medium-screen:border-b-0 border-b border-solid border-light_gray_color_second py-[20px] pr-[20px]">
        <div className="flex flex-col text-[13px] font-normal leading-[16px] tracking-[0.005em] text-text_color">
          <Link
            href="/foods"
            className="hover_animate font-quicksand text-[16px] font-bold leading-[20px] tracking-[0.005em] text-primary hover:text-secondary"
          >
            True Acre Foods Grain
          </Link>

          <span className="mt-[10px]">Tags : dog food</span>

          <ul className="mt-[10px] flex gap-[10px] small-screen:flex-col">
            <li className="">
              <span className="capitalize">Weight :&nbsp;</span>
              <span className="capitalize text-primary">8lbs</span>
            </li>

            <li className="">
              <span className="capitalize">Color :&nbsp;</span>
              <span className="capitalize text-primary">blue</span>
            </li>

            <li className="">
              <span className="capitalize">Size :&nbsp;</span>
              <span className="capitalize text-primary"> big </span>
            </li>
          </ul>

          <span className="mt-[10px] text-[14px] leading-[18px] tracking-[0.02em]">
            $85.00
          </span>
        </div>
      </td>

      <td className="medium-screen:block medium-screen:p-0 medium-screen:border-b-0 border-b border-solid border-light_gray_color_second py-[20px] pr-[20px]">
        <div className="relative inline-flex h-[36px] flex-nowrap overflow-hidden rounded-[18px] border border-solid border-light_gray_color_second">
          <button
            type="button"
            className="flex w-[32px] items-center justify-end"
          >
            <MinusIcon
              size={12}
              className="fill-current text-primary hover:text-secondary"
            />
          </button>
          <Input
            inputSize="quantity"
            variant="quantity"
            type="number"
            value={1}
          />
          <button
            type="button"
            className="flex w-[32px] items-center justify-start"
          >
            <PlusIcon
              size={12}
              className="fill-current text-primary hover:text-secondary"
            />
          </button>
        </div>
      </td>

      <td className="medium-screen:block medium-screen:flex-1 medium-screen:basis-auto medium-screen:p-0 medium-screen:border-b-0 border-b border-solid border-light_gray_color_second py-[20px] text-right">
        <span className="text-[17px] font-bold leading-[21px] tracking-[-0.01em] text-primary">
          $85.00
        </span>
      </td>
    </tr>
  );
}