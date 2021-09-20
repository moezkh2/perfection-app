import {LOAD,SERVICE_SUCCESS,FAIL_SERVICE, RESET} from '../const'
const initialState = {
    service: [],
    errors: null,
    load: false,
    msg: {}
}
export const serviceReducer=(state = initialState, { type, payload })=>{
    switch(type){
        case LOAD: return { ...state, load: true }
        case SERVICE_SUCCESS:return{...state,load:false,service:payload.service,msg:payload.msg}
        case FAIL_SERVICE:return{...state,load:false,errors:payload}
        case RESET:return{...state,errors:null}
        default:return  state;
    }
}