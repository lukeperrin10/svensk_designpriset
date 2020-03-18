import * as db from '../db'
import {Entry as dbtype, EntryImage} from '../types/dbtypes'
import fs from 'fs-extra'
import { sendRegisterEmails } from '../mail_handler/mail_handler';
import { TEMP_MEDIA_PATH } from '../constants/temp_contants';
import { MEDIA_PATH } from '../constants/temp_contants';
import { TEMP_AVATAR_PATH } from '../constants/temp_contants';
import { AVATAR_PATH, AVATAR_DIR, SOURCE_DIR } from '../constants/temp_contants';
import { getDateTime } from '../helpers';

export interface Entry extends Partial<dbtype> {}

export function getName() {
    return 'Entries'
}

export async function getId(id: number): Promise<Entry> {
    const query = await db.query('SELECT * FROM `entries` WHERE `profile_id` = ?', [id])
    return query
}

export async function create(new_entry: Entry): Promise<Entry> {
    return (await batch([new_entry], false))[0]
}

export async function batchCreate(new_entries: Array<Entry>): Promise<Entry[]> {
    return await batch(new_entries, false)
}

export async function update(entry: Entry): Promise<Entry> {
    return (await batch([entry], true))[0]
}

export async function batchUpdate(entries: Array<Entry>): Promise<Entry[]> {
    return await batch(entries, true)
}

export async function remove(id: number): Promise<Entry> {
    await db.query('DELETE from entry_images where entry_id = ?', [id])
    const remove = await db.query('DELETE FROM entries WHERE ID = ? ', [id])
    return remove
}

async function createImages(entry_id: number, images: string[]) {
    const data: EntryImage[] = images.map(i => ({
        image: `${AVATAR_DIR}/${i}`,
        entry_id: entry_id,
        modified: getDateTime(),
        created: getDateTime(),
        is_featured: false
    }))
    console.log(data)
    moveAvatar(data.map(d => d.image))
    const queries: db.queryObj[] = data.map(d => ({query: 'INSERT INTO entry_images SET ?', args: <any>d}))
    queries.unshift({query: 'DELETE FROM entry_images WHERE entry_id = ?', args: [entry_id]})
    
    try {
        await db.batchQuery(queries)
    } catch (e) {
        throw e
    }
}

async function moveAvatar(filenames: string[]) {
    for (let i = 0; i<filenames.length; i++) {
        const filename = filenames[i].split('/').pop()
        const origin = `${TEMP_AVATAR_PATH}/${filename}`
        const dest = `${AVATAR_PATH}/${filename}`
        if (fs.existsSync(origin)) {
            await fs.move(origin, dest, (err) => {
                if (err) console.error(err)
                console.log('Moved avatar')
            })
        } else {
            console.error("FILE DOES NOT EXIST")
        }
    }
}

async function moveSource(filenames: string[]) {
    for (let i = 0; i<filenames.length; i++) {
        const filename = filenames[i].split('/').pop()
        const origin = `${TEMP_MEDIA_PATH}/${filename}`
        const dest = `${MEDIA_PATH}/${filename}`
        if (fs.existsSync(origin)) {
            await fs.move(origin, dest, (err) => {
                if (err) console.error(err)
                console.log('Moved avatar')
            })
        }
    }
    
}

async function batch(new_entries: Array<Entry>, update: boolean): Promise<Entry[]> {
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

    try {
        const batchInsert: [db.InsertResult] = await db.batchQuery(querys)
        const profileEntries: Entry[] = await db.query('SELECT * FROM `entries` WHERE `profile_id` = ?', [new_entries[0].profile_id])

        //Handle extra images
        for (let i = 0; i < batchInsert.length; i++)  {
            const entry = new_entries[i]
            if (!entry || !entry.entry_images) continue
            const id = batchInsert[i].insertId
            const images = entry.entry_images
            if (images && images.length > 0) {
                await createImages(id, images)
            }

        }

        sendMails(profileEntries, update, updatedEntrieIds, new_entries[0].id)
        const ids = [...updatedEntrieIds, ...batchInsert.map(i => i.insertId)]
        return profileEntries.filter(e => ids.includes(e.id))
    } catch (err) {
        return err
    }
}


function fill_entry(entry: Entry): Entry {
    const new_entry: Entry = {
        profile_id: entry.profile_id,
        entry_name: entry.entry_name, 
        category_id: entry.category_id, 
        designer: entry.designer, 
        illustrator: entry.illustrator || null, 
        leader: entry.leader, 
        format: entry.format || null, 
        size: entry.size || null, 
        customer: entry.customer, 
        webpage: entry.webpage || null, 
        source: entry.source ? `${SOURCE_DIR}/${entry.source}` : null, 
        secret: entry.secret, 
        avatar: entry.avatar ? `${AVATAR_DIR}/${entry.avatar}` : null, 
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
