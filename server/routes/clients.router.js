const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  // all clients
  const sqlText = `SELECT * FROM "clients" ORDER BY "name"`;

  pool
    .query(sqlText)
    .then((result) => {
      console.log('Louis', result.rows)
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('ERROR: Get all clients', err);
      res.sendStatus(500);
    });
});

module.exports = router;