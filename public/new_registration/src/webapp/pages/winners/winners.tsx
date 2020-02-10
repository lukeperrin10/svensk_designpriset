import * as React from 'react'
import {useEffect, useState} from 'react'
import styles from './winners.module.css'
import { IEntry } from '../../model'
import * as hosts from '../../config/host'
import WinnerGallery from '../../components/winner_gallery'
import { RouteComponentProps } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Meta from '../../components/meta'

type WinnersParams = {
    year: string
}

const Winners = ({ match }:RouteComponentProps<WinnersParams>) => {
    const [winners, setWinners] = useState<IEntry[]>([])
    const [selectedYear, setSelectedYear] = useState<string>()

    useEffect(() => {
        fetchWinners()
    }, [])

    const fetchWinners = async () => {
        const {year} = match.params
        const arg = year ? year : new Date().getFullYear()
        setSelectedYear(arg.toString())
        try {
            const response = await fetch(`${hosts.WINNER_URL}?year=${arg}`)
            const json = await response.json()
            setWinners(json)
        } catch(error) {
            console.log(error)
        }
    }

    const getMeta = () => {
        const {year} = match.params
        const arg = year ? year : new Date().getFullYear()
        /* WARNING: Vänta in design för bild ??*/
        return (    
            <Meta 
            title={`Vinnare ${arg}`} 
            description={`Svenska Designprisets vinnare år ${arg}`} 
            image={winners.length > 0 ? winners[0].avatar : ''}/>
        )
    }

    return (
        <main>
            {getMeta()}
            <WinnerGallery entries={winners} />
        </main>
    )
}

export default Winners