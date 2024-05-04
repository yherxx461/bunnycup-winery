const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    const orderQuery = `SELECT "orders"."id", "orders"."date", "orders"."total_cost", 
                        "orders"."checkout_discount", "status"."name", "wine_orders"."wine_sku",
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
                            "orders"."checkout_discount", "status"."name", "wine_orders"."wine_sku",
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

router.post('/', async (req, res) => {
    const db = await pool.connect();
    try{
        const orderId = req.body.order_id;  //Stores order id
        const clientId = req.body.client_id;//Stores client id
        const date = req.body.date;         //Stores the date
        const cost = req.body.cost;         //Stores the total order cost
        const discount = req.body.discount; //Stores the discount
        const wineOrder = req.body.wines;      //Stores the array of wine objects
        const orderText = `INSERT INTO "orders" ("id", "client_id", "date", "total_cost", "status_id", "checkout_discount")
                            VALUES($1, $2, $3, $4, $5, $6);`;
                            //Query text that lets us create an order in the order table
        const wineText = `INSERT INTO "wine_orders" ("order_id", "wine_sku", "number_bottles", "unit_price")
                            VALUES($1, $2, $3, $4);`;
                            //Query text that lets us add the wines into the wine_order table

        await db.query('BEGIN') //Start transaction
        let result = await db.query(orderText, [orderId, clientId, date, cost, 1, discount]); //Sends the query with all order info, sets order status to pending(1)
        console.log('Order information added')
        for (wine of wineOrder) { //Loop through wine array
            let wineResult = await db.query(wineText, [orderId, wine.sku, wine.quantity, wine.price]) //Send wine object as SQL query, store result
            console.log('Wine added successfully')
        }
        await db.query('COMMIT'); //If everything submits successfully, complete transaction.
        res.sendStatus(200);
    } catch (error) {
        console.log('Order submission failed')
        await db.query('ROLLBACK');
        res.sendStatus(500); 
    } finally {
        await db.release();
    };
});

router.put('/', (req, res) => {
    const orderId = req.body.order_id;
    const status = req.body.status;
    const statusText = `UPDATE "orders" SET "status_id" = $1 WHERE "id" = $2;`;
    pool.query(statusText, [status, orderId])
    .then((result) => {res.sendStatus(200)})
    .catch((error) => {res.sendStatus(500)})
})

module.exports = router;