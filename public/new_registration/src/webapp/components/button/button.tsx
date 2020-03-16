import * as React from 'react'
import styles from './button.module.css'

interface props {
    onClick: () => void,
    title: string
    className?: string
}

const Button = ({onClick, title, className}:props) => {
    return (
        <button className={[styles.button, className].join(' ')} onClick={onClick}>{title}</button>
    )
}

export default Button
