import dotenv from "dotenv";

dotenv.config();

export function env(name, defaultValue = 3000) {
  const value = process.env[name];

  if (value) return value;

  if (defaultValue) return defaultValue;

  throw new Error(`Missing: process.env['${name}'].`);
}
