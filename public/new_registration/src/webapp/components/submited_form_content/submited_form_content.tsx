import * as React from 'react'
import styles from './submited_form_content.module.css'
import {H2, P} from '../text/text_semantict'
import { IProfile , IEntry} from '../../model'
import Text from '../text'
import { TEXT_TYPES, HEADLINE_SIZES } from '../text/text'

export interface textContent {
    label: string,
    content: string,
    imageUrl?: string
}

interface ISubmitedFormContent {
    title: string
    entry?: IEntry,
    profile?: IProfile
}

const SubmitedFormContent = ({profile, title, entry}:ISubmitedFormContent) => {
    return (
        <section className={styles.container}>
            <Text className={styles.headline} type={TEXT_TYPES.H2} headlineSize={HEADLINE_SIZES.SMALL}>{title}</Text>
            {profile &&
            <section className={styles.section}>
                <div>
                    <Text className={styles.label} type={TEXT_TYPES.P}>Företag</Text>
                    <div className={styles.section_content}>
                        <P>{profile.company}</P>
                        <P>{profile.address}</P>
                        <P>{profile.zip} {profile.city}</P>
                        <div className={styles.web}>
                            <P>{profile.homepage}</P>
                        </div>        
                    </div>
                </div>
                <div>
                    <Text className={styles.label} type={TEXT_TYPES.P}>Kontaktperson</Text>
                    <div className={styles.section_content}>
                        <P>{profile.contact}</P>
                        <P>{profile.mail}</P>
                        <P>{profile.phone}</P>
                    </div>
                </div>
            </section>
            }
            {entry &&
                <section className={styles.section}>
                <div>
                    <Text className={styles.label} type={TEXT_TYPES.P}>Bidragets namn</Text>
                    <div className={styles.section_content}>
                        <P>{entry.entry_name}</P>
                    </div>
                </div>
                <div>
                    <Text className={styles.label} type={TEXT_TYPES.P}>Uppdragsgivare</Text>
                    <div className={styles.section_content}>
                        <P>{entry.customer}</P>
                    </div>
                </div>
            </section>
            }
        </section>
    )
}

export default SubmitedFormContent