import * as db from '../db'
import {Category as dbtype} from '../types/dbtypes'


export interface Category extends Partial<dbtype> {}

export function getName() {
    return 'Category'
}

export async function get(): Promise<Array<Category>> {
    console.log('Category get')
    const query = await db.query('SELECT id, name, shorttag FROM categories ORDER BY shorttag')
    if (query) console.log('Category get query response recieved')
    return query
}

export async function getId(id: number): Promise<Category> {
    const query = await db.query('SELECT id, name, shorttag FROM categories WHERE `id` = ?', [id])
    return query
}