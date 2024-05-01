const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const client = {name: req.body.name,
                  street: req.body.street,
                  city: req.body.city,
                  state: req.body.state, 
                  zip: req.body.zip,
                  discount: req.body.discount,
                  payment: req.body.payment}

  const userText = `INSERT INTO "user" ("email", "password", "access_level")
                    VALUES ($1, $2, $3) RETURNING id;`;
  const clientText = `WITH "ins1" as (
                        INSERT INTO "user" ("email", "password", "access_level")
                        VALUES ($1, $2, $3)
                        RETURNING "id"),
                        "ins2" AS (
                        INSERT INTO "clients" ("user_id", "name", "email", "discount", "payment_type")
                        SELECT "id", $3, $4, $5, $6 FROM "ins1"
                        RETURNING "id")
                      INSERT INTO "client_address" ("client_id", "street", "city", "state", "zip")
                      SELECT "id", $7, $8, $9, $10 FROM "ins2";`;

  if ("name" in req.body){
    pool.query(clientText, [username, password, 1, client.name, username, client.discount, client.payment, client.street, client.city, client.state, client.zip])
    .then((result) => {
      res.sendStatus(200)
    })
    .catch((error) => {
      console.log('Retailer registration failed: ', error)
      res.sendStatus(500)})
  } else {
    pool
      .query(userText, [username, password, 10])
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log('User registration failed: ', err);
        res.sendStatus(500);
      });
  };
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

router.put('/', (req, res) => {
  const clientInfo = req.body;
  const password = encryptLib.encryptPassword(req.body.password);
  const updateQuery = `WITH "ins1" AS (
                        UPDATE "user" SET "password" = $1 WHERE "id" = $2
                        RETURNING "id"
                        ),
                        "ins2" AS (
                        UPDATE "clients" SET "name" = $3, "discount" = $4, "payment_type" = $5 WHERE "user_id" IN (SELECT "id" FROM "ins1")
                        RETURNING "id")
                      UPDATE "client_address" SET "street" = $6, "city" = $7, "state" = $8, "zip" = $9 WHERE "client_id" IN (SELECT "id" FROM "ins2");`;

  pool.query(updateQuery, [password, clientInfo.id, clientInfo.retailer, clientInfo.discount, clientInfo.paymentType, clientInfo.street, clientInfo.city, clientInfo.state, clientInfo.zip])
  .then((result) => {
    console.log('Client updated successfully');
    res.sendStatus(200)
  })
  .catch((error) => {
    console.log('Client update failed')
    res.sendStatus(500)
  })
})

module.exports = router;
