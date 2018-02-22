import React from 'react';
import {Text, View, TextInput} from 'react-native';

const CustomInputText = ({value, onChangeText,placeholder})=> {
    const { containerStyle,textStyle } = styles;
    return (
        <View style={containerStyle}>
            <TextInput
                style={textStyle}
                placeholder={placeholder}
                autoCorrect={false}
                value={value}
                onChangeText={onChangeText}
                underlineColorAndroid = "transparent"
            />
        </View>
    )
}

const styles={
    containerStyle: {
        backgroundColor:'#fff',
        margin: 3,
        height: 45,
        borderColor: '#26418f',
        borderWidth: 1,
        borderRadius:35,
        marginLeft:20,
        marginRight:20
    },
    textStyle:{
        color:'#26418f',
        left:15,
        padding:6,
        //fontFamily:'ColabReg',
        fontSize:16,
    }
}
export default CustomInputText;