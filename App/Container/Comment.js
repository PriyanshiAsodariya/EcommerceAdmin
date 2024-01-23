import { View, Text, Button, ScrollView, TextInput, ActivityIndicator, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addcomment, deletcomment, getComment, updateComment } from '../redux/Action/Comment.action'
// import {State, TextInput } from 'react-native-gesture-handler'

export default function Comment() {
  const [update, setupdate] = useState(null)
  const [comment, setcomment] = useState('')
  // console.log(comment)


  const dispatch = useDispatch()

  const Cmt = useSelector(State => State.comments)
  console.log(Cmt);

  useEffect(() => {
    dispatch(getComment())
  }, [])

  const handleDelet = (id) => {
    dispatch(deletcomment(id))
    console.log(id);
  }

  const handlesubmit = () => {
    if (update) {
      dispatch(updateComment({ ...update, body: comment }))
    } else {
      dispatch(addcomment({ body: comment, id: Math.floor(Math.random() * 100000) }))
      console.log(comment)
    }

    setupdate(null)
    setcomment('')
  }
  const handleEdit = (v) => {
    console.log(v)
    setupdate(v)
    setcomment(v.body)
  }
  return (
    <View>
      <ScrollView>
        {
          Cmt.isLoading ?
            <ActivityIndicator size="large" color="#ff6347" />
            : Cmt.error ? <Text>{Cmt.error}</Text> :
              Cmt.comments.map((v) => {
                return (
                  <View key={v.id} style={{ margin: 10, }}>
                    <Text style={{ color: 'black' }}>{v.body}<Button onPress={() => handleEdit(v)} title='EDIT'></Button>  <Button title='delet' onPress={() => handleDelet(v.id)}></Button></Text>
                  </View>
                )
              })
        }


        <View style={{ borderWidth: 2, height: 60, marginHorizontal: 16, flexDirection: "row" }}>
          <TextInput
            style={{ borderWidth: 1, marginHorizontal: 16, marginBottom: 16, width: 225, height: '100%', }}
            onChangeText={setcomment}
            value={comment}
            placeholder="Add Comment"
            keyboardType="text"
          />

          <Button title='submit' onPress={() => handlesubmit()} />
        </View>

      </ScrollView>

    </View>
  )
}
