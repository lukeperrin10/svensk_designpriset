import * as React from 'react'
import {useState, useEffect} from 'react'
import styles from './winner_gallery.module.css'
import { IEntry } from '../../model'
import WinnerCard from '../winner_card'
import { PATHS } from '../../config/path'
import { createSlug } from '../../helpers'
import EntryCard from '../entry_card'
import EntryModal from '../entry_modal'
import Loader from '../loader'
import Text, { H2 } from '../text'
import { TEXT_TYPES } from '../text/text'

interface props {
    entries: IEntry[],
    onEntryClick?: (id: number) => void,
}

interface SortedCats {
    [key:string]: {
        category_name: string,
        entries: IEntry[]
    }
    
}

const WinnerGallery = ({entries, onEntryClick}:props) => {

    const [modalId, setModalId] = useState<number>()
    const [showModal, setShowModal] = useState(false)
    const [sortedWinners, setSortedWinners] = useState<SortedCats>()
    const [singleCategories, setSingleCategories] = useState<SortedCats>()

    useEffect(() => {
        sortIntoCategories(entries)
    },[])

    useEffect(() => {
        sortIntoCategories(entries)
    },[entries])

    const onClick = (entry: IEntry) => {
        if (onEntryClick) onEntryClick(entry.id)
        else {
            setModalId(entry.id)
            setShowModal(true)
        }
    }

    const onModalClose = () => {
        setShowModal(false)
    }

    const sortIntoCategories = (entries: IEntry[]) => {
        const check : SortedCats = {}
        const sorted : SortedCats = {}
        const singles : SortedCats = {}
        entries.forEach(entry => {
            if(entry.category_name) {
                if(entry.category_name in check) {
                    check[entry.category_name].entries.push(entry)
                    delete singles[entry.category_name]
                    sorted[entry.category_name] = check[entry.category_name]
                } else {       
                    check[entry.category_name] = {
                        category_name: entry.category_name,
                        entries: [entry]
                    }
                    singles[entry.category_name] = {
                        category_name: entry.category_name,
                        entries: [entry]
                    }
                }
            }
        })
        setSortedWinners(sorted)
        setSingleCategories(singles)
    }

    const getSections = (categories: SortedCats) => {
        const sections = Object.keys(categories).map(cat => {
            const category = categories[cat]
            return (
                <div key={cat} className={styles.category}>
                    <Text className={styles.header} type={TEXT_TYPES.LABEL}>{cat}</Text>
                    <div className={styles.entries}>
                    { category.entries.sort((a,b) => {
                        if (a.is_winner_gold) return -1
                        if (a.is_winner_silver) return 1
                        return 0
                    }).map(entry => {
                        return (
                            <EntryCard
                                key={entry.id}
                                entry={entry}
                                noMargin={true}
                                onlyDisplay={true}
                                onShowClick={onClick}
                            />
                        )
                    })}
                    </div>
                </div>
            )
        })
        return sections
    }

    return (
        <div>
            <section>
                <ul className={styles.list}>
                    {sortedWinners ?
                    getSections(sortedWinners)
                    :
                    <Loader />
                    }
                    {singleCategories && getSections(singleCategories)}
                </ul>
            </section>
            <EntryModal 
            show={showModal} 
            onClose={onModalClose}
            currentEntry={modalId || 0}
            entries={entries}
            />
        </div>
    )
}

export default WinnerGallery
