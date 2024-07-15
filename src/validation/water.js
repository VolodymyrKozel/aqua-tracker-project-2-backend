import Joi from 'joi';

export const addWaterSchema = Joi.object({
  volume: Joi.number().required(),
},
);

export const updateWaterSchema = Joi.object({
  volume: Joi.number().required(),
},
);