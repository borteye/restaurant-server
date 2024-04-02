import express, { Router } from "express";
import * as controller from "./controllers";

const router: Router = express.Router();

router.get("/all-countries", controller.getCountries);

export default router;
