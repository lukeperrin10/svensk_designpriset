import {combineReducers} from 'redux'
import winnerReducer from './winners'

const rootReducer = combineReducers( { winnerState: winnerReducer})

export default rootReducer

