import * as nodeMailer from 'nodemailer'
import { REGISTER_ROOT_URL, ADMIN_EMAIL } from '../constants/temp_contants';
import { getRegisterMailContent, getSubjectRegister, getRegisterMailAdminContent, getConfirmVotesContent, getNomineeMailSubject, getNomineeMailContent } from './mail_content';
import { Entry, Profile, Category } from 'dbtypes';
import { get } from '../models/category';
import * as db from '../db'


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
            host: "smtp02.ports.local",
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
    console.log(`gen user:  id: ${id}, secret: ${secret}`)
    return `${REGISTER_ROOT_URL}/edit?id=${id}&secret=${secret}`
}

export function generateAdminLink(id: number, secret: string) {
    console.log(`gen admin:  id: ${id}, secret: ${secret}`)
    return `${REGISTER_ROOT_URL}/edit?id=${id}&secret=${secret}&adm=true`
}

export function generateConfirmVotesLink(secret: string) {
    return `${REGISTER_ROOT_URL}/rostning?confirm=${secret}`
}

export async function sendConfirmVotesMail(email: string, secret: string) {
    await mail(email, 'Bekräfta röst', getConfirmVotesContent(generateConfirmVotesLink(secret)))
}
// WARNING CHANGE EMAIL ADRESS!
export async function sendRegisterEmails(profile: Profile, entries: Entry[], update: boolean, updatedIds: number[]) {
    const categories = await get() as Category[]
    await mail(profile.mail, getSubjectRegister(profile, update), 'text', 
        getRegisterMailContent(false, generateUserLink(profile.id, profile.secret), profile, entries, categories)).catch(err => console.log(err));

    const includedEntries = exludeEntries(updatedIds, entries)

    if (includedEntries.length > 0) {
        console.log('will send admin mail')
        await mail(ADMIN_EMAIL, getSubjectRegister(profile, update), 'text', 
        getRegisterMailAdminContent(false, generateAdminLink(profile.id, profile.secret), profile, entries, categories)).catch(err => console.log(err));
    }
    
}

function exludeEntries(ids: number[], entries: Entry[]) {
    const includedEntries: Entry[] = []
    console.log('ids: '+ids)
    entries.forEach(entry => {
        if (!(ids.indexOf(entry.id) > -1)) {
            includedEntries.push(entry)
        }
    })
    console.log('included entries')
    console.log(includedEntries)
    return includedEntries
}

export async function sendNomineeMailBatch(ids: number[]) {
    for(let i=0; i<ids.length;i++) {
        await sendNomineeMail(ids[i])
    }
}

async function sendNomineeMail(id: number) {
    const query = `SELECT entry_name, p.mail FROM entries e 
    JOIN profiles p on e.profile_id = p.id
    WHERE e.id = ?`
    try {
        const entry = await db.query(query, [id])
        if (entry[0] && entry[0].mail && entry[0].entry_name) {
            await mail(entry[0].mail, getNomineeMailSubject(), getNomineeMailContent(entry[0].entry_name))
        } else {
            console.log('faulty values before sending nominee email')
        }
        
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}


