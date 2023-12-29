import { GET_BAR, GET_EXC, GET_FILM, GET_SERVICE } from "../types";


export default function barReducer(state = [] , action) {
    const {type , payload} = action;
switch (type) {
    case GET_BAR:
        return payload;
    case GET_EXC:
        return payload;
    case GET_FILM:
        return payload;
    case GET_SERVICE:
        return payload;
    default:
        return state;
}
}

