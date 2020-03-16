import * as React from 'react'
import styles from './entry_display.module.css'
import { IEntry } from '../../model'
import Image from 'react-bootstrap/Image'

interface props {
    entry: IEntry,
    categoryName: string
}

const EntryDisplay = ({entry, categoryName}:props) => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>{entry.year}</h1>
                <h1>{categoryName}</h1>
            </header>
            <section className={styles.section}>
                <div></div>
                <article className={styles.article}>
                    <h2>{entry.entry_name}</h2>
                    <h3>Designer: {entry.designer}</h3>
                    <h3>Kund: {entry.customer}</h3>
                </article>
            </section>
        </div>
    )
}

export default EntryDisplay
