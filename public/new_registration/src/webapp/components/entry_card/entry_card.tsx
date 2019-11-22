import * as React from 'react'
import { IEntry } from 'src/webapp/model'
// import styles from './entry_card.module.css'

interface IEntryCard {
    entry: IEntry,
    onVoteClick?: (entry: IEntry) => void,
    isVoted?: boolean,
    onlyDisplay?: boolean
}

const EntryCard = ({entry, onVoteClick, isVoted, onlyDisplay}: IEntryCard) => {

    const onVote = () => {
        console.log('card vote')
        if (onVoteClick) onVoteClick(entry)
    }
    return (
        <div style={{margin: 10, borderColor: 'black', borderWidth: 1, backgroundColor: isVoted ? 'green' : 'red'}}>
            <div>
                <img src={entry.avatar} alt={entry.entry_name} />
                <p>{entry.entry_name}</p>
                <p>{entry.designer}</p>
            </div>
            {!onlyDisplay &&
            <div>
                <button onClick={onVote}>Rösta</button>
            </div>
            }
        </div>
    )
}

export default EntryCard
