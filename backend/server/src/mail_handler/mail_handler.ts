import * as nodeMailer from 'nodemailer'
import { REGISTER_ROOT_URL, ADMIN_EMAIL } from '../constants/temp_contants';
import { getRegisterMailContent, getSubjectRegister, getRegisterMailAdminContent } from './mail_content';
import { Entry, Profile } from 'dbtypes';


// WARNING : Change user and pass!
async function mail(to: string, subject: string, message: string, html?: string) {

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
            console.log('Did send mail!')
        }
    })
}

export function generateUserLink(id: number, secret: string) {
    console.log(`gen user:  id: ${id}, secret: ${secret}`)
    return `${REGISTER_ROOT_URL}/edit?id=${id}&secret=${secret}`
}

export function generateAdminLink(id: number, secret: string) {
    console.log(`gen admin:  id: ${id}, secret: ${secret}`)
    return `${REGISTER_ROOT_URL}/edit?id=${id}&secret=${secret}&adm=true`
}
// WARNING CHANGE EMAIL ADRESS!
export async function sendRegisterEmails(profile: Profile, entries: Entry[], update: boolean) {
    await mail(profile.mail, getSubjectRegister(profile, update), 'text', 
        getRegisterMailContent(false, generateUserLink(profile.id, profile.secret), profile, entries)).catch(err => console.log(err));

    await mail(ADMIN_EMAIL, getSubjectRegister(profile, update), 'text', 
        getRegisterMailAdminContent(false, generateAdminLink(profile.id, profile.secret), profile, entries)).catch(err => console.log(err));
}


