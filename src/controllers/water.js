import mongoose from 'mongoose';
import moment from 'moment-timezone';
import { addWaterService, dailyWaterService, deleteWaterService, monthlyWaterService, updateWaterService } from '../services/water.js';

export const addWaterController = async (req, res) => {
  const { date, volume } = req.body;
  const userId = req.user.id;

  try {

    const kievDate = date ? moment.tz(date, 'Europe/Kiev').toDate() : moment.tz(new Date(), 'Europe/Kiev').toDate();
    const addWater = await addWaterService(userId, kievDate, volume);

    const responseDate = moment.tz(addWater.date, 'Europe/Kiev').format();

    res.status(201).json({
      status: 201,
      message: 'Successfully added water!',
      data: {
        ...addWater._doc,
        date: responseDate
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateWaterController = async (req, res) => {
  const { id } = req.params;
  const { date, volume } = req.body;
  const userId = req.user.id;

  try {
    const updateWater = await updateWaterService(userId, date, volume, id)

    if (!updateWater) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully updated volume of water!',
      data: updateWater,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteWaterController = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const deleteWater = await deleteWaterService(userId, id);

    if (!deleteWater) {
      return res.status(404).json({ message: `Entry with ${id} not found` });
    }

    res.status(204).send();

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const dailyWaterController = async (req, res) => {

  try {
    const dailyNorma = parseFloat(req.query.dailyNorma);

    if (isNaN(dailyNorma)) {
      return res.status(400).json({ message: 'Invalid dailyNorma format' });
    }

    const userId = new mongoose.Types.ObjectId(req.user.id);
    const date = req.query.date ? new Date(req.query.date) : new Date();
    const startDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
    );
    const endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);

    const dailyWater = await dailyWaterService(userId, startDate, endDate, dailyNorma);

    res.status(200).json(dailyWater[0] || { percentage: 0, arrDailyWater: [] });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const monthlyWaterController = async (req, res) => {

  try {
    const dailyNorma = parseFloat(req.query.dailyNorma);
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const month = req.query.month
      ? parseInt(req.query.month, 10)
      : new Date().getMonth() + 1;
    const year = req.query.year
      ? parseInt(req.query.year, 10)
      : new Date().getFullYear();

    if (isNaN(month) || isNaN(year)) {
      return res.status(400).json({ message: 'Invalid month or year format' });
    };

    const startDate = new Date(Date.UTC(year, month - 1, 1));
    const endDate = new Date(Date.UTC(year, month, 1));

    const monthlyWater = await monthlyWaterService(userId, startDate, endDate, dailyNorma);

    res.status(200).json(monthlyWater);

  } catch (error) {
    res.status(500).json({ message: error.message });
  };
};
