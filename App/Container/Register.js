import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button, ScrollView } from 'react-native'
import React, { useState } from 'react'
import * as yup from 'yup';
import { useFormik } from 'formik';
import ImagePicker from 'react-native-image-crop-picker';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker'


// const countries = ["Select", "Egypt", "Canada", "Australia", "Ireland"]
export default function Register() {

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const [selectedLanguage, setSelectedLanguage] = useState();
    const [open, setOpen] = useState(false)

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

    const d = new Date()
    const nd = new Date();
    nd.setDate(d.getDate() - 1)
    console.log(d);

    const RegisterScheme = yup.object({
        country: yup.string().required(),
        image: yup.mixed().required(),
        name: yup.string().matches(/^[a-zA-Z ]{2,30}$/, "Please enter valid name").required(),
        email: yup.string().email().required(),
        todate : yup.date().required().min(nd),
        mobile: yup.string()
            .required()
            .matches(/^[0-9]{10}$/, 'must be only digit'),
        message: yup.string().required().test("message", "Message must be in 5 to 10 word.", (val) => {
            let arr = val.split(" ");
            console.log(arr);

            if (arr.length >= 5 && arr.length <= 10) {
                return true;
            } else {
                return false;
            }
        }),

        password: yup.string().min(6).required().matches(
            "^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$",
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),

        

    })
    const formik = useFormik({
        initialValues: {
            country: '',
            name: '',
            email: '',
            mobile: '',
            password: '',
            message: '',
            image: '',
            todate : '',
        },
        validationSchema: RegisterScheme,
        onSubmit: values => {
            console.log(values);
        },
    })

    const { handleChange, handleBlur, handleSubmit, touched, errors, values, setFieldValue } = formik

    console.log(values);

    return (
        <ScrollView>
            <View style={{ backgroundColor: 'white', flex: 1, }}>


                <TextInput
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    style={style.input}
                    name='name'
                    placeholder='Enter Name :'
                    keyboardType='text'
                />
                {touched.name && errors.name ? <Text style={style.error}>{errors.name}</Text> : null}

                <TextInput
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    style={style.input}
                    name='email'
                    placeholder='Enter email :'
                    keyboardType='text'
                />
                {touched.email && errors.email ? <Text style={style.error}>{errors.email}</Text> : null}

                <TextInput
                    style={style.input}
                    onChangeText={handleChange('mobile')}
                    onBlur={handleBlur('mobile')}
                    name='mobile'
                    placeholder='Enter mobile no :'
                    keyboardType='text'
                />
                {touched.mobile && errors.mobile ? <Text style={style.error}>{errors.mobile}</Text> : null}

                <TextInput
                    style={style.input}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    name='password'
                    placeholder='Enter password :'
                    keyboardType='text'
                />
                {touched.password && errors.password ? <Text style={style.error}>{errors.password}</Text> : null}

                <TextInput
                    style={style.input}
                    onChangeText={handleChange('message')}
                    onBlur={handleBlur('message')}
                    name='message'
                    multiline={true}
                    placeholder='Enter message :'
                    numberOfLines={5}
                    keyboardType='default'
                />
                {touched.message && errors.message ? <Text style={style.error}>{errors.message}</Text> : null}

                <View style={style.container}>
                    <Button
                        style={{}}
                        title='upload image'
                        onPress={() => upload()}
                    />
                    {touched.image && errors.image ? <Text style={style.error}>{errors.image}</Text> : null}
                </View>



                <View style={style.container}>
                    {/* <View style = {{backgroundColor : 'whi'}}> */}
                    <Picker
                        name="country"
                        selectedValue={selectedLanguage}
                        onValueChange={(itemValue, itemIndex) => {
                            setFieldValue('country', itemValue)
                            setSelectedLanguage(itemValue)
                        }}>
                        <Picker.Item label="Select" value="" />
                        <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" />
                    </Picker>

                    {touched.country && errors.country ? <Text style={style.error}>{errors.country}</Text> : null}

                </View>

         
                    <Button title="Open" onPress={() => setOpen(true)} />
                    <DatePicker
                        modal
                        name = "todate"
                        open={open}
                        date={new Date()}
                        onConfirm={(date) => {
                            setOpen(false)
                            setFieldValue('todate', date)
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />
            
              
                {touched.todate && errors.todate ? <Text style={style.error}>{errors.todate}</Text> : null}

                <TouchableOpacity style={style.submit} onPress={handleSubmit}>
                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 20 }}>submit</Text>
                </TouchableOpacity>


            </View>
        </ScrollView>

    )
}
const style = StyleSheet.create({
    input: {
        borderWidth: 2,
        marginHorizontal: 16,
        padding: 8,
        marginTop: 20,

    },
    submit: {
        width: 200,
        height: 34,
        borderWidth: 1,
        backgroundColor: 'black',
        marginTop: 20,
        marginLeft: 80,
        borderRadius: 5,
    },
    container: {
        justifyContent: "center",
        padding: 16,
    },
    container: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    error: {
        color: 'red',
        marginHorizontal: 16
    }

})
