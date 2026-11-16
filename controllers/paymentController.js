const { findService } = require('../data/mockServices');
const provider = require('../services/mockPaymentProvider');

function preparePayment(req, res) {
  const service = findService(req.params.serviceId);
  if (!service) return res.status(404).json({ error: 'Service not found' });
  return res.json({ serviceId: service.id, serviceName: service.name, amount: service.price, currency: 'sgd', status: 'READY_FOR_PAYMENT' });
}

function createMockPayment(req, res) {
  const service = findService(req.params.serviceId);
  if (!service) return res.status(404).json({ error: 'Service not found' });
  const result = provider.createPayment(req.body.testStatus || 'PENDING');
  return res.json({
    serviceId: service.id,
    providerPaymentId: result.providerPaymentId,
    merchantReference: `SERVICE-${service.id}`,
    paymentStatus: result.paymentStatus,
    bookingStatus: result.bookingStatus
  });
}

module.exports = { preparePayment, createMockPayment };
