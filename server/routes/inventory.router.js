const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    //get the inventory from 3rd Party Winery Management System API
    const inventory = await axios.get(
      `https://wms.bunnycupwinery.com/api/whole_inv?key=${process.env.INVENTORY_API_KEY}`
    );
    //console.log('THIS IS THE INVENTORY DATA', inventory.data);
    res.send(inventory.data.products);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get('/images', (req, res) => {
  // try {
  //Get images from the wines table
  const query = `SELECT * FROM wines`;
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('ERROR: Getting images from wine table', error);
    });
});

//This is a route to get a count of orders for the day
router.post('/', (req, res) => {
  const date = req.body;
  const query = `SELECT COUNT("id") FROM "orders" WHERE "date" = $1;`
  //console.log('Inside count route date:', date)
    pool.query(query, [date])
    .then((result) => {
      //console.log('Its working')
      res.send(result.rows[0].count)})
    .catch((error) => {res.sendStatus(500)});
})

module.exports = router;
