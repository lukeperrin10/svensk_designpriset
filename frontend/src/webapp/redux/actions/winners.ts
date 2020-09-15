import { Action, ActionCreator} from 'redux'
import fetch from 'cross-fetch'
import {IWinner} from '../../model'
import { ThunkAction } from 'redux-thunk'
import * as host from '../../config/host'
import {IState} from '../../model/state'
import { Types } from './types';

interface IRequestAction extends Action {
    type: Types.REQUEST_WINNERS
}

interface IReceiveAction extends Action {
    type: Types.RECEIVE_WINNERS,
    winners: IWinner[]
}

interface IErrorAction extends Action {
    type: Types.ERROR_WINNERS,
    error: Error
}

interface ICheckAction extends Action {
    type: Types.CHECK_WINNERS
}

export type IWinnerAction = IRequestAction | IReceiveAction | IErrorAction | ICheckAction

const requestWinners: IRequestAction = {
    type: Types.REQUEST_WINNERS
}

const receiveWinners: ActionCreator<IReceiveAction> = (winners: IWinner[]) => {
    return {
        type: Types.RECEIVE_WINNERS,
        winners: winners
    }
}

const errorWinners: ActionCreator<IErrorAction> = (error: Error) => {
    return {
        type: Types.ERROR_WINNERS,
        error: error
    }
}

const checkWinners: ICheckAction = {
    type: Types.CHECK_WINNERS
}

function fetchWinners(): ThunkAction<Promise<IWinnerAction>, IState, undefined, IWinnerAction> {
    return async (dispatch) => {
        dispatch(requestWinners)
        try {
            const response = await fetch(host.WINNER_URL);
            const json = await response.json()
            return dispatch(receiveWinners(json))
        } catch(error) {
            return dispatch(errorWinners(error))
        }
    }
}

export function getWinners(): ThunkAction<Promise<IWinnerAction>, IState, undefined, IWinnerAction> {
    return async (dispatch, getState) => {
        if(!getState().winnerState.isFetching && !getState().winnerState.dataLoaded) {
            return dispatch(fetchWinners())
        } else {
            return dispatch(checkWinners)
        }
    }
}
