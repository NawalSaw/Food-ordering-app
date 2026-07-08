import { Request, Response } from "express";
import User from "../models/user_Model";

const createCurrentUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });

    if (existingUser) {
      return res.status(200).send();
    }

    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log("Error in createCurrentUser: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine1, city, country } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.name = name;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;

    await user.save();

    res.status(200).send(user);
  } catch (error) {
    console.log("Error in updateCurrentUser: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const CurrentUser = await User.findOne({ _id: req.userId });
    if (!CurrentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(CurrentUser);
  } catch (error) {
    console.log("Error in getCurrentUser: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
export default {
  createCurrentUser,
    updateCurrentUser,
    getCurrentUser
};
