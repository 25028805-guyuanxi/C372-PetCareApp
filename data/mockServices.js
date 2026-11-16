const services = [
  { id: 1, name: 'Vaccination', price: 35 },
  { id: 2, name: 'Pet Grooming', price: 50 },
  { id: 3, name: 'Boarding', price: 80 }
];

function findService(id) {
  return services.find((service) => service.id === Number(id));
}

module.exports = { findService };
