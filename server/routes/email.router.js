const express = require('express');
const router = express.Router();
const axios = require('axios');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


router.post('/', async (req, res) => {
    try {
        const orderedWinesHTML = req.body.wines.map((wine) => (`<li>${wine.sku}__ ${wine.quantity}</li>`))
        const orderedWinesText = req.body.wines.map((wine) => (`${wine.sku}__ ${wine.quantity}`))
        const discountedPrice = (
            Number(req.body.cost) -
            Number(req.body.cost) * (req.body.discount / 100)
            ).toFixed(2)

        const msg = { // Define the details of the email to be sent
            to: 'nateglewwe@gmail.com',
            from: 'nateglewwe@gmail.com', // Use the email address or domain you verified in SendGrid account
            subject: `New Order #${req.body.order_id} from ${req.body.client_name}`,
            text:
                `New Order from ${req.body.client_name}:
                Order__ #${req.body.order_id}
                Date placed__ ${req.body.date}
                Total cost before discount__ $${req.body.cost}
                Discount percentage__ ${req.body.discount}%
                Discounted price__ $${discountedPrice}
                Payment type__ ${req.body.payment_type}
                Wine quantities ordered:
                ${orderedWinesText}
                `, // Text we want in body of email, this is for email services that use Plaintext
            html:
                `<p>New Order from ${req.body.client_name}:</p><br>
                 <p>Order__ #${req.body.order_id}</p>
                 <p>Date placed__ ${req.body.date}</p>
                 <p>Total cost before discount__ $${req.body.cost}</p>
                 <p>Discount percentage__ ${req.body.discount}%</p>
                 <p>Discounted price__ $${discountedPrice}</p>
                 <p>Payment type__ ${req.body.payment_type}</p>
                 <p>Wine quantities ordered:</p>
                 <ul>
                    ${orderedWinesHTML}
                 </ul>
                 `, // Text we want in body of email, this is for email services that use HTML
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
