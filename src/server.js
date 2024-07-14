import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

import 'dotenv/config';
import router from './routers/index.js';

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(router);

  app.use(errorHandler);
  app.use('*', notFoundHandler);

  return app;
};
