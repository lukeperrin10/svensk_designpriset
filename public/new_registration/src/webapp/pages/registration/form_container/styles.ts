import { PRIMARY_GOLD } from 'src/webapp/config/style';

/** @type {{formGroup: React.CSSProperties}} */

export default {
    container: {
        backgroundColor: PRIMARY_GOLD,
        padding: 20
    },
    addButton: {
        borderRadius: 100,
        width: 50,
        height: 50,
        fontSize: '2rem',
        padding: 0,
        marginRight: 30,
        boxShadow: '0px 0px 5px 2px rgba(0,0,0,0.1',
    },
    addButtonContainer: {
        width: '100%',
        textAlign: 'right' as 'right'
    }
}