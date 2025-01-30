const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware setup
app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Configure Nodemailer for email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sonti8747@gmail.com',
        pass: 'upmd ureb vxnx nlui',
    },
});

// Handle POST request from contact form
app.post('/send-message', (req, res) => {
    const { name, email, phone, message } = req.body;

    const mailOptions = {
        from: 'sonti8747@gmail.com',
        to: 'recipient-email@example.com',  // Replace with recipient email
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

// Serve the contact form HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const port = 5000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
