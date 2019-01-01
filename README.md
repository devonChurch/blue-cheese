# Blue Cheese 🔵 🧀 💙 🧀 🔷 😋

[![code style prettier](https://img.shields.io/badge/code_style-prettier-FF69A4.svg)](https://prettier.io/) [![commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![typescript](https://user-images.githubusercontent.com/15273233/40872275-a61d4660-669f-11e8-8edf-860f1947759f.png)](https://www.typescriptlang.org/)

## What

**A port from my original [Russian Fudge](https://github.com/devonChurch/russian-fudge/) GraphQL repository into using an RDS implementation.**

The architecture was an amalgamation of the following core components:

- [RDS (PostgreSQL)](https://aws.amazon.com/rds/postgresql/)
- [Serverless](https://serverless.com/)
- [Typescript](https://www.typescriptlang.org/)

The UI was generated with a [React](https://reactjs.org/) based design system called [Ant](https://ant.design/docs/react/introduce).

## Infrastructure

A simple infrastructure hooking a **React SPA** to an **Lambda / RDS** data hooks.

![blue-cheese](https://user-images.githubusercontent.com/15273233/50576964-2b822e80-0e82-11e9-83b4-a51f17856bed.png)

## Functionality

### Search

Users can _Free Text_ search against the titles of the "Food" cards.

![graphql-query](https://user-images.githubusercontent.com/15273233/45911409-fe77b600-be66-11e8-9266-bdb0f61ad9d3.gif)

### Create

Users can create their own "Food" card directly inside the application.

![graphql-mutation](https://user-images.githubusercontent.com/15273233/45911410-05062d80-be67-11e8-94c7-6f40ed2ddbdd.gif)

## Installation

- Clone this repository

  ```
  git clone https://github.com/devonChurch/blue-cheese.git && cd blue-cheese
  ```

- Install Node.js and project dependencies

  ```
  nvm use && npm i
  ```

- Start _Serverless_ hooks on [Port 5000](http://localhost:5000/)

  _(**Note:** you need to pass in your RDS credentials via **Environment Variables**)_

  ```
  USER="john_smith" PASSWORD="a1B2c3D4e5F6g" npm run server
  ```

- Start _Create React App_ on [Port 3000](http://localhost:3000/)

  ```
  npm start
  ```

## PG Admin

[![pg-admin](https://user-images.githubusercontent.com/15273233/50577043-abf55f00-0e83-11e9-9111-ff2094faf002.png)](https://www.pgadmin.org/download/)

[PG Admin](https://www.pgadmin.org/download/) offers a nice interface to test and iterate your SQL queries. This can be run locally while connecting to an AWS RDS instance..

![pg-admin](https://user-images.githubusercontent.com/15273233/50576962-23c28a00-0e82-11e9-942d-0cd755ab6be2.gif)
