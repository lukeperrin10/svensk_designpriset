import * as db from '../db'
import {Profile as dbtype} from '../types/dbtypes'
import { Request, NextFunction } from 'express';


export interface Profile extends Partial<dbtype> {}

export function getName() {
    return 'Profiles'
}

export async function get(): Promise<Array<dbtype>> {
    console.log('Profiles get')
    // try {
        const query = await db.query('SELECT * FROM profiles')
        return query
    // } catch (error) {
    //     console.log('profile get error: '+error)
    // }
}

export async function getId(id: number): Promise<Profile> {
    console.log('Profiles get')
    console.log(id)
    const query = await db.query('SELECT * FROM `profiles` WHERE `id` = ?', [id])
    return query
}

export async function create(new_profile: Profile): Promise<Profile> {
    console.log('Create new profile')
    const post_profile = create_profile(new_profile)
    // try {
        const insert = await db.query('INSERT INTO profiles SET ?', [post_profile])
        const query = await db.query('SELECT * FROM profiles WHERE id = ?', [insert.insertId])
        return query
    // } catch (err) {
        
    // }
}

export async function update(profile: Profile): Promise<Profile> {
    console.log('update profile!')
    const update_profile = create_profile(profile)
    const update = await db.query('UPDATE profiles SET ? WHERE ID = ?', [update_profile, profile.id])
    const query = await db.query('SELECT * FROM profiles WHERE id = ?', [profile.id])
    return query
}
function create_profile(profile: Profile): Profile {
    const new_profile: Profile = {
        secret: profile.secret,
        company: profile.company,
        contact: profile.contact,
        address: profile.address,
        zip: profile.zip,
        city: profile.city,
        phone: profile.phone,
        mail: profile.mail,
        homepage: profile.homepage,
        invoice_paid: profile.invoice_paid || 0
    }
    return new_profile
}

// contact,company,address,zip,city,phone,mail,homepage, secret
