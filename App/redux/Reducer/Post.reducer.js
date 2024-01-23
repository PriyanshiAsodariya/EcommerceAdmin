import posts from "../../Container/Posts"
import { DELET_POST, GET_POST, POST_POST, PUT_POST } from "../Actiontype"

export const intialState = {
    isLoading: false,
    posts: [],
    error: null
}

export const PostReducer = (state = intialState, action) => {
    console.log(action)
    switch (action.type) {
        case DELET_POST:
            return {
                ...state,
                posts: state.posts.filter((v) => v.id !== action.payload),
            }
        case GET_POST:
            return {
                ...state,
                posts: action.payload
            }
        case POST_POST:
            return {
                ...state,
                posts: state.posts.concat(action.payload)
            }
        case PUT_POST:
            return {
                ...state,
                posts: state.posts.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload
                    } else {
                        return v
                    }
                })
            }
        default:
            return state;
    }

}