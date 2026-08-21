import express, { type Request, type Response } from "express";
import leaderboardRoutes from "./routes/leaderboard.routes";

export const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running. HURRAY! 🎉");
});

// Routes
app.use("/api/v1/user", leaderboardRoutes);
