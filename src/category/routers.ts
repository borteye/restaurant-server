import express, { Router } from "express";
import * as controller from "./controllers";

const router: Router = express.Router();

router.get("/categories", controller.getCategories);

export default router;
