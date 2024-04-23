import express, { Router } from "express";
import * as controller from "./controllers";

const router: Router = express.Router();

router.get("/customers/:id/:role", controller.getCustomers);
router.get("/customerStatistics", controller.customerStatistics);
router.put("/delete-customer/:id", controller.flagCustomer);
router.post("/upload", controller.uploadImage);

export default router;
