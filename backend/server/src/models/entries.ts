import * as db from '../db'
import {Entry as dbtype} from '../types/dbtypes'

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
    const insert = db.query('INSERT INTO entries SET ?', [post_entry])
    console.log(insert)
    return insert
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
    return batchSelect
}

export async function update(entry: Entry): Promise<Entry> {
    const update_entry = create_entry(entry)
    const update = await db.query('UPDATE entries SET ? WHERE ID = ?', [update_entry, entry.id])
    return update
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
        year: entry.year,
        is_nominated: entry.is_nominated || 0,
        is_winner_gold: entry.is_winner_gold || 0,
        is_winner_silver: entry.is_winner_silver || 0,
        sent_nominee_notification: entry.sent_nominee_notification || "1000-01-01",
        motivation: entry.motivation || "",
    }
    return new_entry
}