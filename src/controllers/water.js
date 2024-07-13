import { Water } from '../db/models/water.js';

export const addWaterController = async (req, res) => {
  const { date, volume } = req.body;

  // const userId = req.user.id;

  try {
    const addWater = await Water.create({
      // userId: userId,
      date: date ? new Date(date) : new Date(),
      volume,
    });

    res.status(201).json({
      status: 201,
      message: 'Successfully added water!',
      data: addWater,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateWaterController = async (req, res) => {
  const { id } = req.params;

  const { date, volume } = req.body;

  // const userId = req.user.id;

  try {
    const updateWater = await Water.findByIdAndUpdate(
      {
        _id: id,
        // userId: userId,
      },
      {
        date: date ? new Date(date) : undefined,
        volume,
      },
      { new: true },
    );

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
  // const userId = req.user.id;

  try {
    const deleteWater = await Water.findByIdAndDelete({
      _id: id,
      // userId: userId,
    });

    if (!deleteWater) {
      return res.status(404).json({ message: `Entry with ${id} not found` });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// export const dailyWaterController = async (req, res) => {
//   console.log(req.query)

// export const monthlyWaterController = ;
