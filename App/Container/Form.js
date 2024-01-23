import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteData, EditData, fetchuser, getuserdata, userdata } from '../redux/slice/formSlice';
import { ScrollView } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';




export default function Form() {

    const [open, setOpen] = useState(false)

    const [update, setUpdate] = useState(false)
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);
    console.log("ppppp", user);

    const upload = () => {
        name = 'image'
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
           setFieldValue("image", image)
        }).catch(err => console.log(err))     
    }

    useEffect(() => {
        dispatch(getuserdata())
    }, [])

    const handleDelet = (data) => {
        // console.log("DELETE id",id);
        dispatch(DeleteData(data))
    }

    const handleEdit = (data) => {
        console.log(data);
        setValues(data);
        setUpdate(true)

    }

    const scheme = yup.object({
        Name: yup.string().matches(/^[a-zA-Z\-]{2,30}$/, 'plaese enter valid Name').required(),
        Age: yup.string().required(),
        image: yup.mixed().required(),
        salary: yup.number().required().positive(),
        description: yup.string().required().test('description', 'please enter minimum 10 words', (values) => {
            let arr = values.split(' ')
            console.log(arr);

            if (arr.length < 1) {
                return false;
            } else {
                return true;
            }
        }),

    })

    const formik = useFormik({
        initialValues: {
            Name: '',
            Age: '',
            salary: '',
            description: '',
            image: '',
        },
        validationSchema: scheme,
        onSubmit: (values, { resetForm }) => {
            // console.log("valuessss", values);

            if (update) {
                dispatch(EditData(values))
            } else {
                dispatch(fetchuser(values))
            }
            resetForm();

        },
    });
    const { handleBlur, handleChange, handleSubmit, values, touched, errors, setValues,setFieldValue } = formik

    console.log(errors);

    return (
        <View>
            <TextInput
                style={style.input}
                value={values.Name}
                onChangeText={handleChange('Name')}
                onBlur={handleBlur('Name')}
                name='Name'
                placeholder="Enter your Name"
            />
            {touched.Name && errors.Name ? <Text>{errors.Name}</Text> : null}

            <TextInput
                style={style.input}
                value={values.Age}
                onChangeText={handleChange('Age')}
                onBlur={handleBlur('Age')}
                name='Age'
                placeholder="Enter your Age"
            // keyboardType='numeric'
            />
            {touched.Age && errors.Age ? <Text>{errors.Age}</Text> : null}

            <TextInput
                style={style.input}
                value={values.salary}
                onChangeText={handleChange('salary')}
                onBlur={handleBlur('salary')}
                name='salary'
                placeholder="Enter your salary"
            // keyboardType='numeric'
            />
            {touched.salary && errors.salary ? <Text>{errors.salary}</Text> : null}

            <TextInput
                style={style.input}
                value={values.description}
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                name=''
                placeholder="Enter your description"
            />
            {touched.description && errors.description ? <Text>{errors.description}</Text> : null}

            <View style={style.container}>
                    <Button
                        style={{}}
                        title='upload image'
                        onPress={() => upload()}
                    />
                    {touched.image && errors.image ? <Text style={style.error}>{errors.image}</Text> : null}
            </View>

            <TouchableOpacity style={style.btn} onPress={handleSubmit} >
                <Text style={{ color: 'white', fontSize: 20, marginTop: 10, }}>{update ? 'UPDATE' : 'SUBMIT'}</Text>
            </TouchableOpacity>
            <ScrollView>
                {
                    user.isLoading ?
                        // <Text>...Isloading</Text> :
                        <ActivityIndicator size={'large'} color={'red'} style = {{marginTop : 50}}/> :
                        user.error ?
                            <Text>{user.error}</Text> :
                            user.user.map((v) => {
                                // console.log("iddddddddd", v.id);
                                return (
                                  
                                    <View key={v.id} style={{ marginTop: 50, marginHorizontal: 16 }}>
                                        <Image
                                        source={{uri : v.image}}
                                        style = {{width :100 , height :100}}
                                        />
                                        <Text style={style.text}> {v.Name}</Text>

                                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                            <TouchableOpacity style={{ width: 54, height: 24, backgroundColor: 'black' }} onPress={() => handleEdit(v)}>
                                                <Text style={{ color: 'white', textAlign: 'center' }}>EDIT</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity style={{ marginHorizontal: 16, width: 54, height: 24, backgroundColor: 'black' }} onPress={() => handleDelet(v)}>
                                                <Text style={{ color: 'white', textAlign: 'center' }}>DELETE</Text>
                                            </TouchableOpacity>
                                        </View>

                                        {/* <Text style={style.text}>Age  : {v.Age}</Text> */}
                                    </View>
                                )
                            })
                }
            </ScrollView>
        </View>
    )
}
const style = StyleSheet.create({
    input: {
        borderWidth: 1,
        padding: 8,
        marginTop: 24,
        marginHorizontal: 16,
    },
    btn: {
        backgroundColor: 'black',
        width: 200,
        height: 50,
        marginTop: 50,
        marginHorizontal: 16
    },
    text: {
        fontSize: 16,
        color: 'black'
    },
    container: {
        backgroundColor: 'white',
        padding: 16,
    },
})