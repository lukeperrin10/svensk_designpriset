import {combineReducers} from 'redux'
import winnerReducer from './winners'
import profileReducer from './profile'
import entriesReducer from './entries'
import categoryReducer from './categories'

const rootReducer = combineReducers( { 
    winnerState: winnerReducer, 
    profileState: profileReducer, 
    entriesState: entriesReducer, 
    categoryState: categoryReducer})

export default rootReducer

