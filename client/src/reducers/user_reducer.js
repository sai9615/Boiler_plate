import {LOGIN_USER} from '../actions/types';
import {REGISTER_USER} from '../actions/types';

export default function( state={}, action){
    switch(action.type){
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload}
        case REGISTER_USER:
                return {...state, registerationSuccess: action.payload}    
        default:
            return state;
    }
}

