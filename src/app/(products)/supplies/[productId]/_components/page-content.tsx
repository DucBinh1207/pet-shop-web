"use client";
import BreadCrumb from "@/components/bread-crumb";
import { useParams } from "next/navigation";
import Detail from "./detail";
import { createContext } from "react";
import { SupplyType } from "@/types/supply";
import useSupplyDetail from "@/hooks/products/useSupplyDetail";
import Loading from "@/app/loading";
import { addToRecentlyViewed } from "@/utils/recently-viewed";
import RecentlyViewed from "@/components/recently-viewed/recently-viewed";

export const ProductContext = createContext<SupplyType>({
  id: "",
  name: "",
  description: "",
  image: "",
  dateCreated: "",
  rating: 0,
  category: "",
  material: "",
  brand: "",
  type: "",
  totalReview: 0,
  variationsSupplies: [
    {
      productVariantId: "",
      color: "",
      size: "",
      price: 0,
      quantity: 0,
      dateCreated: "",
    },
  ],
});

export default function PageContent() {
  const { productId } = useParams<{ productId: string }>();

  const { supply, isLoading, isError } = useSupplyDetail({ id: productId });

  if (isError) return <></>;

  if (isLoading) {
    return <Loading />;
  }

  if (supply) {
    addToRecentlyViewed({ id: productId, category: "supplies" });
  }

  if (supply)
    return (
      <ProductContext.Provider value={supply}>
        <BreadCrumb
          pathLink={["/supplies", `/supplies/${supply.id}`]}
          pathName={["Vật dụng", supply.name]}
        />

        <Detail />
        <RecentlyViewed />
      </ProductContext.Provider>
    );
}
