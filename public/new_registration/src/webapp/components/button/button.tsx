import * as React from 'react'
import styles from './button.module.css'

export enum BUTTON_VARIANTS {
    PRIMARY = 'PRIMARY',
    SECONDARY = 'SECONDARY',
    TERTIARY = 'TERTIARY',
    NONE = 'NONE'
}

export enum BUTTON_SIZES {
    STANDARD = 'STANDARD',
    SMALL = 'SMALL',
    NONE = 'NONE'
}

interface props {
    onClick: () => void,
    title: string
    className?: string,
    variant?: BUTTON_VARIANTS,
    size?: BUTTON_SIZES,
}

const Button = ({onClick, title, className, variant, size}:props) => {

    const getVariant = () => {
        switch (variant) {
            case BUTTON_VARIANTS.PRIMARY:
                return styles.primary
            case BUTTON_VARIANTS.SECONDARY:
                return styles.secondary
            case BUTTON_VARIANTS.TERTIARY:
                return styles.tertiary
            case BUTTON_VARIANTS.NONE:
                return ''
            default:
                return styles.primary
        }
    }

    const getSize = () => {
        switch (size) {
            case BUTTON_SIZES.STANDARD:
                return [styles.standard, styles.text].join(' ')
            case BUTTON_SIZES.SMALL:
                return styles.small
            case BUTTON_SIZES.NONE:
                return ''
            default:
                return [styles.standard, styles.text].join(' ')
        }
    }
    return (
        <button className={[styles.button, getVariant(), getSize(), className].join(' ')} onClick={onClick}>{title}</button>
    )
}

export default Button
