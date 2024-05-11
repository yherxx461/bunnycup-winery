const express = require('express');
const pool = require('./modules/pool');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5001;

// Middleware Includes
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route Includes
const userRouter = require('./routes/user.router');
const inventoryRouter = require('./routes/inventory.router');
const clientsRouter = require('./routes/clients.router');
const emailRouter = require('./routes/email.router');
const orderRouter = require('./routes/order.router');

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('build'));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRouter);
app.use('/api/inventory', inventoryRouter);
app.use('/api/clients', clientsRouter);
app.use('/api/email', emailRouter);
app.use('/api/orders', orderRouter);

app.get('/api/search', async (req, res) => {
  try {
      const {name} = req.query;
      const clients = await pool.query("SELECT * FROM clients WHERE name ILIKE $1", [`%${name}%`])

      res.json(clients.rows)

    } catch (err) {
      console.log('ERROR: Search error', err);
      res.sendStatus(500);
    }
});


// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
