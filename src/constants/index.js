import path from 'node:path';

export const ENV_VARS = {
  PORT: 'PORT',
  MONGODB_USER: 'MONGODB_USER',
  MONGODB_PASSWORD: 'MONGODB_PASSWORD',
  MONGODB_URL: 'MONGODB_URL',
  MONGODB_DB: 'MONGODB_DB',
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  JWT_SECRET: 'JWT_SECRET',
  FRONTEND_HOST: 'FRONTEND_HOST',
  BACKEND_HOST: 'BACKEND_HOST',
  SMTP_FROM: 'SMTP_FROM',
  CLOUDINARY_NAME: 'CLOUDINARY_NAME',
  CLOUDINARY_API_KEY: 'CLOUDINARY_API_KEY',
  CLOUDINARY_API_SECRET: 'CLOUDINARY_API_SECRET',
  IS_CLOUDINARY_ENABLED: 'IS_CLOUDINARY_ENABLED',
  GOOGLE_AUTH_CLIENT_ID: 'GOOGLE_AUTH_CLIENT_ID',
  GOOGLE_AUTH_CLIENT_SECRET: 'GOOGLE_AUTH_CLIENT_SECRET',
};

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const SIXTY_MINUTES = 60 * 60 * 1000;
export const THIRTY_DAYS = 1000 * 60 * 60 * 24 * 30;

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');

export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');
