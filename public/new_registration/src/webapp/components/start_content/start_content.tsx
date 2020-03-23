import * as React from 'react'
import styles from './start_content.module.css'
import { IContent } from '../../model'

interface props {
    content: IContent
}

const StartContent = ({content}:props) => {
    return (
        <section className={styles.section}>
            <div className={styles.content} dangerouslySetInnerHTML={{__html: content.content}} />
        </section>
    )
}

export default StartContent
