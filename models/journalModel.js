const db = require('../config/db');

function findForPet(ownerId, petId, callback) {
  const sql = `SELECT journal.*, pets.name, pets.species, pets.breed, pets.age, pets.image
    FROM journal JOIN pets ON journal.pet_id = pets.id
    WHERE pets.owner_id = ? AND pets.id = ?`;
  db.query(sql, [ownerId, petId], callback);
}

function search(ownerId, searchQuery, petId, callback) {
  let sql = `SELECT journal.*, pets.name, pets.species, pets.breed, pets.age, pets.image
    FROM journal JOIN pets ON journal.pet_id = pets.id
    WHERE pets.owner_id = ? AND (journal.activity LIKE ? OR journal.notes LIKE ?)`;
  const params = [ownerId, searchQuery, searchQuery];
  if (petId) { sql += ' AND pets.id = ?'; params.push(petId); }
  db.query(sql, params, callback);
}

function create(petId, activity, notes, entryDate, callback) {
  db.query('INSERT INTO journal (pet_id, activity, notes, entry_date) VALUES (?, ?, ?, ?)', [petId, activity, notes, entryDate], callback);
}

function findOwnedJournal(id, ownerId, callback) {
  db.query(`SELECT journal.* FROM journal JOIN pets ON journal.pet_id = pets.id
    WHERE journal.id = ? AND pets.owner_id = ?`, [id, ownerId], callback);
}

function updateOwned(id, ownerId, petId, entryDate, activity, notes, callback) {
  const sql = `UPDATE journal
    JOIN pets AS journal_pet ON journal.pet_id = journal_pet.id
    JOIN pets AS selected_pet ON selected_pet.id = ?
    SET journal.entry_date = ?, journal.activity = ?, journal.notes = ?, journal.pet_id = ?
    WHERE journal.id = ? AND journal_pet.owner_id = ? AND selected_pet.owner_id = ?`;
  db.query(sql, [petId, entryDate, activity, notes, petId, id, ownerId, ownerId], callback);
}

function removeOwned(id, ownerId, callback) {
  db.query(`DELETE journal FROM journal JOIN pets ON journal.pet_id = pets.id
    WHERE journal.id = ? AND pets.owner_id = ?`, [id, ownerId], callback);
}

function findForOwner(ownerId, callback) {
  db.query(`SELECT journal.*, pets.id AS pet_id FROM journal
    JOIN pets ON journal.pet_id = pets.id WHERE pets.owner_id = ?`, [ownerId], callback);
}

module.exports = { findForPet, search, create, findOwnedJournal, updateOwned, removeOwned, findForOwner };
