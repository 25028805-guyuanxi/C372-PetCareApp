const db = require('../config/db');

function create(username, password, name, callback) {
  db.query('INSERT INTO users (username, password, name, role) VALUES (?, ?, ?, ?)',
    [username, password, name, 'user'], callback);
}

function findByCredentials(username, password, callback) {
  db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], callback);
}

function findAll(callback) {
  db.query('SELECT id, name, username, role FROM users', callback);
}

function findById(id, callback) {
  db.query('SELECT id, name, username, role FROM users WHERE id = ?', [id], callback);
}

function remove(id, callback) {
  db.query('DELETE FROM users WHERE id = ?', [id], callback);
}

module.exports = { create, findByCredentials, findAll, findById, remove };
