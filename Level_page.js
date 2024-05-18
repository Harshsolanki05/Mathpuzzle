import React, { useCallback, useEffect, useState } from 'react'
import { Alert, Image, ImageBackground, Pressable, StyleSheet, Text, TextInput, View, useAnimatedValue } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

function Levelpage({navigation}) {

  const [SkipData,SetSkipData] = useState([])
  const [levelnum, setlevelnum] = useState(1)
  const [coin,getcoin] = useState(10)
  const [maxlevel,setmexlavel] = useState([])
  

  const RightAnswer = ["10", "25", "6", "14", "128", "7", "50", "1025", "100", "3","11","12"];
  const hint = ["Sum","MULTIPULICATION","6*30 = 30","Count The Square","Try Multiplication","Look At The Different Of Tow Number","Apply BOOMAS"]

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('levelnum', value.toString());
      navigation.push('Level')
    } catch (e) {
      // saving error
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
  const storeskipData = async (value) => {
    try {
      if(value.length)
      {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('Skiplevel', jsonValue);
      }
    } catch (e) {
      // saving error
    }
  };
  useFocusEffect(
    useCallback(()=>{
      storeskipData(SkipData);
      console.log(SkipData)
    },[SkipData])
  )
  
  const getSkipData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('Skiplevel');
      var temp = jsonValue != null ? JSON.parse(jsonValue) : [];
      SetSkipData(temp); 
    } catch (e) {
      // error reading value
    }
  };
  useFocusEffect(
    React.useCallback(() => {      
      getData()
      getcoinData()
      getSkipData()
    },[])
  );
    const [num,setnum] = useState("");
    function btnclick(x) {
      setnum(num+x)
    }
    function removenum() {
      temp = num;
      setnum((temp.substring(0,temp.length-1)));
    }
    function submitans() {
     
      if (parseInt(num)==RightAnswer[levelnum-1]){

        storecoinData(String(coin+10))
        temparry = [...SkipData]
        if (temparry.includes(levelnum)) {
          for(var i=0; i<temparry.length;i++)
          {
            if(temparry[i] == levelnum)
            {
              temparry[i]="";
            }           
          }
          storeskipData(temparry)
        }        
        setnum("")
        storeData(levelnum+1)
        navigation.navigate("Win")
      }
      else{
        Alert.alert("wrong..❌");
        storecoinData(String(coin-10))
        setnum("")
      } 
    }
    function hintview() {
      Alert.alert("Hint...!",hint[levelnum-1]);
    }   
    function skip() {
      SetSkipData([...SkipData,levelnum]);
      storeData(String(levelnum+1))
    }
    const storecoinData = async (value) => {
      try {
        await AsyncStorage.setItem('coin', value);
      } catch (e) {
        // saving error
      }
    };
    const getcoinData = async () => {
      try {
        const value = await AsyncStorage.getItem('coin',value);
        if (value !== null) {
          getcoin(parseInt(value))
        }
      } catch (e) {
        // error reading value
      }
    };
   
    const imagearray = [  require("./image/p1.png"),require("./image/p2.png"),require("./image/p3.png"),require("./image/p4.png"),require("./image/p5.png"),require("./image/p6.png"),
                          require("./image/p7.png"),require("./image/p8.png"),require("./image/p9.png"),require("./image/p10.png"),require("./image/p11.png"),require("./image/p12.png"),require("./image/p13.png")]

  return (
    <>
    {/* ======= Header ========== */}
      <ImageBackground source={require("./image/background.jpg")} style = {style.background} resizeMode="stretch">
        
          <View style={style.line}>
          <Pressable onPress={()=>{skip()}}>       
              <Image source={require("./image/skip.png")}style = {style.skipbtn} resizeMode="stretch"></Image>
            </Pressable>
          {/* ============== */}
            <View>
              <ImageBackground source={require("./image/level_board.png")}style = {style.levelpage} resizeMode="stretch">
                <Text style={style.puz}>Puzzle {levelnum}</Text>
              </ImageBackground>
            </View>
          {/* ============== */}
            <View>
              <Pressable onPress={()=>hintview()}>
                  <Image source={require("./image/hint.png")}style = {style.hintbtn} resizeMode="stretch"></Image>
              </Pressable>
            </View>
          </View>
    {/* ======= Header close ========== */}
    {/* ======= contente ========== */}    
        <View style={style.scroe}>
            <Text style={style.textnum}>🪙 {coin}</Text>
        </View>
        <Image source={imagearray[levelnum-1]} style = {style.contact} resizeMode="stretch"></Image>
    {/* ======= contente close ========== */}
    {/* ======= futter close ========== */}
      <View style={style.futter}>
        <View style={style.futterline1}>
          <TextInput style={style.dptext}>{num}</TextInput>
          <Pressable style={style.imgbtn} onPress={()=>{ removenum() }}>
            <Image source={require("./image/delete.png")} resizeMode="stretch" style={style.backbtn}></Image>
          </Pressable>
          <Pressable onPress={()=>{ submitans() }} >
              <Text style={style.sub}>SUBMIT</Text>
          </Pressable>
        </View>
        <View style={style.futterline2}>
            <Pressable style={style.nobtn} onPress={()=>{ btnclick('1') }}>
                <Text style={style.numbtn} >1</Text>
            </Pressable>
            <Pressable style={style.nobtn} onPress={()=>{ btnclick('2') }}>
                <Text style={style.numbtn} >2</Text>
            </Pressable>
            <Pressable style={style.nobtn} onPress={()=>{ btnclick('3') }}>
                <Text style={style.numbtn} >3</Text>
            </Pressable>
            <Pressable style={style.nobtn} onPress={()=>{ btnclick('4') }}>
                <Text style={style.numbtn} >4</Text>
            </Pressable>
            <Pressable style={style.nobtn} onPress={()=>{ btnclick('5') }}>
                <Text style={style.numbtn} >5</Text>
            </Pressable>
            <Pressable style={style.nobtn} onPress={()=>{ btnclick('6') }} >
                <Text style={style.numbtn} >6</Text>
            </Pressable>
            <Pressable style={style.nobtn} onPress={()=>{ btnclick('7') }}>
                <Text style={style.numbtn} >7</Text>
            </Pressable>
            <Pressable style={style.nobtn} onPress={()=>{ btnclick('8') }}>
                <Text style={style.numbtn} >8</Text>
            </Pressable>
            <Pressable style={style.nobtn} onPress={()=>{ btnclick('9') }}>
                <Text style={style.numbtn} >9</Text>
            </Pressable>
            <Pressable style={style.nobtn} onPress={()=>{ btnclick('0') }}>
                <Text style={style.numbtn} >0</Text>
            </Pressable>
            
        </View>
      </View>
    {/* ======= futter close ========== */}  
      </ImageBackground>
    </>
  )
}
export default Levelpage;
const style = StyleSheet.create({
  background:{
      height:"100%",
      width:"100%",
  },
  skipbtn:{
    height:50,
    width:50,
    marginLeft:10,
    marginTop:10,
  },
  levelpage:{
    height:60,
    marginTop:10,
    width:190,    
  },
  puz:{
    fontSize:30,
    color:'black',
    fontStyle:"italic",
    fontWeight:'bold',
    textAlign:'center',
    marginTop:9,
    
  },
  line:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      alignContent:'center',
  },
  hintbtn:{
    height:50,
    width:50,
    marginRight:10,
    marginTop:10,
  },
  contact:{
    height:"60%",
    width:"90%",
    margin:'5%',
  },
  futter:{
    width:"100%",
    height:95,
    backgroundColor:'black',
  },
  dptext:{
    height:42,
    width:220,
    fontSize:20,
    backgroundColor:'white',
    borderRadius:5,
    marginLeft:5,
    marginTop:5,      
    fontSize:20,    
    fontWeight:'800',
    color:'black',    
    padding:5,
  },
  futterline1:{
    flexDirection:'row',
  },
  futterline2:{
    flexDirection:'row',
    width:'50%',
  },
  backbtn:{
    height:45,
    width:50,
    marginTop:5,
    marginLeft:5,
    borderRadius:5,
  },
  sub:{
    color:'white',
    fontSize:25,
    marginTop:10,
    marginLeft:9,
  },
  numbtn:{
    color:'white',
    backgroundColor:'#2b2d42',
    height:35,
    width:35,
    borderRadius:8,
    textAlignVertical:'center',
    textAlign:'center',
    marginTop:2,
    marginRight:2,
    marginLeft:2,
  },
  scroe:{
    height:35,
    width:80,
    backgroundColor:'black',    
    borderRadius:10,
    marginLeft:310,
    marginRight:10,
  },
  textnum:{
    color:"white",
    textAlign:'center',   
    marginTop:4,
    // marginLeft:,
    fontSize:20,
    
  }
})
