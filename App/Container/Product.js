import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteData, EditData, fetchuser, getuserdata, userdata } from '../redux/slice/formSlice';
import { ScrollView } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import { AddProduct } from '../redux/slice/ProductSlice';




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
    Title: yup.string().matches(/^[a-zA-Z\-]{2,30}$/, 'plaese enter valid Name').required(),
    image: yup.mixed().required(),
    price: yup.number().required().positive(),
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
      Title: '',
      price: '',
      description: '',
      image: '',
    },
    validationSchema: scheme,
    onSubmit: (values, { resetForm }) => {
      console.log("valuessss", values);
      dispatch(AddProduct(values))
     
      resetForm();

    },
  });
  const { handleBlur, handleChange, handleSubmit, values, touched, errors, setValues, setFieldValue } = formik

  console.log(errors);

  return (
    <View>
      <TextInput
        style={style.input}
        value={values.Title}
        onChangeText={handleChange('Title')}
        onBlur={handleBlur('Title')}
        name='Title'
        placeholder="Enter your Title"
      />
      {touched.Title && errors.Title ? <Text>{errors.Title}</Text> : null}


      <TextInput
        style={style.input}
        value={values.price}
        onChangeText={handleChange('price')}
        onBlur={handleBlur('price')}
        name='price'
        placeholder="Enter your price"
      // keyboardType='numeric'
      />
      {touched.price && errors.price ? <Text>{errors.price}</Text> : null}

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