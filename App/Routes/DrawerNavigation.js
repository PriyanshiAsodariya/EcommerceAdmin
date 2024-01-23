import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import StackNavigation from './StackNavigation';
import Category from '../Container/Category';
import SubCategory from '../Container/SubCategory';
import Product from '../Container/Product';
import Counter from '../Container/Counter';
import Comment from '../Container/Comment';
import Posts from '../Container/Posts';
import Register from '../Container/Register';
import Form from '../Container/Form';
// import Dropdown from '../Container/Dropdown';





const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Admin" component={StackNavigation} />
      <Drawer.Screen name='Category' component={Category}/>
      <Drawer.Screen name='SubCategory' component={SubCategory}/>
      <Drawer.Screen name='Product' component={Product}/>
      <Drawer.Screen name='counter' component={Counter}/>
      <Drawer.Screen name='Posts' component={Posts}/>
      <Drawer.Screen name='Comment' component={Comment}/>
      <Drawer.Screen name='Register' component={Register}/>
      <Drawer.Screen name='Form' component={Form}/>
      {/* <Drawer.Screen name='Dropdown' component={Dropdown}/> */}
     
  
  
    </Drawer.Navigator>
  )
}