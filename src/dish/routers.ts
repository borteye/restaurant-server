import express, { Router } from "express";
import * as controller from "./controllers";

const router: Router = express.Router();

router.get("/all-dishes", controller.getDishes);
router.post("/dishes/:name/:id", controller.getCountryDish);

export default router;
