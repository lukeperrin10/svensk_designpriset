import * as db from '../db'
import {YearConfig as dbtype} from '../types/dbtypes'
import { getPhase } from '../phase_handler/phase_handler'


export interface YearConfig extends Partial<dbtype> {}

export function getName() {return 'YearConfig'}

export async function get(): Promise<Array<YearConfig>> {
    const year = new Date().getFullYear()
    const phase = await getPhase()
    let query = await db.query('SELECT * FROM yearconfig WHERE year = ?',[year])
    if (query.length === 0) {
        query = await db.query('SELECT * FROM yearconfig WHERE year = ?',[year-1])
    }
    if (query.length > 0) {
        const yearConfig : YearConfig = query[0]
        yearConfig['current_phase'] = phase
        return [yearConfig]
    }
    return query
}

export async function getId(id: number): Promise<YearConfig> {
    const query = await db.query('SELECT * FROM `yearconfig` WHERE `id` = ?', [id])
    return query
}
