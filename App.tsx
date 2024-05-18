import React from 'react'
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homepage from './Homepage';
import Levelpage from './Level_page';
import Puzzle from './Puzzle_page';
import Win_page from './Win_page';
const Stack  = createNativeStackNavigator()
export default function App() {
  return (
    <>
    <NavigationContainer>
       <Stack.Navigator>
          <Stack.Screen name="Home" component={Homepage}/>
          <Stack.Screen name="Level" component={Levelpage}/>
          <Stack.Screen name="Puzzle" component={Puzzle}/>     
          <Stack.Screen name='Win'component={Win_page}/>    
       </Stack.Navigator>
    </NavigationContainer>
    </>
  )
}
