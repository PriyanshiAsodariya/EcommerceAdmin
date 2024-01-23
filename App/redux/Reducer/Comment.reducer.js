import { DELETE_COMMENT, DELET_COMMENT, ERROR_COMMENT, GET_COMMENT, LOADING_COMMENT, POST_COMMENT, PUT_COMMENT } from "../Actiontype"

export const intialState = {
    isLoading: false,
    comments: [],
    error: null
}

export const commentReducer = (state = intialState, action) => {
    console.log(action)
    switch (action.type) {
        case ERROR_COMMENT : 
        return{
            isLoading: false,
            error:action.payload,
            comments: []
        }
        case LOADING_COMMENT:
            return{
                ...state,
                isLoading: true,
                // comments : [],
                error:null
            }
        case GET_COMMENT:
            return {
                isLoading: false,
                error : null,
                comments: action.payload
            }
        case POST_COMMENT:
            return {
                isLoading: false,
                error: null,

                comments: state.comments.concat(action.payload)
            }
        case DELETE_COMMENT :
            return {
                isLoading: false,
                error: null,
                comments : state.comments.filter((v)=> v.id !== action.payload),
            }
        case PUT_COMMENT :
            return{
                isLoading: false,
                comments : state.comments.map((v)=>{
                    if(v.id === action.payload.id){
                        return action.payload
                    }else{
                        return v
                    }
                }),
                error: null,
            }
        default:
            return state;
    }

}