# Sing Me a Song API

## About
In this API you can get a song recommendations made by other users, then you vote as you like or not the song! You can also make your own song recommendation to other users. This API also provides a top song recommendations based on users' votes!

## Tools
This API was made using NodeJS and Postgres, with some libs like [express](https://www.npmjs.com/package/express) and [pg](https://www.npmjs.com/package/pg).

## Preparing
First, you need to have node, npm and postgres installed!\
\
Then, clone this repository to your computer: 
#### `git clone https://github.com/lfelipelizeu/sing-me-a-song-api`
\
Now to install the dependencies, access the cloned folder by the terminal and use:
#### `npm i`
\
I've uploaded a dump file to this repository, use it to create the needed database to the API work.\
\
I've also uploaded a `.env.example` file, an environment example file, you need to replace the variables based on your postgres configurations, then rename the file for `.env`.

## Running
This server has 3 different scripts, you can run them based on which database you want to use.
- If you want to run at the production database, set the `.env` file with the production database credentials and use:
#### `npm run start`
- If you want to run at the development database, create a `.env.dev` file, based on the `.env.example` and fill with the development database credentials and use:
#### `npm run start:dev`
- If you want to run the tests, create a `.env.test` file, based on the `.env.example` and fill with the test database credentials and use:
#### `npm run test`
