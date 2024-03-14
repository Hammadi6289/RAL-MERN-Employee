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

const PORT = process.env.PORT || 8080;
const importItemsFromCSV = () => {
  const Items = mongoose.model("Items");
  const csvFilePath = "RAL Color Chip Scraping project.csv";

  const items = [];
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (row) => {
      const item = {
        name: row.name,
        price: parseFloat(row.price),
        category: row.category,
        image: row.image,
      };
      items.push(item);
    })
    .on("end", () => {
      Items.insertMany(items)
        .then(() => console.log("Items imported from CSV successfully"))
        .catch((error) =>
          console.error("Error importing items from CSV:", error)
        );
    })
    .on("error", (error) => {
      console.error("Error parsing CSV:", error);
    });
};

// Endpoint to trigger import of items from CSV
app.get("/api/import-items", (req, res) => {
  const csvFilePath = "RAL Color Chip Scraping project.csv";
  importItemsFromCSV(csvFilePath);
  res.send("Import process started");
});

app.listen(PORT, () => {
  console.log(`Server listning on Port ${PORT}`);
});
