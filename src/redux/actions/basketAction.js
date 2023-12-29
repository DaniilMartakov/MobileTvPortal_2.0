import axios from "axios";
import { ADD_BASKET, CHANGE_BASKET, GET_BASKET, REMOVE_BASKET } from "../types";


export const getBasket = (payload) => ({type: GET_BASKET , payload})
export const addBasket = (payload) => ({type: ADD_BASKET , payload})
export const changeBasket = (payload) => ({type: CHANGE_BASKET , payload})
export const removeBasket = (payload) => ({type: REMOVE_BASKET , payload})





export const getBasketThunk = (data) => (dispatch) => {
    axios.post('https://базара.net/index.php?route=/react/controller' , data)
    .then((res) => {
        if(res?.data?.success === true){
            dispatch(getBasket(res.data.data))
        }else alert('Error!')
    })
    .catch(console.log)
}

export const addBasketThunk = (data) => (dispatch) => {
    axios.post('https://базара.net/index.php?route=/react/controller' , data)
    .then((res) => {
        if(res?.data?.success === true){
            dispatch(addBasket(res?.data))
        }else alert('Error!12122112')
    })
    .catch(console.log)
}

export const changeBasketThunk = (data) => (dispatch) => {
    axios.post('https://базара.net/index.php?route=/react/controller' , data)
    .then((res) => {
        if(res?.data?.success === true){
            dispatch(changeBasket(res?.data))
        }else alert('Errocacacr!')
    })
    .catch(console.log)
}

export const removeBasketThunk = (data) => (dispatch) => {
    axios.post('https://базара.net/index.php?route=/react/controller' , data)
    .then((res) => {
        if(res?.data?.success === true){
            dispatch(removeBasket(res?.data))
        }else alert('Errocacacr!')
    })
    .catch(console.log)
}