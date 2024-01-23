import { DELETE_COMMENT, DELET_COMMENT, ERROR_COMMENT, GET_COMMENT, LOADING_COMMENT, POST_COMMENT, PUT_COMMENT } from "../Actiontype"

const loadingComment = () => (dispatch) => {
    dispatch({ type: LOADING_COMMENT })
}

const errorComments = (error) =>(dispatch) =>{
    dispatch({type: ERROR_COMMENT , payload: error})
}
export const getComment = () => async (dispatch) => {
    dispatch(loadingComment())
    try {
        await fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((response) => dispatch({ type: GET_COMMENT, payload: response }))
            .catch((error) =>dispatch(errorComments(error.message)))
    } catch (error) {
        dispatch(errorComments(error.message))
    }
}



export const addcomment = (data) => async (dispatch) => {
    console.log(data);
    dispatch(loadingComment())
    try{
        await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        })
    
            .then((response) => response.json())
            .then((response) => dispatch({ type: POST_COMMENT, payload: data }))
            .catch((error) =>dispatch(errorComments(error.message)))

    }
    catch(error){
        dispatch(errorComments(error.message))
    }
}

   

export const deletcomment = (id) => async(dispatch) => {
    // console.log(id);
    dispatch(loadingComment())

    try{
        await fetch('https://jsonplaceholder.typicode.com/posts' + id, {
            method: 'DELETE',
        })
    
            .then((response) => response.json())
            .then((response) => dispatch({ type: DELETE_COMMENT, payload: id }))
            .catch((error) =>dispatch(errorComments(error.message)))

        }
        catch(error){
            dispatch(errorComments(error.message))
        }
   
}

export const updateComment = (data) => async (dispatch) => {
    // console.log(id);
    dispatch(loadingComment())
    try{
         await fetch('https://jsonplaceholder.typicode.com/posts/' + data.id, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => response.json())
            .then((response) => dispatch({ type: PUT_COMMENT, payload: response }))
            .catch((error) =>dispatch(errorComments(error.message)))

        }
        catch(error){
            dispatch(errorComments(error.message))
        }
    
}


