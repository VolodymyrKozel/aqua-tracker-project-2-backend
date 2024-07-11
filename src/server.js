
import express from "express";
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import process from 'node:process';
import "dotenv/config";
import rootRouter from "./routers/index.js";
import mongoose from "mongoose";


const { PORT, DB_HOST } = process.env

export const setupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use(rootRouter);

  app.use(errorHandler);
  app.use('*', notFoundHandler);

  return app;

}

// mongoose.connect(DB_HOST).then(() => {
//   setupServer()
//     .listen(PORT, console.log(`Server started on ${PORT} port!`))
// })
//   .catch(() => {
//     console.log('DB connection failed!');
//     process.exit(1);
//   })