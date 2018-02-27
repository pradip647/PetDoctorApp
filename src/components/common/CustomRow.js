
import React from 'react';
import {View,Image,Dimensions, Text} from 'react-native';

//make a compontent
const CustomRow = ({onPress, children, HeadingRow, TitleRow}) =>{

   return (
       <View>
            <View style={{flex:1, flexDirection:'row', justifyContent:'space-around',margin:5}}>

            <View style={{width:120}}>
                <Text style={{padding:10, fontWeight:'bold', fontSize:16}}>{HeadingRow}</Text>
            </View>

            <View style={{width:230}}>
            <Text style={{padding:5}}>{TitleRow}</Text>
            </View>

            </View> 
            </View>
   );

};

const styles = {
    imageView:{ top:120,alignSelf:'center' }
   
}

export default CustomRow;