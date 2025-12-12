import Button from "@/components/common/button";
import { useShallow } from "zustand/react/shallow";
import PenIcon from "@/components/common/icons/pen-icon";
import { Tabs } from "@/constants/profile-tabs";
import LocateIcon from "@/components/common/icons/locate-icon";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { TabsType } from "./page-content";
import ToolTip from "@/components/common/tooltip";
import useOrder from "../_shared/use-order";
import useOrderList from "@/hooks/users/useOrderList";
import OrderList from "./order-list";
import { OrderType } from "@/types/order-item";
import useUser from "@/hooks/users/useUser";
import Loading from "@/app/loading";

type props = {
  setTabActive: Dispatch<SetStateAction<TabsType>>;
};

export default function Dashboard({ setTabActive }: props) {
  const router = useRouter();

  const { setOrder, clearOrder } = useOrder(
    useShallow((state) => ({
      setOrder: state.setOrder,
      clearOrder: state.clearOrder,
    })),
  );
  const { user } = useUser();
  const { orderList, isLoading, isError } = useOrderList();
  const orderNum = orderList ? orderList.length : 0;

  const RedirectOrderDetail = (order: OrderType) => {
    setTabActive(Tabs.ORDERS);
    setOrder(order);
  };

  if (isError) return <></>;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="mb-[25px] mt-[10px] flex flex-col xx-smallest-screen:text-center">
        <h2 className="text-[22px] font-medium leading-[28px] text-primary">
          Đơn hàng gần đây
        </h2>

        {orderNum > 0 ? (
          <>
            {orderList && (
              <OrderList
                RedirectOrderDetail={RedirectOrderDetail}
                orderList={orderList.slice(0, 3)}
              />
            )}

            <div className="mt-[20px] flex justify-center">
              <Button
                variant="primary"
                size="xsm"
                className="text-center text-[13px] font-bold uppercase leading-[16px] tracking-[0.05em]"
                onClick={() => {
                  setTabActive(Tabs.ORDERS);
                  clearOrder();
                }}
              >
                Xem tất cả
              </Button>
            </div>
          </>
        ) : (
          <div className="mt-[20px] flex flex-col items-center gap-[20px]">
            <h3 className="mb-[10px]">Không có đơn hàng nào được tạo.</h3>
            <div>
              <Button
                variant="primary"
                size="xsm"
                className="text-center text-[13px] font-bold uppercase leading-[16px] tracking-[0.05em]"
                onClick={() => {
                  router.push("/");
                }}
              >
                Tìm sản phẩm
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="mb-[25px] flex flex-col xxx-smallest-screen:text-center">
        <h2 className="text-[22px] font-medium leading-[28px] text-primary">
          Địa chỉ vận chuyển của bạn
        </h2>

        <div className="mt-[20px] flex items-center gap-[10px] x-smallest-screen:flex-col">
          <LocateIcon
            size={20}
            className="fill-current text-primary x-smallest-screen:hidden"
          />

          <span className="text-[16px] leading-[1.5] tracking-[0.02em] text-text_color">
            {user && user.ward && user.province && user.district ? (
              <>
                {user.street && <>{user.street + ", "}</>}
                {user.ward && <>{user.ward + ", "}</>}
                {user.district && <>{user.district + ", "}</>}
                {user.province && <>{user.province }</>}
              </>
            ) : (
              <>Chưa có thông tin địa chỉ</>
            )}
          </span>

          <ToolTip
            value="Chỉnh sửa"
            element={
              <Button
                size="none"
                variant="icon"
                className="x-smallest-screen:hidden"
                startIcon={
                  <PenIcon size={20} className="ml-[5px] fill-current" />
                }
                onClick={() => {
                  setTabActive(Tabs.ADDRESS);
                }}
              />
            }
          />

          <Button
            variant="primary"
            size="xsm"
            className="hidden text-center text-[13px] font-bold uppercase leading-[16px] tracking-[0.05em] x-smallest-screen:inline-block"
          >
            Chỉnh sửa
          </Button>
        </div>
      </div>

      <div className="flex flex-col xxx-smallest-screen:text-center">
        <h2 className="text-[22px] font-medium leading-[28px] text-primary">
          Thông tin tài khoản
        </h2>

        <div className="mt-[20px] flex items-center justify-center gap-[10px]">
          <table className="min-w-[50%] xxx-smallest-screen:block">
            <tbody className="flex w-full flex-col items-center xxx-smallest-screen:block">
              <tr className="flex w-full border-b border-solid border-light_gray_color_second text-left xxx-smallest-screen:block">
                <th className="min-w-[50%] py-[14px] font-medium text-primary">
                  Tên :
                </th>
                <td className="min-w-[50%] py-[14px]">
                  {user && user.name ? user.name : "Chưa có"}
                </td>
              </tr>

              <tr className="flex w-full border-b border-solid border-light_gray_color_second text-left xxx-smallest-screen:block">
                <th className="min-w-[50%] py-[14px] font-medium text-primary">
                  Số điện thoại :
                </th>
                <td className="min-w-[50%] py-[14px]">
                  {user && user.telephoneNumber
                    ? user.telephoneNumber
                    : "Chưa có"}
                </td>
              </tr>

              <tr className="flex w-full border-b border-solid border-light_gray_color_second text-left xxx-smallest-screen:block">
                <th className="min-w-[50%] py-[14px] font-medium text-primary">
                  Email :
                </th>
                <td className="min-w-[50%] py-[14px]">{user && user.email}</td>
              </tr>

              <tr className="flex w-full border-b border-solid border-light_gray_color_second text-left xxx-smallest-screen:block">
                <th className="min-w-[50%] py-[14px] font-medium text-primary">
                  Quốc tịch :
                </th>
                <td className="min-w-[50%] py-[14px]">
                  {user && user.nationality ? user.nationality : "Chưa có"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-[20px] flex justify-center">
          <Button
            variant="primary"
            size="xsm"
            className="text-center text-[13px] font-bold uppercase leading-[16px] tracking-[0.05em]"
            onClick={() => {
              setTabActive(Tabs.ACCOUNT_DETAILS);
            }}
          >
            Chỉnh sửa
          </Button>
        </div>
      </div>
    </>
  );
}
