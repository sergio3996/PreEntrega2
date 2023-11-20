import mongoose from "mongoose";

const URI =
  "mongodb+srv://sergio3996:0TTjb8MIEjVSGmQd@e-commerce.l1db79v.mongodb.net/?retryWrites=true&w=majority";

export const init = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Database connected");
  } catch (error) {
    console.error("Ocurrio un error al intertar conectarse a la base de datos");
  }
};
