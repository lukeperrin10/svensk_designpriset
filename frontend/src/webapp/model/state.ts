import * as interfaces from './index'

export interface IState {
    winnerState: IWinnerState,
    profileState: IProfileState,
    entriesState: IEntriesState,
    categoryState: ICategoryState,
    yearConfigState: IYearConfigState
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

export interface ICategoryState extends FetchState {
    categories: interfaces.ICategory[]
}

export interface IYearConfigState extends FetchState {
    config: interfaces.IYearConfig
}