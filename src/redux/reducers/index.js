import { combineReducers } from 'redux'
import appReducer from './app.js'

const combinedReducer = combineReducers( {
    app: appReducer
} )

export default combinedReducer
