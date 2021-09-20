import axios from 'axios'
import { UPDATE_USER,FAIL, LOAD, USER_SUCCESS, LOGIN_USER_SUCCESS, GET_USER_SUCCESS,GET_TECHNICIAN_LIST,RESET,GET_ALL_CLIENTS, GET_ALL_TECH } from '../const'
export const registerUser = (user, history) => async dispatch => {
    dispatch({ type: LOAD })
    try {
        let result = await axios.post('/user/register', user)
        dispatch({ type: USER_SUCCESS, payload: result.data })
        history.push("/dashboard/user")
    } catch (error) {
        console.log(error)
        dispatch({ type: FAIL, payload: error.response.data.msg })
    }
}
export const loginUser = (user, history) => async dispatch => {
    dispatch({ type: LOAD })
    try {
        let result = await axios.post('/user/login', user)
        dispatch({ type: USER_SUCCESS, payload: result.data })
        console.log(result.data.user.Role)
        if(result.data.user.Role==='admin')history.push("/dashboardadmin/user")
        else history.push("/dashboard/user")
    } catch (error) {
        console.log(error)
        dispatch({ type: FAIL, payload: error.response.data.msg })
    }
}
export const getUser = () => async dispatch => {
    dispatch({ type: LOAD })
    try {
        let result = await axios.get('/user/profil', {
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        })
        dispatch({ type: GET_USER_SUCCESS, payload: result.data })
    } catch (error) {
        console.log(error)
        dispatch({ type: FAIL, payload: error.response.data })
    }
}
export const updateUser = (user) => async dispatch => {
    try {
        
        let result= await axios.put('/user/update',user,{
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        })
        dispatch({ type: UPDATE_USER, payload: result.data })
        console.log(result)
    } catch (error) {
        console.log(error)
        dispatch({ type: FAIL, payload: error.response.data })
    }
}

export const getTechnicianList=(technician)=>async dispatch=>{
    dispatch({ type: LOAD })
    try {
        let result = await axios.get(`/user/getTechnicianList/${technician}`, {
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        });
        dispatch({ type: GET_TECHNICIAN_LIST, payload: result.data })
    } catch (error) {
        dispatch({ type: FAIL, payload: error.response.data })
    }

}
export const getTechnicians=()=>async dispatch=>{
    dispatch({ type: LOAD })
    try {
        let result = await axios.get(`/user/getttechnicianlist/all`, {
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        });
        dispatch({ type: GET_ALL_TECH, payload: result.data })
    } catch (error) {
        dispatch({ type: FAIL, payload: error.response.data })
    }
}
export const getClients=()=>async dispatch=>{
    dispatch({ type: LOAD })
    try {
        let result = await axios.get(`/user/getclients/all`, {
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        });
        dispatch({ type: GET_ALL_CLIENTS, payload: result.data })
    } catch (error) {
        dispatch({ type: FAIL, payload: error.response.data})
    }
}
export const toggle = () => {
    return { type: LOGIN_USER_SUCCESS }}
export const alerte =()=>{
   return {type:RESET}
}
export const deleteTechnician=(id)=>async dispatch=>{
    dispatch({type:LOAD})
    try {
        let result=await axios.delete(`/user/technician/delete/${id}`,{
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        })
        dispatch(getTechnicians())
    } catch (error) {
        dispatch({ type: FAIL, payload: error.response.data })
    }
}
export const deleteClient=(id)=>async dispatch=>{
    dispatch({type:LOAD})
    try {
        let result=await axios.delete(`/user/client/delete/${id}`,{
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        })
        dispatch(getClients())
    } catch (error) {
        dispatch({ type: FAIL, payload: error.response.data })
    }
}
export const updateAdmin = (user) => async dispatch => {
    try {
        
        let result= await axios.put('/user/adminupdate',user,{
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        })
            dispatch(getUser())
    } catch (error) {
        console.log(error)
        dispatch({ type: FAIL, payload: error.response.data })
    }
}