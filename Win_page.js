import React, { useEffect, useState } from 'react'
import { Alert, Image, ImageBackground, StyleSheet, View, Text, Pressable } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
function Win_page({ route, navigation }) {
  // const{levelnum}=route.params;
  const [levelnum, setlevelnum] = useState(1);
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('levelnum');
      if (value !== null) {
        console.log("Level=", value);
        setlevelnum(parseInt(value))
      }
    } catch (e) {

    }
  };
  // useFocusEffect(
  //   React.useCallback(() => {
  //     getData();

  //   }, [])
  // );
  function byepro() {
    Alert.alert("App is under development...!");
  }
  function nextlevel() {
    // console.log("levelnum=",levelnum)
    navigation.navigate("Level")
  }
  // console.log(levelnum);
  return (
    <>
      <ImageBackground source={require("./image/mainback.jpg")} style={style.background} resizeMode="stretch">
        <Text style={style.lebel}>Puzzle {levelnum - 1} Completed</Text>
        <View style={style.main}>
          <Image source={require("./image/trophy.png")} style={style.trophy} resizeMode="stretch"></Image>
        </View>
        <View style={style.linename}>
          <Pressable style={style.listb} onPress={() => nextlevel()}>
            <Text style={style.list}>CONTINUE</Text>
          </Pressable>
          <Pressable style={style.listb} onPress={() => navigation.navigate("Puzzle")}>
            <Text style={style.list}>PUZZLES</Text>
          </Pressable>
          <Pressable style={style.listb} onPress={() => byepro()}>
            <Text style={style.list}>BUY PRO</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </>
  )
}
export default Win_page;
const style = StyleSheet.create({
  background: {
    height: "100%",
    width: "100%",
    alignContent: 'center',
  },
  trophy: {
    marginTop: 30,
  },
  main: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lebel: {
    fontSize: 40,
    color: 'blue',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
  },
  list: {
    fontSize: 40,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    backgroundColor: '#6c757d',
    width: 250,
    borderRadius: 8,
  },
  linename: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

})


