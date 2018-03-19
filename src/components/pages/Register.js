import React from 'react';
import { StyleSheet, Text, View,TextInput,Dimensions,TouchableOpacity ,Image,ScrollView,KeyboardAvoidingView } from 'react-native';
import { CustomHeader,CustomButton,CustomInputText,CustomImage} from '../common';
// import { ScrollView } from 'react-native-gesture-handler';
 import { Actions } from 'react-native-router-flux';
 import * as firebase from 'firebase';

var {height, width} = Dimensions.get('window');
export default class Register extends React.Component {
    
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
            Password:''
        }
    }

    SignUpBtn(){
        if(this.state.name =='' ||this.state.name ==undefined ||this.state.name ==null ||
            this.state.username ==''||this.state.username ==undefined||this.state.username ==null||
            this.state.address ==''||this.state.address ==undefined||this.state.address ==null||
            this.state.email ==''||this.state.email ==undefined||this.state.email ==null ||
            this.state.ic ==''||this.state.ic ==undefined|| this.state.ic ==null||
            this.state.hp ==''|this.state.hp ==undefined||this.state.hp ==null||
            this.state.password ==''|this.state.password ==undefined||this.state.password ==null
        ){
            if(this.state.name =='' ||this.state.name ==undefined ||this.state.name ==null){
                this.openAlert("name field can not be blank");
            }else if(this.state.username ==''||this.state.username ==undefined||this.state.username ==null){
                this.openAlert("Username field can not be blank");
            }else if(this.state.address ==''||this.state.address ==undefined||this.state.address ==null){
                this.openAlert("Address field can not be blank");
            }else if(this.state.email ==''||this.state.email ==undefined||this.state.email ==null){
                this.openAlert("Email field can not be blank");
            }else if(this.state.ic ==''||this.state.ic ==undefined|| this.state.ic ==null){
                this.openAlert("IC Number field can not be blank");
            }else if(this.state.hp ==''|this.state.hp ==undefined||this.state.hp ==null){
                this.openAlert("HP Number field can not be blank");
            }else if(this.state.password ==''|this.state.password ==undefined||this.state.password ==null){
                this.openAlert("Password field can not be blank");
            }

        }else{
            let data = {
                name:this.state.name,
                username:this.state.username,
                address:this.state.address,
                email:this.state.email,
                ic:this.state.ic,
                hp:this.state.hp,
                type:'user'
            }
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((newuser)=>{
                if(newuser){
                    firebase.database().ref('users/' + newuser.uid + '/').set(data)
                    .then((success)=>{
                        this.setState({
                                name:'',
                                username:'',
                                address:'',
                                email:'',
                                ic:'',
                                hp:'',
                                Password:''  
                        })
                        this.openAlert("Registration Successfull");
                    })
                }
            })
            .catch((error)=>{
                this.openAlert(error);
            })
        }

    }

    openAlert(msg){
        alert(msg);
    }


  render() {
    return (
        <View>
            
            <View style={{top:23}}>
                <CustomHeader  Headershow={true} headerName="Registration" showDataWelcome={false} showLogoutButton={false} showBackbutton= {true} Textwelcome="Pradip" onPressLogout={()=>{alert("Logout Clicked")}} onPressBack={()=>{Actions.pop()}}/>
            </View>
            
            <ScrollView style={{height:Dimensions.get('window').height-50, marginTop:23}}>
            <KeyboardAvoidingView behavior="padding" style={styles.form}>
            <View style={{top: 10}}>
                <CustomImage
                    resizeMode={'contain'}
                    imageViewStyle={{alignSelf:'center'}}
                    imageTagStyle={{height:120, width:(width-100)}}
                    //imageURL={{uri:'http://www.imag.co.uk/images/gravel/raisby-golden-gravel-lg-1.jpg'}}
                    imageURL={require('../../assets/images/logo.png')}
                />
                <Text style={{alignSelf: 'center', fontSize: 15, fontWeight: 'bold'}}>BookYourVet</Text>
                </View>
                <View style={{marginTop:30}}>
                    <CustomInputText
                        placeholder=" Please Enter Name"
                        value={this.state.name}
                        onChangeText={text=>this.setState({name:text})}
                    />
                    <CustomInputText
                        placeholder=" Please Enter Username"
                        value={this.state.username}
                        onChangeText={text=>this.setState({username:text})}
                    />
                    <CustomInputText
                        placeholder=" Please Enter Address"
                        value={this.state.address}
                        onChangeText={text=>this.setState({address:text})}
                    />
                    <CustomInputText
                        placeholder=" Please Enter Email"
                        value={this.state.email}
                        onChangeText={text=>this.setState({email:text})}
                    />
                    <CustomInputText
                        placeholder=" Please Enter IC Number"
                        value={this.state.ic}
                        onChangeText={text=>this.setState({ic:text})}
                    />
                    <CustomInputText
                        placeholder=" Please Enter HP Number"
                        value={this.state.hp}
                        onChangeText={text=>this.setState({hp:text})}
                    />
                    <CustomInputText
                        placeholder=" Please Enter Password"
                        value={this.state.password}
                        onChangeText={text=>this.setState({password:text})}
                    />

                    <View style={{marginTop:20, alignItems:'center'}}>
                        <CustomButton onPress={()=>{this.SignUpBtn()}}>Sign Up</CustomButton>

                        <View style={{height:60}}>
                            <View >
                                <Text onPress={()=>{Actions.pop()}}>Back to Sign in</Text>
                            </View>
                        </View>
                    </View>
                </View>
                </KeyboardAvoidingView >
            </ScrollView> 
            
            
         </View>
    );
  }
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        justifyContent: 'space-between',
      }
});