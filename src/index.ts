import { app } from "./app";
import { connectDB } from "./db/connect";

const PORT = Bun.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Databse conection successfull!");
    });
  })
  .catch((error) => {
    console.error("Databse connection failed!", error);
  });
