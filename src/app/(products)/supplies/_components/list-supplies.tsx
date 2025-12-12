import SkeletonCard from "@/components/skeleton-card";
import SupplyCard from "@/components/supply-card";
import useSupplies from "@/hooks/products/useSupplies";
import { Dispatch, SetStateAction } from "react";

type props = {
  category?: string;
  sort?: string;
  paging?: number;
  price: (0 | 100000000)[];
  color?: string[];
  setTotalPages: Dispatch<SetStateAction<number>>;
  setResultNum: Dispatch<SetStateAction<number>>;
};

export default function ListSupplies({
  category,
  sort,
  paging,
  price,
  color,
  setTotalPages,
  setResultNum,
}: props) {
  const { supplies, totalPages, totalRecords, isLoading, isError } =
    useSupplies({
      category,
      sort,
      paging,
      price,
      color,
    });

  if (isError) return <></>;

  if (isLoading) {
    return (
      <div className="flex flex-wrap">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            className="flex large-screen:w-[25%] up-x-small-screen:w-[25%] up-x-smallest-screen:!w-[calc(100%/3)] up-xx-smallest-screen:!w-[50%] xx-smallest-screen:w-full down-xx-smallest-screen:!w-[50%]"
            key={index}
          >
            <SkeletonCard />
          </div>
        ))}
      </div>
    );
  }

  if (supplies && totalPages && totalRecords) {
    setResultNum(totalRecords);
    setTotalPages(totalPages);
  }

  return (
    <div className="flex flex-wrap">
      {supplies &&
        supplies.map((supply) => (
          <div
            className="flex large-screen:w-[25%] up-x-small-screen:w-[25%] up-x-smallest-screen:!w-[calc(100%/3)] up-xx-smallest-screen:!w-[50%] xx-smallest-screen:w-full down-xx-smallest-screen:!w-[50%]"
            key={supply.id}
          >
            <SupplyCard data={supply} />
          </div>
        ))}
    </div>
  );
}
