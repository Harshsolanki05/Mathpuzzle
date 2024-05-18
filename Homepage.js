import React, { useCallback, useState } from 'react'
import { Alert, Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';  
import { useFocusEffect } from '@react-navigation/native';

function Homepage({navigation}) {

  const [levelnum,setlevelnum] = useState(1)
 
  const storeData = async (value) => {
    try {
        await AsyncStorage.setItem('levelnum', value);
        navigation.navigate('Level')
    } catch (e) {
        // saving error
    }
};
const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('levelnum');
    if (value !== null) {
      setlevelnum(value)
    }
  } catch (e) {
    // error reading value
  }
};
  useFocusEffect(
    useCallback(()=>{
      getData()
    },[])
  )
  
  function byepro() {
    Alert.alert("Not Available...!");
  }
  return (
  <>
      <ImageBackground source={require("./image/mainback.jpg")} style = {style.background} resizeMode="stretch">
        <View>
            <Text style={style.lable}>
                Math_puzzle
            </Text>
        </View>
        <View style={style.me}>
          <ImageBackground style={style.bord} source={require("./image/blackbord.png")} resizeMode="stretch">
              <View style={style.listmain}>
                  <Pressable style={style.listb} onPress={()=> storeData(levelnum)}>
                      <Text style={style.list}>CONTINUE</Text>
                  </Pressable>
                  <Pressable style={style.listb} onPress={()=>navigation.navigate("Puzzle")}>
                      <Text style={style.list}>PUZZLES</Text>
                  </Pressable>
                  <Pressable style={style.listb} onPress={()=>byepro()}>
                      <Text style={style.list}>BUY PRO</Text>
                  </Pressable>    
             </View>            
          </ImageBackground>
        </View>
      </ImageBackground>
  </>
  )
}

export default Homepage;
const style= StyleSheet.create({

    background:{
        width:"100%",
        height:"100%",
    },
    lable:{
      textAlign:'center',
      fontSize:45,
      color:'#003566',
      top:70,
      fontStyle:"italic",
    },
    bord:{
      height:450,
      width:320,
      alignItems:"center",
      justifyContent:'center',
    },
    me:{
      alignItems:"center",
      justifyContent:'center',
      top:'15%',
    },
    list:{
      fontSize:40,
      color:'white',
      textAlign:'center',
      marginTop:10,
    },
})
