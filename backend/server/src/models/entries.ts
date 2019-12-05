import * as db from '../db'
import {Entry as dbtype} from '../types/dbtypes'
import fs from 'fs-extra'
import { sendRegisterEmails } from '../mail_handler/mail_handler';
import { TEMP_MEDIA_PATH } from '../constants/temp_contants';
import { MEDIA_PATH } from '../constants/temp_contants';
import { TEMP_AVATAR_PATH } from '../constants/temp_contants';
import { AVATAR_PATH } from '../constants/temp_contants';
import { getDateTime } from '../helpers';

export interface Entry extends Partial<dbtype> {}

export function getName() {
    return 'Entries'
}

export async function get(): Promise<Array<dbtype>> {
    console.log('ENTRIES GET')
    const query = await db.query('SELECT * FROM entries')
    if (query) console.log('ENTRIES GET query response recieved')
    return query
}

export async function getId(id: number): Promise<Entry> {
    const query = await db.query('SELECT * FROM `entries` WHERE `profile_id` = ?', [id])
    return query
}


export async function create(new_entry: Entry): Promise<Entry> {
    const updateEntry = 'id' in new_entry
    const updatedIds: number[] = []
    console.log('update entry? '+updateEntry)
    console.log(new_entry)
    const post_entry = fill_entry(new_entry)
    if (post_entry.avatar) await moveAvatar([post_entry.avatar])
    if (post_entry.source) await moveSource([post_entry.source])
    const queryString = updateEntry ? 'UPDATE entries SET ? WHERE ID = ?' : 'INSERT INTO entries SET ?'
    const args = updateEntry ? [post_entry, new_entry.id] : [post_entry]
    const insert = await db.query(queryString, args)
    const id = updateEntry ? new_entry.id : insert.insertId
    const query = updateEntry ? await db.query('SELECT * FROM entries WHERE profile_id = ?', [new_entry.profile_id]) : await db.query('SELECT * FROM entries WHERE id = ?', id)
    if (query.length > 0) {
        if('profile_id' in query[0]) {
            if (updateEntry) {
                query.forEach((q: Entry) => {
                    if ('id' in q) updatedIds.push(q.id)
               })
            }
            const id = query[0].profile_id
            const profile = await db.query('SELECT * FROM `profiles` WHERE `id` = ?', [id]) 
            if (profile.length > 0 && 'id' in profile[0]) {
                sendRegisterEmails(profile[0], updateEntry ? query : [query[0]], updateEntry, updatedIds)
            }
        }
    } else {
        console.error('Did not send mail regarding entry: '+new_entry.id)
    }
    
    return query
}

async function moveAvatar(filenames: string[]) {
    for (let i = 0; i<filenames.length; i++) {
        const origin = `${TEMP_AVATAR_PATH}/${filenames[i]}`
        const dest = `${AVATAR_PATH}/${filenames[i]}`
        if (fs.existsSync(origin)) {
            await fs.move(origin, dest, (err) => {
                if (err) console.error(err)
                console.log('Moved avatar')
            })
        }
    }
}

async function moveSource(filenames: string[]) {
    for (let i = 0; i<filenames.length; i++) {
        const origin = `${TEMP_MEDIA_PATH}/${filenames[i]}`
        const dest = `${MEDIA_PATH}/${filenames[i]}`
        if (fs.existsSync(origin)) {
            await fs.move(origin, dest, (err) => {
                if (err) console.error(err)
                console.log('Moved avatar')
            })
        }
    }
    
}

async function batch(new_entries: Array<Entry>, update: boolean): Promise<Entry> {
    const querys: db.queryObj[] = []
    const avatars : string[] = []
    const sources : string[] = []
    const updatedEntrieIds: number[] = []
    new_entries.forEach(new_entry => {
        const updateEntry = 'id' in new_entry
        const entry = fill_entry(new_entry)
        querys.push({
            query: updateEntry ? 'UPDATE entries SET ? WHERE ID = ?' : 'INSERT INTO entries SET ?',
            args: updateEntry ? [entry, entry.id] : [entry]
        })
        if (entry.avatar) avatars.push(entry.avatar)
        if (entry.source) sources.push(entry.source)
        if (updateEntry) updatedEntrieIds.push(entry.id)
    })
    
    await moveAvatar(avatars)
    await moveSource(sources)

    const batchInsert = await db.batchQuery(querys)
    console.log('batchInsert: '+batchInsert)

    const profileEntries = await db.query('SELECT * FROM `entries` WHERE `profile_id` = ?', [new_entries[0].profile_id])
    console.log(updatedEntrieIds)
    sendMails(profileEntries, update, updatedEntrieIds, new_entries[0].id)
    
    return profileEntries
}

