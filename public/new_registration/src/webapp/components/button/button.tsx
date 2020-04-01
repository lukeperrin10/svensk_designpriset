import * as React from 'react'
import {useRef, useEffect} from 'react'
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
    preventDefault?: boolean,
    id?: string,
    blur?: boolean
}

const Button = ({onClick, title, className, variant, size, preventDefault, id, blur}:props) => {

    const buttonRef = useRef<HTMLButtonElement>(null)
    

    const blurButton = () => {
        buttonRef.current?.blur()
    }
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

    const onButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (!blur) blurButton()
        if (preventDefault) {
            e.preventDefault()
            e.stopPropagation()
        }
        onClick()
    }
    return (
        <button ref={buttonRef} id={id} onFocus={() => console.log('f cap')} className={[styles.button, getVariant(), getSize(), className].join(' ')} onClick={onButtonClick}>{title}</button>
    )
}

export default Button
