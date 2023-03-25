const Hotel = require("../models/Hotel.js");
const Room = require("../models/Room.js");

const createRoom = async (req, res) => {
  const hotelId = req.params.hotelId;
  try {
    const room = await Room.create(req.body);
    await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: room._id } });
    res.status(201).json(room);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.Id, { $set:req.body },{new:true});
    res.status(200).json(room);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteRoom = async (req, res) => {
  const hotelId = req.params.hotelId;
  try {
    await Room.findByIdAndDelete(req.params.Id );
    await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms:req.params.Id } });

    res.status(200).json({message:"Silme işleminiz gerçekleştirilmiştir."});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getDetailRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.Id);
    res.status(200).json(room);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllRoom = async (req, res) => {
  try {
    const room = await Room.find();
    res.status(200).json(room);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createRoom, updateRoom, deleteRoom ,getDetailRoom, getAllRoom };
