import * as interfaces from './index'

export interface IState {
    winnerState: IWinnerState,
    profileState: IProfileState,
    entriesState: IEntriesState
}

interface FetchState {
    isFetching: boolean,
    didFetch: boolean,
    dataLoaded: boolean,
    error: Error | null
}
export interface IWinnerState extends FetchState {
    winners: interfaces.IWinner[],
}

export interface IProfileState extends FetchState {
    profile: interfaces.IProfile[],
}

export interface IEntriesState extends FetchState {
    entries: interfaces.IEntry[]
}