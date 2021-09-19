import axios from 'axios'
import { FAIL, LOAD, USER_SUCCESS, LOGIN_USER_SUCCESS, GET_USER_SUCCESS,GET_TECHNICIAN_LIST } from '../const'
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
        history.push("/dashboard/user")
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
            dispatch(getUser())
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
        dispatch({ type: FAIL, payload: error })
    }

}

export const toggle = () => {
    return { type: LOGIN_USER_SUCCESS }}