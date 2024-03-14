import express from "express";
import mongoose from "mongoose";
import connectDb from "./config/config.js";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import itemRoutes from "./routes/itemRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import billsRoutes from "./routes/billsRoutes.js";
import fs from "fs";
import csv from "csv-parser";

dotenv.config();
connectDb();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan("dev"));

app.use("/api/items", itemRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bills", billsRoutes);

const PORT = process.env.PORT || 9090;
const serverVar = app.listen(PORT, () => {
  console.log(`Server listning on Port ${PORT}`);
});

//Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled Promise Rejections");
  serverVar.close(() => {
    process.exit(1);
  });
});
