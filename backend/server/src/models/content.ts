import * as db from '../db'
import {Content as dbtype} from '../types/dbtypes'

enum PHASES {
    ONE = 'phase_one',
    TWO = 'phase_two',
    THREE = 'phase_three',
    FOUR = 'phase_four',
    FIVE = 'phase_five',
}

export interface Content extends Partial<dbtype> {}

export function getName() {
    return 'Content'
}

export async function get(): Promise<Array<Content>> {
    const year = await getPhase()
    console.log(year)
    const select = "SELECT title, content, image, 'order', ct.name as template FROM content c "
    const joinPhases = "JOIN content_phases cps ON c.id = cps.content_id "
    const joinPhase = "JOIN content_phase cp ON cps.contentphase_id = cp.id "
    const joinTemplate = "JOIN content_template ct ON c.template_id = ct.id "
    const where = "WHERE cp.name = ?";
    const query = await db.query(`${select}${joinPhases}${joinPhase}${joinTemplate}${where}`,[year])
    return query
}

// SELECT * from content c JOIN content_phases cps ON c.id = cps.content_id JOIN content_phase cp ON cps.contentphase_id = cp.id WHERE cp.name = "phase_one";

async function getPhase(): Promise<string> {
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