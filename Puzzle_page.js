import React from 'react'
import { ScrollView, Image, ImageBackground, StyleSheet, Text, View, Pressable } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
function Puzzle_page({ navigation, route }) {

    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('levelnum', value);
            navigation.navigate('Level')
            console.log('levelnum');
        } catch (e) {

        }
    };
    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('levelnum');
          if (value !== null) {        
            console.log("Level=",value);
            setlevelnum(parseInt(value))
          }
        } catch (e) {
         
        }
      };
    const level = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    return (
        <>
            <ImageBackground source={require("./image/mainback.jpg")} style={style.background} resizeMode='stretch'>
                <Text style={style.lebel}>Select Puzzle</Text>
                <ScrollView>

                    <View style={style.line}>
                        {
                            level.map((val, ind) => {
                                return (

                                    <Pressable onPress={() => storeData('1')} style={{ borderWidth: 1 }}>
                                        <Image source={require("./image/lock.png")} style={style.lockbtn} resizeMode='stretch'></Image>
                                    </Pressable>
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </ImageBackground>
        </>
    )
}

export default Puzzle_page;
const style = StyleSheet.create({
    background: {
        height: "100%",
        width: "100%",
    },
    lockbtn: {
        height: 90,
        width: 90,
    },
    nextbtn: {
        height: 90,
        width: 90,
        marginLeft: 'auto',
        marginRight: 5,
    },
    line: {
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: 'center',
        marginTop: 15,
    },
    lebel: {
        fontSize: 40,
        color: 'blue',
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 6,
    },
    lineend: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 15,
        marginLeft: 15,
        marginBottom: 20,
    }
})
