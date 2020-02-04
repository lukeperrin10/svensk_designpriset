import * as React from 'react'
import styles from './standard_page.module.css'

interface props {
    title: string
    content: string,
    image: string
}

const StandardPage = ({title, content, image}:props) => {
    return (
        <main>
            <article>
                <h2>{title}</h2>
                <img src={image} alt={`${title}_image`} />
                <div dangerouslySetInnerHTML={{__html: content}} />
            </article>
        </main>
    )
}

export default StandardPage
