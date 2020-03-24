import * as React from 'react'
import styles from './page_container.module.css'
import {useLocation} from 'react-router-dom'
import {useEffect} from 'react'

interface props {
    className?: string
}

const PageContainer : React.FunctionComponent<props> = ({className, children}) => {
    const {pathname} = useLocation()

    useEffect(() => {
        window.scrollTo(0,0)
    },[pathname])

    return (
        <main className={[styles.container, className].join(' ')}>
            {children}
        </main>
    )
}

export default PageContainer
