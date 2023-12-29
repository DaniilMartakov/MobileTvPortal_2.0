import { ADD_BASKET, CHANGE_BASKET, GET_BASKET, REMOVE_BASKET } from "../types";


export default function basketReducer(state = [] , action) {
    const { type , payload } = action
    switch (type) {
        case GET_BASKET:
            return payload;
        case ADD_BASKET:
            return state.some((product) => product.id === payload.id ) ? state : [...state, payload]; 
        case CHANGE_BASKET:
                const changes = state.map((item) => {
                    if(item.id === payload.id && item.count === payload.count){
                        return {
                            ...item , 
                            count: payload.count
                        }
                    }
                else return item
            });
        return changes
            case REMOVE_BASKET:
                return [...state.filter((el) => el.id !== payload.id)]
        default:
            return state;
    }
}