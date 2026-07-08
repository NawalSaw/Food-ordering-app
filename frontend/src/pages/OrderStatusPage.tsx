import { useGetMyOrders } from "@/api/OrderApi";
import NotFound from "@/components/NotFound";
import OrderStatusDetails from "@/components/OrderStatusDetails";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const OrderStatusPage = () => {
  const { orders, isLoading } = useGetMyOrders();
  const [isExpanded, setIsExpanded] = useState(false);

  if (isLoading) {
    return <Loader2 className="h-9 w-9 animate-spin" />;
  }

  if (!orders || orders.length === 0) {
    return (
      <NotFound
        statusCode={404}
        message="No orders found"
        description="Sorry, you have no orders. You can start placing one."
      />
    );
  }

  return (
    <div className="space-y-10">
      {orders.map((order, index) => (
        <div key={index} className="space-y-10 bg-gray-50 p-10 rounded-lg">
          <OrderStatusHeader order={order} />
          <div className="grid gap-10 md:grid-cols-2">
            <OrderStatusDetails
              isExpanded={isExpanded}
              onExpandClick={() => setIsExpanded(!isExpanded)}
              order={order}
            />

            <AspectRatio ratio={16 / 5} className="w-full h-full">
              <img
                src={order.restaurant.imageUrl}
                alt="image"
                loading="lazy"
                className="rounded-md object-cover h-full w-full"
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStatusPage;
