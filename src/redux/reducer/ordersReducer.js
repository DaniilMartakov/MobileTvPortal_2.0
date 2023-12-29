import { GET_ORDERS_HISTORY } from "../types";


export default function orderReducer(state = [] , action) {
    const {type , payload} = action;
switch (type) {
    case GET_ORDERS_HISTORY:
        return payload
    default:
        return state;
}
}
