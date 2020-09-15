import * as React from 'react'
import styles from './text.module.css'

export enum TEXT_TYPES {
    H1 = 'h1',
    H2 = 'H2',
    H3 = 'H3',
    H4 = 'H4',
    P = 'P',
    INGRESS = 'INGRESS',
    LABEL = 'LABEL'
}

export enum HEADLINE_SIZES {
    LARGE = 'LARGE',
    MEDIUM = 'MEDIUM',
    SMALL = 'SMALL',
    EXTRA_SMALL = 'EXTRA_SMALL'
}

interface props {
    type: TEXT_TYPES,
    headlineSize?: HEADLINE_SIZES,
    className?: string
}

const Text : React.FunctionComponent<props> = ({type, headlineSize, className, children}) => {

    const getStyle = () => {
        switch (headlineSize) {
            case HEADLINE_SIZES.LARGE:
                return styles.large_headline
            case HEADLINE_SIZES.MEDIUM:
                return styles.medium_headline
            case HEADLINE_SIZES.SMALL:
                return styles.small_headline
            case HEADLINE_SIZES.EXTRA_SMALL:
                return styles.extra_small_headline
            default:
                return styles.small_headline
        }
    }

    const getType = () => {
        switch (type) {
            case TEXT_TYPES.H1:
                return <h1 className={[getStyle(), className].join(' ')}>{children}</h1>
            case TEXT_TYPES.H2:
                return <h2 className={[getStyle(), className].join(' ')}>{children}</h2>
            case TEXT_TYPES.H3:
                return <h3 className={[getStyle(), className].join(' ')}>{children}</h3>
            case TEXT_TYPES.H4:
                return <h4 className={[getStyle(), className].join(' ')}>{children}</h4>
            case TEXT_TYPES.P:
                return <p className={[styles.plain_text, className].join(' ')}>{children}</p>
            case TEXT_TYPES.INGRESS:
                return <p className={[styles.ingress, className].join(' ')}>{children}</p>
            case TEXT_TYPES.LABEL:
                return <p className={[styles.label, className].join(' ')}>{children}</p>
            default:
                return <p>{children}</p>
        }
    }

    return getType()
}

export default Text
