import * as React from 'react'
import { Link } from 'react-router-dom'
import { AVATAR_URL } from '../../config/host'
// import styles from './winner_card.module.css'
interface props {
    title: string,
    image: string,
    path: string
}

const WinnerCard = ({title, image, path}:props) => {
    return (
        <li>
            <Link to={path}>
                <img src={`${AVATAR_URL}/${image}`} alt={title} />
                <h2>{title}</h2>
            </Link>
        </li>
    )
}

export default WinnerCard
