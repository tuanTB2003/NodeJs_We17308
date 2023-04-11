import express from "express";
import router from "./routes/index.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors'
dotenv.config();

const app = express();
app.use(cors())

app.use(express.json());

mongoose.connect(`${process.env.API_DB}`);

app.use("/api", router);

export const viteNodeApp = app;
