   const Nexmo = require('nexmo');
   require('dotenv').config();
   function sendmailtoadmin(fullName) {
       const nexmot = new Nexmo({
           apiKey: process.env.APIKEY,
           apiSecret: process.env.APISECRET,
       });

       const from = 'Vonage APIs';
       const to = process.env.PHONE;
       const text = 'Hello mahdi, ' + fullName + ' waiting for your validation ';

       nexmot.message.sendSms(from, to, text);
   }
   module.exports = sendmailtoadmin;