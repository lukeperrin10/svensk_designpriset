export function isEmptyObject(obj: any): boolean {
    return Object.entries(obj).length === 0 && obj.constructor === Object
}

export function createSlug(text: string) {
    const low = text.toLocaleLowerCase()
    return low.split(' ').join('-')
}