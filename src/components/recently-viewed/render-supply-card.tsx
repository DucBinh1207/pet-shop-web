import SkeletonCard from "@/components/skeleton-card";
import SupplyCard from "@/components/supply-card";
import useSupplyDetail from "@/hooks/products/useSupplyDetail";

export default function RenderSupplyCard({ productId }: { productId: string }) {
  const { supply, isLoading, isError } = useSupplyDetail({ id: productId });

  if (isError) return <></>;

  if (isLoading) {
    return <SkeletonCard />;
  }

  if (supply) {
    return <SupplyCard data={supply} />;
  }

  return <></>;
}
