import { deletRequst, getRequest, postRequest, putRequest } from "../request"


export const getAllPosts = () => {
    return getRequest('products')
}

export const deletAllPost = (id) =>{
    // console.log(id);
    return deletRequst('products/'+id);
}

export const postPostApi = (data) =>{
    return postRequest('products' , data);
}

export const updatePostApi = (data)=>{
    return putRequest('products/',data);
}