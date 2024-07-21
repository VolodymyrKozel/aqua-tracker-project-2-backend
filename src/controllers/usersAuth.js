import {
  registerUser,
  requestResetToken,
  resetPassword,
} from '../services/usersAuth.js';
import { loginUser } from '../services/usersAuth.js';
import { logoutUser } from '../services/usersAuth.js';
import { refreshSession } from '../services/usersAuth.js';
import { SIXTY_MINUTES, THIRTY_DAYS } from '../constants/index.js';
import { generateAuthUrl } from '../utils/googleOAuth2.js';
import { loginOrSignupWithGoogle } from '../services/usersAuth.js';
import { User } from '../db/models/user.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.json({
    status: 201,
    message: 'Successfully registered user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + SIXTY_MINUTES),
  });

  res.json({
    status: 200,
    message: 'User successfully logged in!',
    data: {
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      userId: session.userId,
    },
  });
};

const setupSession = (res, session) => {
  console.log(session);
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + SIXTY_MINUTES),
  });
};

export const refreshSessionController = async (req, res) => {
  const session = await refreshSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  await logoutUser({
    sessionId: req.cookies.sessionId,
    sessionToken: req.cookies.sessionToken,
  });

  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');
  res.status(204).json({
    status: 204,
    message: 'User successfully logged out!',
  });
};

export const requestResetPasswordEmailController = async (req, res) => {
  await requestResetToken(req.body.email);
  res.json({
    message: 'Reset password email was successfully sent!',
    status: 200,
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);
  res.json({
    message: 'Password was successfully reset!',
    status: 200,
  });
};

export const getGoogleOAuthUrlController = async (req, res) => {
  const url = generateAuthUrl();
  res.json({
    status: 200,
    message: 'Successfully get Google url with code!',
    data: {
      url,
    },
  });
};

export const loginWithGoogleController = async (req, res) => {
  const { code } = req.body;
  const session = await loginOrSignupWithGoogle(code);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in via Google OAuth!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export async function usersQuantityController(req, res, next) {
  try {
    const totalCount = await User.countDocuments();
    res.json({
      usersQuantity: totalCount,
    });
  } catch (error) {
    next(error);
  }
}

export async function currentUserController(req, res) {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).send('Not authorized');
    }
    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        weight: user.weight,
        activeTimeSports: user.activeTimeSports,
        waterDrink: user.waterDrink,
        avatarURL: user.avatarURL,
      },
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
