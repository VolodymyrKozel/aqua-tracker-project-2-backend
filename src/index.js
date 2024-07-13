import process from 'node:process';
import 'dotenv/config';
import mongoose from 'mongoose';
import { setupServer } from './server.js';

const { PORT, DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log('Mongo connection successfully established!');
    setupServer().listen(PORT, console.log(`Server started on ${PORT} port!`));
  })
  .catch(() => {
    console.log('DB connection failed!');
    process.exit(1);
  });
