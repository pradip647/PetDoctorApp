import React from 'react';
import { StyleSheet, Text, View,TextInput,Dimensions,TouchableOpacity ,Image } from 'react-native';
import { CustomHeader,CustomButton,CustomInputText,CustomImage} from '../common';
import { ScrollView } from 'react-native-gesture-handler';
import { Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';

// "name":"doctorapp",
// "icon": "./src/assets/images/logo.png",

var {height, width} = Dimensions.get('window');
export default class Home extends React.Component {
    
    static navigationOptions = {
        header: null,
    };
    constructor(props){
        super(props);
    }
    openAlert(data){
        alert(data + ' Clicked');
    }

    signInClick(){
        Actions.Login();
    }

    signUpClick(){
        Actions.Register();
    }

  render() {
      const {ViewStyle,flexMainView,flexSubView} = styles;
    return (
        <View>
            <ScrollView style={ViewStyle}>
                <View style={ViewStyle}>
                    <View style={{marginTop:50}}>
                        <CustomImage
                            resizeMode={'contain'}
                            imageViewStyle={{alignSelf:'center'}}
                            imageTagStyle={{height:200, width:(width-100)}}
                            //imageURL={{uri:'http://www.imag.co.uk/images/gravel/raisby-golden-gravel-lg-1.jpg'}}
                            imageURL={require('../../assets/images/logo.png')}
                        />
                        <Text style={{alignSelf: 'center', fontSize: 15, fontWeight: 'bold'}}>BookYourVet</Text>
                        <View style={{marginTop:40}}>
                            <CustomButton onPress={()=>{this.signInClick()}}>SIGN IN</CustomButton>
                            <CustomButton onPress={()=>{this.signUpClick()}}>SIGN UP</CustomButton>
                        </View>
                    </View>
                </View>
                <View style={flexMainView}>
                        <View style={flexSubView}>

                            <TouchableOpacity onPress={()=>{Actions.About()}}>
                                <View style={{width: 110, height: 50, }}><Text style={{fontSize:12,color:'#000', margin:15, alignSelf:'center', }}>About Us</Text></View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{Actions.Contact()}}>
                                <View style={{width: 110, height: 50,}}><Text style={{fontSize:12,color:'#000', margin:15, alignSelf:'center' , }}>Contact Us</Text></View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{Actions.Map()}}>
                                <View style={{width: 110, height: 50, }}><Text style={{fontSize:12,color:'#000', margin:15, alignSelf:'center', }}>Location</Text></View>
                            </TouchableOpacity>

                        </View>
                </View>   
            </ScrollView> 
        </View>
    );
  }
}
const styles = StyleSheet.create({
    ViewStyle:{height:Dimensions.get('window').height},
    flexMainView:{position:'absolute', bottom:10, alignSelf:'center', width:width},
    flexSubView:{flex: 1, flexDirection: 'row', justifyContent:'space-around'}

});