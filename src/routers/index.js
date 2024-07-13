import { Router } from 'express';
import usersRouter from './users.js';
import { waterRouter } from './water.js';

const router = Router();

router.use('/water', waterRouter);
router.use('/users', usersRouter);

export default router;
