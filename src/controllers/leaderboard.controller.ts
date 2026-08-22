import type { Request, Response } from "express";
import {
  getLeaderboardService,
  registerUserService,
  updateScoreService,
} from "../services/leaderboard.service";

export const getLeaderBoard = async (req: Request, res: Response) => {
  try {
    // get the user ID from query
    const { userId } = req.query;
    // call the service
    const leaderboard = await getLeaderboardService(userId?.toString());
    // give back the response to the user
    return res
      .status(200)
      .json({ message: "Fetched Leaderboard!", leaderboard });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch the leaderboard!" });
  }
};

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

export const updateScore = async (req: Request, res: Response) => {
  try {
    // get the score from body and user id from params
    const { points } = req.body;
    const { userId } = req.params;
    // check both exists or not
    if (!userId || points === undefined) {
      return res
        .status(400)
        .json({ message: "UserId and points are required" });
    }
    // call the service
    const updatedUser = await updateScoreService(userId.toString(), points);
    // give back the response
    return res
      .status(200)
      .json({ message: "Score updated successfully!", updatedUser });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update the score" });
  }
};
