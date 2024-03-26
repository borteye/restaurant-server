import express, { Request, Response } from "express";
import cors from "cors";
import authRouters from "./src/auth/routers";

const app = express();
const port: number = 5000;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});
app.use("/auth", authRouters);

app.listen(port, () => console.log(`listening to port ${port}`));
