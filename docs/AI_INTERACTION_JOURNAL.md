# AI Interaction Journal

## 2026-11-16 — Establish Week 1 PetCareApp baseline

| Field | Record |
|---|---|
| Context given | Existing Express, EJS and MySQL PetCareApp plus the CA1 development outline. |
| Prompt | Review and establish only the Week 1 baseline; do not add payment or booking features. |
| Relevant AI response | Identified missing server-side ownership checks for journal create, edit and delete routes, and public sign-up allowing selection of the admin role. |
| Verification | Ran `npm.cmd run check` and verified the MySQL connection. Manual browser tests remain: login, pet upload, journal CRUD/search/filter, admin access and cross-user journal URLs. |
| Decision | Modified. |
| Reason | Week 1 requires regular users to operate only their own pets and journals. UI filtering alone is insufficient because routes can be called directly. |
| Correction | The starter app included a database password in source code. Configuration now uses an ignored local `.env`; `.env.example` documents the required variables. |
| Evidence | Week 1 snapshot and the Week 1 baseline commit after manual validation. |

## Template for later entries

| Field | Record |
|---|---|
| Date / task | |
| Context given | |
| Prompt | |
| Relevant AI response | |
| Verification | Expected result, actual result and tests run. |
| Decision | Accepted / rejected / modified. |
| Reason | |
| Correction | |
| Evidence | Commit hash, screenshot, response or database query. |
