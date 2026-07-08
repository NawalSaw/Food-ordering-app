import { Order } from "@/types";
import { Button } from "./ui/button";

type Props = {
  order: Order;
  isExpanded: boolean;
  onExpandClick: () => void;
};

const OrderStatusDetails = ({ order, isExpanded, onExpandClick }: Props) => {

  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col gap-9">
        <div className="">
          <h1 className="font-bold text-3xl">Delivering to:</h1>
          <div className="flex mt-2 flex-col text-2xl gap-1">
            <span>{order.deliveryDetails.name},</span>
            <div className="">
              <span>{order.deliveryDetails.addressLine1}</span>,
              <span> {order.deliveryDetails.city}</span>
            </div>
          </div>
        </div>

        <div className="">
          {" "}
          <h1 className="font-bold text-3xl">Your order</h1>
          <div className="flex mt-2 flex-col text-2xl gap-1">
            <div>
              {order.cartItems
                .slice(0, isExpanded ? order.cartItems.length : 2)
                .map((item) => (
                  <div>
                    {item.name[0].toUpperCase() + item.name.slice(1)}{" "}
                    <span>×</span> {item.quantity}{" "}
                  </div>
                ))}
              {order.cartItems.length > 2 && (
                <Button
                  variant={"link"}
                  onClick={onExpandClick}
                  className="hover:text-orange-500"
                >
                  {isExpanded ? "Show less" : "Show more"}
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="">
          {" "}
          <h1 className="font-bold text-3xl">Total</h1>
          <div className="flex mt-2 flex-col text-2xl gap-1">
            ₹{(order.totalAmount / 100).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusDetails;
