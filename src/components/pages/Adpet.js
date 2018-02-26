import React from 'react';
import { StyleSheet, Text, View,TextInput,Dimensions,TouchableOpacity ,Image,ScrollView,Platform, Button, Alert } from 'react-native';
import { CustomHeader,CustomButton,CustomInputText,CustomImage} from '../common';
// import { ScrollView } from 'react-native-gesture-handler';
 import { Actions } from 'react-native-router-flux';
 import * as firebase from 'firebase';
 import { ImagePicker } from 'expo';


var {height, width} = Dimensions.get('window');
export default class AdPet extends React.Component {
    
    static navigationOptions = {
        header: null,
    };
    constructor(props){
        super(props);
        this.state={
            name:'',
            username:'',
            address:'',
            email:'',
            ic:'',
            hp:'',
            Password:'',
            image: null, 
        }
    }

    openAlert(msg){
        alert(msg);
    }

    _pickImage = async () => {
        // Alert.alert(
        //     'Alert Title',
        //     'My Alert Msg',
        //     [
        //       {text: 'Camera', onPress: () => {this.openCamera()}},
        //       {text: 'Library', onPress: () => {this.openImageLibrary()}},
        //       {text: 'Cancel', onPress: () => console.log('OK Pressed'), style: 'cancel'},
        //     ],
        //     { cancelable: false }
        //   )
        //let result = await ImagePicker.launchImageLibraryAsync({
        let result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          this.setState({ image: result.uri });
        }
      }

    //   openCamera= async () => {
    //     let result = await ImagePicker.launchCameraAsync({
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //       });
    //       console.log(result);
    //       if (!result.cancelled) {
    //         this.setState({ image: result.uri });
    //       }  
    //   }

    //   openImageLibrary= async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //       });
    //       console.log(result);
    //       if (!result.cancelled) {
    //         this.setState({ image: result.uri });
    //       }    
    //   }


  render() {
    return (

        
        <View>
            <View style={{top:30}}>
        <CustomHeader  Headershow={true} headerName="Registration" showDataWelcome={false} showLogoutButton={false} showBackbutton= {true} Textwelcome="Pradip" onPressLogout={()=>{alert("Logout Clicked")}} onPressBack={()=>{Actions.pop()}}/>
        </View>
        <ScrollView style={{height:Dimensions.get('window').height-90, marginTop:31}}>
        
                <View style={{marginTop:10}}>
                <TouchableOpacity onPress={()=>{this._pickImage()}}>
                    <CustomImage
                        imageViewStyle={{alignSelf:'center'}}
                        imageTagStyle={{height:150, width:150, borderRadius:75}}
                        imageURL={{uri:this.state.image ? this.state.image : 'http://www.imag.co.uk/images/gravel/raisby-golden-gravel-lg-1.jpg'}}
                    />
                    </TouchableOpacity>
                </View>

                    <View style={{marginTop:30}}>
                        <CustomInputText
                            placeholder=" Pet Name"
                            value={this.state.name}
                            onChangeText={text=>this.setState({name:text})}
                        />
                        <CustomInputText
                            placeholder=" Pet Species"
                            value={this.state.username}
                            onChangeText={text=>this.setState({username:text})}
                        />
                        <CustomInputText
                            placeholder=" Breed Name"
                            value={this.state.address}
                            onChangeText={text=>this.setState({address:text})}
                        />
                        <CustomInputText
                            placeholder=" Pet's D.O.B"
                            value={this.state.email}
                            onChangeText={text=>this.setState({email:text})}
                        />
                        <CustomInputText
                            placeholder=" Additional Information"
                            value={this.state.ic}
                            onChangeText={text=>this.setState({ic:text})}
                        />

                        <View style={{marginTop:20, alignItems:'center',height:60}}>
                            <CustomButton onPress={()=>{this.SignUpBtn()}}>Submit</CustomButton>
                            
                        </View>
                    </View>
         
            </ScrollView> 
         </View>



    
    );
  }
}

const styles = StyleSheet.create({

});