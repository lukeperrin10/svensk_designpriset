import * as db from '../db'
import {YearConfig as dbtype} from '../types/dbtypes'


export interface YearConfig extends Partial<dbtype> {}

export function getName() {return 'YearConfig'}

export async function get(): Promise<Array<YearConfig>> {
    const year = new Date().getFullYear()
    const query = await db.query('SELECT * FROM yearconfig WHERE year = ?',[year])
    if (query.length === 0) {
        const queryLastYear = await db.query('SELECT * FROM yearconfig WHERE year = ?',[year-1])
        return queryLastYear
    }
    return query
}

export async function getId(id: number): Promise<YearConfig> {
    const query = await db.query('SELECT * FROM `yearconfig` WHERE `id` = ?', [id])
    return query
}
