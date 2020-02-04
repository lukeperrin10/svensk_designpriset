import * as React from 'react'
import {useState, useEffect} from 'react'
import { IEntry, IContent } from '../../model'
import * as hosts from '../../config/host'
import WinnerGallery from '../../components/winner_gallery'

interface props {
    content?: IContent
}
const Start = ({content}:props) => {
    
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
        <div>
            {/* <div dangerouslySetInnerHTML={{__html: content.content}}/> */}
            <WinnerGallery entries={winners}/>
        </div>
    )
}

export default Start