import Joi from 'joi';

export const addWaterSchema = Joi.object({
  date: Joi.date().required().messages({
    'date.base': 'Invalid date format',
    'date.iso': 'Date must be in ISO format (YYYY-MM-DDTHH:mm:ss.sssZ)',
    'any.required': 'Date is required'
  }),
  volume: Joi.number().required(),
},
);

export const updateWaterSchema = Joi.object({
  volume: Joi.number(),
  time: Joi.string(),
},
);
