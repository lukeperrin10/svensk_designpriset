import * as interfaces from './index'

export interface IState {
    winnerState: IWinnerState
}
export interface IWinnerState {
    winners: interfaces.IWinner[],
    isFetching: boolean,
    didFetch: boolean,
    dataLoaded: boolean,
    error: Error | null
}