import Express from "express";
import Cors from "cors";
import authRoutes from "./routes/auth.routes";
import { authenticate } from "./middleware/auth.middleware";

const App = Express();
App.use(Cors());
App.use(Express.json());

App.use("/api/auth", authRoutes);

App.get("/", (req, res) => {
  res.send("sporton backend API is running");
});

App.get("/test-middleware", authenticate, (req, res) => {
  res.send("Endpoint ini membutuhkan autentikasi");
});

export default App;
