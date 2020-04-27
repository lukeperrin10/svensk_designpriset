import * as db from '../db'
import {Vote as dbtype} from '../types/dbtypes'
import { getDateTime } from '../helpers'
import { sendConfirmVotesMail } from '../mail_handler/mail_handler'
import { MFError } from '../error'

export interface Vote extends Partial<dbtype> {}

export function getName() {
    return 'Votes'
}

export async function create(vote: Vote): Promise<Vote> {
    try {
        const check = await checkVotes([vote])
        if (check) {
            const insert = await db.query('INSERT INTO votes SET ?', [addDates(vote)])
            const query = await db.query('SELECT * FROM votes WHERE id = ?', [insert.insertId])
            sendConfirmVotesMail(vote.mail, vote.secret)
            return query
        } else {
            const error = new MFError('Client has already voted', 'BAD_REQUEST', 404)
            throw error
        }
    } catch (error) {
        return error
    }
}

async function checkVotes(votes: Vote[]) {
    const check = await db.query('SELECT id FROM votes WHERE mail = ? AND poll_id = ?', [votes[0].mail, votes[0].poll_id])
    return Array.isArray(check) && check.length === 0
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
        const check = await checkVotes(votes)
        if (check) {
            const batchInsert = await db.batchQuery(querys)
            sendConfirmVotesMail(votes[0].mail, votes[0].secret)
            return 'ok'
        } else {
            const error = new MFError('Client has already voted', 'BAD_REQUEST', 404)
            throw error
        }
    } catch (error) {
        return error
    }
}

function addDates(vote: Vote) {
    vote.created = getDateTime()
    vote.modified = getDateTime()
    return vote
}