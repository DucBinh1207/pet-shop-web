"use client";

import FoodIcon from "@/components/common/Icons/food-icon";
import GuideIcon from "@/components/common/Icons/guide-icon";
import PetIcon from "@/components/common/Icons/pet-icon";
import ShopIcon from "@/components/common/Icons/shop-icon";
import SupplyIcon from "@/components/common/Icons/supply-icon";
import cn from "@/utils/style/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

type navItemProps = {
  name: string;
  path: string;
  iconName: "shop" | "pets" | "foods" | "supplies" | "guides";
};

const IconsMap = {
  shop: ShopIcon,
  pets: PetIcon,
  foods: FoodIcon,
  supplies: SupplyIcon,
  guides: GuideIcon,
};

export default function NavItem({ name, path, iconName }: navItemProps) {
  const pathName = usePathname();

  const Icon = IconsMap[iconName];

  return (
    <li className="relative mx-[calc((27.5*(100vw-900px))/(1920-900))] my-[15px] text-[18px]">
      <Link
        href={path}
        className={cn(
          "max-large-screen:!text-[calc(18*100vw/1920)] group relative flex items-end text-base font-semibold uppercase leading-[1.47] hover:!text-header_text_third large-screen:text-[18px]",
          {
            "after:absolute after:bottom-[-10px] after:left-0 after:h-[1px] after:w-full after:bg-header_text after:content-['']":
              pathName === path,
          },
        )}
      >
        <Icon
          className={cn(
            "mr-[10px] fill-current text-header_icon brightness-100 group-hover:brightness-[1.5]",
            {
              "brightness-[1.5]": pathName === path,
            },
          )}
          size={26.4}
        />

        {name}

        <span
          className={cn(
            "absolute bottom-[-10px] left-[50%] h-[1px] w-0 origin-center translate-x-[-50%] bg-header_text transition-all duration-300 group-hover:w-full",
          )}
        ></span>
      </Link>
    </li>
  );
}