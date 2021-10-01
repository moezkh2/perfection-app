import axios from 'axios'
import { FAIL, LOAD, SERVICE_SUCCESS, FAIL_SERVICE, RESET, GET_ALL_SERVICE, CHAT_SHOW } from '../const'
export const getServiceClient = (id, user) => async dispatch => {
    dispatch({ type: LOAD })
    try {
        let result = await axios.get(`/service/getservice/${user}/${id}`)
        dispatch({ type: SERVICE_SUCCESS, payload: result.data })
    } catch (error) {
        console.log(error)
        dispatch({ type: FAIL, payload: error.response })

    }
}
export const addService = (service, user) => async dispatch => {
    dispatch({ type: LOAD })
    try {
        let result = await axios.post('/service/addservice', service)
        dispatch({ type: SERVICE_SUCCESS, payload: result.data })
        dispatch(getServiceClient(user._id, user.Role))
    } catch (error) {
        console.log(error)
        dispatch({ type: FAIL_SERVICE, payload: error })

    }
}
export const updateService = (id, user, update) => async dispatch => {
    dispatch({ type: LOAD })
    try {
        let result = await axios.put(`/service/updateservice/${id}`, update)
        dispatch(getServiceClient(user._id, user.Role))
    } catch (error) {
        console.log(error)
        dispatch({ type: FAIL, payload: error.response.data })
    }
}
export const alerte = () => {
    return { type: RESET }
}
export const getAllServices = () => async dispatch => {
    dispatch({ type: LOAD })
    try {
        let result = await axios.get('/service/getservice/all')
        dispatch({ type: GET_ALL_SERVICE, payload: result.data })
    } catch (error) {
        dispatch({ type: FAIL })
    }
}
export const chatt = (show, chat) => {
    return ({ type: CHAT_SHOW, payload: { show: show, chat: chat } })
}