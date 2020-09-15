import { Action, ActionCreator} from 'redux'
import fetch from 'cross-fetch'
import {IYearConfig} from '../../model'
import { ThunkAction } from 'redux-thunk'
import * as host from '../../config/host'
import {IState} from '../../model/state'
import { Types } from './types';
import { PHASES } from '../../model/constants'

interface IRequestAction extends Action {
    type: Types.REQUEST_CONFIG
}

interface IReceiveAction extends Action {
    type: Types.RECEIVE_CONFIG,
    config: IYearConfig
}

interface IErrorAction extends Action {
    type: Types.ERROR_CONFIG,
    error: Error
}

interface ICheckAction extends Action {
    type: Types.CHECK_CONFIG
}

interface IChangePhase extends Action {
    type: Types.CHANGE_PHASE,
    phase: PHASES
}

export type IConfigAction = IRequestAction | IReceiveAction | IErrorAction | ICheckAction | IChangePhase

export const changePhase: ActionCreator<IChangePhase> = (phase: PHASES) => {
    return {
        type: Types.CHANGE_PHASE,
        phase: phase
    }
}

const requestConfigs: IRequestAction = {
    type: Types.REQUEST_CONFIG
}

const receiveConfig: ActionCreator<IReceiveAction> = (config: IYearConfig) => {
    return {
        type: Types.RECEIVE_CONFIG,
        config: config
    }
}

const errorConfigs: ActionCreator<IErrorAction> = (error: Error) => {
    return {
        type: Types.ERROR_CONFIG,
        error: error
    }
}

const checkConfig: ICheckAction = {
    type: Types.CHECK_CONFIG
}

function fetchConfig(): ThunkAction<Promise<IConfigAction>, IState, undefined, IConfigAction> {
    return async (dispatch) => {
        dispatch(requestConfigs)
        try {
            const response = await fetch(host.YEAR_CONFIG_URL);
            const json = await response.json()
            return dispatch(receiveConfig(json[0]))
        } catch(error) {
            return dispatch(errorConfigs(error))
        }
    }
}

export function getConfig(): ThunkAction<Promise<IConfigAction>, IState, undefined, IConfigAction> {
    return async (dispatch, getState) => {
        if(!getState().yearConfigState.isFetching && !getState().yearConfigState.dataLoaded) {
            return dispatch(fetchConfig())
        } else {
            return dispatch(checkConfig)
        }
    }
}
