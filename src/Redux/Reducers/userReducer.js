import { FAIL, LOAD, USER_SUCCESS, LOGIN_USER_SUCCESS, GET_USER_SUCCESS,GET_TECHNICIAN_LIST } from '../const'
const initialState = {
    user: {},
    errors: null,
    load: false,
    msg: {},
    isAuth: false,
    techlist:[],
    login: true,
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
        default: return state;
    }
}