import PetCard from "@/components/pet-card";
import SkeletonCard from "@/components/skeleton-card";
import usePetDetail from "@/hooks/products/usePetDetail";

export default function RenderPetCard({ productId }: { productId: string }) {
  const { pet, isLoading, isError } = usePetDetail({ id: productId });

  if (isError) return <></>;

  if (isLoading) {
    return <SkeletonCard />;
  }

  if (pet) {
    return <PetCard data={pet} />;
  }

  return <></>;
}
