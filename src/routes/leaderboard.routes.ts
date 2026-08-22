import { Router } from "express";
import {
  getLeaderBoard,
  registerUser,
  updateScore,
} from "../controllers/leaderboard.controller";

const router = Router();

router.get("/leaderboard", getLeaderBoard);

router.post("/register", registerUser);

router.patch("/score/:userId", updateScore);

export default router;
