import React from 'react';
import { StyleSheet, Text, View,TextInput,Dimensions,TouchableOpacity ,Image,ScrollView ,AsyncStorage } from 'react-native';
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
        this.state={headerUsername:''}
        
    }

    async componentWillMount(){
        try {
            let uid = await firebase.auth().currentUser.uid;
            if(uid){
                // try {
                    const value = await AsyncStorage.getItem('username');
                    if (value !== null){
                        console.log(value);
                        this.setState({headerUsername:value});
                    }
                //   } catch (error) {
                //     // Error retrieving data
                //   }
              //console.log("uid found" + uid);
            }
            else {
                console.log('Wait for it');
            }
         }
         catch(e){
          console.log(e)
         }
    }
    //Open Alert
    openAlert(msg){
        alert(msg);
    }


  render() {
    return (
        <View style={styles.mainView}>
            <View style={{top:23}}>
                <CustomHeader  
                    Headershow={false} 
                    headerName="Dashboard" 
                    showDataWelcome={true} 
                    showLogoutButton={true} 
                    showBackbutton= {false} 
                    Textwelcome={this.state.headerUsername ? this.state.headerUsername : ''} 
                    onPressLogout={()=>{firebase.auth().signOut().then(()=>{Actions.reset('Home')})}} 
                    onPressBack={()=>{Actions.pop()}}
                />
            </View>
            <View style={{top:30,}}>
                <View>
                    <TouchableOpacity onPress={()=>{/*alert("hello")*/ Actions.Pets()}}  style={{margin:3}}> 
                        <CustomImage
                            imageViewStyle={{alignSelf:'center'}}
                            imageTagStyle={{height:((height-110)/3), width:(width-5), borderRadius:10, borderWidth:1, borderColor:'#00227a'}}
                            //imageURL={{uri:'http://www.imag.co.uk/images/gravel/raisby-golden-gravel-lg-1.jpg'}}
                            imageURL={require('../../assets/images/cat.jpg')}
                        />
                        <View style={{ position:'absolute', alignSelf:'center', top:((height-110)/6) }}>
                            <Text style={{fontSize:24, color:'#fff',fontWeight:'bold',}}>My Pets</Text>
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={()=>{Actions.Appointment()}} style={{margin:3}}> 
                        <CustomImage
                            imageViewStyle={{alignSelf:'center'}}
                            imageTagStyle={{height:((height-110)/3), width:(width-5),borderRadius:10, borderWidth:1, borderColor:'#00227a'}}
                            // imageURL={{uri:'http://www.imag.co.uk/images/gravel/raisby-golden-gravel-lg-1.jpg'}}
                            imageURL={require('../../assets/images/syringe.jpg')}
                        />
                        <View style={{ position:'absolute', alignSelf:'center', top:((height-110)/6) }}>
                            <Text style={{fontSize:24,fontWeight:'bold',}}>Book Appointment</Text>
                        </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={()=>{Actions.Reminder()}} style={{margin:3}}> 
                        <CustomImage
                            imageViewStyle={{alignSelf:'center'}}
                            imageTagStyle={{height:((height-110)/3), width:(width-5),borderRadius:10, borderWidth:1, borderColor:'#00227a'}}
                            // imageURL={{uri:'http://www.imag.co.uk/images/gravel/raisby-golden-gravel-lg-1.jpg'}}
                            imageURL={require('../../assets/images/time.jpg')}
                        />
                        <View style={{ position:'absolute', right:30, top:((height-110)/10) }}>
                            <Text style={{fontSize:24,fontWeight:'bold'}}>Reminder /</Text>
                            <Text style={{fontSize:24,fontWeight:'bold', }}> Notification</Text>
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