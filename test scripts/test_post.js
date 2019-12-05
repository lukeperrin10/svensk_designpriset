const fetch = require('node-fetch')

const BASE_URL = 'http://myown.se:8001'
const PROFILE_URL = `${BASE_URL}/profiles`
const ENTRIES_URL = `${BASE_URL}/entries`
const CATEGORY_URL = `${BASE_URL}/categories`

async function makeProfileAndEntriesRequest(amountOfEntries) {
    const headers = {"Content-Type": "application/json; charset=utf-8"}
    try {
        const profile = await fetch(PROFILE_URL, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(createProfile())
        })
        const profileId = await profile.json()
        console.log('post profile: '+stringify(profileId))
        const entries = await fetch(ENTRIES_URL, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(createEntries(profileId[0]['id'], amountOfEntries))
        })
        const entriesResult = await entries.json()
        console.log('post entries: '+stringify(entriesResult))
    } catch (error) {
        console.log(error)
    }
    
}

function createEntries(profileId, amountOfEntries) {
    const entries = []
    
    console.log(`creating ${amountOfEntries} entries`)
    for(let i = 0; i<amountOfEntries; i++) {
        const entry = {
            profile_id: profileId,
            entry_name: 'WOPII_TEST '+i,
            designer: 'WOPII_TEST',
            illustrator: 'WOPII_TEST',
            leader: 'WOPII_TEST',
            customer: 'WOPII_TEST',
            source: 'WOPII_TEST',
            format: 'WOPII_TEST',
            size: 'WOPII_TEST',
            category_id: 1,
            webpage: 'WOPII_TEST',
            avatar: 'xxxx-test-avatar',
            year: '2019'
        }
        entries.push(entry)
    }
    return entries
}

function createProfile() {
    return {
        secret: 'secretTest1234',
        contact: 'WOPII_TEST',
        company: 'WOPII_TEST',
        address: 'WOPII_TEST',
        zip: '12345',
        city: 'WOPII_TEST',
        phone: '123456789',
        mail: 'johan@wopii.com',
        homepage: 'string',
        invoice_paid: 0
    }
}

async function getProfiles() {
    try {
        const profiles = await fetch(`${PROFILE_URL}`)
        const result = await profiles.json()
        console.log('get profiles: '+stringify(result))
    } catch (error) {
        console.log(error)
    }
    
}

async function getProfile(id) {
    try {
        const profile = await fetch(`${PROFILE_URL}/${id}`)
        const result = await profile.json()
        console.log('get profile '+id+' :'+stringify(result))
    } catch (error) {
        console.log(error)
    }
}

async function getCategories() {
    console.log('getCategories')
    try {
        const categories = await fetch(CATEGORY_URL)
        const result = await categories.json()
        console.log('get categories: '+stringify(result))
    } catch (err) {
        console.log(err)
    }
    
    
}

function stringify(obj) {
    return JSON.stringify(obj)
}




function tryCalls(amountOfCalls, amountOfEntries) {
    
    for (let i = 0; i<amountOfCalls;i++) {
        getCategories()
        makeProfileAndEntriesRequest(amountOfEntries)
    }
}

// Calls

// tryCalls(amountOfCalls, amountOfEntries)
tryCalls(1, 2)





