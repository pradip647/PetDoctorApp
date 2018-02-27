import React from 'react';
import { StyleSheet, Text, View,TextInput,Dimensions,TouchableOpacity ,Image,ScrollView } from 'react-native';
import { CustomHeader,CustomButton,CustomInputText,CustomImage} from '../common';
// import { ScrollView } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
// import Home from './Home';
// import Dashboard from './Dashboard';
import * as firebase from 'firebase';
 //import { Router, Scene } from 'react-native-router-flux';

var {height, width} = Dimensions.get('window');
export default class Login extends React.Component {
    
    static navigationOptions = {
        header: null,
    };
    constructor(props){
        super(props);
        this.state={
            email:'p@gmail.com',
            password:'123456'
        }
    }
    openAlert(msg){
        alert(msg);
    }

    signInBtn(){
        console.log("sign in button clicked...!!");
        if(this.state.email == ''||this.state.email == undefined ||this.state.email == null ||
         this.state.password == ''|| this.state.password == undefined || this.state.password==null){
            if(this.state.email == ''||this.state.email == undefined ||this.state.email == null){
                this.openAlert("Username cannot be blank");
            }else if(this.state.password == ''|| this.state.password == undefined || this.state.password==null){
                this.openAlert("Password cannot be blank")
            }
        }else{
            try{
                firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                .then((newuser)=>{
                    console.log("sign in working...!!");
                   // Actions.popTo('Dashboard');
                    //Actions.popTo('Home');
                    //Actions.Home();
                    //Actions.MainPage();
                    //Actions.push('MainPage');
                    Actions.jump('MainPage');
                    //Actions.jump('PastHistory');
                    //Actions.Pets();
                   // Actions.AdPet();

                   //Actions.popAndPush('Home');
                })
                .catch((error)=>{
                    console.log("sign in not working...!!");
                    this.setState({username:'',password:''});
                    this.openAlert(error);
                })
            } catch(e){
                console.log("login error" + e);
            }
            
        }
    }

  render() {
    return (
        <View>
        <ScrollView style={{height:Dimensions.get('window').height}}>
            <View style={{height:Dimensions.get('window').height}}>
                <View style={{marginTop:100}}>
                    <CustomImage
                        imageViewStyle={{alignSelf:'center'}}
                        imageTagStyle={{height:120, width:(width-100)}}
                        //imageURL={{uri:'http://www.imag.co.uk/images/gravel/raisby-golden-gravel-lg-1.jpg'}}
                        imageURL={require('../../assets/images/logo.png')}
                    />
                    <View style={{marginTop:30}}>
                        <CustomInputText
                            placeholder=" Please Enter Email"
                            value={this.state.email}
                            onChangeText={text=>this.setState({email:text})}
                        />
                        <CustomInputText
                            placeholder=" Please Enter Password"
                            value={this.state.password}
                            onChangeText={text=>this.setState({password:text})}
                        />

                        <View style={{marginTop:20, alignItems:'center'}}>
                            <CustomButton onPress={()=>{this.signInBtn()}}>Sign In</CustomButton>

                            <View>
                                <View style={{flex:1, flexDirection:'row',}}>
                                    <Text onPress={()=>{Actions.Register()}}>Signup</Text>
                                    <Text> | </Text>
                                    <Text>Forget Password?</Text>
                                </View>
                            </View>
                            
                        </View>
                    </View>
                </View>
            </View>
            
            

            
                    
            </ScrollView> 
        </View>



    
    );
  }
}

const styles = StyleSheet.create({

});