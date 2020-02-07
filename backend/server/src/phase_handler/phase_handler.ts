import * as db from '../db'

export enum PHASES {
    ONE = 'phase_one',
    TWO = 'phase_two',
    THREE = 'phase_three',
    FOUR = 'phase_four',
    FIVE = 'phase_five',
}

export function asserArgumentIsPhase(phase: string) {
    let isPhase = false
    Object.values(PHASES).forEach(val => {
        if (val === phase) isPhase = true
    })
    return isPhase
}

export async function getPhase(): Promise<string> {
    const date = new Date()
    const year = date.getFullYear()
    const query = await db.query('SELECT * FROM yearconfig WHERE year = ?', [year])
    const res = query[0]

    const p1 = new Date(res.phase_1_start)
    const p2 = new Date(res.phase_2_start)
    const p3 = new Date(res.phase_3_start)
    const p4 = new Date(res.phase_4_start)
    const p5 = new Date(res.phase_5_start)

    if (date > p1 && date < p2) {
        return PHASES.ONE
    }
    if (date > p2 && date < p3) {
        return PHASES.TWO
    }
    if (date > p3 && date < p4) {
        return PHASES.THREE
    }
    if (date > p4 && date < p5) {
        return PHASES.FOUR
    }
    if (date > p5) {
        return PHASES.FIVE
    }
    else {
        return PHASES.FIVE
    }
    
    
}