const userModel = require('../models/userModel');
const petModel = require('../models/petModel');
const { sha256Hash } = require('../helpers/hash');

function showSignup(req, res) { res.render('signUp', { session: req.session }); }

function signup(req, res) {
  const { username, password, name, pet_name, species, breed, age } = req.body;
  const image = req.file ? req.file.filename : null;
  userModel.create(username, sha256Hash(password), name, (err, result) => {
    if (err) { req.flash('error', 'Sign up failed. Please try again.'); return res.redirect('/signup'); }
    petModel.create(result.insertId, pet_name, species, breed, age, image, (petError) => {
      if (petError) { req.flash('error', 'Sign up failed while saving pet. Please try again.'); return res.redirect('/signup'); }
      return res.redirect('/login');
    });
  });
}

function showLogin(req, res) {
  res.render('login', { messages: req.flash('success'), errors: req.flash('error'), session: req.session });
}

function login(req, res) {
  const { username, password } = req.body;
  userModel.findByCredentials(username, sha256Hash(password), (err, users) => {
    if (err) { req.flash('error', 'Unable to log in. Please check database setup.'); return res.redirect('/login'); }
    if (users.length === 0) { req.flash('error', 'Invalid username or password.'); return res.redirect('/login'); }
    req.session.user = users[0];
    req.flash('success', 'Login successful!');
    return res.redirect(users[0].role === 'admin' ? '/admin/dashboard' : '/journals');
  });
}

function logout(req, res) { req.session.destroy(() => res.redirect('/login')); }
function showIndex(req, res) { res.render('index', { session: req.session }); }

module.exports = { showSignup, signup, showLogin, login, logout, showIndex };
