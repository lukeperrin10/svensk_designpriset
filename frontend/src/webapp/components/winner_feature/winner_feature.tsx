import * as React from 'react'
import styles from './winner_feature.module.css'
import { IEntry } from '../../model'
import { assembleMediaUrl } from '../../helpers'
import Text, { Ingress } from '../text'
import { TEXT_TYPES, HEADLINE_SIZES } from '../text/text'

import Placeholder from '../../assets/img/placeholder-img.jpg';


interface props {
    entry: IEntry | undefined
}

const WinnerFeature = ({entry}:props) => {
    return (
        <section className={styles.section}>
            {entry ?
            <img className={styles.img} src={assembleMediaUrl(entry.avatar)} alt={entry.entry_name} />
            :
            <img className={styles.img_placeholder} src={Placeholder}></img> }
            {entry ?
            <div className={styles.text_container}>
                <Text className={styles.headline} type={TEXT_TYPES.H2} headlineSize={HEADLINE_SIZES.MEDIUM}>{entry.entry_name}</Text>
                <Ingress>{entry.is_winner_gold ? 'Guld' : 'Silver' } {entry.year}</Ingress>
                <Ingress>{entry.category_name}</Ingress>
            </div>
            :
            <div className={styles.text_placeholder}></div>
            }
        </section>
    )
}

export default WinnerFeature
