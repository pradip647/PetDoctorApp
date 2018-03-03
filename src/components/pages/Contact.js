import React from 'react';
import { StyleSheet, Text, View,TextInput,Dimensions,TouchableOpacity ,Image,ScrollView } from 'react-native';
import { CustomHeader,CustomButton,CustomInputText,CustomImage} from '../common';
 import { Actions } from 'react-native-router-flux';
 import * as firebase from 'firebase';

var {height, width} = Dimensions.get('window');
export default class Contact extends React.Component {
    
    static navigationOptions = {
        header: null,
    };
    constructor(props){
        super(props);
    }


  render() {
    return (
        // <View>

        //phone_icon.png
        <View>
            <View style={{top:30}}>
                <CustomHeader  Headershow={true} headerName="Contact Us" showDataWelcome={false} showLogoutButton={false} showBackbutton= {true} Textwelcome="Pradip" onPressLogout={()=>{alert("Logout Clicked")}} onPressBack={()=>{Actions.pop()}}/>
            </View>
            <ScrollView style={{height:Dimensions.get('window').height-90, marginTop:31}}>
                <View style={{marginTop:50}}>
                        <CustomImage
                            resizeMode="contain"
                            imageViewStyle={{alignSelf:'center'}}
                            imageTagStyle={{height:120, width:(width-100)}}
                            //imageURL={{uri:'http://www.imag.co.uk/images/gravel/raisby-golden-gravel-lg-1.jpg'}}
                            imageURL={require('../../assets/images/phone_icon.png')}
                        />
                </View>

                    <View style={{marginTop:50, padding:10, alignSelf:'center'}}>
                        <Text style={{fontWeight:'bold', color:'#00227b'}}> 
                            Phone : +603 4042 6742 
                        </Text>
                        <Text style={{fontWeight:'bold', color:'#00227b'}}> 
                            Email : contact@exicube.com
                        </Text>
                    </View>       
            </ScrollView> 
         </View>



    
    );
  }
}

const styles = StyleSheet.create({

});