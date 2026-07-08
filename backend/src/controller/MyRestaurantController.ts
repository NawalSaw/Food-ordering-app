import { Request, Response } from "express";
import cloudinary from "cloudinary";
import mongoose from "mongoose";
import Restaurant from "./../models/restaurant_model";
import Order from "../models/Order_model";

const createRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });

    if (existingRestaurant) {
      console.log(req.userId);
      return res.status(409).json({ error: "Restaurant already exists" });
    }

    const imageUrl = await uploadImage(req.file as Express.Multer.File);

    const newRestaurant = new Restaurant(req.body);
    newRestaurant.imageUrl = imageUrl;
    newRestaurant.user = new mongoose.Types.ObjectId(req.userId);
    newRestaurant.lastUpdated = new Date();
    await newRestaurant.save();

    res.status(201).json(newRestaurant);
  } catch (error) {
    console.log("Error in createRestaurant: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getMyRestaurant = async (req: Request, res: Response) => {
  try {
    const Restaurants = await Restaurant.findOne({ user: req.userId });

    if (!Restaurants) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    res.status(200).json(Restaurants);
  } catch (error) {
    console.log("Error in getMyRestaurant: ", error);
    res.status(500).json({ error: "Internal Server Error" });
    ``;
  }
};

const updateRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    restaurant.restaurantName = req.body.restaurantName;
    restaurant.city = req.body.city;
    restaurant.country = req.body.country;
    restaurant.deliveryPrice = req.body.deliveryPrice;
    restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
    restaurant.cuisines = req.body.cuisines;
    restaurant.menuItems = req.body.menuItems;
    restaurant.lastUpdated = new Date();

    if (req.file) {
      if (restaurant.imageUrl) {
        const oldImageUrl =
          restaurant.imageUrl?.split("/").pop()?.split(".")[0] ?? "";
        await cloudinary.v2.uploader.destroy(oldImageUrl);
      }
      const imageUrl = await uploadImage(req.file as Express.Multer.File);
      restaurant.imageUrl = imageUrl;
    }

    await restaurant.save();
    res.status(200).json(restaurant);
  } catch (error) {
    console.log("Error in updateRestaurant: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const uploadImage = async (file: Express.Multer.File) => {
  const image = file;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;

  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
  return uploadResponse.url;
};

const getMyRestaurantOrders = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    const orders = await Order.find({ restaurant: restaurant._id })
      .populate("user")
      .populate("restaurant");
    res.status(200).json(orders);
  } catch (error) {
    console.log("Error in getMyRestaurantOrders: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateRestaurantOrders = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { statusValue } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const restaurant = await Restaurant.findById(order.restaurant);

    if (restaurant?.user?._id.toString() !== req.userId) {
      return res.status(401).json({ error: "Forbidden" });
    }

    order.status = statusValue;

    await order.save();

    res.status(200).json(order);

    order;
  } catch (error: any) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log("Error in updateRestaurantOrders: ", error.message);
  }
};

export default {
  getMyRestaurantOrders,
  createRestaurant,
  getMyRestaurant,
  updateRestaurant,
  updateRestaurantOrders,
};
