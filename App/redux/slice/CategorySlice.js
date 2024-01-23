import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';



const initialState = {
    Category: [],
    isLoading: false,
    error: null
}

export const addCategory = createAsyncThunk(
    'CategorySlice/add',
    async (data) => {

        let allData = { ...data }
        console.log("dataaaaaaa", data);

        let tempArr = data.image.path.split("/");
        // console.log("",tempArr);
        let imgName = tempArr[tempArr.length - 1];
        console.log("oooooooooooooooooo", imgName);

        let imgNo = Math.floor(Math.random() * 1000)

        const imgFinalName = imgNo + "_" + imgName;
        console.log("Nammmmmmmmmmeeeeeee",imgFinalName);

        const imgRef = storage().ref('Category/' + imgFinalName);

        const task = imgRef.putFile(data.image.path);
        console.log("77777777777777777777",data);
        console.log("88888888888" , data.image.path);

        // await task.on('state_changed', taskSnapshot => {
        //     console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
        // });

        await task.then(async () => {
            const imgRefPath = 'Category/' + imgFinalName;
            console.log("ppppppppppppppppppppppppppppppppppppppppp", imgRefPath);
            const url = await storage().ref(imgRefPath).getDownloadURL();
            console.log("uuuuuuuuuuuuuuuuuuuu", url);

            allData.image = url;
            allData.imgName = imgFinalName;

            await firestore()
                .collection('Category')
                .add({ ...data, image: url, imgName: imgFinalName })
                .then((doc) => {
                    // docId = doc.id;
                    allData.id = doc.id;
                    console.log('Category added!', doc.id);
                })
                .catch(error => console.log(error))
        });
        console.log("alllll datataaaaaa", allData);
        return allData;
    }
)

export const getCategoryData = createAsyncThunk(
    "CategorySlice/get",
    async () => {
        let data = [];
        try {
            await firestore()
                .collection('Category')
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

export const DeletCategory = createAsyncThunk(
    'CategorySlice/delete',
    async (data) => {
        const imgRef = storage().ref('Category/' + data.imgName);
        imgRef.delete().then(async () => {
            // console.log("pppppp",id);
            await firestore()
                .collection('Category')
                .doc(data.id)
                .delete()
                .then(() => {
                    console.log('Category deleted!');
                });
        })
        return data.id;
    }
)


export const CategorySlice = createSlice({
    name: "Category",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addCategory.fulfilled, (state, action) => {
            console.log("dataaActionnnnnnnnn  ", action);
            state.Category.push(action.payload)

        })
        builder.addCase(DeletCategory.fulfilled, (state, action) => {
            console.log("actionnnnnnnn", action);
            state.Category = state.Category.filter((v) => v.id !== action.payload)
            // console.log("vvvvvvvvvvvv",v);
        })
        builder.addCase(getCategoryData.fulfilled, (state, action) => {
            console.log("actionnnnnnnn", action);
            state.Category = (action.payload)
            // console.log("vvvvvvvvvvvv",v);
        })

    }
})
// export const { userdata } = CategorySlice.actions
export default CategorySlice.reducer;