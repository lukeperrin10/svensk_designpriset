import * as db from '../db'
import {Entry as dbtype} from '../types/dbtypes'
import fs from 'fs-extra'
import { sendRegisterEmails } from '../mail_handler/mail_handler';

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
    if (post_entry.avatar) await moveAvatar(post_entry.avatar)
    if (post_entry.source) await moveSource(post_entry.source)
    const insert = db.query('INSERT INTO entries SET ?', [post_entry])
    console.log(insert)
    // const profile = await db.query('SELECT * FROM `profiles` WHERE `id` = ?', [new_entry.profile_id])   
    // const entries = await db.query('SELECT * FROM `entries` WHERE `profile_id` = ?', [new_entry.profile_id])
    // sendRegisterEmails(profile, entries, false)
    return insert
}

async function moveAvatar(filename: string) {
    const origin = `./upload_assets/temp_avatars/${filename}`
    const dest = `./upload_assets/avatars/${filename}`
    return fs.move(origin, dest, (err) => {
        if (err) console.error(err)
        console.log('Moved avatar')
    })
}

async function moveSource(filename: string) {
    const origin = `./upload_assets/temp_media/${filename}`
    const dest = `./upload_assets/media/${filename}`
    return fs.move(origin, dest, (err) => {
        if (err) console.error(err)
        console.log('Moved avatar')
    })
}

export async function batchCreate(new_entries: Array<Entry>): Promise<Entry> {
    const querys: db.queryObj[] = []
    new_entries.forEach(entry => {
        querys.push({
            query: 'INSERT INTO entries SET ?',
            args: [create_entry(entry)]
        })
    })
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
    // const profile = await  db.query('SELECT * FROM `profiles` WHERE `id` = ?', [new_entries[0].profile_id])   
    // const entries = await  db.query('SELECT * FROM `entries` WHERE `profile_id` = ?', [new_entries[0].profile_id])
    // sendRegisterEmails(profile, entries, false)
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