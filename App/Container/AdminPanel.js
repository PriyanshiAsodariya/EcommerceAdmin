import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

export default function AdminPanel() {
  const counter = useSelector(state => state.counter)
  return (
    <View>
      <Text style = {{color :'black'}}>{counter.count}</Text>
    </View>
  )
}
2
