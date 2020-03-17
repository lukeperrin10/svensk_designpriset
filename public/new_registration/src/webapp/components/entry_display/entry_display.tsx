import * as React from 'react'
import styles from './entry_display.module.css'
import { IEntry } from '../../model'
import Image from 'react-bootstrap/Image'
import Button from '../button'
import { IS_MOBILE } from '../../config/style'
import Text, { P, H1, H2, H3, Label } from '../text'
import { TEXT_TYPES, HEADLINE_SIZES } from '../text/text'

interface props {
    entry: IEntry,
    categoryName: string,
    prevEntry?: IEntry,
    nextEntry?: IEntry,
    onPrevNextClick?: (entry: IEntry) => void,
    onVoteClick?: (entry: IEntry) => void,
    isVoted?: boolean
}

const EntryDisplay = ({entry, categoryName, prevEntry, nextEntry, onPrevNextClick, onVoteClick, isVoted}:props) => {

    const onVote = () => {
        if (onVoteClick) onVoteClick(entry)
    }

    const onPrevNext = (entry: IEntry) => {
        if (onPrevNextClick) onPrevNextClick(entry)
    }

    const getButtons = () => {
        if (onVoteClick) {
            return (
                <div className={styles.button}>
                    {isVoted ?
                        <Button className={styles.button_voted} onClick={onVote} title='Din röst' />
                        :
                        <Button onClick={onVote} title='Rösta' />
                    }
                    
                </div>
            )
        } else return null
        
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <Text type={TEXT_TYPES.H2} headlineSize={HEADLINE_SIZES.SMALL}>{entry.year}</Text>
                    <Text type={TEXT_TYPES.H2} headlineSize={HEADLINE_SIZES.SMALL}>{categoryName}</Text>
                </div>
                {IS_MOBILE && getButtons()}
            </header>
            <section className={styles.section}>
                <div className={styles.img_holder}></div>
                <div className={styles.article_container}>
                    <article className={styles.article}>
                        <Text className={styles.title} type={TEXT_TYPES.H2} headlineSize={HEADLINE_SIZES.SMALL}>{entry.entry_name}</Text>
                        <div className={styles.contents}>
                            <Label>Byrå: </Label><P>{entry.profile_id}</P>
                        </div>
                        <div className={styles.contents}>
                            <Label>Designer: </Label><P>{entry.designer}</P>    
                        </div>
                        <div className={styles.contents}>
                            <Label>Kund: </Label><P>{entry.customer}</P>   
                        </div>
                    </article>
                    {!IS_MOBILE && getButtons()}
                </div>
            </section>
            <hr></hr>
                <nav className={styles.nav}>
                    {prevEntry && 
                    <div className={styles.nav_button_container}>
                        <Label>Föregående bidrag</Label>
                        <Button className={styles.nav_button} onClick={() => onPrevNext(prevEntry)} title={prevEntry.entry_name} />
                    </div>}
                    {nextEntry && 
                    <div className={styles.nav_button_container_right}>
                        <Label>Nästa bidrag</Label>
                        <Button className={styles.nav_button} onClick={() => onPrevNext(nextEntry)} title={nextEntry.entry_name} />
                    </div>}
                </nav>
        </div>
    )
}

export default EntryDisplay
