import { View, Text, StyleSheet, Button, TouchableOpacity, Image, PermissionsAndroid } from 'react-native'
import React, { useEffect, useState } from "react";
import { TextInput } from 'react-native-gesture-handler';
// import ImagePicker from 'react-native-image-crop-picker';
import { useFormik } from 'formik'
import * as yup from 'yup';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { AddSubCat, deleteSubCatData, getSubCat } from '../redux/slice/SubCategorySlice';

export default function SubCategory() {


  const dispatch = useDispatch();

  const subcatData = useSelector(state => state.subcategory)
  console.log("catttttttdattttttt", subcatData);

  useEffect(() => {
    dispatch(getSubCat())
  }, [])

  const handleDelet = (data) =>{
    console.log("datataaa",data);
    dispatch(deleteSubCatData(data))
  }

  const scheme = yup.object({
    Name: yup.string().matches(/^[a-zA-Z\-]{2,30}$/, 'plaese enter valid Name').required(),

  })

  const formik = useFormik({
    initialValues: {
      Name: '',

    },
    validationSchema: scheme,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      dispatch(AddSubCat(values))
      resetForm();



    },
  });
  const { handleBlur, handleChange, handleSubmit, values, touched, errors, setValues, setFieldValue } = formik

  return (
    <View>
      <View>
        <TextInput
          name='Name'
          onChangeText={handleChange('Name')}
          onBlur={handleBlur('Name')}
          placeholder='Add Sub Category'
          style={{ width: 320, height: 50, borderWidth: 2, marginHorizontal: 16, marginTop: 20 }}
        />
        {touched.Name && errors.Name ? <Text>{errors.Name}</Text> : null}

        <TouchableOpacity onPress={handleSubmit} style={{ width: 200, marginHorizontal: 20, borderRadius: 20, height: 35, marginTop: 20, borderWidth: 2, backgroundColor: 'black', marginLeft: 80 }}>
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 20, }}>SUBMIT</Text>
        </TouchableOpacity>
      </View>

      {
        subcatData.subcategory.map((v) => {
          return (
            <View>
              <Text style={{ color: 'black', fontSize: 20, marginHorizontal: 16, marginTop: 20 }}>{v.Name}</Text>
              <TouchableOpacity onPress={() => handleDelet(v)}>
              <AntDesign name="delete" color={'red'} size={30} style = {{marginHorizontal : 16}}/>
                {/* <Text style={{ marginHorizontal: 16 }}>DELETE</Text> */}
              </TouchableOpacity>
            </View>
          )
        })
      }
    </View>
  )
}

