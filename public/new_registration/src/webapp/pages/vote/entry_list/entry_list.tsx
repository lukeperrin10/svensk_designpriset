import * as React from 'react'
import {useState, useEffect} from 'react'
import { IEntry, IPollCategories } from '../../../model'
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

    const getHeader = (category: {category_name: string, entries: IEntry[]}, cat: string, arrowId?: string) => {
        return (
            <header className={styles.header}>
            <div className={styles.header_left}>
                <Text type={TEXT_TYPES.LABEL} className={styles.cat_name}>{category.category_name}</Text>
                {/* <Ingress>{getCountText(category.entries)}</Ingress> */}
            </div>
            <div className={styles.header_right}>
                {checkCategoryIsVoted(parseInt(cat)) && <Label>Röstat</Label>}
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

    const getModal = (category: {category_name: string, entries: IEntry[]}, cat: string) => {
        return (
            <EntryModal 
            show={showModalCat === parseInt(cat)} 
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

    const isFirstCat = (cat: string) => {
        return Object.keys(categories)[0] === cat
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

    if (IS_MOBILE) {
        return (
            <div>
                <hr className={styles.mobile_line}></hr>
                {Object.keys(categories).map(cat => {
                    const category = categories[cat]
                    return (
                        <section key={cat} className={styles.section}>
                            {getHeader(category, cat)}
                                <div>
                                    {getList(category.entries)}
                                </div>
                                {getModal(category, cat)}
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
                {Object.keys(categories).map(cat => {
                    const category = categories[cat]
                    const arrowId = arrowPrefix+cat
                    return (
                        <section key={cat} className={styles.section}>
                            <hr></hr>
                            <Accordion.Toggle as='div' onClick={() => onAccordionToggle(cat, arrowId)} eventKey={cat}>
                               {getHeader(category, cat, arrowId)}
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={cat}>
                                <div>
                                    {getList(category.entries)}
                                </div>
                            </Accordion.Collapse>
                            {getModal(category, cat)}
                        </section>
                    )
                })}
            </Accordion>
            <hr></hr>
        </div>
    )
}

export default EntryList