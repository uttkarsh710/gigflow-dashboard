import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import User from "../models/User";
import generateToken from "../utils/generateToken";

export const registerUser = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      token: generateToken(user.id),
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const loginUser = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password as string
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    res.json({
      token: generateToken(user.id),
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};