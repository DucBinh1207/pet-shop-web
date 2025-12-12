import ReviewForm from "./review-form";
import { useState } from "react";
import Comment from "./comment";
import Pagination from "./pagination";
import useReviews from "@/hooks/products/useReviews";
import { useParams } from "next/navigation";
import Loading from "@/app/loading";

export default function Reviews() {
  const [paging, setPaging] = useState<number>(1);

  function handlePagingFilter(pagingCurrent: number) {
    setPaging(pagingCurrent);
  }

  const { productId } = useParams<{ productId: string }>();

  const { reviews, isLoading, isError, refresh } = useReviews({
    productId,
    paging,
  });

  function trigger() {
    refresh();
  }

  if (isError) return <></>;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mx-auto w-full max-w-[770px] px-[35px]">
      <div className="flex flex-col">
        <ul className="flex flex-col">
          {reviews?.comments ? (
            <>
              {reviews.comments.map((review, index) => (
                <Comment
                  key={index}
                  name={review.name}
                  email={review.email}
                  avatar={review.image}
                  rating={review.star}
                  content={review.content}
                  time={review.time}
                />
              ))}
              <div className="mt-[10px] flex justify-center pb-[30px]">
                <Pagination
                  totalPages={reviews.totalPages}
                  paging={paging}
                  handlePagingFilter={handlePagingFilter}
                />
              </div>
            </>
          ) : (
            <div className="text-center text-[20px] font-bold text-primary">
              Hãy thực hiện đánh giá đầu tiên
            </div>
          )}
        </ul>

        <div className="mt-[30px] flex flex-col">
          <h2 className="mb-[20px] text-[22px] font-bold leading-[1.27] tracking-[0.02em] text-primary">
            Thêm bình luận
          </h2>

          <ReviewForm trigger={trigger} />
        </div>
      </div>
    </div>
  );
}
