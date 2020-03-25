// @ts-nocheck
import * as React from 'react'
import {useState} from 'react'
import styles from './share_button.module.css'
import share from '../../assets/ui/share.svg'

const data = {
    url: 'www.hej.se'
}

const ShareButton = () => {
    const [test, setTest] = useState('hej')
    const onShareClick = async () => {
        
    }
    return (
        <div>
            <img onClick={onShareClick} src={share} alt="Dela" />
            <p>{test}</p>
        </div>
        
    )
}

export default ShareButton
