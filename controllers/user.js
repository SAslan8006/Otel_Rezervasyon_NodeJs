const User = require('../models/User.js');

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({message:'Silme işleminiz gerçekleştirilmiştir.'});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const detailUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.Id);
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const allUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { updateUser, deleteUser, detailUser, allUser };
