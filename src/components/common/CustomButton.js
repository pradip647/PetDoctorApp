import React from 'react';
import {View,Text, TouchableOpacity} from 'react-native';

//make a compontent
const CustomButton = ({onPress, children}) =>{
    const { buttonStyle,textStyle,buttomViewStyle } = styles;
   return (
       <View style={buttomViewStyle}>
        <TouchableOpacity onPress={onPress} style={buttonStyle}>
            <Text style={textStyle}>
                {children}
            </Text>
        </TouchableOpacity>
        </View>
   );

};

const styles = {
    buttomViewStyle:{height:45, width:300,alignSelf:'center', marginBottom:10},
    textStyle:{
        alignSelf:'center',
        color:'#fff',
        fontSize:16,
        padding:10,
    },
    buttonStyle:{
        flex:1,
        alignSelf:'stretch',
        backgroundColor:'#3f51b5',
        borderRadius:35,
        borderWidth:1,
        borderColor:'#3f51b5',
        marginLeft:5,
        marginRight:5,
    }
}

export default CustomButton;