import {expect} from 'chai'
import * as entries  from '../../src/models/entries'

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
    sent_nominee_notification: new Date().toISOString(),
    motivation: "test motivation",
    year: "2020"
    
}

const create = () => {
    describe('Entry creation', () => {
        it ('should create an entry', async () => {
            const res = await entries.create(test_entry)
            expect((<any>res)[0].id).to.be.greaterThan(0)
        })
    })
}

const createBatch = () => {
    const test_entry_2 = {...test_entry, entry_name: "test_entry_2"}
    describe('Entry creation batch', () => {
        it ('should create multiple entries', async () => {
            const res = await entries.batchCreate([test_entry, test_entry_2])
            expect((<any>res)[0].id).to.be.greaterThan(0)
            expect((<any>res)[1].id).to.be.greaterThan(1)
        })
    })

}

create()
createBatch()