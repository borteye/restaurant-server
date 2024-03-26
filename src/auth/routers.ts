import express, { Router } from "express";
import * as controller from "./controllers";

const router: Router = express.Router();

// router.get("/login", controller.allUsers);
router.post("/login", controller.userLogin);
router.post("/signup", controller.registerUser);

export default router;
