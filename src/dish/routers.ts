import express, { Router } from "express";
import * as controller from "./controllers";
import { uploadImage } from "../utils";

const router: Router = express.Router();

router.get("/dishes/:id?", controller.getDishes);
router.post("/add-dish", controller.addDish);

export default router;
