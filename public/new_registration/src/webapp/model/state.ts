import * as interfaces from './index'

export interface IState {
    winnerState: IWinnerState,
    profileState: IProfileState
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
    profile: interfaces.IProfile | null,
}