import { redis } from "../db/connect";
import { User } from "../models/user.model";

type LeaderboardEntry = {
  userId: string | undefined;
  score: number;
  isCurrentUser?: boolean;
};

export const getLeaderboardService = async (userId: string | undefined) => {
  // fetch the top 10 from leaderboard
  const rawLearderboard = await redis.zrevrange(
    "leaderboard",
    0,
    9,
    "WITHSCORES",
  );
  // convert the string into json objects with pairs
  const top10: LeaderboardEntry[] = [];
  for (let i = 0; i < rawLearderboard.length; i += 2) {
    top10.push({
      userId: rawLearderboard[i],
      score: Number(rawLearderboard[i + 1]),
    });
  }
  // get the own entry
  let ownEntry: { userId: string; rank: number; score: number } | null = null;
  // check if user is in the top 10 get the rank
  if (userId) {
    const rank = await redis.zrevrank("leaderboard", userId);
    // after getting the rank check if the user is in top 10, if yes - then highlight that with adding new field
    if (rank !== null && rank <= 10) {
      if (top10[rank]) {
        top10[rank].isCurrentUser = true;
      }
    } else if (rank !== null) {
      // if not in top 10 the fetch the score and update the ownEntry variable
      const score = await redis.zscore("leaderboard", userId);
      ownEntry = { userId, rank: rank + 1, score: Number(score) };
    }
  }
  // return top 10 and own entry
  return { top10, ownEntry };
};

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
