const db = require('../config/db');

function create(ownerId, name, species, breed, age, image, callback) {
  db.query('INSERT INTO pets (owner_id, name, species, breed, age, image) VALUES (?, ?, ?, ?, ?, ?)',
    [ownerId, name, species, breed, age, image], callback);
}

function findByOwner(ownerId, callback) {
  db.query('SELECT * FROM pets WHERE owner_id = ?', [ownerId], callback);
}

function findOwnedPet(id, ownerId, callback) {
  db.query('SELECT id FROM pets WHERE id = ? AND owner_id = ?', [id, ownerId], callback);
}

function findAllByOwner(ownerId, callback) {
  db.query('SELECT * FROM pets WHERE owner_id = ?', [ownerId], callback);
}

module.exports = { create, findByOwner, findOwnedPet, findAllByOwner };
