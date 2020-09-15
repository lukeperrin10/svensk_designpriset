// @ts-nocheck
import * as React from 'react'
import {useState} from 'react'
import styles from './share_button.module.css'
import share from '../../assets/ui/share.svg'
import {useHistory} from 'react-router-dom'
import {
    FacebookShareButton, 
    LinkedinShareButton, 
    TwitterShareButton,
    RedditShareButton,
    FacebookIcon,
    LinkedinIcon,
    TwitterIcon,
    RedditIcon,
} from 'react-share'
import { FRONTEND_URL } from '../../config/host'
import { IS_MOBILE } from '../../config/style'

interface props {
    url?: string,
    topAlign?: boolean
}

const ShareButton = ({url, topAlign}:props) => {
    const contId = 'share_button_id'
    const size = 50
    const history = useHistory()
    const [test, setTest] = useState('hej')

    const onShareClick = async () => {
        document.getElementById(contId)?.classList.toggle(styles.share_buttons_show)
        setTimeout(() => {
            document.getElementById(contId)?.classList.remove(styles.share_buttons_show)
        },3000)
    }

    const getUrl = () => {
        if (url) return url
        return FRONTEND_URL+history.location.pathname
        // const url = window.location.href
    }
    return (
        <div>
        <div className={styles.container}>
            <button className={styles.button} onClick={onShareClick}>
                <img className={styles.icon} src={share} alt="Dela" />
            </button>
            <div id={contId} className={styles.share_buttons}>
                <FacebookShareButton url={getUrl()}>
                    <FacebookIcon size={size} />
                </FacebookShareButton>
                <LinkedinShareButton url={getUrl()}>
                    <LinkedinIcon size={size} />
                </LinkedinShareButton>
                <TwitterShareButton url={getUrl()}>
                    <TwitterIcon size={size} />
                </TwitterShareButton>
            </div>
        </div>
        {(IS_MOBILE || topAlign) && <div className={styles.spacer}></div>}
        </div>
        
    )
}

export default ShareButton
