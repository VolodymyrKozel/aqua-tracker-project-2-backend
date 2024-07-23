import Joi from 'joi';

export const addWaterSchema = Joi.object({
  time: Joi.string().required(),
  volume: Joi.number().required(),
},
);

export const updateWaterSchema = Joi.object({
  volume: Joi.number(),
  time: Joi.string(),
},
);
