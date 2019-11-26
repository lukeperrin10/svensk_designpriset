import * as db from '../db'
import {ConfirmedVote as dbtype} from '../types/dbtypes'
import { getDateTime } from '../helpers'

export interface ConfirmedVote extends Partial<dbtype> {}

export function getName() {
    return 'Confirmed Votes'
}

export async function create(vote: ConfirmedVote) : Promise<ConfirmedVote> {
    try {
        const confirmQuery = await db.query('UPDATE votes SET verified = ? WHERE `secret` = ?', [getDateTime(), vote.secret])
        return confirmQuery
    } catch (error) {
        return error
    }    
}

