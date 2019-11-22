export function getDateTime() {
    const date = new Date()
    const today = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()+1}-${date.getMinutes()}-${date.getSeconds()}`
    return today
}