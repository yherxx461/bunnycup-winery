const express = require('express');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const router = express.Router();

//GET route to find all clients and sort alphabetically by name
router.get('/', (req, res) => {
    console.log('GET /api/clients');
    pool
      .query(`SELECT "clients"."id", "clients"."name", "clients"."email", "clients"."discount", "clients"."payment_type", "client_address"."street", "client_address"."city", "client_address"."state", "client_address"."zip" FROM "clients"
      JOIN "client_address" ON "clients"."id" = "client_address"."client_id" ORDER BY "clients"."name";`)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log('Error GET /api/clients', error);
        res.sendStatus(500);
      });
});

router.get('/:id', async (req, res) => {
  const query = `SELECT "clients"."id", "clients"."name", "clients"."email", "clients"."discount", "clients"."payment_type", "client_address"."street", "client_address"."city", "client_address"."state", "client_address"."zip" FROM "clients"
  JOIN "client_address" ON "clients"."id" = "client_address"."client_id" 
  WHERE "clients"."user_id" = $1;`
  const clientId = req.params.id;

  try {
      const clientResult = await pool.query(query, [clientId]);
      const clientDetails = clientResult.rows[0];
      // JS WORKS HERE    
      res.send(clientDetails);
    } catch (err) {
      console.log('ERROR: Get client details', err);
      res.sendStatus(500);
    }
});

//POST route template
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
    //In the above variables, we're storing all of the client data taken in from the registration form.
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
  //This query will input an email and password into the user table, then use that generated ID to fill in the clients and client_address tables

  pool.query(clientText, [username, password, 1, client.name, username, client.discount, client.payment, client.street, client.city, client.state, client.zip])
    .then((result) => {
      res.sendStatus(200)
    })
    .catch((error) => {
      console.log('Retailer registration failed: ', error)
      res.sendStatus(500)})
});

module.exports = router;