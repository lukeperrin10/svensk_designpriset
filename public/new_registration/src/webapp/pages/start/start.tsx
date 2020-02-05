import * as React from 'react'
import {useState, useEffect} from 'react'
import { IEntry, IContent } from '../../model'
import * as hosts from '../../config/host'
import WinnerGallery from '../../components/winner_gallery'
import { PATHS } from '../../config/path'
import { Link } from 'react-router-dom'
import { getText } from '../../helpers'

interface props {
    content?: IContent
}
const Start = ({content}:props) => {
    
    const [winners, setWinners] = useState<IEntry[]>([])

    useEffect(() => {
        fetchWinners()
    }, [])

    const fetchWinners = async () => {
        const year = new Date().getFullYear()
        try {
            const response = await fetch(`${hosts.WINNER_URL}?year=${year}`)
            const json = await response.json()
            setWinners(json)
        } catch(error) {
            console.log(error)
        }
    }
    
    return (
        <main>
            {content && 
            <div dangerouslySetInnerHTML={{__html: content.content}}/>
            }
            <WinnerGallery entries={winners}/>
            <Link to={PATHS.WINNERS}>{getText("Se alla vinnare")}</Link>
        </main>
    )
}

export default Start