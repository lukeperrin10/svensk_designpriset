import * as React from 'react'
import {useState, useEffect} from 'react'
import styles from './entry_modal.module.css'
import Modal from 'react-bootstrap/Modal'
import { IEntry } from '../../model'
import EntryDisplay from '../entry_display'
import { IS_MOBILE } from '../../config/style'

interface props {
    show: boolean,
    onClose: () => void,
    entries: IEntry[],
    currentEntry: number,
    categoryName: string,
    onVoteClick?: (entry: IEntry) => void,
    voteEntries?: IEntry[],
}

const EntryModal = ({show, 
    onClose, 
    entries, 
    onVoteClick,
    voteEntries,
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

    const checkIsVoted = (id: number) => {
        if (voteEntries) {
            return voteEntries.filter(e => e.id === id).length > 0
        }
        return false
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
            onVoteClick={onVoteClick}
            onClose={IS_MOBILE ? onClose : undefined}
            isVoted={checkIsVoted(entry.id)}
            entry={entry} />
            }
        </Modal>
    )
}

export default EntryModal
