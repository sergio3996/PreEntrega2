import mongoose from "mongoose";
import config from "../config/config.js";

export const URI = process.env.MONGODB_URI;

export const init = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Database connected");
  } catch (error) {
    console.error("Ocurrio un error al intertar conectarse a la base de datos");
  }
};
