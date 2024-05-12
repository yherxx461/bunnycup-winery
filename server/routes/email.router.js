const express = require('express');
const router = express.Router();
const axios = require('axios');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


router.post('/', async (req, res) => {
    try {
        const orderedWines = req.body.wines.map((wine) => (`<li>${wine.sku}__ ${wine.quantity}</li>`))
        const discountedPrice = (
            Number(req.body.cost) -
            Number(req.body.cost) * (req.body.discount / 100)
            ).toFixed(2)

        const msg = { // Define the details of the email to be sent
            to: 'nateglewwe@gmail.com',
            from: 'nateglewwe@gmail.com', // Use the email address or domain you verified in SendGrid account
            subject: `New Order #${req.body.order_id} from ${req.body.client_name}`,
            text: 'Test text here', // We're not using this text property, not really sure what it does
            html:
                `<p>New Order from ${req.body.client_name}:</p><br>
                 <p>Order__ #${req.body.order_id}</p>
                 <p>Date placed__ ${req.body.date}</p>
                 <p>Total cost before discount__ $${req.body.cost}</p>
                 <p>Discount percentage__ ${req.body.discount}%</p>
                 <p>Discounted price__ $${discountedPrice}</p>
                 <p>Wine quantities ordered:</p>
                 <ul>
                    ${orderedWines}
                 </ul>
                 `, // This is the text we want to put in the body of the email
          };
          console.log('THIS IS THE ORDER PAYLOAD:', req.body);

          //Send the email data to the Twilio SendGrid API
          const email = await sgMail.send(msg);
          console.log('This is the email API response, I think?', email);
          res.sendStatus(200)
    }
    catch (error) {
        console.log(error)
        console.error(error);
        if (error.response) {
            console.error(error.response.body)
          }
        res.sendStatus(500);
    }
});

module.exports = router;
