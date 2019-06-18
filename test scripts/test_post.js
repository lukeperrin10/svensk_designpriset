const fetch = require('node-fetch')

const BASE_URL = 'http://myown.se:8001'
const PROFILE_URL = `${BASE_URL}/profiles`
const ENTRIES_URL = `${BASE_URL}/entries`

async function makeRequest() {
    const headers = {"Content-Type": "application/json; charset=utf-8"}
    try {
        const profile = await fetch(PROFILE_URL, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(createProfile())
        })
        const profileId = await profile.json()
        const entries = fetch(ENTRIES_URL, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(createEntries(profileId[0]['id']))
        })
    } catch (error) {
        console.log(error)
    }
    
}

function createEntries(profileId) {
    const entries = []
    const amountOfEntries = 3
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
            category: '3A',
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

makeRequest()

