import * as React from 'react'
import styles from './header.module.css'
import Button from '../button'
import { BUTTON_VARIANTS } from '../button/button'

interface props {
    buttonOnClick: () => void,
    buttonTitle: string
}

const Header  = ({buttonOnClick, buttonTitle}:props) => {

    const onButtonClick = () => {
        buttonOnClick()
    }
    return (
        <div className={styles.container}>
            <Button onClick={onButtonClick} title={buttonTitle} variant={BUTTON_VARIANTS.PRIMARY} />
        </div>
    )
}

export default Header
