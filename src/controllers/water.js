import { Water } from "../db/models/water.js"

export const addWaterController = async (req, res) => {

  const { date, volume } = req.body;
  // const userId = req.userId._id

  try {
    const addWater = await Water.create({
      // user: userId,
      date: date ? new Date(date) : new Date(),
      volume,
    })
    res.status(201).json({
      status: 201,
      message: 'Successfully added water!',
      data: addWater,
    })

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateWaterController = async (req, res) => {

  // user: userId,
  const { id } = req.params;
  const { body } = req
  const { volume } = body;
  try {
    const updateWater = await Water.findByIdAndUpdate({
      _id: id
    }, {
      ...body, volume
    })

    if (!updateWater) {
      return res.status(404).json({ message: "Entry not found" });
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

  try {

    const deleteWater = await Water.findByIdAndDelete(id)

    if (!deleteWater) {
      return res.status(404).json({ message: `Entry with ${id} not found` });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const dailyWaterController = async (req, res) => {
  console.log(req.query)
};
// export const waterInAMonthController = ;


