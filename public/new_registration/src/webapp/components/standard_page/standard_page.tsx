import * as React from 'react'
import styles from './standard_page.module.css'
import {Helmet} from 'react-helmet'
import Meta from '../meta'

interface props {
    title: string
    content: string,
    image: string
}

const StandardPage = ({title, content, image}:props) => {
    return (
        <main>
            <Meta
            title={title}
            image={image} />
            <article>
                <h2>{title}</h2>
                <img src={image} alt={`${title}_image`} />
                <div dangerouslySetInnerHTML={{__html: content}} />
            </article>
        </main>
    )
}

export default StandardPage
