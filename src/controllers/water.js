
import { Water } from "../db/models/water.js"

export const addWaterController = async (req, res) => {

  const { date, volume } = req.body;
  const userId = req.user.id

  try {
    const addWater = await Water.create({
      userId: userId,
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

  const { id } = req.params;
  const { date, volume } = req.body;
  const userId = req.user.id;

  try {
    const updateWater = await Water.findByIdAndUpdate({
      _id: id,
      userId: userId,
    }, {
      date: date ? new Date(date) : undefined,
      volume
    },
      {
        new: true,
      }
    )

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
  const userId = req.user.id;
console.log(userId)
  try {
    const deleteWater = await Water.findOneAndDelete({
      _id: id,
      userId: userId,
    })
    console.log(deleteWater)
    if (!deleteWater) {
      return res.status(404).json({ message: `Entry with ${_id} not found` });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const dailyWaterController = async (req, res) => {
  try {
    const dailyNorma = req.query.dailyNorma;
    const userId = req.user.id;
    const date = req.query.date ? new Date(req.query.date) : new Date();

    const startDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    const endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);

    const dailyWater = await Water.find({
      userId: userId,
      date: {
        $gte: startDate,
        $lt: endDate,
      },
    });
console.log(dailyWater)
    let dayVolume = 0;
    const arrDailyWater = []
    dailyWater.map((el) => {
      dayVolume += el.volume;
      console.log(typeof el.date)
      const hours = el.date.getUTCHours();
      const minutes = el.date.getUTCMinutes();
      arrDailyWater.push(
        {
          time: `${hours}:${minutes}`,
          volume: el.volume
        }
      )
    })

    const percentage = Math.round(dayVolume / dailyNorma * 100);

    res.status(200).json({
      percentage,
      arrDailyWater,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const monthlyWaterController = async (req, res) => {
//   try {
//     // const userId = req.user.id;
//     const dailyNorm = req.query.dailyNorma;

//     const month = req.query.month
//       ? parseInt(req.query.month, 10)
//       : new Date().getMonth() + 1;
//     const year = req.query.year
//       ? parseInt(req.query.year, 10)
//       : new Date().getFullYear();

//     if (isNaN(month) || isNaN(year)) {
//       return res.status(400).json({ message: "Invalid month or year format" });
//     }

//     const startDate = new Date(Date.UTC(year, month - 1, 1));
//     const endDate = new Date(Date.UTC(year, month, 1));

//     const monthlyWater = await Water.find({
//       // user: userId,
//       date: {
//         $gte: startDate,
//         $lt: endDate,
//       },
//     });

//     res.status(200).json(monthlyWater);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


