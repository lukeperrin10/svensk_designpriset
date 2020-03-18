import * as React from 'react'
import { IEntry } from '../../model'
import styles from './entry_card.module.css'
import Button from '../button'
import {BUTTON_VARIANTS, BUTTON_SIZES} from '../button/button'
import { assembleMediaUrl } from '../../helpers'

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

    const imageStyle = {
        backgroundImage: `url(${assembleMediaUrl(entry.avatar)})`
    }

    
    return (
        <div className={styles.container}>
            <div style={imageStyle} className={styles.img_holder}></div>
            <div className={styles.overlay}>
                <Button variant={BUTTON_VARIANTS.TERTIARY} className={styles.overlay_button} onClick={onShow} title="Visa" />    
            </div>

            <div className={styles.bottom}>
                <p>{entry.entry_name}</p>
                {!onlyDisplay ?
                isVoted ?
                    <Button variant={BUTTON_VARIANTS.PRIMARY} size={BUTTON_SIZES.SMALL} onClick={onVote} title='Din röst' />
                    :                     
                    <Button variant={BUTTON_VARIANTS.TERTIARY} size={BUTTON_SIZES.SMALL} onClick={onVote} title='Rösta' />
                
                    :
                    <div></div>
                }
            </div>
        </div>
    )
}

export default EntryCard
