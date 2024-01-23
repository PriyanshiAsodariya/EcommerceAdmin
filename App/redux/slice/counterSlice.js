
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count : 0
}

 const counterSlice = createSlice({
    name : 'counter',
    initialState  : initialState,
    reducers:{
        increment:(state) =>{
            state.count += 1;
        },
        decrement:(state) =>{
            state.count -= 1;
        },
        incrementby : (state) =>{
            state.count += 10;
        },
        decrementby : (state) =>{
            state.count -= 10;
        }
    }
})

console.log(counterSlice)

export const {increment , decrement , incrementby , decrementby}  = counterSlice.actions;
export default counterSlice.reducer;