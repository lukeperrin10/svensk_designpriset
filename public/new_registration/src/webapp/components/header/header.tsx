import * as React from 'react'
import {useEffect} from 'react'
import styles from './header.module.css'
import Button from '../button'
import { BUTTON_VARIANTS } from '../button/button'
import logo from '../../assets/logo/logo.svg'
import crown from '../../assets/logo/crown.svg'

interface props {
    buttonOnClick: () => void,
    buttonTitle: string,
    isRoot?: boolean
}

const headerId = 'xxxx_header_id'
const imageContId = 'xxxx_image_cont_id'
const imageId = 'xxxx_image_id'

const Header  = ({buttonOnClick, buttonTitle, isRoot}:props) => {
    let didExpand = false
    let didMinimize = false

    useEffect(() => {
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    },[])

    const onScroll = () => { 
        const scrollPos = window.scrollY
        if (scrollPos >= 150) {
            if (!didExpand) {
                didExpand = true
                didMinimize = false
                adapt(true)
            }
            
        }
        else if (scrollPos === 0) {
            if (!didMinimize) {
                adapt(false)
                didMinimize = true
                didExpand = false
            }
        }
    }

    const adapt = (minimize?: boolean) => {
            const container = document.getElementById(headerId)
            const imageContainer = document.getElementById(imageContId)
            const image = document.getElementById(imageId)
            if (container && imageContainer && image) {
                if (minimize) {
                    container.classList.toggle(styles.container_minimized)
                    imageContainer.classList.remove(styles.logo_container_maximized)
                    imageContainer.classList.toggle(styles.logo_container_minimized)
                    image.classList.toggle(styles.logo_minimized)
                } else {
                    container.classList.remove(styles.container_minimized)
                    imageContainer.classList.toggle(styles.logo_container_maximized)
                    imageContainer.classList.remove(styles.logo_container_minimized)
                    image.classList.remove(styles.logo_minimized)
                }
            }
    }

    const onButtonClick = () => {
        buttonOnClick()
    }

    return (        
        <div id={headerId} className={styles.container}>
            <div id={imageContId} className={[styles.logo_container, styles.logo_container_maximized].join(' ')}>
                <img id={imageId} src={logo} className={styles.logo} alt="Logga" />
                <img src={crown} className={styles.crown} alt="Logga" />
            </div>
            <div className={styles.border} />
            
            <Button onClick={onButtonClick} title={buttonTitle} variant={isRoot ? BUTTON_VARIANTS.PRIMARY : BUTTON_VARIANTS.TERTIARY} />
        </div>
    )
}

export default Header
