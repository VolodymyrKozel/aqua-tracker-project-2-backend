import Joi from 'joi';
export const updDataUserSchema = (req, res, next) => {
  const schema = Joi.object({
    name: {
      type: String,
    },
    gender: {
      type: String,
      enum: ['woman', 'man'],
    },
    weight: {
      type: Number,
    },
    activeTimeSports: {
      type: Number,
    },
    waterDrink: {
      type: Number,
      default: 1.8,
      avatarURL: {
        type: String,
      },
    },
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
