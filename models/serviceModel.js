const db = require('../config/db');
module.exports = {
  findActive: (callback) => db.query('SELECT id, name, price FROM services WHERE is_active = 1 ORDER BY name', callback),
  findActiveById: (id, callback) => db.query('SELECT id, name, price FROM services WHERE id = ? AND is_active = 1', [id], callback)
};
