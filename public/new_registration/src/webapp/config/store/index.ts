import { createStore, applyMiddleware} from 'redux'
import thunkMiddleWare from 'redux-thunk'
import reducers from '../../redux/reducers'

export const store = createStore(
    reducers,
    applyMiddleware(thunkMiddleWare)
)