import * as React from 'react'
import {useState} from 'react'
import styles from './winner_gallery.module.css'
import { IEntry } from '../../model'
import WinnerCard from '../winner_card'
import { PATHS } from '../../config/path'
import { createSlug } from '../../helpers'
import EntryCard from '../entry_card'
import EntryModal from '../entry_modal'

interface props {
    entries: IEntry[],
    onEntryClick?: (id: number) => void
}

const WinnerGallery = ({entries, onEntryClick}:props) => {

    const [modalId, setModalId] = useState<number>()
    const [showModal, setShowModal] = useState(false)

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

    return (
        <div>
            <section>
                <ul className={styles.list}>
                    {entries.length > 0 &&
                    entries.map(entry => {
                        return (
                            <EntryCard
                                key={entry.id}
                                entry={entry}
                                onlyDisplay={true}
                                onShowClick={onClick}
                            />
                            )
                        })
                    }
                </ul>
            </section>
            <EntryModal 
            show={showModal} 
            onClose={onModalClose}
            categoryName={'FIXA!'}
            currentEntry={modalId || 0}
            entries={entries}
            />
        </div>
    )
}

export default WinnerGallery
