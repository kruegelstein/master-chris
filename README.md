This project contains the three mobile gaming apps used in the master thesis of Christopher Krügelstein.

Below you will find some information on how to setup the apps on your local maschine.

# Basis infos

The three gaming apps developed are:

- Simon says
- Breakout
- Fruit Ninja

The basic technology used in all three games is ReactJS. ReactJS is a JavaScript library developed by Facebook which powers many web-applications on the internet. Combined with ReduxJS, which is a predictable state container for JavaScript apps, we use very powerfull state of the art technologies to build the three web-based gaming applications.

In the Breakout game we additionally use a digital canvas to support movement within the game.

# Setup

This guide will give you a brief overview on how to setup all three games on your local maschine using the command line tool.

**Note: This guide is written for MacOS. The steps for Windows and Linux are the same but the commands might be different.**

## Requirements

In order to setup this project locally you will need:

- Internet connection
- Node package manager (npm) or yarn installed. You can check that with `npm -v` or `yarn -v` in your command line tool. If you get a version back it is installed. If not please install either npm or yarn.
  1.  npm: https://www.npmjs.com/get-npm
  2.  yarn: https://yarnpkg.com/en/docs/install#mac-stable
- Very basic command line knowlegde

## Create a local folder for the project

In your command line tool:

- Navigate to the folder your code is usualy placed: `cd path/where/you/want/the/folder`
- Create a folder named for example "MasterProject": `mkdir MasterProject`

**Note: If you name the folder differently please make sure to use that name instead of "MasterProject" throughout this setup guide!**

## Clone the git repository

- Navigate into the "MasterProject" folder: `cd MasterProject`
- Clone the Repo: `git clone https://github.com/kruegelstein/master.git`

## Checkout the structure

After cloning the project you find a folder called "master". This folder contains a folder for every game named "breakout", "fruit-ninja" and "simon". Within each of the games folders you find the code belonging to the given game.

**Note: All three games are created using create-react-app. This package creates a new basic ReactJS application will most of the setup you need to start your own application.**

## Installing the packages

Each ReactJS application will have so called packages you need to install before you can run the application. Therefore each game has its own `package.json` file on root within each games folder. This file basically manages the application. It holds informations about used packages so called dependencies and scripts for starting, testing, etc. the app.

- Navigate into the breakout game (if you are in "MasterProject"): `cd master/breakout`
- Install all the packages using npm or yarn: `npm install` or `yarn`. Depending on you maschine and the used packages this might take a litte bit.
- Repeat the steps for the other two games:
- Navigate into fruit-ninja (if you are in "MasterProject"): `cd master/fruit-ninja`
- Install all the packages using npm or yarn: `npm install` or `yarn`
- Navigate into simon (if you are in "MasterProject"): `cd master/simon`
- Install all the packages using npm or yarn: `npm install` or `yarn`

Now you have everything installed to start the apps locally.

## Start the games

Since every game has different dependencies (packages) you need to start every game on its own.

- You do so by navigating into the app(s) (if you are in "MasterProject"): `cd master/breakout` or `cd master/fruit-ninja` or `cd master/simon`
- Start the app with: `npm start` or `yarn start`. This will open a local server running on port 3000 with the given app.
- Now go to Chrome or your favorite browser and open: `localhost:3000`. The app with your started game is now running.

**Note: You can also start all games by running `npm start` or `yarn start` in the different tabs in your console in the corresponding games folder. The other two games will then run on `localhost:3001` and `localhost:3002`**
