import {ICategoryState} from '../../model/state'
import { Types } from '../actions/types';

const initialState: ICategoryState = {
    isFetching: false,
    didFetch: false,
    dataLoaded: false,
    categories: [],
    error: null
}

const categoryReducer = (state = initialState, action: any): ICategoryState => {
    switch (action.type) {
        case Types.REQUEST_CATEGORIES:
            return {
                ...state,
                isFetching: true,
                didFetch: false,
                dataLoaded: false
            }
        case Types.RECIEVE_CATEGORIES:
            return {
                ...state,
                isFetching: false,
                didFetch: true,
                dataLoaded: true,
                categories: action.categories
            }
        case Types.ERROR_CATEGORIES:
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

export default categoryReducer