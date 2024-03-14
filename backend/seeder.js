import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDb from "./config/config.js";
import Items from "./models/itemModel.js";
//import itemModel from "./models/itemModel.js";
import items from "./utils/data.js";

dotenv.config();

await connectDb(); //remove await if getting mongoose error in future.

const importData = async () => {
  try {
    await Items.deleteMany(); // Clear existing items before adding new ones
    const itemsData = await Items.insertMany(items);
    console.log("All items added");
    process.exit();
  } catch (error) {
    console.error("Error adding items:", error);
    process.exit(1);
  }
};

importData();
