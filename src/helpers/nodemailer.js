import nodemailer from 'nodemailer';


async function sendMail(emailId, subject, body) {

    try {

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'joshuaashvinth@gmail.com',
                pass: process.env.GMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        let mailOption = {
            from: 'Service 4 You <joshuaashvinth@gmail.com>',
            to: emailId,
            subject: subject,
            html: body,
        }

        await transporter.sendMail(mailOption)

    } catch (error) {
        console.log(error);
    }
}

export { sendMail };