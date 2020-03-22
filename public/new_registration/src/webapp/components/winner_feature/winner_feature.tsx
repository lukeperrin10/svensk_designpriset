import * as React from 'react'
import styles from './winner_feature.module.css'
import { IEntry } from '../../model'
import { assembleMediaUrl } from '../../helpers'
import Text, { Ingress } from '../text'
import { TEXT_TYPES, HEADLINE_SIZES } from '../text/text'

interface props {
    entry: IEntry
}

const WinnerFeature = ({entry}:props) => {
    return (
        <section className={styles.section}>
            <img className={styles.img} src={assembleMediaUrl(entry.avatar)} alt={entry.entry_name} />
            <div className={styles.text_container}>
                <Text className={styles.headline} type={TEXT_TYPES.H2} headlineSize={HEADLINE_SIZES.MEDIUM}>{entry.entry_name}</Text>
                <Ingress>Guld {entry.year}</Ingress>
                <Ingress>Fixa kategori</Ingress>
            </div>
        </section>
    )
}

export default WinnerFeature
