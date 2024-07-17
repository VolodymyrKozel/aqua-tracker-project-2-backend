import { Water } from '../db/models/water.js';

export const addWaterService = async (userId, kievDate, volume, id) => {
  return await Water.create({
    userId: userId,
    date: kievDate,
    volume,
    _id: id,
  });
};

export const updateWaterService = async (userId, date, volume, id) => {
  return await Water.findByIdAndUpdate(
    {
      _id: id,
      userId: userId,
    },
    {
      date: date ? new Date(date) : undefined,
      volume: volume,
    },
    {
      new: true,
    },
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
        _id: 1,
        totalValue: { $round: ['$totalValue', 2] },
      },
    },
    {
      $addFields: {
        totalValue: { $trunc: { $multiply: ['$totalValue', 100] } },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);
};