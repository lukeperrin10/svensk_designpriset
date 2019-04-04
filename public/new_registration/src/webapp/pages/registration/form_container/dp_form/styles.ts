/** @type {{formGroup: React.CSSProperties}} */

export default {
    row: {
        margin: 10
    },
    input: {
        minWidth: 300,
        width: '40vw'
        
    },
    formGroup: {
        display: "flex",
        flexWrap: "wrap" as "wrap",
        justifyContent: 'space-around'
    },
    buttonContainer: {
        height: 50,
        width: '100%',
        padding: 10,
        textAlign: 'right' as 'right'
    },
    error: {
        color: 'red',
        height: 10
    }
}