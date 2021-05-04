import {AUTH,LOG_OUT} from '../constants/actionTypes'

const authReducer = (state=[],action) =>{
    console.log('AUTH')
    switch (action.type){
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({...action?.data}))
            return {...state,authData: action?.data};
        case LOG_OUT:
            localStorage.clear()
            return {...state,authData: null};
        default:
            return state;
    }
}

export default authReducer