import * as nodeMailer from 'nodemailer'

export async function mail(to: string, subject: string, message: string, html?: string) {

    let transporter

    if (process.env.NODE_ENV === 'development') {
        transporter = nodeMailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'viola.morissette88@ethereal.email',
                pass: 'sxUZKrPQQmjfxYRddD'
            }
        })
    } else {
        transporter = nodeMailer.createTransport({
            host: "smtp02.ports.local",
            port: 587,
            secure: false
        })
    }

    const content = {
        from: '"Designpriset (no-reply)" <no-reply@designpriset.se>',
        to: to,
        subject: subject,
        text: message,
        html: html || ''
    }

    await transporter.sendMail(content, (err, res) => {
        if (err) {
            console.log("Error type: ", err.name)
            console.log("SMTP log: ", err.message)
        } else {
            console.log(res)
        }
    })
}


