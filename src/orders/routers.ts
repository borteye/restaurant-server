import express, { Router } from "express";
import * as controller from "./controllers";

const router: Router = express.Router();

router.post("/place-order", controller.placeOrder);
router.get("/orders", controller.orders);
router.get("/orders/:role/:id", controller.customerOrders);

export default router;
