const petModel = require('../models/petModel');

function showNewPet(req, res) { res.render('newPet', { session: req.session }); }

function createPet(req, res) {
  const { pet_name, species, breed, age } = req.body;
  const image = req.file ? req.file.filename : null;
  petModel.create(req.session.user.id, pet_name, species, breed, age, image, (err) => {
    if (err) return res.send('Failed to add pet.');
    return res.redirect('/journals');
  });
}

module.exports = { showNewPet, createPet };
