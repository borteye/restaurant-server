import express, { Router } from "express";
import * as controller from "./controllers";

const router: Router = express.Router();

router.post("/place-order", controller.placeOrder);
router.get("/orders", controller.allOrders);
router.get("/my-orders/:id", controller.customerOrders);

export default router;
