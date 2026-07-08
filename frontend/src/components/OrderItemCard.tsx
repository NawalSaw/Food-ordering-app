import { Order, OrderStatus } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ORDER_STATUS } from "@/config/Order-status-config";
import { useUpdateMyOrders } from "./../api/MyRestaurantApi";
import { useEffect, useState } from "react";

type Props = {
  order: Order;
  isExpanded?: boolean;
  onExpandClick?: () => void;
};

const OrderItemCard = ({ order, isExpanded, onExpandClick }: Props) => {
  const { isLoading, updateOrders } = useUpdateMyOrders();
  const [status, setStatus] = useState<OrderStatus>(order.status);

  useEffect(() => {
    setStatus(order.status);
  }, [order.status]);
  const handleStatusChange = async (newStatus: OrderStatus) => {
    await updateOrders({ orderId: order._id as string, status: newStatus });
    setStatus(newStatus);
  };

  const getTime = () => {
    const date = new Date(order.createdAt);

    const hours = date.getHours();
    const minutes = date.getMinutes();

    const paddedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const paddedhours = hours < 10 ? "0" + hours : hours;

    const amOrPm = hours >= 12 ? "PM" : "AM";

    return `${paddedhours}:${paddedMinutes} ${amOrPm}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
          <div className="">
            Customer Name:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.name}
            </span>
          </div>
          <div className="">
            Delivery address:
            <span className="ml-2 font-normal">
              <span>{order.deliveryDetails.addressLine1},</span>{" "}
              {order.deliveryDetails.city}
            </span>
          </div>
          <div className="">
            Time:
            <span className="ml-2 font-normal">{getTime()}</span>
          </div>
          <div className="">
            Total Amount:
            <span className="ml-2 font-normal">
              ₹{(order.totalAmount / 100).toFixed(2)}
            </span>
          </div>
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          {order.cartItems
            .slice(0, isExpanded ? order.cartItems.length : 2)
            .map((item) => (
              <div
                key={item.menuItemId}
                className="flex justify-between items-center"
              >
                <span>
                  <Badge variant="outline" className="mr-2">
                    {item.quantity}
                  </Badge>
                  {item.name[0].toUpperCase() + item.name.slice(1)}
                </span>
              </div>
            ))}
          {order.cartItems.length > 2 && (
            <Button
              onClick={onExpandClick}
              variant="link"
              className="mr-auto ml-4 hover:text-orange-400"
            >
              {isExpanded ? "Show less" : "Show more"}
            </Button>
          )}
        </div>
        <div className="flex flex-col space-y-1 5">
          <Label htmlFor="status">Status</Label>
          <Select
            value={status}
            onValueChange={(value) => handleStatusChange(value as OrderStatus)}
            disabled={isLoading}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent position="popper">
              {ORDER_STATUS.map((status) => (
                <SelectItem key={status.label} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItemCard;
