import * as React from 'react'
import styles from './standard_page.module.css'
import {Helmet} from 'react-helmet'
import Meta from '../meta'
import { assembleMediaUrl } from '../../helpers'
import PageContainer from '../page_container'
import Text from '../text'
import { TEXT_TYPES, HEADLINE_SIZES } from '../text/text'

interface props {
    title: string
    content: string,
    image: string
}

const StandardPage = ({title, content, image}:props) => {
    return (
        <PageContainer>
            <Meta
            title={title}
            image={image} />
            <article>
                <img className={styles.img} src={assembleMediaUrl(image)} alt={`${title}_image`} />
                <Text className={styles.header} type={TEXT_TYPES.H1} headlineSize={HEADLINE_SIZES.LARGE}>
                    {title}
                </Text>
                <div className={styles.content} dangerouslySetInnerHTML={{__html: content}} />
            </article>
        </PageContainer>
    )
}

export default StandardPage
