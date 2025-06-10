import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const signupFuntion = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ Message: "User with the email already exists." });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: name,
      email: email,
      password: hashPassword,
    });
    await newUser.save();
    return res.status(201).json({ message: "User Registered Successfully!" });
  } catch (error) {
    console.log("Error in registering: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const loginFunction = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate({
      path: "likedBlog",
      select: "title author Date content",
      populate: {
        path: "author",
        select: "name email", // Add fields from User schema you want to populate
      },
    });
    if (!user) {
      return res.status(404).json({ message: "Email is not registered!" });
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (isMatched) {
        const payload ={
            id : user._id,
            name: user.name,
            email: user.email,
        }
        const token = jwt.sign(payload, process.env.Secret_Key, {expiresIn: "1h"});
        return res.status(200).json({ message: "Login Successful", token});
    } else {
      return res.status(401).json({ message: "Incorrect Password" });
    }
  } catch (error) {
    console.log("Error in Login: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
