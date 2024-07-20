import process from 'node:process';
import 'dotenv/config';
import mongoose from 'mongoose';
import { setupServer } from './server.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { TEMP_UPLOAD_DIR } from './constants/index.js';

const { PORT, DB_HOST } = process.env;

createDirIfNotExists(TEMP_UPLOAD_DIR);

async function startServer() {
  try {
    await mongoose.connect(DB_HOST);
    console.log('Mongo connection successfully established!');

    const server = setupServer();

    try {
      server.listen(PORT, () => {
        console.log(`Server started on port ${PORT}!`);
      });
    } catch (error) {
      console.error(`Failed to start server on port ${PORT}: ${error.message}`);

      server.listen(4001, () => {
        console.log(`Server started on backup port ${4001}!`);
      });
    }
  } catch (error) {
    console.error('DB connection failed:', error.message);
    process.exit(1);
  }
}

startServer();
