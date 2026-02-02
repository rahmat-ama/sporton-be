import Express from "express";
import Cors from "cors";
import authRoutes from "./routes/auth.routes";
import { authenticate } from "./middleware/auth.middleware";
import path from "path";
import categoryRoutes from "./routes/category.routes";
import productRoutes from "./routes/product.routes";
import bankRoutes from "./routes/bank.routes";

const App = Express();
App.use(Cors());

App.use(Express.json({ limit: "10mb" }));
App.use(Express.urlencoded({ limit: "10mb", extended: true }));

App.use("/uploads", Express.static(path.join(__dirname, "../uploads")));

App.use("/api/auth", authRoutes);

App.use("/api/categories", categoryRoutes);
App.use("/api/products", productRoutes);
App.use("/api/banks", bankRoutes);

App.get("/", (req, res) => {
  res.send("sporton backend API is running");
});

App.get("/test-middleware", authenticate, (req, res) => {
  res.send("Endpoint ini membutuhkan autentikasi");
});

export default App;
