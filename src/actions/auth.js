import {AUTH} from "../constants/actionTypes";
import * as api from '../api/index.js'

export const signin = (formData,history) => async (dispatch) => {
    try{

        history.push('/')
    }catch (e){
        console.log(e)
    }
}

export const signup = (formData,history) => async (dispatch) => {
    try{

        history.push('/')
    }catch (e){
        console.log(e)
    }
}
