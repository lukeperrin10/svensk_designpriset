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
import StartContent from '../../components/start_content'
import Text, { H2 } from '../../components/text'
import { TEXT_TYPES, HEADLINE_SIZES } from '../../components/text/text'
import ShareButton from '../../components/share_button'

interface props {
    content?: IContent[]
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
            let json = await response.json()
            if (json.length === 0) {
                const response = await fetch(`${hosts.WINNER_URL}?year=${year-1}&phase=${yearConfig.current_phase}`)
                json = await response.json()
            }
            setWinners(json)            
        } catch(error) {
            console.log(error)
        }
    }
    
    return (
        <main className={styles.main}>
            <Meta />
            <ShareButton/>
            {featureWinner &&
            <WinnerFeature entry={featureWinner} />
            }

            {content &&
                content.map(cont => {
                    return <StartContent key={cont.title} content={cont}/>
                })
            }
            <div className={styles.winner_header}>
                <Text type={TEXT_TYPES.H2} headlineSize={HEADLINE_SIZES.LARGE}>
                    Vinnare {winners.length > 0 && winners[0].year}
                </Text>
                <Link to={PATHS.WINNERS}>{getText("Alla vinnare")}</Link>
            </div>
            
            <WinnerGallery entries={winners}/>
            
        </main>
    )
}

export default Start