const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.put('/:id', (req,res) => {
  const orderId = req.body.id;
console.log('In COMPLETE ORDER router', orderId)
  const sqlText = `UPDATE "orders" SET "status_id"=$1
                  WHERE "id" = $2;`;
  const sqlValue = [2, orderId];

  pool.query(sqlText, sqlValue)
  .then((dbRes) => {
      res.sendStatus(201)
    })
    .catch(err => {
      console.log('ERROR: COMPLETE ORDER', err);
      res.sendStatus(500)
    })
});

module.exports = router;