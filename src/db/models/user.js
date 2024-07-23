import { model, Schema } from 'mongoose';

const usersSchema = new Schema(
  {
    name: { type: String, required: true, default: '' },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: {
      type: String,
      enum: ['undefined', 'woman', 'man'],
      default: 'woman',
    },
    weight: { type: Number, default: 0 },
    activeTimeSports: { type: Number, default: 0 },
    waterDrink: { type: Number, default: 1800 },
    token: { type: String, default: null },
    tempToken: { type: String, default: null },
    avatarURL: { type: String, default: null },
    googleId: { type: String, default: null },
    verify: { type: Boolean, default: false },
    verificationToken: { type: String, default: null },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('users', usersSchema);
