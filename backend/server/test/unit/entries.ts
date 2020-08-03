import {expect} from 'chai'
import * as entries  from '../../src/models/entries'
import {describe, it} from 'mocha'
import rewire from 'rewire'
import * as db from '../../src/db'
const entries_rewired = rewire('../../src/models/entries')

const test_entry: entries.Entry = {
    profile_id: 1,
    entry_name: "test_entry",
    category_id: 1,
    source: "test_source",
    designer: "test designer",
    illustrator: "test illustrator",
    leader: "test leader",
    customer: "test customer",
    avatar: "test_avatar",
    format: "test format",
    size: "test size",
    webpage: "test webpage",
    is_winner_gold: 0,
    is_winner_silver: 0,
    is_nominated: 0,
    //sent_nominee_notification: new Date().toISOString(),
    motivation: "test motivation",
    year: "2020",
    entry_images: [{image: "extra-x405wf8102k7x74scm.jpg", is_featured: false},{image: "extra-x405wf8102k7x74scr.jpg", is_featured: false}]
    
}

const create = () => {
    let id: number
    describe('Entry creation', () => {
        it ('should create an entry', async () => {
            const res = await entries.create(test_entry)
            id = res.id
            expect(id).to.be.greaterThan(0)
        })
        it ('should remove the created entry', async () => {
            await entries.remove(id)
        })
    })
}

const update = () => {
    let id: number
    let entry: entries.Entry
    let new_entry_name = 'New entry name'
    describe('Entry creation for update', () => {
        it ('should create an entry', async () => {
            const res = await entries.create(test_entry)
            id = res.id
            entry = res
            expect(id).to.be.greaterThan(0)
        })
        it ('should update the entry', async () => {
            entry.entry_name = new_entry_name
            const res = await entries.update(entry)
            expect(res.id).equal(id)
            expect(res.entry_name).equal(new_entry_name)
        })
        it ('should remove the created entry', async () => {
            await entries.remove(id)
        })
    })

}

const createBatch = () => {
    const test_entry_2 = {...test_entry, entry_name: "test_entry_2"}
    let ids: number[]
    describe('Entry creation batch', () => {
        it ('should create multiple entries', async () => {
            const res = (<entries.Entry[]>await entries.batchCreate([test_entry, test_entry_2]))
            ids = [res[0].id, res[1].id]
            expect(ids.length).to.equal(2)
        })
        it ('should remove the batch of entries', async () => {
            ids.forEach(async id => await entries.remove(id))
        })
    })

}

const createImages = () => {
    const f: (entry_id: number, images: string[]) => void = entries_rewired.__get__('createImages')
    const entry_id = -1
    const images = ['test1', 'test2']
    describe('Images creation', () => {
        it ('It should create two images', async () => {
            await db.query('SET FOREIGN_KEY_CHECKS=0;')
            await f(entry_id, images)
            const res = await db.query('select * from entry_images where entry_id = ?', [entry_id])
            expect(res.length).to.equal(images.length)
        })
        it ('should remove the images', async () => {
            await db.query('SET FOREIGN_KEY_CHECKS=0;')
            await db.query('delete from entry_images where entry_id = ?', [entry_id])
            await db.query('SET FOREIGN_KEY_CHECKS=1;')
        })
    })

}


create()
createBatch()
//createImages()
update()