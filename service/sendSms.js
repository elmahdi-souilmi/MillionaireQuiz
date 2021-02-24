   const Nexmo = require('nexmo');

   function sendmailtoadmin(fullName) {
       const nexmot = new Nexmo({
           apiKey: '9e322ac7',
           apiSecret: 'NCwoGVqw2LK9vU8J',
       });

       const from = 'Vonage APIs';
       const to = '212696235668';
       const text = 'Hello mahdi, ' + fullName + ' waiting for your validation ';

       nexmot.message.sendSms(from, to, text);
   }
   module.exports = sendmailtoadmin;