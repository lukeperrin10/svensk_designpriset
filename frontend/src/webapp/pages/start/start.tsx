import * as React from 'react'
import {useState, useEffect} from 'react'
import { IEntry, IContent, IYearConfig } from '../../model'
import * as hosts from '../../config/host'
import WinnerGallery from '../../components/winner_gallery'
import { PATHS } from '../../config/path'
import { Link } from 'react-router-dom'
import { getText } from '../../helpers'
import Meta from '../../components/meta'
import { useSelector } from 'react-redux'
import { IState } from '../../model/state'
import {useHistory} from 'react-router-dom'
import styles from './start.module.css'
import WinnerFeature from '../../components/winner_feature'
import StartContent from '../../components/start_content'
import Text from '../../components/text'
import { TEXT_TYPES, HEADLINE_SIZES } from '../../components/text/text'
import ShareButton from '../../components/share_button'
import Puff from '../../components/puff'
import { PHASES } from '../../model/constants'


interface props {
    content?: IContent[],
    calendar: IContent[]
}
const Start = ({content, calendar}:props) => {
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

    const getPuff = () => {
        if (yearConfig.current_phase === '') {
            return <Puff placeholder={true} calendar={''} variant='award' date={new Date()} awardPlace={''} />
        }
        const cal = calendar.length > 0 ? calendar[0].content : ''
        switch(yearConfig.current_phase) {
            case PHASES.ONE:
                return <Puff calendar={cal} variant='register' date={new Date(yearConfig.register_deadline_date)} awardPlace={yearConfig.award_place} />
            case PHASES.TWO:
                return <Puff calendar={cal} variant='vote' date={new Date(yearConfig.phase_3_start)} awardPlace={yearConfig.award_place} />
            case PHASES.THREE:
                return <Puff calendar={cal} variant='vote' date={new Date(yearConfig.phase_3_start)} awardPlace={yearConfig.award_place} />
            case PHASES.FOUR:
                return <Puff calendar={cal} variant='award' date={new Date(yearConfig.award_date)} awardPlace={yearConfig.award_place} />
            default:
                return <div></div>
        }
    }
    
    return (
        <main className={styles.main}>
            <Meta />
            <ShareButton/>
            <WinnerFeature entry={featureWinner} />
            {getPuff()}
            {content && content.length > 0 && <StartContent content={content[0]}/>}
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