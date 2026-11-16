function createPayment(testStatus = 'PENDING') {
  const paymentStatus = ['APPROVED', 'PENDING', 'DECLINED'].includes(testStatus) ? testStatus : testStatus;
  const bookingStatus = {
    APPROVED: 'CONFIRMED',
    PENDING: 'AWAITING_PAYMENT',
    DECLINED: 'PAYMENT_FAILED'
  }[paymentStatus];
  return { providerPaymentId: `MOCK-${Date.now()}`, paymentStatus, bookingStatus };
}

module.exports = { createPayment };
