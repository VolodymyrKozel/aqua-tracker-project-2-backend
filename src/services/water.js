import mongoose from 'mongoose';
import moment from 'moment';

import { Water } from '../db/models/water.js';

export const addWaterService = async (userId, kievDate, volume) => {
  return await Water.create({
    userId: userId,
    date: kievDate,
    volume,
  });
};

export const updateWaterService = async (userId, id, volume, time) => {
  const mutableElement = await Water.findOne({
    _id: id,
    userId: new mongoose.Types.ObjectId(userId),
  });

  if (!mutableElement) {
    return null;
  }

  let newDate;
  if (time) {
    const mutableElementObj = moment(mutableElement.date);

    const newTime = moment.tz(time, 'HH:mm', 'UTC');

    mutableElementObj.utc();
    mutableElementObj.set({
      hour: newTime.hour(),
      minute: newTime.minute(),
      second: 0,
      millisecond: 0,
    });

    newDate = mutableElementObj.toDate();
  }

  const updateFields = {
    date: newDate ? newDate : mutableElement.date,
    volume: volume !== undefined ? volume : mutableElement.volume,
  };

  return await Water.findByIdAndUpdate(
    id,
    { $set: updateFields },
    { new: true }
  );
};

export const deleteWaterService = async (userId, id) => {
  return await Water.findOneAndDelete({
    _id: id,
    userId: userId,
  });
};

export const dailyWaterService = async (userId, startDate, endDate, dailyNorma) => {
  return await Water.aggregate([
    {
      $match: {
        userId: userId,
        date: {
          $gte: startDate,
          $lt: endDate,
        },
      },
    },
    {
      $group: {
        _id: null,
        dayVolume: { $sum: '$volume' },
        arrDailyWater: {
          $push: {
            _id: '$_id',
            time: {
              $dateToString: {
                format: '%H:%M',
                date: '$date',
                timezone: 'UTC',
              },
            },
            volume: '$volume',
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        percentage: {
          $round: [
            { $multiply: [{ $divide: ['$dayVolume', dailyNorma] }, 100] },
            0,
          ],
        },
        arrDailyWater: 1,
      },
    },
  ]);
};

export const monthlyWaterService = async (userId, startDate, endDate, dailyNorma) => {
  return await Water.aggregate([
    {
      $match: {
        userId: userId,
        date: {
          $gte: startDate,
          $lt: endDate,
        },
      },
    },
    {
      $group: {
        _id: { $dayOfMonth: '$date' },
        totalValue: { $sum: { $divide: ['$volume', dailyNorma] } },
      },
    },
    {
      $project: {
        dayOfMonth: '$_id',
        percentage: { $round: ['$totalValue', 2] },
        _id: 0,  // Удаляем поле _id
      },
    },
    {
      $addFields: {
        percentage: { $trunc: { $multiply: ['$percentage', 100] } },
      },
    },
    {
      $sort: { dayOfMonth: 1 },
    },
  ]);
};

