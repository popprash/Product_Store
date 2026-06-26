import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
import productRoutes from './routes/product.route.js'
import mongoose from "mongoose";



dotenv.config();
await connectDB();
const app = express();


const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  console.log("ROOT HIT");
  res.send("Server is working");
});

app.use('/api/products',productRoutes )
app.listen(PORT, () => {
  console.log("App is running on port 5000 ");
});
