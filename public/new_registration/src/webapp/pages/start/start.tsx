import * as React from 'react'
import {useState, useEffect} from 'react'
import { IEntry, IContent, IYearConfig } from '../../model'
import * as hosts from '../../config/host'
import WinnerGallery from '../../components/winner_gallery'
import { PATHS } from '../../config/path'
import { Link } from 'react-router-dom'
import { getText } from '../../helpers'
import { Helmet } from 'react-helmet'
import Meta from '../../components/meta'
import { useSelector } from 'react-redux'
import { IState } from '../../model/state'
import {useHistory} from 'react-router-dom'
import styles from './start.module.css'
import WinnerFeature from '../../components/winner_feature'

interface props {
    content?: IContent
}
const Start = ({content}:props) => {
    let history = useHistory()
    const [winners, setWinners] = useState<IEntry[]>([])
    const [featureWinner, setFeatureWinner] = useState<IEntry>()
    const yearConfig = useSelector<IState, IYearConfig>(state => state.yearConfigState.config)

    useEffect(() => {
        fetchWinners()
    }, [yearConfig])

    useEffect(() => {
        setRandomWinner()
    }, [winners])

    const setRandomWinner = () => {
        if (winners.length > 0) {
            const index = Math.floor(Math.random() * Math.floor(winners.length))
            setFeatureWinner(winners[index])
        }
    }

    const fetchWinners = async () => {
        const year = new Date().getFullYear()
        try {
            const response = await fetch(`${hosts.WINNER_URL}?year=${year}&phase=${yearConfig.current_phase}`)
            const json = await response.json()
            setWinners(json)
            console.log(json)
        } catch(error) {
            console.log(error)
        }
    }
    
    return (
        <main className={styles.main}>
            <Meta />
            {featureWinner &&
            <WinnerFeature entry={featureWinner} />
            }
            {content && 
            <div dangerouslySetInnerHTML={{__html: content.content}}/>
            }

            <Link to="/rostning">Rösta</Link>
            <Link to="/anmalan">Anmälan</Link>
            <WinnerGallery entries={winners}/>
            <Link to={PATHS.WINNERS}>{getText("Se alla vinnare")}</Link>
        </main>
    )
}

export default Start