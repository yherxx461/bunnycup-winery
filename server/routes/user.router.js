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
                  address: req.body.address,
                  discount: req.body.discount,
                  payment: req.body.payment}

  const userText = `INSERT INTO "user" ("email", "password", "access_level")
    VALUES ($1, $2, $3) RETURNING id;`;
  const clientText = `INSERT INTO "clients" ("user_id", "name", "email", "delivery_address", "discount", "payment_type")
    VALUES ($1, $2, $3, $4, $5, $6);`;

  if ("name" in req.body){
    pool.query(userText, [username, password])
    .then((result) => {
      pool.query(clientText, [result.rows[0], client.name, username, client.address, client.discount, client.payment])
      .then((result) => {res.sendStatus(201)})
      .catch((error) => {
        console.log('retailer table update failed: ', error)
        res.sendStatus(500)})
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

module.exports = router;
