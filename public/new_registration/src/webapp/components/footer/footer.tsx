import * as React from 'react'
import styles from './footer.module.css'
import { ILink } from '../../model'
import { Link } from 'react-router-dom'

interface props {
    links: ILink[]
}
const Footer = ({links}:props) => {
    return (
        <div className={styles.container}>
            {links.length > 0 &&
                links.map(link => <Link key={link.title} to={link.path}>{link.title}</Link>)
                }
        </div>
    )
}

export default Footer
