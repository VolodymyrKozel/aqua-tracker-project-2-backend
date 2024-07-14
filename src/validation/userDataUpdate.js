import Joi from 'joi';

export const updateUserSchema = Joi.object({
  email: Joi.string().email().optional(),
  name: Joi.string().trim().allow(null, '').optional(),
  gender: Joi.string().valid('woman', 'man').optional(),
  weight: Joi.number().default(0).optional(),
  activeTimeSports: Joi.number().default(0).optional(),
  waterDrink: Joi.number().default(1.8).optional(),
  avatarURL: Joi.string().optional(),
});
