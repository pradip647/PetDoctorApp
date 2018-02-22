import React from 'react';
import {View,Text, TouchableOpacity, Dimensions, Image} from 'react-native';

//make a compontent
var {height, width} = Dimensions.get('window');
const CustomCardImg = ({onPress, children, imageURL,imageHeading, imageTitle}) =>{
    const { buttonStyle,textStyle,buttomViewStyle } = styles;
   return (
       //{ uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-10.png' }


        // <TouchableOpacity onPress={} style={{margin:5, width:width-20, height:70, borderColor:'#6f74dd',borderWidth:0.7 }}>   
        //     <View style={{flex:1, flexDirection:'row',justifyContent:'space-around'}}>
        //         <Image
        //             style={{height:70, width:100}}
        //             //styleName="small rounded-corners"
        //             source={{ uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-10.png' }}
        //             />
        //         <View style={{ width:width-90}}>
        //             <View style={{flex:1, flexDirection:'column'}}>
        //                 <View><Text style={{left:20, fontWeight:'bold'}}>Pet name</Text></View>
        //                 <View><Text style={{left:20}}>Pet Details</Text></View>
        //             </View>
        //         </View>
        //     </View>
        // </TouchableOpacity>

    <View><Text>csjhbc</Text></View>
        
   );

};

const styles = {
   
}

export default CustomCardImg;