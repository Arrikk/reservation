const express = require("express");
const router = express.Router();
const sendMail = require("../mail/config");

const processData = async (req, res, next) => {
  const { email, name, phone, message } = req.body;

  try {
    const to = "info@meierhof-victoria.ch";
    subject = "New Message";
    html = `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <p>Hello,</p>
        <p>You just received a new message.</p>
          <div>
            <span><strong>Name:</strong></span>
            <span>${name}</span>
          </div>
          <div>
            <span><strong>Email:</strong></span>
            <span>${email}</span>
          </div>
          <div>
            <span><strong>Phone:</strong></span>
            <span>${phone}</span>
          </div>
          <div>
            <span><strong>Message:</strong></span>
            <span>${message}</span>
          </div>
        <p>Thank you.</p>
      </div>
    </body>
  </html>
    `;

    const send = await sendMail(to, subject, html);
    if (send) return "OK";
  } catch (error) {
    console.log(error);
  }
};

router.post("/", async (req, res) => {
  try {
    await processData(req);
    res.send({ msg: "Sent" });
  } catch (error) {}
});

module.exports = router;
