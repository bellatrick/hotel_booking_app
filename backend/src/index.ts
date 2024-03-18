import express, { Response, Request } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import UserRoutes from "./routes/users";
import AuthRoutes from "./routes/auth";
import MyHotelRoutes from "./routes/my-hotels";
import HotelRoutes from "./routes/hotels";
import BookingRoutes from "./routes/my-bookings";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

mongoose.connect(process.env.MONGODB_URI as string);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/auth", AuthRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/my-hotels", MyHotelRoutes);
app.use("/api/hotels", HotelRoutes);
app.use("/api/my-bookings", BookingRoutes);

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});
app.listen(7000, () => {
  console.log("Server is running on localhost:7000");
});
