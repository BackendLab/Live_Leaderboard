import { Router } from "express";
import {
  registerUser,
  updateScore,
} from "../controllers/leaderboard.controller";

const router = Router();

router.post("/register", registerUser);

router.patch("/score/:userId", updateScore);

export default router;
