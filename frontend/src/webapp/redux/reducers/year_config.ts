import {IYearConfigState} from '../../model/state'
import { Types } from '../actions/types';
import { PHASES } from '../../model/constants';
import { IYearConfig } from '../../model';

const initConfig = {
    id: 0,
    year: "",
    phase_1_start: "",
    phase_2_start: "",
    phase_3_start: "",
    phase_4_start: "",
    phase_5_start: "",
    register_deadline_date: "",
    nominees_can_edit_start: "",
    nominees_can_edit_end: "",
    price: "",
    award_place: "",
    award_date: "",
    winner_preview: "",
    current_phase: "",
    delayed_deadline_end: ""
}

const initialState: IYearConfigState = {
    isFetching: false,
    didFetch: false,
    dataLoaded: false,
    config: initConfig,
    error: null
}

const yearConfigReducer = (state = initialState, action: any): IYearConfigState => {
    switch (action.type) {
        case Types.REQUEST_CONFIG:
            return {
                ...state,
                isFetching: true,
                didFetch: false,
                dataLoaded: false
            }
        case Types.RECEIVE_CONFIG:
            return {
                ...state,
                isFetching: false,
                didFetch: true,
                dataLoaded: true,
                config: action.config
            }
        case Types.ERROR_CONFIG:
            return {
                ...state,
                isFetching: false,
                didFetch: true,
                error: action.error
            }
        case Types.CHANGE_PHASE:
            console.log('red change phase')
            return {
                ...state,
                config: changePhase(state.config, action.phase)
            }
        default:
            return state
    }
}

function changePhase(config: IYearConfig, phase: PHASES) {
    const newConfig = JSON.parse(JSON.stringify(config))
    newConfig['current_phase'] = phase
    return newConfig
}

export default yearConfigReducer