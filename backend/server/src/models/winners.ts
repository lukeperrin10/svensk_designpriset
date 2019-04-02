import * as db from '../db'
import {Winner as dbtype} from '../types/dbtypes'
import { Request } from 'express';


export interface Winner extends Partial<Winner> {}

export function getName() {
    return 'Winners'
}

export async function get(): Promise<Array<Winner>> {
    console.log('get winner')
    const query = await db.query('SELECT * FROM winner_entries')
    return query
}

export async function getId(id: number): Promise<Array<Winner>> {
    console.log('winner get')
    console.log(id)
    const query = await db.query('SELECT * FROM `winner_entries` WHERE `id` = ?', [id])
    return query
}