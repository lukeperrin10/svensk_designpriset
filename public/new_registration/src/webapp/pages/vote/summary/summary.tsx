import * as React from 'react'
import { IEntry, IVote } from 'src/webapp/model'
import EntryCard from 'src/webapp/components/entry_card'

interface ISummary {
    entries: IEntry[],
    onPostVotes: (votes: IVote[]) => void,
    onChangeVotes: () => void
}

const Summary = ({entries, onPostVotes, onChangeVotes}: ISummary) => {
    const [email, setEmail] = React.useState()

    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const onSubmit = () => {
        console.log(email)
        const votes = entries.map(e => {
            return {
                mail: email,
                poll_id: 1,
                entry_id: e.id,
                ip: '1234.1234.1234'
            }
        })
        onPostVotes(votes)
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