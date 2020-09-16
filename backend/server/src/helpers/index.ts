export enum dateTypes {
    FULL_DATE = 'full_date',
    YEAR = 'year',
    DAY_AND_MONTH = 'day_and_month'
}

export function getDateTime(type: dateTypes = dateTypes.FULL_DATE, customDate?: Date) {
    const days = {
        0: 'måndag',
        1: 'tisdag',
        2: 'onsdag',
        3: 'torsdag',
        4: 'fredag',
        5: 'lördag',
        6: 'söndag'
    }
    const months = [
        'januari',
        'februari',
        'mars',
        'april',
        'maj',
        'juni',
        'juli',
        'augusti',
        'september',
        'oktober',
        'november',
        'december'
    ]
    const date = customDate ? new Date(customDate) : new Date()
    switch (type) {
        case dateTypes.FULL_DATE:
            return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${(date.getHours()+1) % 24}-${date.getMinutes()}-${date.getSeconds()}`
        case dateTypes.YEAR:
            return `${date.getFullYear()}`
        case dateTypes.DAY_AND_MONTH:
            return `${date.getDate()} ${months[date.getMonth()]}`
    }
}

