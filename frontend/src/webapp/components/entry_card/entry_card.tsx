import * as React from 'react'
import { IEntry } from '../../model'
import styles from './entry_card.module.css'
import Button from '../button'
import {BUTTON_VARIANTS, BUTTON_SIZES} from '../button/button'
import { assembleMediaUrl } from '../../helpers'
import { IS_MOBILE } from '../../config/style'
import gold from '../../assets/ui/crown_gold.svg'
import silver from '../../assets/ui/crown_silver.svg'
import LazyLoad from 'react-lazyload'

interface IEntryCard {
    entry: IEntry,
    onVoteClick?: (entry: IEntry) => void,
    onShowClick: (entry: IEntry) => void
    isVoted?: boolean,
    onlyDisplay?: boolean,
    noMargin?: boolean
}

const EntryCard = ({entry, onVoteClick, isVoted, onlyDisplay, onShowClick, noMargin}: IEntryCard) => {

    const onVote = () => {
        if (onVoteClick) onVoteClick(entry)
    }

    const onShow = () => {
        onShowClick(entry)
    }

    const imageStyle = {
        backgroundImage: `url(${assembleMediaUrl(entry.avatar)})`
    }

    

    
    return (
        <div className={[styles.container, onlyDisplay && styles.container_min, !noMargin && styles.margin].join(' ')}>
            {IS_MOBILE ?
            <LazyLoad>
                <div onClick={onShow} style={imageStyle} className={[styles.img_holder, onlyDisplay && styles.img_holder_min].join(' ')}></div>
            </LazyLoad>
            
            :
            <LazyLoad>
                <div style={imageStyle} className={[styles.img_holder, onlyDisplay && styles.img_holder_min].join(' ')}></div>
            </LazyLoad>
            }
            
            {!IS_MOBILE &&
                <div onClick={onShow} className={[styles.overlay, onlyDisplay && styles.overlay_min].join(' ')}>
                    <Button variant={BUTTON_VARIANTS.TERTIARY} className={styles.overlay_button} onClick={onShow} title="Visa" />    
                </div>
            }
            

            <div className={[styles.bottom, onlyDisplay && styles.bottom_min].join(' ')}>
                <div className={onVoteClick ? styles.text_container_vote : [styles.text_container, onlyDisplay && styles.text_container_min].join(' ')}>
                    <p className={onlyDisplay ? styles.title : styles.title}>{entry.entry_name}</p>
                    <p className={onlyDisplay ? styles.company : styles.company}>{entry.company}</p>
                </div>
                {!onlyDisplay ?
                isVoted ?
                    <Button className={styles.button_voted} variant={BUTTON_VARIANTS.PRIMARY} size={BUTTON_SIZES.SMALL} onClick={onVote} title='Din röst' />
                    :                     
                    <Button variant={BUTTON_VARIANTS.TERTIARY} size={BUTTON_SIZES.SMALL} onClick={onVote} title='Rösta' />
                
                    :
                    <img src={entry.is_winner_gold ? gold : entry.is_winner_silver ? silver : ''} alt="Krona" />
                }
            </div>
        </div>
    )
}

export default EntryCard
