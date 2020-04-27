import * as React from 'react'
import {useState, useEffect} from 'react'
import * as hosts from '../../config/host'
import { IEntry, IVote, IPollCollection } from '../../model'
import EntryList from './entry_list'
import Summary from './summary'
import AfterPost from './after_post'
import {Md5} from 'ts-md5/dist/md5';
import * as queryString from 'query-string'
import AfterConfirmed from './after_confirmed'
import Text, { P} from '../../components/text'
import { TEXT_TYPES, HEADLINE_SIZES } from '../../components/text/text'
import { getDayWithMonth } from '../../helpers/dates'
import styles from './vote.module.css'
import VoteInstruction from '../../components/vote_instruction'
import ShareButton from '../../components/share_button'

enum STAGES {
    LIST = 'LIST',
    SUMMARY = 'SUMMARY',
    DID_SEND = 'DID_SEND',
    CONFIRMED = 'CONFIRMED'
}

interface props {
    awardPlace: string,
    awardDate: string
}

const Vote = ({awardDate, awardPlace}:props) => {

    const [poll, setPoll] = useState<IPollCollection>() 
    const [didFetchPoll, setDidFetchPoll] = useState(false)
    const [voteEntries, setVoteEntries] = useState<IEntry[]>([])
    const [currentStage, setCurrentStage] = useState(STAGES.LIST)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        getPoll()
        setCurrentStage(STAGES.LIST)
        checkForConfirms()
    }, [])

    useEffect(() => {
        setDidFetchPoll(true)
        setIsLoading(false)
    }, [poll])

    const checkForConfirms = () => {
        const query = queryString.parse(window.location.search)
        if ('confirm' in query && typeof query['confirm'] === 'string') {
            confirmVotes(query['confirm'] as string)
            setCurrentStage(STAGES.CONFIRMED)
        }
    }

    const getPoll = async () => {
        try {
            const response = await fetch(hosts.POLL_URL)
            const json = await response.json()
            setPoll(json[0])
        } catch(error) {
            console.log(error)
        }
    }

    const postVotes = async (votes: IVote[]) => {
        setError(false)
        try {
            const method = "POST"
            const url = hosts.VOTES_URL
            const headers = {"Content-Type": "application/json; charset=utf-8"}
            const response = await fetch(url, {
                method: method,
                headers: headers,
                body: JSON.stringify(addHash(votes))
            })
            console.log(response)
            if (checkResponse(response)) setCurrentStage(STAGES.DID_SEND)
        } catch (error) {
            console.log('post error')
            console.log(error)
            
        }
    }

    const confirmVotes = async (secret: string) => {
        setError(false)
        try {
            const method = "POST"
            const url = hosts.CONFIRMED_VOTE_URL
            const headers = {"Content-Type": "application/json; charset=utf-8"}
            const response = await fetch(url, {
                method: method,
                headers: headers,
                body: JSON.stringify({secret: secret})
            })
            if (checkResponse(response)) setCurrentStage(STAGES.CONFIRMED)
        } catch (error) {
            console.log('post error')
            console.log(error)
            
        }
    }

    const addHash = (votes: IVote[]) => {
        const secret = `${Md5.hashStr(votes[0].mail+Date.now())}`
        votes.forEach(vote => vote.secret = secret)
        return votes
    }

    const checkResponse = (response: Response) => {
        if (response.ok) {
            return true
        } else {
            setError(true)
            setErrorMessage(response.statusText)
            return false
        }
    }

    const resetStage = () => {
        setError(false)
        setErrorMessage('')
        setCurrentStage(STAGES.SUMMARY)
    }


    const onVote = (entry: IEntry) => {
        const arr = Array.from(voteEntries).filter(e => e.category_id !== entry.category_id)
        arr.push(entry)
        setVoteEntries(arr)
    }

    const onVoteDone = () => {
        setCurrentStage(STAGES.SUMMARY)
    }

    const onPostVotes = (votes: IVote[]) => {
        postVotes(votes)
    }

    const onChangeVotes = () => {
        setCurrentStage(STAGES.LIST)
    }

    const getContent = () => {
        switch (currentStage) {
            case STAGES.LIST:
                return (
                    <div>
                        {didFetchPoll && poll !== undefined && poll.categories !== undefined &&
                        <div>
                            <header className={styles.header}>
                                <Text type={TEXT_TYPES.H1} headlineSize={HEADLINE_SIZES.LARGE}>{poll.name}</Text>
                                <Text className={styles.subheader} type={TEXT_TYPES.H2} headlineSize={HEADLINE_SIZES.SMALL}>Sista dag är {getDayWithMonth(poll.stop)}</Text>
                            </header>
                            <summary>
                                <VoteInstruction />
                            </summary>
                            <EntryList categories={poll.categories} onVote={onVote} onVotesDone={onVoteDone} voteEntries={voteEntries}/>
                        </div>
                        }
                        <Summary pollId={poll !== undefined ? poll.id : 0} onChangeVotes={onChangeVotes} entries={voteEntries} onPostVotes={onPostVotes}/>
                    </div>
                )
            case STAGES.DID_SEND:
                return <AfterPost />
            case STAGES.CONFIRMED:
                return <AfterConfirmed awardPlace={awardPlace} awardDate={awardDate} />
            default:
                return <div></div>

        }
    }
    
    return (
        <div className={styles.container}>
            <ShareButton topAlign={true} />
           {getContent()}
           {isLoading &&
            <div style={{
                position: 'absolute', 
                top: 0, 
                left: 0, 
                height: '90vh', 
                width: '90vw', 
                textAlign: 'center',
                backgroundColor: 'rgba(255,255,255,0.9)'}}>
                    <P>LADDAR...</P>
                </div>
            }
            {error &&
            <div style={{
                position: 'absolute', 
                top: 0, 
                left: 0, 
                height: '90vh', 
                width: '90vw', 
                textAlign: 'center',
                backgroundColor: 'rgba(255,255,255,0.9)'}}>
                    <P>Något gick fel.</P>
                    <P>{errorMessage}</P>
                    <button onClick={resetStage}>Försök igen</button>
                </div>
            }
        </div>
    )
}

export default Vote