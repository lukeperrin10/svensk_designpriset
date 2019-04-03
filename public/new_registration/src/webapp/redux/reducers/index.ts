import {combineReducers} from 'redux'
import winnerReducer from './winners'
import profileReducer from './profile'

const rootReducer = combineReducers( { winnerState: winnerReducer, profileState: profileReducer})

export default rootReducer

