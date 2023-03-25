const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(500).json({ message: 'Login değilsiniz! Login olunuz.' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(500).json({ message: 'Token geçersiz...' });
    req.user = user;
    next();
  });
};

const verifyUser = async (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id == req.params.id || req.user.isAdmin) {
      next();
    } else{
      res.status(500).json({ message: 'Login değilsiniz! Login olunuz.' });
    }
  });
};

const verifyAdmin = async (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else{
      res.status(500).json({ message: 'Yekili değilsiniz! Login olunuz.' });
    }
  });
};

module.exports = { auth, verifyUser,verifyAdmin };
