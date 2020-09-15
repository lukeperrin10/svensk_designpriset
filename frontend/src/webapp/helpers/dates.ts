const months : {[key:number]:string} = {
    0: 'januari',
    1: 'februari',
    2: 'mars',
    3: 'april',
    4: 'maj',
    5: 'juni',
    6: 'juli',
    7: 'augusti',
    8: 'september',
    9: 'oktober',
    10: 'november',
    11: 'december'
}

export const getDayWithMonth = (date: string | Date) => {
    const today = new Date(date)
    return `${today.getDate()} ${getMonth(today.getMonth())}`

}

export const getMonth = (month: number) => {
    if (month in months) return months[month]
    return 'januri'
}

