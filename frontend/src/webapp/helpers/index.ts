import { MEDIA_URL } from "../config/host"

export function isEmptyObject(obj: any): boolean {
    return Object.entries(obj).length === 0 && obj.constructor === Object
}

export function createSlug(text: string) {
    const low = text.toLocaleLowerCase()
    return low.split(' ').join('-')
}

export function getText(text: string) {
    return text
}

export function assembleMediaUrl(path: string) {
    return MEDIA_URL+'/'+path
}