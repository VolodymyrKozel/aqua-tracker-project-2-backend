import { Schema, model } from 'mongoose';

const waterSchema = new Schema({

  date: {
    type: Date,
    // required: true,
    default: Date.now,
  },
  volume: {
    type: Number,
    required: true,
    default: 0,
  },
  // dailyNorm: {
  //   type: Number,
  //   required: true,
  //   default: 0,
  // },
  userId: {
    type: String,
    // type: Schema.Types.ObjectId,
    ref: 'user',
    // required: true
  },
});

export const Water = model('waters', waterSchema);
