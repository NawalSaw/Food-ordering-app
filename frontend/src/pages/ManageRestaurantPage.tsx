import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useGetMyRestaurantOrders,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";
import NotFound from "@/components/NotFound";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import { useState } from "react";

function ManageRestaurantPage() {
  const { createRestaurant, isLoading: createLoading } =
    useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: updateLoading } =
    useUpdateMyRestaurant();
  const { orders } = useGetMyRestaurantOrders();
  const [isExpanded, setIsExpanded] = useState(false);

  const isEditing = !!restaurant;

  if (!orders) {
    return (
      <NotFound
        statusCode={404}
        message="No orders found"
        description="Sorry, you have no orders. You can start placing one."
      />
    );
  }

  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
      </TabsList>
      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 pg-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold text-center">
          {orders.length} active orders
        </h2>
        {orders.map((order, index) => (
          <OrderItemCard isExpanded={isExpanded} onExpandClick={() => setIsExpanded(!isExpanded)} key={index} order={order}></OrderItemCard>
        ))}
      </TabsContent>
      <TabsContent value="manage-restaurant">
        <ManageRestaurantForm
          restaurant={restaurant}
          onSave={isEditing ? updateRestaurant : createRestaurant}
          isLoading={createLoading || updateLoading}
        />
      </TabsContent>
    </Tabs>
  );
}

export default ManageRestaurantPage;
