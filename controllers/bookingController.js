const petModel = require('../models/petModel');
const serviceModel = require('../models/serviceModel');
const bookingModel = require('../models/bookingModel');
const validId = (value) => /^\d+$/.test(String(value)) && Number(value) > 0;
function validDate(value) { const today = new Date(); today.setHours(0, 0, 0, 0); const date = new Date(`${value}T00:00:00`); return /^\d{4}-\d{2}-\d{2}$/.test(value || '') && !Number.isNaN(date) && date.toISOString().slice(0, 10) === value && date >= today; }

function showServices(req, res) {
  serviceModel.findActive((serviceError, services) => {
    if (serviceError) return res.send('Error loading services');
    petModel.findByOwner(req.session.user.id, (petError, pets) => {
      if (petError) return res.send('Error loading pets');
      return res.render('services', { services, pets, session: req.session, messages: req.flash('success'), errors: req.flash('error') });
    });
  });
}
function createBooking(req, res) {
  const { pet_id, service_id, booking_date } = req.body;
  if (!validId(pet_id) || !validId(service_id) || !validDate(booking_date)) { req.flash('error', 'Select a valid pet, service, and today or future date.'); return res.redirect('/services'); }
  petModel.findOwnedPet(pet_id, req.session.user.id, (petError, pets) => {
    if (petError || pets.length === 0) { req.flash('error', 'Selected pet is not available.'); return res.redirect('/services'); }
    serviceModel.findActiveById(service_id, (serviceError, services) => {
      if (serviceError || services.length === 0) { req.flash('error', 'Selected service is not available.'); return res.redirect('/services'); }
      bookingModel.createPending(pet_id, service_id, services[0].price, booking_date, (error) => {
        if (error) { req.flash('error', 'Booking could not be saved.'); return res.redirect('/services'); }
        req.flash('success', 'Booking created. Payment is pending.'); return res.redirect('/bookings');
      });
    });
  });
}
function showBookings(req, res) { bookingModel.findForOwner(req.session.user.id, (err, bookings) => { if (err) return res.send('Error loading bookings'); return res.render('bookings', { bookings, session: req.session, messages: req.flash('success'), errors: req.flash('error') }); }); }
module.exports = { showServices, createBooking, showBookings };
