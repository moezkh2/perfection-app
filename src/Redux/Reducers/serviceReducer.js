import {FAIL,LOAD,SERVICE_SUCCESS,FAIL_SERVICE} from '../const'
const initialState = {
    service: [{
        Category: "Electricity",
        date: "2021 / 7 / 12",
        Status: "refused",
        index: 1
    }],
    errors: null,
    load: false,
    msg: {}
}
export const serviceReducer=(state = initialState, { type, payload })=>{
    switch(type){
        case LOAD: return { ...state, load: true }
        case SERVICE_SUCCESS:return{...state,load:false,service:payload.service,msg:payload.msg}
        case FAIL_SERVICE:return{...state,load:false,errors:payload}
        default:return  state;
    }
}