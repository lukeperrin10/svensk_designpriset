import * as React from 'react'
import {useEffect, useState} from 'react'
import styles from './winner.module.css'
import * as hosts from '../../config/host'
import { IEntry } from '../../model'
import { RouteComponentProps } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Meta from '../../components/meta'

type WinnerParams = {id: string}

const Winner = ({ match }:RouteComponentProps<WinnerParams>) => {
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
            <Meta
            title={winner?.entry_name}
            description={winner?.motivation}
            image={winner?.avatar} />
            <article>
                <h1>{winner?.entry_name}</h1>
                <img src={winner?.avatar} alt={winner?.entry_name} />
            </article>
            
        </main>
    )
}

export default Winner