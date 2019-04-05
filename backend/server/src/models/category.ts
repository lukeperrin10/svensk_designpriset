import * as db from '../db'
import {Category as dbtype} from '../types/dbtypes'


export interface Category extends Partial<dbtype> {}

export function getName() {
    return 'Category'
}

export async function get(): Promise<Array<Category>> {
    const query = await db.query('SELECT id, name, shorttag FROM categories ORDER BY shorttag')
    return query
}

export async function getId(id: number): Promise<Category> {
    const query = await db.query('SELECT id, name, shorttag FROM categories WHERE `id` = ?', [id])
    return query
}