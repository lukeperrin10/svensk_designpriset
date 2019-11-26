const fetch = require('node-fetch')
const md5 = require('md5')

const BASE_URL = 'http://myown.se:8001'
const VOTES_URL = `${BASE_URL}/votes`
const POLL_URL = `${BASE_URL}/polls`
const CONFIRMED_VOTE_URL = `${BASE_URL}/votes/confirmed_vote`



async function makePollRequest(amountOfRequests) {
    try {
        const response = await fetch(POLL_URL)
        const json = await response.json()
        console.log('poll request result:'+stringify(json[0]))
        return createVotes(json[0])
    } catch(error) {
        console.log(error)
    }
}

async function postVotes(votes) {
    try {
        const method = "POST"
        const url = VOTES_URL
        const headers = {"Content-Type": "application/json; charset=utf-8"}
        const response = await fetch(url, {
            method: method,
            headers: headers,
            body: JSON.stringify(votes)
        })
        console.log('post votes result: '+stringify(response))
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

async function confirmVotes(secret) {
    try {
        const method = "POST"
        const url = CONFIRMED_VOTE_URL
        const headers = {"Content-Type": "application/json; charset=utf-8"}
        const response = await fetch(url, {
            method: method,
            headers: headers,
            body: JSON.stringify({secret: secret})
        })
        console.log('Confirm votes response: '+stringify(response))
        return response
    } catch (error) {
        console.log(error)  
        return error
    }
}

function stringify(obj) {
    return JSON.stringify(obj)
}

// interface PollCategories {
//     [key:number]: {
//         entries: IEntry[]
//     }
// }
// interface PollCollection {
//     id: number,
//     categories: PollCategories
// }


function createVotes(poll) {
    const votes = []
    const secret = md5('johan@wopii.com'+Date.now())
    Object.keys(poll.categories).forEach(cat => {
        const vote = {
            mail: 'johan@wopii.com',
            poll_id: poll.id,
            entry_id: poll.categories[cat].entries[0].id,
            ip: '123.443.2112.34',
            secret: secret
        }
        votes.push(vote)
    })
    console.log(votes)
    return votes
}




async function testPollVoting() {
    const votes = await makePollRequest()
    const post = await postVotes(votes)
    const confirm = await confirmVotes(votes[0].secret)
}

function tryCalls(amountOfCalls) {
    
    for (let i = 0; i<amountOfCalls;i++) {
        testPollVoting()
    }
}

// Calls
const amountOfRequests = 10
tryCalls(1000)



