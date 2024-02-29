# Expo Template

This is our base project template for mobile applications. The goal is to make starting a new app project simple, yet come with all the things we're accustomed to having on our projects - such as testing, utilities, deployment configurations, etc.

## Technology

### Frontend

- [React Native](https://reactnative.dev/) - React Native combines the best parts of native development with React, a best-in-class JavaScript library for building user interfaces.
- [Expo](https://expo.dev/) - Expo is an open-source platform for making universal native apps for Android, iOS, and the web with JavaScript and React. [Read full docs here](https://docs.expo.dev/).

### Backend

We intend for this project to be paired with an API backend. [Learn more about our API project template here](https://github.com/BetaBlox/nestjs-react-template).

### Miscellaneous

- [Git Patch Stack](https://git-ps.sh/) - Git Patch Stack is a command line tool that facilitates a Patch Stack based workflow with Git. Git Patch Stack helps you think in terms of a stack of patches instead of a series of isolated branches.

## Setup

```bash
# Install your deps
$ npm install

# Switch to your backend API
$ cd ~/Development/my-api

# Run docker services
$ npm run docker:up

# Reset and seed your database
$ npm run db:reset

# Run build once for turbo cache
$ npm run build

# Start your API in dev mode
$ npm run dev
```

## Development

```bash
# Any of the following
$ npm run start
$ npm run ios
$ npm run android
$ npm run web
```

## Testing

```bash
$ npm run test
```

### Writing Tests

We encourage you to write tests and whatever level you are comfortable (e2e, integration, unit, etc.)

If you are looking for more e2e and integration tests you should probably write this in our backend API instead of the mobile frontend.

For mobile app tests we find it's best to stick to simple snapshot and unit tests with fixture data.

## Build

Our build system uses Expo's EAS infrastructure to build app binaries in the cloud based on whichever profile you give it. Refer to `eas.json` for build profile configurations.

```bash
# Development mode for testing on real devices
$ npm run build:dev

# Internal preview/testing (similar to UAT/staging)
$ npm run build:preview

# Production build ready to deploy on app store
$ npm run build:prod
```

In running any of the above commands, your app build will be queued in the EAS pipeline. Once completed, you can download the binary and execute however you need (load on simulator, test on real device, deploy to app store)

[Learn more about EAS Build](https://docs.expo.dev/build/introduction/)

## Deployment

Deployment for mobile applications can be tricky. This section of the docs is still a work in progress. More info to come here as we find more consistent steps to document.
