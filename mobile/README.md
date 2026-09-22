# PiggyCapsule Mobile

An Expo / React Native client for the PiggyCapsule shared-savings prototype.

## Setup

From this directory, install dependencies with `npm install`, then run `npm start`. Follow the Expo terminal instructions for a device, simulator, or web target.

| Command | Purpose |
| --- | --- |
| `npm run android` | Start Expo for Android |
| `npm run ios` | Start Expo for iOS |
| `npm run web` | Start Expo for web |

## Source map

- `app/(auth)/` — login, signup, and OTP screens.
- `app/(tabs)/` — home, activity, profile, and exploration screens.
- `app/capsule/` and `app/create/` — capsule detail and creation screens.
- `src/components/` — layout and reusable UI.
- `src/data/mock.ts` — local demonstration data.

## Status

This client contains prototype screens and mock data. Verify the API contract and screen-by-screen integration before treating the client as connected to live authentication, payments, or storage. The presence of a payment or OTP screen is not proof of a working provider integration.

See the [root README](../README.md) for architecture, backend setup, and current implementation limits.
