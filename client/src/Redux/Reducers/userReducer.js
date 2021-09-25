import { UPDATE_USER,FAIL, LOAD, USER_SUCCESS, LOGIN_USER_SUCCESS, GET_USER_SUCCESS,GET_TECHNICIAN_LIST, RESET, GET_ALL_TECH, GET_ALL_CLIENTS } from '../const'
const initialState = {
    user: {},
    errors: null,
    load: false,
    msg: null,
    isAuth: false,
    techlist:[],
    tech:[],
    login: true,
    isApproved:false,
    clients:[]
}
export const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOAD: return { ...state, load: true }
        case USER_SUCCESS: localStorage.setItem("token", payload.token)
            return { ...state, load: false, msg: payload.msg, isAuth: true, user: payload.user, errors: null }
        case GET_USER_SUCCESS:
            return { ...state, load: false, msg: payload.msg, isAuth: true, user: payload.user, errors: null }
        case LOGIN_USER_SUCCESS: return { ...state, login: false }
        case FAIL: return { ...state, load: false, errors: payload }
        case GET_TECHNICIAN_LIST: return {...state,load: false,techlist:payload.techlist,msg: payload.msg}
        case RESET:return{...state,errors:null,msg:null}
        case GET_ALL_TECH:return{...state,load:false,tech:payload.tech,msg:payload.msg}
        case GET_ALL_CLIENTS:return{...state,load:false,clients:payload.client,msg:payload.msg}
        case UPDATE_USER:return{...state,errors:null,msg:payload}
        default: return state;
    }
}