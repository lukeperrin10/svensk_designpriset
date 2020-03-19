import * as db from '../db'
import {Poll as dbtype, Poll, EntryImage, EntryImages} from '../types/dbtypes'
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
        const query = `
        SELECT p.id as poll_id, p.name, p.stop, pc.category_id, c.name as category_name, c.type as category_type
        FROM polls p 
        JOIN polls_categories pc on p.id = pc.poll_id
        JOIN categories c on pc.category_id = c.id
        WHERE p.start < ? AND p.stop > ?`
        const pollWithCategories : PollQuery[] = await db.query( query, [today, today])
        const entryQuerys : db.queryObj[] = []
        pollWithCategories.forEach(poll => {
            entryQuerys.push({
                query: `
                SELECT e.*, p.company FROM entries e
                JOIN profiles p ON e.profile_id = p.id
                WHERE e.category_id= ?
                `,
                args: [poll.category_id]
            })
        })
        const entryQuery : Entry[][] = await db.batchQuery(entryQuerys)
        
        //Potential bottleneck, could be rewritten as a join
        const entriesWithImages = await Promise.all(entryQuery.map(async es => 
            await Promise.all(es.map( async e => ({
                ...e, 
                entry_images: <EntryImages>(await db.query('SELECT image, is_featured FROM entry_images WHERE entry_id = ?', [e.id]))
            })))
        ))

        const result = assemblePoll(entriesWithImages, pollWithCategories)
        
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
        cat.forEach(entry => {
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
        })
    })
    return result
}

function getCatName(id: number, cats:{[key:number]:string}) {
    if (id in cats) return cats[id]
    return 'Kategori'
}
