import * as db from '../db'
import {Poll as dbtype, Poll} from '../types/dbtypes'
import { getDateTime } from '../helpers'
import { Entry } from '../types/dbtypes'


interface PollCategories {
    [key:number]: {
        category_name: string
        entries: Entry[]
    }
}
interface PollCollection {
    id: number,
    name: string,
    stop: string,
    categories: PollCategories | undefined
}

export interface Polls extends Partial<PollCollection> {}

interface PollQuery  {
    poll_id: number,
    name: string,
    stop: string,
    category_id: number,
    category_name: string
}



export function getName() {
    return 'Polls'
}

export async function get(): Promise<Array<Polls>> {
    const today = getDateTime()
    try {
        let query = 'SELECT p.id as poll_id, p.name, p.stop, pc.category_id, c.name as category_name '
        // query += 'e.id, e.entry_name, e.source, e.designer '
        // query += 'e.* '
        // query += 'GROUP_CONCAT(e.*) AS entry '
        query += 'FROM `polls` p '
        query += 'JOIN `polls_categories` pc on p.id = pc.poll_id '
        query += 'JOIN `categories` c on pc.category_id = c.id '
        // query += 'JOIN `entries` e on e.category_id = pc.category_id '
        query += 'WHERE p.start < ? AND p.stop > ? '
        // query += 'GROUP BY p.id '
        const pollWithCategories : PollQuery[] = await db.query( query, [today, today])
        const entryQuerys : db.queryObj[] = []
        pollWithCategories.forEach(poll => {
            entryQuerys.push({
                query: 'SELECT * from entries WHERE `category_id`= ?',
                args: [poll.category_id]
            })
        })
        const entryQuery : Entry[][] = await db.batchQuery(entryQuerys)

        const result = assemblePoll(entryQuery, pollWithCategories)
        
        return [result]

    } catch (error) {
        return error
    }
    
}

function assemblePoll(cats: Entry[][], polls: PollQuery[]) {

    const catNames : {[key:number]: string} = {}
    polls.forEach(poll => {
        catNames[poll.category_id] = poll.category_name
    })
    const result : PollCollection = {
        id: polls[0].poll_id,
        name: polls[0].name,
        stop: polls[0].stop,
        categories: undefined
    }
    // result.id = polls[0].poll_id
    cats.forEach(cat => {
        console.log(cat)
        cat.forEach(entry => {
            console.log(entry.category_id)
            if (result.categories === undefined) {
                result.categories = {
                    [entry.category_id]: {
                        category_name: getCatName(entry.category_id, catNames),
                        entries: [entry]
                    }
                }
            } else if (entry.category_id in result.categories) {
                result.categories[entry.category_id].entries.push(entry)
            } else {
                result.categories[entry.category_id] = {
                    category_name: getCatName(entry.category_id, catNames),
                    entries: [entry]
                }
            }
            console.log(result)
        })
    })
    return result
}

function getCatName(id: number, cats:{[key:number]:string}) {
    if (id in cats) return cats[id]
    return 'Kategori'
}

// SELECT p.id, pc.category_id FROM polls p JOIN polls_categories pc on p.id = pc.poll_id
// WHERE p.start < "2019-11-25 00:00:00" AND p.stop > "2019-11-25 00:00:00";