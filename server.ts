import express, { Request, Response } from "express";
import cors from "cors";
import authRouters from "./src/auth/routers";
import countryRouter from "./src/country/routers";
import categoryRouter from "./src/category/routers";
import dishRouter from "./src/dish/routers";
import orderRouter from "./src/orders/routers";

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
app.use(countryRouter);
app.use(categoryRouter);
app.use(dishRouter);
app.use(orderRouter);

app.listen(port, () => console.log(`listening to port ${port}`));
