import { View, Text, ScrollView, Button, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Modal from "react-native-modal";
import { useDispatch, useSelector } from 'react-redux'
import { addPost, deletpost, getPost, updatePost } from '../redux/Action/Posts.action';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Posts() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [update, setupdate] = useState(null);
    const [title, settitle] = useState('')
    const [price, setPrice] = useState('')

    // console.log("jjjjjjjj", update)
    // console.log(title , price)

    const dispatch = useDispatch();


    const toggleModal = () => {
        // console.log("okkkkk");
        setModalVisible(!isModalVisible)
    }
 

    const handlesubmit = () => {
        setModalVisible(!isModalVisible)
        if (update) {
            dispatch(updatePost({ ...update, title: title, Price: price }))
        } else {
            dispatch(addPost({  title, price  }))
            console.log(title, price)
        }
    }
    const handleEdit = (v) => {
        setModalVisible(!isModalVisible)
        console.log("editttt",v)
        setupdate(v)
        settitle(v.title)
        setPrice(v.price)
    }

    

    const Posts = useSelector(state => state.posts);
    // console.log(Posts);

    useEffect(() => {
        dispatch(getPost())
    }, [])


    const handleDelet = (id) => {
        dispatch(deletpost(id))
    }
    return (
        <ScrollView>

            <TouchableOpacity onPress={() => toggleModal()} style={{ width: 500, height: 50, backgroundColor: 'skyblue', marginTop: 10 }}>
                <Text style={{ color: 'white', fontSize: 20, marginLeft: 118 }}>Add post</Text>
            </TouchableOpacity>

            <Modal
                isVisible={isModalVisible}
                onBackdropPress={() => toggleModal()}
                animationType="fade"
            >
                <View style={{ height: 400, backgroundColor: 'skyblue', borderRadius: 50 }}>


                    <TextInput
                        style={style.titleinput}
                        onChangeText={settitle}
                        value={title}
                        placeholder='Add Title'
                        // keyboardType='text'
                        placeholderTextColor={'black'}
                    />


                    <TextInput
                        style={style.price}
                        onChangeText={setPrice}
                        value={price}
                        placeholder='Add Price'
                        // keyboardType='numeric'
                        placeholderTextColor={'black'}
                    />

                    <TouchableOpacity onPress={() => handlesubmit()} style={style.Submit}>
                        <Text style={{ color: 'black', fontSize: 20, }}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            {
                Posts.posts.map((v) => {
                    return (
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }} >
                            <Text style={{ color: 'black' }} key={v.id}>{v.title}  PRICE: {v.price}</Text>
                            <TouchableOpacity onPress={() => handleDelet(v.id)}>
                                <AntDesign name="delete" color={'red'} size={25} />
                            </TouchableOpacity>

                            <TouchableOpacity style={''} onPress={() => handleEdit(v)}>
                                <AntDesign name="edit" color={'blue'} size={25} />
                            </TouchableOpacity>

                            {/* <Text style={{ color: 'black' }} key={v.id}>{v.title}<Button title='DELETE' onPress={() => handleDelet(v.id)}></Button><Button title='EDIT' onPress={() => handleEdit(v.id)}></Button></Text> */}
                        </View>
                    )
                })
            }
        </ScrollView>
    )
}

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
    price: {
        padding: 8,
        marginTop: 10,
        borderWidth: 1,
        fontSize: 18,
        marginBottom: 10,
        color: 'white',
        width: 300,
        marginLeft: 12
    },
    titleinput: {
        padding: 8,
        marginTop: 90,
        borderWidth: 1,
        fontSize: 18,
        color: 'white',
        width: 300,
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