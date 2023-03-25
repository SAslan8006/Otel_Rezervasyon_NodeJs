const Hotel = require("../models/Hotel.js");
const Room = require("../models/Room.js");

const createHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.create(req.body);
    res.status(201).json(hotel);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateHotel = async (req, res, next) => {
  const { id } = req.params;
  try {
    const hotel = await Hotel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(hotel);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteHotel = async (req, res, next) => {
  const { id } = req.params;
  try {
    const hotel = await Hotel.findByIdAndDelete(id);
    res.status(200).json({ message: "Silme işlemi gerçekleştirilmiştir..." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getSingleHotel = async (req, res, next) => {
  const { id } = req.params;
  try {
    const hotel = await Hotel.findById(id);
    res.status(200).json(hotel);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllHotel = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotel = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max | 10000000 },
    }).limit(req.query.limit);
    res.status(200).json(hotel);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const typeByCount = async (req, res, next) => {
    try {
      const hotel = await Hotel.countDocuments({type:"hotel"});
      const villa = await Hotel.countDocuments({type:"villa"});

      res.status(200).json(
        {type:"hotel", count:hotel},
        {type:"villa", count:villa}
      );
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  const typeByCity = async (req, res, next) => {
    const cities = req.query.cities.split(',');;
    try {
      const hotel = await Promise.all(
        cities.map((city)=>{
            return Hotel.countDocuments({city: city})
        }));

      res.status(200).json(hotel);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

module.exports = {  createHotel,  updateHotel,  deleteHotel,  getSingleHotel,  getAllHotel, typeByCount, typeByCity };
