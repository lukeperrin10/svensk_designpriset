import * as React from 'react'
import { IEntry, IVote } from '../../../model'
import EntryCard from '../../../components/entry_card'

interface ISummary {
    entries: IEntry[],
    onPostVotes: (votes: IVote[]) => void,
    onChangeVotes: () => void,
    pollId: number
}

const Summary = ({entries, onPostVotes, onChangeVotes, pollId}: ISummary) => {
    const [email, setEmail] = React.useState()

    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const validateEmail = (email: string) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const onSubmit = () => {
        if (validateEmail(email)) {
            const votes = entries.map(e => {
                return {
                    mail: email,
                    poll_id: pollId,
                    entry_id: e.id,
                    ip: '1234.1234.1234'
                }
            })
            onPostVotes(votes)
        } else {
            alert('Du måste fylla i en email')
        }
    }
    return (
        <div>
            <p>kontrollera dina röster</p>
            <div>
                {entries.map(e => <EntryCard key={e.id} entry={e} onlyDisplay={true} />)}
            </div>
            <label>Epost</label>
            <input type='text' onChange={onEmailChange}/>
            <button onClick={onChangeVotes}>Ändra</button>
            <button onClick={onSubmit}>Skicka in</button>
        </div>
    )
}

export default Summary