import { redis } from "../db/connect";
import { User } from "../models/user.model";

export const registerUserService = async (
  username: string,
  fullName: string,
) => {
  const user = await User.create({ username, fullName });

  await redis.zadd("leaderboard", 0, user._id.toString());

  return user;
};

export const updateScoreService = async (userId: string, points: number) => {
  // find the user and update the score
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $inc: { score: points },
    },
    { new: true },
  );
  // check if the user exists or not, if not then return an error
  if (!updatedUser) {
    throw new Error("User Not Found!");
  }
  // update the redis
  await redis.zincrby("leaderboard", points, userId);
  // return the updated user
  return updatedUser;
};
