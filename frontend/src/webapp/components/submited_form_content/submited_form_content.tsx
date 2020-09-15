import * as React from 'react'
import styles from './submited_form_content.module.css'
import {H2, P} from '../text/text_semantict'
import { IProfile , IEntry} from '../../model'
import Text from '../text'
import { TEXT_TYPES, HEADLINE_SIZES } from '../text/text'
import { MEDIA_URL, TEMP_AVATAR_URL } from '../../config/host'

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

const entryItems = [
    {key: 'entry_name', label: 'Bidragets namn'}, 
    {key: 'customer', label: 'Uppdragsgivare'}, 
    {key: 'description', label: 'Beskrivning'}, 
    {key: 'category', label: 'Kategori'}, 
    {key: 'format', label: 'Omfång'}, 
    {key:'size', label: 'Storlek'}, 
    {key: 'webpage', label: 'Länk'}, 
    {key: 'video_url', label: 'Länk Video'}]

const workGroup = [
    {key: 'designer', label: 'Designer'},
    {key: 'leader', label: 'Projektledare'},
    {key: 'illustrator', label: 'Fotograf/illustratör'}
]

const SubmitedFormContent = ({profile, title, entry}:ISubmitedFormContent) => {

    const getItems = (items:{key:string, label:string}[]) => {
        if (entry) {
            const els = items.map(item => {
                if (item.key in entry && entry[item.key] !== '' && entry[item.key] !== null) {
                    return (
                        <div className={styles.item} key={item.key}>
                            <Text className={styles.label} type={TEXT_TYPES.P}>{item.label}</Text>
                            <div className={styles.section_content}>
                                <P>{entry[item.key]}</P>
                            </div>
                        </div>
                    )
                }
            })
            return els
        }
        return []
    }

    const getUrl = (image: string) => {
        const split = image.split('/')
        if (split.length > 1) return `${MEDIA_URL}/${image}`
        return `${TEMP_AVATAR_URL}/${image}`
    }

    const formatSource = (source: string) => {
        if (source.split('/').length > 1) return source.split('/')[1]
        return source
    }

    const getImages = () => {
        if (entry) {
            const images = []
            images.push(<img key={entry.avatar} src={getUrl(entry.avatar)} className={styles.feature_image}/>)
            if (entry.entry_images && entry.entry_images.length > 0) {
                entry.entry_images.forEach(img => images.push(<img key={img.image} className={styles.image} src={getUrl(img.image)} />))
            }
            return images
        }
        
        return []
    }
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
                    {getItems(entryItems)}
                    <Text className={styles.large_label} type={TEXT_TYPES.LABEL}>Arbetsgrupp</Text>
                    {getItems(workGroup)}
                    <Text className={styles.large_label} type={TEXT_TYPES.LABEL}>Media</Text>
                    <div className={styles.images}>
                        {getImages()}
                    </div>
                    {entry.source !== '' && entry.source !== null && entry.source !== undefined &&
                        <div className={styles.item}>
                        <Text className={styles.label} type={TEXT_TYPES.P}>Printbidrag PDF</Text>
                        <div className={styles.section_content}>
                            <P>{formatSource(entry.source)}</P>
                        </div>
                    </div>
                    }
                    
            </section>
            }
        </section>
    )
}

export default SubmitedFormContent