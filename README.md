# PetCareApp

Week 1 baseline for the C372 Payment Technologies CA1.

## Run locally

1. Create the `petcare` database by running `db.sql` in MySQL.
2. Copy `.env.example` to `.env` and enter the local MySQL password and a session secret.
3. Install dependencies with `npm.cmd install`.
4. Start the app with `npm.cmd start`, then open `http://localhost:3000`.

## Week 1 baseline

- User sign-up, login and logout.
- User and administrator roles. Public sign-up creates only regular users; the sample administrator is supplied by `db.sql`.
- Pet profiles, including optional image uploads to `public/images`.
- Journal create, read, update, delete, pet filtering and activity/notes searching.
- Ownership checks prevent a regular user from creating, editing or deleting journals for another user's pet.
- Administrator pages for viewing users, pets and journals.

No payment or booking function is included in Week 1. Later payment work must use server-side trusted prices and must not describe a pending payment as paid or settled.
