"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Pagination, Navigation, EffectCoverflow } from "swiper/modules";
import { useRef } from "react";
import PetCard from "@/components/pet-card";
import NavigationButton from "@/components/navigation-button";
import Button from "@/components/common/button";
import SkeletonCard from "@/components/skeleton-card";
import usePets from "@/hooks/products/usePets";
import { CategoryType } from "@/constants/category-type";
import { PriceRange } from "@/constants/price-range";
import { SortType } from "@/constants/sort-type";
import { useRouter } from "next/navigation";
import usePetsOption from "@/store/use-pets-option";
import { useShallow } from "zustand/react/shallow";

export default function TopPets() {
  const swiperRef = useRef(null);
  const router = useRouter();

  const category = CategoryType.ALL;
  const sort = SortType.RATING;
  const paging = 1;
  const price = [PriceRange.MIN, PriceRange.MAX];
  const limit = 8;

  const { petsOption, setPetsOption } = usePetsOption(
    useShallow((state) => ({
      petsOption: state.petsOption,
      setPetsOption: state.setPetsOption,
    })),
  );

  const { pets, isLoading, isError } = usePets({
    category,
    sort,
    paging,
    price,
    limit,
  });

  if (isError) return <></>;

  if (isLoading) {
    return (
      <>
        <div className="border-box relative mx-auto flex max-w-[1160px] flex-col small-screen:max-w-[calc(100%-60px)] xx-smallest-screen:mx-0 xx-smallest-screen:min-w-full">
          <div className="mb-[25px] mt-[35px] text-center">
            <h2 className="font-quicksand text-[30px] font-bold leading-[34px] tracking-[-0.025em] text-tertiary">
              Thú cưng hàng đầu
            </h2>
          </div>

          <div className="peer">
            <div className="overflow-hidden rounded-[4px]">
              <Swiper
                ref={swiperRef}
                effect="coverflow"
                grabCursor
                breakpoints={{
                  1: {
                    slidesPerView: 2,
                  },
                  756: {
                    slidesPerView: 3,
                  },
                  988: {
                    slidesPerView: 4,
                  },
                  1190: {
                    slidesPerView: 5,
                  },
                }}
                pagination={{
                  el: ".swiper-pagination",
                  clickable: true,

                  renderBullet: function (index, className) {
                    return `<span class="${className} !bg-[#531492]"></span>`;
                  },
                }}
                navigation={{
                  prevEl: ".top-pets-swiper-button-prev",
                  nextEl: ".top-pets-swiper-button-next",
                }}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2.5,
                }}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="swiper-container"
              >
                {[...Array(9)].map((_, index) => (
                  <SwiperSlide
                    className="border-box flex min-w-[232px] flex-1 transform flex-col border border-solid border-light_gray_color_second bg-white small-screen:min-w-[25%] x-small-screen:min-w-[calc(100%/3)] x-smallest-screen:min-w-[50%]"
                    key={index}
                  >
                    <SkeletonCard />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          <NavigationButton
            prevClass="top-pets-swiper-button-prev"
            nextClass="top-pets-swiper-button-next"
            typeReference="peer"
          />

          <div className="swiper-pagination !relative mt-[25px]" />
        </div>
      </>
    );
  }

  return (
    <div className="border-box relative mx-auto flex max-w-[1160px] flex-col small-screen:max-w-[calc(100%-60px)] xx-smallest-screen:mx-0 xx-smallest-screen:min-w-full">
      <div className="mb-[25px] mt-[35px] text-center">
        <h2 className="font-quicksand text-[30px] font-bold leading-[34px] tracking-[-0.025em] text-tertiary">
          Thú cưng hàng đầu
        </h2>
      </div>

      <div className="peer">
        <div className="overflow-hidden rounded-[4px]">
          <Swiper
            ref={swiperRef}
            effect="coverflow"
            grabCursor
            breakpoints={{
              1: {
                slidesPerView: 2,
              },
              756: {
                slidesPerView: 3,
              },
              988: {
                slidesPerView: 4,
              },
              1190: {
                slidesPerView: 5,
              },
            }}
            pagination={{
              el: ".swiper-pagination",
              clickable: true,

              renderBullet: function (index, className) {
                return `<span class="${className} !bg-[#531492]"></span>`;
              },
            }}
            navigation={{
              prevEl: ".top-pets-swiper-button-prev",
              nextEl: ".top-pets-swiper-button-next",
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="swiper-container"
          >
            {pets &&
              pets.map((pet, index) => (
                <SwiperSlide
                  className="border-box flex min-w-[232px] flex-1 transform flex-col border border-solid border-light_gray_color_second bg-white small-screen:min-w-[25%] x-small-screen:min-w-[calc(100%/3)] x-smallest-screen:min-w-[50%]"
                  key={index}
                >
                  <PetCard data={pet} />
                </SwiperSlide>
              ))}
            <SwiperSlide
              className="border-box flex min-w-[232px] flex-1 transform items-center justify-center border border-solid border-light_gray_color_second bg-white small-screen:min-w-[25%] x-small-screen:min-w-[calc(100%/3)] x-smallest-screen:min-w-[50%]"
              key={8}
            >
              <Button
                size="xsm"
                className="text-[12px] font-bold leading-[15px] tracking-[0.045em]"
                onClick={() => {
                  setPetsOption({ ...petsOption, sort: SortType.RATING });
                  router.push("/pets");
                }}
              >
                Xem thêm
              </Button>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <NavigationButton
        prevClass="top-pets-swiper-button-prev"
        nextClass="top-pets-swiper-button-next"
        typeReference="peer"
      />

      <div className="swiper-pagination !relative mt-[25px]" />
    </div>
  );
}
