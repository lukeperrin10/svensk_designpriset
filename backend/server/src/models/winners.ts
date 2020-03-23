import * as db from '../db'
import {Winner as dbtype} from '../types/dbtypes'
import { getPhase, PHASES, asserArgumentIsPhase } from '../phase_handler/phase_handler'


export interface Winner extends Partial<dbtype> {
    
}

export function getName() {
    return 'Winners'
}

async function addImages(winners: Winner[]) {
    for (let i = 0; i < winners.length; i++) {
        if (!winners[i].id) continue
        winners[i].entry_images = await db.query('SELECT image, is_featured FROM entry_images WHERE entry_id = ?', [winners[i].id])
    }
    return winners
}

export async function get(): Promise<Array<Winner>> {
    const winners = (<Winner[]>await db.query('SELECT * FROM winner_view WHERE is_winner_gold = 1'))
    return await addImages(winners)
}

export async function getId(id: number): Promise<Winner> {
    const winners = (<Winner[]>await db.query('SELECT * FROM `entries` WHERE `id` = ?', [id]))
    return (await addImages(winners))[0]
}

export async function getYear(year: string, phase?: string) {
    const currentPhase = asserArgumentIsPhase(phase) ? phase : await getPhase()
    const todayYear = new Date().getFullYear()
    const argYear = new Date(year).getFullYear()
    const queryYear = todayYear === argYear && currentPhase !== PHASES.FIVE ? argYear - 1 : year

    const winners = (<Winner[]>await db.query('SELECT * FROM winner_view WHERE year = ? AND (is_winner_gold = 1 OR is_winner_silver = 1)', [queryYear]))
    return await addImages(winners)
}