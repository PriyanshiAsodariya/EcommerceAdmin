import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import { useFormik } from 'formik'
import * as yup from 'yup';

import AntDesign from 'react-native-vector-icons/AntDesign';

import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';
import { DeletCategory, addCategory, getCategoryData } from '../redux/slice/CategorySlice';




function ModalTester() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [Name, setName] = useState('')

  console.log(Name);


  const dispatch = useDispatch();

  const categoryData = useSelector(state => state.Category);
  console.log(categoryData, "*********************");

  useEffect(() => {
    dispatch(getCategoryData())
  }, [])

  const scheme = yup.object({
    Name: yup.string().matches(/^[a-zA-Z\-]{2,30}$/, 'plaese enter valid Name').required(),
    image: yup.mixed().required(),
  })

  const toggleModal = () => {
    // dispatch()
    setModalVisible(!isModalVisible);
  }
  const handleDelet = (data) => {
    // console.log("",data);
    dispatch(DeletCategory(data))
  }




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
  const formik = useFormik({
    initialValues: {
      Name: '',
      image: '',
    },
    validationSchema: scheme,
    onSubmit: (values, { resetForm }) => {
      // console.log("valuessss", values)
      dispatch(addCategory(values))
      console.log(values);
      resetForm();

      setModalVisible(!isModalVisible);

    },
  });
  const { handleBlur, handleChange, handleSubmit, values, touched, errors, setValues, setFieldValue } = formik

  console.log("cccccccccccccccc",categoryData.Category);
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={toggleModal} style={{ width: 500, height: 50, backgroundColor: 'skyblue', marginTop: 10 }}>
        <Text style={{ color: 'white', fontSize: 20, marginLeft: 118 }}>Add Category</Text>
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        animationType="fade"
      >
        <View style={{ height: 400, backgroundColor: 'skyblue', borderRadius: 50 }}>

          <TouchableOpacity>
            <TextInput
              name='Name'
              onChangeText={handleChange('Name')}
              onBlur={handleBlur('Name')}
              style={{ padding: 8, marginTop: 90, borderWidth: 1, fontSize: 18, marginBottom: 50, color: 'white', width: 300, marginLeft: 12 }}
              // onChangeText={setName}
              placeholder='Category Name'
              // keyboardType='text'
              placeholderTextColor={'white'}
            />
            {touched.Name && errors.Name ? <Text>{errors.Name}</Text> : null}
          </TouchableOpacity>

          <View style={style.container}>
            <Button
              style={{}}
              title='upload image'
              onPress={upload}
            />
            {touched.image && errors.image ? <Text style={style.error}>{errors.image}</Text> : null}
          </View>

          <TouchableOpacity onPress={handleSubmit} style={style.Submit}>
            <Text style={{ color: 'black', fontSize: 20, }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={{ marginTop: 15, }}>

        {

          categoryData.Category.map((v) => {
           
            return (
              // console.log("vvvvvvvvvvv",v);
              <View key={v.id}>
                <Image
                  source={{ uri: v.image }}
                  style={{ width: 100, height: 100 }}
                />
                <Text style={{ color: 'black', fontSize: 20, marginHorizontal: 16, marginTop: 16 }}>{v.Name} </Text>
                <TouchableOpacity onPress={() => handleDelet(v)}>
                  <AntDesign name="delete" color={'red'} size={30} style={{ marginHorizontal: 16 }} />
                  {/* <Text style = {{marginHorizontal : 16}}>DELETE</Text> */}
                </TouchableOpacity>
              </View>
            )
          })
        }
      </View>
    </View>
  )
}
export default ModalTester;

const style = StyleSheet.create({
  Submit: {
    backgroundColor: 'white',

    padding: 8,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    marginLeft: 12

  },
  categoryText: {
    color: 'black',
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 6,
    fontSize: 20,
    marginHorizontal: 16,

  },
  container: {
    justifyContent: "center",
    padding: 16,
  }
})
