import { Request, Response } from "express";
import Bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import User from "../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET || "sporton123";

export const signIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Check if user exist or not
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid Credentials. Email not found" });
      return;
    }

    // Validate password
    const isMatch = await Bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid Credentials: Wrong password" });
      return;
    }

    // Generate JWT
    const token = JWT.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1D",
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Sign in error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const initiateAdmin = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { email, password, name } = req.body;

    // Check if user data / entry is exist
    const count = await User.countDocuments({});
    if (count > 0) {
      res.status(400).json({
        message: `Can only have 1 admin user. If you want to create new admin user, please delete current admin user manually from database`,
      });
      return;
    }

    const salt = await Bcrypt.genSalt(10);
    const hashedPass = await Bcrypt.hash(password, salt);

    const newUser = new User({
      email: email,
      password: hashedPass,
      name: name,
    });

    await newUser.save();

    res.status(201).json({ message: "Admin user created successfully" });
  } catch (error) {
    console.error("Initiate new admin user error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
