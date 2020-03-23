import * as React from 'react'
import styles from './page_container.module.css'

interface props {
    className?: string
}

const PageContainer : React.FunctionComponent<props> = ({className, children}) => {
    return (
        <main className={[styles.container, className].join(' ')}>
            {children}
        </main>
    )
}

export default PageContainer
