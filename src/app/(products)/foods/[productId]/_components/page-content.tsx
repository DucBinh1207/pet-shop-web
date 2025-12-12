"use client";
import BreadCrumb from "@/components/bread-crumb";
import { useParams } from "next/navigation";
import Detail from "./detail";
import { createContext } from "react";
import { FoodType } from "@/types/food";
import useFoodDetail from "@/hooks/products/useFoodDetail";
import Loading from "@/app/loading";
import { addToRecentlyViewed } from "@/utils/recently-viewed";
import RecentlyViewed from "@/components/recently-viewed/recently-viewed";

export const ProductContext = createContext<FoodType>({
  id: "",
  name: "",
  description: "",
  image: "",
  dateCreated: "",
  rating: 0,
  category: "",
  petType: "",
  nutritionInfo: "",
  expireDate: "",
  brand: "",
  totalReview: 0,
  variationsFoods: [
    {
      productVariantId: "",
      ingredient: "",
      weight: "",
      price: 0,
      quantity: 0,
      dateCreated: "",
    },
  ],
});

export default function PageContent() {
  const { productId } = useParams<{ productId: string }>();

  const { food, isLoading, isError } = useFoodDetail({ id: productId });

  if (isError) return <></>;

  if (isLoading) {
    return <Loading />;
  }

  if (food) {
    addToRecentlyViewed({ id: productId, category: "foods" });
  }

  if (food)
    return (
      <ProductContext.Provider value={food}>
        <BreadCrumb
          pathLink={["/foods", `/foods/${food.id}`]}
          pathName={["Thức ăn", food.name]}
        />

        <Detail />
        <RecentlyViewed />
      </ProductContext.Provider>
    );
}
