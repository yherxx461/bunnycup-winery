# Bunnycup Winery Client Portal

This application is designed to streamline the order placement process for clients of Bunnycup Winery products (i.e. retailers, bars, etc). With a focus on simplicity, efficiency, and convenience, the app provides clients with a seamless platform to browse and easily create new orders for wholesale purchase directly within the app. They can add products to their cart, specify quantities, and review their order summary before submission. The app supports both individual product purchases and bulk orders, catering to clients of all sizes.

## Getting Started

Before you get started, make sure you have the following software installed on your computer:
- [Node.js](https://nodejs.org/en)
- [PostgreSQL](https://www.postgresql.org)
- [Nodemon](https://nodemon.io)
- And the dependencies listed in `package.json`

A Note about the SendGrid dependency:
- [SendGrid](https://docs.sendgrid.com/for-developers/sending-email/api-getting-started) also requires a SendGrid account, API key, and verifying the sending email address to send the order confirmation emails. Please see below and [the npm install webpage](https://www.npmjs.com/package/@sendgrid/mail) for detailed instructions.


## Create Database and Tables

Use the code in the `database.sql` file to create the initial database, tables, and test data for the app

## Development Setup Instructions

- Run `npm install`.
    - Be sure to take stock of `package.json` to see which dependencies you'll need to add.
- Create a `.env` file at the root of the project and paste this line into the file:

```plaintext
SERVER_SESSION_SECRET=superDuperSecret
```

While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [Password Generator Plus](https://passwordsgenerator.net). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.

You'll also need to setup a SendGrid account, API key, and verify the sending email address to send order confirmation emails. See [sendgrid.com](https://docs.sendgrid.com/for-developers/sending-email/api-getting-started) to get started and it will walk you through the process. This will give you an API key to put in your .env file like so:

```plaintext
SENDGRID_API_KEY=apikeyhere
```

Finally, you'll also need to reach out to [Bunnycup Winery](https://www.bunnycupwinery.com/Contact-Us/Send-a-Message) in order to get an inventory API key from them to get the most current inventory data. Put that in your .env file like so:

```plaintext
INVENTORY_API_KEY=apikeyhere
```

So altogether, your .env file should contain the following:
```
SERVER_SESSION_SECRET=randomstringofcharacters

INVENTORY_API_KEY=apikeyhere

SENDGRID_API_KEY=apikeyhere
```

- Start postgres if not running already by using opening up the [Postgres.app](https://postgresapp.com), or if using [Homebrew](https://brew.sh) you can use the command `brew services start postgresql`.
- Run `npm run server` to start the server.
- Run `npm run client` to start the client.
- Navigate to `localhost:5173`.

## Testing Routes with Postman

To use Postman with this repo, you will need to set up requests in Postman to register a user and login a user at a minimum.

Keep in mind that once you using the login route, Postman will manage your session cookie for you just like a browser, ensuring it is sent with each subsequent request. If you delete the `localhost` cookie in Postman, it will effectively log you out.

1. Run `npm run server` to start the server.
2. Import the sample routes JSON file [v2](./PostmanPrimeSoloRoutesv2.json) by clicking `Import` in Postman. Select the file.
3. Click `Collections` and `Send` the following three calls in order:
   1. `POST /api/user/register` registers a new user, see body to change username/password.
   2. `POST /api/user/login` will login a user, see body to change username/password.
   3. `GET /api/user` will get user information, by default it's not very much.

After running the login route above, you can try any other route you've created that requires a logged in user!

## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

- Start postgres if not running already by using opening up the [Postgres.app](https://postgresapp.com), or if using [Homebrew](https://brew.sh) you can use the command `brew services start postgresql`.
- Run `npm start`.
- Navigate to `localhost:5173`.

## Deployment

1. Create a new Heroku project.
2. Link the Heroku project to the project GitHub Repo.
3. Create an Heroku Postgres database.
4. Connect to the Heroku Postgres database from Postico.
5. Create the necessary tables.
6. Add environment variables for `SERVER_SESSION_SECRET` (random string for security), `INVENTORY_API_KEY` (key), and `SENDGRID_API_KEY` (key).
7. In the deploy section, select manual deploy.

## Built With

- [React](https://react.dev/) - JavaScript Library
- [Node.js](https://nodejs.org/en) - Server Runtime Environment
- [Express.js](https://expressjs.com/) - Web Framework
- [PostgreSQL](https://www.postgresql.org/) - Database

This version uses React, Redux, Node, Express, Passport, and PostgreSQL (a full list of dependencies can be found in `package.json`).

## Authors
*Initial work*
* **Nathaniel Glewwe** - [GitHub Page](https://github.com/nateglewwe)
* **Ying Her** - [GitHub Page](https://github.com/yherxx461)
* **Louis Martin** - [GitHub Page](https://github.com/louimart)
* **Lauren McGarvey** - [GitHub Page](https://github.com/LaurenMcG-ColdStorage)
* **Gabriel Regalado** - [GitHub Page](https://github.com/Greg-04)
* **Ariel Rodriguez** - [GitHub Page](https://github.com/arodriguez914)