const { verify } = require('jsonwebtoken');
const { SECRET } = require('../database');

const authToken = async (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) return res.status(401).json({ message: 'missing auth token' });

  try {
    const { data } = verify(token, SECRET);
    req.user = data;

    next();
  } catch (_e) {
    res.status(401).json({ message: 'jwt malformed' });
  }
};

const authAdmin = async (req, res, next) => {
  const { role } = req.user;

  if (role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can register new admins' });
  }

  next();
};

module.exports = {
  authToken,
  authAdmin,
};