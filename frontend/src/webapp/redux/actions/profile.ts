import { Action, ActionCreator} from 'redux'
import fetch from 'cross-fetch'
import {IProfile, INewProfile} from '../../model'
import { ThunkAction } from 'redux-thunk'
import * as host from '../../config/host'
import {IState} from '../../model/state'
import { Types } from './types';

interface IRequestAction extends Action {
    type: Types.REQUEST_PROFILE
}

interface IReceiveAction extends Action {
    type: Types.RECIEVE_PROFILE,
    profile: IProfile
}

interface IErrorAction extends Action {
    type: Types.ERROR_PROFILE,
    error: Error
}

interface ICheckAction extends Action {
    type: Types.CHECK_PROFILE
}

interface ISaveProfileAction extends Action {
    type: Types.SAVE_PROFILE
}

interface IDoneSaveProfileAction extends Action {
    type: Types.DONE_SAVE_PROFILE,
    profile: IProfile
}

export type IProfileAction = IRequestAction | IReceiveAction | IErrorAction | ICheckAction | ISaveProfileAction | IDoneSaveProfileAction

const requestProfile: IRequestAction = {
    type: Types.REQUEST_PROFILE
}

const receiveProfile: ActionCreator<IReceiveAction> = (profile: IProfile) => {
    return {
        type: Types.RECIEVE_PROFILE,
        profile: profile
    }
}

const errorProfile: ActionCreator<IErrorAction> = (error: Error) => {
    return {
        type: Types.ERROR_PROFILE,
        error: error
    }
}

const checkProfile: ICheckAction = {
    type: Types.CHECK_PROFILE
}

const saveProfileAction: ActionCreator<ISaveProfileAction> = () => {
    return {type: Types.SAVE_PROFILE}
}

const doneSaveProfileAction: ActionCreator<IDoneSaveProfileAction> = (p: IProfile) => {
    return {type: Types.DONE_SAVE_PROFILE, profile: p}
}

function fetchProfile(id: number): ThunkAction<Promise<IProfileAction>, IState, undefined, IProfileAction> {
    return async (dispatch) => {
        dispatch(requestProfile)
        try {
            const response = await fetch(`${host.PROFILE_URL}/${id}`);
            checkError(response)
            const json = await response.json()
            return dispatch(receiveProfile(json))
        } catch(error) {
            return dispatch(errorProfile(error))
        }
    }
}

export function getProfile(id: number): ThunkAction<Promise<IProfileAction>, IState, undefined, IProfileAction> {
    return async (dispatch, getState) => {
        if(!getState().profileState.isFetching) {
            return dispatch(fetchProfile(id))
        } else {
            return dispatch(checkProfile)
        }
    }
}

function fetchSaveProfile(profile: INewProfile | IProfile): ThunkAction<Promise<IProfileAction>, IState, undefined, IProfileAction> {
    return async (dispatch) => {
        dispatch(saveProfileAction())
        try {
            const update = 'id' in profile
            const method = update ? "PUT" : "POST"
            const url = update ? `${host.PROFILE_URL}/${profile['id']}` : host.PROFILE_URL
            const headers = {"Content-Type": "application/json; charset=utf-8"}
            const response = await fetch(url, {
                method: method,
                headers: headers,
                body: JSON.stringify(profile)
            })
            checkError(response)
            const json = await response.json()
            return dispatch(doneSaveProfileAction(json))
        } catch (error) {
            return dispatch(errorProfile(error))
        }
    }
}

export function saveProfile(profile: INewProfile | IProfile): ThunkAction<Promise<IProfileAction>, IState, undefined, IProfileAction> {
    return async (dispatch, getState) => {
        if(!getState().profileState.isFetching) {
            return dispatch(fetchSaveProfile(profile))
        } else {
            return dispatch(checkProfile)
        }
    }
}

function checkError(response: Response) {
    if (!response.ok) {
        throw new Error(response.statusText)
    }
}
