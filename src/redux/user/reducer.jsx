import { SET_USER,CLEAR_USER } from "./action";


const initalState = null

export const userReducer=(state  = initalState,action)=>{
    switch(action.type){
        case SET_USER:
            return action.payload;
        case CLEAR_USER:
            return initalState;
        default:
            return state;
    }
};