import { Request, Response } from "express";
import Restaurant from "../models/restaurant_model";

const getRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params.restaurantId;
    const restaurants = await Restaurant.findById(restaurantId);

    if (!restaurants) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    res.status(200).json(restaurants);
  } catch (error) {
    console.log("Error in getRestaurant: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const searchRestaurants = async (req: Request, res: Response) => {
  try {
    const city = req.params.city;

    const searchQuery = (req.query.searchQuery as string) || "";
    const selectedCuisines = (req.query.selectedCuisines as string) || "";
    const sortOption = (req.query.sortOption as string) || "lastUpdated";
    const page = parseInt(req.query.page as string) || 1;

    let query: any = {};
    const regex = new RegExp(city, "i");

    query["$or"] = [{ city: regex }, { country: regex }];

    if (selectedCuisines) {
      const cuisinesArray = selectedCuisines
        .split(",")
        .map((cuisine) => new RegExp(cuisine, "i"));

      query["cuisines"] = { $all: cuisinesArray };
    }

    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery, "i");
      query["$or"] = [
        { restaurantName: searchRegex },
        { cuisines: { $in: [searchRegex] } }, // Search in cuisines
      ];
    }

    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    // sortOption = "lastUpdated"
    const restaurants = await Restaurant.find(query)
      .sort({ [sortOption]: 1 })
      .skip(skip)
      .limit(pageSize)
      .lean();

    const total = await Restaurant.countDocuments(query);

    const response = {
      data: restaurants,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.json(response);
  } catch (error) {
    console.log("error in search restaurants", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default { searchRestaurants, getRestaurant };
