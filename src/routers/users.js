import cookieParser from 'cookie-parser';
import { Router } from 'express';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { loginUserSchema } from '../validation/userAuth.js';
import { registerUserSchema } from '../validation/userAuth.js';
import { updateUserSchema } from '../validation/userDataUpdate.js';
import { requestResetPasswordEmailSchema } from '../validation/userAuth.js';
import { resetPasswordSchema } from '../validation/userAuth.js';
import { loginWithGoogleOAuthSchema } from '../validation/userAuth.js';
import {
  loginUserController,
  logoutUserController,
  registerUserController,
  usersQuantityController,
  currentUserController,
  requestResetPasswordEmailController,
  resetPasswordController,
  getGoogleOAuthUrlController,
  loginWithGoogleController,
  refreshSessionController,
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

usersRouter.post('/refresh', ctrlWrapper(refreshSessionController));

usersRouter.post(
  '/send-reset-password-email',
  validateBody(requestResetPasswordEmailSchema),
  ctrlWrapper(requestResetPasswordEmailController),
);

usersRouter.post(
  '/reset-password',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

usersRouter.post(
  '/get-google-url-code',
  ctrlWrapper(getGoogleOAuthUrlController),
);

usersRouter.post(
  '/login-with-google',
  validateBody(loginWithGoogleOAuthSchema),
  ctrlWrapper(loginWithGoogleController),
);

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

export default usersRouter;
