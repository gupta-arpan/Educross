# Educross App

A cross-platform React Native app (Android, iOS, Web) built with Expo and TypeScript. The app demonstrates an activity listing with filtering, search, theming (light/dark), and reusable UI components.

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)

## Features

- Cross-platform: Android, iOS and Web via Expo
- Reusable components and type-safe code (TypeScript)
- Activity list with filtering and search
- Light/Dark theme support and user-controlled toggle

## Tech stack

- React Native (with Expo)
- TypeScript
- React Navigation
- React Native Paper (UI components)
- React Native Vector Icons

## Project structure

Top-level important folders/files:

- `App.tsx` — app root and providers
- `index.ts` — native entry
- `package.json` — scripts & dependencies
- `src/components/` — reusable UI components (e.g., `ActivityCard.tsx`, `AppHeader.tsx`)
- `src/screens/` — screen components (`ActivityListScreen.tsx`, `ProfileScreen.tsx`)
- `src/theme/` — theme and ThemeContext
- `src/data/mockData.ts` — mocked data used by the app

## Getting started

Prerequisites

- Node.js (LTS recommended)
- npm or yarn
- Android Studio or Xcode if you want to run on emulators/simulators

Install

```bash
# clone the repo
git clone https://github.com/gupta-arpan/Educross.git
cd educross

# install dependencies
npm install
# or
yarn install
```

Run (development)

```bash
# start Metro / Expo dev tools
npm run start
# or
yarn start

# open on Android (device or emulator)
npm run android

# open on iOS (requires macOS + Xcode)
npm run ios

# run on web
npm run web
```

Notes:

- For iOS, if you eject or use the bare workflow you may need to run `pod install` inside the `ios` directory. With Expo managed workflow (used here), `expo run:ios` handles most steps but still requires macOS.
- If you run into native module mismatches (see Troubleshooting below), a full rebuild of a dev client / native app is often required.

## Available scripts

The scripts in `package.json` (extracted from the project):

```json
"scripts": {
  "start": "expo start",
  "android": "expo run:android",
  "ios": "expo run:ios",
  "web": "expo start --web"
}
```