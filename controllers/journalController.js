const petModel = require('../models/petModel');
const journalModel = require('../models/journalModel');

function showJournals(req, res) {
  const ownerId = req.session.user.id;
  let selectedPetId = req.query.petId;
  petModel.findByOwner(ownerId, (err, pets) => {
    if (err) return res.send('Error loading pets');
    if (!selectedPetId && pets.length > 0) selectedPetId = pets[0].id;
    if (!selectedPetId) return res.render('journals', { journals: [], pets, selectedPetId: '', pet: null, session: req.session });
    journalModel.findForPet(ownerId, selectedPetId, (journalError, journals) => {
      if (journalError) return res.send('Error loading journals');
      return res.render('journals', { journals, pets, selectedPetId, pet: pets.find((pet) => pet.id == selectedPetId), session: req.session });
    });
  });
}

function showNewJournal(req, res) {
  petModel.findByOwner(req.session.user.id, (err, pets) => {
    if (err) return res.send('Error loading pets');
    return res.render('newJournal', { pets, session: req.session, selectedPetId: req.query.petId });
  });
}

function createJournal(req, res) {
  const { pet_id, activity, notes, entry_date } = req.body;
  const ownerId = req.session.user.id;
  petModel.findOwnedPet(pet_id, ownerId, (petError, pets) => {
    if (petError) return res.send('Error validating pet');
    if (pets.length === 0) return res.status(403).send('Access Denied!');
    journalModel.create(pet_id, activity, notes, entry_date, (err) => {
      if (err) return res.send('Error saving journal');
      return res.redirect(`/journals?petId=${pet_id}`);
    });
  });
}

function showEditJournal(req, res) {
  const ownerId = req.session.user.id;
  journalModel.findOwnedJournal(req.params.id, ownerId, (journalError, journals) => {
    if (journalError) return res.send('Error loading journal');
    if (journals.length === 0) return res.status(403).send('Access Denied!');
    petModel.findByOwner(ownerId, (petError, pets) => {
      if (petError) return res.send('Error fetching pets');
      return res.render('editJournal', { journal: journals[0], pets, session: req.session });
    });
  });
}

function updateJournal(req, res) {
  const { entry_date, activity, notes, pet_id } = req.body;
  journalModel.updateOwned(req.params.id, req.session.user.id, pet_id, entry_date, activity, notes, (err, result) => {
    if (err) return res.send('Error updating journal');
    if (result.affectedRows === 0) return res.status(403).send('Access Denied!');
    return res.redirect(`/journals?petId=${pet_id}`);
  });
}

function deleteJournal(req, res) {
  const ownerId = req.session.user.id;
  journalModel.findOwnedJournal(req.params.id, ownerId, (findError, journals) => {
    if (findError) return res.send('Error validating journal.');
    if (journals.length === 0) return res.status(403).send('Access Denied!');
    const petId = journals[0].pet_id;
    journalModel.removeOwned(req.params.id, ownerId, (err) => {
      if (err) return res.send('Error deleting journal.');
      return res.redirect(`/journals?petId=${petId}`);
    });
  });
}

function searchJournals(req, res) {
  const ownerId = req.session.user.id;
  const selectedPetId = req.query.petId;
  petModel.findByOwner(ownerId, (petError, pets) => {
    if (petError) return res.send('Error loading pets');
    journalModel.search(ownerId, `%${req.query.q}%`, selectedPetId, (searchError, journals) => {
      if (searchError) return res.send('Error searching journals');
      const pet = selectedPetId ? pets.find((item) => item.id.toString() === selectedPetId) : null;
      return res.render('journals', { journals, pets, selectedPetId, pet, session: req.session });
    });
  });
}

module.exports = { showJournals, showNewJournal, createJournal, showEditJournal, updateJournal, deleteJournal, searchJournals };
