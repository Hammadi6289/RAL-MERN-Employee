import express from "express";
import {
  loginController,
  signupController,
} from "../controllers/userController.js";
//import { getItemController } from "../controllers/itemController.js";

const router = express.Router();

//get route
router.post("/login", loginController);

//POST route
router.post("/signup", signupController);

export default router;
