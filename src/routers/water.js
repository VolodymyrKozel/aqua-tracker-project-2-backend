import { Router } from 'express';

import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import {
  addWaterController,
  deleteWaterController,
  updateWaterController,
  dailyWaterController,
  monthlyWaterController,
} from '../controllers/water.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { addWaterSchema, updateWaterSchema } from '../validation/water.js';

export const waterRouter = Router();

waterRouter.use('/', authenticate);

waterRouter.post('/add-water', validateBody(addWaterSchema), ctrlWrapper(addWaterController));
waterRouter.patch('/update-volume/:id', validateBody(updateWaterSchema), ctrlWrapper(updateWaterController));
waterRouter.delete('/delete/:id', ctrlWrapper(deleteWaterController));
waterRouter.get('/daily', ctrlWrapper(dailyWaterController));
waterRouter.get('/monthly', ctrlWrapper(monthlyWaterController));
