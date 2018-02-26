import React from 'react';
import { StyleSheet, Text, View,TextInput,Dimensions,TouchableOpacity ,Image,ScrollView } from 'react-native';
import { CustomHeader,CustomButton,CustomInputText,CustomImage} from '../common';
import { Actions } from 'react-native-router-flux';
import Home from './Home';
import * as firebase from 'firebase';

var {height, width} = Dimensions.get('window');
export default class MainPage extends React.Component {
    
    static navigationOptions = {
        header: null,
    };
    constructor(props){
        super(props);
        
    }
    async componentWillMount(){
        try {
            let uid = await firebase.auth().currentUser.uid;
            if(uid)
            {
              console.log("uid found" + uid);
            }
            else {
            console.log('Wait for it');
           }
     
         }
     
         catch(e){
          console.log(e)
         }
    }
    openAlert(msg){
        alert(msg);
    }


  render() {
    return (
        <View style={styles.mainView}>
            <View style={{top:30}}>
            <CustomHeader  Headershow={false} headerName="Dashboard" showDataWelcome={true} showLogoutButton={true} showBackbutton= {false} Textwelcome="Pradip" onPressLogout={()=>{firebase.auth().signOut().then(()=>{Actions.jump('Home')})}} onPressBack={()=>{Actions.pop()}}/>
            </View>
            <View style={{top:30,}}>
                <View>
                    <TouchableOpacity onPress={()=>{/*alert("hello")*/ Actions.Pets()}}  style={{margin:3}}> 
                <CustomImage
                        imageViewStyle={{alignSelf:'center'}}
                        imageTagStyle={{height:((height-110)/3), width:(width-5)}}
                        imageURL={{uri:'http://www.imag.co.uk/images/gravel/raisby-golden-gravel-lg-1.jpg'}}
                        //imageURL={require('../../assets/images/logo.png')}
                    />
                     <View style={{
                        position:'absolute', alignSelf:'center', top:((height-110)/6)
                    }}>
                    <Text style={{fontSize:22}}>My Pets</Text>
                    </View>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={()=>{Actions.Appointment()}} style={{margin:3}}> 
                <CustomImage
                        imageViewStyle={{alignSelf:'center'}}
                        imageTagStyle={{height:((height-110)/3), width:(width-5)}}
                        imageURL={{uri:'http://www.imag.co.uk/images/gravel/raisby-golden-gravel-lg-1.jpg'}}
                        //imageURL={require('../../assets/images/logo.png')}
                    />
                     <View style={{
                        position:'absolute', alignSelf:'center', top:((height-110)/6)
                    }}>
                    <Text style={{fontSize:22}}>Book Appointment</Text>
                    </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={()=>{alert("hello")}} style={{margin:3}}> 
                <CustomImage
                        imageViewStyle={{alignSelf:'center'}}
                        imageTagStyle={{height:((height-110)/3), width:(width-5)}}
                        imageURL={{uri:'http://www.imag.co.uk/images/gravel/raisby-golden-gravel-lg-1.jpg'}}
                        //imageURL={require('../../assets/images/logo.png')}
                    />
                     <View style={{
                        position:'absolute', alignSelf:'center', top:((height-110)/6)
                    }}>
                    <Text style={{fontSize:22}}>Reminder / Notification</Text>
                    </View>
                    </TouchableOpacity>
                   
                </View>
            </View>

        </View>



    
    );
  }
}

const styles = StyleSheet.create({
    mainView:{width:width, height:height}
});