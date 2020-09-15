import {IProfileState} from '../../model/state'
import { Types } from '../actions/types';

const initialState: IProfileState = {
    isFetching: false,
    didFetch: false,
    dataLoaded: false,
    profile: [],
    error: null,
}

const profileReducer = (state = initialState, action: any): IProfileState => {
    switch (action.type) {
        case Types.REQUEST_PROFILE:
            return {
                ...state,
                isFetching: true,
                didFetch: false,
                dataLoaded: false
            }
        case Types.RECIEVE_PROFILE:
            return {
                ...state,
                isFetching: false,
                didFetch: true,
                dataLoaded: true,
                profile: action.profile
            }
        case Types.ERROR_PROFILE:
            return {
                ...state,
                isFetching: false,
                didFetch: true,
                error: action.error
            }
        case Types.SAVE_PROFILE:
            return {
                ...state,
                isFetching: true,
                didFetch: false,
                dataLoaded: false,
                error: null
            }
        case Types.DONE_SAVE_PROFILE: 
            return {
                ...state,
                isFetching: false,
                didFetch: true,
                dataLoaded: true,
                profile: action.profile
            }
        default:
            return state
    }
}

export default profileReducer