
import { deletAllPost, deletPost, getAllPosts, postPostApi, updatePostApi } from "../../Common/Api/Posts.api"
import { DELET_POST, GET_POST, POST_POST, PUT_POST } from "../Actiontype"

export const getPost = () => (dispatch) => {
    getAllPosts()
        .then((response) => dispatch({ type: GET_POST, payload: response.data }))
        .catch((error) => console.log(error))
}

export const deletpost = (id) => (dispatch) => {
    deletAllPost(id)
        .then((response) => dispatch({ type: DELET_POST, payload: id }))
        .catch((error) => console.log(error))
}

export const addPost = (data) =>(dispatch)=>{
    postPostApi(data)
        .then((response)=>dispatch ({type:POST_POST , payload : response.data}))
        .catch((error)=> console.log(error))
}

export const updatePost = (data) => (dispatch) =>{
    console.log("kkkkk" , data);
    updatePostApi(data)
    .then((response)=>dispatch ({type: PUT_POST, payload : response.data}))
    .catch((error)=> console.log(error))

}

