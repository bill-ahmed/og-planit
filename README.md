### The OG-Planit Team brings you...
This project ("Planit") was created as part of the course CSCC01, at the University of Toronto.

# Getting Started
This app uses the NPM package manager as well as Node.js. Follow the instructions below to get setup.

## Software Used:
Git
Google Firebase
Node.js
React Native

Useful software:
Android Emulator (E.G. Bluestacks)
Visual Studio Code (preferred IDE of yinlinta)

## Installing Node.js (Back-end)
1. Visit the Node.js installations page at https://nodejs.org/en/download/
2. Install the "LTS" version
3. Follow through installation steps normally
4. In the root directory, run `npm install` in the terminal
5. Done.

## Installing React-Native (Front-end)
1. Go into the 'client' directory (`cd client`) 
2. Install all dependencies (`npm install`)

## Installing git (repo management)
1. visit https://git-scm.com/downloads
2. download the version you need
3. setup user and email using: git config --global user.name "John Doe", git config --global user.email johndoe@example.com

Notes: run 'git fetch' to get the latest branches and histories for branches


# Running the App
## Front-end
1. Go into client directory (`cd client`) and run the app with `npm start`
2. For Android devices, download the [Expo App](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_CA); for iOS, scan the QR code that appears.
3. scan the QR code to visit or paste the lan address into the expo app

Alternative Installation:
1. Install your OEM usb drivers
2. Enable usb debugging on your phone (Android)
3. Run npm start
4. Run on android device or emulator

That's it! Any changes you make and save will show up on your device.

If you're having any issues, follow the [React Native Setup Guide](https://facebook.github.io/react-native/docs/getting-started.html).

Note: The initial compile can be lengthy, however any subsequent changes you make will appear almost immediately
Advice: You can run the expo application on any android emulator. Not all will run using the alternative but you can install the app and run off lan address

## Back-end
1. Run `npm run dev` to start the server

The server be running in development mode at http://localhost:4000/.



# Development for the App
1. Create a new branch following the pattern "feature/US-AAAA/Title of user story" for user stories, "bugfix/DE-AAAA/Title of bug"
   where AAAA is the user story id. this will help us manage feature branches
2. Once completed create a PR to develop branch. Then have a separate developer review your code before merge with develop
3. Merge with master only occurs when preparing a submission build

# Resources
https://git-scm.com/downloads
https://facebook.github.io/react-native/
https://nodejs.org/en/
https://developer.android.com/studio/run/device.html#developer-device-options
https://developer.android.com/studio/run/oem-usb.html
https://forums.expo.io/t/running-new-app-with-bluestacks/2630
