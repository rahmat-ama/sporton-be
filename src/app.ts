import Express from "express";
import Cors from "cors";

const App = Express();
App.use(Cors());
App.use(Express.json());
App.get("/", (req, res) => {
  res.send("sporton backend API is running");
});

export default App;
