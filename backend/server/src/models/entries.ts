import * as db from '../db'
import {Entry as dbtype} from '../types/dbtypes'
import fs from 'fs-extra'
import { sendRegisterEmails } from '../mail_handler/mail_handler';
import { TEMP_MEDIA_PATH } from '../constants/temp_contants';
import { MEDIA_PATH } from '../constants/temp_contants';
import { TEMP_AVATAR_PATH } from '../constants/temp_contants';
import { AVATAR_PATH } from '../constants/temp_contants';

export interface Entry extends Partial<dbtype> {}

export function getName() {
    return 'Entries'
}

export async function get(): Promise<Array<dbtype>> {
    console.log('Entries get')
    const query = await db.query('SELECT * FROM entries')
    return query
}

export async function getId(id: number): Promise<Entry> {
    console.log('Entries get')
    console.log(id)
    const query = await db.query('SELECT * FROM `entries` WHERE `profile_id` = ?', [id])
    return query
}

export async function create(new_entry: Entry): Promise<Entry> {
    const post_entry = create_entry(new_entry)
    if (post_entry.avatar) await moveAvatar([post_entry.avatar])
    if (post_entry.source) await moveSource([post_entry.source])
    const insert = await db.query('INSERT INTO entries SET ?', [post_entry])
    const query = await db.query('SELECT * FROM entries WHERE id = ?', insert.insertId)
    if (query.length > 0) {
        if('profile_id' in query[0]) {
            const id = query[0].profile_id
            const profile = await db.query('SELECT * FROM `profiles` WHERE `id` = ?', [id]) 
            if (profile.length > 0 && 'id' in profile[0]) {
                sendRegisterEmails(profile[0], [query[0]], false)
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
        await fs.move(origin, dest, (err) => {
            if (err) console.error(err)
            console.log('Moved avatar')
        })
    }
}

async function moveSource(filenames: string[]) {
    for (let i = 0; i<filenames.length; i++) {
        const origin = `${TEMP_MEDIA_PATH}/${filenames[i]}`
        const dest = `${MEDIA_PATH}/${filenames[i]}`
        await fs.move(origin, dest, (err) => {
            if (err) console.error(err)
            console.log('Moved avatar')
        })
    }
    
}

export async function batchCreate(new_entries: Array<Entry>): Promise<Entry> {
    const querys: db.queryObj[] = []
    const avatars : string[] = []
    const sources : string[] = []
    new_entries.forEach(new_entry => {
        const entry = create_entry(new_entry)
        querys.push({
            query: 'INSERT INTO entries SET ?',
            args: [entry]
        })
        if (entry.avatar) avatars.push(entry.avatar)
        if (entry.source) sources.push(entry.source)
    })
    
    await moveAvatar(avatars)
    await moveSource(sources)

    const batchInsert = await db.batchQuery(querys)
    const responseQuerys: db.queryObj[] = []
    batchInsert.forEach((insert: any) => {
        if (insert.insertId) {
            responseQuerys.push({
                query: 'SELECT * FROM `entries` WHERE `id` = ?',
                args: [insert.insertId]
            })
        }
    })
    const batchSelect = await db.batchQuery(responseQuerys)
    console.log(batchSelect[0][0])
    if (Array.isArray(batchSelect) && Array.isArray(batchSelect[0])) {
        if (batchSelect[0][0] && batchSelect[0][0].profile_id) {
            const id = batchSelect[0][0].profile_id
            const profile = await  db.query('SELECT * FROM `profiles` WHERE `id` = ?', [id])
            if (Array.isArray(profile) && profile.length > 0) {
                if ('id' in profile[0]) {
                    const entries : dbtype[] = []
                    batchSelect.forEach(batch => {
                        entries.push(batch[0])
                    })
                    sendRegisterEmails(profile[0], entries, false)
                }
            }
        }
    } else {
        console.error('Did not send mail regarding entry: '+new_entries[0].id)
    }
    
    return batchSelect
}

export async function update(entry: Entry): Promise<Entry> {
    const update_entry = create_entry(entry)
    try {
        const update =  await db.query('UPDATE entries SET ? WHERE ID = ?', [update_entry, entry.id])
        return update
    } catch (error) {
        return error
    }
}
function create_entry(entry: Entry): Entry {
    const new_entry: Entry = {
        profile_id: entry.profile_id,
        entry_name: entry.entry_name, 
        category: entry.category, 
        designer: entry.designer, 
        illustrator: entry.illustrator, 
        leader: entry.leader, 
        format: entry.format, 
        size: entry.size, 
        customer: entry.customer, 
        webpage: entry.webpage, 
        source: entry.source, 
        secret: entry.secret, 
        avatar: entry.avatar, 
        year: entry.year || `${new Date().getFullYear()}`,
        is_nominated: entry.is_nominated || 0,
        is_winner_gold: entry.is_winner_gold || 0,
        is_winner_silver: entry.is_winner_silver || 0,
        sent_nominee_notification: entry.sent_nominee_notification || "1000-01-01",
        motivation: entry.motivation || "",
    }
    return new_entry
}