import axios from "axios"
import { GET_ORDERS_HISTORY } from "../types"

export const getOrders = (payload) => ({type:GET_ORDERS_HISTORY , payload})


export const getOrdersThunk = (data) => (dispatch) => {
    axios.post('https://базара.net/index.php?route=/react/controller' , data)
    .then((res) => {
        if(res.data.success === true){
            dispatch(getOrders(res.data.data))
        }else alert('Error!')
    })
    .catch(console.log)
}