import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import StackNavigation from './App/Routes/StackNavigation';
import DrawerNavigation from './App/Routes/DrawerNavigation';
import { Provider } from 'react-redux';
import { store } from './App/redux/store';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>

          <DrawerNavigation />

        </NavigationContainer>
      </Provider>

      
    )
  }
}