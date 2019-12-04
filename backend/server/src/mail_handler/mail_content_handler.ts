import * as db from '../db'
import {MailContent, MailVar, Entry, Profile, MailType} from '../types/dbtypes'
import {generateConfirmVotesLink, generateUserLink} from './mail_handler'
import { dateTypes, getDateTime } from '../helpers'
import { isArray } from 'util'
import { getEntryContent, getProfileContent, addButton } from './mail_content'

enum MailVarValues {
    amount_of_entries = 'amount_of_entries',
    price_per_entry = 'price_per_entry',
    register_edit_link = 'register_edit_link',
    profile = 'profile',
    entries_list = 'entries_list',
    register_add_link = 'register_add_link',
    entry_name_with_category = 'entry_name_with_category',
    award_date = 'award_date',
    award_place = 'award_place',
    vote_confirm_link = 'vote_confirm_link'
}

export async function getMailContent(mailType: MailType, secret?:string, profile?: Profile, entries?: Entry[]): Promise<MailContent> {
    try {
        const query = await db.query('SELECT * FROM `mails` WHERE type = ?', [mailType])
        const mailContent : MailContent = query[0]
        mailContent.content = await replaceVars(mailContent.content, secret, profile, entries)
        return mailContent
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function replaceVars(content: string, secret?:string, profile?: Profile, entries?: Entry[]) {
    const findOne = /\[#(.*?)\]/i
    const findAll = /\[#(.*?)\]/gi

    const getVar = async (reg: any) => {
        const err = `${reg[0]} not found]]`
        switch (reg[1]) {
            case MailVarValues.vote_confirm_link:
                if (secret) return `<a href="${generateConfirmVotesLink(secret)}">Klicka här</a>`
                return 'Valid input missing (type=secret)'
            case MailVarValues.award_place:
                const place = await db.query('SELECT award_place FROM yearconfig WHERE year = ?', [getDateTime(dateTypes.YEAR)])
                if (isArray(place) && place.length > 0 && place[0].award_place !== undefined) return place[0].award_place
                return err
            case MailVarValues.award_date:
                const award_date = await db.query('SELECT award_date FROM yearconfig WHERE year = ?', [getDateTime(dateTypes.YEAR)])
                if (isArray(award_date) && award_date.length > 0 && award_date[0].award_date !== undefined) {
                    return getDateTime(dateTypes.DAY_AND_MONTH, award_date[0].award_date)
                } 
                return err
            case MailVarValues.amount_of_entries:
                if (entries) return entries.length
                return err
            case MailVarValues.entries_list:
                if (entries) return getEntryContent(entries)
                return err
            case MailVarValues.entry_name_with_category:
                return
            case MailVarValues.price_per_entry:
                const price = await db.query('SELECT price FROM yearconfig WHERE year = ?', [getDateTime(dateTypes.YEAR)])
                if (isArray(price) && price.length > 0 && price[0].price !== undefined) return `${place[0].price} :-`
                return err
            case MailVarValues.profile:
                if (profile) return getProfileContent(profile)
                return err
            case MailVarValues.register_add_link:
                if (profile) addButton(generateUserLink(profile.id, profile.secret))
                return err
            case MailVarValues.register_edit_link:
                if (profile) generateUserLink(profile.id, profile.secret)
                return err
            default:
                return 'No valid regex input'
        }
    }
    
    while (content.match(findAll) !== null) {
        const replacement = await getVar(content.match(findOne))
        const res = content.replace(findOne, replacement)
        content = res
    }

    return content
}