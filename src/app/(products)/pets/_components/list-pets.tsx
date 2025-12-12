import PetCard from "@/components/pet-card";
import SkeletonCard from "@/components/skeleton-card";
import usePets from "@/hooks/products/usePets";
import { Dispatch, SetStateAction } from "react";

type props = {
  category: string;
  sort: string;
  paging: number;
  price: (0 | 100000000)[];
  setTotalPages: Dispatch<SetStateAction<number>>;
  setResultNum: Dispatch<SetStateAction<number>>;
};

export default function ListPets({
  category,
  sort,
  paging,
  price,
  setTotalPages,
  setResultNum,
}: props) {
  const { pets, totalPages, totalRecords, isLoading, isError } = usePets({
    category,
    sort,
    paging,
    price,
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

  if (pets && totalPages && totalRecords) {
    setResultNum(totalRecords);
    setTotalPages(totalPages);
  }

  return (
    <div className="flex flex-wrap">
      {pets &&
        pets.map((pet) => (
          <div
            className="flex large-screen:w-[25%] up-x-small-screen:w-[25%] up-x-smallest-screen:!w-[calc(100%/3)] up-xx-smallest-screen:!w-[50%] xx-smallest-screen:w-full down-xx-smallest-screen:!w-[50%]"
            key={pet.id}
          >
            <PetCard data={pet} />
          </div>
        ))}
    </div>
  );
}
