import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const initialState = {
    user: [],
    isLoading: false,
    error: null
}



export const EditData = createAsyncThunk(
    "formSlice/update",

    async (data) => {
        let NewData = { ...data }
        delete NewData.id
        await firestore()
            .collection('Users')
            .doc(data.id)
            .update(NewData)
            .then(() => {
                console.log('User updated!');
            });
        return data;
    }

)

export const getuserdata = createAsyncThunk(
    'formSlice/get',

    async () => {
        let data = [];
        try {
            await firestore()
                .collection('Users')
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


export const fetchuser = createAsyncThunk(
    'formSlice/add',
    async (data) => {
        let allData = { ...data }
        console.log("dataaaaaaa", data);

        let tempArr = data.image.path.split("/");
        let imgName = tempArr[tempArr.length - 1];
        console.log("oooooooooooooooooo", imgName);


        let imgNo = Math.floor(Math.random() * 1000)

        const imgFinalName = imgNo + "_" + imgName;


        const imgRef = storage().ref('user/' + imgFinalName);

        const task = imgRef.putFile(data.image.path);

        await task.on('state_changed', taskSnapshot => {
            console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
        });

        await task.then(async () => {
            const url = await storage().ref('user/' + imgFinalName).getDownloadURL();
            allData.image = url;
            allData.imgName = imgFinalName;

            await firestore()
                .collection('Users')
                .add({ ...data, image: url, imgName: imgFinalName })
                .then((doc) => {
                    // docId = doc.id;
                    allData.id = doc.id;
                    console.log('User added!', doc.id);
                })
                .catch(error => console.log(error))
        });
        console.log("alllll datataaaaaa", allData);
        return allData;

    }
)

export const DeleteData = createAsyncThunk(
    'formSlice/delete',

    async (data) => {
        const imgRef = storage().ref('user/' + data.imgName);

        imgRef.delete().then(async () => {
            // console.log("pppppp",id);
            await firestore()
                .collection('Users')
                .doc(data.id)
                .delete()
                .then(() => {
                    console.log('User deleted!');
                });
        })
        return data.id;
    }
)


export const handleLoading = (state, action) => {
    state.isLoading = true;
    state.error = null;
}
export const handleError = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
}
export const formSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getuserdata.pending, handleLoading)
        builder.addCase(getuserdata.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log("actionnnnnnnn", action);
            state.user = action.payload
            state.error = null;
        })
        builder.addCase(getuserdata.rejected, handleError)



        builder.addCase(fetchuser.pending, handleLoading)
        builder.addCase(fetchuser.fulfilled, (state, action) => {
            // console.log("actionnnnnnnn",action);
            state.user.push(action.payload)
        })
        builder.addCase(fetchuser.rejected, handleError)



        builder.addCase(DeleteData.fulfilled, (state, action) => {
            // console.log("actionnnnnnnn",action);
            state.user = state.user.filter((v) => v.id !== action.payload)
        })
        builder.addCase(EditData.fulfilled, (state, action) => {
            // console.log("actionnnnnnnn",action);
            state.user = state.user.map((v) => {
                if (v.id === action.payload.id) {
                    return action.payload
                } else {
                    return v;
                }
            })
        })
    }
})

export const { userdata } = formSlice.actions
export default formSlice.reducer;

