import * as React from 'react'
import { IEntry } from '../../model'
import styles from './entry_card.module.css'
import Button from '../button'

interface IEntryCard {
    entry: IEntry,
    onVoteClick?: (entry: IEntry) => void,
    onShowClick: (entry: IEntry) => void
    isVoted?: boolean,
    onlyDisplay?: boolean
}

const EntryCard = ({entry, onVoteClick, isVoted, onlyDisplay, onShowClick}: IEntryCard) => {

    const onVote = () => {
        console.log('card vote')
        if (onVoteClick) onVoteClick(entry)
    }

    const onShow = () => {
        onShowClick(entry)
    }

    
    return (
        <div className={styles.container}>
            <div className={styles.img_holder}></div>
            <div className={styles.overlay}>
                <Button className={styles.overlay_button} onClick={onShow} title="Visa" />    
            </div>

            <div className={styles.bottom}>
                <p>{entry.entry_name}</p>
                {!onlyDisplay ?
                isVoted ?
                    <Button className={styles.button_voted} onClick={onVote} title='Din röst' />
                    :                     
                    <Button onClick={onVote} title='Rösta' />
                
                    :
                    <div></div>
                }
            </div>
        </div>
    )
}

export default EntryCard
