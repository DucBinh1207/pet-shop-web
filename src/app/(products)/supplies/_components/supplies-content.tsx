"use client";

import { PriceRange } from "@/constants/price-range";
import { useEffect, useState } from "react";
import ReactSlider from "react-slider";
import CancelIcon from "@/components/common/icons/cancel-icon";
import { SortTypes } from "@/constants/sort-type";
import AngleIcon from "@/components/common/icons/angle-icon";
import cn from "@/utils/style/cn";
import { SuppliesCategoryTypes } from "@/constants/supplies-category-type";
import SuppliesCategory from "./supplies-category";
import ColorCheckbox from "@/components/color-checkbox";
import { ColorType, ColorTypes } from "@/constants/color-type";
import Pagination from "../../_components/pagination";
import Sort from "../../_components/sort";
import ListSupplies from "./list-supplies";
import useSuppliesOption from "@/store/use-supplies-option";
import { useShallow } from "zustand/react/shallow";
import BreadCrumb from "@/components/bread-crumb";

export default function SuppliesContent() {
  const { suppliesOption } = useSuppliesOption(
    useShallow((state) => ({
      suppliesOption: state.suppliesOption,
    })),
  );

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [category, setCategory] = useState<SuppliesCategoryTypes>(
    suppliesOption.category,
  );
  const [price, setPrice] = useState(suppliesOption.price);
  const [priceParams, setPriceParams] = useState([
    PriceRange.MIN,
    PriceRange.MAX,
  ]);

  const [resultNum, setResultNum] = useState(0);
  const [color, setColor] = useState<ColorTypes[]>(suppliesOption.color);

  const [sort, setSort] = useState<SortTypes>(suppliesOption.sort);
  const [paging, setPaging] = useState<number>(suppliesOption.paging);
  const [totalPages, setTotalPages] = useState<number>(1);

  function handleCategoryFilter(categoryCurrent: SuppliesCategoryTypes) {
    setCategory(categoryCurrent);
    if (paging !== 1) setPaging(1);
  }

  function handleColorFilter(colorCurrent: ColorTypes) {
    if (paging !== 1) setPaging(1);
    if (color.includes(colorCurrent)) {
      setColor(color.filter((c) => c !== colorCurrent));
    } else setColor([colorCurrent]);
  }

  function handleSortFilter(sortCurrent: SortTypes) {
    setSort(sortCurrent);
    if (paging !== 1) setPaging(1);
  }
  function handlePagingFilter(pagingCurrent: number) {
    setPaging(pagingCurrent);
  }

  function handlePrice() {
    setPriceParams(price);
    if (paging !== 1) setPaging(1);
  }

  useEffect(() => {
    const params = new URLSearchParams();

    params.append("category", category);

    color.forEach((colorValue) => {
      params.append("color", colorValue);
    });

    params.append("sort", sort);

    params.append("page", paging.toString());
  }, [category, color, sort, paging]);

  return (
    <>
      <BreadCrumb
        pathLink={["/supplies", ""]}
        pathName={["Vật dụng", category === "all" ? "Tất cả" : category]}
      />

      <SuppliesCategory
        category={category}
        handleCategoryFilter={handleCategoryFilter}
      />

      <div className="mx-auto flex flex-nowrap rounded-[4px] border border-solid border-light_gray_color_second bg-white large-screen:mb-[40px] large-screen:mt-[15px] large-screen:w-[1160px] small-screen:mb-[30px] small-screen:mt-[30px] smallest-screen:mb-[20px] smallest-screen:mt-[10px]">
        <div className="border-r border-solid border-light_gray_color_second large-screen:min-w-[232px] small-screen:relative small-screen:overflow-hidden">
          <div
            className={cn(
              "sticky top-[90px] flex flex-col pb-[30px] transition-all duration-150 ease-linear large-screen:left-0 small-screen:fixed small-screen:right-0 small-screen:top-0 small-screen:z-[200] small-screen:h-full small-screen:w-[360px] small-screen:max-w-full small-screen:bg-white small-screen:pb-[30px] small-screen:leading-[1.23]",
              {
                "small-screen:translate-x-0 small-screen:opacity-100":
                  isFilterOpen,
                "small-screen:w-0 small-screen:translate-x-full small-screen:opacity-0":
                  !isFilterOpen,
              },
            )}
          >
            <div className="relative flex items-center justify-end large-screen:hidden">
              <div className="flex h-[46px] w-[46px] items-center justify-center">
                <button onClick={() => setIsFilterOpen(false)}>
                  <CancelIcon size={32} className="fill-current text-primary" />
                </button>
              </div>
            </div>

            <div className="flex flex-col px-[25px] pt-[25px]">
              <h3 className="mb-[20px] font-quicksand text-[20px] font-bold leading-[1.1] tracking-[-0.01em] text-primary">
                Price
              </h3>
              <form action="" className="flex flex-col">
                <span>
                  <ReactSlider
                    className="horizontal-slider"
                    ariaLabel={["Lower thumb", "Upper thumb"]}
                    renderThumb={(props, state) => (
                      <div
                        {...props}
                        key={state.index}
                        className="top-[-4px] h-[10px] w-[10px] rounded-[50%] !border-none bg-primary focus-visible:outline-none"
                      />
                    )}
                    thumbActiveClassName=""
                    renderTrack={(props, state) => {
                      if (state.index === 1) {
                        return (
                          <div
                            {...props}
                            key={state.index}
                            className="relative h-[2px] rounded-full bg-primary"
                          />
                        );
                      } else {
                        return (
                          <div
                            {...props}
                            key={state.index}
                            className="relative h-[2px] rounded-full bg-background_color"
                          />
                        );
                      }
                    }}
                    step={100000}
                    min={PriceRange.MIN}
                    max={PriceRange.MAX}
                    onChange={setPrice}
                    value={price}
                  />
                </span>

                <div className="mb-[3px] mt-[15px] text-[12px] leading-[18px] tracking-[0.025em] text-text_color">
                  <span>Price:&nbsp;</span>
                  <span>{price[0]} </span>
                  <span>&nbsp;&nbsp;-&nbsp;</span>
                  <span>{price[1]} </span>
                </div>

                <button
                  type="button"
                  className="hover_animate mt-[10px] inline-block cursor-pointer rounded-[18px] border-[2px] border-solid border-primary bg-white px-[18px] py-[5px] text-center text-[12px] font-bold uppercase tracking-wider text-primary outline-none hover:bg-primary hover:text-white"
                  onClick={handlePrice}
                >
                  Filter
                </button>
              </form>
            </div>

            <div className="px-[25px] pt-[40px]">
              <h3 className="mb-[20px] font-quicksand text-[20px] font-bold leading-[1.1] tracking-[-0.01em] text-primary">
                Color
              </h3>

              <ul className="text-[14px] leading-[1.23] tracking-[0.02em] text-text_color">
                <li className="pb-[13px]">
                  <label
                    htmlFor={"Tất cả"}
                    className="group inline-flex cursor-pointer items-center gap-[10px] hover:text-secondary"
                  >
                    <input
                      type="checkbox"
                      id={"Tất cả"}
                      onClick={() => {
                        setColor([]);
                      }}
                      className={cn(
                        "relative inline-block h-[22px] w-[22px] cursor-pointer appearance-none rounded-[50%] bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 p-4 font-bold text-white outline outline-[1px] outline-light_gray_color_second after:absolute after:bottom-[-4px] after:left-[-4px] after:right-[-4px] after:top-[-4px] after:rounded-[50%] after:border after:border-solid after:content-[''] group-hover:after:border-secondary",
                        {
                          "after:border-secondary": color.length === 0,
                          "after:border-transparent": color.length > 0,
                        },
                      )}
                    />
                    <span className="flex-1"> Tất cả </span>
                  </label>
                </li>

                <ColorCheckbox
                  color={color}
                  colorType={ColorType.LIGHT}
                  name="Màu trắng"
                  handleColorFilter={handleColorFilter}
                />

                <ColorCheckbox
                  color={color}
                  colorType={ColorType.DARK}
                  name="Màu đen"
                  handleColorFilter={handleColorFilter}
                />

                <ColorCheckbox
                  color={color}
                  colorType={ColorType.RED}
                  name="Màu đỏ"
                  handleColorFilter={handleColorFilter}
                />

                <ColorCheckbox
                  color={color}
                  colorType={ColorType.ORANGE}
                  name="Màu cam"
                  handleColorFilter={handleColorFilter}
                />

                <ColorCheckbox
                  color={color}
                  colorType={ColorType.YELLOW}
                  name="Màu vàng"
                  handleColorFilter={handleColorFilter}
                />

                <ColorCheckbox
                  color={color}
                  colorType={ColorType.BLUE}
                  name="Màu xanh lam"
                  handleColorFilter={handleColorFilter}
                />

                <ColorCheckbox
                  color={color}
                  colorType={ColorType.GREEN}
                  name="Màu xanh lá"
                  handleColorFilter={handleColorFilter}
                />

                <ColorCheckbox
                  color={color}
                  colorType={ColorType.VIOLET}
                  name="Màu tím"
                  handleColorFilter={handleColorFilter}
                />

                <ColorCheckbox
                  color={color}
                  colorType={ColorType.PINK}
                  name="Màu hồng"
                  handleColorFilter={handleColorFilter}
                />

                <ColorCheckbox
                  color={color}
                  colorType={ColorType.OTHER}
                  name="Màu khác"
                  handleColorFilter={handleColorFilter}
                />
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col large-screen:min-w-[900px] small-screen:w-full">
          <div className="flex min-h-[55px] items-center border-b border-solid border-light_gray_color_second px-[30px] py-[13px] text-[13px] font-normal leading-[16px] tracking-[0.025em] text-text_color">
            <div className="flex w-full flex-1 small-screen:gap-[5px] up-smallest-screen:items-center up-smallest-screen:justify-between smallest-screen:flex-col">
              <div className="w-full flex-1">{`Có ${resultNum} kết quả`}</div>
              <Sort sort={sort} handleSortFilter={handleSortFilter} />
            </div>
            <div className="ml-[15px] mr-[2px] large-screen:hidden large-screen:opacity-0">
              <button
                className="hover_animate inline-flex cursor-pointer items-center gap-[7px] rounded-[17px] border-[2px] border-solid border-primary bg-white px-[22px] py-[7px] text-center text-[11px] font-bold uppercase leading-[14px] tracking-[0.07em] text-primary outline-none hover:bg-primary hover:text-white"
                onClick={() => setIsFilterOpen(true)}
              >
                <AngleIcon size={8} className="rotate-[-90deg] fill-current" />
                Filter
              </button>
            </div>
          </div>

          <ListSupplies
            category={category}
            paging={paging}
            sort={sort}
            price={priceParams}
            color={color}
            setTotalPages={setTotalPages}
            setResultNum={setResultNum}
          />

          <div className="mt-[30px] flex flex-1 items-end justify-center pb-[30px]">
            <Pagination
              paging={paging}
              totalPages={totalPages}
              handlePagingFilter={handlePagingFilter}
            />
          </div>
        </div>
      </div>
    </>
  );
}
