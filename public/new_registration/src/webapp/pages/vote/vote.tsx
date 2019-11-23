import * as React from 'react'
import {useState, useEffect} from 'react'
import * as hosts from 'src/webapp/config/host'
import { IEntry, IVote } from 'src/webapp/model'
import EntryList from './entry_list'
import Summary from './summary'
import AfterPost from './after_post'
// import styles from './vote.module.css'

enum STAGES {
    LIST = 'LIST',
    SUMMARY = 'SUMMARY',
    DID_SEND = 'DID_SEND',
    CONFIRMED = 'CONFIRMED'
}

const Vote = () => {

    const [entries, setEntries] = useState<IEntry[]>([]) 
    const [didFetchEntries, setDidFetchEntries] = useState(false)
    const [voteEntries, setVoteEntries] = useState<IEntry[]>([])
    const [currentStage, setCurrentStage] = useState(STAGES.LIST)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        getEntries()
        setCurrentStage(STAGES.LIST)
    }, [])

    useEffect(() => {
        setDidFetchEntries(true)
        setIsLoading(false)
    }, [entries])

    const getEntries = async () => {
        try {
            const response = await fetch(hosts.ENTRIES_URL)
            const json = await response.json()
            console.log(json)
            setEntries(json)
        } catch(error) {
            console.log(error)
        }
    }

    const postVotes = async (votes: IVote[]) => {
        setError(false)
        try {
            const method = "POST"
            const url = hosts.VOTES_URL
            const headers = {"Content-Type": "application/json; charset=utf-8"}
            const response = await fetch(url, {
                method: method,
                headers: headers,
                body: JSON.stringify(votes)
            })
            checkResponse(response)
        } catch (error) {
            console.log('post error')
            console.log(error)
            
        }
    }

    const checkResponse = (response: Response) => {
        if (response.ok) {
            setCurrentStage(STAGES.DID_SEND)
        } else {
            setError(true)
            setErrorMessage(response.statusText)
        }
    }

    const resetStage = () => {
        setError(false)
        setErrorMessage('')
        setCurrentStage(STAGES.SUMMARY)
    }


    const onVote = (entry: IEntry) => {
        console.log(entries)
        const arr = Array.from(voteEntries).filter(e => e.category_id !== entry.category_id)
        arr.push(entry)
        setVoteEntries(arr)
    }

    const onVoteDone = () => {
        setCurrentStage(STAGES.SUMMARY)
    }

    const onPostVotes = (votes: IVote[]) => {
        postVotes(votes)
        console.log(votes)
    }

    const onChangeVotes = () => {
        setCurrentStage(STAGES.LIST)
    }

    const getContent = () => {
        switch (currentStage) {
            case STAGES.LIST:
                return (
                    <div>
                        {didFetchEntries &&
                        <EntryList onVote={onVote} onVotesDone={onVoteDone} voteEntries={voteEntries} entries={entries} />
                        }
                    </div>
                )
            case STAGES.SUMMARY:
                return (
                    <div>
                        {voteEntries.length > 0 &&
                        <Summary onChangeVotes={onChangeVotes} entries={voteEntries} onPostVotes={onPostVotes}/>}
                    </div>
                )
            case STAGES.DID_SEND:
                return <AfterPost />
            case STAGES.CONFIRMED:
                return <div></div>
            default:
                return <div></div>

        }
    }
    
    return (
        <div>hejsan röstning
           {getContent()}
           {isLoading &&
            <div style={{
                position: 'absolute', 
                top: 0, 
                left: 0, 
                height: '100vh', 
                width: '100vw', 
                textAlign: 'center',
                backgroundColor: 'rgba(255,255,255,0.9)'}}>
                    <p>LADDAR...</p>
                </div>
            }
            {error &&
            <div style={{
                position: 'absolute', 
                top: 0, 
                left: 0, 
                height: '100vh', 
                width: '100vw', 
                textAlign: 'center',
                backgroundColor: 'rgba(255,255,255,0.9)'}}>
                    <p>Något gick fel.</p>
                    <p>{errorMessage}</p>
                    <button onClick={resetStage}>Försök igen</button>
                </div>
            }
        </div>
    )
}

export default Vote