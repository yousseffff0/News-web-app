const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const Mailgen = require("mailgen");

dotenv.config();

const sendMail = async (userEmail, emailContent) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.GMAIL_DEVICE_PASSWORD,
      },
    });

    const mailGenerator = new Mailgen({
      product: {
        name: "Mailgen",
        link: "https://mailgen.js/",
      },
    });

    const emailBody = mailGenerator.generate(emailContent);
    const message = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: "Account registered",
      html: emailBody,
    };

    const result = await transporter.sendMail(message);
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = sendMail;