const express = require('express');
const router = express.Router();
const axios = require('axios');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


router.post('/', async (req, res) => {
    try {
        const msg = { // Define the details of the email to be sent
            to: 'nateglewwe@gmail.com',
            from: 'nateglewwe@gmail.com', // Use the email address or domain you verified above
            subject: 'Sending with Twilio SendGrid is Fun',
            text: 'Test text here', // We're not using this text property, not really sure what it does
            html: '<p>Testing testing testing</p>', // This is the text we want to put in the body of the email
          };
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
