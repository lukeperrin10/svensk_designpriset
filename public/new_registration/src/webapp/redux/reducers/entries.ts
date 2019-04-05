import {IEntriesState} from '../../model/state'
import { Types } from '../actions/types';

const initialState: IEntriesState = {
    isFetching: false,
    didFetch: false,
    dataLoaded: false,
    entries: [],
    error: null,
}

const entriesReducer = (state = initialState, action: any): IEntriesState => {
    switch (action.type) {
        case Types.REQUEST_ENTRIES:
            return {
                ...state,
                isFetching: true,
                didFetch: false,
                dataLoaded: false
            }
        case Types.RECIEVE_ENTRIES:
            return {
                ...state,
                isFetching: false,
                didFetch: true,
                dataLoaded: true,
                entries: action.entries
            }
        case Types.ERROR_ENTRIES:
            return {
                ...state,
                isFetching: false,
                didFetch: true,
                error: action.error
            }
        case Types.SAVE_ENTRIES:
            return {
                ...state,
                isFetching: true,
                didFetch: false,
                dataLoaded: false,
                error: null
            }
        case Types.DONE_SAVE_ENTRIES: 
            return {
                ...state,
                isFetching: false,
                didFetch: true,
                dataLoaded: true,
                entries: action.entries
            }
        default:
            return state
    }
}

export default entriesReducer