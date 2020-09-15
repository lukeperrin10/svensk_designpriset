export function getErrorMessage(e: string) {
    switch (e) {
        case 'NOT_IMAGE':
            return 'Filen är inte i ett bildformat'
        case 'NOT_PDF':
            return 'Filen måste vara i formated .pdf'
        default:
            return e
    }
}