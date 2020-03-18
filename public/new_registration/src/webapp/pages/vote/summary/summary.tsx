import * as React from 'react'
import { IEntry, IVote } from '../../../model'
import EntryCard from '../../../components/entry_card'
import Button from '../../../components/button'
import styles from './summary.module.css'
import Text from '../../../components/text'
import { TEXT_TYPES } from '../../../components/text/text'

interface ISummary {
    entries: IEntry[],
    onPostVotes: (votes: IVote[]) => void,
    onChangeVotes: () => void,
    pollId: number
}

const Summary = ({entries, onPostVotes, onChangeVotes, pollId}: ISummary) => {
    const [email, setEmail] = React.useState("")

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
    // return (
    //     <div>
    //         <p>kontrollera dina röster</p>
    //         <div>
    //             {entries.map(e => <EntryCard onShowClick={() => {}} key={e.id} entry={e} onlyDisplay={true} />)}
    //         </div>
    //         <label>Epost</label>
    //         <input type='text' onChange={onEmailChange}/>
    //         <button onClick={onChangeVotes}>Ändra</button>
    //         <button onClick={onSubmit}>Skicka in</button>
    //     </div>
    // )
    return (
        <div className={styles.container}>
            <Text type={TEXT_TYPES.P} className={styles.text}>När du har röstat på de kategorier du vill rösta på, fyll i din e-postadress. Ett mejl kommer skickas till din e-postadress.
            <br></br><span className={styles.bold}>Din röst kommer räknas först när du klickat på denna länk.</span></Text>
            <div className={styles.left}>
                <div className={styles.input_container}>
                    <label><Text type={TEXT_TYPES.P}>Epostadress</Text></label>
                    <input type='text' onChange={onEmailChange}/>
                </div>
                <div>
                    <Button className={styles.button} onClick={onSubmit} title='Skicka'/>
                </div>
            </div>
            
        </div>
    )
}

export default Summary