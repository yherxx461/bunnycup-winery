const express = require('express');
//const pool = require('../modules/pool');
const router = express.Router();

const axios = require('axios');

router.get('/', async (req, res) => {
try {
    //get the inventory from 3rd Party Winery Management System API
    const inventory = await axios.get(`https://wms.bunnycupwinery.com/api/whole_inv?key=${process.env.INVENTORY_API_KEY}`);
    //console.log('THIS IS THE INVENTORY DATA', inventory.data);
    res.send(inventory.data.products)
}
catch (error) {
    console.log(error)
    res.sendStatus(500);
}
});
  
module.exports = router;