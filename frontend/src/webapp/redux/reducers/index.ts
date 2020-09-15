import {combineReducers} from 'redux'
import winnerReducer from './winners'
import profileReducer from './profile'
import entriesReducer from './entries'
import categoryReducer from './categories'
import yearConfigReducer from './year_config'

const rootReducer = combineReducers( { 
    winnerState: winnerReducer, 
    profileState: profileReducer, 
    entriesState: entriesReducer, 
    yearConfigState: yearConfigReducer,
    categoryState: categoryReducer})

export default rootReducer

