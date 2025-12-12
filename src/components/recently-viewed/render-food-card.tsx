import FoodCard from "@/components/food-card";
import SkeletonCard from "@/components/skeleton-card";
import useFoodDetail from "@/hooks/products/useFoodDetail";

export default function RenderFoodCard({ productId }: { productId: string }) {
  const { food, isLoading, isError } = useFoodDetail({ id: productId });

  if (isError) return <></>;

  if (isLoading) {
    return <SkeletonCard />;
  }

  if (food) {
    return <FoodCard data={food} />;
  }

  return <></>;
}
