import * as React from 'react'
import { IEntry, IPollCategories } from '../../../model'
import EntryCard from '../../../components/entry_card'
import styles from './entry_list.module.css'
import {Accordion, Card} from 'react-bootstrap'
import Button from '../../../components/button'

interface IEntryList {
    categories: IPollCategories
    // entries: IEntry[],
    voteEntries: IEntry[],
    onVote: (entry: IEntry) => void,
    onVotesDone: () => void,
    // title: string
}

const EntryList = ({onVote, voteEntries, onVotesDone, categories}: IEntryList) => {
    // const [voteEntries, setVoteEntries] = React.useState<IEntry[]>([])

    React.useEffect(() => {
        console.log(voteEntries)
    }, [voteEntries])

    const onCardClicked = (entry: IEntry) => {
        // console.log('list vote')
        // const arr = Array.from(voteEntries)
        // arr.push(entry)
        // setVoteEntries(arr)
        onVote(entry)
    }

    const checkIsVoted = (id: number) => {
        return voteEntries.filter(e => e.id === id).length > 0
    }

    const checkCategoryIsVoted = (id: number) => {
        return voteEntries.filter(e => e.category_id === id).length > 0
    }

    const onContinue = () => {
        if (voteEntries.length > 0) {
            onVotesDone()
        } else {
            console.log('no votes')
        }    
    }

    const showEntry = (entry: IEntry) => {
        console.log('show entry')
    }

    const getCountText = (entries: IEntry[]) => {
        return `${entries.length} nominerade`
    }
    const getFirstCatId = () => {
        return Object.keys(categories)[0]
    }
    return (
        <div>
            <Accordion defaultActiveKey={getFirstCatId()}>
                {Object.keys(categories).map(cat => {
                    const category = categories[cat]
                    return (
                        <section key={cat} className={styles.section}>
                            <hr></hr>
                            <Accordion.Toggle as='div' eventKey={cat}>
                                <header className={styles.header}>
                                    <div className={styles.header_left}>
                                        <h2>{category.category_name}</h2>
                                        <p>{getCountText(category.entries)}</p>
                                    </div>
                                    <div className={styles.header_right}>
                                        {checkCategoryIsVoted(parseInt(cat)) && <p>Röstat</p>}
                                    </div>
                                    
                                </header>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={cat}>
                                <div>
                                    <ul className={styles.list}>
                                        {category.entries.map((e: IEntry) => <EntryCard onShowClick={showEntry} isVoted={checkIsVoted(e.id)} key={e.id} onVoteClick={onCardClicked} entry={e} /> )}
                                    </ul>
                                </div>
                            </Accordion.Collapse>
                        </section>
                    )
                })}
            </Accordion>
            <hr></hr>
        </div>
    )
}

export default EntryList
