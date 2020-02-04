import * as React from 'react'
import styles from './winner_gallery.module.css'
import { IEntry } from '../../model'
import WinnerCard from '../winner_card'
import { PATHS } from '../../config/path'
import { createSlug } from '../../helpers'

interface props {
    entries: IEntry[]
}

const WinnerGallery = ({entries}:props) => {
    return (
        <section>
            <ul>
                {entries.length > 0 &&
                entries.map(entry => {
                    return (
                        <WinnerCard 
                            key={entry.id}
                            title={entry.entry_name}  
                            image={entry.avatar}
                            path={`${PATHS.WINNERS}/${entry.id}`}/>
                    )
                })
                }
            </ul>
        </section>
    )
}

export default WinnerGallery