export async function batchCreate(new_entries: Array<Entry>): Promise<Entry> {
    return batch(new_entries, false)
}

export async function remove(id: number): Promise<Entry> {
    const remove = await db.query('DELETE FROM entries WHERE ID = ? ', [id])
    return remove
}
export async function update(entry: Entry): Promise<Entry> {
    const update_entry = fill_entry(entry)
    try {
        const update =  await db.query('UPDATE entries SET ? WHERE ID = ?', [update_entry, entry.id])
        return update
    } catch (error) {
        return error
    }
}

export async function batchUpdate(entries: Array<Entry>): Promise<Entry> {
    return batch(entries, true)
}

function fill_entry(entry: Entry): Entry {
    const new_entry: Entry = {
        profile_id: entry.profile_id,
        entry_name: entry.entry_name, 
        category_id: entry.category_id, 
        designer: entry.designer, 
        illustrator: entry.illustrator || '', 
        leader: entry.leader, 
        format: entry.format || '', 
        size: entry.size || '', 
        customer: entry.customer, 
        webpage: entry.webpage || '', 
        source: entry.source || '', 
        secret: entry.secret, 
        avatar: entry.avatar, 
        year: entry.year || `${new Date().getFullYear()}`,
        is_nominated: entry.is_nominated || 0,
        is_winner_gold: entry.is_winner_gold || 0,
        is_winner_silver: entry.is_winner_silver || 0,
        sent_nominee_notification: escapeDate(entry.sent_nominee_notification) || null,
        motivation: entry.motivation || "",
        created: getDateTime(),
        modified: getDateTime()
    }
    if ('id' in entry) new_entry.id = entry.id
    return new_entry
}

// WARNING: Find better solution for formating dates
function escapeDate(date: string) {
    if (date) {
        return date.replace("T", " ").replace("Z", " ")
    } else {
        return undefined
    }
    
}

async function sendMails(profileEntries: Entry[], update: boolean, updateIds: number[], entry_id: number) {
   if (Array.isArray(profileEntries)) {
        console.log('yes')
        if (profileEntries[0] && profileEntries[0].profile_id) {
            const id = profileEntries[0].profile_id
            const profile = await  db.query('SELECT * FROM `profiles` WHERE `id` = ?', [id])
            if (Array.isArray(profile) && profile.length > 0) {
                if ('id' in profile[0]) {
                    const entries : dbtype[] = []
                    profileEntries.forEach((batch: any) => {
                        entries.push(batch)
                    })
                    sendRegisterEmails(profile[0], entries, update, updateIds)
                }
            }
        }
    } else {
        console.error('Did not send mail regarding entry: '+entry_id)
    }
}

// if (Array.isArray(entries)) {
//     if (entries[0] && entries[0].profile_id) {
//         const id = entries[0].profile_id
//         const profile = await  db.query('SELECT * FROM `profiles` WHERE `id` = ?', [id])
//         if (Array.isArray(profile) && profile.length > 0) {
//             if ('id' in profile[0]) {
//                 const entries : dbtype[] = []
//                 entries.forEach((batch: any) => {
//                     entries.push(batch)
//                 })
//                 sendRegisterEmails(profile[0], entries, update, updateIds)
//             }
//         }
//     }
// } else {
//     console.error('Did not send mail regarding entry: '+entry_id)
// }

// if (Array.isArray(profileEntries)) {
    //     console.log('yes')
    //     if (profileEntries[0] && profileEntries[0].profile_id) {
    //         const id = profileEntries[0].profile_id
    //         const profile = await  db.query('SELECT * FROM `profiles` WHERE `id` = ?', [id])
    //         if (Array.isArray(profile) && profile.length > 0) {
    //             if ('id' in profile[0]) {
    //                 const entries : dbtype[] = []
    //                 profileEntries.forEach((batch: any) => {
    //                     entries.push(batch)
    //                 })
    //                 sendRegisterEmails(profile[0], entries, update, updatedEntrieIds)
    //             }
    //         }
    //     }
    // } else {
    //     console.error('Did not send mail regarding entry: '+new_entries[0].id)
    // }