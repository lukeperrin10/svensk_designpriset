import * as db from '../db'
import {Content as dbtype} from '../types/dbtypes'
import { getPhase } from '../phase_handler/phase_handler'

export interface Content extends Partial<dbtype> {}

export function getName() {
    return 'Content'
}

export async function get(): Promise<Array<Content>> {
    const phase = await getPhase()
    const select = "SELECT title, content, image, 'order', ct.name as template FROM content c "
    const joinPhases = "JOIN content_phases cps ON c.id = cps.content_id "
    const joinPhase = "JOIN content_phase cp ON cps.contentphase_id = cp.id "
    const joinTemplate = "JOIN content_template ct ON c.template_id = ct.id "
    const where = "WHERE cp.name = ?";
    const query = await db.query(`${select}${joinPhases}${joinPhase}${joinTemplate}${where}`,[phase])
    return query
}

