import express, { Router } from "express";
import * as controller from "./controllers";

const router: Router = express.Router();

router.get("/all-dishes", controller.getDishes);
router.get("/dishes/:id", controller.getCountryDish);
router.post("/add-dish", controller.addDish);

export default router;
