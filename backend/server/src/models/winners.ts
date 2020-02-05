import * as db from '../db'
import {Winner as dbtype} from '../types/dbtypes'


export interface Winner extends Partial<dbtype> {
    
}

export function getName() {
    return 'Winners'
}

export async function get(): Promise<Array<Winner>> {
    console.log('get winner')
    const query = await db.query('SELECT * FROM entries WHERE is_winner_gold = 1')
    return query
}

export async function getId(id: number): Promise<Winner> {
    console.log('winner get')
    console.log(id)
    const query = await db.query('SELECT * FROM `entries` WHERE `id` = ?', [id])
    return query
}

export async function getYear(year: string) {
    const query = await db.query('SELECT * FROM entries WHERE year = ? AND is_winner_gold = 1', [year])
    console.log(year)
    return query
}