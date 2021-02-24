const nodemailer = require('nodemailer');

function sendmail(fullName) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mahdisouilmi95@gmail.com',
            pass: '**********'
        }
    });

    const mailOptions = {
        from: 'mahdisouilmi95@gmail.com',
        to: 'mahdisouilmi95@gmail.com',
        subject: 'new account to validate',
        text: 'hello Elmahdi, ' + fullName + ' waiting for you to validate his account'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
module.exports = sendmail;