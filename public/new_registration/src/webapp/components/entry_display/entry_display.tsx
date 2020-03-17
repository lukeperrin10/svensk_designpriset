import * as React from 'react'
import styles from './entry_display.module.css'
import { IEntry } from '../../model'
import Image from 'react-bootstrap/Image'
import Button from '../button'

interface props {
    entry: IEntry,
    categoryName: string,
    prevEntry?: IEntry,
    nextEntry?: IEntry,
    onPrevNextClick?: (entry: IEntry) => void
}

const EntryDisplay = ({entry, categoryName, prevEntry, nextEntry, onPrevNextClick}:props) => {

    const onVote = () => {

    }

    const onPrevNext = (entry: IEntry) => {
        if (onPrevNextClick) onPrevNextClick(entry)
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>{entry.year}</h1>
                <h1>{categoryName}</h1>
            </header>
            <section className={styles.section}>
                <div className={styles.img_holder}></div>
                <div className={styles.article_container}>
                    <article className={styles.article}>
                        <h2>{entry.entry_name}</h2>
                        <h3>Designer: {entry.designer}</h3>
                        <h3>Kund: {entry.customer}</h3>
                    </article>
                    <div className={styles.button}>
                        <Button onClick={onVote} title='Rösta' />
                    </div>
                    
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
