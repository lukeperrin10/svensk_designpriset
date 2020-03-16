import * as React from 'react'
import {useState, useEffect} from 'react'
// import styles from './entry_modal.module.css'
import Modal from 'react-bootstrap/Modal'
import { IEntry } from '../../model'
import EntryDisplay from '../entry_display'

interface props {
    show: boolean,
    onClose: () => void,
    onOtherEntryClick: (id: number) => void,
    entries: IEntry[],
    currentEntry: number,
    categoryName: string
}

const EntryModal = ({show, 
    onClose, 
    onOtherEntryClick, 
    entries, 
    currentEntry, 
    categoryName}: props) => {

    const [entry, setEntry] = useState(entries[0] || null)

    useEffect(() => {
        setCurrentEntry()
    },[])

    useEffect(() => {
        setCurrentEntry()
    },[currentEntry])

    const setCurrentEntry = () => {
        if (entries.length > 0) {
            const entry = entries.find(e => e.id === currentEntry)
            if (entry) setEntry(entry)
        } 
    }

    return (
        <Modal onHide={onClose} animation={false} show={show}>
            <EntryDisplay 
            categoryName={categoryName} 
            entry={entry} />
        </Modal>
    )
}

export default EntryModal
