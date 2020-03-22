import * as React from 'react'
import { IEntry } from '../../model'
import styles from './entry_card.module.css'
import Button from '../button'
import {BUTTON_VARIANTS, BUTTON_SIZES} from '../button/button'
import { assembleMediaUrl } from '../../helpers'
import { IS_MOBILE } from '../../config/style'

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
        <div className={[styles.container, onlyDisplay && styles.container_min].join(' ')}>
            {IS_MOBILE ?
            <div onClick={onShow} style={imageStyle} className={[styles.img_holder, onlyDisplay && styles.img_holder_min].join(' ')}></div>
            :
            <div style={imageStyle} className={[styles.img_holder, onlyDisplay && styles.img_holder_min].join(' ')}></div>
            }
            
            {!IS_MOBILE &&
                <div className={[styles.overlay, onlyDisplay && styles.overlay_min].join(' ')}>
                    <Button variant={BUTTON_VARIANTS.TERTIARY} className={styles.overlay_button} onClick={onShow} title="Visa" />    
                </div>
            }
            

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
