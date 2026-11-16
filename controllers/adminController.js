const userModel = require('../models/userModel');
const petModel = require('../models/petModel');
const journalModel = require('../models/journalModel');

function dashboard(req, res) { res.render('adminDashboard', { session: req.session }); }

function users(req, res) {
  userModel.findAll((err, results) => {
    if (err) return res.send('Error loading users');
    return res.render('adminUsers', { users: results, session: req.session });
  });
}

function userDetails(req, res) {
  const userId = req.params.id;
  userModel.findById(userId, (userError, users) => {
    if (userError || users.length === 0) return res.send('User not found');
    petModel.findAllByOwner(userId, (petError, pets) => {
      if (petError) return res.send('Error retrieving pet info');
      journalModel.findForOwner(userId, (journalError, journals) => {
        if (journalError) return res.send('Error retrieving journal entries');
        return res.render('adminUserDetails', { user: users[0], pets, journals, session: req.session });
      });
    });
  });
}

function deleteUser(req, res) {
  userModel.remove(req.params.id, (err) => {
    if (err) return res.send('Error deleting user');
    return res.redirect('/admin/users');
  });
}

module.exports = { dashboard, users, userDetails, deleteUser };
