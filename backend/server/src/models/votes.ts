import * as db from '../db'
import {Vote as dbtype} from '../types/dbtypes'
import { getDateTime } from '../helpers'
import { sendConfirmVotesMail } from '../mail_handler/mail_handler'

export interface Vote extends Partial<dbtype> {}

export function getName() {
    return 'Votes'
}

export async function get(): Promise<Array<Vote>> {
    const query = await db.query('SELECT entry_id, mail FROM votes')
    return query
}

export async function create(vote: Vote): Promise<Vote> {
    try {
        const insert = await db.query('INSERT INTO votes SET ?', [addDates(vote)])
        const query = await db.query('SELECT * FROM votes WHERE id = ?', [insert.insertId])
        console.log(query)
        sendConfirmVotesMail(vote.mail, vote.secret)
        return query
    } catch (error) {
        return error
    }
}

export async function batchCreate(votes: Vote[]) : Promise<string> {
    const querys: db.queryObj[] = []
    votes.forEach(vote => {
        querys.push({
            query: 'INSERT INTO votes SET ?',
            args: [addDates(vote)]
        })
    })
    try {
        const batchInsert = await db.batchQuery(querys)
        sendConfirmVotesMail(votes[0].mail, votes[0].secret)
        console.log(batchInsert)
    } catch (error) {
        return error
    }
    return 'ok'
}

function addDates(vote: Vote) {
    vote.created = getDateTime()
    vote.modified = getDateTime()
    return vote
}