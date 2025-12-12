"use client";
import BreadCrumb from "@/components/bread-crumb";
import { PetType } from "@/types/pet";
import { useParams } from "next/navigation";
import Detail from "./detail";
import { createContext } from "react";
import usePetDetail from "@/hooks/products/usePetDetail";
import Loading from "@/app/loading";
import { addToRecentlyViewed } from "@/utils/recently-viewed";
import RecentlyViewed from "@/components/recently-viewed/recently-viewed";

export const ProductContext = createContext<PetType>({
  id: "",
  category: "",
  dateCreated: "",
  description: "",
  image: "",
  name: "",
  rating: null,
  totalReview: 0,
  variationsPets: [
    {
      productVariantId: "",
      breed: "",
      breedOrigin: false,
      dateOfBirth: "",
      deworming: "",
      father: "",
      gender: false, // false có thể mặc định cho trường boolean
      health: "",
      mother: "",
      price: 0,
      quantity: 0,
      trait: "",
      type: "",
      vaccine: 0,
    },
  ],
});

export default function PageContent() {
  const { productId } = useParams<{ productId: string }>();

  const { pet, isLoading, isError } = usePetDetail({ id: productId });

  if (isError) return <></>;

  if (isLoading) {
    return <Loading />;
  }

  if (pet) {
    addToRecentlyViewed({ id: productId, category: "pets" });
  }

  if (pet)
    return (
      <ProductContext.Provider value={pet}>
        <BreadCrumb
          pathLink={["/pets", `/pets/${pet.id}`]}
          pathName={["Thú cưng", pet.name]}
        />

        <Detail />
        <RecentlyViewed />
      </ProductContext.Provider>
    );
}
