import * as React from 'react'
import styles from './footer.module.css'
import { ILink, IContent } from '../../model'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/logo/logo.svg'

interface props {
    links: ILink[],
    content: IContent[]
}
const Footer = ({links, content}:props) => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.logo_container}>
                    <img className={styles.logo} src={logo} alt='Logga' />
                    <div className={styles.border}>
                    </div>
                </div>
                <nav className={styles.nav}>
                {links.length > 0 &&
                    links.map(link => <NavLink className={styles.link} exact key={link.title} to={"/"+link.path}>{link.title}</NavLink>)
                    }
                </nav>
                    {content && content.map(cont => {
                        return <div className={styles.content_container} dangerouslySetInnerHTML={{__html: cont.content}} />
                    })}
            </div>
        </footer>
    )
}

export default Footer
