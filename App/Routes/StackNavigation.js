import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AdminPanel from '../Container/AdminPanel';



const Stack = createNativeStackNavigator();
export default function StackNavigation() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Admin" component={AdminPanel} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}