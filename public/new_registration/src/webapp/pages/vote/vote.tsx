import * as React from 'react'
import {useState, useEffect} from 'react'
import * as hosts from 'src/webapp/config/host'
import { IEntry, IVote } from 'src/webapp/model'
import EntryList from './entry_list'
import Summary from './summary'
// import styles from './vote.module.css'

const Vote = () => {

    const [entries, setEntries] = useState<IEntry[]>([]) 
    const [didFetch, setDidFetch] = useState(false)
    const [voteEntries, setVotedEntries] = useState<IEntry[]>([])

    useEffect(() => {
        getEntries()
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


    const onVote = (entries: IEntry[]) => {
        console.log(entries)
        setVotedEntries(entries)
    }

    const onPostVotes = (votes: IVote[]) => {
        console.log(votes)
    }
    
    return (
        <div>hejsan röstning
            {didFetch &&
            <EntryList onVotesDone={onVote} entries={entries} />
            }
            {voteEntries.length > 0 &&
            <Summary entries={voteEntries} onPostVotes={onPostVotes}/>}
        </div>
    )
}

export default Vote