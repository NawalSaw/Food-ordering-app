import { Restaurant } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dot } from "lucide-react";

type Props = {
  restaurant: Restaurant;
};

const RestaurantInfo = ({ restaurant }: Props) => {
  return (
    <Card className="border-sla">
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight">
          {restaurant.restaurantName[0].toUpperCase() +
            restaurant.restaurantName.slice(1)}
        </CardTitle>
        <CardDescription>
          {restaurant.city[0].toUpperCase() + restaurant.city.slice(1)},{" "}
          {restaurant.country[0].toUpperCase() + restaurant.country.slice(1)}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex">
        {restaurant.cuisines.map((cuisine, index) => (
          <span key={index} className="flex">
            <span>{cuisine}</span>
            {index < restaurant.cuisines.length - 1 && <Dot />}
          </span>
        ))}
      </CardContent>
    </Card>
  );
};

export default RestaurantInfo;
