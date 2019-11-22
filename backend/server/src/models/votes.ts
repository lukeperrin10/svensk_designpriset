import * as db from '../db'
import {Vote as dbtype} from '../types/dbtypes'
import { getDateTime } from '../helpers'

export interface Vote extends Partial<dbtype> {}

export function getName() {
    return 'Votes'
}

export async function get(): Promise<Array<Vote>> {
    const query = await db.query('SELECT entry_id, mail FROM votes')
    return query
}

export async function create(vote: Vote): Promise<Vote> {
    const insert = await db.query('INSERT INTO votes SET ?', [addDates(vote)])
    const query = await db.query('SELECT * FROM votes WHERE id = ?', [insert.insertId])
    console.log(query)
    return query
}

function addDates(vote: Vote) {
    vote.created = getDateTime()
    vote.modified = getDateTime()
    return vote
}