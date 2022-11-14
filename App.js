import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Home} from './components/Home.js'
import {Destination} from './components/Destinations.js'
import {Restaurants} from './components/Restaurants.js'
// import {Login} from './components/Login.js'
import React, { useState, } from 'react';
import { StyleSheet } from 'react-native';






const Tab = createBottomTabNavigator();
export default function App() {
  // const[isLogin,setisLogin]=useState();
  // const setLogin=()=>{
  //   setisLogin(true)
  // }
  return (
    // <View>
    //* <Login function={setLogin}/> */}
    // if({isLogin})
    //{ *
    <NavigationContainer>
      <Tab.Navigator initialRoute="Home">
        <Tab.Screen
          name="My BLists"
          component={Home}
        />
        <Tab.Screen
          name="My Destinations"
          component={Destination}
        />
        <Tab.Screen
          name="My Restaurants"
          component={Restaurants}
        />
      </Tab.Navigator>
    </NavigationContainer>
    // </View>

  )
}






const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E311D6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40
  },
  image: {
    flex: 1,
    justifyContent: "center",
    opacity:2.0,

  },
  text: {
    color: "white",
    fontSize: 30,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
  
  
});
