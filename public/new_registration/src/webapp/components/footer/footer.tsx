import * as React from 'react'
import styles from './footer.module.css'
import { ILink } from '../../model'
import { Link, NavLink } from 'react-router-dom'

interface props {
    links: ILink[]
}
const Footer = ({links}:props) => {
    return (
        <footer className={styles.container}>
            <nav>
            {links.length > 0 &&
                links.map(link => <NavLink exact key={link.title} to={"/"+link.path}>{link.title}</NavLink>)
                }
            </nav>
        </footer>
    )
}

export default Footer
