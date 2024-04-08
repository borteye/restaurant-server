import express, { Router } from "express";
import * as controller from "./controllers";

const router: Router = express.Router();

router.get("/place-order", controller.placeOrder);

export default router;
