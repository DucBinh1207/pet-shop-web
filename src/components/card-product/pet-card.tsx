"use client";

import Button from "@/components/common/button";
import CartIcon from "@/components/common/icons/cart-icon";
import DotIcon from "@/components/common/icons/dot-icon";
import StarIcon from "@/components/common/icons/star-icon";
import ToolTip from "@/components/common/tooltip";
import Image from "next/image";

import Link from "next/link";

export default function PetCard() {
  return (
    <>
      <div className="relative w-full overflow-hidden pb-[85%]">
        <Link href="#" className="h-full w-full">
          <Image
            src="/assets/images/food1.jpg"
            alt="food1"
            fill
            loading="eager"
            className="absolute left-0 top-0 object-cover"
          />
        </Link>
      </div>
      <div className="relative flex flex-auto flex-col justify-between px-[30px] pt-[20px]">
        <div className="flex flex-col">
          <span className="mb-[10px] font-quicksand text-[17px] font-bold capitalize leading-[1.35] tracking-[-0.01em] text-primary">
            True Acre Foods Grain
          </span>
          <span className="mb-[10px] max-w-full overflow-hidden text-ellipsis font-quicksand text-[13px] font-normal capitalize leading-[1.46] tracking-[0.02em] text-text_color">
            Bring some grain-free goodness to your pup’s bowl.
          </span>
          <span className="flex gap-[2px]">
            {[...Array(4)].map((_, index) => (
              <StarIcon
                size={12}
                className="fill-current text-dark_yellow_color"
                key={index}
              />
            ))}

            <StarIcon
              size={12}
              className="fill-current text-dark_yellow_color"
              percentage={0.5}
            />
          </span>
        </div>
        <div className="mt-[15px] flex flex-wrap items-center gap-[5px] text-[13px] font-normal leading-[16px] tracking-[0.02em] text-primary">
          <Link href="#">Fresh & Frozen Food</Link>
          <DotIcon size={3} className="fill-current text-dark_orange_color" />
          <Link href="#">Sophresh</Link>
        </div>
      </div>

      <form className="flex flex-col gap-[12.5px] px-[30px] pb-[30px] pt-[15px]">
        <div className="flex items-center justify-between">
          <span className="font-quicksand font-bold leading-[1] tracking-[-0.02em] text-secondary up-smallest-screen:text-[18px]">
            $45.00
          </span>
          <ToolTip
            element={
              <Button
                type="submit"
                size="circle_lg"
                variant="primary"
                startIcon={<CartIcon size={16} />}
              ></Button>
            }
            value="Add to Cart"
          />
        </div>
      </form>
    </>
  );
}