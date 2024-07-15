import cookieParser from 'cookie-parser';
import { Router } from 'express';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { loginUserSchema } from '../validation/userAuth.js';
import { registerUserSchema } from '../validation/userAuth.js';
import { updateUserSchema } from '../validation/userDataUpdate.js';
import {
  loginUserController,
  logoutUserController,
  registerUserController,
  usersQuantityController,
  currentUserController,
} from '../controllers/usersAuth.js';
import {
  updateAvatar,
  updateUserController,
} from '../controllers/usersDataUpdate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/upload.js';

const usersRouter = Router();

usersRouter.use(cookieParser());

usersRouter.post(
  '/register',

  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

usersRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

usersRouter.post('/logout', ctrlWrapper(logoutUserController));

usersRouter.get('/count', ctrlWrapper(usersQuantityController));

usersRouter.get('/current', authenticate, ctrlWrapper(currentUserController));

usersRouter.patch(
  '/update',
  authenticate,
  validateBody(updateUserSchema),
  ctrlWrapper(updateUserController),
);

usersRouter.patch(
  '/avatar',
  authenticate,
  upload.single('avatar'),

  ctrlWrapper(updateAvatar),
);

usersRouter.post('/logout', ctrlWrapper(logoutUserController));

export default usersRouter;
