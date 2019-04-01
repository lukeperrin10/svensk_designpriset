import * as db from '../db'
import {Winner as dbtype} from '../types/dbtypes'
import { Request } from 'express';


export interface Winner extends Partial<Winner> {}

export function getName() {
    return 'Winners'
}

// export async function get(id: string): Promise<Array<Winner>> {
//     console.log('get winner')
//     console.log(id)
//     const query = await db.query('SELECT * FROM winner_entries')
//     return query
// }

export async function get(args: Request['query']): Promise<Array<dbtype>> {
    console.log('winner get')
    console.log(args.query)
    const query = await db.query('SELECT * FROM `winner_entries` WHERE `id` = ?', args.id)
    return query
}