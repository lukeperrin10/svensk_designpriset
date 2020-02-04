import * as React from 'react'
import {useEffect, useState} from 'react'
// import {useParams} from 'react-router-dom'
import styles from './winner.module.css'
import * as hosts from '../../config/host'
import { IEntry } from '../../model'
import { match, RouteComponentProps } from 'react-router-dom'

type WinnerParams = {id: string}

const Winner = ({ match }:RouteComponentProps<WinnerParams>) => {
    // const {id} =  useParams()
    const [winner, setWinner] = useState<IEntry>()

    useEffect(() => {
        fetchWinner()
    }, [])

    const fetchWinner = async () => {
        if (match.params.id) {
            try {
                const response = await fetch(`${hosts.WINNER_URL}/${match.params.id}`)
                const json = await response.json()
                setWinner(json[0])
            } catch(error) {
                console.log(error)
            }
        }
        
    }

    return (
        <main>
            <h1>{winner?.entry_name}</h1>
        </main>
    )
}

export default Winner