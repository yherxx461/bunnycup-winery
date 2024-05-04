const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    const orderQuery = `SELECT "orders"."id", "orders"."date", "orders"."total_cost", 
                        "orders"."checkout_discount", status"."name", "wine_orders"."wine_sku",
                        "wine_orders"."number_bottles", "wine_orders"."unit_price" FROM "orders"
                        JOIN "status" ON "status"."id" = "orders"."status_id"
                        JOIN "wine_orders" ON "orders"."id" = "wine_orders"."order_id";`;
    pool.query(orderQuery)
    .then((result) => {
        res.send(result.rows)
    })
    .catch((error) => {
        res.sendStatus(500)
    })
});

router.get('/:id', (req, res) => {
    const clientId = req.params.id;
    const clientOrderQuery = `SELECT "orders"."id", "orders"."date", "orders"."total_cost", 
                        "orders"."checkout_discount", status"."name", "wine_orders"."wine_sku",
                        "wine_orders"."number_bottles", "wine_orders"."unit_price" FROM "orders"
                        JOIN "status" ON "status"."id" = "orders"."status_id"
                        JOIN "wine_orders" ON "orders"."id" = "wine_orders"."order_id"
                        WHERE "orders"."client_id" = $1;`;
    pool.query(clientOrderQuery, [clientId])
    .then((result) => {
        res.send(result.rows)
    })
    .catch((error) => {
        res.sendStatus(500)
    })
})

router.post('/', (req, res) => {

})
module.exports = router;