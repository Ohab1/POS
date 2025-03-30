import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Login from './src/auth/Login'
import {  NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './src/screens/Home'
import Cart from './src/screens/Cart'
import Checkout from './src/screens/Checkout'
import Context from './src/context/context'

const Stack=createNativeStackNavigator()

const App = () => {
  const [cart, setCart]=useState([])
  return (
      <NavigationContainer>
        <StatusBar barStyle="dark-content"/>
        <Context.Provider value={{cart,setCart}}>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name='Login'  component={Login} options={{headerShown:false}} />
          <Stack.Screen name='Home'  component={Home} options={{headerShown:false}} />
          <Stack.Screen name='Cart'  component={Cart} options={{headerShown:false}} />
          <Stack.Screen name='Checkout'  component={Checkout} options={{headerShown:false}} />
        </Stack.Navigator>
        </Context.Provider>
      </NavigationContainer> 
  )
}

export default App

const styles = StyleSheet.create({})