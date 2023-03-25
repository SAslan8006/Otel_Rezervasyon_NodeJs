const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { username, email, password, country, city, img, isAdmin } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res.status(500).json({ message: 'Bu email hesabı zaten bulunmaktadır..!' });
    }
    if (password.length < 6) {
      return res.status(500).json({ message: 'Parolanız 6 karakterden küçük olmamalı...!' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    if (!validateEmail(email)) {
      return res.status(500).json({ message: 'Uygun bir mail giriniz...!' });
    }
    const newUser = await User.create({ ...req.body, password: passwordHash });

    const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, { httpOnly: true }).status(201).json({
      status: 'Ok',
      newUser,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(500).json({ message: 'Böyle bir kullanıcı bulunamadı..!' });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(500).json({ message: 'Parolanız yanlıştır..!' });
    }
    const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, { httpOnly: true }).status(200).json({
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

function validateEmail(inputText) {
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (inputText.match(mailformat)) {
    return true;
  } else {
    return false;
  }
}

module.exports = { register, login };
