import { Order } from "@/types";
import { AspectRatio } from "./ui/aspect-ratio";

type Props = {
  order: Order;
};

const OrderRestaurantImages = ({ order }: Props) => {
  return (
      <AspectRatio ratio={16 / 6} className="w-full h-full">
        <img
          src={order.restaurant.imageUrl}
          alt="image"
          loading="lazy"
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
  );
};

export default OrderRestaurantImages;
