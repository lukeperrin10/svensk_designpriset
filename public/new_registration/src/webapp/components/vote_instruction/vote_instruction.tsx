import * as React from 'react'
import styles from './vote_instruction.module.css'
import arrow from '../../assets/ui/pil.svg'
import Text, { P } from '../text'
import { TEXT_TYPES, HEADLINE_SIZES } from '../text/text'
import { IS_MOBILE } from '../../config/style'

const instructions = [
    'Välj de bidrag du tycker om',
    'Ange din e-postadress',
    'Bekräfta din e-postadress',
    'Du har röstat!'
]

const VoteInstruction = () => {
    const getInstructions = () => {
        let i = 0
        const ins = instructions.map(instruction => {
            i++
            if(IS_MOBILE) {
                return (
                    <div key={i} className={styles.instruction_container}>
                        <Text type={TEXT_TYPES.P}>{i}</Text>
                        <div className={styles.instruction_text}>
                            <P>{instruction}</P>
                        </div>
                    </div>    
                )
            }
            return (
                <div key={i} className={styles.instruction_container}>
                    <Text className={styles.number} type={TEXT_TYPES.P} headlineSize={HEADLINE_SIZES.MEDIUM}>{i}</Text>
                    <div className={styles.instruction_text}>
                        <P>{instruction}</P>
                    </div>
                    {i !== instructions.length &&
                    <img className={styles.arrow} src={arrow} alt="pil" />
                    }
                </div>
            )
        })
        return ins
    }

    return (
        <div className={styles.container}>
            {getInstructions()}
        </div>
    )
}

export default VoteInstruction
