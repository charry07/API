const nodemailer = require('nodemailer');
const NodeCache = require('node-cache');
//stdTTL: 600s=5min (tiempo de vida del cache), checkperiod: 120s=2min (tiempo de chequeo de expiración de cache)
const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 });

export const SendMailMyPortfolio = async (req: any, res: any) => {
  const name = req.body.firstName + req.body.lastName;
  const { email, phone, message } = req.body;

  const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  contactEmail.verify((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Ready to Send');
    }
  });

  const mail = {
    from: name,
    to: process.env.GMAIL_USER,
    subject: 'Contact Form Submission - Portfolio ACN dev',
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Phone: ${phone}</p>
           <p>Message: ${message}</p>`,
  };

  contactEmail.sendMail(mail, (error) => {
    if (error) return res.status(500).send({ msg: 'Error sending mail', error: error });
    res.send({ code: 200, status: 'Message Sent' });
  });
};
