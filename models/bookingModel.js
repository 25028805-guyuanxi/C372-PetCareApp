const db = require('../config/db');

function createPending(petId, serviceId, price, date, callback) {
  db.getConnection((connectionError, connection) => {
    if (connectionError) return callback(connectionError);
    connection.beginTransaction((beginError) => {
      if (beginError) { connection.release(); return callback(beginError); }
      connection.query('INSERT INTO service_bookings (pet_id, service_id, booking_status, booked_price, booking_date) VALUES (?, ?, ?, ?, ?)', [petId, serviceId, 'pending', price, date], (bookingError, result) => {
        if (bookingError) return connection.rollback(() => { connection.release(); callback(bookingError); });
        connection.query('INSERT INTO payments (booking_id, amount, payment_status, payment_reference) VALUES (?, ?, ?, ?)', [result.insertId, price, 'pending', `BOOKING-${result.insertId}`], (paymentError) => {
          if (paymentError) return connection.rollback(() => { connection.release(); callback(paymentError); });
          connection.commit((commitError) => {
            if (commitError) return connection.rollback(() => { connection.release(); callback(commitError); });
            connection.release(); return callback(null);
          });
        });
      });
    });
  });
}

function findForOwner(ownerId, callback) {
  db.query(`SELECT service_bookings.*, pets.name AS pet_name, services.name AS service_name, payments.payment_status
    FROM service_bookings JOIN pets ON service_bookings.pet_id = pets.id
    JOIN services ON service_bookings.service_id = services.id LEFT JOIN payments ON payments.booking_id = service_bookings.id
    WHERE pets.owner_id = ? ORDER BY service_bookings.created_at DESC, service_bookings.id DESC`, [ownerId], callback);
}
module.exports = { createPending, findForOwner };
