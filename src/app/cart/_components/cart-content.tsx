"use client";

import CartIcon from "@/components/common/icons/cart-icon";
import { useRouter } from "next/navigation";
import CheckoutForm from "./checkout-form";
import Button from "@/components/common/button";
import ListItem from "./list-item";
import useCartItems from "@/hooks/users/useCartItems";
import CartItemSkeleton from "./cart-item-skeleton";
import { useEffect, useState } from "react";

import useMutation from "@/hooks/use-mutation";
import { toastError, toastSuccess } from "@/utils/toast";
import { deleteCartItem, updateCart } from "@/services/api/cart-api";
import { CartItemType } from "@/types/cart-item";
import { createContext } from "react";
import useCartTrigger from "@/store/use-cart-trigger";
import { useShallow } from "zustand/react/shallow";

type MutateDeleteType = {
  mutateDelete: (param?: string) => Promise<void>;
  isMutatingDelete: boolean;
};

const defaultMutateDelete: MutateDeleteType = Object.assign({
  mutateDelete: async () => {},
  isMutatingDelete: false,
});

export const DeleteCartItemContext =
  createContext<MutateDeleteType>(defaultMutateDelete);

export default function CartContent() {
  const router = useRouter();

  const { cartItems, isError, isLoading, refresh } = useCartItems();

  const { triggerNumber } = useCartTrigger(
    useShallow((state) => ({
      triggerNumber: state.triggerNumber,
    })),
  );

  const [listItems, setListItems] = useState<CartItemType[]>([]);

  const { mutate, isMutating } = useMutation({
    fetcher: updateCart,
    options: {
      onSuccess: async () => {
        toastSuccess("Cập nhật giỏ hàng thành công");
        refresh();
      },
      onError: (error) => {
        toastError(error.message);
      },
      onFinally: () => {},
    },
  });

  const { mutate: mutateDelete, isMutating: isMutatingDelete } = useMutation({
    fetcher: deleteCartItem,
    options: {
      onSuccess: async () => {
        toastSuccess("Xóa sản phẩm thành công");
        refresh();
      },
      onError: (error) => {
        toastError(error.message);
      },
      onFinally: () => {},
    },
  });

  const mutateDeleteCartItem: MutateDeleteType = Object.assign({
    mutateDelete,
    isMutatingDelete,
  });

  useEffect(() => {
    if (cartItems) {
      setListItems(cartItems);
    }
  }, [cartItems]);

  useEffect(() => {
    refresh();
  }, [triggerNumber]);

  if (isError) return <></>;

  if (isLoading) {
    return (
      <div className="xx-x-small-screen:w-full mx-auto mb-[40px] mt-[30px] w-[1160px] min-w-[320px] rounded-[4px] border border-solid border-light_gray_color_second bg-white small-screen:mb-[30px] small-screen:mt-[15px] small-screen:w-[calc(100%-60px)] x-small-screen:mb-[20px] x-small-screen:mt-[10px]">
        <div className="flex h-full flex-col items-center px-[60px] py-[125px] small-screen:py-[85px]">
          <table className="w-full medium-screen:block">
            <thead className="medium-screen:block medium-screen:w-full">
              <tr className="text-[13px] uppercase leading-[18px] tracking-[0.02em] medium-screen:flex">
                <th
                  className="text-left font-normal medium-screen:flex-1"
                  colSpan={2}
                >
                  sản phẩm
                </th>
                <th className="pr-[25px] text-center font-normal medium-screen:hidden">
                  số lượng
                </th>
                <th className="text-right font-normal">tổng </th>
              </tr>
            </thead>

            <tbody className="medium-screen:block medium-screen:w-full">
              <CartItemSkeleton />
              <CartItemSkeleton />
              <CartItemSkeleton />
              <CartItemSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (cartItems?.length === 0) {
    return (
      <div className="xx-x-small-screen:w-full mx-auto mb-[40px] mt-[30px] w-[1160px] min-w-[320px] rounded-[4px] border border-solid border-light_gray_color_second bg-white small-screen:mb-[30px] small-screen:mt-[15px] small-screen:w-[calc(100%-60px)] x-small-screen:mb-[20px] x-small-screen:mt-[10px]">
        <div className="flex h-full flex-col items-center px-[60px] py-[125px] small-screen:py-[85px]">
          <div>
            <CartIcon size={90} className="fill-current text-primary" />
          </div>
          <h2 className="xxx-x-small-screen:text-[22px] mt-[35px] max-w-[800px] text-center font-quicksand text-[27px] font-bold leading-[1.27] tracking-[-0.01em] text-primary">
            Giỏ hàng của bạn đang trống
          </h2>
          <div className="mt-[45px]">
            <Button
              onClick={() => {
                router.push("/");
              }}
            >
              Trở về cửa hàng
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="xx-x-small-screen:w-full mx-auto mb-[40px] mt-[30px] w-[1160px] min-w-[320px] rounded-[4px] border border-solid border-light_gray_color_second bg-white small-screen:mb-[30px] small-screen:mt-[15px] small-screen:w-[calc(100%-60px)] x-small-screen:mb-[20px] x-small-screen:mt-[10px]">
      <div className="flex h-full text-text_color small-screen:items-center small-screen:px-[20px] small-screen:pb-[20px] x-small-screen:flex-col">
        <div className="flex-1 px-[40px] py-[20px] medium-screen:px-[30px]">
          <form action="" className="py-[15px]">
            <table className="w-full medium-screen:block">
              <thead className="medium-screen:block medium-screen:w-full">
                <tr className="text-[13px] uppercase leading-[18px] tracking-[0.02em] medium-screen:flex">
                  <th
                    className="text-left font-normal medium-screen:flex-1"
                    colSpan={2}
                  >
                    sản phẩm
                  </th>
                  <th className="pr-[25px] text-center font-normal medium-screen:hidden">
                    số lượng
                  </th>
                  <th className="text-right font-normal">tổng </th>
                </tr>
              </thead>

              {cartItems ? (
                <DeleteCartItemContext.Provider value={mutateDeleteCartItem}>
                  <ListItem
                    cartItems={cartItems}
                    refresh={refresh}
                    mutate={mutate}
                    isMutating={isMutating}
                  />
                </DeleteCartItemContext.Provider>
              ) : (
                <ListItem
                  cartItems={listItems}
                  refresh={refresh}
                  mutate={mutate}
                  isMutating={isMutating}
                />
              )}
            </table>
          </form>
        </div>

        {cartItems ? (
          <CheckoutForm cartItems={cartItems} isMutating={isMutating} />
        ) : (
          <CheckoutForm cartItems={listItems} isMutating={isMutating} />
        )}
      </div>
    </div>
  );
}
