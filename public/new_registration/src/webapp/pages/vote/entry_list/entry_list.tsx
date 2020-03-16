import * as React from 'react'
import { IEntry } from '../../../model'
import EntryCard from '../../../components/entry_card'

interface IEntryList {
    entries: IEntry[],
    voteEntries: IEntry[],
    onVote: (entry: IEntry) => void,
    onVotesDone: () => void,
    title: string
}

const EntryList = ({entries, onVote, voteEntries, onVotesDone, title}: IEntryList) => {
    // const [voteEntries, setVoteEntries] = React.useState<IEntry[]>([])

    React.useEffect(() => {
        console.log(voteEntries)
    }, [voteEntries])

    const onCardClicked = (entry: IEntry) => {
        // console.log('list vote')
        // const arr = Array.from(voteEntries)
        // arr.push(entry)
        // setVoteEntries(arr)
        onVote(entry)
    }

    const checkIsVoted = (id: number) => {
        return voteEntries.filter(e => e.id === id).length > 0
    }

    const onContinue = () => {
        if (voteEntries.length > 0) {
            onVotesDone()
        } else {
            console.log('no votes')
        }    
    }

    const showEntry = (entry: IEntry) => {
        console.log('show entry')
    }
    return (
        <div>
            <h2>{title}</h2>
            {entries &&
            entries.map(e => <EntryCard onShowClick={showEntry} isVoted={checkIsVoted(e.id)} key={e.id} onVoteClick={onCardClicked} entry={e} /> )}
            {entries &&
            entries.map(e => <EntryCard onShowClick={showEntry} isVoted={checkIsVoted(e.id)} key={e.id} onVoteClick={onCardClicked} entry={e} /> )}
            {entries &&
            entries.map(e => <EntryCard onShowClick={showEntry} isVoted={checkIsVoted(e.id)} key={e.id} onVoteClick={onCardClicked} entry={e} /> )}
            {entries &&
            entries.map(e => <EntryCard onShowClick={showEntry} isVoted={checkIsVoted(e.id)} key={e.id} onVoteClick={onCardClicked} entry={e} /> )}
            {entries &&
            entries.map(e => <EntryCard onShowClick={showEntry} isVoted={checkIsVoted(e.id)} key={e.id} onVoteClick={onCardClicked} entry={e} /> )}
            {entries &&
            entries.map(e => <EntryCard onShowClick={showEntry} isVoted={checkIsVoted(e.id)} key={e.id} onVoteClick={onCardClicked} entry={e} /> )}
            {entries &&
            entries.map(e => <EntryCard onShowClick={showEntry} isVoted={checkIsVoted(e.id)} key={e.id} onVoteClick={onCardClicked} entry={e} /> )}
            {entries &&
            entries.map(e => <EntryCard onShowClick={showEntry} isVoted={checkIsVoted(e.id)} key={e.id} onVoteClick={onCardClicked} entry={e} /> )}
            {entries &&
            entries.map(e => <EntryCard onShowClick={showEntry} isVoted={checkIsVoted(e.id)} key={e.id} onVoteClick={onCardClicked} entry={e} /> )}
            {entries &&
            entries.map(e => <EntryCard onShowClick={showEntry} isVoted={checkIsVoted(e.id)} key={e.id} onVoteClick={onCardClicked} entry={e} /> )}
            
            <button onClick={onContinue}>Gå vidare</button>
        </div>
    )
}

export default EntryList
