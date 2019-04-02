import * as db from '../db'
import {Entry as dbtype} from '../types/dbtypes'
import { Request } from 'express';


export interface Entry extends Partial<Entry> {}

export function getName() {
    return 'Entries'
}

export async function get(): Promise<Array<dbtype>> {
    console.log('Entries get')
    const query = await db.query('SELECT * FROM entries')
    return query
}

export async function getId(id: number): Promise<Array<Entry>> {
    console.log('Entries get')
    console.log(id)
    const query = await db.query('SELECT * FROM `entries` WHERE `id` = ?', [id])
    return query
}