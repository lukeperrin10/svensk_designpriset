import * as React from 'react'
import styles from './standard_page.module.css'
import {Helmet} from 'react-helmet'
import Meta from '../meta'
import { assembleMediaUrl } from '../../helpers'
import PageContainer from '../page_container'

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
                <h2>{title}</h2>
                <img src={assembleMediaUrl(image)} alt={`${title}_image`} />
                <div dangerouslySetInnerHTML={{__html: content}} />
            </article>
        </PageContainer>
    )
}

export default StandardPage
