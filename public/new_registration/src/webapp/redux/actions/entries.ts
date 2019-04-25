import { Action, ActionCreator} from 'redux'
import fetch from 'cross-fetch'
import {IEntry, INewEntry} from '../../model'
import { ThunkAction } from 'redux-thunk'
import * as host from '../../config/host'
import {IState} from '../../model/state'
import { Types } from './types';

interface IRequestAction extends Action {
    type: Types.REQUEST_ENTRIES
}

interface IReceiveAction extends Action {
    type: Types.RECIEVE_ENTRIES,
    entries: IEntry[]
}

interface IErrorAction extends Action {
    type: Types.ERROR_ENTRIES,
    error: Error
}

interface ICheckAction extends Action {
    type: Types.CHECK_ENTRIES
}

interface ISaveEntriesAction extends Action {
    type: Types.SAVE_ENTRIES
}

interface IDoneSaveEntriesAction extends Action {
    type: Types.DONE_SAVE_ENTRIES,
    entries: IEntry[]
}

interface IDeleteEntryAction extends Action {
    type: Types.DELETE_ENTRY
}

interface IDeleteEntryDone extends Action {
    type: Types.DELETE_ENRY_DONE
}

export type IEntriesAction = IRequestAction | IReceiveAction | IErrorAction | ICheckAction | ISaveEntriesAction | IDoneSaveEntriesAction | IDeleteEntryAction | IDeleteEntryDone

const requestEntries: IRequestAction = {
    type: Types.REQUEST_ENTRIES
}

const deleteEntryAction: IDeleteEntryAction = {
    type: Types.DELETE_ENTRY
}

const deleteEntryDone: IDeleteEntryDone = {
    type: Types.DELETE_ENRY_DONE
}

const receiveEntries: ActionCreator<IReceiveAction> = (e: IEntry[]) => {
    return {
        type: Types.RECIEVE_ENTRIES,
        entries: e
    }
}

const errorEntries: ActionCreator<IErrorAction> = (error: Error) => {
    return {
        type: Types.ERROR_ENTRIES,
        error: error
    }
}

const checkEntries: ICheckAction = {
    type: Types.CHECK_ENTRIES
}

const saveEntriesAction: ActionCreator<ISaveEntriesAction> = () => {
    return {type: Types.SAVE_ENTRIES}
}

const doneSaveEntriesAction: ActionCreator<IDoneSaveEntriesAction> = (e: IEntry[]) => {
    return {type: Types.DONE_SAVE_ENTRIES, entries: e}
}

export function deleteEntry(id: number): ThunkAction<Promise<IEntriesAction>, IState, undefined, IEntriesAction> {
    return async (dispatch, getState) => {
        if(!getState().entriesState.isFetching) {
            return dispatch(fetchDeleteEntry(id))
        } else {
            return dispatch(checkEntries)
        }
    }
}


function fetchDeleteEntry(id: number): ThunkAction<Promise<IEntriesAction>, IState, undefined, IEntriesAction> {
    return async (dispatch) => {
        dispatch(deleteEntryAction)
        try {
            const method = "DELETE"
            const url = `${host.ENTRIES_URL}/${id}`
            // const headers = {"Content-Type": "application/json; charset=utf-8"}
            const response = await fetch(url, {
                method: method,
                
            })
            checkError(response)
            const json = await response.json()
            console.log(json)
            return dispatch(deleteEntryDone)
        } catch (error) {
            return dispatch(errorEntries(error))
        }
    } 
}

function fetchEntries(profile_id: number): ThunkAction<Promise<IEntriesAction>, IState, undefined, IEntriesAction> {
    return async (dispatch) => {
        dispatch(requestEntries)
        try {
            const response = await fetch(`${host.ENTRIES_URL}/${profile_id}`);
            checkError(response)
            const json = await response.json()
            return dispatch(receiveEntries(json))
        } catch(error) {
            return dispatch(errorEntries(error))
        }
    }
}

export function getEntries(profile_id: number): ThunkAction<Promise<IEntriesAction>, IState, undefined, IEntriesAction> {
    return async (dispatch, getState) => {
        if(!getState().entriesState.isFetching && !getState().entriesState.dataLoaded) {
            return dispatch(fetchEntries(profile_id))
        } else {
            return dispatch(checkEntries)
        }
    }
}

function fetchSaveEntries(e: INewEntry[] | IEntry[]): ThunkAction<Promise<IEntriesAction>, IState, undefined, IEntriesAction> {
    return async (dispatch) => {
        dispatch(saveEntriesAction())
        try {
            const method = "POST"
            const url = host.ENTRIES_URL
            const headers = {"Content-Type": "application/json; charset=utf-8"}
            const response = await fetch(url, {
                method: method,
                headers: headers,
                body: JSON.stringify(e)
            })
            checkError(response)
            const json = await response.json()
            return dispatch(doneSaveEntriesAction(json))
        } catch (error) {
            return dispatch(errorEntries(error))
        }
    }
}

export function saveEntries(e: INewEntry[] | IEntry[]): ThunkAction<Promise<IEntriesAction>, IState, undefined, IEntriesAction> {
    return async (dispatch, getState) => {
        if(!getState().entriesState.isFetching && !getState().entriesState.dataLoaded) {
            return dispatch(fetchSaveEntries(e))
        } else {
            return dispatch(checkEntries)
        }
    }
}

function checkError(response: Response) {
    if (!response.ok) {
        throw new Error(response.statusText)
    }
}
