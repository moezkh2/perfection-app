import axios from 'axios'
import { FAIL, LOAD, SERVICE_SUCCESS,FAIL_SERVICE } from '../const'
export const addService=(service)=>async dispatch=>{
    dispatch({type:LOAD})
    try {
        let result=await axios.post('/service/addservice',service)
        dispatch({type:SERVICE_SUCCESS,payload: result.data})
    } catch (error) {
        console.log(error)
        dispatch({type:FAIL_SERVICE,payload:error.response.data})
        
    }}
export const getServiceClient=(id)=>async dispatch=>{
    dispatch({type:LOAD})
    try {
        let result=await axios.get('/service/getservice/client/:id')
        dispatch({type:SERVICE_SUCCESS,payload:result.data})
    } catch (error) {
        console.log(error)
        dispatch({type:FAIL,payload:error.response})
    }
}
export const getServiceTechnician=(id)=>async dispatch=>{
    dispatch({type:LOAD})
    try {
        let result=await axios.get('/service/getservice/technician/:id')
        dispatch({type:SERVICE_SUCCESS,payload:result.data})
    } catch (error) {
        console.log(error)
        dispatch({type:FAIL,payload:error.response})
    }
}
export const updateService=(id)=> async dispatch=>{
    dispatch({type:LOAD})
    try {
        let result=await axios.get(`/service/updateservice/${id}`)
        dispatch({type:SERVICE_SUCCESS,payload:result.data})
    } catch (error) {
        console.log(error)
        dispatch({type:FAIL,payload:error.response})
    }
}