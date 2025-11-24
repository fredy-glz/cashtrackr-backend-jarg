import express from "express";
import colors from "colors";
import morgan from "morgan";

import { db } from "./config/db";
import budgetRouter from "./routes/budgetRouter";
import authRouter from "./routes/authRouter";

async function connectDB() {
  try {
    await db.authenticate();
    // Mientras se crean los modelos, esto va creando las tablas y las columnas en la db en automatico
    db.sync();
    console.log(colors.blue.bold("Conexión exitosa a la BD"));
  } catch (error) {
    // console.log(error);
    console.log(colors.red.bold("Falló la conexión a la BD"));
  }
}
connectDB();

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/budgets", budgetRouter);
app.use("/api/auth", authRouter);

export default app;
