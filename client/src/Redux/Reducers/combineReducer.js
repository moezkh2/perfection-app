import { combineReducers } from "redux";
import{userReducer} from './userReducer'
import {serviceReducer} from './serviceReducer'
export const rootReducer=combineReducers({userReducer,serviceReducer})