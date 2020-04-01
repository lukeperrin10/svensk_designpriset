import * as nodeMailer from 'nodemailer'
import { REGISTER_ROOT_URL, ADMIN_EMAIL } from '../constants/temp_contants';
import { Entry, Profile, MailType } from '../types/dbtypes';
import * as db from '../db'
import {getMailContent} from './mail_content_handler'


// WARNING : Change user and pass!
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
            // host: "smtp02.ports.local",
            host: 'mail03.portsit.se',
            port: 25
        })
    }

    const content = {
        from: '"Svenska Designpriset" <info@designpriset.se>',
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
    return `${REGISTER_ROOT_URL}/edit?id=${id}&secret=${secret}`
}

export function generateAdminLink(id: number, secret: string) {
    return `${REGISTER_ROOT_URL}/edit?id=${id}&secret=${secret}&adm=true`
}

export function generateConfirmVotesLink(secret: string) {
    return `${REGISTER_ROOT_URL}/rostning?confirm=${secret}`
}

export async function sendConfirmVotesMail(email: string, secret: string) {
    const mailContent = await getMailContent(MailType.VOTE_CONFIRM, secret = secret)
    await mail(email, mailContent.subject, '', mailContent.content)
}

export async function sendRegisterEmails(profile: Profile, entries: Entry[], update: boolean, updatedIds: number[]) {
    if (updatedIds.length === 0) {
        const mailContent = await getMailContent(MailType.ENTRY_CONFIRM, undefined, profile, entries)
        await mail(profile.mail, mailContent.subject, mailContent.content, mailContent.content)
        const adminMailContent = await getMailContent(MailType.ENTRY_CONFIRM_ADMIN, undefined, profile, entries)
        await mail(ADMIN_EMAIL, adminMailContent.subject, adminMailContent.content, adminMailContent.content)
    } else {
        const includedEntries = exludeEntries(updatedIds, entries)
        const mailContent = await getMailContent(MailType.ENTRY_UPDATE, undefined, profile, includedEntries)
        await mail(profile.mail, mailContent.subject, mailContent.content, mailContent.content)
        const adminMailContent = await getMailContent(MailType.ENTRY_UPDATE_ADMIN, undefined, profile, includedEntries)
        await mail(ADMIN_EMAIL, adminMailContent.subject, adminMailContent.content, adminMailContent.content)
    }
}

function exludeEntries(ids: number[], entries: Entry[]) {
    const includedEntries: Entry[] = []
    entries.forEach(entry => {
        if (ids.indexOf(entry.id) !== -1) {
            includedEntries.push(entry)
        }
    })
    return includedEntries
}

export async function sendNomineeMailBatch(ids: number[]) {
    if (Array.isArray(ids)) {
        for(let i=0; i<ids.length;i++) {
            await sendNomineeMail(ids[i])
        }
    }
    else {
        await sendNomineeMail(ids)
    }
}

async function sendNomineeMail(id: number) {
    const query = `SELECT * FROM entries WHERE id = ?`
    const profileQuery = `SELECT * FROM profiles WHERE id = ?`
    
    try {
        const entry = await db.query(query, [id])
        if (entry[0] && entry[0].entry_name) {
            const profile = await db.query(profileQuery, entry[0].profile_id)
            const mailContent = await getMailContent(MailType.NOMINEE, undefined, profile[0], entry)
            await mail(profile[0].mail, mailContent.subject, mailContent.content, mailContent.content)
        } else {
            console.log('faulty values before sending nominee email')
        }
        
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}


