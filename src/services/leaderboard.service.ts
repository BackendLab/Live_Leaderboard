import { redis } from "../db/connect";
import { User } from "../models/user.model";

export const registerUserService = async (
  username: string,
  fullName: string,
) => {
  const user = await User.create({ username, fullName });

  await redis.zadd("leaderborad", 0, user._id.toString());

  return user;
};
