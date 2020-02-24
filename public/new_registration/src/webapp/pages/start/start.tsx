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


interface props {
    content?: IContent
}
const Start = ({content}:props) => {
    
    const [winners, setWinners] = useState<IEntry[]>([])
    const yearConfig = useSelector<IState, IYearConfig>(state => state.yearConfigState.config)

    useEffect(() => {
        fetchWinners()
    }, [yearConfig])

    const fetchWinners = async () => {
        const year = new Date().getFullYear()
        try {
            const response = await fetch(`${hosts.WINNER_URL}?year=${year}&phase=${yearConfig.current_phase}`)
            const json = await response.json()
            setWinners(json)
        } catch(error) {
            console.log(error)
        }
    }
    
    return (
        <main>
            <Meta />
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