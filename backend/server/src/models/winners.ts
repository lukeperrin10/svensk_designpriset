import * as db from '../db'
import {Winner as dbtype} from '../types/dbtypes'


export interface Winner extends Partial<Winner> {}

export function getName() {
    return 'Winners'
}

export async function get(): Promise<Array<Winner>> {
    console.log('get winner')
    const query = await db.query('SELECT * FROM winner_entries WHERE id = ?', ['29731'])
    console.log(query)
    return query
}