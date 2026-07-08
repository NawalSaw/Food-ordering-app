import { getDay, getMonth } from "@/date";
import { Order } from "@/types";
import { Progress } from "./ui/progress";
import { ORDER_STATUS } from "@/config/Order-status-config";

type Props = {
  order: Order;
};

const OrderStatusHeader = ({ order }: Props) => {
  const getExpectedDelivery = () => {
    const created = new Date(order.createdAt);

    created.setMinutes(
      created.getMinutes() + order.restaurant.estimatedDeliveryTime
    );

    const hours = created.getHours();
    const minutes = created.getMinutes();

    const amOrPm = hours >= 12 ? "PM" : "AM";

    const monthIndex = created.getMonth();
    const weekdayIndex = created.getDay();

    const date = created.getDate();
    const day = getDay(weekdayIndex);
    const month = getMonth(monthIndex);

    const paddedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const time = hours + " : " + paddedMinutes + " " + amOrPm;

    return `${day}, ${date} ${month} ${time}`;
  };

  const getOrderStatusChange = () => {
    return (
      ORDER_STATUS.find((orderStatus) => orderStatus.value === order.status) || ORDER_STATUS[0]
    )
  };
 
  return (
    <>
      <h1 className="text-4xl text-center font-bold tracking-tighter flex flex-col gap-5 md:justify-between">
        <span> Order Status: {getOrderStatusChange().label}</span>
        <span> Expected by: {getExpectedDelivery()}</span>
      </h1>

      <Progress className="animate-pulse mt-4" value={getOrderStatusChange().progressValue}></Progress>
    </>
  );
};

export default OrderStatusHeader;
