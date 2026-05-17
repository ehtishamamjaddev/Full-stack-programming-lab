/**
 * Admin middleware - ensures the authenticated user has role 'admin'
 */
function admin(req, res, next) {
  try {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden: admin only' });
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = admin;
