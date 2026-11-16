USE petcare;

CREATE TABLE IF NOT EXISTS services (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS service_bookings (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  pet_id INT UNSIGNED NOT NULL,
  service_id INT UNSIGNED NOT NULL,
  booking_status VARCHAR(20) NOT NULL,
  booked_price DECIMAL(10,2) NOT NULL,
  booking_date DATE NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id),
  FOREIGN KEY (service_id) REFERENCES services(id)
);

CREATE TABLE IF NOT EXISTS payments (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  booking_id INT UNSIGNED NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  payment_status VARCHAR(20) NOT NULL,
  payment_reference VARCHAR(100) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (booking_id) REFERENCES service_bookings(id)
);

INSERT INTO services (name, price, is_active)
SELECT 'Vaccination', 35.00, 1 WHERE NOT EXISTS (SELECT 1 FROM services WHERE name = 'Vaccination');
INSERT INTO services (name, price, is_active)
SELECT 'Pet Grooming', 50.00, 1 WHERE NOT EXISTS (SELECT 1 FROM services WHERE name = 'Pet Grooming');
INSERT INTO services (name, price, is_active)
SELECT 'Boarding', 80.00, 1 WHERE NOT EXISTS (SELECT 1 FROM services WHERE name = 'Boarding');
