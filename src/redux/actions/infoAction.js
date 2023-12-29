import axios from "axios";
import { GET_BAR, GET_EXC, GET_FILM, GET_SERVICE } from "../types";

export const getBar = (payload) => ({type:GET_BAR , payload})
export const getExc = (payload) => ({type:GET_EXC , payload})
export const getFilm = (payload) => ({type:GET_FILM , payload})
export const getService = (payload) => ({type:GET_SERVICE , payload})



export const getBarThunk = (data) => (dispatch) => {
    axios.post('https://базара.net/index.php?route=/react/controller' , data)
    .then((res) => {
        if(res.data.success === true){
            dispatch(getBar(res.data.data))
        }else alert('Error!')
    })
    .catch(console.log)
}

export const getExcThunk = (data) => (dispatch) => {
    axios.post('https://базара.net/index.php?route=/react/controller' , data)
    .then((res) => {
    if(res.data.success === true){
        dispatch(getExc(res.data.data))
    }else alert('Error!')
})
    .catch(console.log)
}

export const getFilmThunk = (data) => (dispatch) => {
    axios.post('https://базара.net/index.php?route=/react/controller' , data)
    .then((res) => {
        if(res.data.success === true){
            dispatch(getFilm(res.data.data))
        }else alert('Error!')
    })
    .catch(console.log)
}

export const getServiceThunk = (data) => (dispatch) => {
    axios.post('https://базара.net/index.php?route=/react/controller' , data)
    .then((res) => {
        if(res.data.success === true){
            dispatch(getService(res.data.data))
        }else alert('Error!')
    })
    .catch(console.log)
}

