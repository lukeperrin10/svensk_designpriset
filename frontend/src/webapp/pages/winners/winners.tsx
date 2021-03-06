import * as React from 'react'
import {useEffect, useState} from 'react'
import { IEntry } from '../../model'
import * as hosts from '../../config/host'
import WinnerGallery from '../../components/winner_gallery'
import { RouteComponentProps } from 'react-router-dom'
import Meta from '../../components/meta'
import PageContainer from '../../components/page_container'
import DropDown from '../../components/dropdown'
import { assembleMediaUrl, getText } from '../../helpers'
import {useHistory} from 'react-router-dom'
import VideoPlayer from '../../components/video_player'
import ShareButton from '../../components/share_button'
import Text from '../../components/text'
import { TEXT_TYPES, HEADLINE_SIZES } from '../../components/text/text'
import styles from './winners.module.css'


export type WinnersParams = {
    year: string
}

interface props {
    currentWinnerYear: number
}

const Winners = ({ match, currentWinnerYear }:RouteComponentProps<WinnersParams> & props) => {
    let history = useHistory()
    const [winners, setWinners] = useState<IEntry[]>([])    
    const [selectedYear, setSelectedYear] = useState<string>()

    useEffect(() => {
        fetchWinners()
    }, [])

    useEffect(() => {
        fetchWinners()
    },[match])

   

    const fetchWinners = async () => {
        const {year} = match.params
        let arg = year ? year : selectedYear ? selectedYear : currentWinnerYear
        try {
            const response = await fetch(`${hosts.WINNER_URL}?year=${arg}`)
            let json = await response.json()
            if (json.length === 0) {
                const date = new Date(arg).getFullYear()-1
                const response = await fetch(`${hosts.WINNER_URL}?year=${date}`)
                json = await response.json()
                arg = date.toString()
            }
            setWinners(json)
            setSelectedYear(arg.toString())
        } catch(error) {
            console.log(error)
        }
    }

    const getMeta = () => {
        const {year} = match.params
        const arg = year ? year : new Date().getFullYear()
        /* WARNING: V??nta in design f??r bild ??*/
        
        return (    
            <Meta 
            title={`Vinnare ${arg}`} 
            description={`Svenska Designprisets vinnare ??r ${arg}`} 
            image={winners.length > 0 ? assembleMediaUrl(winners[0].avatar) : ''}/>
        )
    }

    const getYears = (current: number) => {
        const years = []
        for (let i = current;i>=2006;i--) {
            years.push(i.toString())
        }
        return years
    }

    const dropDownAction = (year: string) => {
        history.push(`/vinnare/${year}`)
    }

    return (
        <PageContainer>
            {getMeta()}
            <ShareButton topAlign={true} />
            <Text className={styles.title} type={TEXT_TYPES.H1} headlineSize={HEADLINE_SIZES.LARGE}>{getText('Alla vinnare')}</Text>
            <DropDown items={getYears(currentWinnerYear)} label={selectedYear ? selectedYear : currentWinnerYear.toString()} onAction={dropDownAction}/>
            {winners.length > 0 &&
            <WinnerGallery entries={winners} />
            }
        </PageContainer>
    )
}

export default Winners