import * as React from 'react'
import {useEffect, useState} from 'react'
import styles from './winners.module.css'
import { IEntry } from '../../model'
import * as hosts from '../../config/host'
import WinnerGallery from '../../components/winner_gallery'

const Winners = () => {
    const [winners, setWinners] = useState<IEntry[]>([])

    useEffect(() => {
        fetchWinners()
    }, [])

    const fetchWinners = async () => {
        console.log('fetch content')
        try {
            const response = await fetch(hosts.WINNER_URL)
            const json = await response.json()
            setWinners(json)
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <main>
            <WinnerGallery entries={winners} />
        </main>
    )
}

export default Winners