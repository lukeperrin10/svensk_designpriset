export function getErrorMessage(e: string) {
    switch (e) {
        case 'NOT_IMAGE':
            return 'Filen är inte i ett bildformat'
        default:
            return e
    }
}