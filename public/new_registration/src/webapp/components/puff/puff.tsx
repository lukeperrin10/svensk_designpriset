import * as React from 'react'
import styles from './puff.module.css'
import Text from '../text'
import { TEXT_TYPES } from '../text/text'
import { getMonth } from '../../helpers/dates'
import triangle from '../../assets/ui/triangle.svg'
import voteTriangle from '../../assets/ui/vote_triangle.svg'
import voteTriangleMobile from '../../assets/ui/vote_triangle_mobile.svg'
import { IS_MOBILE } from '../../config/style'
import {useHistory} from 'react-router-dom'


interface props {
    variant: 'register' | 'award' | 'vote',
    date: Date,
    awardPlace: string
}

const subject = 'Biljetter till årets prisutdelning'

const Puff = ({variant, date, awardPlace}:props) => {
    const history = useHistory()
    const getRegister = (day: string, month: string) => {
        return (
            <section className={[styles.container].join(' ')}>
                <div className={styles.left}>
                    <div className={styles.text_container}>
                        <Text className={[styles.day, styles.black_text].join(' ')} type={TEXT_TYPES.P}>{day}</Text>
                    </div>
                    <div className={styles.text_container}>
                        <Text className={[styles.month, styles.black_text].join(' ')} type={TEXT_TYPES.P}>{month}</Text>
                        <Text className={[styles.text, styles.black_text].join(' ')} type={TEXT_TYPES.P}>
                            {'Sista inlämningsdag'}
                        </Text>
                    </div>
                </div>
                <div className={styles.right}>
                    <button onClick={onClick} className={styles.right_button}>
                        <img src={triangle} />
                    </button>
                </div>
            </section>
        )
    }

    const getAward = (day: string, month: string) => {
        return (
            <section className={[styles.container, styles.black].join(' ')}>
                <div className={styles.left}>
                    <div className={styles.text_container}>
                        <Text className={[styles.day, styles.gold_text].join(' ')} type={TEXT_TYPES.P}>{day}</Text>
                    </div>
                    <div className={styles.text_container}>
                        <Text className={[styles.month, styles.gold_text].join(' ')} type={TEXT_TYPES.P}>{month}</Text>
                        <Text className={[styles.text, styles.gold_text].join(' ')} type={TEXT_TYPES.P}>
                            {`Prisutdelning på ${awardPlace}`}
                        </Text>
                    </div>
                </div>
                <div className={styles.right}>
                    <button onClick={onClick} className={styles.ticket_button}>Köp biljett</button>
                </div>
            </section>
        )
    }

    const getVote = (day: string, month: string) => {
        return (
            <section className={[styles.container, styles.gold].join(' ')}>
                 <div className={styles.left}>
                 <div className={styles.text_container}>
                        <Text className={[styles.day, styles.black_text, styles.vote_headline].join(' ')} type={TEXT_TYPES.P}>Rösta</Text>
                    </div>
                    <div className={styles.text_container}>
                        {/* <Text className={[styles.month, styles.black_text, styles.vote_date].join(' ')} type={TEXT_TYPES.P}></Text> */}
                        <Text className={[styles.text, styles.black_text, styles.vote_text].join(' ')} type={TEXT_TYPES.P}>Från</Text>
                        <Text className={[styles.text, styles.black_text, styles.vote_text].join(' ')} type={TEXT_TYPES.P}>{day} {month}</Text>
                    </div>
                </div>
                <div className={styles.right}>
                    <button onClick={onClick} className={styles.right_button}>
                        <img src={IS_MOBILE ? voteTriangleMobile : voteTriangle} />
                    </button>
                </div>
            </section>
        )
    }

    const getVariant = () => {
        const day = date.getDate().toString()
        const month = getMonth(date.getMonth())
        const firstCap = month.charAt(0).toUpperCase() + month.slice(1);
        switch(variant) {
            case 'register':
                return getRegister(day, firstCap)
            case 'award':
                return getAward(day, firstCap)
            case 'vote':
                return getVote(day, firstCap)
            default:
                return <div></div>
        }
    }
    const onClick = () => {
        window.scrollTo(0,0)
        switch(variant) {
            case 'register':
                history.push('/anmalan')
                break
            case 'award':
                window.open('mailto:anna-clara.ander@batteri.se?subject='+subject)
                break
            case 'vote':
                history.push('/rostning')
                break
            default:
                return <div></div>
        }
    }
    return getVariant()
}

export default Puff
