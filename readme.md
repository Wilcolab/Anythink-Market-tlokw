# Welcome to the Anythink Market repo

To start the app use Docker. It will start both frontend and backend, including all the relevant dependencies, and the db.

Please find more info about each part in the relevant Readme file ([frontend](frontend/readme.md) and [backend](backend/README.md)).

## Development

When implementing a new feature or fixing a bug, please create a new pull request against `main` from a feature/bug branch and add `@vanessa-cooper` as reviewer.

## First setup

**[TODO 05/01/2018 @vanessa-cooper]:** _It's been a while since anyone ran a fresh copy of this repo. I think it's worth documenting the steps needed to install and run the repo on a new machine?_

## Setting up as new Environment

- Download Docker
- Check if Docker is properly installed by running the following commands on the terminal: 
    docker -v
    docker-compose -v 
- Once Docker is proper installed in your machine, run the following commands in the project root directory: 
    docker-compose up
- If the Docker is running properly it should be able to run and connect to the local database.
