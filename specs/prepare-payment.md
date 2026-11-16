# Prepare payment API

## Goal

Return a payment-ready service quote for classroom testing. No real payment is processed.

## Endpoint

`GET /payments/prepare/:serviceId`

The server catalogue is the source of truth: Vaccination (35), Pet Grooming (50), Boarding (80). Client values such as `amount` are ignored.

## Responses

For a known service, return HTTP 200 with exactly `serviceId`, `serviceName`, `amount`, `currency` (`sgd`) and `status` (`READY_FOR_PAYMENT`).

For an unknown service, return HTTP 404 with `{"error":"Service not found"}`.

## Acceptance checks

`/1`, `/2`, and `/3` return their server-side catalogue values. `/999` returns 404. `/1?amount=1` still returns 35.
