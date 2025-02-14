import dotenv from "dotenv";
import express from "express";
import { authorize } from "./Middleware/authorize.js";
import { errHandler } from "./Middleware/errorHandler.js";
import jsonRoutes from "./Routes/jsonRoute.js";
import arrRoutes from "./Routes/arrRoutes.js";
import dbRoutes from "./Routes/dbRoutes.js";

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.message);
  console.error(err.stack);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise);
  console.error("Reason:", reason);
});

// dotenv.config({path : '../.env'});
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
console.log(process.env.PORT);
const myLogger = function (req, res, next) {
  console.log("LOGGED");
  next();
};

app.use(myLogger);
app.use(express.json());
app.use("/jsnFile", authorize, jsonRoutes);
app.use("/arrFile", authorize, arrRoutes);
app.use("/dbFile", authorize, dbRoutes);

app.get("/", (req, res) => {
  res.send(`<h1>Hello World!</h1>`);
});
// app.get('/', (req, res) => {
//     throw new Error('BROKEN') // Express will catch this on its own.
//   })

app.use(errHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
