import React from 'react';
import { StyleSheet, Text, View,TextInput,Dimensions,TouchableOpacity ,Image,ScrollView, Modal,Button,KeyboardAvoidingView, Keyboard } from 'react-native';
import { CustomHeader,CustomButton,CustomInputText,CustomImage} from '../common';
// import { ScrollView } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import Home from './Home';
// import Dashboard from './Dashboard';
import * as firebase from 'firebase';
 //import { Router, Scene } from 'react-native-router-flux';

var {height, width} = Dimensions.get('window');
export default class Login extends React.Component {
    // email:'p@gmail.com',
    // password:'123456', 

    static navigationOptions = {
        header: null,
    };
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            modalVisible: false,
            resetemail:''
        }
    }
    openAlert(msg){
        alert(msg);
    }

    resetpassAlert(msg,status){
        this.setState({resetemail:''});
        if(status == 'failed'){
            alert(msg);
        }else{
            alert(msg);
            this.closeModal();
        }
    }

    //modal start
    openModal() {
        this.setState({modalVisible:true});
      }
    
    closeModal() {
        this.setState({modalVisible:false});
    }

    //send reset password email
    submitEmail(){
        if(this.state.resetemail == "" || this.state.resetemail == undefined || this.state.resetemail == null){
            this.resetpassAlert('Email field cannot be blank. ', "failed")
        }else{
            firebase.auth().sendPasswordResetEmail(this.state.resetemail)
            .then((success)=>{ this.resetpassAlert('Password reset email sent to your registered email. ', "success") })
            .catch((error)=>{ this.resetpassAlert(error, "failed") })
        }
    }


    //modal end

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
                   // Actions.jump('MainPage');
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
        <View style={{flex:1}}>
            
             {/* <KeyboardAwareScrollView> */}
            <ScrollView style={{height:Dimensions.get('window').height}}>
            <KeyboardAvoidingView behavior="padding" style={styles.form}>
           
                <View style={{height:Dimensions.get('window').height}}>
                    <View style={{marginTop:50}}>
                    <CustomImage
                            resizeMode={'contain'}
                            imageViewStyle={{alignSelf:'center'}}
                            imageTagStyle={{height:200, width:(width-100)}}
                            imageURL={require('../../assets/images/logo.png')}
                        />
                        <Text style={{alignSelf: 'center', fontSize: 15, fontWeight: 'bold'}}>BookYourVet</Text>
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
                                        <Text onPress={()=>{this.openModal()}}>Forget Password?</Text>
                                    </View>
                                </View>
                                
                            </View>
                        </View>
                    </View>
                </View>     
                </KeyboardAvoidingView>
            </ScrollView> 
            {/* </KeyboardAwareScrollView> */}
            <View style={styles.container}>
                <Modal
                    visible={this.state.modalVisible}
                    animationType={'slide'}
                    transparent={true}
                    onRequestClose={() => this.closeModal()}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.innerContainer}>
                            <View >
                                <Text style={{alignSelf:'center', margin:20, color:'#fff', fontWeight:'bold'}}>Enter your email address below. You will receive an email shortly to reset your password.</Text>
                            </View>
                            <CustomInputText
                                placeholder=" Please Enter Registered Email"
                                value={this.state.resetemail}
                                onChangeText={text=>this.setState({resetemail:text})}
                            />
                            
                            <View style={{flex:1, flexDirection:'row', justifyContent:'center', marginTop:20}}>
                                <View >
                                    <Text style={{fontSize:18, color:'#fff'}} onPress={()=>{this.closeModal()}}>Cancel</Text>
                                </View>
                                <View style={{width:10}}></View>
                                <View>
                                    <Text style={{fontSize:18, color:'#fff'}} onPress={()=>{this.submitEmail()}}>Submit</Text>
                                </View>
                            
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
    
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignSelf:'center'
       // backgroundColor: 'grey',
      },
      innerContainer: {
        //alignItems: 'center',
        alignSelf:'center',
        height:220,
        width:width-30,
        backgroundColor: '#7986cb',
        borderBottomWidth:5,
        borderLeftWidth:2,
        borderWidth:1,
        borderRadius:20,
        borderColor:'#3f51b5'
      },
      form: {
        flex: 1,
        justifyContent: 'space-between',
      }
});