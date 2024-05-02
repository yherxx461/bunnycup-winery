const express = require('express');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    console.log('GET /api/clients');
    pool
      .query('SELECT * from "clients" ORDER BY "name";')
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log('Error GET /api/clients', error);
        res.sendStatus(500);
      });
  });

/**
 * POST route template
 */
router.post('/register', (req, res) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const client = {name: req.body.name,
                  street: req.body.street,
                  city: req.body.city,
                  state: req.body.state, 
                  zip: req.body.zip,
                  discount: req.body.discount,
                  payment: req.body.payment};

  const clientText = `WITH "ins1" as (
    INSERT INTO "user" ("email", "password", "access_level")
    VALUES ($1, $2, $3)
    RETURNING "id"),
    "ins2" AS (
    INSERT INTO "clients" ("user_id", "name", "email", "discount", "payment_type")
    SELECT "id", $4, $5, $6, $7 FROM "ins1"
    RETURNING "id")
  INSERT INTO "client_address" ("client_id", "street", "city", "state", "zip")
  SELECT "id", $8, $9, $10, $11 FROM "ins2";`;

  pool.query(clientText, [username, password, 1, client.name, username, client.discount, client.payment, client.street, client.city, client.state, client.zip])
    .then((result) => {
      res.sendStatus(200)
    })
    .catch((error) => {
      console.log('Retailer registration failed: ', error)
      res.sendStatus(500)})
});

module.exports = router;