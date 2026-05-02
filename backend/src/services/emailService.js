import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter for sending emails
const createTransporter = () => {
    // For Gmail, you'll need to use an App Password
    // Go to: Google Account > Security > 2-Step Verification > App passwords
    return nodemailer.createTransporter({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER || 'niyonizeyemerci@gmail.com',
            pass: process.env.EMAIL_PASS || 'your-app-password-here' // You need to set this in .env
        }
    });
};

export const sendContactEmail = async (contactData) => {
    try {
        const transporter = createTransporter();
        
        const { name, email, subject, message } = contactData;
        
        const mailOptions = {
            from: process.env.EMAIL_USER || 'niyonizeyemerci@gmail.com',
            to: 'niyonizeyemerci@gmail.com', // Your email where you want to receive messages
            subject: `Portfolio Contact: ${subject}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
                <hr>
                <p><em>Sent from your portfolio website</em></p>
            `,
            replyTo: email // Allow you to reply directly to the sender
        };
        
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: error.message };
    }
};

export default { sendContactEmail };
