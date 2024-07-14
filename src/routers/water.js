import { Router } from 'express';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import {
  addWaterController,
  deleteWaterController,
  updateWaterController,
  dailyWaterController,
  // monthlyWaterController,
} from '../controllers/water.js';
import { authenticate } from '../middlewares/authenticate.js';
export const waterRouter = Router();

waterRouter.use('/', authenticate);

waterRouter.put('/add-water', ctrlWrapper(addWaterController));
waterRouter.patch('/update-volume/:id', ctrlWrapper(updateWaterController));
waterRouter.delete('/delete/:id', ctrlWrapper(deleteWaterController));
waterRouter.get('/daily', ctrlWrapper(dailyWaterController));
// waterRouter.get('/monthly', ctrlWrapper(monthlyWaterController));
