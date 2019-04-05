import {combineReducers} from 'redux'
import winnerReducer from './winners'
import profileReducer from './profile'
import entriesReducer from './entries'

const rootReducer = combineReducers( { winnerState: winnerReducer, profileState: profileReducer, entriesState: entriesReducer})

export default rootReducer

