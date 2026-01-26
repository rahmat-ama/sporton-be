import Mongoose from "mongoose";
import Dotenv from "dotenv";
import App from "./app";

Dotenv.config();

const PORT = process.env.PORT || "5001";
const MONGO_URI = process.env.MONGO_URI || "no-mongo-uri";

Mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    App.listen(PORT, () => {
      console.log("Server is running on Port" + PORT);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
