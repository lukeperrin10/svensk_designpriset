import * as React from 'react'
import { IEntry } from 'src/webapp/model'
import EntryCard from 'src/webapp/components/entry_card'

interface IEntryList {
    entries: IEntry[],
    onVotesDone: (entries: IEntry[]) => void
}

const EntryList = ({entries, onVotesDone}: IEntryList) => {
    const [voteEntries, setVoteEntries] = React.useState<IEntry[]>([])

    React.useEffect(() => {
        console.log(voteEntries)
    }, [voteEntries])

    const onVote = (entry: IEntry) => {
        console.log('list vote')
        const arr = Array.from(voteEntries)
        arr.push(entry)
        setVoteEntries(arr)
    }

    const checkIsVoted = (id: number) => {
        return voteEntries.filter(e => e.id === id).length > 0
    }

    const onContinue = () => {
        if (voteEntries.length > 0) {
            onVotesDone(voteEntries)
        } else {
            console.log('no votes')
        }    
    }
    return (
        <div>
            {entries &&
            entries.map(e => <EntryCard isVoted={checkIsVoted(e.id)} key={e.id} onVoteClick={onVote} entry={e} /> )}
            <button onClick={onContinue}>Gå vidare</button>
        </div>
    )
}

export default EntryList
