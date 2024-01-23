import { combineReducers } from "redux";
// import { CounterReducer } from "./conuter.reducer";
import { PostReducer } from "./Post.reducer";
import counterSlice from "../slice/counterSlice";
import { commentReducer } from "./Comment.reducer";
import formSlice from "../slice/formSlice";
import CategorySlice from "../slice/CategorySlice";
import SubCategorySlice from "../slice/SubCategorySlice";



export const rootReducer = combineReducers({
    counter : counterSlice,
    posts : PostReducer,
    comments  : commentReducer,
    user :  formSlice,
    Category : CategorySlice,
    subcategory : SubCategorySlice,
    
})

