import {IWinnerState} from '../../model/state'
import { Types } from '../actions/types';

const initialState: IWinnerState = {
    isFetching: false,
    didFetch: false,
    dataLoaded: false,
    winners: [],
    error: null
}

const winnerReducer = (state = initialState, action: any): IWinnerState => {
    switch (action.type) {
        case Types.REQUEST_WINNERS:
            return {
                ...state,
                isFetching: true,
                didFetch: false,
                dataLoaded: false
            }
        case Types.RECEIVE_WINNERS:
            return {
                ...state,
                isFetching: false,
                didFetch: true,
                dataLoaded: true,
                winners: action.winners
            }
        case Types.ERROR_WINNERS:
            return {
                ...state,
                isFetching: false,
                didFetch: true,
                error: action.error
            }
        default:
            return state
    }
}

export default winnerReducer