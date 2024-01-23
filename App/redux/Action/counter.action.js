import {INCREMENT_COUNTER } from "../Actiontype"

export const increment = () => (dispatch) =>{
    dispatch({type :INCREMENT_COUNTER})
}