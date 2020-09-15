import * as React from 'react'
import {useState, useEffect} from 'react'
import { IEntry, IPollCategories, IPollCategory } from '../../../model'
import EntryCard from '../../../components/entry_card'
import styles from './entry_list.module.css'
import Accordion from 'react-bootstrap/Accordion'
import Button from '../../../components/button'
import EntryModal from '../../../components/entry_modal'
import Text, { H2, P, Ingress, Label } from '../../../components/text'
import { IS_MOBILE } from '../../../config/style'
import arrow from '../../../assets/ui/arrow.svg'
import { TEXT_TYPES } from '../../../components/text/text'

interface IEntryList {
    categories: IPollCategories
    // entries: IEntry[],
    voteEntries: IEntry[],
    onVote: (entry: IEntry) => void,
    onVotesDone: () => void,
    // title: string
}

const arrowPrefix = 'entry_arrow_id_'

const EntryList = ({onVote, voteEntries, onVotesDone, categories}: IEntryList) => {
    // const [voteEntries, setVoteEntries] = React.useState<IEntry[]>([])

    const [modalCategory, setModalCategory] = useState('')
    const [showModalCat, setShowModalCat] = useState<number>()
    const [modalEntry, setModalEntry] = useState<number>()
    const [arrowIds, setArrowIds] = useState<string[]>([])

    useEffect(() => {
        addIds(categories)
    },[])

    const onCardClicked = (entry: IEntry) => {
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

    const showEntry = (category: number, entry: number) => {
        setModalEntry(entry)
        setShowModalCat(category)
    }

    const getCountText = (entries: IEntry[]) => {
        return `${entries.length} nominerade`
    }
    const getFirstCatId = () => {
        return Object.keys(categories)[0]
    }

    const hideModal = () => {
        setShowModalCat(undefined)
    }

    const changeModalEntry = (id: number) => {
        setModalEntry(id)
    }

    const getHeader = (category: {category_name: string, entries: IEntry[]}, cat: number, arrowId?: string) => {
        return (
            <header className={styles.header}>
            <div className={styles.header_left}>
                <Text type={TEXT_TYPES.LABEL} className={styles.cat_name}>{category.category_name}</Text>
                {/* <Ingress>{getCountText(category.entries)}</Ingress> */}
            </div>
            <div className={styles.header_right}>
                {checkCategoryIsVoted(cat) && <Label>Röstat</Label>}
                {arrowId && <img className={[styles.arrow, isFirstCat(cat) && styles.arrow_up].join(' ')} id={arrowId} src={arrow} alt='' />}
                
            </div>
            
        </header>
        )
    }


    const getList = (entries: IEntry[]) => {
        return (
            <ul className={IS_MOBILE ? styles.list_mobile : styles.list}>
                {entries.map((e: IEntry) => {
                    return (
                        <EntryCard 
                        onShowClick={() => showEntry(e.category_id, e.id)} 
                        isVoted={checkIsVoted(e.id)} 
                        key={e.id} onVoteClick={onCardClicked} 
                        entry={e} />
                    )}
                )}
            </ul>
        )
    }

    const getModal = (category: {category_name: string, entries: IEntry[]}, cat: number) => {
        return (
            <EntryModal 
            show={showModalCat === cat} 
            onClose={hideModal}
            categoryName={category.category_name}
            currentEntry={modalEntry || 0}
            entries={category.entries}
            onVoteClick={onVote}
            voteEntries={voteEntries}
            />
        )
    }

    const onAccordionToggle = (cat: string, arrowId: string) => {
        const arr = document.getElementById(arrowId)
        const minArr = arrowIds.filter(id => id !== arrowId)
        minArr.forEach(minId => {
            const a = document.getElementById(minId)
            if (a) a.classList.remove(styles.arrow_up)
        })
        if (arr) {
            if (arr.classList.contains(styles.arrow_up)) {
                arr.classList.remove(styles.arrow_up)
            } else {
                arr.classList.toggle(styles.arrow_up)
            }
            window.scrollTo({
                top: arr.offsetTop-600,
                left: 0,
                behavior: 'smooth'
            })
        }

    }

    const isFirstCat = (cat: number) => {
        return Object.keys(categories)[0] === cat.toString()
    }

    const isExpanded = (arrowId: string) => {
        const arr = document.getElementById(arrowId)
        if (arr) {
            return arr.classList.contains(styles.arrow_up)
        }
        return false
    }

    const addIds = (cats: IPollCategories) => {
        const ids = Object.keys(cats).map(cat => arrowPrefix+cat)
        setArrowIds(ids)
    }

    const sortCategories = (cats: IPollCategories) => {
        const arr : IPollCategory[]  = Object.keys(cats).map(cat => cats[cat])
        return arr.sort((a,b) => {
            if (a.category_order < b.category_order) return -1
            if (a.category_order > b.category_order) return 1
            return 0
        })
    }

    if (IS_MOBILE) {
        return (
            <div>
                <hr className={styles.mobile_line}></hr>
                {sortCategories(categories).map(category => {
                    return (
                        <section key={category.category_id} className={styles.section}>
                            {getHeader(category, category.category_id)}
                                <div>
                                    {getList(category.entries)}
                                </div>
                                {getModal(category, category.category_id)}
                                <hr className={styles.mobile_divider}></hr>
                        </section>
                    )
                })}
            </div>
        )
    }
    return (
        <div>
            <Accordion defaultActiveKey={getFirstCatId()}>
                {sortCategories(categories).map(category => {
                    const arrowId = arrowPrefix+category.category_id
                    return (
                        <section key={category.category_id} className={styles.section}>
                            <hr></hr>
                            <Accordion.Toggle as='div' onClick={() => onAccordionToggle(category.category_id.toString(), arrowId)} eventKey={category.category_id.toString()}>
                               {getHeader(category, category.category_id, arrowId)}
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={category.category_id.toString()}>
                                <div>
                                    {getList(category.entries)}
                                </div>
                            </Accordion.Collapse>
                            {getModal(category, category.category_id)}
                        </section>
                    )
                })}
            </Accordion>
            <hr></hr>
        </div>
    )
}

export default EntryList