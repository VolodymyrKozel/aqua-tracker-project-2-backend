import cookieParser from 'cookie-parser';
import { Router } from 'express';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { loginUserSchema } from '../validation/userAuth.js';
import { registerUserSchema } from '../validation/userAuth.js';
// import { updateUserSchema } from '../validation/userAuth.js';
import {
  loginUserController,
  logoutUserController,
  registerUserController,
  usersQuantityController,
  // currentUserController,
  // updateUserController,
} from '../controllers/usersAuth.js';
import { validateBody } from '../middlewares/validateBody.js';

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

// usersRouter.get('/current', ctrlWrapper(currentUserController));

// usersRouter.patch(
//   '/update',
//   validateBody(updateUserSchema),
//   ctrlWrapper(updateUserController),
// );

usersRouter.post('/logout', ctrlWrapper(logoutUserController));

export default usersRouter;
