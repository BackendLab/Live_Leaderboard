import type { Request, Response } from "express";
import { registerUserService } from "../services/leaderboard.service";

export const registerUser = async (req: Request, res: Response) => {
  try {
    // get the user info from body
    const { username, fullName } = req.body;
    // check if the info exists or not
    if (!username || !fullName) {
      return res.status(400).json({ message: "Both feilds are required" });
    }
    // call the service
    const user = await registerUserService(username, fullName);
    // give back the response to the client
    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create user" });
  }
};
