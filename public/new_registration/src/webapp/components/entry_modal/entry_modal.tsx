import * as React from 'react'
import {useState, useEffect} from 'react'
import styles from './entry_modal.module.css'
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

    const [entry, setEntry] = useState<IEntry>()
    const [prevEntry, setPrevEntry] = useState<IEntry | undefined>()
    const [nextEntry, setNextEntry] = useState<IEntry | undefined>()

    useEffect(() => {
        setCurrentEntry()
    },[])

    useEffect(() => {
        setCurrentEntry()
    },[currentEntry])

    useEffect(() => {
        console.log(prevEntry)
    }, [prevEntry])

    useEffect(() => {
        setPrevNext()
    }, [entry])

    const setCurrentEntry = (newCurrEntry?: IEntry) => {
        console.log('set current entry')
        if (entries.length > 0) {
            const currE = newCurrEntry || currentEntry
            const curr = entries.findIndex(e => e.id === currE)
            if (entries[curr]) setEntry(entries[curr])
            setPrevNext()
        } 
    }

    const setPrevNext = () => {
        if (entries.length > 0 && entry) {
            const curr = entries.findIndex(e => e.id === entry.id)
            if (entries[curr-1]) setPrevEntry(entries[curr-1])
            else setPrevEntry(undefined)
            if (entries[curr+1]) setNextEntry(entries[curr+1])
            else setNextEntry(undefined)
        } 
    }

    const onPrevNextClick = (entry: IEntry) => {
        setEntry(entry)
        setPrevNext()
    }

    return (
        <Modal 
        dialogClassName={styles.modal}
        onHide={onClose} 
        animation={false} 
        show={show}>
            {entry &&
            <EntryDisplay 
            categoryName={categoryName} 
            nextEntry={nextEntry}
            prevEntry={prevEntry}
            onPrevNextClick={onPrevNextClick}
            entry={entry} />
            }
        </Modal>
    )
}

export default EntryModal
