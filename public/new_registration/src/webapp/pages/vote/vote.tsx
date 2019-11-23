import * as React from 'react'
import {useState, useEffect} from 'react'
import * as hosts from 'src/webapp/config/host'
import { IEntry, IVote } from 'src/webapp/model'
import EntryList from './entry_list'
import Summary from './summary'
// import styles from './vote.module.css'

enum STAGES {
    LIST = 'LIST',
    SUMMARY = 'SUMMARY',
    DID_SEND = 'DID_SEND',
    CONFIRMED = 'CONFIRMED'
}

const Vote = () => {

    const [entries, setEntries] = useState<IEntry[]>([]) 
    const [didFetch, setDidFetch] = useState(false)
    const [voteEntries, setVoteEntries] = useState<IEntry[]>([])
    const [currentStage, setCurrentStage] = useState(STAGES.LIST)

    useEffect(() => {
        getEntries()
        setCurrentStage(STAGES.LIST)
    }, [])

    useEffect(() => {
        setDidFetch(true)
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


    const onVote = (entry: IEntry) => {
        console.log(entries)
        const arr = Array.from(voteEntries).filter(e => e.category !== entry.category)
        arr.push(entry)
        setVoteEntries(arr)
    }

    const onVoteDone = () => {
        setCurrentStage(STAGES.SUMMARY)
    }

    const onPostVotes = (votes: IVote[]) => {
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
                        {didFetch &&
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
                return <div></div>
            case STAGES.CONFIRMED:
                return <div></div>
            default:
                return <div></div>

        }
    }
    
    return (
        <div>hejsan röstning
           {getContent()}
        </div>
    )
}

export default Vote