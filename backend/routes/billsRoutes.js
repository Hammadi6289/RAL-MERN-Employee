import express from "express";
import {
  addBillsController,
  getBillsController,
} from "./../controllers/billsController.js";
//import { getItemController } from "../controllers/itemController.js";

const router = express.Router();

//get route
router.get("/get-bills", getBillsController);

//POST route
router.post("/add-bills", addBillsController);

export default router;
