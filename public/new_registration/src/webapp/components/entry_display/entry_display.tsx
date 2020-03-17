import * as React from 'react'
import styles from './entry_display.module.css'
import { IEntry } from '../../model'
import Image from 'react-bootstrap/Image'
import Button from '../button'
import { IS_MOBILE } from '../../config/style'

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
                    <h1>{entry.year}</h1>
                    <h1>{categoryName}</h1>
                </div>
                {IS_MOBILE && getButtons()}
            </header>
            <section className={styles.section}>
                <div className={styles.img_holder}></div>
                <div className={styles.article_container}>
                    <article className={styles.article}>
                        <h2>{entry.entry_name}</h2>
                        <h3>Byrå: {entry.profile_id}</h3>
                        <h3>Designer: {entry.designer}</h3>
                        <h3>Kund: {entry.customer}</h3>
                    </article>
                    {!IS_MOBILE && getButtons()}
                </div>
            </section>
            <hr></hr>
                <nav className={styles.nav}>
                    {prevEntry && 
                    <div className={styles.nav_button_container}>
                        <p>Föregående bidrag</p>
                        <Button className={styles.nav_button} onClick={() => onPrevNext(prevEntry)} title={prevEntry.entry_name} />
                    </div>}
                    {nextEntry && 
                    <div className={styles.nav_button_container_right}>
                        <p>Nästa bidrag</p>
                        <Button className={styles.nav_button} onClick={() => onPrevNext(nextEntry)} title={nextEntry.entry_name} />
                    </div>}
                </nav>
        </div>
    )
}

export default EntryDisplay
