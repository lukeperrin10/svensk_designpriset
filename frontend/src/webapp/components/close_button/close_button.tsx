import * as React from 'react'
import styles from './close_button.module.css'
import close from '../../assets/ui/close.svg'

interface props {
    onClick: () => void
}

const CloseButton = ({onClick}:props) => {
    return (
        <button onClick={onClick} className={styles.button}><img src={close} alt="Stäng" /></button>
    )
}

export default CloseButton
