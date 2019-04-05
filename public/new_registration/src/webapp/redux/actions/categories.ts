import { Action, ActionCreator} from 'redux'
import fetch from 'cross-fetch'
import {ICategory} from '../../model'
import { ThunkAction } from 'redux-thunk'
import * as host from '../../config/host'
import {IState} from '../../model/state'
import { Types } from './types';

interface IRequestAction extends Action {
    type: Types.REQUEST_CATEGORIES
}

interface IReceiveAction extends Action {
    type: Types.RECIEVE_CATEGORIES,
    categories: ICategory[]
}

interface IErrorAction extends Action {
    type: Types.ERROR_CATEGORIES,
    error: Error
}

interface ICheckAction extends Action {
    type: Types.CHECK_CATEGORIES
}

export type ICategoryAction = IRequestAction | IReceiveAction | IErrorAction | ICheckAction

const requestCategories: IRequestAction = {
    type: Types.REQUEST_CATEGORIES
}

const receiveCategories: ActionCreator<IReceiveAction> = (categories: ICategory[]) => {
    return {
        type: Types.RECIEVE_CATEGORIES,
        categories: categories
    }
}

const errorCategories: ActionCreator<IErrorAction> = (error: Error) => {
    return {
        type: Types.ERROR_CATEGORIES,
        error: error
    }
}

const checkCategories: ICheckAction = {
    type: Types.CHECK_CATEGORIES
}

function fetchCategories(): ThunkAction<Promise<ICategoryAction>, IState, undefined, ICategoryAction> {
    return async (dispatch) => {
        dispatch(requestCategories)
        try {
            const response = await fetch(host.CATEGORY_URL);
            const json = await response.json()
            return dispatch(receiveCategories(json))
        } catch(error) {
            return dispatch(errorCategories(error))
        }
    }
}

export function getCategories(): ThunkAction<Promise<ICategoryAction>, IState, undefined, ICategoryAction> {
    return async (dispatch, getState) => {
        if(!getState().categoryState.isFetching && !getState().categoryState.dataLoaded) {
            return dispatch(fetchCategories())
        } else {
            return dispatch(checkCategories)
        }
    }
}
