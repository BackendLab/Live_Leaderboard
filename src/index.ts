import { app } from "./app";
import { connectDB } from "./db/connect";

const PORT = Bun.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed!", error);
  });
