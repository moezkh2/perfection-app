import {LOAD,SERVICE_SUCCESS,FAIL_SERVICE, RESET,GET_ALL_SERVICE} from '../const'
const initialState = {
    service: [],
    errors: null,
    load: false,
    msg: null,
    allservice:[]
}
export const serviceReducer=(state = initialState, { type, payload })=>{
    switch(type){
        case LOAD: return { ...state, load: true }
        case SERVICE_SUCCESS:return{...state,load:false,service:payload.service,msg:payload.msg}
        case FAIL_SERVICE:return{...state,load:false,errors:payload}
        case GET_ALL_SERVICE:return{...state,allservice:payload.allservice}
        case RESET:return{...state,errors:null,msg:null}
        default:return  state;
    }
}