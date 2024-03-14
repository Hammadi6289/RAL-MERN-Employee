import express from "express";
import {
  addItemController,
  editItemController,
  getItemController,
  deleteItemController,
} from "./../controllers/itemController.js";
//import { getItemController } from "../controllers/itemController.js";

const router = express.Router();

//get route
router.get("/get-item", getItemController);

//POST route
router.post("/add-item", addItemController);

//PUT route
router.put("/edit-item", editItemController);

//Delete route
router.post("/delete-item", deleteItemController);

export default router;
