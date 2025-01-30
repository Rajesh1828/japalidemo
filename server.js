const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (CSS, JS, Images)
app.use(express.static(__dirname));  // Since server.js is inside "Public"

// Serve index.html when visiting the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html' , 'contact.html', 'About.html', 'Collection.html' ));
});

// Contact Form - Send Email
app.post('/send-message', (req, res) => {
    const { name, email, phone, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sonti8747@gmail.com',  // Your email address
            pass: 'upmd ureb vxnx nlui',  // Your Gmail App password
        },
    });

    const mailOptions = {
        from: 'sonti8747@gmail.com',
        to: 'recipient@example.com',  // Replace with actual recipient email
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
            return res.status(500).json({ success: false, message: 'Failed to send email.' });
        }
        console.log('Email sent:', info.response);
        return res.json({ success: true, message: 'Message sent successfully!' });
    });
});

// Start server
const port = 5000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
