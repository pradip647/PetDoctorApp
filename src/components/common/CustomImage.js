import React from 'react';
import {View,Image,Dimensions, Text} from 'react-native';

//make a compontent
const CustomImage = ({onPress, children,imageViewStyle,imageTagStyle, imageURL}) =>{
    const { buttonStyle,textStyle,buttomViewStyle } = styles;
   return (
    <View style={imageViewStyle}>
        <Image
            style={imageTagStyle}
            styleName="medium-square"
            source={imageURL} />
    </View> 
        // <View style={{alignSelf:'center', marginTop:5}}>
        // {/* https://shoutem.github.io/img/ui-toolkit/examples/image-10.png */}
        // <Image
        // style={{height:(Dimensions.get('window').height/4), width:(Dimensions.get('window').width-10),borderColor:'#6D60E8'}}
        // styleName="medium-square"
        // source={{uri:'http://www.imag.co.uk/images/gravel/raisby-golden-gravel-lg-1.jpg'}} />
        // <Text style={{position:'absolute', marginTop:65,fontSize:22, fontWeight:'bold', marginLeft:((Dimensions.get('window').width-10)/4), color:'#fff'}}>Pradip Mondal</Text>
        // </View>
   );

};

const styles = {
    imageView:{ top:120,alignSelf:'center' }
   
}

export default CustomImage;