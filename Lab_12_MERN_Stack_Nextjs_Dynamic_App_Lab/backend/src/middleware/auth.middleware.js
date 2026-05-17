const { verify } = require('../utils/jwt');
const User = require('../models/User');

/**
 * Auth middleware - verifies JWT and attaches user info to req.user
 */
async function auth(req, res, next) {
  try {
    const header = req.headers['authorization'];
    if (!header) return res.status(401).json({ message: 'No authorization header' });

    const parts = header.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ message: 'Invalid authorization format' });

    const token = parts[1];
    const payload = verify(token);
    if (!payload) return res.status(401).json({ message: 'Invalid token' });

    // Attach minimal user info
    req.user = { id: payload.id, role: payload.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized', error: err.message });
  }
}

module.exports = auth;
