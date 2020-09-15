import * as React from 'react'
import { getDayWithMonth } from '../../../helpers/dates'
import { H2 } from '../../../components/text'

interface props {
    awardPlace: string,
    awardDate: string
}

const AfterConfirmed = ({awardDate, awardPlace}:props) => {
    return (
        <div>
            <H2>Tack för din röst!</H2>
             Du utvecklar svensk design med ditt deltagande. Vinnarna utses på {awardPlace} den {getDayWithMonth(awardDate)}
        </div>
    )
}

export default AfterConfirmed