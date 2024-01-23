import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const initialState = {
    subcategory: [],
    isLoading: false,
    error: null
}


export const AddSubCat = createAsyncThunk(
    'SubCategorySlice/add',
    async (data) => {
        console.log("dataaaaaaaaaa", data);
        await firestore()
            .collection('SubCategory')
            .add(data)
            .then(() => {
                console.log('User added!');
            })
        console.log("ppppppppppp", data);
        return data;
    }
)

export const getSubCat = createAsyncThunk(
    'SubCategorySlice/get',
    async () => {
        let data = [];
        try {
            await firestore()
                .collection('SubCategory')
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(documentSnapshot => {
                        data.push({
                            id: documentSnapshot.id,
                            ...documentSnapshot.data()
                        })
                        console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                    });
                });
            return data;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
)

export const deleteSubCatData = createAsyncThunk(
    "SubCategorySlice/delete",
    async (data) => {
        console.log("6666666666666666666", data.id);
        firestore()
            .collection('SubCategory')
            .doc(data.id)
            .delete()
            .then(() => {
                console.log('User deleted!');
            });
        return data.id;
    }

)

export const SubCategorySlice = createSlice({
    name: "subcategory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(AddSubCat.fulfilled, (state, action) => {
            console.log("dataaActionnnnnnnnn  ", action);
            state.subcategory.push(action.payload)

        })
        builder.addCase(getSubCat.fulfilled, (state, action) => {
            console.log("actionnnnnnnn", action);
            state.subcategory = action.payload

        })
        builder.addCase(deleteSubCatData.fulfilled, (state, action) => {
            console.log("actionnnnnnnn",action);
            state.subcategory = state.subcategory.filter((v) => v.id !== action.payload)
            // console.log("vvvvvvvvvvvv",v);
        })
    }
})
export default SubCategorySlice.reducer;