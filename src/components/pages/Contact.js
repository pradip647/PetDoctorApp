import React from 'react';
import { StyleSheet, Text, View,TextInput,Dimensions,TouchableOpacity ,Image,ScrollView } from 'react-native';
import { CustomHeader,CustomButton,CustomInputText,CustomImage} from '../common';
import { Actions } from 'react-native-router-flux';
//call function
import call from 'react-native-phone-call'
import * as firebase from 'firebase';

var {height, width} = Dimensions.get('window');
export default class Contact extends React.Component {
    
    static navigationOptions = {
        header: null,
    };
    constructor(props){
        super(props);
    }

    clickToCall(){
        const args = {
            number: '919679389767', // String value with the number to call 
            prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call  
          }
    
          call(args).catch(console.error)
    }


  render() {
    return (
        // <View>

        //phone_icon.png
        <View>
            <View style={{top:23}}>
                <CustomHeader  Headershow={true} headerName="Contact Us" showDataWelcome={false} showLogoutButton={false} showBackbutton= {true} Textwelcome="Pradip" onPressLogout={()=>{alert("Logout Clicked")}} onPressBack={()=>{Actions.pop()}}/>
            </View>
            <ScrollView style={{height:Dimensions.get('window').height-90, marginTop:31}}>
                <View style={{marginTop:50}}>
                    <TouchableOpacity onPress={()=>{this.clickToCall()}}>
                        <CustomImage
                            resizeMode="contain"
                            imageViewStyle={{alignSelf:'center'}}
                            imageTagStyle={{height:120, width:(width-100)}}
                            imageURL={require('../../assets/images/phone_icon.png')}
                        />
                    </TouchableOpacity>
                </View>

                    <View style={{marginTop:50, padding:10, alignSelf:'center'}}>
                        <Text style={{fontWeight:'bold', color:'#00227b'}} onPress={()=>{this.clickToCall()}}> 
                            Phone : +91 9679389767 
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