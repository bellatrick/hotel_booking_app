import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser'

import UserRoutes from './routes/users'
import AuthRoutes from './routes/auth'
import path from 'path'

const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true
}));

mongoose.connect(process.env.MONGODB_URI as string)

app.use(express.static(path.join(__dirname,'../../frontend/dist')))

app.use("/api/auth", AuthRoutes)
app.use('/api/users',UserRoutes)

app.listen(7000, () => {
  console.log("Server is running on localhost:7000");
});
