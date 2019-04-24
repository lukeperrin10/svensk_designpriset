import * as utf8 from 'utf8'

export function replaceSpaces(s: string) {
    let result = s.replace(/\s/g, "_")
    result = utf8.decode(result)
    // result = result.replace(/[\u0800-\uFFFF]/g, '')
    // // .replace(/[\u0800-\uFFFF]/g, '')
    // result = utf8.encode(result)
    // console.log(result)
    return result
}