import * as db from '../db'
import {Winner as dbtype} from '../types/dbtypes'
import { getPhase, PHASES, asserArgumentIsPhase } from '../phase_handler/phase_handler'


export interface Winner extends Partial<dbtype> {
    
}

export function getName() {
    return 'Winners'
}

export async function get(): Promise<Array<Winner>> {
    console.log('get winner')
    const query = await db.query('SELECT * FROM winner_view WHERE is_winner_gold = 1')
    return query
}

export async function getId(id: number): Promise<Winner> {
    console.log('winner get')
    console.log(id)
    const query = await db.query('SELECT * FROM `entries` WHERE `id` = ?', [id])
    return query
}

export async function getYear(year: string, phase?: string) {
    const currentPhase = asserArgumentIsPhase(phase) ? phase : await getPhase()
    console.log(currentPhase)
    const todayYear = new Date().getFullYear()
    const argYear = new Date(year).getFullYear()
    let queryYear
    //WARNING: Need more logic???
    if (todayYear === argYear && currentPhase !== PHASES.FIVE) queryYear = argYear-1
    else queryYear = year
    console.log(queryYear)
    const query = await db.query('SELECT * FROM winner_view WHERE year = ? AND is_winner_gold = 1', [queryYear])
    
    return query
}