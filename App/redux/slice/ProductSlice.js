import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const initialState = {
    Products: [],
    isLoading: false,
    error: null
}


export const AddProduct = createAsyncThunk(
    'ProductSlice/add',
    async (data) => {
        console.log("dataaaaaaaaaa", data);
        await firestore()
            .collection('Products')
            .add(data)
            .then(() => {
                console.log('User added!');
            })
        console.log("ppppppppppp", data);
        return data;
    }
)




export const ProductSlice = createSlice({
    name: "Products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(AddProduct.fulfilled, (state, action) => {
            console.log("dataaActionnnnnnnnn  ", action);
            state.Products.push(action.payload)

        })
    }
})
export default ProductSlice.reducer;