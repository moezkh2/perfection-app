import axios from 'axios'
import { FAIL, LOAD, SERVICE_SUCCESS,FAIL_SERVICE,RESET } from '../const'
import { useSelector } from 'react-redux'

export const getServiceClient=(id,user)=>async dispatch=>{
    dispatch({type:LOAD})
    try {
        let result=await axios.get(`/service/getservice/${user}/${id}`)
        dispatch({type:SERVICE_SUCCESS,payload:result.data})
    } catch (error) {
        console.log(error)
        dispatch({type:FAIL,payload:error.response})
        
    }
}
export const addService=(service,user)=>async dispatch=>{
    dispatch({type:LOAD})
    try {
        let result=await axios.post('/service/addservice',service)
        dispatch(getServiceClient(user._id,user.Role))
    } catch (error) {
        console.log(error)
        dispatch({type:FAIL_SERVICE,payload:error.response.data.msg})
        
    }}
// export const getServiceTechnician=(id)=>async dispatch=>{
//     dispatch({type:LOAD})
//     try {
//         let result=await axios.get(`/service/getservice/technician/${id}`)
        
//         dispatch({type:SERVICE_SUCCESS,payload:result.data})
//     } catch (error) {
//         console.log(error)
//         dispatch({type:FAIL,payload:error.response})
//     }
// }
export const updateService=(id,user,update)=> async dispatch=>{
    
    dispatch({type:LOAD})
    try {

        let result=await axios.put(`/service/updateservice/${id}`,update)
        console.log(id)
        // dispatch({type:SERVICE_SUCCESS})
        dispatch(getServiceClient(user._id,user.Role))
    } catch (error) {
        console.log(error)
        dispatch({type:FAIL,payload:error.response.data})
    }
}
export const alerte =()=>{
    return {type:RESET}
 }